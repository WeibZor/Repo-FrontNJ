class LocalDatabase {
  constructor() {
    this.dbName = 'ConciliaYaDB';
    this.initialize();
  }

  initialize() {
    if (!localStorage.getItem(this.dbName)) {
      const initialData = {
        usuarios: [],
        perfiles: [],
        conflictos: [],
        mediaciones: [],
        tiposConflicto: [],
        estadosConflicto: [],
        publicaciones: [],
        comentarios: [],
        likes: [],
        notificaciones: [],
        logs: [],
        sesiones: []
      };
      localStorage.setItem(this.dbName, JSON.stringify(initialData));
    }
  }

  getData() {
    return JSON.parse(localStorage.getItem(this.dbName));
  }

  setData(data) {
    localStorage.setItem(this.dbName, JSON.stringify(data));
  }

  getCollection(collectionName) {
    const data = this.getData();
    return data[collectionName] || [];
  }

  setCollection(collectionName, items) {
    const data = this.getData();
    data[collectionName] = items;
    this.setData(data);
  }

  addToCollection(collectionName, item) {
    const collection = this.getCollection(collectionName);
    const newId = collection.length > 0 ? Math.max(...collection.map(i => i.id)) + 1 : 1;
    const newItem = { ...item, id: newId };
    collection.push(newItem);
    this.setCollection(collectionName, collection);
    return newItem;
  }

  updateInCollection(collectionName, id, updates) {
    const collection = this.getCollection(collectionName);
    const index = collection.findIndex(item => item.id === id);
    if (index !== -1) {
      collection[index] = { ...collection[index], ...updates };
      this.setCollection(collectionName, collection);
      return collection[index];
    }
    return null;
  }

  removeFromCollection(collectionName, id) {
    const collection = this.getCollection(collectionName);
    const filtered = collection.filter(item => item.id !== id);
    this.setCollection(collectionName, filtered);
    return filtered;
  }

  findInCollection(collectionName, predicate) {
    const collection = this.getCollection(collectionName);
    return collection.find(predicate);
  }

  filterCollection(collectionName, predicate) {
    const collection = this.getCollection(collectionName);
    return collection.filter(predicate);
  }

  clear() {
    localStorage.removeItem(this.dbName);
    this.initialize();
  }
}

export default new LocalDatabase();