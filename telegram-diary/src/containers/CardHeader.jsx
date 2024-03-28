function CardHeader({ children, className = "" }) {
    return <div className={`card-header ${className}`}>{children}</div>;
}

export default CardHeader;
