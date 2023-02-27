import React, { useState } from 'react';

import styles from "./Tabs.module.scss"

type Tab = {
    id: string,
    title: string,
    disabled?: boolean,
    content: React.ReactNode,
};

type Props = {
    tabs: Tab[],
};

const Tabs: React.FC<Props> = ({ tabs }) => {
    const [activeTabId, setActiveTabId] = useState(tabs[0].id);
    const activeTab = tabs.find((tab) => tab.id === activeTabId);
    return (
        <div className={styles.tabs}>
            <div className={styles.tabsHeader}>
                {tabs.map((tab) => (
                    <span
                        key={tab.id}
                        className={`cap ${tab.id === activeTabId ? styles.active : ''}`}
                        onClick={() => setActiveTabId(tab.id)}
                    >
                        {tab.title}
                    </span>
                ))}
                <button className={styles.scrollArrow} aria-label="Scroll tabs">
                    &#x279C;
                </button>
            </div>
            <div className={styles.tabBody}>{activeTab!.content}</div>
        </div>
    );
};

export default Tabs;
