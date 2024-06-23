const urlParams = new URLSearchParams(window.location.search);
let amount = 1;
const productId = parseInt(urlParams.get('id'));

if (productId) {
  fetch('./js/audio_products.json')
    .then((res) => res.json())
    .then((data) => {
      let product = data[productId - 1];

      document.getElementById('product-img').src = product.img;

      document.getElementById('name').textContent = product.name;

      document.getElementById('catagory').textContent = product.type;

      document.getElementById('description').textContent = product.description;

      document.getElementById('price').textContent = `$ ${
        product.price * amount
      }`;

      //ტექსტის ორად გაყოფა
      let half = product.features.slice(0, product.features.length / 2);
      let last = half.lastIndexOf('.');
      //ფუნქციონალის დამატება amountze
      document.querySelector('.minusbtn').addEventListener('click', () => {
        if (amount > 1) {
          amount -= 1;
          document.getElementById('amount').textContent = amount;
          document.getElementById('price').textContent = `$ ${
            product.price * amount
          }`;
        }
      });

      document.querySelector('.pliusbtn').addEventListener('click', () => {
        amount += 1;
        document.getElementById('amount').textContent = amount;
        document.getElementById('price').textContent = `$ ${
          product.price * amount
        }`;
      });

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
