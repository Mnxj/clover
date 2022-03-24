import styles from './Header.module.css'
import {roll} from "./navigationbar";
import Link from "next/link";
import {useEffect, useState} from "react";

const Header = () => {
    const [headerStyles, setHeaderStyles] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 60) {
            setHeaderStyles(true)
        } else {
            setHeaderStyles(false)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [headerStyles]);

    return (
        <header className={headerStyles ? styles.headerWhiteContainer : styles.headerContainer}>
            <div className={styles.headerTop}>
                <div className={styles.headerBranding}>
                    <h1 className={styles.headerTitle}>
                        幸いです
                        <img src="/images/log.svg" className={styles.imageLog} alt="log"/>
                    </h1>
                </div>
                <div className={styles.searchBox}>
                    <i className='iconfont js-toggle-search icon-search' style={{fontFamily: "iconfont"}}/>
                </div>
                <div className={styles.lowerContainer}>
                    <div className={styles.lower}>
                        <nav>
                            <ul>
                                {roll.map(item => (
                                    <li key={item.link}>
                                        <Link href={item.link}>
                                                <span className={item.span_class}>
                                                    <i className={item.i_class}/>{item.span_text}
                                                </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header
