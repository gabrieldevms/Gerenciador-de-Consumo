document.addEventListener('DOMContentLoaded', function () {
  const filterForm = document.getElementById('filterForm');
  const filterProduto = document.getElementById('filterProduto');
  const filterMarca = document.getElementById('filterMarca');
  const tabelaConsumo = document.getElementById('tabela-consumo');

  const productsData = JSON.parse(localStorage.getItem('productsData')) || [];
  const ordersData = JSON.parse(localStorage.getItem('ordersData')) || [];

  // const productsData =
  //   JSON.parse(localStorage.getItem('data/products.json')) || [];
  // const ordersData = JSON.parse(localStorage.getItem('data/orders.json')) || [];

  productsData.forEach((product) => {
    const option = document.createElement('option');
    option.value = product.productName;
    option.textContent = product.productName;
    filterProduto.appendChild(option);
  });

  productsData.forEach((product) => {
    const option = document.createElement('option');
    option.value = product.productBrand;
    option.textContent = product.productBrand;
    filterMarca.appendChild(option);
  });

  filterForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const selectedProduto = filterProduto.value;
    const selectedMarca = filterMarca.value;

    // Filtrar dados de consumo
    const filteredOrders = ordersData.filter(
      (order) =>
        (selectedProduto === '' || order.productName === selectedProduto) &&
        (selectedMarca === '' || order.productBrand === selectedMarca)
    );

    // Calcular consumo por cliente
    const consumptionData = filteredOrders.reduce((result, order) => {
      const clientIndex = result.findIndex(
        (item) => item.clientName === order.clientName
      );
      if (clientIndex === -1) {
        result.push({
          clientName: order.clientName,
          totalConsumption: order.quantity,
        });
      } else {
        result[clientIndex].totalConsumption += order.quantity;
      }
      return result;
    }, []);

    // Ordenar e exibir resultados na tabela
    tabelaConsumo.innerHTML = '';
    const topClients = consumptionData
      .sort((a, b) => b.totalConsumption - a.totalConsumption)
      .slice(0, 6);

    topClients.forEach((client) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${client.clientName}</td><td>${client.totalConsumption}</td>`;
      tabelaConsumo.appendChild(row);
    });
  });
});
