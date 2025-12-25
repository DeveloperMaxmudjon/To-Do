const registerBlock = document.getElementById("register");
const loginBlock = document.getElementById("login");
const mainContainer = document.getElementById("container");
let users = [];
let currentUser = null;


function fillUserSidebar(user) {
    const lastNameEl = document.getElementById("userLastName");
    const firstNameEl = document.getElementById("userFirstName");
    const emailEl = document.getElementById("userNavEmail");
    if (!user) {
        lastNameEl.textContent = "";
        firstNameEl.textContent = "";
        emailEl.textContent = "";
        return;
    }
    lastNameEl.textContent = user.lastName;
    firstNameEl.textContent = user.firstName;
    emailEl.textContent = user.email;
}
document.addEventListener("DOMContentLoaded", function () {
    const signInMenu = document.getElementById("SignInMenu");
    const signUpMenu = document.getElementById("SignUpMenu");


    if (localStorage.getItem("isLoggedIn") === "true") {
        currentUser = {
            firstName: localStorage.getItem("user_firstName"),
            lastName: localStorage.getItem("user_lastName"),
            username: localStorage.getItem("user_username"),
            email: localStorage.getItem("user_email"),
            password: localStorage.getItem("user_password")
        };

        fillUserSidebar(currentUser);
        loginBlock.style.display = "none";
        registerBlock.style.display = "none";
        mainContainer.style.display = "flex";
    } else {

        loginBlock.style.display = "none";
        registerBlock.style.display = "flex";
        mainContainer.style.display = "none";
    }

    if (signInMenu && registerBlock && loginBlock) {
        signInMenu.addEventListener("click", function (e) {
            e.preventDefault();
            registerBlock.style.display = "none";
            loginBlock.style.display = "flex";
        });
    }
    if (signUpMenu && registerBlock && loginBlock) {
        signUpMenu.addEventListener("click", function (e) {
            e.preventDefault();
            loginBlock.style.display = "none";
            registerBlock.style.display = "flex";
        });
    }
});
document.getElementById("addUser").onclick = function (e) {
    e.preventDefault();
    const regFirstName = document.getElementById("firstName").value.trim();
    const regLastName = document.getElementById("lastName").value.trim();
    const regUserName = document.getElementById("username").value.trim();
    const regUserEmail = document.getElementById("email").value.trim();
    const regUserPass = document.getElementById("password").value;
    const regUserConfPass = document.getElementById("confirmPassword").value;
    const regAgreeChecked = document.getElementById("agree").checked;
    const FirstNameNotif = document.getElementById("firstNameNotif");
    const LastNameNotif = document.getElementById("lastNameNotif");
    const UserNameNotif = document.getElementById("usernameNotif");
    const UserEmailNotif = document.getElementById("emailNotif");
    const UserPassNotif = document.getElementById("passwordNotif");
    const UserConfPassNotif = document.getElementById("confirmPasswordNotif");
    const AgreeNotif = document.getElementById("agreeNotif");
    FirstNameNotif.textContent = "";
    LastNameNotif.textContent = "";
    UserNameNotif.textContent = "";
    UserEmailNotif.textContent = "";
    UserPassNotif.textContent = "";
    UserConfPassNotif.textContent = "";
    AgreeNotif.textContent = "";
    let isValid = true;
    if (!regFirstName) { FirstNameNotif.textContent = "Enter first name"; isValid = false; }
    if (!regLastName) { LastNameNotif.textContent = "Enter last name"; isValid = false; }
    if (!regUserName) { UserNameNotif.textContent = "Enter username"; isValid = false; }
    if (!regUserEmail) {
        UserEmailNotif.textContent = "Enter email";
        isValid = false;
    } else if (!regUserEmail.endsWith("@gmail.com")) {
        UserEmailNotif.textContent = "Email must end with @gmail.com";
        isValid = false;
    }
    if (!regUserPass) {
        UserPassNotif.textContent = "Enter password";
        isValid = false;
    } else if (regUserPass.length < 8) {
        UserPassNotif.textContent = "Password must be at least 8 characters";
        isValid = false;
    }
    if (!regUserConfPass) {
        UserConfPassNotif.textContent = "Confirm your password";
        isValid = false;
    } else if (regUserConfPass !== regUserPass) {
        UserConfPassNotif.textContent = "Passwords do not match";
        isValid = false;
    }
    if (!regAgreeChecked) {
        AgreeNotif.textContent = "You must agree to all terms";
        isValid = false;
    }
    if (!isValid) return;
    const newUser = {
        firstName: regFirstName,
        lastName: regLastName,
        username: regUserName,
        email: regUserEmail,
        password: regUserPass
    };
    users.push(newUser);
    currentUser = newUser;


    localStorage.setItem("user_firstName", newUser.firstName);
    localStorage.setItem("user_lastName", newUser.lastName);
    localStorage.setItem("user_username", newUser.username);
    localStorage.setItem("user_email", newUser.email);
    localStorage.setItem("user_password", newUser.password);
    localStorage.setItem("isLoggedIn", "true");

    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmPassword").value = "";
    document.getElementById("agree").checked = false;
    fillUserSidebar(currentUser);
    registerBlock.style.display = "none";
    loginBlock.style.display = "none";
    mainContainer.style.display = "flex";
};
document.getElementById("loginBtn").onclick = function (e) {
    e.preventDefault();
    const loginValue = document.getElementById("loginUsername").value.trim();
    const passValue = document.getElementById("loginPassword").value;
    const checkStatus = document.getElementById("loginAgree").checked;
    const loginNotif = document.getElementById("logUsernameNotif");
    const loginPassNotif = document.getElementById("logPassNotif");
    const checkStatusNotif = document.getElementById("loginAgreeChecked");
    loginNotif.textContent = "";
    loginPassNotif.textContent = "";
    checkStatusNotif.textContent = "";
    let isValid = true;
    if (!loginValue) { loginNotif.textContent = "Enter username"; isValid = false; }
    if (!passValue) { loginPassNotif.textContent = "Enter password"; isValid = false; }
    if (!checkStatus) { checkStatusNotif.textContent = "You must agree to all terms"; isValid = false; }
    if (!isValid) return;
    const foundUser = users.find((u) => u.username === loginValue && u.password === passValue);
    if (!foundUser) {
        loginPassNotif.textContent = "Incorrect username or password";
        return;
    }
    currentUser = foundUser;


    localStorage.setItem("user_firstName", currentUser.firstName);
    localStorage.setItem("user_lastName", currentUser.lastName);
    localStorage.setItem("user_username", currentUser.username);
    localStorage.setItem("user_email", currentUser.email);
    localStorage.setItem("user_password", currentUser.password);
    localStorage.setItem("isLoggedIn", "true");

    fillUserSidebar(currentUser);
    loginBlock.style.display = "none";
    mainContainer.style.display = "flex";
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";
    document.getElementById("loginAgree").checked = false;
};
const settingsMenu = document.getElementById("settingsMenu");
const settingLink = document.getElementById("setting");
const settingsBack = document.getElementById("settingsBack");
const updateInfoBtn = document.getElementById("updateInfoBtn");
const changePassBtn = document.getElementById("changePassBtn");
const changePassView = document.getElementById("changePasswordView");
const userSettingsView = document.getElementById("userSettings");
const changePassBack = document.getElementById("changePassBack");
const cancelPassBtn = document.getElementById("cancelPassBtn");
const updatePassBtn = document.getElementById("updatePassBtn");
function populateSettings() {
    if (!currentUser) return;
    document.getElementById("settingsName").textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    document.getElementById("settingsEmail").textContent = currentUser.email;
    document.getElementById("setFirstName").value = currentUser.firstName || "";
    document.getElementById("setLastName").value = currentUser.lastName || "";
    document.getElementById("setEmail").value = currentUser.email || "";
    document.getElementById("setContact").value = currentUser.contact || "";
    document.getElementById("setPosition").value = currentUser.position || "";
    document.getElementById("changePassName").textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    document.getElementById("changePassEmail").textContent = currentUser.email;
}
if (settingLink) {
    settingLink.addEventListener("click", function (e) {
        populateSettings();
    });
}
if (updateInfoBtn) {
    updateInfoBtn.addEventListener("click", function () {
        if (!currentUser) return;
        const newFirstName = document.getElementById("setFirstName").value.trim();
        const newLastName = document.getElementById("setLastName").value.trim();
        const newEmail = document.getElementById("setEmail").value.trim();
        const newContact = document.getElementById("setContact").value.trim();
        const newPosition = document.getElementById("setPosition").value.trim();
        if (
            newFirstName === (currentUser.firstName || "") &&
            newLastName === (currentUser.lastName || "") &&
            newEmail === (currentUser.email || "") &&
            newContact === (currentUser.contact || "") &&
            newPosition === (currentUser.position || "")
        ) {
            alert("No changes were made.");
            return;
        }
        if (!newFirstName || !newLastName || !newEmail) {
            alert("First Name, Last Name, and Email are required.");
            return;
        }
        if (!newEmail.endsWith("@gmail.com")) {
            alert("Email must end with @gmail.com");
            return;
        }
        currentUser.firstName = newFirstName;
        currentUser.lastName = newLastName;
        currentUser.email = newEmail;
        currentUser.contact = newContact;
        currentUser.position = newPosition;
        fillUserSidebar(currentUser);
        populateSettings();
        alert("Information updated successfully.");
    });
}
function showChangePassword() {
    document.querySelector("#settingsMenu > div > header").style.display = 'none';
    document.querySelector("#settingsMenu > div > .profile").style.display = 'none';
    document.getElementById("userSettings").style.display = 'none';
    document.getElementById("changePasswordView").style.display = 'block';
    document.getElementById("currentPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmNewPassword").value = "";
}
function hideChangePassword() {
    document.getElementById("changePasswordView").style.display = 'none';
    document.querySelector("#settingsMenu > div > header").style.display = 'flex';
    document.querySelector("#settingsMenu > div > .profile").style.display = 'flex';
    document.getElementById("userSettings").style.display = 'flex';
}
if (changePassBtn) changePassBtn.onclick = showChangePassword;
if (changePassBack) changePassBack.onclick = (e) => { e.preventDefault(); hideChangePassword(); };
if (cancelPassBtn) cancelPassBtn.onclick = hideChangePassword;
if (updatePassBtn) {
    updatePassBtn.onclick = function () {
        const currentPass = document.getElementById("currentPassword").value;
        const newPass = document.getElementById("newPassword").value;
        const confirmPass = document.getElementById("confirmNewPassword").value;
        if (!currentPass || !newPass || !confirmPass) {
            alert("Please fill in all fields");
            return;
        }
        if (currentPass !== currentUser.password) {
            alert("Incorrect current password.");
            return;
        }
        if (newPass.length < 8) {
            alert("New Password must be at least 8 characters");
            return;
        }
        if (newPass !== confirmPass) {
            alert("New passwords do not match.");
            return;
        }
        currentUser.password = newPass;
        alert("Password changed successfully.");
        hideChangePassword();
    };
}
