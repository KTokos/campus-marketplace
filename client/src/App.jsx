import { useState } from 'react';
import Navbar from './components/Navbar';
import StudentVerification from './components/StudentVerification';
import PublishListing from './components/PublishListing';
import SearchBrowseListings from './components/SearchBrowseListings';
import MessagingView from './components/MessagingView';
import ManageListings from './components/ManageListings';

export default function App() {
  // ----- State variables / setters -----

  const [currentUser, setCurrentUser] = useState({
    name: 'Student User',
    email: 'student@university.edu',
    isVerified: true
  });

  const [listings, setListings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('search');
  const [activeItem, setActiveItem] = useState(null);

  // ----- Methods -----

  // handleVerifySuccess(user):
  //    Updates the current user and changes the tab to pushlish
  function handleVerifySuccess(user) {
    setCurrentUser(user);
    setActiveTab('publish');
  }

  // handleAddListing(newListing):
  //    Adds the new listing to the list of items and changes the tab to search
  function handleAddListing(newListing) {
    setListings([newListing, ...listings]);
    setActiveTab('search');
  }

  // handleUpdateStatus(id, newStatus):
  //    Changes the status of the listing matching the passed in id to the passed in status
  function handleUpdateStatus(id, newStatus) {
    setListings(listings.map((item) => (item.id === id ? { ...item, status: newStatus } : item)));
  }

  // handleRemoveListing(id):
  //    Updates the listings list to exlude the listing matching the passed in id
  function handleRemoveListing(id) {
    setListings(listings.filter((item) => item.id !== id));
  }

  // handleMessageSeller(item):
  //    Updates the active item to the passed in item and sets the tab to messages
  function handleMessageSeller(item) {
    setActiveItem(item);
    setActiveTab('messages');
  }

  // handleSendMessage(msg):
  //    Appends the passed in message to the messages list
  //    Probably not good in the long term
  function handleSendMessage(msg) {
    setMessages([...messages, msg]);
  }

  // ----- Main page layout -----

  return (
    <div className="container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onSignOut={() => setCurrentUser(null)}
      />

      {activeTab === 'verify' && (
        <StudentVerification
          currentUser={currentUser}
          onVerifySuccess={handleVerifySuccess}
        />
      )}

      {activeTab === 'publish' && (
        <PublishListing
          currentUser={currentUser}
          onAddListing={handleAddListing}
          onGoToVerify={() => setActiveTab('verify')}
        />
      )}

      {activeTab === 'search' && (
        <SearchBrowseListings
          listings={listings}
          currentUser={currentUser}
          onMessageSeller={handleMessageSeller}
          onGoToVerify={() => setActiveTab('verify')}
        />
      )}

      {activeTab === 'messages' && (
        <MessagingView
          currentUser={currentUser}
          messages={messages}
          activeItem={activeItem}
          onSendMessage={handleSendMessage}
          onGoToVerify={() => setActiveTab('verify')}
        />
      )}

      {activeTab === 'my-listings' && (
        <ManageListings
          currentUser={currentUser}
          listings={listings}
          onUpdateStatus={handleUpdateStatus}
          onRemoveListing={handleRemoveListing}
          onGoToVerify={() => setActiveTab('verify')}
        />
      )}
    </div>
  );
}
