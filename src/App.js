import React, { useState, useEffect } from 'react';
import './App.css';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

function App() {
  const [items, setItems] = useState([]);

  // Load items from localStorage on mount
  useEffect(() => {
    const storedItems = localStorage.getItem('websitesAndTools');
    if (storedItems) {
      try {
        setItems(JSON.parse(storedItems));
      } catch (error) {
        console.error('Error loading items from localStorage:', error);
      }
    }
  }, []);

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('websitesAndTools', JSON.stringify(items));
  }, [items]);

  const handleAddItem = (newItem) => {
    const item = {
      id: Date.now(),
      name: newItem.name,
      url: newItem.url,
    };
    setItems([...items, item]);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Websites & AI Tools</h1>
        <p>Manage your favorite websites and AI tools</p>
      </div>
      <ItemForm onAddItem={handleAddItem} />
      <ItemList items={items} onDeleteItem={handleDeleteItem} />
    </div>
  );
}

export default App;
