
export const LazyImage = ({imgUrl}: { imgUrl: string }) => {
    imgUrl = imgUrl ? imgUrl : '/images/orange.svg';
    return (
        <img
            src={imgUrl}
            alt=""
            placeholder="blur"
            />
    )
}