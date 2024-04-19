
//the products in shop stored as objects
const product = [ 
  {
      id: 0,
      image: '/student1/student1-images/goldEle.JPG',
      title: 'Gold Elephant Souvenir',
      quantity:1,
      price: 50,
  },
  {
      id: 1,
      image: '/student1/student1-images/woodSouvenir.JPG',
      title:  'Wooden Sri Lankan Map',
      quantity:1,
      price: 30,
  },
  {
      id: 2,
      image: '/student1/student1-images/plateSouvenir.JPG',
      title: 'Sri Lankan Map Plate',
      quantity:1,
      price: 40,
  },
  {
      id: 3,
      image:'/student1/student1-images/orangeEle.JPG' ,
      title: 'Orange Elephant Souvenir',
      quantity:1,
      price: 20,
  }
];



const categories = [...new Set(product.map((item)=>
  {return item}))]
let i=0;   
document.getElementById('product-container').innerHTML = categories.map((item)=>
{
  var {image,title,quantity,price} = item;
  return( 
    `<div class='product-box'>
        <div class='img-box'>
            <img class='images' src=${image}></img>
        </div>
    <div class='bottom'>
    <p>${title}</p>
    <h2>$ ${price}.00</h2>
    <div class='quantity-cart'>`+
    `<input type="number" id="quantInput" class="quantity-input" placeholder=${quantity} min="0" max="20"></input>`+
    "<button class=add-to-cart onclick='addtocart("+(i++)+")'>Add to cart</button>"+
    `</div>
    </div>
    </div>`
)
}).join('')

// empty array to store prodcuts when added to cart
var cart =[];

// appends products to array cart
function addtocart(a){
    cart.push({...categories[a]});
    displaycart();
  }

  const billingForm = document.getElementById('billing');
  const addressShow = document.getElementById('address');
  const updateAddress = document.getElementById('update-address'); 
  const showBilling = document.getElementById('edit-button');
  const modal = document.getElementsByClassName('modal')[0];
  const addressForm = document.getElementById('address1-query');
  

  const billingName = document.getElementById('billing-name');
  const billingEmail = document.getElementById('billing-email');
  const billingTotal = document.getElementById('billing-total');
  
  const billFinPrice = document.getElementById('total');
  
  const closeForm = document.getElementById('close-form');
  const confirm = document.getElementById('confirm-button');

// working - takes input in to mail & personName variables
//checks if input has been entered and if cart is empty and alerts accordingly
function inputinfo()
{
  let mail = document.getElementById("email-textbox").value;
  let personName = document.getElementById("name-textbox").value;
  if (cart.length>0){
    if (personName.length>0){
      if (mail.length>0){
        if (mail.includes("@") && mail.includes("mail.com")){
          billingName.innerHTML = "Name: "+personName;
          billingEmail.innerHTML = "E-mail: "+mail;
          billingTotal.innerHTML = "Total amount: "+billFinPrice.innerHTML;

          billingForm.show(); //opens in same tab if validation passed
          billingForm.style.display = 'flex';
        }else{
          alert("E-mail invalid!")
        }
      }
      else{
        alert("E-mail field is empty! Enter E-mail.")
      }
    }else{
      alert("Name field is empty! Enter name.")
    } 
  }else{
    alert("Cart is empty!")
  } 
}

// deletes the element from array
function delElement(a){
  cart.splice(a, 1);
  displaycart();
}

// deletes all elements from array
function emptyCart(){
  cart=[];
  displaycart();
}


function displaycart(){
  let j = 0, total=0;
  document.getElementById("count").innerHTML=cart.length;
  if(cart.length==0){
      document.getElementById('cartItem').innerHTML = "Your cart is empty";
      document.getElementById("total").innerHTML = "$"+0+".00";
  }
  else{
      document.getElementById("cartItem").innerHTML = cart.map((items)=>
      {
          var {image, title,quantity, price} = items;
          total=total+price;
        
          document.getElementById("total").innerHTML = "$"+total+".00";
    
          return(
              `<div class='row-item-container'>
              <div class='row-img-border'>
                  <img class='rowimg' src=${image}>
              </div>
              <p style='font-size:12px;'>${title}</p>
              <p style='font-size:12px;'>${quantity}x</p>
              <h2 style='font-size: 15px;'>$${price}.00</h2>`+
              "<i class='fa-solid fa-trash' onclick='delElement("+ (j++) +")'></i></div>"
          
              );
      }).join('');
  }
}



closeForm.addEventListener('click', () => {
  billingForm.style.display = 'none';
  // closes form on click
});


confirm.addEventListener('click', () => { //when  clicked
  let cardName = document.getElementById("card-name").value;
  let cardNum = document.getElementById("card-num").value;
  let month = document.getElementById("month").value;
  let year = document.getElementById("year").value;
  let secNum = document.getElementById("sec-num").value;
  let address=document.getElementById("address1").value;

  breakme: if ((cardName.length==0)){ // input validation
    alert("Card name has not been entered!")
    break breakme;
    }else{
      if (cardNum.length==0){
        alert("Card number has not been entered!")
        break breakme;
      }else{
        if(month.length==0){
          alert("Month has not been entered!")
          break breakme;
        }else if(month<1 || month>12){
            alert("Invalid month entered!")
        }else{
          if(year.length==0){
            alert("Year has not been entered!")
            break breakme;
          }else if(year<2023 || year>2050){
            alert("Invalid year entered!")
          }else{
            if (secNum.length==0){
              alert("Security number has not been entered!")
              break breakme;
            }else if(secNum<0 || secNum>999){
            alert("Invalid security number entered!")
            
            }else{
              if (address.length==0){
                alert("Address has not been entered! Press edit to enter address.")
              }else{  //if validation passed
                alert("Order confirmed successfully!")
                billingForm.style.display = 'none'; //closes form 
                window.open("shop.html",'_self')  //reloads tab
              }
            }
          }
        }  
      }
    }
});



updateAddress.addEventListener('click', () => {
  var address1 = document.querySelector('input[name="address1"]').value;

  // displays first address on main form
  addressShow.innerHTML = `
    <div class=address1>${address1}</div>`;
    document.getElementById('billing-address').style.display='none';
});

showBilling.addEventListener('click', () => {
    addressForm.style.display = 'flex';
    modal.style.display = 'flex';
});






