const hamburguesa=document.querySelector(".icon");
const navMenu=document.querySelector(".navi-ul");

hamburguesa.addEventListener("click",responsive);

function responsive(){
    navMenu.classList.toggle("active");
}