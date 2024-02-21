
export const subscriptionPlans = [
    {
        "name": "Free",
        "priceMonthly": "$0",
        "priceAnnually": "$0",
        "ctaLabel": "Get started",
        "ctaAction": "https://app.unbody.io?subscription=free",
        "description": "Get your feet wet with our powerful AI tools. Great for hobbyists and small projects.",
        "features": [
            {"feature": "Default Projects", "note": "1 project"},
            {"feature": "Build Time", "note": "10 min/project"},
            {"feature": "Semantic Search", "note": null},
            {"feature": "Generative Search", "note": "GPT-3"},
            {"feature": "Visual Search", "note": "50 images/month"},
            {"feature": "Image API", "note": null},
            {"feature": "Video API", "note": "5 min included"},
            {"feature": "Audio API", "note": "30 min included"},
        ],
        "featured": false
    },
    {
        "name": "Standard",
        "priceMonthly": "$40",
        "priceAnnually": "$25",
        "description": "Start building your next big thing. Perfect for small teams and startups.",
        "ctaLabel": "Buy plan",
        "ctaAction": "https://app.unbody.io?subscription=standard",
        "features": [
            {"feature": "Default Projects", "note": "1 project"},
            {"feature": "Build Time", "note": "50 min"},
            {"feature": "Extra Build Time Cost", "note": "$0.5/min"},
            {"feature": "Semantic Search", "note": null},
            {"feature": "Generative Search", "note": "GPT-3 and GPT-4 at $0.05/request"},
            {"feature": "Visual Search", "note": "300 images + $0.05/image"},
            {"feature": "Image API", "note": null},
            {"feature": "Video API", "note": "60 min + $0.2/min"},
            {"feature": "Audio API", "note": "120 min + $0.1/min"},
            {"feature": "Auto-transcription", "note": null}
        ],
        "featured": true
    },
    {
        "name": "Enterprise",
        "price": "Custom",
        "description": "For large teams and enterprises. Get in touch for a custom plan.",
        "ctaLabel": "Contact sales",
        "ctaAction": "mailto:sales@unbody.io?subject=Enterprise%20Plan%20Inquiry",
        "features": [
            {"feature": "Default Projects", "note": "1 project"},
            {"feature": "Build Time", "note": "Custom"},
            {"feature": "Extra Build Time Cost", "note": "Custom"},
            {"feature": "Semantic Search", "note": null},
            {"feature": "Generative Search", "note": "GPT-3 and GPT-4 included"},
            {"feature": "Visual Search", "note": "Unlimited"},
            {"feature": "Image API", "note": null},
            {"feature": "Video API", "note": null},
            {"feature": "Audio API", "note": null},
            {"feature": "Automated Image Captioning", "note": null},
            {"feature": "Auto-transcription", "note": null}
        ],
        "featured": false,
        "isEnterprise": true
    }
];
