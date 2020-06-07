import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

let firebaseConfig;

if(process.env.NODE_ENV !== 'production') {
  firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  }
} else {
  firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
  }
}

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();

export const getImagesFromFirestore = async () => {
  let images = [];

  const imagesCollectionRef = firestore.collection('images');
  const imagesCollection = await imagesCollectionRef.get();

  imagesCollection.docs.map(image => {
    const data = {
      id: image.id,
      ...image.data(),
    }
    images.push(data);
  });

  return images;
};

export const uploadImageToFirebaseStorage = async (image) => {
  const storageRef = storage.ref();
  const newImageRef = storageRef.child(`images/${image.name}`);
  await newImageRef.put(image);

  const imageRef = storage.ref(`images/${image.name}`);
  const imageUrl = await imageRef.getDownloadURL();
  return imageUrl;
};

export const deleteImageFromFirestore = async (image) => {
  const storageRef = storage.ref();
  const imageToRemoveRef = storageRef.child(`images/${image.fileName}`);
  await imageToRemoveRef.delete();

  try {
    await firestore
      .collection('images')
      .doc(image.id)
      .delete();
  } catch (error) {
    console.log(error);
  }
}

export const updateImageInFirestore = async (id, name, description, orientation) => {
  try {
    await firestore
      .collection('images')
      .doc(id)
      .update({
        name,
        description,
        orientation
      });
  } catch (error) {
    console.log(error);
  }
}

export const createNewImageInFirestore = async ({ imageUrl, name, description, orientation, imageToUpload }) => {
  try {
    await firestore
      .collection('images')
      .add({
        imageUrl,
        name,
        description,
        orientation,
        fileName: imageToUpload.name
      });
  } catch (error) {
    console.log(error);
  }
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};