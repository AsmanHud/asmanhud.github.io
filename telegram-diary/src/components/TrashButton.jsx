import TrashIcon from "../assets/svg/trash.svg?react";

function TrashButton({ onClick, size = "1.2rem" }) {
    return (
        <span
            style={{ color: "red", cursor: "pointer" }}
            className="icon-link icon-link-hover"
            onClick={onClick}
        >
            <TrashIcon style={{ width: size, height: size }} />
        </span>
    );
}

export default TrashButton;
