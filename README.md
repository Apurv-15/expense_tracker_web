# Expense Tracker Web Application

A modern, responsive expense tracking web application built with React and Firebase. Manage your personal finances, track expenses, and visualize your spending patterns with an intuitive user interface.

## ✨ Features

- 🔐 User authentication (Sign up/Login)
- 💰 Add, edit, and delete expenses
- 📊 Visualize expenses with interactive charts
- 📱 Fully responsive design
- 🔄 Real-time data synchronization
- 📂 Categorized expenses
- 📅 Filter expenses by date
- 📈 Monthly/Yearly expense reports

## 🚀 Technologies Used

- **Frontend**: React.js
- **State Management**: React Context API
- **Styling**: CSS Modules
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Animation**: GSAP (GreenSock Animation Platform)
- **Build Tool**: Vite

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/expense-tracker-web.git
   cd expense-tracker-web/expense
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Create a `.env` file in the root directory and add your Firebase config:
     ```
     VITE_FIREBASE_API_KEY=your-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     VITE_FIREBASE_APP_ID=your-app-id
     ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   The application should be running at [http://localhost:5173](http://localhost:5173)

## 📂 Project Structure

```
src/
├── components/    # Reusable UI components
├── context/      # React context providers
├── firebase/     # Firebase configuration and utilities
├── gsap/         # Animation configurations
├── hooks/        # Custom React hooks
├── pages/        # Page components
├── styles/       # Global styles and themes
└── utils/        # Utility functions
```

## 🧪 Testing

Run the test suite with:
```bash
npm test
```

## 📦 Build for Production

```bash
npm run build
```

This will create an optimized production build in the `dist` directory.

## 🌐 Deployment

The app is ready to be deployed to Firebase Hosting:

1. Install Firebase CLI if you haven't already:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase Hosting:
   ```bash
   firebase init
   ```

4. Deploy to Firebase:
   ```bash
   npm run build
   firebase deploy
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [GSAP](https://greensock.com/gsap/)
- [Vite](https://vitejs.dev/)

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - your.email@example.com

Project Link: [https://github.com/your-username/expense-tracker-web](https://github.com/your-username/expense-tracker-web)
