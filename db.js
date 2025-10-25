// db.js — simple in-memory store (simulates DB)
const items = [];

module.exports = {
  clear() {
    items.length = 0;
  },
  all() {
    return items;
  },
  add(item) {
    const id = items.length + 1;
    const rec = { id, ...item };
    items.push(rec);
    return rec;
  },
  find(id) {
    return items.find(i => i.id === id);
  }
};

