
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
                    {"feature": "Build Time", "note": "10 min/mo"},
                ]
            },
            {
                category: "Features",
                items: [
                    {"feature": "Semantic Search", "note": "Unlimited"},
                    {"feature": "Generative Search", "note": "1k req (GPT-3.5 turbo)"},
                    {
                        "feature": "Q&A search",
                        "note": "Unlimited (opensource)",
                        table: [
                            {"solution": "GPT-3.5 turbo", price: null, included: "1k req incl."},
                        ]
                    },
                ]
            },
            {
                category: "APIs",
                items: [
                    {"feature": "Image API", "note": "unlimited"},
                    {"feature": "Video API", "note": "5 min"},
                    {"feature": "Audio API", "note": "15 min"}
                ]
            }
        ],
        "featured": false
    },
    {
        "name": "Standard",
        "priceMonthly": "$25",
        "priceAnnually": "$24",
        "description": "Start building your next big thing. Perfect for small teams and startups.",
        "ctaLabel": "Buy Plan",
        "ctaAction": "https://app.unbody.io/settings/subscription",
        "features": [
            {
              category: "",
              items: [
                  {"feature": "Default Projects", "note": "Unlimited"},
                  {"feature": "Build Time", "note": "50 min/mo, + $0.5/min"},
              ]
            },
            {
                category: "Features",
                items: [
                    {"feature": "Semantic Search", "note": "Unlimited"},
                    {
                        "feature": "Generative Search",
                        note: "3k req/mo + $0.01/req",
                        table: [
                            {"solution": "GPT-3.5 turbo", price: "$0.01/req", included: "3k req incl."},
                            {"solution": "Gemini Pro", price: "$0.05/req", included: null},
                            {"solution": "GPT-4", price: "$0.05/req", included: null}
                        ]
                    },
                    {
                        "feature": "Q&A search",
                        "note": "Unlimited (opensource)",
                        table: [
                            {"solution": "GPT-3.5 turbo", price: "$0.01/req", included: "3k req incl."},
                        ]
                    },
                    {"feature": "Visual Search", "note": "300 images, + $0.05/image"}
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
        "ctaLabel": "Contact Sales",
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
                    {"feature": "Generative Search", "note": "Gemini Pro, GPT-4, and OpenSource"},
                    {"feature": "Q&A search", "note": "Unlimited"},
                    {"feature": "Visual Search", "note": "Unlimited"}
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
