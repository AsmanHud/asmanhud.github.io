function CardImage({ src, alt = "Illustration for a card" }) {
    return <img src={src} className="card-img-top" alt={alt} />;
}

export default CardImage;
