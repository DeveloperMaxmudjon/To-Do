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

    registerBlock.style.display = "flex";
    loginBlock.style.display = "none";
    mainContainer.style.display = "none";

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

    if (!regFirstName) {
        FirstNameNotif.textContent = "Enter first name";
        isValid = false;
    }

    if (!regLastName) {
        LastNameNotif.textContent = "Enter last name";
        isValid = false;
    }

    if (!regUserName) {
        UserNameNotif.textContent = "Enter username";
        isValid = false;
    }

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

    if (!isValid) {
        return;
    }

    const newUser = {
        firstName: regFirstName,
        lastName: regLastName,
        username: regUserName,
        email: regUserEmail,
        password: regUserPass
    };

    users.push(newUser);
    currentUser = newUser;

    console.log("Users list:", users);

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

    if (!loginValue) {
        loginNotif.textContent = "Enter username";
        isValid = false;
    }

    if (!passValue) {
        loginPassNotif.textContent = "Enter password";
        isValid = false;
    }

    if (!checkStatus) {
        checkStatusNotif.textContent = "You must agree to all terms";
        isValid = false;
    }

    if (!isValid) return;

    const foundUser = users.find(
        (u) => u.username === loginValue && u.password === passValue
    );

    if (!foundUser) {
        loginPassNotif.textContent = "Incorrect username or password";
        return;
    }

    currentUser = foundUser;

    fillUserSidebar(currentUser);

    loginBlock.style.display = "none";
    mainContainer.style.display = "flex";

    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";
    document.getElementById("loginAgree").checked = false;
};