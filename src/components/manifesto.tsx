import { cn } from "@/lib/utils";

interface ManifestoProps {
  className?: string;
}

export function Manifesto({ className = "" }: ManifestoProps) {
  return (
    <article className={cn(className)}>
      <header className="mb-20">
        <h1 className="hidden">Unbody Lab</h1>
        <p className="mb-8 leading-relaxed text-neutral-600/90">
          Unbody Lab is where we question, explore, experiment and build what we
          call adaptive thinking tools.
        </p>
        <p className="mb-8 leading-relaxed text-neutral-600/90">
          Most software still carries the shape of an old world: Software
          carries the shape of constraints that no longer exist: one product,
          one interface, designed the same for everyone. It broke reality into
          boxes that don&apos;t connect. We became users — adapting ourselves to
          rigid interfaces, then doing the work of bridging between them.
          Copying, switching, remembering. And because software only reacts, it
          had no choice but to capture attention or lose it.
        </p>
        <p className="mb-8 leading-relaxed text-neutral-600/90">
          The technical constraints that created this world are dissolving.
          We&apos;re building toward what comes next.
        </p>
      </header>

      <section className="mb-20">
        <h2 className="mt-16 mb-4 text-black uppercase tracking-wider">
          Unlocking, not replacing
        </h2>
        <p className="mb-8 leading-relaxed text-neutral-600/90">
          <em>
            We see AI as unlocking what&apos;s latent in you, not substituting
            for you.
          </em>{" "}
          AI doesn&apos;t give you something you don&apos;t have. It surfaces
          what&apos;s already there but hard to access alone: your potential,
          your patterns, your blind spots, your capacity to act. Used well, it
          acts as part of your cognitive exoskeleton—extending memory,
          sharpening attention, creating better conditions for clarity. When a
          system anticipates you, it should act in line with your stated
          priorities, in ways you would recognise as your own, not as something
          imposed from outside.
        </p>
      </section>

      <section className="mb-20">
        <h2 className="mt-16 mb-4 text-black uppercase tracking-wider">
          Time returned, not captured
        </h2>
        <p className="mb-8 leading-relaxed text-neutral-600/90">
          <em>The measure of good software is what it gives back.</em> Most
          tools optimize for time spent. We optimize for time returned—to your
          work, your relationships, your own thinking. If our tools help you
          look at screens less while living more, we&apos;re succeeding.
        </p>
      </section>

      <section className="mb-20">
        <h2 className="mt-16 mb-4 text-black uppercase tracking-wider">
          Adaptation over configuration
        </h2>
        <p className="mb-8 leading-relaxed text-neutral-600/90">
          <em>Software should learn you, not the other way around.</em> For
          decades, people have adapted to their tools—navigating menus, learning
          interfaces, fitting themselves into predetermined flows. We build
          tools that adapt to the human. They learn your rhythms, respect your
          limits, and get out of the way.
        </p>
      </section>

      <section className="mb-20">
        <h2 className="mt-16 mb-4 text-black uppercase tracking-wider">
          Calibrated friction
        </h2>
        <p className="mb-8 leading-relaxed text-neutral-600/90">
          <em>Frictionless isn&apos;t always better.</em> Some tasks need
          smoothness—busywork should disappear. But creative work, important
          decisions, moments of self-regulation—these benefit from pause, from
          deliberate confirmation. We calibrate friction to context, so tools
          stay ambient in the background and step forward only to support your
          intentions, not to compete for your attention.
        </p>
      </section>

      <section className="mb-20">
        <h2 className="mt-16 mb-4 text-black uppercase tracking-wider">
          Craft as care
        </h2>
        <p className="mb-8 leading-relaxed text-neutral-600/90">
          <em>
            Quality means someone absorbed the complexity so you don&apos;t have
            to.
          </em>{" "}
          When things just work, you&apos;re experiencing the accumulated
          investment of thought and energy. We question inherited assumptions.
          We think from first principles. We&apos;d rather ship fewer things
          that genuinely work than more things that technically function.
        </p>
      </section>

      <footer className="mt-20 pt-10 border-t border-current opacity-50">
        Unbody Lab. Small team. Hard problems. Right questions. If you think
        from first principles and want to build what comes next —{" "}
        <a href="mailto:hello@unbody.io" className="underline">
          get in touch
        </a>
        .
      </footer>
    </article>
  );
}
