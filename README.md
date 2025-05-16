# 💳 Checkout.com Integration with Frames – Part 2

A **simple integration project** demonstrating Checkout.com's Frames for secure card payments using **HTML**, **CSS**, **JavaScript**, and **Node.js**.  

🎯 **Purpose**: This project is designed for **testing and learning**, helping developers understand how to integrate **Checkout.com Frames** for secure payment processing.

---

## 🚀 Features

- ✅ **Secure Card Input** with Checkout.com Frames  
- 💳 **Tokenization & Payment Processing** via Checkout.com API  
- 🔒 **3DS Authentication** for secure transactions  
- ⚡ **Minimal & Clean Codebase**  
- 🔓 **Open-Source for Learning**

---

## 📌 How It Works

1️⃣ **Enter Card Details**: Users input card information using Frames  
2️⃣ **Token Generation**: Frames tokenizes the card securely  
3️⃣ **Payment Processing**: Server sends token to Checkout.com API  
4️⃣ **3DS Redirect**: Handles 3D Secure authentication if required  
5️⃣ **Result**: Payment is approved or declined (e.g., insufficient funds)

---

## 🛠️ Installation & Setup

### 🔹 1️⃣ Clone the Repository
```bash
git clone https://github.com/IamHamud/Checkout-Integration-Part-2.git
cd Checkout-Integration-Part-2
npm install
```

### 🔹 2️⃣ Configure Payment Keys

Create a `.env` file in the root directory and add your Checkout.com API keys:
```
SECRET_KEY=your_secret_key_here
PROCESSING_CHANNEL_ID=your_channel_id_here
```

Inside `app.js`, make sure to initialize Frames with your public key:
```javascript
Frames.init('InsertPublicKeyHere');
```

### 🔹 3️⃣ Start the Server
```bash
node server.js
```

Visit the app in your browser:
```
http://localhost:3000
```

---

## 🧩 Expand & Customize Payments

This project is fully customizable! You can:

- 🧾 Add more payment methods (e.g., Apple Pay, Google Pay)  
- 🔐 Enable 3DS configurations for enhanced security  
- 🔄 Integrate webhooks for real-time updates  
- 📚 Refer to [Checkout.com Official Documentation](https://docs.checkout.com/)

---

## ⚠️ Disclaimer

This project is for **educational purposes only**.  
It is **not** an official guide for Checkout.com integration.  
Refer to the Checkout.com documentation for accurate and secure implementation.  
**Use at your own risk.**

---

## 👤 Author

- **LinkedIn**: [Hamud](https://www.linkedin.com/in/iamhamud/)
- **GitHub**: [IamHamud](https://github.com/IamHamud)

