// storage.js

const StorageService = {
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    get: (key) => JSON.parse(localStorage.getItem(key)),

    init() {
        if (!this.get("categories")) {
            this.set("categories", [
                "Electrónica",
                "Ropa",
                "Alimentos",
                "Hogar",
                "Deportes"
            ]);
        }

        if (!this.get("products")) {
            const data = [
                // ELECTRÓNICA
                ["Laptop Lenovo ThinkPad", "Electrónica", "laptop"],
                ["Smartphone Samsung Galaxy", "Electrónica", "smartphone"],
                ["Monitor LED 24 pulgadas", "Electrónica", "monitor"],
                ["Teclado Mecánico RGB", "Electrónica", "keyboard"],
                ["Mouse Inalámbrico Logitech", "Electrónica", "mouse"],

                // ROPA
                ["Camiseta Deportiva Nike", "Ropa", "tshirt"],
                ["Pantalón Jeans Azul", "Ropa", "jeans"],
                ["Sudadera con Capucha", "Ropa", "hoodie"],
                ["Chaqueta Deportiva", "Ropa", "jacket"],
                ["Zapatos Running", "Ropa", "sneakers"],

                // ALIMENTOS
                ["Arroz Integral 1kg", "Alimentos", "rice"],
                ["Aceite de Oliva", "Alimentos", "olive-oil"],
                ["Pasta Italiana", "Alimentos", "pasta"],
                ["Leche Deslactosada", "Alimentos", "milk"],
                ["Cereal Integral", "Alimentos", "cereal"],

                // HOGAR
                ["Licuadora Eléctrica", "Hogar", "blender"],
                ["Cafetera Eléctrica", "Hogar", "coffee-maker"],
                ["Juego de Sartenes", "Hogar", "cookware"],
                ["Ventilador de Torre", "Hogar", "fan"],
                ["Plancha a Vapor", "Hogar", "iron"],

                // DEPORTES
                ["Balón de Fútbol", "Deportes", "soccer-ball"],
                ["Raqueta de Tenis", "Deportes", "tennis-racket"],
                ["Bicicleta de Montaña", "Deportes", "mountain-bike"],
                ["Pesas Ajustables", "Deportes", "dumbbells"],
                ["Colchoneta de Yoga", "Deportes", "yoga-mat"]
            ];

            const products = data.map((p, i) => ({
                id: Date.now() + i,
                name: p[0],
                category: p[1],
                price: Math.floor(Math.random() * 4000) + 100,
                stock: Math.floor(Math.random() * 50) + 10,
                stockMin: 10,
                image: `https://picsum.photos/seed/${p[2]}/200/200`,
                movements: []
            }));

            this.set("products", products);
        }
    }
};

StorageService.init();
