# Campus Marketplace

A simple MERN stack web app prototype for verified college students to buy and sell campus items.

---

## Project Structure

```
campus-marketplace/
├── client/                     # React Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx               # Header & tab navigation
│   │   │   ├── StudentVerification.jsx  # UC-01: Verify a Student Account
│   │   │   ├── PublishListing.jsx       # UC-02: Publish a Listing
│   │   │   ├── SearchBrowseListings.jsx # UC-03: Search & Inspect Listings
│   │   │   ├── MessagingView.jsx        # UC-04: Message a Seller
│   │   │   └── ManageListings.jsx       # UC-05: Mark Sold or Remove a Listing
│   │   ├── App.jsx                      # Main app state
│   │   ├── index.css                    # Simple CSS styling
│   │   └── main.jsx                     # Entry point
│   ├── index.html
│   └── package.json
├── server/                     # Express.js Backend
│   ├── server.js               # Express server stubs
│   └── package.json
└── README.md
```

---

## 5 Critical Use Cases Covered

1. **UC-01: Verify a Student Account** (`StudentVerification.jsx`)
   - Simple registration form with `.edu` check and 4-digit verification code (`1234`).
2. **UC-02: Publish a Listing** (`PublishListing.jsx`)
   - Simple form (title, price, category, pickup spot, description) to post a new listing.
3. **UC-03: Search and Inspect Listings** (`SearchBrowseListings.jsx`)
   - Keyword search and category filter. Clicking "Inspect Details" expands description and seller contact info.
4. **UC-04: Message a Seller** (`MessagingView.jsx`)
   - Chat box to type and send messages to sellers regarding items.
5. **UC-05: Mark Sold or Remove a Listing** (`ManageListings.jsx`)
   - Shows user's listings with "Mark as Sold" and "Remove" buttons.

---

## How to Run

1. **Frontend**:
   ```bash
   cd client
   npm run dev
   ```
   Open `http://localhost:5173`.

2. **Backend**:
   ```bash
   cd server
   node server.js
   ```
   Runs on `http://localhost:5000`.
