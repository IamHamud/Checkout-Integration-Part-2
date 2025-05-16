// Initialize Frames, ADD YOUR PUBLIC KEYS
Frames.init('');

const form = document.getElementById('payment-form');
const message = document.getElementById('message');
const submitButton = document.getElementById('pay-button');

// Enable/Disable button based on Frames validation
Frames.addEventHandler(Frames.Events.CARD_VALIDATION_CHANGED, (event) => {
  submitButton.disabled = !event.isValid;
});

// Shared error messages for Frames.js and API errors
const errorMessages = {
  invalid_card_number: 'Invalid card number.',
  card_expired: 'Card expired. Use another card.',
  invalid_cvv: 'Invalid CVV.',
  card_declined: 'Card declined. Contact your bank.',
  insufficient_funds: 'Insufficient funds.',
  processing_error: 'Processing error. Try again later.',
  default: 'Payment failed. Check details and try again.'
};

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const cardholder = document.getElementById('cardholder-name').value.trim();
  const amount = document.getElementById('amount').value.trim();
  const currency = document.getElementById('currency').value.trim();

  message.textContent = 'Processing...';

  try {
    // Submit card to get token
    const { token } = await Frames.submitCard();

    // Send token to backend
    const response = await fetch('/create-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        amount: amount * 100, // Convert to minor units
        currency,
        cardholder,
      }),
    });

    const result = await response.json();

    if (response.ok && result.redirect_url) {
      window.location.href = result.redirect_url;
    } else if (response.ok) {
      message.textContent = 'Payment successful!';
    } else {
      message.textContent = result.error || errorMessages.default;
    }
  } catch (err) {
    console.error('Error:', err);
    // Handle Frames.js or network errors
    const errorKey = err.code || 'default'; // Adjust if Frames.js provides specific codes
    message.textContent = errorMessages[errorKey] || errorMessages.default;
  }
});