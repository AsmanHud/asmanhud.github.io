function CardFooter({ children, className = "" }) {
    return <div className={`card-footer ${className}`}>{children}</div>;
}

export default CardFooter;
