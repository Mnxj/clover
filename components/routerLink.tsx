import Link from "next/link";
export const RouterLink = (children:any,link:string) =>{
    return (
        <Link href={link}>
            {children}
        </Link>
    )
}