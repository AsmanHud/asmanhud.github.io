function CardInfo({ label, children }) {
    return (
        <>
            <h5 className="card-title">{label}</h5>
            <p className="card-text">{children}</p>
        </>
    );
}

export default CardInfo;
