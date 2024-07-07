let startpage = 1;
let limit = 2;
let container = document.getElementById('products-container');
let prevbtn = document.getElementById('prev-button');
let nextbtn = document.getElementById('next-button');
AOS.init();
fetch('./js/audio_products.json')
  .then((res) => res.json())
  .then((data) => {
    displayproducts(data);
    nextbtn.addEventListener('click', function () {
      startpage++;
      if (startpage == data.length / limit) {
        nextbtn.classList.add('dispalaynone');
        displayproducts(data);
      } else {
        displayproducts(data);
      }
      if (startpage > 1) {
        prevbtn.classList.remove('dispalaynone');
      }
    });

    prevbtn.addEventListener('click', function () {
      startpage--;
      if (startpage == 1) {
        prevbtn.classList.add('dispalaynone');
        displayproducts(data);
      } else {
        displayproducts(data);
        prevbtn.classList.remove('dispalaynone');
      }
      if (startpage < data.length / limit) {
        nextbtn.classList.remove('dispalaynone');
        console.log('a');
      }
    });
  });

function displayproducts(data) {
  container.innerHTML = '';
  let start = (startpage - 1) * limit;
  let end = start + limit;

  let product = data.slice(start, end);
  product.forEach((element) => {
    let div = document.createElement('div');
    let textdiv = document.createElement('div');

    let img = document.createElement('img');
    img.src = element.img;
    img.alt = 'img not found';

    let title = document.createElement('h2');
    title.textContent = element.name;
    title.classList.add('title');

    let catagory = document.createElement('h2');
    catagory.textContent = element.type;
    catagory.classList.add('catagory');
    console.log('rame');

    let decsription = document.createElement('p');
    decsription.textContent = element.description;
    decsription.classList.add('description');

    let seemore = document.createElement('button');
    seemore.textContent = 'SEE PRODUCT';
    seemore.classList.add('see-product');

    div.appendChild(img);
    textdiv.appendChild(title);
    textdiv.appendChild(catagory);
    textdiv.appendChild(decsription);
    textdiv.appendChild(seemore);
    div.appendChild(textdiv);
    div.classList.add('products-div');
    container.appendChild(div);
    prevbtn.classList.add('dispalaynone');

    seemore.addEventListener('click', function () {
      window.location.href = `product.html?id=${element.id}`;
    });
  });
}

let burger = document.querySelector('.menu-btn');
let overlay = document.querySelector('.overlay');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  document.querySelector('.burger-navigation').classList.toggle('show');
  overlay.classList.toggle('dispaynone');
  document.body.classList.toggle('no-scroll');
});

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

function calculatetotalquantity(cart) {
  return cart.reduce((sum, product) => sum + parseInt(product.amount), 0);
}

function calculatetotalprice(cart) {
  return cart.reduce(
    (sum, product) => sum + parseInt(product.price) * parseInt(product.amount),
    0
  );
}

let shopingcart = document.getElementById('shopingcart');

shopingcart.addEventListener('click', () => {
  update();
  popup.classList.toggle('dispaynone');
  overlay.classList.toggle('dispaynone');
  document.body.classList.toggle('no-scroll');
});
