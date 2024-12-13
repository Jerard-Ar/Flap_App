// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Import Firestore for database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBg7lmtsiU68S4npsRWdOfiz8OUMMvl5kU",
  authDomain: "flap-6d53e-default-rtdb.firebaseio.com",
  projectId: "flap-6d53e",
  storageBucket: "flap-6d53e.firebasestorage.app",
  messagingSenderId: "330608623658",
  appId: "1:330608623658:web:67f2b86feecefe13f28353",
  measurementId: "G-KYLRSXFV5W",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app); // Initialize Firestore Database

// Export instances for use throughout your app
export { analytics, auth, db };
export default app;
