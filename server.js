require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const SECRET_KEY = process.env.SECRET_KEY;
const PROCESSING_CHANNEL_ID = process.env.PROCESSING_CHANNEL_ID;

// Shared error messages
const errorMessages = {
  invalid_card_number: 'Invalid card number.',
  card_number_not_accepted: 'Card type not accepted.',
  card_expired: 'Card expired. Use another card.',
  card_declined: 'Card declined. Contact your bank.',
  insufficient_funds: 'Insufficient funds.',
  processing_error: 'Processing error. Try again later.',
  authentication_failed: 'Payment authentication failed.',
  default: 'Payment failed. Try again.'
};

// Serve index.html
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// Process payment
app.post('/create-payment', async (req, res) => {
  try {
    const { token, amount, currency, cardholder } = req.body;

    const response = await fetch('https://api.sandbox.checkout.com/payments', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: { type: 'token', token },
        amount,
        currency,
        processing_channel_id: PROCESSING_CHANNEL_ID,
        '3ds': { enabled: true },
        success_url: 'http://localhost:3000/success.html',
        failure_url: 'http://localhost:3000/failure.html',
        customer: { name: cardholder },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorCode = data.error_codes?.[0] || 'default';
      return res.json({ error: errorMessages[errorCode] || errorMessages.default });
    }

    if (data.status === 'Pending' && data._links?.redirect) {
      return res.json({ redirect_url: data._links.redirect.href });
    }

    res.json(data);
  } catch (error) {
    console.error('Payment error:', error);
    res.json({ error: errorMessages.default });
  }
});

// Server running
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));