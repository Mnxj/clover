import styles from './Header.module.css'
import {roll} from "./navigationbar";
import Link from "next/link";

const Header = () => {

    return (
        <header className={styles.headerContainer}>
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
                                            <a>
                                                <span className={item.span_class}>
                                                    <i className={item.i_class}/>{item.span_text}
                                                </span>
                                            </a>
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
