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
