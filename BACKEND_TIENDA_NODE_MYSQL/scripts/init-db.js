const mysql = require("mysql2/promise")
require("dotenv").config()

console.log("🔧 Inicializando base de datos MySQL...")

const initDatabase = async () => {
  try {
    // Crear conexión sin base de datos para crear la BD
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
    })

    // Crear base de datos
    const dbName = process.env.DB_NAME || "inventario_db"
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`)
    console.log(`✅ Base de datos '${dbName}' creada o ya existe`)

    // Usar la base de datos
    await connection.query(`USE ${dbName}`)

    // Crear todas las tablas
    await connection.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100) NOT NULL,
        descripcion VARCHAR(255),
        precio DECIMAL(10, 2) NOT NULL,
        stock INT NOT NULL DEFAULT 0,
        imagen VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_nombre (nombre)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)
    console.log("✅ Tabla 'productos' creada o ya existe")

    // Crear tabla clientes
    await connection.query(`
      CREATE TABLE IF NOT EXISTS clientes (
        id_cliente INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        celular VARCHAR(20) NOT NULL,
        direccion VARCHAR(150) NOT NULL,
        direccion2 VARCHAR(150),
        descripcion VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)
    console.log("✅ Tabla 'clientes' creada o ya existe")

    // Crear tabla roles (usuarios)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS roles (
        id INT PRIMARY KEY AUTO_INCREMENT,
        rol VARCHAR(50) NOT NULL,
        usuario VARCHAR(50) NOT NULL UNIQUE,
        contrasena VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)
    console.log("✅ Tabla 'roles' creada o ya existe")

    // Crear tabla pedidos
    await connection.query(`
      CREATE TABLE IF NOT EXISTS pedido (
        id INT PRIMARY KEY AUTO_INCREMENT,
        id_cliente INT NOT NULL,
        descuento DECIMAL(10, 2) DEFAULT 0,
        metodo_pago VARCHAR(50) NOT NULL,
        aumento DECIMAL(10, 2) DEFAULT 0,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_cliente) REFERENCES clientes (id_cliente) ON DELETE CASCADE,
        INDEX idx_cliente (id_cliente)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)
    console.log("✅ Tabla 'pedido' creada o ya existe")

    // Crear tabla detalle_pedido
    await connection.query(`
      CREATE TABLE IF NOT EXISTS detalle_pedido (
        id INT PRIMARY KEY AUTO_INCREMENT,
        id_pedido INT NOT NULL,
        id_producto INT NOT NULL,
        precio DECIMAL(10, 2) NOT NULL,
        cantidad INT NOT NULL,
        FOREIGN KEY (id_pedido) REFERENCES pedido (id) ON DELETE CASCADE,
        FOREIGN KEY (id_producto) REFERENCES productos (id) ON DELETE CASCADE,
        INDEX idx_pedido (id_pedido),
        INDEX idx_producto (id_producto)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)
    console.log("✅ Tabla 'detalle_pedido' creada o ya existe")

    // Insertar datos de ejemplo
    console.log("📝 Insertando datos de ejemplo...")

    // Usuario administrador
    try {
      await connection.query("INSERT INTO roles (rol, usuario, contrasena) VALUES (?, ?, ?)", [
        "administrador",
        "admin",
        "admin12345",
      ])
    } catch (err) {
      if (err.code !== "ER_DUP_ENTRY") throw err
    }

    // Usuario vendedor
    try {
      await connection.query("INSERT INTO roles (rol, usuario, contrasena) VALUES (?, ?, ?)", [
        "vendedor",
        "vendedor",
        "vendedor123",
      ])
    } catch (err) {
      if (err.code !== "ER_DUP_ENTRY") throw err
    }

    // Clientes de ejemplo
    try {
      await connection.query(
        "INSERT INTO clientes (nombre, apellido, email, celular, direccion, direccion2, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          "Alan",
          "Brito",
          "alambre@gmail.com",
          "323399999",
          "Calle ciega 123",
          "Edi. Castilla",
          "dejar el pedido en la porteria",
        ],
      )
    } catch (err) {
      if (err.code !== "ER_DUP_ENTRY") throw err
    }

    try {
      await connection.query(
        "INSERT INTO clientes (nombre, apellido, email, celular, direccion, direccion2, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          "Zoyla",
          "Vaca",
          "vacalola@gmail.com",
          "322131444",
          "Cra no se meta 12",
          "casa 2",
          "tocar el timbre 2 veces",
        ],
      )
    } catch (err) {
      if (err.code !== "ER_DUP_ENTRY") throw err
    }

    // Productos de ejemplo
    try {
      await connection.query(
        "INSERT INTO productos (nombre, descripcion, precio, stock, imagen) VALUES (?, ?, ?, ?, ?)",
        [
          "Perro",
          "sin ripio y sin huevo",
          22000,
          20,
          "https://th.bing.com/th/id/OIP.2QjcuwsTimAImo8WSQdTdAHaFp?rs=1&pid=ImgDetMain",
        ],
      )
    } catch (err) {
      if (err.code !== "ER_DUP_ENTRY") throw err
    }

    try {
      await connection.query(
        "INSERT INTO productos (nombre, descripcion, precio, stock, imagen) VALUES (?, ?, ?, ?, ?)",
        [
          "Hamburguesa",
          "doble carne",
          30000,
          5,
          "https://th.bing.com/th/id/R.c691ed37c9ce3040c3ebd2892e88870c?rik=QUBcFflN%2b9oqPQ&pid=ImgRaw&r=0",
        ],
      )
    } catch (err) {
      if (err.code !== "ER_DUP_ENTRY") throw err
    }

    try {
      await connection.query(
        "INSERT INTO productos (nombre, descripcion, precio, stock, imagen) VALUES (?, ?, ?, ?, ?)",
        [
          "Pizza",
          "extragrande",
          45000,
          5,
          "https://www.ocu.org/-/media/ocu/images/home/alimentacion/alimentos/pizzas_selector_1600x900.jpg?rev=6a81e278-07fc-4e95-9ba1-361063f35adf&hash=B8B1264AB6FC3F4B1AE140EB390208CD",
        ],
      )
    } catch (err) {
      if (err.code !== "ER_DUP_ENTRY") throw err
    }

    console.log("✅ Datos de ejemplo insertados")

    await connection.end()
    console.log("✅ Base de datos MySQL inicializada correctamente")
  } catch (error) {
    console.error("❌ Error al inicializar la base de datos:", error.message)
    process.exit(1)
  }
}

initDatabase()
