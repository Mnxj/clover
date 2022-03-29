import Header, {HeaderBranding} from "../header/Header";
import Footer from "../footer/Footer";
import {Sidebar} from "../sidebar/Sidebar";
import {useState} from "react";
import styles from "./Layout.module.css";


const Layout = ({children}: any) => {
    const [openNav, setOpenNav] = useState(false);
    return (
        <div>
            <section id="main-container" className={openNav?styles.mainContainer:''}>
                <div className={openNav ? styles.openNav : styles.openInvalidNav}>
                    <div className={styles.iconFlat} onClick={() => setOpenNav(!openNav)}>
                        <span className={styles.icon}/>
                    </div>
                    <HeaderBranding/>
                </div>
                <Header/>
                {children}
                <Footer/>
            </section>
            <Sidebar openNav={openNav}/>
        </div>
    );
}
export default Layout
