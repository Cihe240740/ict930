    if(sessionStorage.getItem("loggedIn")!=="true"){
      window.location="login.html";
    }
	if (sessionStorage.getItem("role") !== "administrator") {
		alert("Administrators only!");
		if(sessionStorage.getItem("role") == "customer"){
			window.location="product.html";
			} else {
			window.location = "login.html";
		}
    }
	
	
	document.getElementById("welcome").textContent =
      "Welcome, " + sessionStorage.getItem("lastname");

    function logout(){
      sessionStorage.clear();
      window.location="login.html";
    }
	
	
	let products = JSON.parse(localStorage.getItem("products")||"[]");
    if(products.length===0){
      products = [
        { name:"Melon Drama", price:18.99, img:"tumbler_1.png" },
        { name:"Berry Scary", price:20.50, img:"tumbler_2.png" },
        { name:"Peach Please", price:19.75, img:"tumbler_3.png" },
        { name:"Cherry On Top", price:21.00, img:"tumbler_4.png" },
        { name:"Blue-licious", price:22.25, img:"tumbler_5.png" },
        { name:"Grape Escape", price:20.99, img:"tumbler_6.png" }
      ];
    }

    const list=document.getElementById("productList");
    const form=document.getElementById("productForm");
    const pname=document.getElementById("pname");
    const pprice=document.getElementById("pprice");
    const pimg=document.getElementById("pimg");
    let editIndex=-1;

    function saveProducts(){
      localStorage.setItem("products",JSON.stringify(products));
    }

    function renderProducts(){
      list.innerHTML="";
      products.forEach((p,i)=>{
        list.innerHTML+=`
          <tr>
            <td>${p.name}</td>
            <td>$${p.price.toFixed(2)}</td>
            <td><img class="thumb" src="./images/${p.img}" alt="${p.name}"></td>
            <td>
              <button class="btn" onclick="editProduct(${i})">Edit</button>
              <button class="btn outline" onclick="deleteProduct(${i})">Delete</button>
            </td>
          </tr>
        `;
      });
      saveProducts();
    }

    form.addEventListener("submit",e=>{
      e.preventDefault();
      let file=pimg.files[0];
      let fileName="";
      if(file){
        fileName=file.name; // assumes file is placed in /images manually
      }
      const prod={ name:pname.value, price:parseFloat(pprice.value), img:fileName };
      if(editIndex>=0){
        products[editIndex]=prod;
        editIndex=-1;
        document.getElementById("formTitle").textContent="Add Product";
      } else {
        products.push(prod);
      }
      form.reset();
      renderProducts();
    });

    window.editProduct=function(i){
      const p=products[i];
      pname.value=p.name;
      pprice.value=p.price;
      editIndex=i;
      document.getElementById("formTitle").textContent="Edit Product";
    }

    window.deleteProduct=function(i){
      if(confirm("Delete "+products[i].name+"?")){
        products.splice(i,1);
        renderProducts();
      }
    }

    renderProducts();
	
	// --- Users management ---
	let users = JSON.parse(localStorage.getItem("users") || "[]");

	const userList = document.getElementById("userList"); // Table in admin.html

	function saveUsers() {
	  localStorage.setItem("users", JSON.stringify(users));
	}

	function renderUsers() {
	  if (!userList) return;
	  userList.innerHTML = "";
	  users.forEach((u, i) => {
		userList.innerHTML += `
		  <tr>
			<td>${u.firstname || ""}</td>
			<td>${u.lastname || ""}</td>
			<td>${u.email}</td>
			<td>${u.role}</td>
			<td>
			  <button class="btn" onclick="toggleRole(${i})">Swap role</button>
			</td>
		  </tr>
		`;
	  });
	  saveUsers();
	}

	window.toggleRole = function (i) {
	  if (users[i].role === "customer") {
		users[i].role = "administrator";
	  } else {
		users[i].role = "customer";
	  }
	  renderUsers();
	};

	// init
	renderUsers();