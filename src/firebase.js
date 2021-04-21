import firebase from 'firebase/app'
import 'firebase/storage';
import 'firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyDmDkiC0R2busBx7093ea2QMouUauV11G8",
    authDomain: "formeas.firebaseapp.com",
    projectId: "formeas",
    storageBucket: "formeas.appspot.com",
    messagingSenderId: "375147990895",
    appId: "1:375147990895:web:4d46bcbaf433bace4a629a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

export {projectFirestore,projectStorage,timeStamp};