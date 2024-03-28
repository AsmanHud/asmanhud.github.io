function Button({ onClick, children, className = "" }) {
    return (
        <button type="button" className={`btn ${className}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
