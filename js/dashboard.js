    if(sessionStorage.getItem("loggedIn")!=="true"){
      window.location="product.html";
    }
    if(sessionStorage.getItem("role")!=="customer"){
      // alert("Customers only!");
      // window.location="product.html";
    }

    document.getElementById("welcome").textContent =
      "Hello, " + sessionStorage.getItem("firstname");

    function logout(){
      sessionStorage.clear();
      window.location="index.html";
    }