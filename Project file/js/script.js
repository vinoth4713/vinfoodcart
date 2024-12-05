const btncart=document.querySelector('#cart-icon');
const navcart=document.querySelector('.nav-cart');
const btnclose=document.querySelector('#cart-close');


btncart.addEventListener('click',()=>{
    navcart.classList.add('cart-active');
});


btnclose.addEventListener('click',()=>{
    navcart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
    loadContent();
}

//remove food utems from cart
function loadContent(){
    let btnRemove=document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn)=>{
        btn.addEventListener('click',removeItem);
    });

    //product item change event
    let qtyElement=document.querySelectorAll('.cart-quantity');
    qtyElement.forEach((input)=>{
        input.addEventListener('change',changeQty);
    });


    //product adding cart

    let cartBtns=document.querySelectorAll('.add-cart');
    cartBtns.forEach((btn)=>{
        btn.addEventListener('click',addCart);
    });


    updateTotal();
    
}
//remove item
function removeItem(){
    let title=this.parentElement.querySelector('.cart-piz-title').innerHTML;
    itemList=itemList.filter(el=>el.title!=title);
    this.parentElement.remove();
    loadContent();

}
//change qty
function changeQty(){
    if(isNaN(this.value) || this.value<1){
        this.value=1;
    }
    loadContent();
}

let itemList=[];

//add cart
function addCart(){
    let food=this.parentElement;
    let title=food.querySelector('.piz-title').innerHTML;
    let price=food.querySelector('.piz-price').innerHTML;
    let imgSrc=food.querySelector('.piz-1').src;


    let newProduct={
        title,price,imgSrc
    }

    //check product exist in cart

    if(itemList.find((el)=>el.title==newProduct.title)){
        alert("product already added in cart");
        return;
    }else{
        itemList.push(newProduct);
    }

    let newProductElement=createCartProducts(title,price,imgSrc);
    let element=document.createElement('div');
    element.innerHTML=newProductElement;
    let cartBasket=document.querySelector('.cart-content');
    cartBasket.append(element);
    loadContent();

    
    
}

function createCartProducts(title,price,imgSrc){


    return `
                        <div class="cart-box">
                        <img src="${imgSrc}" class="cart-piz" width="100" height="100">
                        <div class="detail-box">
                            <div class="cart-piz-title">${title}</div>
                            <div class="price-box">
                                <div class="cart-price">${price}</div>
                                <div class="cart-amt">${price}</div>
                            </div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <ion-icon name="trash" class="cart-remove"></ion-icon>


                    </div>

    `;




}
function updateTotal()
{
    const cartItems=document.querySelectorAll('.cart-box');
    const totalValue=document.querySelector('.total-price');


    let total=0;
    cartItems.forEach(product=>{
        let priceElement=product.querySelector('.cart-price');
        let price= parseFloat(priceElement.innerHTML.replace("Rs.",""));
        let qty=product.querySelector('.cart-quantity').value;
        total+=(price*qty);
        product.querySelector('.cart-amt').innerText="Rs."+price*qty;
    });

    totalValue.innerHTML='Rs.'+total;


    //add product count in icon

    const cartCount=document.querySelector('.cart-count');
    let count=itemList.length;
    cartCount.innerHTML=count;

    if(count==0){
        cartCount.style.display='none';  
    }else{
        cartCount.style.display='block';  
        
    }
 

}
const buttons=document.querySelectorAll(".menu-item");
const boxes=document.querySelectorAll(".pbox");

const searchBox=document.querySelector('.search-text');

searchBox.addEventListener('keyup',(e)=>{
    searchText=e.target.value.toLowerCase().trim();
    

    boxes.forEach((pbox)=>{
        const data=pbox.dataset.item;
        if(data.includes(searchText)){
            pbox.style.display='block';
        }else{
            pbox.style.display='none'
        }
    });
    buttons.forEach((but)=>{
        but.classList.remove('iconclicked');

    });
    buttons[0].classList.add('iconclicked');

});

buttons.forEach((but)=>{
    but.addEventListener('click',(e)=>{
        e.preventDefault();
        setActivebtn(e);
        const btnfilter=e.target.dataset.filter;


        
        

    });
});

function setActivebtn(e){
    buttons.forEach((but)=>{
        but.classList.remove('iconclicked');

    });
    e.target.classList.add('iconclicked');
}


