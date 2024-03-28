import data from "../data/data.json";

export const getRandomId = () => crypto.randomUUID();

export const capitalize = (s) => s.at(0).toUpperCase() + s.slice(1);

export const formatDate = (date) =>
    date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

export const compileMessage = (tabs, date) => {
    const mergedData = data.tabs.map((t, i) => ({
        tabName: t.tabName,
        tabNameMsg: t.tabNameMsg,
        taskList: tabs.at(i).taskList,
    }));
    const formatTaskList = (taskList) =>
        taskList
            .map((task) => `${task.taskName} - ${task.checked ? "✅" : "❌"}`)
            .join("\n");
    const text = mergedData
        .map(
            (t) =>
                `${t.tabName === "negative" ? "\n" : ""}${
                    t.tabNameMsg
                }:\n${formatTaskList(t.taskList)}`
        )
        .join("\n");
    return `${formatDate(date)}\n\n${text}`;
};

export const copyToClipboard = async (tabs, date) => {
    try {
        await navigator.clipboard.writeText(compileMessage(tabs, date));
        console.log("Text copied to clipboard");
    } catch (err) {
        console.error("Failed to copy: ", err);
    }
};
