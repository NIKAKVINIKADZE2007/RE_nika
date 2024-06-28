const urlParams = new URLSearchParams(window.location.search);
let amount = 1;
const productId = parseInt(urlParams.get('id'));

let popup = document.querySelector('.pop-up');
popup.classList.add('dispaynone');

let shopingcart = document.getElementById('shopingcart');
let overlay = document.querySelector('.overlay');

shopingcart.addEventListener('click', (event) => {
  popup.classList.toggle('dispaynone');
  overlay.classList.toggle('dispaynone');
  document.body.classList.add('no-scroll');
  event.preventDefault();
  update();
});

overlay.addEventListener('click', () => {
  popup.classList.toggle('dispaynone');
  overlay.classList.toggle('dispaynone');
  document.body.classList.add('no-scroll');
});

AOS.init();
if (productId) {
  fetch('./js/audio_products.json')
    .then((res) => res.json())
    .then((data) => {
      let product = data[productId - 1];

      document.getElementById('product-img').src = product.img;

      document.getElementById('name').textContent = product.name;

      document.getElementById('catagory').textContent = product.type;

      document.getElementById('description').textContent = product.description;

      document.getElementById('price').textContent = `$ ${product.price}`;

      let div = document.querySelector('.Div');

      let pliusbtn = document.createElement('button');
      pliusbtn.textContent = '+';
      pliusbtn.classList.add('pliusbtn');

      let minusbtn = document.createElement('button');
      minusbtn.textContent = '-';
      minusbtn.classList.add('minusbtn');

      let quantity = document.createElement('input');
      quantity.type = 'number';
      quantity.value = 1;
      quantity.min = 1;
      quantity.id = `productquantity${product.id}`;
      quantity.classList.add('quantityinput');

      div.appendChild(minusbtn);
      div.appendChild(quantity);
      div.appendChild(pliusbtn);

      //დაჭერაზე მომატება
      pliusbtn.addEventListener('click', () => {
        increaseitem(product.id);
      });

      //დაჭერაზე დაკლება
      minusbtn.addEventListener('click', () => {
        decreaseitem(product.id);
      });

      //add to cart
      let addtocartbtn = document.getElementById('addtocart');

      addtocartbtn.addEventListener('click', () => {
        const amount = parseInt(
          document.getElementById(`productquantity${product.id}`).value
        );

        addtocart({ ...product, amount });
      });

      //ტექსტის ორად გაყოფა
      let half = product.features.slice(0, product.features.length / 2);
      let last = half.lastIndexOf('.');
      //ფუნქციონალის დამატება amountze

      document.querySelector('.features-text1').textContent =
        product.features.slice(0, last + 1);

      document.querySelector('.features-text2').textContent =
        product.features.slice(last + 2);

      //ბოლოში სურათების ჩასმა

      for (i = 0; i < product.additionalImages.length; i++) {
        document.getElementById(`img${i}`).src = product.additionalImages[i];
      }
    });
}

function increaseitem(productid) {
  quantity = document.getElementById(`productquantity${productid}`);
  quantity.value = parseInt(quantity.value) + 1;
}

function decreaseitem(productid) {
  quantity = document.getElementById(`productquantity${productid}`);
  if (parseInt(quantity.value) > 1) {
    quantity.value = parseInt(quantity.value) - 1;
  }
}

function addtocart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingproducts = cart.findIndex((p) => p.id == product.id);

  if (existingproducts >= 0) {
    cart[existingproducts].amount += product.amount;
  } else {
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  update();
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
