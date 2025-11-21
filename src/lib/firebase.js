import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics"; // Importa isSupported para evitar erros em ambientes sem suporte

// Configuração do Firebase para o BidFlow CRM (Suas chaves reais)
const firebaseConfig = {
  apiKey: "AIzaSyAxvQHPAyYQSMk1Bq4AE1J5sCOdJHtmONk",
  authDomain: "bidflow-crm.firebaseapp.com",
  projectId: "bidflow-crm",
  storageBucket: "bidflow-crm.firebasestorage.app",
  messagingSenderId: "157893988488",
  appId: "1:157893988488:web:e0f60479353964651acf3d",
  measurementId: "G-NBDMZ1M08L",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços
export const auth = getAuth(app);
export const db = getFirestore(app);

// Inicialização condicional do Analytics (previne erros em ambientes SSR ou sem cookies)
export let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
    console.log("Firebase Analytics inicializado.");
  }
});
