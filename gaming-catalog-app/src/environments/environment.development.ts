// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

export const environment = {

    firebaseConfig: {
        apiKey: "AIzaSyAkKkvp07VN3fot458U6aQ9VG8Oc8QhNgY",
        authDomain: "gamingcatalog-1bacf.firebaseapp.com",
        projectId: "gamingcatalog-1bacf",
        storageBucket: "gamingcatalog-1bacf.appspot.com",
        messagingSenderId: "549559305993",
        appId: "1:549559305993:web:7eb3b69a8f9bce58b775d8"
    }
};

export const app = initializeApp(environment.firebaseConfig);