import Link from "next/link";
import {LinkItem} from "../type/link-Item";

const Pagelink = ( props:LinkItem) =>{
    const link = `/${props.postsdir}/${props.id}`;

    return (
        <article>
            <h2>
                <Link href={link}>
                    <a>{props.title}</a>
                </Link>
            </h2>
            <p className="time">
                发布时间：
                <time dateTime={props.datefriendly}>{props.dateymd}</time>
            </p>
            <p>{props.description}</p>
        </article>
    );
}
export default Pagelink
