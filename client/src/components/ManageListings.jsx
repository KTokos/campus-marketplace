export default function ManageListings({ currentUser, listings, onUpdateStatus, onRemoveListing, onGoToVerify }) {
  // ----- State variables / setters -----

  // Returns log in message if current user is not logged in or verified
  if (!currentUser || !currentUser.isVerified) {
    return (
      <div className="card">
        <h2>UC-05: Mark Sold or Remove Listing</h2>
        <div className="message-box error">
          You must be logged in with a verified student account to manage your listings.
        </div>
        <button onClick={onGoToVerify}>Go to Account Verification</button>
      </div>
    );
  }

  // Filters listings shown based on users email
  const myListings = listings.filter((item) => item.sellerEmail === currentUser.email);

  return (
    <div className="card">
      <h2>UC-05: Mark Sold or Remove Listing</h2>
      <p>Listings created by: <strong>{currentUser.email}</strong></p>

      {myListings.length === 0 ? (
        <p style={{ color: '#666' }}>You have not published any listings yet.</p>
      ) : (
        myListings.map((item) => (
          <div key={item.id} className="listing-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>{item.title}</strong> - ${item.price}
              <div>
                <small>Status: <span className={item.status === 'Sold' ? 'tag tag-sold' : 'tag'}>{item.status}</span></small>
              </div>
            </div>

            <div>
              {item.status !== 'Sold' && (
                <button
                  style={{ marginRight: '8px' }}
                  onClick={() => onUpdateStatus(item.id, 'Sold')}
                >
                  Mark as Sold
                </button>
              )}
              <button
                className="danger"
                onClick={() => onRemoveListing(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
