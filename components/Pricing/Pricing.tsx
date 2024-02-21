import React, { useState } from 'react';
import {subscriptionPlans} from "../../lib/pricing.configs";


const FeatureItem = ({ feature }) => (
    <li className="flex mb-2">
        <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        <div>
            <span className={"block"}>{feature.feature}</span>
            {feature.note && <span className="text-gray-400 text-xs">{feature.note}</span>}
        </div>
    </li>
)

const PlanCard = ({ plan, billingCycle }) => {
    const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceAnnually;

    return (
        <div className={`ring-1 ring-indigo-50 ring-opacity-10 rounded-3xl p-6 transition-all duration-300 text-sm ${plan.isEnterprise ? 'bg-gray-50 text-gray-900' : 'bg-black text-gray-300'}`}
             style={{
                 maxWidth: '350px',
             }}
        >
            <h3 className="text-lg font-semibold flex gap-2 items-center">
                <span>{plan.name}</span>
                {
                    plan.featured &&
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                    </span>
                }
            </h3>
            <p className="mt-4">{plan.description}</p>
            <div className={`mt-4 text-4xl font-bold`}>
                {
                    plan.isEnterprise?
                        <span>Custom</span>:
                        <span>
                            {price}
                            <span className="text-xs font-normal text-gray-400">/month</span>
                        </span>
                }
            </div>
            <button className={`mt-6 w-full bg-blue-600 text-white py-2 rounded-lg ${plan.isEnterprise && 'bg-gray-700'}`}
                    onClick={() => window.open(plan.ctaAction, '_blank')}
            >
                {plan.ctaLabel}
            </button>

            <ul className="mt-6 space-y-2">
                {plan.features.map((featureGroup, index) => (
                    <ul key={`uf-${index}`}>
                        {featureGroup.category && <li className="text-gray-400 pt-2 pb-2">{featureGroup.category}</li>}
                        {featureGroup.items.map((feature, index) => (
                            <FeatureItem key={index} feature={feature} />
                        ))}

                    </ul>
                ))}
            </ul>
        </div>
    );
};

export const PricingComponent = () => {
    const [billingCycle, setBillingCycle] = useState('annually');

    return (
        <div className="mx-auto max-w-fit pt-12 ">
            <div className="flex justify-center space-x-1 mb-8 ring-opacity-10 ring-1 rounded-3xl w-fit h-fit p-1 m-auto">
                <button
                    className={`px-2 text-xs pt-1 pb-1 pl-2 pr-2 font-medium rounded-3xl ${billingCycle === 'monthly' ? 'bg-white text-gray-900' : ''}`}
                    onClick={() => setBillingCycle('monthly')}
                >
                    Monthly
                </button>
                <button
                    className={`px-2 text-xs pt-1 pb-1 pl-2 pr-2font-medium rounded-3xl ${billingCycle === 'annually' ? 'bg-white text-gray-900' : ''}`}
                    onClick={() => setBillingCycle('annually')}
                >
                    Annually
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {subscriptionPlans.map((plan) => (
                    <PlanCard key={plan.name} plan={plan} billingCycle={billingCycle}/>
                ))}
            </div>
        </div>
    );

}
