document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("f");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    // Load users from localStorage
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    // add admin by default
    if (!users.find(u => u.email === "admin@sip.com")) {
      users.push({
        firstname: "System",
        lastname: "Admin",
        email: "admin@sip.com",
        password: "cihe.2025",
        role: "administrator"
      });
      localStorage.setItem("users", JSON.stringify(users));
    }

    // search user
    const found = users.find(u => u.email === email && u.password === password);

    if (found) {
      sessionStorage.setItem("loggedIn", "true");
      sessionStorage.setItem("firstname", found.firstname);
      sessionStorage.setItem("lastname", found.lastname);
      sessionStorage.setItem("email", found.email);
      sessionStorage.setItem("role", found.role);

      if (found.role === "administrator") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "product.html";
      }
    } else {
      alert("User not registered!");
    }
  });
});







// document.addEventListener("DOMContentLoaded", function () {
  // const form = document.getElementById("f");
  // const msg = document.getElementById("msg");

  // form.addEventListener("submit", function (e) {
    // e.preventDefault();

    // const email = document.getElementById("email").value.trim().toLowerCase();
    // const password = document.getElementById("password").value;

    // let users = JSON.parse(localStorage.getItem("users") || "[]");

    // const found = users.find(u => u.email === email && u.password === password);

    // if (found) {
      // sessionStorage.setItem("loggedIn", "true");
      // sessionStorage.setItem("firstname", found.firstname);
      // sessionStorage.setItem("lastname", found.lastname);
      // sessionStorage.setItem("email", found.email);
      sessionStorage.setItem("role", found.role);

      if (found.role === "admin") {
        window.location.href = "admin.html";
      } else {
        // window.location.href = "product.html";
      }
    // } else {
      // alert('User not registered!');
	// }
  // });
// });
