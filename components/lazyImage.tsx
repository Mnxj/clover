import Image from "next/image";

export const LazyImage = ({imgUrl}: { imgUrl: string }) => {
    return (
        <Image
            src={imgUrl}
            alt={imgUrl.substring(0, 7)}
            layout="fill"
            placeholder="blur"
            blurDataURL="/images/orange.svg"/>
    )
}