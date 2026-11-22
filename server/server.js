const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Campus Marketplace Backend' });
});

// UC-01: Verify Student Account route stubs
app.post('/api/auth/register', (req, res) => {
  const { name, email, studentId } = req.body;
  if (!email || !email.endsWith('.edu')) {
    return res.status(400).json({ error: 'Valid university email required' });
  }
  res.status(200).json({ message: 'Verification challenge sent', email });
});

app.post('/api/auth/verify', (req, res) => {
  const { email, code } = req.body;
  if (code !== '123456') {
    return res.status(400).json({ error: 'Invalid or expired verification code' });
  }
  res.status(200).json({ message: 'Account verified successfully', email, verified: true });
});

// UC-02 & UC-03 & UC-05: Listings route stubs
app.get('/api/listings', (req, res) => {
  res.json([]);
});

app.post('/api/listings', (req, res) => {
  const { title, price, category } = req.body;
  if (!title || price === undefined || !category) {
    return res.status(400).json({ error: 'Missing required listing fields' });
  }
  res.status(201).json({ message: 'Listing published successfully', listing: req.body });
});

app.patch('/api/listings/:id/status', (req, res) => {
  const { status } = req.body;
  res.json({ message: `Listing marked as ${status}`, id: req.params.id, status });
});

app.delete('/api/listings/:id', (req, res) => {
  res.json({ message: 'Listing removed successfully', id: req.params.id });
});

// UC-04: message seller
// temporary in-memory message storage for prototype testing
const messages = [];

// retrieve those messages that belongs to a conversation
app.get('/api/messages/:conversationId', (req, res) => {
  const { conversationId } = req.params;

  const conversationMessages = messages.filter(
    (message) => message.conversationId === conversationId
  );

  res.json(conversationMessages);
});

// send new message
app.post('/api/messages', (req, res) => {
  const { conversationId, text, senderId, receiverId } = req.body;

  if (
    typeof conversationId !== 'string' ||
    !conversationId.trim() ||
    typeof text !== 'string' ||
    !text.trim() ||
    typeof senderId !== 'string' ||
    !senderId.trim() ||
    typeof receiverId !== 'string' ||
    !receiverId.trim()
  ) {
    return res.status(400).json({
      error: 'Conversation, sender, receiver, and message text are required.'
    });
  }

  const newMessage = {
    id: String(messages.length + 1),
    conversationId: conversationId.trim(),
    senderId: senderId.trim(),
    receiverId: receiverId.trim(),
    text: text.trim(),
    sentAt: new Date().toISOString()
  };

  messages.push(newMessage);

  res.status(201).json({
    message: 'Message sent successfully',
    data: newMessage
  });
});

app.listen(PORT, () => {
  console.log(`Campus Marketplace server running on http://localhost:${PORT}`);
});
