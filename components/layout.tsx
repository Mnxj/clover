import Header from "./header/Header";
import Footer from "./footer/Footer";

const Layout = ({children}: any) => {
    return (
        <div>
            <section id="main-container">
                <div id="main-header" className="main-header">
                    <Header />
                </div>
                {children}
                <Footer/>
            </section>
        </div>
    );
}
export default Layout
