import { useState } from 'react';

export default function MessagingView({ currentUser, messages, onSendMessage, activeItem, onGoToVerify, messageError }) {
  // ----- State variables / setters -----

  const [text, setText] = useState('');

  // Returns log in message if current user is not logged in or verified
  if (!currentUser || !currentUser.isVerified) {
    return (
      <div className="card">
        <h2>UC-04: Message a Seller</h2>
        <div className="message-box error">
          You must be logged in with a verified student account to message sellers.
        </div>
        <button onClick={onGoToVerify}>Go to Account Verification</button>
      </div>
    );
  }

  // handleSend(e):
  //    Passes the message to onSendMessage then resets the input box
  async function handleSend(e) {
    e.preventDefault();

    if (!text.trim()) return;

    const sent = await onSendMessage({
      text: text.trim()
    });

    if (sent) {
      setText('');
    }
  }

  {messageError && (
    <div className="message-box error" role="alert">
      {messageError}
    </div>
  )}

  return (
    <div className="card">
      <h2>UC-04: Message a Seller</h2>

      {activeItem ? (
        <p>Chat regarding: <strong>{activeItem.title}</strong> (Seller: {activeItem.sellerEmail})</p>
      ) : (
        <p style={{ color: '#666' }}>Go to 'Search Listings' and click 'Message Seller' on any item, or chat below:</p>
      )}

      <div className="chat-history">
        {messages.length === 0 ? (
          <p style={{ color: '#888', fontStyle: 'italic' }}>No messages yet.</p>
        ) : (
          messages.map((m) => {
            const isMe = m.sender === currentUser.email;
            return (
              <div
                key={m.id}
                className={`chat-bubble ${isMe ? 'chat-me' : 'chat-other'}`}
              >
                <div><small><strong>{isMe ? 'You' : m.sender}</strong> ({m.itemTitle}):</small></div>
                <div>{m.text}</div>
              </div>
            );
          })
        )}
      </div>

      {messageError && (
    <div className="message-box error" role="alert">
      {messageError}
    </div>
    )}

    <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="Type message (e.g. Is this still available?)"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
