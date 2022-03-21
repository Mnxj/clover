import styles from './Header.module.css'
import Navs from "../navs";

const Header =()=> {

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerTop}>
                <div className={styles.headerBranding}>
                    <h1 className={styles.headerTitle}>
                        幸いです
                        <img src="/images/log.svg" className={styles.imageLog}  alt="log" />
                    </h1>
                </div>
                <div className={styles.searchBox}>
                    <i className='iconfont js-toggle-search icon-search' style={{fontFamily:"iconfont"}}/>
                </div>
                <Navs />
            </div>
        </header>
    );
}

export default Header
