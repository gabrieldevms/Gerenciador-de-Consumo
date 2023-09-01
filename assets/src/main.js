document.addEventListener('DOMContentLoaded', function () {
  const clientForm = document.getElementById('clientForm');
  const productForm = document.getElementById('productForm');

  if (clientForm) {
    clientForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const clientName = document.getElementById('clientName').value;
      const clientEmail = document.getElementById('clientEmail').value;
      const clientAge = parseInt(document.getElementById('clientAge').value);

      let clientsData = JSON.parse(localStorage.getItem('clientsData')) || [];
      clientsData.push({
        name: clientName,
        email: clientEmail,
        age: clientAge,
      });
      localStorage.setItem('clientsData', JSON.stringify(clientsData));

      console.log(localStorage.getItem('clientsData'));

      alert('Cadastro de cliente criado com sucesso.');
      clientForm.reset();
    });
  }

  if (productForm) {
    productForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const productName = document.getElementById('productName').value;
      const productBrand = document.getElementById('productBrand').value;
      const productQuantity = parseInt(
        document.getElementById('productQuantity').value
      );

      let productsData = JSON.parse(localStorage.getItem('productsData')) || [];
      productsData.push({ productName, productBrand, productQuantity });
      localStorage.setItem('productsData', JSON.stringify(productsData));

      console.log(localStorage.getItem('productsData'));

      alert('Cadastro de produto criado com sucesso.');
      productForm.reset();
    });
  }
});
