let mainsection = document.querySelector('.main-container');

let form = document.getElementById('form');

//overlay
let overlay = document.querySelector('.overlay');

console.log(localStorage.getItem('payed'));
let div2 = document.createElement('div');
div2.classList.add('div2');

let div2container = document.querySelector('.div2-container');
//creating container

let div2content = document.createElement('div');
div2content.classList.add('div2content');

//summary
let summmary = document.createElement('h2');
summmary.textContent = 'summary';
summmary.classList.add('summary');

let cart = JSON.parse(localStorage.getItem('cart'));

//creating products container
let container = document.createElement('div');
container.classList.add('products-container');
console.log(cart);

cart.forEach((product) => {
  let productdiv = document.createElement('div');
  productdiv.classList.add('productdiv');

  //creating first part of div
  let imgandpricediv = document.createElement('div');
  imgandpricediv.classList.add('imgandpricediv');

  //creating img
  let productimg = document.createElement('img');
  productimg.src = product.img;
  productimg.classList.add('productimg');

  //creating price and name div
  let innerdiv1 = document.createElement('div');
  innerdiv1.classList.add('price-name-div');

  let name = document.createElement('p');
  name.textContent = product.name;
  name.classList.add('name');

  let price = document.createElement('p');
  price.textContent = product.price;
  price.classList.add('price');

  innerdiv1.appendChild(name);
  innerdiv1.appendChild(price);

  let amount = document.createElement('p');
  amount.textContent = `x${product.amount}`;
  amount.classList.add('ammount');

  //compliting imgandpricediv
  imgandpricediv.appendChild(productimg);
  imgandpricediv.appendChild(innerdiv1);

  //adding everything
  productdiv.appendChild(imgandpricediv);
  productdiv.appendChild(amount);

  container.appendChild(productdiv);
});
//product-div

//creating total
let totaldiv = document.createElement('div');
totaldiv.classList.add('totaldiv');

let total = document.createElement('p');
total.textContent = 'TOTAL';
total.classList.add('total');

let totalprice = document.createElement('p');

totalprice.textContent = `$${cart.reduce(
  (sum, product) => sum + parseInt(product.price) * parseInt(product.amount),
  0
)}`;
totalprice.classList.add('totalprice');

let shippingdiv = document.createElement('div');
shippingdiv.classList.add('shippingdiv');

let shipping = document.createElement('p');
shipping.textContent = 'SHIPPING';
shipping.classList.add('total');

let shippingprice = document.createElement('p');
shippingprice.textContent = '$50';
shippingprice.classList.add('totalprice');

shippingdiv.appendChild(shipping);
shippingdiv.appendChild(shippingprice);

//adding to total
totaldiv.appendChild(total);
totaldiv.appendChild(totalprice);

let grandtotaldiv = document.createElement('div');
grandtotaldiv.classList.add('grandtotal');

let grandtotal = document.createElement('p');
grandtotal.textContent = 'GRAND TOTAL';
grandtotal.classList.add('total');

let grandtotalprice = document.createElement('p');
grandtotalprice.textContent = `$${
  cart.reduce(
    (sum, product) => sum + parseInt(product.price) * parseInt(product.amount),
    0
  ) + 50
}`;
grandtotalprice.classList.add('grandtotalprice');

grandtotaldiv.appendChild(grandtotal);
grandtotaldiv.appendChild(grandtotalprice);

let pay = document.createElement('button');
pay.setAttribute('form', 'form');
pay.type = 'submit';
pay.textContent = 'CONTINUE & PAY';
pay.classList.add('pay');

pay.addEventListener('click', (event) => {
  localStorage.setItem('payed', true);
});

div2content.appendChild(summmary);
div2content.appendChild(container);
div2content.appendChild(totaldiv);
div2content.appendChild(shippingdiv);
div2content.appendChild(grandtotaldiv);
div2content.appendChild(pay);

div2.appendChild(div2content);

div2container.appendChild(div2);

if (JSON.parse(localStorage.getItem('payed'))) {
  overlay.classList.add('show');
  document.body.classList.add('no-scroll');
  document.querySelector('.verification-container').classList.add('show');
}

let backhomebtn = document.querySelector('.backtohome');

backhomebtn.addEventListener('click', () => {
  localStorage.setItem('payed', JSON.stringify(false));
});

let burger = document.querySelector('.menu-btn');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  document.querySelector('.burger-navigation').classList.toggle('show');
  overlay.classList.toggle('show');
  document.body.classList.toggle('no-scroll');
});

function calculatetotalquantity(cart) {
  return cart.reduce((sum, product) => sum + parseInt(product.amount), 0);
}

function calculatetotalprice(cart) {
  return cart.reduce(
    (sum, product) => sum + parseInt(product.price) * parseInt(product.amount),
    0
  );
}

let popup = document.querySelector('.pop-up');

function update() {
  popup.innerHTML = '';
  let cart = JSON.parse(localStorage.getItem('cart'));
  let div1 = document.createElement('div');
  div1.classList.add('div1');

  let cartammount = document.createElement('p');

  cartammount.textContent = `Cart (${calculatetotalquantity(cart)})`;

  let removeall = document.createElement('button');
  removeall.textContent = 'Remove all';
  removeall.classList.add('removeall');

  removeall.addEventListener('click', () => {
    prouctsdiv.innerHTML = '';
    cartammount.textContent = `Cart (0)`;
    localStorage.removeItem('cart');
  });

  let prouctsdiv = document.createElement('div');
  prouctsdiv.classList.add('productsdiv');

  cart.forEach((product) => {
    //მთავარი შიდა div
    let container = document.createElement('div');
    container.classList.add('productdiv');
    //შიდა ორი div

    let innerdiv1 = document.createElement('div');
    innerdiv1.classList.add('innerdiv1');
    let innerdiv2 = document.createElement('div');
    innerdiv2.classList.add('Div2');

    //innerdiv1
    let productimg = document.createElement('img');
    productimg.src = product.img;

    let div1 = document.createElement('div');
    div1.classList.add('Div1');

    //სახელი
    let name = document.createElement('p');
    name.textContent = product.name;
    name.classList.add('name');

    //ფასი
    let price = document.createElement('p');
    price.textContent = product.price;
    price.classList.add('price');

    div1.appendChild(name);
    div1.appendChild(price);

    //დამატება innerdiv1ში
    innerdiv1.appendChild(productimg);
    innerdiv1.appendChild(div1);

    //innerdiv2
    let amount = document.createElement('p');
    amount.textContent = product.amount;

    //removebtn
    let removebtn = document.createElement('button');
    removebtn.textContent = 'REMOVE';
    removebtn.id = `remove${product.id}`;

    removebtn.addEventListener('click', () => {
      const existingproducts = cart.findIndex((p) => p.id == product.id);
      cart.splice(existingproducts, 1);

      localStorage.setItem('cart', JSON.stringify(cart));
      update();
    });

    innerdiv2.appendChild(amount);
    innerdiv2.appendChild(removebtn);

    container.appendChild(innerdiv1);
    container.appendChild(innerdiv2);
    prouctsdiv.appendChild(container);
  });

  //total და checkout
  let div3 = document.createElement('div');
  div3.classList.add('div3');
  //total
  let total = document.createElement('p');
  total.textContent = 'TOTAL';
  total.classList.add('total');

  let totalprice = document.createElement('p');
  totalprice.textContent = `$ ${calculatetotalprice(cart)}`;
  totalprice.classList.add('totalprice');

  let checkout = document.createElement('button');
  checkout.textContent = 'CHECKOUT';
  checkout.classList.add('checkout');

  checkout.addEventListener('click', () => {
    window.location.href = 'checkout.html';
  });

  if (calculatetotalquantity(cart) == 0) {
    checkout.classList.add('dispaynone');
    prouctsdiv.classList.add('dispaynone');
  } else {
    checkout.classList.remove('dispaynone');
    prouctsdiv.classList.remove('dispaynone');
  }

  div1.appendChild(cartammount);
  div1.appendChild(removeall);
  div3.appendChild(total);
  div3.appendChild(totalprice);
  popup.appendChild(div1);
  popup.appendChild(prouctsdiv);
  popup.appendChild(div3);
  popup.appendChild(checkout);
}

let shopingcart = document.getElementById('shopingcart');

shopingcart.addEventListener('click', () => {
  update();
  popup.classList.toggle('dispaynone');
  overlay.classList.toggle('dispaynone');
  document.body.classList.toggle('no-scroll');
});
