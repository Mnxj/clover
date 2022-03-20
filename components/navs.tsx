import { useRouter } from "next/router";
import Link from "next/link";
import {NavsItem} from "../type/navs-item";

const menu = [
    { text: "网站首页", link: "/" },
    { text: "关于我们", link: "/about" },
    { text: "博客列表", link: "/articles" }
];

const NavItem = ({navsItem,currentPage}:{navsItem:NavsItem,currentPage:string}) =>{
    if (navsItem.link === currentPage) {
        return (
            <li className="active">
                <strong>{navsItem.text}</strong>
            </li>
        );
    } else {
        return (
            <li>
                <Link href={navsItem.link}>
                    <a>{navsItem.text}</a>
                </Link>
            </li>
        );
    }
}

const Navs = () => {
    const router = useRouter(),
        currentPage = router.pathname;

    return (
        <nav>
            <ul>
                {menu.map((item) => (
                    <NavItem
                        key={item.link}
                        navsItem={item}
                        currentPage={currentPage}
                    />
                ))}
            </ul>
        </nav>
    );
}

export  default Navs
