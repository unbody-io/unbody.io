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
                    <span className={`upper ${styles.catTitle}`}>COMPANY</span>
                    <div className={`${styles.catItems}`}>
                        <Link className="cap" href="/about">About</Link>
                        <Link className="cap" href="/join-us">Join Us</Link>
                        <Link className="cap" href="/pricing">Pricing</Link>
                        <Link className="cap" href="/solutions">Solutions</Link>
                        <Link className="cap" href="/xbody">Xbody</Link>
                        <Link className="cap" href="/faq">FAQ</Link>
                        <Link className="cap" href="/terms">Terms</Link>
                        <Link className="cap" href="/privacy">Privacy</Link>
                    </div>
                </div>
                <div className="col-3">
                    <span className={`upper ${styles.catTitle}`}>CONTACT</span>
                    <div className={styles.catItems}>
                        <a href="https://www.linkedin.com/company/unbody" target="_blank" className="cap">LinkedIn</a>
                        <a href="https://twitter.com/unbody_io" target="_blank" className="cap">X</a>
                        <a href="https://github.com/unbody-io" target="_blank" className="cap">Github</a>
                        <a href={"https://www.youtube.com/@Unbody"} target={"_blank"} className={"cap"}>Youtube</a>
                        <a href={"https://discord.gg/EndNGdxY"} target={"_blank"} className={"cap"}>Discord</a>
                        —
                        <a href={"mailto:hello@unbody.io"}>Sales</a>
                    </div>
                </div>
                <div className="col-3">
                    <span className={`upper ${styles.catTitle}`}>RESOURCES</span>
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
