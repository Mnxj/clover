import styles from './Header.module.css'
import {roll} from "./navigationbar";
import Link from "next/link";
import {useEffect, useState} from "react";

export const HeaderBranding = () => {
    return (
        <div className={styles.headerBranding}>
            <h1 className={styles.headerTitle}>
                幸いです
                <img src="/images/log.svg" className={styles.imageLog} alt="log"/>
            </h1>
        </div>
    )
}
export const RollList = () => {
    return (
        <ul>
            {roll.map(item => (
                <li key={item.link}>
                    <Link href={item.link} passHref>
                        <span className={item.span_class}>
                            <i className={item.i_class}/>{item.span_text}
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    )
}


const Header = () => {
    const [scrollStyles, setScrollStyles] = useState(false);
    const [scrollTopWidth, setScrollTopWidth] = useState(0);
    const [scrollTopWidthFlag, setScrollTopWidthFlag] = useState(false);
    const handleScroll = () => {
        setScrollTopWidthFlag(true)
        if (document.documentElement.scrollTop > 60) {
            setScrollStyles(true)
        } else {
            setScrollStyles(false)
        }

        // scrollHeight=clientHeight+scrollTop
        setScrollTopWidth((document.documentElement.scrollTop * 100) / (document.documentElement.scrollHeight - document.documentElement.clientHeight));
    }
    const backTop = () => {
        setScrollStyles(false);
        let anchorElement = document.getElementById("main-container"); // 须要定位看到的锚点元素
        if (anchorElement) {
            anchorElement.scrollIntoView({behavior: 'smooth'});
        }
    }
    useEffect(() => {
        if (scrollTopWidth >= 98) {
            setTimeout(() => {
                setScrollTopWidthFlag(false)
            }, 2000);
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [scrollStyles, scrollTopWidth]);

    return (
        <div id="main-header" className={styles.mainHeader}>
            <div className={scrollTopWidthFlag ? styles.scrollTop : ''} style={{"width": `${scrollTopWidth}%`}}/>
            <a className={scrollStyles ? styles.cdTopVisible : styles.cdTop} onClick={backTop}/>
            <header className={scrollStyles ? styles.headerWhiteContainer : styles.headerContainer}>
                <div className={styles.headerTop}>
                    <HeaderBranding/>
                    <div className={styles.searchBox}>
                        <i className='iconfont js-toggle-search icon-search' style={{fontFamily: "iconfont"}}/>
                    </div>
                    <div className={styles.lowerContainer}>
                        <div className={styles.lower}>
                            <nav>
                                <ul>
                                    <RollList/>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            <button className={styles.mCdTop} title="Go to top" onClick={backTop}>
                <i className="fa fa-chevron-up" aria-hidden="true"/>
            </button>
        </div>
    );
}

export default Header
