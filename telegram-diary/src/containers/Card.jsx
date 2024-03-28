function Card({ children, width, className = "" }) {
    return (
        <div style={{ width }} className={`card ${className}`}>
            {children}
        </div>
    );
}

export default Card;
