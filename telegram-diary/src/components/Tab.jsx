function Tab({ text, dispatch, active = false }) {
    return (
        <li className="nav-item">
            <button
                className={`nav-link ${active ? "active" : ""}`}
                onClick={() =>
                    dispatch({ type: "switchTab", payload: text.toLowerCase() })
                }
                aria-current={active ? "page" : undefined}
            >
                {text}
            </button>
        </li>
    );
}

export default Tab;
