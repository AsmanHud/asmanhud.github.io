import React from "react";

function ButtonGroup({
    children,
    inputComponent = null,
    className = "",
    ariaLabel = "Button group",
}) {
    return (
        <div
            className={`btn-group w-100 ${className}`}
            role="group"
            aria-label={ariaLabel}
        >
            {React.Children.map(children, (child) =>
                React.cloneElement(child, {
                    className: `${child.props.className || ""} ${
                        inputComponent?.className || ""
                    }`.trim(),
                })
            )}
        </div>
    );
}

export default ButtonGroup;
