const { getPool } = require("./connection")

const initializeDatabase = async () => {
  try {
    const pool = getPool()
    const connection = await pool.getConnection()

    // Crear tabla productos
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

    // Insertar datos de ejemplo
    const [users] = await connection.query("SELECT COUNT(*) as count FROM roles")
    if (users[0].count === 0) {
      // Usuario administrador por defecto
      await connection.query("INSERT INTO roles (rol, usuario, contrasena) VALUES (?, ?, ?)", [
        "administrador",
        "admin",
        "admin12345",
      ])

      // Usuario vendedor
      await connection.query("INSERT INTO roles (rol, usuario, contrasena) VALUES (?, ?, ?)", [
        "vendedor",
        "vendedor",
        "vendedor123",
      ])

      // Clientes de ejemplo
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

      // Productos de ejemplo
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

      console.log("✅ Datos de ejemplo insertados")
    }

    connection.release()
    console.log("✅ Base de datos MySQL inicializada correctamente")
  } catch (error) {
    console.error("❌ Error al inicializar la base de datos:", error.message)
    process.exit(1)
  }
}

module.exports = { initializeDatabase }
