(function () {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    if (!searchInput || !searchResults) return;

    searchInput.addEventListener("input", function () {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            searchResults.style.display = "none";
            searchResults.innerHTML = "";
            return;
        }

        const filteredTasks = taskListGroup.filter(task => {
            const title = (task.title || "").toLowerCase();
            const desc = (task.desc || "").toLowerCase();
            return title.includes(query) || desc.includes(query);
        });

        displayResults(filteredTasks);
    });

    function displayResults(tasks) {
        if (tasks.length === 0) {
            searchResults.innerHTML = '<div style="padding: 10px 15px; font-size: 14px; color: #777;">No results found</div>';
            searchResults.style.display = "flex";
            return;
        }

        searchResults.innerHTML = "";
        tasks.forEach(task => {
            const item = document.createElement("div");
            item.className = "search-item";

            let taskType = "Task";
            if (isVitalTask(task)) {
                taskType = "Vital Task";
            }

            const imgHtml = task.imgSrc ? `<img src="${task.imgSrc}" alt="">` : '<div style="width:40px; height:40px; background:#f0f0f0; border-radius:6px; margin-right:12px; flex-shrink:0;"></div>';

            item.innerHTML = `
                ${imgHtml}
                <div class="search-info">
                    <span class="search-title">${task.title}</span>
                    <span class="search-desc">${task.desc}</span>
                </div>
                <span class="search-task-type">${taskType}</span>
            `;

            item.addEventListener("click", function () {
                navigateToTask(task);
                searchInput.value = "";
                searchResults.style.display = "none";
            });

            searchResults.appendChild(item);
        });

        searchResults.style.display = "flex";
    }

    function navigateToTask(task) {
        if (isVitalTask(task)) {
            const vitalBtn = document.getElementById("vitalTask");
            if (vitalBtn) vitalBtn.click();
            setTimeout(() => {
                setActiveVitalTask(task.id);
                const el = document.querySelector(`[data-task-id="${task.id}"]`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        } else {
            const myTaskBtn = document.getElementById("myTask");
            if (myTaskBtn) myTaskBtn.click();
            setTimeout(() => {
                setActiveMyTask(task.id);
                const el = document.querySelector(`[data-task-id="${task.id}"]`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }

    document.addEventListener("click", function (e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = "none";
        }
    });
})();
