let dashboardBtn = document.getElementById("dashboard");
let vitalTaskBtn = document.getElementById("vitalTask");
let myTaskBtn = document.getElementById("myTask");
let taskMainBtn = document.getElementById("taskMain");
let settingBtn = document.getElementById("setting");

let logoutBtn = document.getElementById("logout");

let dashboardMenu = document.getElementById("dashboardMenu");
let vitalTaskMenu = document.getElementById("vitalTaskMenu");
let myTaskMenu = document.getElementById("myTaskMenu");
let categMain = document.getElementById("categMain");
let settingMenu = document.getElementById("settingsMenu");

if (dashboardBtn) {
    dashboardBtn.classList.add("activeNav");
}

if (dashboardMenu) dashboardMenu.style.display = "flex";
if (vitalTaskMenu) vitalTaskMenu.style.display = "none";
if (myTaskMenu) myTaskMenu.style.display = "none";
if (categMain) categMain.style.display = "none";
if (settingMenu) settingMenu.style.display = "none";

if (dashboardBtn) {
    dashboardBtn.onclick = function () {
        if (dashboardBtn) dashboardBtn.classList.add("activeNav");
        if (vitalTaskBtn) vitalTaskBtn.classList.remove("activeNav");
        if (myTaskBtn) myTaskBtn.classList.remove("activeNav");
        if (taskMainBtn) taskMainBtn.classList.remove("activeNav");
        if (settingBtn) settingBtn.classList.remove("activeNav");

        if (dashboardMenu) dashboardMenu.style.display = "flex";
        if (vitalTaskMenu) vitalTaskMenu.style.display = "none";
        if (myTaskMenu) myTaskMenu.style.display = "none";
        if (categMain) categMain.style.display = "none";
        if (settingMenu) settingMenu.style.display = "none";
    }
}

if (vitalTaskBtn) {
    vitalTaskBtn.onclick = function () {
        if (dashboardBtn) dashboardBtn.classList.remove("activeNav");
        if (vitalTaskBtn) vitalTaskBtn.classList.add("activeNav");
        if (myTaskBtn) myTaskBtn.classList.remove("activeNav");
        if (taskMainBtn) taskMainBtn.classList.remove("activeNav");
        if (settingBtn) settingBtn.classList.remove("activeNav");

        if (dashboardMenu) dashboardMenu.style.display = "none";
        if (vitalTaskMenu) vitalTaskMenu.style.display = "flex";
        if (myTaskMenu) myTaskMenu.style.display = "none";
        if (categMain) categMain.style.display = "none";
        if (settingMenu) settingMenu.style.display = "none";
    }
}

if (myTaskBtn) {
    myTaskBtn.onclick = function () {
        if (dashboardBtn) dashboardBtn.classList.remove("activeNav");
        if (vitalTaskBtn) vitalTaskBtn.classList.remove("activeNav");
        if (myTaskBtn) myTaskBtn.classList.add("activeNav");
        if (taskMainBtn) taskMainBtn.classList.remove("activeNav");
        if (settingBtn) settingBtn.classList.remove("activeNav");

        if (dashboardMenu) dashboardMenu.style.display = "none";
        if (vitalTaskMenu) vitalTaskMenu.style.display = "none";
        if (myTaskMenu) myTaskMenu.style.display = "flex";
        if (categMain) categMain.style.display = "none";
        if (settingMenu) settingMenu.style.display = "none";
    }
}

if (taskMainBtn) {
    taskMainBtn.onclick = function () {
        if (dashboardBtn) dashboardBtn.classList.remove("activeNav");
        if (vitalTaskBtn) vitalTaskBtn.classList.remove("activeNav");
        if (myTaskBtn) myTaskBtn.classList.remove("activeNav");
        if (taskMainBtn) taskMainBtn.classList.add("activeNav");
        if (settingBtn) settingBtn.classList.remove("activeNav");

        if (dashboardMenu) dashboardMenu.style.display = "none";
        if (vitalTaskMenu) vitalTaskMenu.style.display = "none";
        if (myTaskMenu) myTaskMenu.style.display = "none";
        if (categMain) categMain.style.display = "flex";
        if (settingMenu) settingMenu.style.display = "none";
    }
}

if (settingBtn) {
    settingBtn.onclick = function () {
        if (dashboardBtn) dashboardBtn.classList.remove("activeNav");
        if (vitalTaskBtn) vitalTaskBtn.classList.remove("activeNav");
        if (myTaskBtn) myTaskBtn.classList.remove("activeNav");
        if (taskMainBtn) taskMainBtn.classList.remove("activeNav");
        if (settingBtn) settingBtn.classList.add("activeNav");

        if (dashboardMenu) dashboardMenu.style.display = "none";
        if (vitalTaskMenu) vitalTaskMenu.style.display = "none";
        if (myTaskMenu) myTaskMenu.style.display = "none";
        if (categMain) categMain.style.display = "none";
        if (settingMenu) settingMenu.style.display = "flex";
    }
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
        const container = document.getElementById("container");
        const login = document.getElementById("login");
        if (container) container.style.display = "none";
        if (login) login.style.display = "flex";
    });
}

const settingsBackBtn = document.getElementById("settingsBack");
if (settingsBackBtn) {
    settingsBackBtn.addEventListener("click", function (e) {
        e.preventDefault();

        if (dashboardBtn) dashboardBtn.classList.add("activeNav");
        if (vitalTaskBtn) vitalTaskBtn.classList.remove("activeNav");
        if (myTaskBtn) myTaskBtn.classList.remove("activeNav");
        if (taskMainBtn) taskMainBtn.classList.remove("activeNav");
        if (settingBtn) settingBtn.classList.remove("activeNav");

        if (dashboardMenu) dashboardMenu.style.display = "flex";
        if (vitalTaskMenu) vitalTaskMenu.style.display = "none";
        if (myTaskMenu) myTaskMenu.style.display = "none";
        if (categMain) categMain.style.display = "none";
        if (settingMenu) settingMenu.style.display = "none";
    });
}