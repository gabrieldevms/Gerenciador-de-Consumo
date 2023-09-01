document.addEventListener('DOMContentLoaded', function () {
  const orderForm = document.getElementById('orderForm');
  const clientsData = JSON.parse(localStorage.getItem('clientsData')) || [];
  const productsData = JSON.parse(localStorage.getItem('productsData')) || [];

  orderForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const orderClientName = document.getElementById('orderClientName').value;
    const orderClientEmail = document.getElementById('orderClientEmail').value;
    const orderProductName = document.getElementById('orderProductName').value;
    const orderProductBrand =
      document.getElementById('orderProductBrand').value;
    const orderQuantity = parseInt(
      document.getElementById('orderQuantity').value
    );

    const clientExists = clientsData.some(
      (client) =>
        client.name === orderClientName && client.email === orderClientEmail
    );
    if (!clientExists) {
      alert('Cliente não cadastrado.');
      return;
    }

    const productExists = productsData.some(
      (product) =>
        product.productName === orderProductName &&
        product.productBrand === orderProductBrand
    );
    if (!productExists) {
      alert('Produto não cadastrado.');
      return;
    }

    const productIndex = productsData.findIndex(
      (product) =>
        product.productName === orderProductName &&
        product.productBrand === orderProductBrand
    );

    const product = productsData[productIndex];

    if (orderQuantity > product.productQuantity) {
      alert('Quantidade indisponível.');
      return;
    }

    product.productQuantity -= orderQuantity;

    // Atualizar a quantidade disponível do produto no localStorage
    productsData[productIndex] = product;
    localStorage.setItem('productsData', JSON.stringify(productsData));

    let ordersData = JSON.parse(localStorage.getItem('ordersData')) || [];
    ordersData.push({
      clientName: orderClientName,
      clientEmail: orderClientEmail,
      productName: orderProductName,
      productBrand: orderProductBrand,
      quantity: orderQuantity,
    });
    localStorage.setItem('ordersData', JSON.stringify(ordersData));

    // console.log(
    //   localStorage.getItem('ordersData'),
    //   localStorage.getItem('productsData')
    // );

    alert('Pedido realizado com sucesso');
    orderForm.reset();
  });
});
