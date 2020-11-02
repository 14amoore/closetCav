import firebase from 'firebase/app';
import { FireBaseConfig } from './firebaseConfig';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = FireBaseConfig;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
