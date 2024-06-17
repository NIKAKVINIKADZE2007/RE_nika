let startpage = 1;
let limit = 2;
let container = document.getElementById('products-container');
let prevbtn = document.getElementById('prev-button');
let nextbtn = document.getElementById('next-button');
displayproducts();
function displayproducts() {
  container.innerHTML = '';
  let start = (startpage - 1) * 2;
  let end = start + limit;

  let product = products.slice(start, end);
  product.forEach((element) => {
    let div = document.createElement('div');
    let textdiv = document.createElement('div');

    let img = document.createElement('img');
    img.src = element.img;
    img.alt = 'img not found';

    let title = document.createElement('h2');
    title.textContent = element.title;
    title.classList.add('title');

    let decsription = document.createElement('p');
    decsription.textContent = element.decsription;
    decsription.classList.add('description');

    console.log(element.id);
    div.appendChild(img);
    textdiv.appendChild(title);
    textdiv.appendChild(decsription);
    div.appendChild(textdiv);

    container.appendChild(div);
  });
}

nextbtn.addEventListener('click', function () {
  startpage++;
  displayproducts();
});
