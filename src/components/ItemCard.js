import React from 'react';
import './ItemCard.css';

function ItemCard({ item, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      onDelete(item.id);
    }
  };

  return (
    <div className="item-card">
      <div className="card-content">
        <h3 className="card-title">{item.name}</h3>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card-link"
        >
          {item.url}
        </a>
      </div>
      <button
        className="delete-button"
        onClick={handleDelete}
        title="Delete item"
      >
        ×
      </button>
    </div>
  );
}

export default ItemCard;
