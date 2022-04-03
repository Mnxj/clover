import Image from "next/image";

export const LazyImage = ({imgUrl}: { imgUrl: string }) => {
    imgUrl = imgUrl ? imgUrl : '/images/orange.svg';
    return (
        <Image
            src={imgUrl}
            alt=""
            layout="fill"
            placeholder="blur"
            blurDataURL="/images/orange.svg"/>
    )
}