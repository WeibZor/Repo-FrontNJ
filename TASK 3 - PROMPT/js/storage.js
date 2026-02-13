const StorageService = {
    set: (key,value) => localStorage.setItem(key, JSON.stringify(value)),
    get: (key) => JSON.parse(localStorage.getItem(key)) || null,

    init: () => {
        // Categorías
        if(!StorageService.get("categories")){
            StorageService.set("categories", ["Electrónica","Alimentos","Ropa","Hogar","Deportes"]);
        }

        // Productos
        if(!StorageService.get("products")){
            const categories = StorageService.get("categories");
            const products = [];
            for(let i=1;i<=30;i++){
                products.push({
                    id: i,
                    name: `Producto ${i}`,
                    category: categories[i%categories.length],
                    price: Math.floor(Math.random()*5000)+100,
                    stock: Math.floor(Math.random()*100)+5,
                    stockMin: 10,
                    image: `https://via.placeholder.com/100?text=Prod+${i}`,
                    movements: []
                });
            }
            StorageService.set("products", products);
        }
    }
};

StorageService.init();
