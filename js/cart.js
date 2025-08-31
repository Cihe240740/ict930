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
    const grandEl=document.getElementById("grandTotal");

    function renderCart(){
      table.innerHTML="";
      let grand=0;
      cart.forEach((item,i)=>{
        const prod=products.find(p=>p.name===item.name);
        const price=prod?prod.price:item.price;
        const img=prod?prod.img:item.img;
        const total=item.qty*price;
        grand+=total;
        table.innerHTML+=`
          <tr>
            <td><img src="./images/${img}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>
              <button class="qty-btn" onclick="decrease(${i})">-</button>
              ${item.qty}
              <button class="qty-btn" onclick="increase(${i})">+</button>
            </td>
            <td>$${price.toFixed(2)}</td>
            <td>$${total.toFixed(2)}</td>
            <td><button class="remove-btn" onclick="removeItem(${i})">Remove</button></td>
          </tr>`;
      });
      grandEl.textContent="Grand Total: $"+grand.toFixed(2);
      localStorage.setItem("cart",JSON.stringify(cart));
    }

    function increase(i){ cart[i].qty++; renderCart(); }
    function decrease(i){ cart[i].qty--; if(cart[i].qty<=0) cart.splice(i,1); renderCart(); }
    function removeItem(i){ cart.splice(i,1); renderCart(); }

    function goCheckout(){
      if(cart.length===0){ alert("Cart is empty!"); return; }
      window.location="checkout.html";
    }

    renderCart();