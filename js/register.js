document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("f");
  const msg = document.getElementById("msg");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;

    // check passwords
    if (password !== password2) {
      msg.style.color = "red";
      msg.textContent = "Passwords do not match!";
      return;
    }

    // load users
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    // check email already exists
    if (users.find(u => u.email === email)) {
      msg.style.color = "red";
      msg.textContent = "This email is already registered!";
      return;
    }

    // create user
    const newUser = {
      firstname,
      lastname,
      email,
      password,  
      role: "customer"
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    msg.style.color = "green";
    msg.textContent = "Account created! Redirecting to login...";

    form.reset();

    // redirect after 1.5 seconds
    setTimeout(() => {
      window.location.href = "Login.html";
    }, 1500);
  });
});
