export const proceduralHeatmapFragmentShader: string = `#version 300 es
precision highp float;

in mediump vec2 v_objectUV;
in mediump vec2 v_responsiveUV;
in mediump vec2 v_responsiveBoxGivenSize;
out vec4 fragColor;

uniform float u_time;
uniform vec4 u_colorBack;
uniform vec4 u_colors[10];
uniform float u_colorsCount;
uniform float u_angle;
uniform float u_noise;
uniform float u_innerGlow;
uniform float u_outerGlow;
uniform float u_contour;
uniform float u_shape;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

float circle(vec2 uv, vec2 c, vec2 r) {
  return 1. - smoothstep(r.x, r.y, length(uv - c));
}

float lst(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

float sst(float edge0, float edge1, float x) {
  return smoothstep(edge0, edge1, x);
}

vec2 rotate(vec2 p, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

float rand(vec2 co) {
  return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);
}

float shadowShape(vec2 uv, float t, float contour) {
  vec2 scaledUV = uv;
  float posY = mix(-1., 2., t);

  scaledUV.y -= .5;
  float mainCircleScale = sst(0., .8, posY) * lst(1.4, .9, posY);
  scaledUV *= vec2(1., 1. + 1.5 * mainCircleScale);
  scaledUV.y += .5;

  float innerR = .4;
  float outerR = 1. - .3 * (sst(.1, .2, t) * (1. - sst(.2, .5, t)));
  float s = circle(scaledUV, vec2(.5, posY - .2), vec2(innerR, outerR));
  s = pow(s, 1.4);
  s *= 1.2;

  float topFlattener = 0.;
  {
    float pos = posY - uv.y;
    float edge = 1.2;
    topFlattener = lst(-.4, 0., pos) * (1. - sst(.0, edge, pos));
    topFlattener = pow(topFlattener, 3.);
    float topFlattenerMixer = (1. - sst(.0, .3, pos));
    s = mix(topFlattener, s, topFlattenerMixer);
  }

  {
    float visibility = sst(.6, .7, t) * (1. - sst(.8, .9, t));
    float angle = -2. - t * TWO_PI;
    float rightCircle = circle(uv, vec2(.95 - .2 * cos(angle), .4 - .1 * sin(angle)), vec2(.15, .3));
    s = mix(s, 0., rightCircle * visibility);
  }

  {
    float topCircle = circle(uv, vec2(.5, .19), vec2(.05, .25));
    topCircle += 2. * contour * circle(uv, vec2(.5, .19), vec2(.2, .5));
    float visibility = .55 * sst(.2, .3, t) * (1. - sst(.3, .45, t));
    s = mix(s, 0., topCircle * visibility);
  }

  float leafMask = circle(uv, vec2(.53, .13), vec2(.08, .19));
  leafMask = mix(leafMask, 0., 1. - sst(.4, .54, uv.x));
  leafMask = mix(0., leafMask, sst(.0, .2, uv.y));
  leafMask *= (sst(.5, 1.1, posY) * sst(1.5, 1.3, posY));
  s += leafMask;

  {
    float visibility = sst(.0, .4, t) * (1. - sst(.6, .8, t));
    s = mix(s, 0., visibility * circle(uv, vec2(.52, .92), vec2(.09, .25)));
  }

  return clamp(s, 0., 1.);
}

void main() {
  vec2 uv = v_objectUV + .5;
  uv.y = 1. - uv.y;

  float edge = 0.;
  if (u_shape < 1.) {
    vec2 borderUV = v_responsiveUV + .5;
    float ratio = v_responsiveBoxGivenSize.x / max(v_responsiveBoxGivenSize.y, 1e-5);
    vec2 mask = min(borderUV, 1. - borderUV);
    vec2 pixelThickness = 250. / max(v_responsiveBoxGivenSize, vec2(1.));
    float maskX = pow(smoothstep(0.0, pixelThickness.x, mask.x), .25);
    float maskY = pow(smoothstep(0.0, pixelThickness.y, mask.y), .25);
    edge = clamp(1. - maskX * maskY, 0., 1.);

    uv = v_responsiveUV;
    if (ratio > 1.) {
      uv.y /= ratio;
    } else {
      uv.x *= ratio;
    }
    uv += .5;
    uv.y = 1. - uv.y;
  } else if (u_shape < 4.) {
    vec2 shapeUV = uv - .5;
    shapeUV = rotate(shapeUV, .25 * PI);
    shapeUV *= 1.42;
    shapeUV += .5;
    vec2 mask = min(shapeUV, 1. - shapeUV);
    vec2 pixelThickness = vec2(.15);
    float maskX = pow(smoothstep(0.0, pixelThickness.x, mask.x), .25);
    float maskY = pow(smoothstep(0.0, pixelThickness.y, mask.y), .25);
    edge = clamp(1. - maskX * maskY, 0., 1.);
  } else {
    vec2 shapeUV = uv - .5;
    shapeUV *= 1.1;
    float tMetaballs = .9 * u_time + 1.7;

    float field = 0.;
    for (int i = 0; i < 7; i++) {
      float fi = float(i);
      float phase = fi * 1.37;
      float speed = .55 + .21 * fi;
      float orbitA = tMetaballs * speed + phase;
      float orbitB = tMetaballs * (speed * 1.73) - phase * 1.41;

      vec2 center = .42 * vec2(cos(orbitA), sin(orbitB));
      center += .18 * vec2(cos(orbitB * .7 + phase), sin(orbitA * .6 - phase));

      float r = .24 + .09 * sin(tMetaballs * (.63 + .07 * fi) + phase * 2.);
      r += .05 * cos(tMetaballs * (.37 + .09 * fi) - phase * 1.2);
      r = max(.08, r);

      float d = length(shapeUV - center);
      field += (r * r) / (d * d + .03);
    }

    float envelope = smoothstep(1.05, .2, length(shapeUV));
    field *= mix(.8, 1., envelope);
    field += .16;

    edge = 1. - smoothstep(1.35, 2.15, field);
    edge = pow(clamp(edge, 0., 1.), 1.8);
  }

  float inside = 1. - smoothstep(.9 - 2. * fwidth(edge), .9, edge);
  float shape = 1. - inside;
  float innerBlur = smoothstep(.05, .95, edge) * inside;
  float outerBlur = smoothstep(.05, .95, edge) * shape;
  float contour = smoothstep(.55, .95, edge) * inside;

  float t = .1 * u_time - .3;
  float tCopy = t + 1. / 3.;
  float tCopy2 = t + 2. / 3.;
  t = mod(t, 1.);
  tCopy = mod(tCopy, 1.);
  tCopy2 = mod(tCopy2, 1.);

  vec2 animationUV = uv - vec2(.5);
  float angle = -u_angle * PI / 180.;
  animationUV = vec2(
    animationUV.x * cos(angle) - animationUV.y * sin(angle),
    animationUV.x * sin(angle) + animationUV.y * cos(angle)
  ) + vec2(.5);

  float shadow = shadowShape(animationUV, t, innerBlur);
  float shadowCopy = shadowShape(animationUV, tCopy, innerBlur);
  float shadowCopy2 = shadowShape(animationUV, tCopy2, innerBlur);

  float inner = .8 + .8 * innerBlur;
  inner = mix(inner, 0., shadow);
  inner = mix(inner, 0., shadowCopy);
  inner = mix(inner, 0., shadowCopy2);
  inner *= mix(0., 2., u_innerGlow);
  inner += (u_contour * 2.) * contour;
  inner = min(1., inner);
  inner *= (1. - shape);

  float outer = 0.;
  {
    float tOuter = mod(t * 3. - .1, 1.);
    outer = .9 * pow(outerBlur, .8);
    float y = mod(animationUV.y - tOuter, 1.);
    float animatedMask = sst(.3, .65, y) * (1. - sst(.65, 1., y));
    animatedMask = .5 + animatedMask;
    outer *= animatedMask;
    outer *= mix(0., 5., pow(u_outerGlow, 2.));
  }

  inner = pow(inner, 1.2);
  float heat = clamp(inner + outer, 0., 1.);
  heat += (.005 + .35 * u_noise) * (rand(uv) - .5);

  float mixer = heat * u_colorsCount;
  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;
  float outerShape = 0.;
  for (int i = 1; i < 11; i++) {
    if (i > int(u_colorsCount)) break;
    float m = clamp(mixer - float(i - 1), 0., 1.);
    if (i == 1) outerShape = m;
    vec4 c = u_colors[i - 1];
    c.rgb *= c.a;
    gradient = mix(gradient, c, m);
  }

  vec3 color = gradient.rgb * outerShape;
  float opacity = gradient.a * outerShape;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1. - opacity);
  opacity = opacity + u_colorBack.a * (1. - opacity);
  color += .02 * (rand(uv + 1.) - .5);

  fragColor = vec4(color, opacity);
}
`;
