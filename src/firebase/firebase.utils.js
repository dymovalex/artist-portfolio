import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyBht8kSIlrrfIrxiyOGp0rmrWDN3cb-Ddc",
  authDomain: "artist-portfolio.firebaseapp.com",
  databaseURL: "https://artist-portfolio.firebaseio.com",
  projectId: "artist-portfolio",
  storageBucket: "artist-portfolio.appspot.com",
  messagingSenderId: "63171668287",
  appId: "1:63171668287:web:c14138f0da30ef85f4cb8a"
};

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
  console.log('img was deleted from FB');

  try {
    await firestore
      .collection('images')
      .doc(image.id)
      .delete();
    console.log('img was deleted from FS');
  } catch (error) {
    console.log(error);
  }
}

export const updateImageInFirestore = async (id, name, description, orientation) => {
  try {
    console.log({ id, name, description, orientation });
    await firestore
      .collection('images')
      .doc(id)
      .update({
        name,
        description,
        orientation
      });
    console.log('image was updated!')
  } catch (error) {
    console.log(error);
  }
}

export const createNewImageInFirestore = async ({ imageUrl, name, description, orientation, imageToUpload }) => {
  console.log({ imageUrl, name, description, orientation });
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