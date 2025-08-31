const imgs=["./images/tumbler_1.png","./images/tumbler_2.png","./images/tumbler_3.png"];
let i=0;
const slide=document.getElementById("slide");
setInterval(()=>{
  i=(i+1)%imgs.length;
  slide.style.opacity=0;
  setTimeout(()=>{
    slide.src=imgs[i];
    slide.style.opacity=1;
  },600);
},2000);