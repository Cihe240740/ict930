// data kept tiny; names must match across pages
const NAMES=["Melon Drama","Berry Scary","Peach Please","Cherry On Top","Blue-licious","Grape Escape"];
const PRICES=[18.99,20.50,19.75,21.00,22.25,20.99];

// cart helpers (JSON under "cart")
const getCart=()=>JSON.parse(localStorage.getItem('cart')||'[]');
const setCart=(c)=>localStorage.setItem('cart',JSON.stringify(c));

// render simple cards
const grid=document.getElementById('grid');
NAMES.forEach((name,i)=>{
  const price=PRICES[i];
  grid.insertAdjacentHTML('beforeend',`
    <article class="card" data-name="${name}" data-price="${price}">
      <img src="./images/tumbler_${i+1}.png" alt="${name}"> <!-- alt = product name -->
      <strong>${name}</strong>
      <div class="card-actions">
        <span>$${price.toFixed(2)}</span>
        <button class="btn" data-add>Add to Cart</button>
      </div>
    </article>`);
});

// add-to-cart (event delegation)
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

// search by product name
document.getElementById('q').addEventListener('input',e=>{
  const q=e.target.value.toLowerCase();
  document.querySelectorAll('#grid .card').forEach(c=>{
    c.style.display=c.dataset.name.toLowerCase().includes(q)?'':'none';
  });
});

// 🆕 update cart count in header
function updateCartCount(){
  const cart=getCart();
  const count=cart.reduce((sum,i)=>sum+i.qty,0);
  const el=document.getElementById('cartCount');
  if(el) el.textContent=count;
}

// initialize count on page load
updateCartCount();
