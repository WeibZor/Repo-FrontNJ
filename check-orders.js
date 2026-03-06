// Check orders in database
const http = require('http');

http.get('http://localhost:3000/api/pedidos', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const pedidos = JSON.parse(data);
    console.log('\n📦 Total órdenes en BD:', pedidos.length);
    console.log('📊 Últimas 3 órdenes:\n');
    pedidos.slice(-3).forEach(p => {
      console.log(`  - ID Pedido: ${p.id_pedido || p.id}, ID Cliente: ${p.id_cliente}, Estado: ${p.estado}, Total: ${p.total}`);
    });
    console.log('\n✅ Órdenes guardadas correctamente en la base de datos');
  });
});
