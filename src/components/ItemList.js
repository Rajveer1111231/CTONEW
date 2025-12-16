import React from 'react';
import './ItemList.css';
import ItemCard from './ItemCard';

function ItemList({ items, onDeleteItem }) {
  if (items.length === 0) {
    return (
      <div className="list-container">
        <div className="empty-state">
          <p>No items yet. Add your first website or AI tool above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="list-container">
      <h2 className="list-title">Your Items ({items.length})</h2>
      <div className="items-grid">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onDelete={onDeleteItem}
          />
        ))}
      </div>
    </div>
  );
}

export default ItemList;
