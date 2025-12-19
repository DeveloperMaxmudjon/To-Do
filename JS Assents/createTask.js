let listStatus = 0;

let taskNum = 0;
let completedCount = 0;
let inProgressCount = 0;
let notStartedCount = 0;

let taskId = 0;
let taskListGroup = [];

let activeVitalTaskId = null;
let activeMyTaskId = null;

let editMode = false;
let editingTaskId = null;

const today = new Date();
const day = today.getDate();
const month = today.toLocaleString('en-US', { month: 'long' });
const todayEl = document.getElementById("today-date");
if (todayEl) {
    todayEl.innerHTML = `${day} ${month}`;
}

const imgItems = document.querySelectorAll('.taskImg div span');
imgItems.forEach((item) => {
    item.addEventListener('click', () => {
        imgItems.forEach(el => el.classList.remove('selected'));
        item.classList.add('selected');
    });
});

const priorityListContainer = document.querySelector('.taskPriority ul');
const statusListContainer = document.querySelector('.taskStatus ul');

function getColorForName(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 70%, 50%)`;
}

function syncTaskOptions() {
    function createListItem(name) {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.alignItems = "center";

        const circle = document.createElement("span");
        circle.style.width = "7px";
        circle.style.height = "7px";
        circle.style.borderRadius = "50%";
        circle.style.display = "inline-block";
        circle.style.backgroundColor = getColorForName(name);
        circle.style.marginRight = "8px";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.style.marginLeft = "10px";

        li.appendChild(circle);
        li.appendChild(document.createTextNode(name + " "));
        li.appendChild(checkbox);

        return li;
    }

    if (priorityListContainer) {
        priorityListContainer.innerHTML = "";
        const priorityRows = document.querySelectorAll('#priorityBody tr');
        priorityRows.forEach(row => {
            const nameCell = row.querySelector("td:nth-child(2)");
            if (nameCell) {
                const priorityName = nameCell.textContent.trim();
                const li = createListItem(priorityName);
                priorityListContainer.appendChild(li);
            }
        });
    }

    if (statusListContainer) {
        statusListContainer.innerHTML = "";
        const statusRows = document.querySelectorAll('#statusBody tr');
        statusRows.forEach(row => {
            const nameCell = row.querySelector("td:nth-child(2)");
            if (nameCell) {
                const statusName = nameCell.textContent.trim();
                const li = createListItem(statusName);
                statusListContainer.appendChild(li);
            }
        });
    }

    const dynamicFieldsContainer = document.getElementById("dynamicTaskFields");
    if (dynamicFieldsContainer) {
        dynamicFieldsContainer.innerHTML = "";

        const customSections = document.querySelectorAll('#categHero section[data-category-id]');
        customSections.forEach(sec => {
            const categoryTitle = sec.querySelector('header h3') ? sec.querySelector('header h3').textContent : "Category";
            const categoryId = sec.dataset.categoryId;

            const div = document.createElement("div");
            div.className = "taskDynamicCategory";
            div.dataset.dynamicCategoryId = categoryId;
            div.dataset.dynamicCategoryTitle = categoryTitle;
            div.style.display = "flex";
            div.style.flexDirection = "column";
            div.style.gap = "10px";

            const h1 = document.createElement("h1");
            h1.textContent = categoryTitle;
            h1.style.fontSize = "14px";
            h1.style.fontWeight = "600";

            const ul = document.createElement("ul");
            ul.style.display = "flex";
            ul.style.gap = "55px";
            ul.style.flexWrap = "wrap";

            const rows = sec.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const nameCell = row.querySelector("td:nth-child(2)");
                if (nameCell) {
                    const itemName = nameCell.textContent.trim();
                    const li = createListItem(itemName);
                    ul.appendChild(li);
                }
            });

            div.appendChild(h1);
            div.appendChild(ul);
            dynamicFieldsContainer.appendChild(div);
        });
    }

    attachCheckboxListeners();
}

function attachCheckboxListeners() {
    const priorityCheckboxes = document.querySelectorAll('.taskPriority ul li input[type="checkbox"]');
    priorityCheckboxes.forEach(cb => {
        cb.addEventListener("change", () => {
            if (cb.checked) {
                priorityCheckboxes.forEach(other => {
                    if (other !== cb) other.checked = false;
                });
            }
        });
    });

    const statusCheckboxes = document.querySelectorAll('.taskStatus ul li input[type="checkbox"]');
    statusCheckboxes.forEach(cb => {
        cb.addEventListener("change", () => {
            if (cb.checked) {
                statusCheckboxes.forEach(other => {
                    if (other !== cb) other.checked = false;
                });
            }
        });
    });

    const dynamicDivs = document.querySelectorAll('#dynamicTaskFields > div');
    dynamicDivs.forEach(div => {
        const cbs = div.querySelectorAll('ul li input[type="checkbox"]');
        cbs.forEach(cb => {
            cb.addEventListener("change", () => {
                if (cb.checked) {
                    cbs.forEach(other => {
                        if (other !== cb) other.checked = false;
                    });
                }
            });
        });
    });
}

syncTaskOptions();

document.addEventListener("taskCategoriesUpdated", function () {
    syncTaskOptions();
});

function resetTaskForm() {
    const titleInput = document.getElementById("title");
    const dateInput = document.getElementById("dateGet");
    const descInput = document.getElementById("descGet");

    if (titleInput) titleInput.value = "";
    if (dateInput) dateInput.value = "";
    if (descInput) descInput.value = "";

    const titleErr = document.getElementById("titleNotif");
    const dateErr = document.getElementById("dateNotif");
    const descErr = document.getElementById("descNotif");

    if (titleErr) titleErr.textContent = "";
    if (dateErr) dateErr.textContent = "";
    if (descErr) descErr.textContent = "";

    const allCbs = document.querySelectorAll('.taskPriority ul li input[type="checkbox"], .taskStatus ul li input[type="checkbox"], #dynamicTaskFields input[type="checkbox"]');
    allCbs.forEach(cb => cb.checked = false);

    imgItems.forEach(el => el.classList.remove("selected"));
}

function openCreateTaskModal() {
    editMode = false;
    editingTaskId = null;
    resetTaskForm();
    const menu = document.getElementById("taskMenu");
    if (menu) menu.style.top = "0";
}

function closeTaskModal() {
    const menu = document.getElementById("taskMenu");
    if (menu) menu.style.top = "-1000px";
}

const addTaskBtn = document.getElementById("addTask");
const removeTaskBtn = document.getElementById("removeTaskMenu");

if (addTaskBtn) {
    addTaskBtn.onclick = function () {
        openCreateTaskModal();
    };
}

if (removeTaskBtn) {
    removeTaskBtn.onclick = function () {
        closeTaskModal();
    };
}

let priority = "";

function getPriorityFromForm() {
    const checked = document.querySelector('.taskPriority ul li input[type="checkbox"]:checked');
    if (!checked) {
        priority = "";
        return "";
    }
    return checked.parentElement.textContent.trim();
}

function getCircleColor(priorityValue) {
    return getColorForName(priorityValue);
}

function getStatusFromForm() {
    const checked = document.querySelector('.taskStatus ul li input[type="checkbox"]:checked');
    if (!checked) return "Not Started";
    return checked.parentElement.textContent.trim();
}

function getStatusColor(status) {
    return getColorForName(status);
}

function getCustomFieldsFromForm() {
    const fields = {};
    const dynamicDivs = document.querySelectorAll('#dynamicTaskFields > div');
    dynamicDivs.forEach(div => {
        const title = div.dataset.dynamicCategoryTitle;
        const checked = div.querySelector('ul li input[type="checkbox"]:checked');
        if (checked && title) {
            fields[title] = checked.parentElement.textContent.trim();
        }
    });
    return fields;
}

function renderCustomFieldsInDetails(task) {
    if (!task.customFields) return "";
    let html = "";
    for (const [key, value] of Object.entries(task.customFields)) {
        const color = getColorForName(value);
        html += `
            <span>
                ${key} :
                <p style="color:${color};">
                    ${value}
                </p>
            </span>
        `;
    }
    return html;
}

function isVitalTask(task) {
    const vitalPriority =
        task.priority === "Extreme" ||
        task.priority === "Moderate";

    const vitalStatus =
        task.status === "Not Started" ||
        task.status === "In Progress";

    return vitalPriority && vitalStatus;
}

function updateStats() {
    const completedDB = document.getElementById("completedDB");
    const completedText = document.getElementById("completedText");

    const progressDB = document.getElementById("progressDB");
    const progresText = document.getElementById("progresText");

    const stratedDB = document.getElementById("stratedDB");
    const stratedText = document.getElementById("stratedText");

    if (!completedDB || !completedText || !progressDB || !progresText || !stratedDB || !stratedText) {
        return;
    }

    function applyDonut(circleEl, textEl, count, color) {
        if (taskNum === 0) {
            circleEl.style.background = "conic-gradient(#D9D9D9 0deg 360deg)";
            textEl.innerHTML = "0%";
            return;
        }

        const percent = (count / taskNum) * 100;
        const rounded = Math.round(percent);
        const deg = (percent / 100) * 360;

        circleEl.style.background = `conic-gradient(
            ${color} 0deg ${deg}deg,
            #D9D9D9 ${deg}deg 360deg
        )`;

        textEl.innerHTML = `${rounded}%`;
    }

    if (taskNum === 0) {
        applyDonut(completedDB, completedText, 0, "#05A301");
        applyDonut(progressDB, progresText, 0, "#0225FF");
        applyDonut(stratedDB, stratedText, 0, "#F21E1E");
        return;
    }

    applyDonut(completedDB, completedText, completedCount, "#05A301");
    applyDonut(progressDB, progresText, inProgressCount, "#0225FF");
    applyDonut(stratedDB, stratedText, notStartedCount, "#F21E1E");
}

const compeltedList = document.getElementById("compeltedList");
const taskList = document.getElementById("taskList");
const taskListTwo = document.getElementById("taskListTwo");
const vitalTaskList = document.getElementById("vitalTaskList");
const myTaskList = document.getElementById("myTaskList");
const vitalTaskDetails = document.querySelector(".taskInf");
const myTaskDetails = document.querySelector(".myTaskInf");

function shortDesc(desc) {
    if (!desc) return "";
    if (desc.length <= 85) return desc;
    return desc.substring(0, 85) + ".....";
}

function formatDisplayDate(isoDate) {
    if (!isoDate || !isoDate.includes("-")) return isoDate || "";
    const [yyyy, mm, dd] = isoDate.split("-");
    return `${dd}/${mm}/${yyyy}`;
}

function buildTaskCardHTML(task) {
    const displayDate = formatDisplayDate(task.date);
    const finalDesc = shortDesc(task.desc);

    return `
        <div class="taskItem" data-task-id="${task.id}" style="border: 1px solid #A1A3ABA1;">
            <span class="circle">
                <svg style="stroke:${task.statusColor};" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                     viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     class="icon icon-tabler icons-tabler-outline icon-tabler-circle">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                </svg>
            </span>
            <div>
                <h3>${task.title}</h3>
                <span>
                    <p>${finalDesc}</p>
                    ${task.imgSrc ? `<img src="${task.imgSrc}" alt="">` : ""}
                </span>
                <div>
                    <span>Priority : <p style="color:${task.priorityColor};">${task.priority}</p></span>
                    <span>Status: <p style="color:${task.statusColor};">${task.status}</p></span>
                    <span>Created on: ${displayDate}</span>
                </div>
            </div>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-list"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l11 0" /><path d="M9 12l11 0" /><path d="M9 18l11 0" /><path d="M5 6l0 .01" /><path d="M5 12l0 .01" /><path d="M5 18l0 .01" /></svg>
            </span>
        </div>
    `;
}

function renderDashboardLists() {
    if (taskList) taskList.innerHTML = "";
    if (taskListTwo) taskListTwo.innerHTML = "";
    if (compeltedList) compeltedList.innerHTML = "";

    let nonCompletedCount = 0;

    taskListGroup.forEach(task => {
        const cardHTML = buildTaskCardHTML(task);

        if (task.status === "Completed") {
            if (compeltedList) {
                compeltedList.insertAdjacentHTML("beforeend", cardHTML);
            }
        } else {
            nonCompletedCount++;

            // Logic: 
            // 1st task -> taskList
            // 2nd task -> taskListTwo
            // 3rd+ task -> taskList

            if (nonCompletedCount === 2) {
                if (taskListTwo) taskListTwo.insertAdjacentHTML("beforeend", cardHTML);
            } else {
                if (taskList) taskList.insertAdjacentHTML("beforeend", cardHTML);
            }
        }
    });
}

function renderVitalTaskDetails(task) {
    if (!vitalTaskDetails || !task) return;

    const statusColor = task.statusColor || getStatusColor(task.status);
    const priorityColor = task.priorityColor || task.circleColor || "#000";
    const displayDate = formatDisplayDate(task.date);

    vitalTaskDetails.innerHTML = `
        <div class="taskItem" id="task-${task.id}">
            <span>
                ${task.imgSrc ? `<img src="${task.imgSrc}" alt="">` : ""}
                <div>
                    <h3>${task.title}</h3>

                    <span>
                        Priority :
                        <p style="color:${priorityColor};">
                            ${task.priority || "—"}
                        </p>
                    </span>

                    <span>
                        Status:
                        <p style="color:${statusColor};">
                            ${task.status}
                        </p>
                    </span>

                    <span>
                        Created on: ${displayDate}
                    </span>

                    ${renderCustomFieldsInDetails(task)}
                </div>
            </span>

            <div>
                <span>
                    <p>${task.desc}</p>
                </span>
            </div>

            <div class="taskActions">
                <button class="task-delete-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" /><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" /></svg>
                </button>
            
                <button class="task-edit-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                </button>
            </div>
        </div>
    `;

    const deleteBtn = vitalTaskDetails.querySelector(".task-delete-btn");
    if (deleteBtn) {
        deleteBtn.addEventListener("click", () => {
            handleDeleteTask(task.id);
        });
    }

    const editBtn = vitalTaskDetails.querySelector(".task-edit-btn");
    if (editBtn) {
        editBtn.addEventListener("click", () => {
            openEditTaskModal(task);
        });
    }
}

function setActiveVitalTask(taskIdToActivate) {
    activeVitalTaskId = taskIdToActivate;

    if (vitalTaskList) {
        const items = vitalTaskList.querySelectorAll(".taskItem");
        items.forEach(item => {
            item.classList.remove("active");
            const itemId = Number(item.getAttribute("data-task-id"));
            if (itemId === taskIdToActivate) {
                item.classList.add("active");
            }
        });
    }

    const task = taskListGroup.find(t => t.id === taskIdToActivate);
    if (!task) {
        console.warn("Task not found in taskListGroup for id:", taskIdToActivate);
        return;
    }

    renderVitalTaskDetails(task);
}

function renderVitalList() {
    if (!vitalTaskList) return;

    vitalTaskList.innerHTML = "";

    const vitalTasks = taskListGroup.filter(isVitalTask);

    vitalTasks.forEach(task => {
        const cardHTML = buildTaskCardHTML(task);
        vitalTaskList.insertAdjacentHTML("beforeend", cardHTML);
    });

    const items = vitalTaskList.querySelectorAll(".taskItem");
    items.forEach(item => {
        const id = Number(item.getAttribute("data-task-id"));
        item.addEventListener("click", () => {
            setActiveVitalTask(id);
        });
    });

    if (vitalTasks.length > 0) {
        setActiveVitalTask(vitalTasks[0].id);
    } else if (vitalTaskDetails) {
        vitalTaskDetails.innerHTML = "";
    }
}

function renderMyTaskDetails(task) {
    if (!myTaskDetails || !task) return;

    const statusColor = task.statusColor || getStatusColor(task.status);
    const priorityColor = task.priorityColor || task.circleColor || "#000";
    const displayDate = formatDisplayDate(task.date);

    myTaskDetails.innerHTML = `
        <div class="taskItem" id="mytask-${task.id}">
            <span>
                ${task.imgSrc ? `<img src="${task.imgSrc}" alt="">` : ""}
                <div>
                    <h3>${task.title}</h3>

                    <span>
                        Priority :
                        <p style="color:${priorityColor};">
                            ${task.priority || "—"}
                        </p>
                    </span>

                    <span>
                        Status:
                        <p style="color:${statusColor};">
                            ${task.status}
                        </p>
                    </span>

                    <span>
                        Created on: ${displayDate}
                    </span>
                
                    ${renderCustomFieldsInDetails(task)}
                </div>
            </span>

            <div>
                <span>
                    <p>${task.desc}</p>
                </span>
            </div>

            <div class="taskActions">
                <button class="task-delete-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" /><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" /></svg>
                </button>
                <button class="task-edit-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                </button>
            </div>
        </div>
    `;

    const deleteBtn = myTaskDetails.querySelector(".task-delete-btn");
    if (deleteBtn) {
        deleteBtn.addEventListener("click", () => {
            handleDeleteTask(task.id);
        });
    }

    const editBtn = myTaskDetails.querySelector(".task-edit-btn");
    if (editBtn) {
        editBtn.addEventListener("click", () => {
            openEditTaskModal(task);
        });
    }
}

function setActiveMyTask(taskIdToActivate) {
    activeMyTaskId = taskIdToActivate;

    if (myTaskList) {
        const items = myTaskList.querySelectorAll(".taskItem");
        items.forEach(item => {
            item.classList.remove("active");
            const itemId = Number(item.getAttribute("data-task-id"));
            if (itemId === taskIdToActivate) {
                item.classList.add("active");
            }
        });
    }

    const task = taskListGroup.find(t => t.id === taskIdToActivate);
    if (!task) return;

    renderMyTaskDetails(task);
}

function renderMyTaskList() {
    if (!myTaskList) return;

    myTaskList.innerHTML = "";

    taskListGroup.forEach(task => {
        const cardHTML = buildTaskCardHTML(task);
        myTaskList.insertAdjacentHTML("beforeend", cardHTML);
    });

    const items = myTaskList.querySelectorAll(".taskItem");
    items.forEach(item => {
        const id = Number(item.getAttribute("data-task-id"));
        item.addEventListener("click", () => {
            setActiveMyTask(id);
        });
    });

    if (taskListGroup.length > 0) {
        setActiveMyTask(taskListGroup[0].id);
    } else if (myTaskDetails) {
        myTaskDetails.innerHTML = "";
    }
}

function handleDeleteTask(taskIdToDelete) {
    const index = taskListGroup.findIndex(t => t.id === taskIdToDelete);
    if (index === -1) {
        console.warn("Task not found for delete:", taskIdToDelete);
        return;
    }

    const removedTask = taskListGroup[index];

    taskNum = Math.max(0, taskNum - 1);
    if (removedTask.status === "Completed") {
        completedCount = Math.max(0, completedCount - 1);
    } else if (removedTask.status === "In Progress") {
        inProgressCount = Math.max(0, inProgressCount - 1);
    } else {
        notStartedCount = Math.max(0, notStartedCount - 1);
    }

    taskListGroup.splice(index, 1);

    rebuildAllUI();
}

function openEditTaskModal(task) {
    if (!task) return;

    editMode = true;
    editingTaskId = task.id;

    resetTaskForm();

    const titleInput = document.getElementById("title");
    const dateInput = document.getElementById("dateGet");
    const descInput = document.getElementById("descGet");

    if (titleInput) titleInput.value = task.title;
    if (dateInput) dateInput.value = task.date;
    if (descInput) descInput.value = task.desc;

    const allPriorityCbs = document.querySelectorAll('.taskPriority ul li input[type="checkbox"]');
    allPriorityCbs.forEach(cb => {
        cb.checked = false;
        const text = cb.parentElement.textContent.trim();
        if (text === task.priority) cb.checked = true;
    });

    const allStatusCbs = document.querySelectorAll('.taskStatus ul li input[type="checkbox"]');
    allStatusCbs.forEach(cb => {
        cb.checked = false;
        const text = cb.parentElement.textContent.trim();
        if (text === task.status) cb.checked = true;
    });

    // Set Dynamic Fields
    if (task.customFields) {
        const dynamicDivs = document.querySelectorAll('#dynamicTaskFields > div');
        dynamicDivs.forEach(div => {
            const title = div.dataset.dynamicCategoryTitle;
            const val = task.customFields[title];
            if (val) {
                const cbs = div.querySelectorAll('ul li input[type="checkbox"]');
                cbs.forEach(cb => {
                    cb.checked = false;
                    if (cb.parentElement.textContent.trim() === val) {
                        cb.checked = true;
                    }
                });
            }
        });
    }

    if (task.imgSrc) {
        imgItems.forEach(span => {
            span.classList.remove("selected");
            const img = span.querySelector("img");
            if (img && img.getAttribute("src") === task.imgSrc) {
                span.classList.add("selected");
            }
        });
    }

    const menu = document.getElementById("taskMenu");
    if (menu) menu.style.top = "0";
}

const createTaskBtn = document.getElementById("createTaskBtn");

if (createTaskBtn) {
    createTaskBtn.onclick = function () {
        const titleEl = document.getElementById("title");
        const dateEl = document.getElementById("dateGet");
        const descEl = document.getElementById("descGet");

        const titleValue = titleEl ? titleEl.value.trim() : "";
        const dateValue = dateEl ? dateEl.value.trim() : "";
        const descValue = descEl ? descEl.value.trim() : "";

        const titleErr = document.getElementById("titleNotif");
        const dateErr = document.getElementById("dateNotif");
        const descErr = document.getElementById("descNotif");

        if (titleErr) titleErr.textContent = "";
        if (dateErr) dateErr.textContent = "";
        if (descErr) descErr.textContent = "";

        let valid = true;

        if (!titleValue) {
            if (titleErr) titleErr.textContent = "Enter title";
            valid = false;
        }
        if (!dateValue) {
            if (dateErr) dateErr.textContent = "Enter date";
            valid = false;
        }
        if (!descValue) {
            if (descErr) descErr.textContent = "Enter Description";
            valid = false;
        }

        if (!valid) return;

        const createdOn = dateValue;

        const taskPriority = getPriorityFromForm();
        const circleColor = getCircleColor(taskPriority);
        const taskStatus = getStatusFromForm();
        const taskStatusColor = getStatusColor(taskStatus);

        const selectedImg = document.querySelector('.taskImg div span.selected img');
        const imgSrc = selectedImg ? selectedImg.getAttribute('src') : "";

        if (!editMode) {
            const newTask = {
                id: taskId,
                title: titleValue,
                desc: descValue,
                date: createdOn,
                priority: taskPriority,
                circleColor: circleColor,
                status: taskStatus,
                statusColor: taskStatusColor,
                imgSrc: imgSrc,
                priorityColor: circleColor,
                customFields: getCustomFieldsFromForm()
            };

            taskListGroup.push(newTask);

            taskNum++;
            if (newTask.status === "Completed") completedCount++;
            else if (newTask.status === "In Progress") inProgressCount++;
            else notStartedCount++;

            taskId++;
        } else {
            const idx = taskListGroup.findIndex(t => t.id === editingTaskId);
            if (idx === -1) {
                console.warn("Editing task not found:", editingTaskId);
            } else {
                const task = taskListGroup[idx];
                const oldStatus = task.status;

                task.title = titleValue;
                task.desc = descValue;
                task.date = createdOn;
                task.priority = taskPriority;
                task.circleColor = circleColor;
                task.priorityColor = circleColor;
                task.status = taskStatus;
                task.statusColor = taskStatusColor;
                task.imgSrc = imgSrc;
                task.customFields = getCustomFieldsFromForm();

                if (oldStatus !== task.status) {
                    if (oldStatus === "Completed") completedCount = Math.max(0, completedCount - 1);
                    else if (oldStatus === "In Progress") inProgressCount = Math.max(0, inProgressCount - 1);
                    else notStartedCount = Math.max(0, notStartedCount - 1);

                    if (task.status === "Completed") completedCount++;
                    else if (task.status === "In Progress") inProgressCount++;
                    else notStartedCount++;
                }
            }

            editMode = false;
            editingTaskId = null;
        }

        rebuildAllUI();
        closeTaskModal();
        resetTaskForm();
    };
}

function rebuildAllUI() {
    renderDashboardLists();
    renderVitalList();
    renderMyTaskList();
    updateStats();
}

updateStats();