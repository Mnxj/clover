import Header from "./header";
import Footer from "./Footer";

const Layout = ({children, title}:any) => {
    return (
        <>
            <Header title={title}/>
            <main>{children}</main>
            <Footer/>
        </>
    );
}
export default Layout
