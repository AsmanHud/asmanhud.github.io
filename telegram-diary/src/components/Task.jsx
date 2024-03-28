import TrashButton from "./TrashButton";

function Task({ id, textValue, checkboxValue, dispatch }) {
    return (
        <li className="list-group-item d-flex align-items-center">
            <div className="form-check m-0">
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={checkboxValue}
                    onChange={({ target: { checked } }) =>
                        dispatch({
                            type: "inputChange",
                            payload: { name: "checked", id, value: checked },
                        })
                    }
                />
            </div>
            <input
                style={{ margin: "0 0.5rem 0 0.2rem" }}
                className="form-control no-border-input"
                type="text"
                value={textValue}
                onChange={({ target: { value } }) =>
                    dispatch({
                        type: "inputChange",
                        payload: { name: "taskName", id, value },
                    })
                }
                placeholder="Write your task here..."
                aria-label="Task text"
            />
            <TrashButton
                size="1.2rem"
                onClick={() => dispatch({ type: "deleteTask", payload: id })}
            />
        </li>
    );
}

export default Task;
