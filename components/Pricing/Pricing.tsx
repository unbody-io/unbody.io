import React, {useState} from 'react';
import {subscriptionPlans} from "../../lib/pricing.configs";
import {useTheme} from "next-themes";


const FeatureItem = ({feature, showDetails}) => {

    return (
        <li className="flex mb-2">
            <svg className="shrink-0 w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
            </svg>
            <div>
                <span className={"block"}>{feature.feature}</span>
                {feature.note && <span className="text-gray-400 text-xs" dangerouslySetInnerHTML={{
                    __html: feature.note
                }}></span>}

                {
                    (feature.table && showDetails) &&
                    <div>
                        -
                        <ul className={"mb-4"}>
                            {feature.table.map((item, index) => (
                                <li key={index} className="flex">
                                    <span className="text-gray-400 text-xs">
                                        <>{item.solution}</>
                                        {item.price && <>, + {item.price}</>}
                                        {item.included && <> ({item.included})</>}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                }

            </div>
        </li>
    )
}

const PlanCard = ({plan, showDetails}) => {
    const {theme} = useTheme();
    const isDark = theme === 'dark';

    const cardBg = isDark ? (plan.isEnterprise ? 'bg-gray-50' : 'bg-black') : (plan.isEnterprise ? 'bg-black' : 'bg-white');
    const cardText = isDark ? (plan.isEnterprise ? 'text-gray-900' : 'text-gray-300') : (plan.isEnterprise ? 'text-gray-100' : 'text-gray-900');
    const ringColor = isDark ? 'ring-gray-50' : 'ring-gray-900';

    return (
        <div
            className={`ring-1 ${ringColor} ring-opacity-10 rounded-3xl p-6 transition-all duration-300 text-sm ${cardBg} ${cardText}`}
            style={{
                maxWidth: '350px',
            }}
        >
            <h3 className="text-lg font-semibold flex gap-2 items-center">
                <span>{plan.name}</span>
                {
                    plan.featured &&
                    <div className={"flex justify-center"}>
                        <span className="relative flex h-3 w-3">
                          <span
                              className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                        </span>
                        <span style={{
                            transform: "translate(10px, -7px)",
                        }}
                              className={"font-semibold text-white bg-purple-800 pl-2 pr-2 pt-1 pb-1 rounded-lg text-xs"}
                        >
                            5X Faster
                        </span>
                    </div>
                }
            </h3>
            <p className="mt-4">{plan.description}</p>
            <div className={`mt-4 text-4xl font-bold`}>
                {
                    plan.isEnterprise ?
                        <span>Custom</span> :
                        <>
                            <div>
                            {
                                plan.discount &&
                                <span className="text-gray-300 line-through text-sm">${plan.discount.price}</span>
                            }
                                <span>{plan.priceMonthly}</span>
                                <span className="text-xs font-normal text-gray-400">/month</span>
                            </div>
                            {
                                plan.discount&&
                                <span className={"text-xs font-light m-0 p-0 absolute text-gradient_color1"}>{plan.discount.note}</span>
                            }
                        </>
                }
            </div>
            <button
                className={`mt-6 w-full bg-blue-600 text-white py-2 rounded-lg ${plan.isEnterprise && 'bg-gray-700'}`}
                onClick={() => window.open(plan.ctaAction, '_blank')}
            >
                {plan.ctaLabel}
            </button>

            <ul className="mt-6 space-y-2">
                {plan.features.map((featureGroup, index) => (
                    <ul key={`uf-${index}`}>
                        {featureGroup.category && <li className="text-gray-400 pt-2 pb-2">{featureGroup.category}</li>}
                        {featureGroup.items.map((feature, index) => (
                            <FeatureItem key={index} feature={feature} showDetails={showDetails}/>
                        ))}

                    </ul>
                ))}
            </ul>
        </div>
    );
};

export const PricingComponent = () => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="mx-auto max-w-fit pt-12 ">
            <div
                className="flex justify-center space-x-1 mb-8 ring-opacity-10 rounded-3xl w-fit h-fit p-1 m-auto">
                <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" value=""
                           className="sr-only peer"
                           onChange={(e) => setShowDetails(e.target.checked)}
                    />
                    <div
                        className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Show Details
                    </span>
                </label>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {subscriptionPlans.map((plan) => (
                    <PlanCard key={plan.name} plan={plan} showDetails={showDetails}/>
                ))}
            </div>
        </div>
    );

}
