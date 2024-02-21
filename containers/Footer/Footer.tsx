import React from 'react';

import styles from './Footer.module.css';
import Link from "next/link";


const Footer = () => {
    return (
        <footer className={`${styles.footer}`}>
            <div className={`grid md:grid-cols-4 ${styles.footerLinks}`}>
                <div className="col-4">
                    <h3>Unbody</h3>
                    <small>hello@unbody.io</small>
                </div>
                <div className="col-3">
                    <span className={`upper ${styles.catTitle}`}>ABOUT US</span>
                    <div className={`${styles.catItems}`}>
                        <Link className="cap" href="/about">About Unbody</Link>
                        <Link className="cap" href="/xbody">Xbody</Link>
                        <Link className="cap" href="/faq">FAQ</Link>
                        <Link className="cap" href="/terms">Terms</Link>
                        <Link className="cap" href="/privacy">Privacy</Link>
                    </div>
                </div>
                <div className="col-3">
                    <span className={`upper ${styles.catTitle}`}>GET IN TOUCH</span>
                    <div className={styles.catItems}>
                        <a href="https://www.linkedin.com/company/unbody" target="_blank" className="cap">LinkedIn</a>
                        <a href="https://twitter.com/unbody_io" target="_blank" className="cap">Twitter</a>
                        <a href="https://github.com/unbody-io" target="_blank" className="cap">Github</a>
                    </div>
                </div>
                <div className="col-3">
                    <span className={`upper ${styles.catTitle}`}>DOCS &amp; HELP</span>
                    <div className={styles.catItems}>
                        <Link className="cap" href="/docs">Documentation</Link>
                        <Link className="cap" href="/blog">Blog</Link>
                    </div>
                </div>
            </div>
            <div>
                <div className={styles.copy}>
                    <small>©Unbody {new Date().getFullYear()}</small>
                </div>
            </div>
        </footer>
    );
};

export default Footer
