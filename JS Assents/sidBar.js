let dashboardBtn = document.getElementById("dashboard");
let vitalTaskBtn = document.getElementById("vitalTask");
let myTaskBtn = document.getElementById("myTask");
let taskMainBtn = document.getElementById("taskMain");
let settingBtn = document.getElementById("setting");

let logoutBtn = document.getElementById("logout");

dashboardBtn.classList.add("activeNav");

dashboardBtn.onclick = function() {
    dashboardBtn.classList.add("activeNav")
    vitalTaskBtn.classList.remove("activeNav");
    myTaskBtn.classList.remove("activeNav")
    taskMainBtn.classList.remove("activeNav")
    settingBtn.classList.remove("activeNav")
}

vitalTaskBtn.onclick = function() {
    dashboardBtn.classList.remove("activeNav")
    vitalTaskBtn.classList.add("activeNav");
    myTaskBtn.classList.remove("activeNav")
    taskMainBtn.classList.remove("activeNav")
    settingBtn.classList.remove("activeNav")
}

myTaskBtn.onclick = function() {
    dashboardBtn.classList.remove("activeNav")
    vitalTaskBtn.classList.remove("activeNav");
    myTaskBtn.classList.add("activeNav")
    taskMainBtn.classList.remove("activeNav")
    settingBtn.classList.remove("activeNav")
}

taskMainBtn.onclick = function() {
    dashboardBtn.classList.remove("activeNav")
    vitalTaskBtn.classList.remove("activeNav");
    myTaskBtn.classList.remove("activeNav")
    taskMainBtn.classList.add("activeNav")
    settingBtn.classList.remove("activeNav")
}

settingBtn.onclick = function() {
    dashboardBtn.classList.remove("activeNav")
    vitalTaskBtn.classList.remove("activeNav");
    myTaskBtn.classList.remove("activeNav")
    taskMainBtn.classList.remove("activeNav")
    settingBtn.classList.add("activeNav")
}

logoutBtn.addEventListener("click", function() {
    document.getElementById("container").style.display = "none"
    document.getElementById("login").style.display = "flex"
})
