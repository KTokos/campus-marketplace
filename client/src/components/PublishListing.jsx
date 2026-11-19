import { useState } from 'react';

export default function PublishListing({ currentUser, onAddListing, onGoToVerify }) {
  // ----- State variables / setters -----

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Textbooks');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });

  // Returns log in message if the current user is not logged in or verified
  if (!currentUser || !currentUser.isVerified) {
    return (
      <div className="card">
        <h2>UC-02: Publish a Listing</h2>
        <div className="message-box error">
          You must be logged in with a verified student account to post a listing.
        </div>
        <button onClick={onGoToVerify}>Go to Account Verification</button>
      </div>
    );
  }

  // ----- Methods -----

  // handleSubmit(e):
  //    Validates input, passes the listing to onAddListing then resets the inputs
  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !price || !description) {
      setMsg({ text: 'Please fill out all required fields.', type: 'error' });
      return;
    }

    if (parseFloat(price) <= 0 || isNaN(parseFloat(price))) {
      setMsg({ text: 'Price must be a valid number greater than 0.', type: 'error' });
      return;
    }

    const newListing = {
      id: Date.now(),
      title,
      category,
      price: parseFloat(price),
      location: location || 'Campus Center',
      description,
      sellerEmail: currentUser.email,
      status: 'Available'
    };

    onAddListing(newListing);
    setTitle('');
    setPrice('');
    setLocation('');
    setDescription('');
    setMsg({ text: 'Listing published successfully!', type: 'success' });
  }

  return (
    <div className="card">
      <h2>UC-02: Publish a Listing</h2>

      {msg.text && <div className={`message-box ${msg.type}`}>{msg.text}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Item Title *</label>
          <input
            type="text"
            placeholder="e.g. Calculus Textbook"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Textbooks">Textbooks</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Supplies">Supplies</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Price ($) *</label>
          <input
            type="number"
            placeholder="25.00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Campus Pickup Spot</label>
          <input
            type="text"
            placeholder="e.g. Science Library"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            rows="3"
            placeholder="Item details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit">Post Listing</button>
      </form>
    </div>
  );
}
