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

// Load products
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

const getCart=()=>JSON.parse(localStorage.getItem('cart')||'[]');
const setCart=(c)=>localStorage.setItem('cart',JSON.stringify(c));

// render cards
const grid=document.getElementById('grid');
const products=getProducts();
products.forEach((p,i)=>{
  grid.insertAdjacentHTML('beforeend',`
    <article class="card" data-name="${p.name}" data-price="${p.price}">
      <img src="./images/${p.img}" alt="${p.name}">
      <strong>${p.name}</strong>
      <div class="card-actions">
        <span>$${p.price.toFixed(2)}</span>
        <button class="btn" data-add>Add to Cart</button>
      </div>
    </article>`);
});

// add-to-cart
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-add]'); if(!b) return;
  const card=b.closest('.card');
  const name=card.dataset.name, price=parseFloat(card.dataset.price);
  const img=card.querySelector('img')?.src||'';
  const cart=getCart();
  const item=cart.find(i=>i.name===name);
  item?item.qty++:cart.push({name,price,qty:1,img});
  setCart(cart);
  b.textContent='Added'; setTimeout(()=>b.textContent='Add to Cart',700);
  updateCartCount();
});

// search
document.getElementById('q').addEventListener('input',e=>{
  const q=e.target.value.toLowerCase();
  document.querySelectorAll('#grid .card').forEach(c=>{
    c.style.display=c.dataset.name.toLowerCase().includes(q)?'':'none';
  });
});

// cart count
function updateCartCount(){
  const cart=getCart();
  const count=cart.reduce((sum,i)=>sum+i.qty,0);
  const el=document.getElementById('cartCount');
  if(el) el.textContent=count;
}
updateCartCount();
