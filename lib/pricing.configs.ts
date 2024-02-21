
export const subscriptionPlans = [
    {
        "name": "Free",
        "priceMonthly": "$0",
        "priceAnnually": "$0",
        "ctaLabel": "Get Started",
        "ctaAction": "https://app.unbody.io?subscription=free",
        "description": "Get your feet wet with our powerful AI tools. Great for hobbyists and small projects.",
        "features": [
            {
                category: "",
                items: [
                    {"feature": "Default Projects", "note": "1 project"},
                    {"feature": "Build Time", "note": "10 min/month"}
                ]
            },
            {
                category: "Features",
                items: [
                    {"feature": "Semantic Search", "note": "Unlimited"},
                    {"feature": "Generative Search", "note": "GPT-3"}
                ]
            },
            {
                category: "APIs",
                items: [
                    {"feature": "Image API", "note": "50 images/month"},
                    {"feature": "Video API", "note": "5 min"},
                    {"feature": "Audio API", "note": "15 min"}
                ]
            }
        ],
        "featured": false
    },
    {
        "name": "Standard",
        "priceMonthly": "$40",
        "priceAnnually": "$24",
        "description": "Start building your next big thing. Perfect for small teams and startups.",
        "ctaLabel": "Buy Plan",
        "ctaAction": "https://app.unbody.io?subscription=standard",
        "features": [
            {
              category: "",
              items: [
                  {"feature": "Default Projects", "note": "1 project"},
                  {"feature": "Build Time", "note": "50 min/month, + $0.5/min"},
              ]
            },
            {
                category: "Features",
                items: [
                    {"feature": "Semantic Search", "note": "Unlimited"},
                    {"feature": "Generative Search", "note": "GPT-3, Gemini, GPT-4 at $0.05/request"},
                    {"feature": "Visual Search", "note": "300 images, + $0.05/image"},
                    {"feature": "Auto-transcription", "note": null},
                ]
            },
            {
                category: "APIs",
                items: [
                    {"feature": "Image API", "note": "Unlimited"},
                    {"feature": "Video API", "note": "20 min, + $0.2/min"},
                    {"feature": "Audio API", "note": "60 min, + $0.1/min"}
                ]
            },
            {
                category: "Support",
                items: [
                    {"feature": "Dedicated onboarding support", "note": null},
                ]
            }
        ],
        "featured": true
    },
    {
        "name": "SME & Enterprise",
        "price": "Custom",
        "description": "For large teams and enterprises. Get in touch for a custom plan.",
        "ctaLabel": "Lets Get On a Call!",
        "ctaAction": "https://cal.com/unbody/sales",
        "features": [
            {
                category: "",
                items: [
                    {"feature": "Default Projects", "note": "1 project"},
                    {"feature": "Build Time", "note": "Custom"},
                ]
            },
            {
                category: "Features",
                items: [
                    {"feature": "Semantic Search", "note": "Unlimited"},
                    {"feature": "Generative Search", "note": "GPT-3, Gemini Pro, GPT-4, and OpenSource"},
                    {"feature": "Visual Search", "note": "Unlimited"},
                    {"feature": "Auto-transcription", "note": null},
                ]
            },
            {
                category: "APIs",
                items: [
                    {"feature": "Image API", "note": "Unlimited"},
                    {"feature": "Video API", "note": "Unlimited"},
                    {"feature": "Audio API", "note": "Unlimited"}
                ]
            },
            {
                category: "Support",
                items: [
                    {"feature": "Dedicated onboarding support", "note": null},
                    {"feature": "24/7 Email and Chat support", "note": null},
                ]
            }
        ],
        "featured": false,
        "isEnterprise": true
    }
];
