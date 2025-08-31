document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("f");
  const msg = document.getElementById("msg");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users") || "[]");

    const found = users.find(u => u.email === email && u.password === password);

    if (found) {
      sessionStorage.setItem("loggedIn", "true");
      sessionStorage.setItem("firstname", found.firstname);
      sessionStorage.setItem("lastname", found.lastname);
      sessionStorage.setItem("email", found.email);
      // sessionStorage.setItem("role", found.role);

      // if (found.role === "admin") {
        // window.location.href = "admin.html";
      // } else {
        window.location.href = "product.html";
      // }
    } else {
      alert('User not registered!');
	}
  });
});
