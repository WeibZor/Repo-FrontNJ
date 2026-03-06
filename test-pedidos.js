// Test script to verify the orden creation flow
const http = require('http');

// Function to make HTTP request
function makeRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: body ? JSON.parse(body) : null
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
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

async function test() {
  try {
    console.log('🧪 Testing orden creation flow...\n');

    // Test 1: Create client
    console.log('1️⃣ Creating client...');
    const clientData = {
      nombre: 'Test',
      apellido: 'Usuario',
      email: `test-${Date.now()}@example.com`,
      celular: '1234567890',
      direccion: 'Calle Test 123'
    };

    const clientRes = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/clientes',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, clientData);

    console.log(`Status: ${clientRes.status}`);
    console.log(`Response:`, clientRes.body);

    if (clientRes.status !== 201) {
      console.log('❌ Failed to create client');
      return;
    }

    const idCliente = clientRes.body.id_cliente;
    console.log(`✅ Client created with ID: ${idCliente}\n`);

    // Test 2: Create orden
    console.log('2️⃣ Creating orden...');
    const ordenData = {
      id_cliente: idCliente,
      metodo_pago: 'contra-entrega',
      estado: 'pendiente',
      productos: [
        {
          id_producto: 1,
          precio: 30000,
          cantidad: 1
        }
      ]
    };

    const ordenRes = await makeRequest({
      hostname: 'localhost',
      port: 3000,
      path: '/api/pedidos',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, ordenData);

    console.log(`Status: ${ordenRes.status}`);
    console.log(`Response:`, ordenRes.body);

    if (ordenRes.status === 201) {
      console.log(`✅ Orden created successfully with ID: ${ordenRes.body.id_pedido || ordenRes.body.id}`);
    } else {
      console.log('❌ Failed to create orden');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

test();
