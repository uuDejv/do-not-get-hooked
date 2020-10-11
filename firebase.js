import * as firebase from "firebase";
import "firebase/database";
import { firebaseConfig } from "./firebasekey";

firebase.initializeApp(firebaseConfig);

export default firebase.database();
