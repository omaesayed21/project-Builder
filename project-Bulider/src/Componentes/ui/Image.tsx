interface Iprops {
    imageUrl: string;
    alt: string;
    className: string;
}
const Image = ({imageUrl , alt , className}: Iprops) => {
    return (
        <img className={className} src={imageUrl} alt={alt} />
    )
}
export default Image;