
let product_container = document.querySelector(".product-list");
const cartContainer = document.querySelector('.cart-container');
let del_btn = document.querySelector('.cart-item-del-btn');
let cart_list = document.querySelector('.cart-list');
let add_btn = document.querySelector('.add-to-cart-btn');
let total_value = document.querySelector('#cart-total-value');

let data  ,   total = 0 ;
// local storage

let cart_arr = JSON.parse(localStorage.getItem("arika")) || [] ;
//  FETCH THE DATA
let FILE = "arika.json";

async function getItems(){
    let response =  await fetch(FILE);
    data = await response.json();
    let amine = '';
    data.forEach(product => {
        let ID = Date.now() + Math.floor(Math.random() * 1000); 

        amine += `
            <div class = "product-item" id="item_${ID}">
                <div class = "product-img">
                    <img src = "${product.imgSrc}" alt = "product image">
                    <button onclick="ADDProduct(this)" type = "button" class = "add-to-cart-btn">
                        <i class = "fas fa-shopping-cart"></i>Add To Cart
                    </button>
                </div>
                <div class = "product-content">
                    <h3 class = "product-name">${product.name}</h3>
                    <span class = "product-category">${product.category}</span>
                    <p class = "product-price">$${product.price}</p>
                </div>
            </div>
        `;
        // console.log(ID);

    });
       product_container.innerHTML = amine;
}
 getItems();
//  GET THE DATA FROM THE LOCAL STORAGE
function getFromLocal(){
    cart_list.innerHTML = "" ;
    for (item of cart_arr) {
        cart_list.innerHTML += `
        <div class = "cart-item" id="${item.item_id}" >
            <img src = "${item.imgsrc}" alt = "product image">
            <div class = "cart-item-info">
                <h3 class = "cart-item-name">${item.name}</h3>
                <span class = "cart-item-category">${item.category}</span>
                <span class = "cart-item-price">${item.price}</span>
            </div>
            <button onclick="rmProduct(this)" type = "button" class = "cart-item-del-btn">
                <i class = "fas fa-times"></i>
            </button>
        </div>
    `;
    }
    getTotal();
}
getFromLocal();

//  ADD PRODUCT TO THE CART LIST
 function ADDProduct(elmnt){
    let parentelmnt = elmnt.parentElement.parentElement ;
    let item_id = parseInt(parentelmnt.getAttribute('id').match(/[\d.]+/)[0]);
    let imgsrc = (parentelmnt.querySelector(".product-img img")).getAttribute("src") ;
    let name = parentelmnt.querySelector(".product-content h3").textContent          ;
    let category = parentelmnt.querySelector(".product-content span").textContent    ;
    let price = parentelmnt.querySelector(".product-content p").textContent          ;
    cart_arr.push({item_id , name,category,price,imgsrc});
    localStorage.setItem("arika" ,JSON.stringify(cart_arr));

    cart_list.innerHTML += `
        <div class = "cart-item" id="${item_id}" >
            <img src = "${imgsrc}" alt = "product image">
            <div class = "cart-item-info">
                <h3 class = "cart-item-name">${name}</h3>
                <span class = "cart-item-category">${category}</span>
                <span class = "cart-item-price">${price}</span>
            </div>
            <button onclick="rmProduct(this)" type = "button" class = "cart-item-del-btn">
                <i class = "fas fa-times"></i>
            </button>
        </div>
    `;
    getTotal()
}

//  TOGGLE THE CART LIST 

document.querySelector('.navbar-toggler').addEventListener('click', () => {
      document.querySelector('.navbar-collapse').classList.toggle('show-navbar');
    });

  document.getElementById('cart-btn').addEventListener('click', () => {
   cartContainer.classList.toggle('show-cart-container');
});
cart_list.addEventListener('click', rmProduct);


// delete product from cart list 
function rmProduct(e) {
    let toRemove;
    let toRemoveValu;

    if (e.target.tagName === "BUTTON") {
        toRemove = e.target.parentElement;
        toRemoveValu = parseInt(toRemove.getAttribute("id"));
        for (let i = 0; i < cart_arr.length; i++) {
            if (cart_arr[i].item_id === toRemoveValu) {
                cart_arr.splice(i, 1);
                localStorage.setItem("arika" ,JSON.stringify(cart_arr));
                break; }}
        toRemove.remove();
    }
    if (e.target.tagName === "I") {
        toRemove = e.target.parentElement.parentElement;
        toRemoveValu = parseInt(toRemove.getAttribute("id"));
        for (let i = 0; i < cart_arr.length; i++) {
            if (cart_arr[i].item_id === toRemoveValu) {
                cart_arr.splice(i, 1);
                localStorage.setItem("arika" ,JSON.stringify(cart_arr));
                break; }}
        toRemove.remove();
    }
    getTotal();
}

// ___________  GET TOTAL    

function getTotal(){
    for(item of cart_arr){
        let PRICE = parseFloat(item.price.match(/[\d.]+/)[0]);
        total += PRICE ;
    }
    total_value.innerHTML = total ;
    total = 0 ;
}

// ___________  ANIMATION   

gsap.from('.banner-img' , { duration:1.2, x:'100%', ease:'sine.out',})
gsap.from('.banner-content' , { duration:1.2, x:'-100%', ease:'sine.out',})

