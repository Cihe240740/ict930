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


    function getProducts(){
      let stored=JSON.parse(localStorage.getItem("products")||"[]");
      if(stored.length>0) return stored;
      return [
        { name:"Melon Drama", price:18.99, img:"tumbler_1.png" },
        { name:"Berry Scary", price:20.50, img:"tumbler_2.png" },
        { name:"Peach Please", price:19.75, img:"tumbler_3.png" },
        { name:"Cherry On Top", price:21.00, img:"tumbler_4.png" },
        { name:"Blue-licious", price:22.25, img:"tumbler_5.png" },
        { name:"Grape Escape", price:20.99, img:"tumbler_6.png" }
      ];
    }

    let cart=JSON.parse(localStorage.getItem("cart")||"[]");
    const products=getProducts();
    const table=document.getElementById("cartTable");
    let grand=0;
    cart.forEach(item=>{
      const p=products.find(prod=>prod.name===item.name);
      const price=p?p.price:item.price;
      const img=p?p.img:item.img;
      let total=item.qty*price;
      grand+=total;
      table.innerHTML+=`<tr>
        <td><img src="./images/${img}" alt="${item.name}"></td>
        <td>${item.name}</td><td>${item.qty}</td>
        <td>$${price.toFixed(2)}</td><td>$${total.toFixed(2)}</td>
      </tr>`;
    });
    document.getElementById("grandTotal").textContent="Grand Total: $"+grand.toFixed(2);

    const form=document.getElementById("checkoutForm");
    form.addEventListener("submit",function(e){
      e.preventDefault();
      if(cart.length===0){ alert("Cart is empty!"); return; }
      const name=document.getElementById("name").value;
      localStorage.removeItem("cart");
      document.getElementById("msg").textContent="Thank you "+name+"! Your order has been placed.";
      form.reset();
	  setTimeout(() => {
      window.location="product.html";
	  }, 1500);
    });