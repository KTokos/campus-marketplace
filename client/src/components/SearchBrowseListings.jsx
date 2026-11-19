import { useState } from 'react';

export default function SearchBrowseListings({ listings, onMessageSeller, currentUser, onGoToVerify }) {
  // ----- State variables / setters -----

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  // Returns the filtered item list based on the search input or selected category
  const filtered = listings.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                          item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || item.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="card">
      <h2>UC-03: Search and Inspect Listings</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Search by keywords..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '150px' }}>
          <option value="All">All Categories</option>
          <option value="Textbooks">Textbooks</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Supplies">Supplies</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: '#666' }}>No listings found. Post a new one under 'Post Listing'!</p>
      ) : (
        filtered.map((item) => (
          <div key={item.id} className="listing-item">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{item.title}</strong>
              <span>${item.price}</span>
            </div>
            <div>
              <small>Category: {item.category}</small> |{' '}
              <small>Status: <span className={item.status === 'Sold' ? 'tag tag-sold' : 'tag'}>{item.status}</span></small>
            </div>

            <div style={{ marginTop: '8px' }}>
              <button
                onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                style={{ fontSize: '12px', padding: '3px 8px' }}
              >
                {selectedItem?.id === item.id ? 'Hide Details' : 'Inspect Details'}
              </button>
            </div>

            {selectedItem?.id === item.id && (
              <div style={{ marginTop: '10px', padding: '10px', background: '#f9f9f9', borderTop: '1px solid #eee' }}>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Pickup Spot:</strong> {item.location}</p>
                <p><strong>Seller:</strong> {item.sellerEmail}</p>

                {item.status === 'Sold' ? (
                  <p style={{ color: '#a00' }}>This item has been sold.</p>
                ) : (
                  <button
                    onClick={() => {
                      if (!currentUser || !currentUser.isVerified) {
                        alert('You must be a verified student to message sellers.');
                        onGoToVerify();
                      } else {
                        onMessageSeller(item);
                      }
                    }}
                  >
                    Message Seller (UC-04)
                  </button>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
