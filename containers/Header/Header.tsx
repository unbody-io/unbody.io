import React, {FC, PropsWithChildren, useState} from 'react';
import styles from './Header.module.scss';
import Tag from "../../components/Tag/Tag";

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: 'Pricing', href: '/pricing' },
    { label: 'Docs', href: '/docs' },
    { label: 'Xbody', href: '/xbody' },
];

interface HeaderProps {
    tagline: string;
}

const Header: FC<PropsWithChildren<HeaderProps>> = (props) => {
    const {tagline} = props;
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <Tag>
                    {tagline}
                </Tag>
            </div>
            <nav className={styles.right}>
                {navItems.map((item) => (
                    <a key={item.label} href={item.href}>
                        {item.label}
                    </a>
                ))}
                <button
                    className={styles.menuButton}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? 'Close' : 'Menu'}
                </button>
            </nav>
            {menuOpen && (
                <div className={styles.menuOverlay} onClick={() => setMenuOpen(false)}>
                    <div className={styles.menu}>
                        {navItems.map((item) => (
                            <a key={item.label} href={item.href}>
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header
