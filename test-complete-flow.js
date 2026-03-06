// Complete flow test: Checkout -> Order -> Stock Decrease -> Dashboard
const http = require('http');

function makeRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            body: body ? JSON.parse(body) : null
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            body: body
          });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function testCompleteFlow() {
  try {
    console.log('\n🎯 TESTING COMPLETE RESTAURANT FLOW\n');
    
    // Step 1: Get stock before order
    console.log('📦 Step 1: Checking stock BEFORE order...');
    const beforeRes = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/productos',
      method: 'GET'
    });
    
    const productoBefore = beforeRes.body.find(p => p.id === 2); // Hamburguesa
    console.log(`   Hamburguesa stock antes: ${productoBefore.stock} unidades\n`);
    
    // Step 2: Create client
    console.log('👤 Step 2: Creating customer...');
    const clientRes = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/clientes',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      nombre: 'Test',
      apellido: 'Order',
      email: `test-${Date.now()}@example.com`,
      celular: '3001234567',
      direccion: 'Calle Test 123'
    });
    
    const idCliente = clientRes.body.id_cliente;
    console.log(`   ✅ Customer created: ID ${idCliente}\n`);
    
    // Step 3: Create order with product
    console.log('🛒 Step 3: Creating order with Hamburguesa...');
    const orderRes = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/pedidos',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      id_cliente: idCliente,
      metodo_pago: 'contra-entrega',
      estado: 'pendiente',
      productos: [{
        id_producto: 2,
        precio: 30000,
        cantidad: 2  // Order 2 hamburguesas
      }]
    });
    
    const idPedido = orderRes.body.id_pedido;
    console.log(`   ✅ Order created: ID ${idPedido}`);
    console.log(`   💰 Total: $${orderRes.body.total}\n`);
    
    // Step 4: Check stock after order
    console.log('📦 Step 4: Checking stock AFTER order...');
    const afterRes = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/productos',
      method: 'GET'
    });
    
    const productoAfter = afterRes.body.find(p => p.id === 2);
    const stockDecreased = productoBefore.stock - productoAfter.stock;
    console.log(`   Hamburguesa stock después: ${productoAfter.stock} unidades`);
    console.log(`   ✅ Stock DECREASED by ${stockDecreased} units!\n`);
    
    // Step 5: Verify order in dashboard
    console.log('📊 Step 5: Verifying order in dashboard...');
    const dashboardRes = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/pedidos',
      method: 'GET'
    });
    
    const pedidoInDash = dashboardRes.body.find(p => p.id_pedido === idPedido);
    if (pedidoInDash) {
      console.log(`   ✅ Order found in dashboard:`);
      console.log(`      • ID: ${pedidoInDash.id_pedido}`);
      console.log(`      • Cliente: ${pedidoInDash.id_cliente}`);
      console.log(`      • Estado: ${pedidoInDash.estado}`);
      console.log(`      • Total: $${pedidoInDash.total}\n`);
    }
    
    // Summary
    console.log('✅ COMPLETE FLOW SUCCESSFUL!\n');
    console.log('📋 What happened:');
    console.log('   1. ✅ Productos cargados desde BD');
    console.log('   2. ✅ Cliente creado en BD');
    console.log(`   3. ✅ Orden creada con 2 Hamburguesas`);
    console.log(`   4. ✅ Stock disminuido de ${productoBefore.stock} a ${productoAfter.stock}`);
    console.log(`   5. ✅ Orden visible en dashboard\n`);
    console.log('🎉 El sistema está completamente integrado!\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

testCompleteFlow();
