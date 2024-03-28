import { useEffect, useMemo, useReducer } from "react";

import CardImage from "./components/CardImage";
import DatePicker from "./components/DatePicker";
import Tab from "./components/Tab";
import CardInfo from "./components/CardInfo";
import Task from "./components/Task";
import Button from "./components/Button";

import Card from "./containers/Card";
import CardHeader from "./containers/CardHeader";
import TabNavigator from "./containers/TabNavigator";
import CardBody from "./containers/CardBody";
import List from "./containers/List";
import CardFooter from "./containers/CardFooter";
import ButtonGroup from "./containers/ButtonGroup";

import dailyFormImage from "./assets/images/daily-form.jpg";
import data from "./data/data.json";
import { capitalize, copyToClipboard, formatDate } from "./utils/utils";

const initialState = {
    tabs: data.tabs.map((t) => ({ tabName: t.tabName, taskList: [] })),
    activeTab: data.tabs[0].tabName,
    isCopying: false,
    date: new Date(), // change the implementation!
};

function reducer(state, action) {
    switch (action.type) {
        case "switchTab":
            return {
                ...state,
                activeTab: action.payload,
            };
        case "addTask": {
            const { tabs, activeTab } = state;
            const newTask = { taskName: "", checked: activeTab === "negative" };
            return {
                ...state,
                tabs: tabs.map((tab) =>
                    tab.tabName === activeTab
                        ? { ...tab, taskList: tab.taskList.concat(newTask) }
                        : tab
                ),
            };
        }
        case "inputChange": {
            const { tabs, activeTab } = state;
            const { id, name, value } = action.payload;
            const updateTaskList = (taskList, id, name, value) =>
                taskList.map((task, i) =>
                    i === id ? { ...task, [name]: value } : task
                );
            return {
                ...state,
                tabs: tabs.map((tab) =>
                    tab.tabName === activeTab
                        ? {
                              ...tab,
                              taskList: updateTaskList(
                                  tab.taskList,
                                  id,
                                  name,
                                  value
                              ),
                          }
                        : tab
                ),
            };
        }
        case "deleteTask": {
            const { tabs, activeTab } = state;
            const updateTaskList = (taskList, id) =>
                taskList.filter((t, i) => i !== id);
            return {
                ...state,
                tabs: tabs.map((tab) =>
                    tab.tabName === activeTab
                        ? {
                              ...tab,
                              taskList: updateTaskList(
                                  tab.taskList,
                                  action.payload
                              ),
                          }
                        : tab
                ),
            };
        }
        case "reset": {
            const { tabs, activeTab } = state;
            const resetTaskList = (taskList, checked) =>
                taskList.map((task) => ({ ...task, checked }));
            return {
                ...state,
                tabs: tabs.map((tab) =>
                    tab.tabName === activeTab
                        ? {
                              ...tab,
                              taskList: resetTaskList(
                                  tab.taskList,
                                  activeTab === "negative"
                              ),
                          }
                        : tab
                ),
            };
        }
        case "setCopyFlag":
            return { ...state, isCopying: true };
        case "resetCopyFlag":
            return { ...state, isCopying: false };
        // change the implementation!
        case "setDate":
            return { ...state, date: action.payload };
        case "loadFromLocalStorage":
            return {
                ...state,
                ...action.payload,
            };
        case "saveData": {
            const { tabs, activeTab } = state;
            const dataToSave = JSON.stringify({ tabs, activeTab });
            localStorage.setItem("data", dataToSave);
            return state;
        }
        default:
            return state;
    }
}

function App() {
    const [{ tabs, activeTab, isCopying, date }, dispatch] = useReducer(
        reducer,
        initialState
    );
    const activeTaskList = tabs.find((t) => t.tabName === activeTab).taskList;
    const cardInfo = useMemo(
        () => data.tabs.find((t) => t.tabName === activeTab),
        [activeTab]
    );

    // change the implementation!
    useEffect(() => {
        dispatch({ type: "setDate", payload: new Date() });
    }, []);

    useEffect(() => {
        if (isCopying) {
            copyToClipboard(tabs, date); // change the implementation!
            dispatch({ type: "resetCopyFlag" });
        }
    }, [tabs, date, isCopying]);

    useEffect(() => {
        const storedData = localStorage.getItem("data");
        if (storedData) {
            dispatch({
                type: "loadFromLocalStorage",
                payload: JSON.parse(storedData),
            });
        }
    }, []);

    useEffect(() => {
        dispatch({ type: "saveData" });
    });

    return (
        <Card width="26rem">
            <CardImage
                src={dailyFormImage}
                alt="Illustration for the Daily tasks card"
            />
            <DatePicker
                currDate={date ? formatDate(date) : ""} // possibly change the implementation!
                onClickPrev={() => alert("Development in progress...")}
                onClickNext={() => alert("Development in progress...")}
            />
            <CardHeader>
                <TabNavigator>
                    {tabs.map((t) => (
                        <Tab
                            key={t.tabName}
                            text={capitalize(t.tabName)}
                            active={t.tabName === activeTab}
                            dispatch={dispatch}
                        />
                    ))}
                </TabNavigator>
            </CardHeader>
            <CardBody>
                <CardInfo label={cardInfo.label}>
                    {cardInfo.description}
                </CardInfo>
            </CardBody>
            <List>
                {activeTaskList.map((task, i) => (
                    <Task
                        key={`${activeTab}-${i}`}
                        id={i}
                        textValue={task.taskName}
                        checkboxValue={task.checked}
                        dispatch={dispatch}
                    />
                ))}
            </List>
            <CardFooter className="p-0">
                <ButtonGroup inputComponent={{ className: "btn-secondary" }}>
                    <Button onClick={() => dispatch({ type: "addTask" })}>
                        Add a new task
                    </Button>
                    <Button onClick={() => dispatch({ type: "setCopyFlag" })}>
                        Generate message
                    </Button>
                    <Button onClick={() => dispatch({ type: "reset" })}>
                        Reset the day
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
}

export default App;
