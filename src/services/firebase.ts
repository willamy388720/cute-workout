import { env } from "@env/index";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  projectId: env.PROJECT_ID,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.API_ID,
  databaseURL:
    env.WEB_ENV === "dev"
      ? env.DATABASE_URL_DEVELOPMENT
      : env.DATABASE_URL_PRODUCTION,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const database = getDatabase(app);

export { database, auth, googleProvider };
