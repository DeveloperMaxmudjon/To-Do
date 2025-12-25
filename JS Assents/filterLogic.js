function init() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const wrapper = btn.closest("span");
            if (!wrapper) return;
            const filterGroup = wrapper.querySelector(".filterGroup");
            if (filterGroup) {
                document.querySelectorAll(".filterGroup").forEach(g => {
                    if (g !== filterGroup) g.style.display = "none";
                });
                const isHidden = filterGroup.style.display === "none" || window.getComputedStyle(filterGroup).display === "none";
                filterGroup.style.display = isHidden ? "flex" : "none";
            }
        });
    });
    document.addEventListener("click", (e) => {
        const isClickInsideAnyFilter = e.target.closest(".filterGroup");
        const isClickInsideAnyBtn = e.target.closest(".filter-btn");
        if (!isClickInsideAnyFilter && !isClickInsideAnyBtn) {
            document.querySelectorAll(".filterGroup").forEach(g => {
                g.style.display = "none";
            });
        }
    });
    document.addEventListener("taskCategoriesUpdated", syncAllFilterOptions);
    syncAllFilterOptions();
}
function syncAllFilterOptions() {
    const filterGroups = document.querySelectorAll(".filterGroup");
    filterGroups.forEach(group => {
        populateFilterGroup(group);
    });
}
function populateFilterGroup(filterGroup) {
    if (!filterGroup) return;
    filterGroup.innerHTML = "";
    const statusSpan = document.createElement("span");
    const statusHeader = document.createElement("h2");
    statusHeader.textContent = "Status";
    statusHeader.style.cursor = "pointer";
    statusHeader.onclick = () => resetFilter(filterGroup);
    statusSpan.appendChild(statusHeader);
    const statusRows = document.querySelectorAll("#statusBody tr");
    statusRows.forEach(row => {
        const nameCell = row.querySelector("td:nth-child(2)");
        if (nameCell) {
            const p = document.createElement("p");
            p.textContent = nameCell.textContent.trim();
            p.onclick = () => applyFilter(filterGroup, p.textContent);
            statusSpan.appendChild(p);
        }
    });
    filterGroup.appendChild(statusSpan);
    const prioritySpan = document.createElement("span");
    const priorityHeader = document.createElement("h2");
    priorityHeader.textContent = "Priority";
    priorityHeader.style.cursor = "pointer";
    priorityHeader.onclick = () => resetFilter(filterGroup);
    prioritySpan.appendChild(priorityHeader);
    const priorityRows = document.querySelectorAll("#priorityBody tr");
    priorityRows.forEach(row => {
        const nameCell = row.querySelector("td:nth-child(2)");
        if (nameCell) {
            const p = document.createElement("p");
            p.textContent = nameCell.textContent.trim();
            p.onclick = () => applyFilter(filterGroup, p.textContent);
            prioritySpan.appendChild(p);
        }
    });
    filterGroup.appendChild(prioritySpan);
    const customSections = document.querySelectorAll('#categHero section[data-category-id]');
    customSections.forEach(sec => {
        const catTitle = sec.querySelector('header h3') ? sec.querySelector('header h3').textContent : "Category";
        const catSpan = document.createElement("span");
        const catHeader = document.createElement("h2");
        catHeader.textContent = catTitle;
        catHeader.style.cursor = "pointer";
        catHeader.onclick = () => resetFilter(filterGroup);
        catSpan.appendChild(catHeader);
        const rows = sec.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const nameCell = row.querySelector("td:nth-child(2)");
            if (nameCell) {
                const p = document.createElement("p");
                p.textContent = nameCell.textContent.trim();
                p.onclick = () => applyFilter(filterGroup, p.textContent);
                catSpan.appendChild(p);
            }
        });
        filterGroup.appendChild(catSpan);
    });
}
function applyFilter(filterGroup, filterText) {
    const column = filterGroup.closest(".vitalTask > div") || filterGroup.closest(".myTask > div");
    if (!column) return;
    const taskList = column.querySelector("#vitalTaskList") || column.querySelector("#myTaskList");
    if (!taskList) return;
    const tasks = taskList.querySelectorAll(".taskItem");
    tasks.forEach(task => {
        if (task.innerText.includes(filterText)) task.style.display = "flex";
        else task.style.display = "none";
    });
}
function resetFilter(filterGroup) {
    const column = filterGroup.closest(".vitalTask > div") || filterGroup.closest(".myTask > div");
    if (!column) return;
    const taskList = column.querySelector("#vitalTaskList") || column.querySelector("#myTaskList");
    if (!taskList) return;
    const tasks = taskList.querySelectorAll(".taskItem");
    tasks.forEach(task => task.style.display = "flex");
}
document.addEventListener("DOMContentLoaded", init);
