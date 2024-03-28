function DatePicker({ currDate, onClickPrev, onClickNext }) {
    return (
        <nav className="bg-body-tertiary" aria-label="Navigation between dates">
            <ul className="pagination container p-0 m-0">
                <li className="page-item col-3 text-center">
                    <span
                        className="page-link"
                        aria-label="Previous"
                        onClick={onClickPrev}
                        style={{ userSelect: "none", cursor: "pointer" }}
                    >
                        <span aria-hidden="true">👈</span>
                    </span>
                </li>
                <li className="page-item col-6 disabled text-center">
                    <span className="page-link">{currDate}</span>
                </li>
                <li className="page-item col-3 text-center">
                    <span
                        className="page-link"
                        aria-label="Next"
                        onClick={onClickNext}
                        style={{ userSelect: "none", cursor: "pointer" }}
                    >
                        <span aria-hidden="true">👉</span>
                    </span>
                </li>
            </ul>
        </nav>
    );
}

export default DatePicker;
