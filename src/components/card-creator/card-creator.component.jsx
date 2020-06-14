import React, { useState, useEffect, useContext } from 'react';
import { Picker } from 'emoji-mart';

import { CardsContext } from '../../providers/cards.provider';
import { CardCreatorContext } from '../../providers/card-creator.provider';
import { AppContext } from '../../providers/app.provider';

import {
  uploadImageToFirebaseStorage,
  createNewImageInFirestore,
  updateImageInFirestore,
  getImagesFromFirestore
} from '../../firebase/firebase.utils';

import './card-creator.styles.scss';
import 'emoji-mart/css/emoji-mart.css';

const CardCreator = () => {
  const [imageToUpload, setImageToUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [orientation, setOrientation] = useState('vertical');
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [pickerVisibility, setPickerVisibility] = useState(false);

  const { setCards, currentCard, setCurrentCard } = useContext(CardsContext);
  const { cardCreatorVisibility, setCardCreatorVisibility } = useContext(CardCreatorContext);
  const { setOverflowHidden } = useContext(AppContext);

  useEffect(() => {
    if (imageUrl) {
      createNewImageInFirestore({ imageUrl, name, description, orientation, imageToUpload });
      setCardCreatorVisibility(false);
      setOverflowHidden(false);
    }
  }, [imageUrl]);

  useEffect(() => {
    if (currentCard) {
      setName(currentCard.name);
      setDescription(currentCard.description);
      setOrientation(currentCard.orientation);
    }
  }, [currentCard]);

  useEffect(() => {
    if(chosenEmoji) {
      setDescription(description + chosenEmoji.native);
    }
  }, [chosenEmoji])

  const handleFileSelect = () => {
    const selectedFile = document.getElementById('selected-file').files[0];
    setImageToUpload(selectedFile);
  }

  const handleClick = async () => {
    const image = await uploadImageToFirebaseStorage(imageToUpload);
    setImageUrl(image);
    getImagesFromFirestore()
      .then(images => {
        setCards(images);
      });
  }

  const resetState = () => {
    setCardCreatorVisibility(false);
    setOverflowHidden(false);
    setCurrentCard(null);
    setName('');
    setDescription('');
    setOrientation('vertical');
    setPickerVisibility(false);
  }

  const onEmojiClick = (emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  return (
    <div className={`card-creator ${cardCreatorVisibility ? 'visible' : ''}`}>
      {
        pickerVisibility ?
          <Picker
            onClick={onEmojiClick}
            title=''
            emoji=''
            perLine={8}
            style={
              currentCard ? {top: '350px'} : {top: '320px'}
            }/> : null
      }
      <div className='inner'>
        <div
          className='inner__close-button'
          onClick={resetState}>
          <i className="fas fa-times" ></i>
        </div>
        <div className='inner__name'>
          <label>Name</label>
          <input type='text' value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className='inner__description'>
          <div>
            <label>Description</label>
            <div onClick={() => setPickerVisibility(!pickerVisibility)}>
              <i className="far fa-smile"></i>
            </div>
          </div>
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className='inner__orientation'>
          <label>Orientation</label>
          <select name="select-orientation" value={orientation} onChange={e => setOrientation(e.target.value)}>
            <option value="vertical">Vertical</option>
            <option value="horizontal">Horizontal</option>
          </select>
        </div>
        {
          currentCard ?
            <button
              onClick={
                async () => {
                  await updateImageInFirestore(currentCard.id, name, description, orientation);
                  getImagesFromFirestore()
                    .then(images => {
                      setCards(images);
                    });
                  resetState();
                }
              }
            >
              <i className="fas fa-file-upload"></i>Save changes</button> :
            <React.Fragment>
              <div className='inner__selected-file'>
                <label htmlFor="selected-file">
                  {
                    imageToUpload ?
                      <i className="far fa-check-square"></i> :
                      null
                  }
                  Choose a file
                </label>
                <input id='selected-file' type='file' accept=".jpg, .jpeg, .png" onChange={handleFileSelect} />
              </div>
              <button onClick={handleClick}><i className="fas fa-cloud-upload-alt"></i>Upload an image</button>
            </React.Fragment>
        }
      </div>
    </div>
  );
};

export default CardCreator;