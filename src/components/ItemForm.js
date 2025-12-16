import React, { useState } from 'react';
import './ItemForm.css';

function ItemForm({ onAddItem }) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch (err) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    onAddItem({
      name: name.trim(),
      url: url.trim(),
    });

    // Clear form
    setName('');
    setUrl('');
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="item-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., ChatGPT"
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">URL</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g., https://chatgpt.com"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="add-button">
          Add Item
        </button>
      </form>
    </div>
  );
}

export default ItemForm;
