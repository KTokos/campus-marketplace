export default function Navbar({ activeTab, setActiveTab, currentUser, onSignOut }) {
  return (
    <header>
      <h1>Campus Marketplace</h1>
      <nav>
        <button
          className={activeTab === 'verify' ? 'active' : ''}
          onClick={() => setActiveTab('verify')}
        >
          Verify Account (UC-01)
        </button>
        <button
          className={activeTab === 'publish' ? 'active' : ''}
          onClick={() => setActiveTab('publish')}
        >
          Post Listing (UC-02)
        </button>
        <button
          className={activeTab === 'search' ? 'active' : ''}
          onClick={() => setActiveTab('search')}
        >
          Search Listings (UC-03)
        </button>
        <button
          className={activeTab === 'messages' ? 'active' : ''}
          onClick={() => setActiveTab('messages')}
        >
          Messages (UC-04)
        </button>
        <button
          className={activeTab === 'my-listings' ? 'active' : ''}
          onClick={() => setActiveTab('my-listings')}
        >
          My Listings (UC-05)
        </button>
      </nav>

      <div className="user-status">
        {currentUser ? (
          <span>
            Logged in as: <strong>{currentUser.email}</strong>
            {currentUser.isVerified ? (
              <span className="tag tag-verified">Verified</span>
            ) : (
              <span className="tag">Unverified</span>
            )}{' '}
            <button style={{ padding: '2px 6px', fontSize: '11px', marginLeft: '6px' }} onClick={onSignOut}>
              Sign out
            </button>
          </span>
        ) : (
          <span>Not signed in (Go to Verify Account to create one)</span>
        )}
      </div>
    </header>
  );
}
