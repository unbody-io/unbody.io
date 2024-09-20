import { features } from "process";
import { FeatureCard } from "../components/FeatureCard";

export const subscriptionPlans = [
  {
    name: "Hobbyist",
    priceMonthly: "Free",
    priceAnnually: "Free",
    ctaLabel: "Get Started",
    ctaAction: "https://app.unbody.io?subscription=free",
    description:
      "Get your feet wet with our powerful AI tools. Great for hobbyists and small projects.",
    features: [
      {
        category: "",
        items: [
          { feature: "Projects", note: "1 project" },
          { feature: "Source per projects", note: "1 source" },
          { feature: "Build Time", note: "5 min/mo" },
        ],
      },
      {
        category: "Features",
        items: [
          { feature: "Semantic Search", note: "500 queries/mo" },
          {
            feature: "Generative Text",
            note: "50 req/mo",
            table: [
              { solution: "GPT-3.5 turbo" },
              { solution: "Mistral 7B" },
              { solution: "Mixtral 8x7B" },
              { solution: "Cohere command" },
              { solution: "Cohere command R" },
              { solution: "Cohere command-light" },
            ],
          },
          { feature: "Visual Search", note: "N/a" },
          {
            feature: "Q&A search",
            note: "50 queries/mo",
            table: [
              {
                solution: "GPT-3.5 turbo",
                price: null,
                included: "1k req incl.",
              },
            ],
          },
          { feature: "Dynamic Models", note: "N/a" },
          { feature: "Auto Text Enhancement", note: "Available (limited models)" },
          { feature: "Auto Visual Enhancement", note: "N/a" },
          { feature: "Auto Media Enhancement", note: "N/a" },
          { feature: "Custom enhancement pipeline", note: "N/a" },
        ],
      },
      {
        category: "APIs",
        items: [
          { feature: "Image API", note: "Unlimited" },
          { feature: "Video API", note: "5 min/mo" },
          { feature: "Audio API", note: "5 min/mo" },
          { feature: "Push API", note: "N/a, 3x Build Time" },
        ],
      },
      {
        category: "Support",
        items: [
          { feature: "Community support", note: null}
        ]
      }
    ],
    featured: false,
  },
  // {
  //   name: "Developer",
  //   priceMonthly: "$50",
  //   priceAnnually: "$40",
  //   // discount: {
  //   //   price: 50,
  //   //   note: "50% early bird discount for the first 6 months.",
  //   // },
  //   description:
  //     "Start building your next big thing. Perfect for small teams and startups.",
  //   ctaLabel: "Buy Plan",
  //   ctaAction: "https://app.unbody.io/settings/subscription",
  //   features: [
  //     {
  //       category: "",
  //       items: [
  //         { feature: "Default Projects", note: "Unlimited" },
  //         { feature: "Build Time", note: "50 min/mo, + $0.5/min" },
  //       ],
  //     },
  //     {
  //       category: "Features",
  //       items: [
  //         { feature: "Semantic Search", note: "Unlimited" },
  //         {
  //           feature: "Generative Search",
  //           note: "pay-as-you-go (9k req/mo incl.)",
  //           table: [
  //             {
  //               solution: "GPT-3.5 turbo",
  //               price: "$0.005/req",
  //               included: "3k req incl.",
  //             },
  //             { solution: "GPT-4", price: "$0.25/req", included: null },
  //             {
  //               solution: "Mistral 7B",
  //               price: "$0.001/req",
  //               included: "3k incl.",
  //             },
  //             { solution: "Mixtral 8x7B", price: "$0.001/req", included: null },
  //             { solution: "Mistral-small", price: "$0.02/req", included: null },
  //             { solution: "Mistral-large", price: "$0.1/req", included: null },
  //             {
  //               solution: "Cohere Command Light",
  //               price: "$0.005/req",
  //               included: "3k req incl.",
  //             },
  //             {
  //               solution: "Cohere Command",
  //               price: "$0.005/req",
  //               included: null,
  //             },
  //             {
  //               solution: "Cohere Command R",
  //               price: "$0.005/req",
  //               included: null,
  //             },
  //             {
  //               solution: "Cohere command R+",
  //               price: "$0.05/req",
  //               included: null,
  //             },
  //           ],
  //         },
  //         {
  //           feature: "Q&A search",
  //           note: "Unlimited (opensource)",
  //           table: [
  //             {
  //               solution: "GPT-3.5 turbo",
  //               price: "$0.01/req",
  //               included: "3k req incl.",
  //             },
  //           ],
  //         },
  //         { feature: "Visual Search", note: "300 images, + $0.05/image" },
  //       ],
  //     },
  //     {
  //       category: "APIs",
  //       items: [
  //         { feature: "Image API", note: "Unlimited" },
  //         { feature: "Video API", note: "20 min, + $0.01/min" },
  //         { feature: "Audio API", note: "60 min, + $0.001/min" },
  //       ],
  //     },
  //     {
  //       category: "Support",
  //       items: [{ feature: "Dedicated onboarding support", note: null }],
  //     },
  //   ],
  //   featured: true,
  // },
  {
    name: "SMB/Enterprise",
    price: "$2000+",
    description:
      "For startups, teams and enterprises. Get in touch for a custom plan.",
    ctaLabel: "Talk to founders",
    ctaAction: "https://cal.com/unbody/sales",
    features: [
      {
        category: "",
        items: [
          { feature: "Projects", note: "Unlimited projects" },
          { feature: "Source per projects", note: "Unlimited" },
          { feature: "Build Time", note: "Custom" },
        ],
      },
      {
        category: "Features",
        items: [
          { feature: "Semantic Search", note: "Custom" },
          {
            feature: "Generative Text",
            note: "Custom",
          },
          { feature: "Visual Search", note: "Included" },
          {
            feature: "Q&A search",
            note: "Custom",
            table: [
              {
                solution: "GPT-3.5 turbo",
                price: null,
                included: "1k req incl.",
              },
            ],
          },
          { feature: "Dynamic Models", note: "Available (all models)" },
          { feature: "Auto Text Enhancement", note: "Available" },
          { feature: "Auto Visual Enhancement", note: "Available" },
          { feature: "Auto Media Enhancement", note: "Available" },
          { feature: "Custom enhancement pipeline", note: "Available" },
        ],
      },
      {
        category: "APIs",
        items: [
          { feature: "Image API", note: "Unlimited" },
          { feature: "Video API", note: "Unlimited ($0.01/min)" },
          { feature: "Audio API", note: "Unlimited ($0.01/min)" },
          { feature: "Push API", note: "Custom" },
        ],
      },
      {
        category: "Support",
        items: [
          { feature: "Community support", note: null},
          { feature: "Email support", note: null},
          { feature: "Chat support", note: null},
          { feature: "Phone support", note: null},
          { feature: "Onboarding", note: "Unlimited"},
        ],
      },
    ],
    featured: false,
    isEnterprise: true,
  },
];




export const plansWithSupportedFileTypes = {
  type: "file",
  plans: [
    { name: "Hobbyist" },
    { name: "SMB/Enterprise" },
  ],

  types: [
    {
      category: "Media files",
      types: ["Image", "Audio", "Video"]
    },
    {
      category: "Text documents",
      types: ["Google Docs", "Markdown", "Docx", "RTF", "PDF"]
    },
    {
      category: "Data sheets",
      types: ["CSV", "Google Sheets", "Microsoft Excel"]
    }
  ],

  availableTypes: {
    "Hobbyist": ["Image", "Audio", "Video", "Google Docs", "Markdown", "Docx", "RTF", "CSV", "Google Sheets", "Microsoft Excel"],
    "SMB/Enterprise": ["Image", "Audio", "Video", "Google Docs", "Markdown", "Docx", "RTF", "PDF", "CSV", "Google Sheets", "Microsoft Excel"],
  },
}

export const plansWithAvailableModels = {
  type: "model",
  plans: [
    { name: "Hobbyist" },
    { name: "SMB/Enterprise" },
  ],

  types: [
    {
      category: "Custom models",
      types: ["custom models"]
    },
    {
      category: "Openai",
      types: ["gpt-3.5-turbo", "gpt-4o-mini", "gpt-4o", "gpt-4", "gpt-4-turbo"]
    },
    {
      category: "Mistral",
      types: ["open-mistral-7b", "open-mixtral-8x7b"]
    },
    {
      category: "Cohere",
      types: ["command-light", "command", "command-r", "command-r-plus"]
    }
  ],

  availableTypes: {
    "Hobbyist": ["gpt-3.5-turbo", "gpt-4o-mini", "open-mistral-7b", "open-mixtral-8x7b", "command-light", "command", "command-r"],
    "SMB/Enterprise": ["custom models", "gpt-3.5-turbo", "gpt-4o-mini", "gpt-4o", "gpt-4", "gpt-4-turbo", "open-mistral-7b", "open-mixtral-8x7b", "command-light", "command", "command-r", "command-r-plus"],
  },
}

