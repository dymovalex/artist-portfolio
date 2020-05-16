import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

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