const loginPage = document.getElementById("loginPage");
const signupPage = document.getElementById("signupPage");
const forgotPage = document.getElementById("forgotPage");

const pass = document.getElementById("password");
const toggleBtn = document.getElementById("toggleBtn");

// SHOW / HIDE PASSWORD
toggleBtn.addEventListener("click", function() {
    if (pass.type === "password") {
        pass.type = "text";
        toggleBtn.textContent = "Hide Password";
    } else {
        pass.type = "password";
        toggleBtn.textContent = "Show Password";
    }
});

// LOGIN
document.getElementById("loginBtn").addEventListener("click", function() {

    let email = document.getElementById("email").value.trim();
    let password = pass.value;
    let message = document.getElementById("message");

    if (email === "" || password === "") {
        message.textContent = "Please fill all fields!";
        return;
    }

    let name = email.split("@")[0];

    document.getElementById("userName").textContent = name;
    document.getElementById("profileName").textContent = name;
    document.getElementById("profileEmail").textContent = email;
    document.getElementById("profileAvatar").textContent =
        name.charAt(0).toUpperCase();
    document.getElementById("profileDisplayName").textContent = name;

    loginPage.style.display = "none";
    signupPage.style.display = "none";
    forgotPage.style.display = "none";

    document.getElementById("dashboardPage").style.display = "flex";

    showSection("home");
});

// SIGNUP
document.getElementById("signupBtn").addEventListener("click", function() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("signupEmail").value.trim();
    let password = document.getElementById("signupPassword").value;
    let confirm = document.getElementById("confirmPassword").value;
    let message = document.getElementById("signupMessage");

    if (!name || !email || !password || !confirm) {
        message.textContent = "Please fill all fields!";
    }
    else if (password !== confirm) {
        message.textContent = "Passwords do not match!";
    }
    else {
        message.textContent = "Account created successfully! Please login.";
    }
});

// FORGOT PASSWORD
document.getElementById("resetBtn").addEventListener("click", function() {

    let email = document.getElementById("resetEmail").value.trim();
    let message = document.getElementById("resetMessage");

    if (email === "") {
        message.textContent = "Please enter your email!";
    }
    else if (!email.includes("@") || !email.includes(".")) {
        message.textContent = "Enter a valid email!";
    }
    else {
        message.textContent = "Demo: Reset request submitted!";
    }
});

// PAGE NAVIGATION
document.getElementById("showSignup").addEventListener("click", function(e) {
    e.preventDefault();
    loginPage.style.display = "none";
    signupPage.style.display = "block";
});

document.getElementById("forgotLink").addEventListener("click", function(e) {
    e.preventDefault();
    loginPage.style.display = "none";
    forgotPage.style.display = "block";
});

document.getElementById("backLogin1").addEventListener("click", function(e) {
    e.preventDefault();
    signupPage.style.display = "none";
    loginPage.style.display = "block";
});

document.getElementById("backLogin2").addEventListener("click", function(e) {
    e.preventDefault();
    forgotPage.style.display = "none";
    loginPage.style.display = "block";
});

// LOGOUT
document.getElementById("logoutBtn").addEventListener("click", function() {
    document.getElementById("dashboardPage").style.display = "none";
    loginPage.style.display = "block";
});

// DASHBOARD SECTIONS
function showSection(section) {

    document.getElementById("homeSection").style.display = "none";
    document.getElementById("profileSection").style.display = "none";
    document.getElementById("settingsSection").style.display = "none";

    document.getElementById(section + "Section").style.display = "block";

    document.querySelectorAll(".nav-btn").forEach(function(btn) {
        btn.classList.remove("active");
    });

    let activeButton = document.querySelector(
        '.nav-btn[onclick="showSection(\'' + section + '\')"]'
    );

    if (activeButton) {
        activeButton.classList.add("active");
    }
}

// THEME BUTTON
document.getElementById("themeBtn").addEventListener("click", function() {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        this.textContent = "Switch to Dark Mode";
    } else {
        this.textContent = "Change Theme";
    }
});

// EDIT PROFILE
document.getElementById("saveProfileBtn").addEventListener("click", function() {

    let newName = document.getElementById("newName").value.trim();
    let message = document.getElementById("profileMessage");

    if (newName === "") {
        message.textContent = "Please enter your name!";
    } else {

        document.getElementById("userName").textContent = newName;
        document.getElementById("profileName").textContent = newName;
        document.getElementById("profileDisplayName").textContent = newName;

        document.getElementById("profileAvatar").textContent =
            newName.charAt(0).toUpperCase();

        message.textContent = "Profile updated successfully!";
    }
});
// ADD TRANSACTION

let totalIncome = 0;
let totalExpense = 0;

document.getElementById("addTransactionBtn").addEventListener("click", function() {

    let title = document.getElementById("transactionTitle").value.trim();
    let amount = Number(document.getElementById("transactionAmount").value);
    let type = document.getElementById("transactionType").value;

    let message = document.getElementById("transactionMessage");
    let list = document.getElementById("transactionList");

    if (title === "" || amount <= 0 || !Number.isFinite(amount)) {
        message.textContent = "Please enter valid details!";
        return;
    }

    let transaction = document.createElement("div");
    transaction.style.padding = "12px";
    transaction.style.borderBottom = "1px solid #334155";

    let name = document.createElement("strong");
    name.textContent = title;

    let value = document.createElement("p");

    if (type === "income") {
        totalIncome += amount;
        value.textContent = "+ ₹" + amount;
        value.style.color = "#4ade80";
    } else {
        totalExpense += amount;
        value.textContent = "- ₹" + amount;
        value.style.color = "#fb7185";
    }

    transaction.appendChild(name);
    transaction.appendChild(value);

    let empty = document.getElementById("emptyMessage");
    if (empty) empty.remove();

    list.prepend(transaction);

    document.getElementById("income").textContent = "₹" + totalIncome;
    document.getElementById("expense").textContent = "₹" + totalExpense;
    document.getElementById("balance").textContent =
        "₹" + (totalIncome - totalExpense);

    message.textContent = "Transaction added successfully!";

    document.getElementById("transactionTitle").value = "";
    document.getElementById("transactionAmount").value = "";
});
