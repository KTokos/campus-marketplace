import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import StudentVerification from './components/StudentVerification';
import PublishListing from './components/PublishListing';
import SearchBrowseListings from './components/SearchBrowseListings';
import MessagingView from './components/MessagingView';
import ManageListings from './components/ManageListings';

const API_URL = 'http://localhost:5001';

export default function App() {
  // ----- State variables / setters -----

  const [currentUser, setCurrentUser] = useState({
    name: 'Student User',
    email: 'student@university.edu',
    isVerified: true
  });

  const [listings, setListings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageError, setMessageError] = useState('');
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
    setMessageError('');
    setActiveTab('messages');
  }

  useEffect(() => {
    if (activeTab !== 'messages' || !activeItem) return;

    const conversationId = String(activeItem.id);
    let cancelled = false;

    async function loadMessages() {
      try {
        const response = await fetch(
          `${API_URL}/api/messages/${encodeURIComponent(conversationId)}`
        );

        if (!response.ok) {
          throw new Error('Could not load messages.')
        }

        const data = await response.json();

        if (!cancelled) {
          setMessages(data.map((message) => ({
            ...message,
            sender: message.senderId,
            receiver: message.receiverId,
            itemTitle: activeItem.title
          })));

          setMessageError('');
        }
      } catch (error) {
        if (!cancelled) {
            setMessageError(error.message);
          }
        }
      }

      loadMessages();

      return () => {
        cancelled = true;
      };
    }, [activeTab, activeItem]);


  async function handleSendMessage(msg) {
    if (!activeItem || !currentUser?.isVerified) {
      setMessageError('Select a listing and sign in first.')
      return false;
    }

    try {
      const response = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          conversationId: String(activeItem.id),
          senderId: currentUser.email,
          receiverId: activeItem.sellerEmail,
          text: msg.text
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message.');
      }

      setMessages((previous) => [
        ...previous,
        {
          ...result.data,
          sender: result.data.senderId,
          receiver: result.data.receiverId,
          itemTitle: activeItem.title
        }
      ]);

      setMessageError('');
      return true;
    } catch (error) {
      setMessageError(error.message);
      return false;
    }
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
          messageError={messageError}
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
