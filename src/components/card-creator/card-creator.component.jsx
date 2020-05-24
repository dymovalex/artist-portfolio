import React, { useState, useEffect, useContext } from 'react';

import { CardsContext } from '../../providers/cards.provider';
import { CardCreatorContext } from '../../providers/card-creator.provider';

import { uploadImageToFirebaseStorage, createNewImageInFirestore } from '../../firebase/firebase.utils';

import './card-creator.styles.scss';

const CardCreator = () => {
  const [imageToUpload, setImageToUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [orientation, setOrientation] = useState('vertical');

  const { currentCard, setCurrentCard } = useContext(CardsContext);
  const { cardCreatorVisibility, setCardCreatorVisibility } = useContext(CardCreatorContext);

  useEffect(() => {
    if (imageUrl) {
      createNewImageInFirestore({ imageUrl, name, description, orientation, imageToUpload });
      setCardCreatorVisibility(false);
    }
  }, [imageUrl]);

  const handleFileSelect = () => {
    const selectedFile = document.getElementById('selected-file').files[0];
    setImageToUpload(selectedFile);
  }

  const handleClick = async () => {
    const image = await uploadImageToFirebaseStorage(imageToUpload);
    setImageUrl(image);
  }

  return (
    <div className={`card-creator ${cardCreatorVisibility ? 'visible' : ''}`}>
      <div className='inner'>
        <div
          className='inner__close-button'
          onClick={
            () => {
              setCardCreatorVisibility(false);
              setCurrentCard(null);
            }}>
          <i className="fas fa-times" ></i>
        </div>
        <div className='inner__name'>
          <label>Name</label>
          <input defaultValue={currentCard ? currentCard.name : ''} type='text' onChange={e => setName(e.target.value)} />
        </div>
        <div className='inner__description'>
          <label>Description</label>
          <textarea defaultValue={currentCard ? currentCard.description : ''} onChange={e => setDescription(e.target.value)} />
        </div>
        <div className='inner__orientation'>
          <label>Orientation</label>
          <select name="select-orientation" onChange={e => setOrientation(e.target.value)}>
            <option value="vertical">Vertical</option>
            <option selected={currentCard && currentCard.orientation === 'horizontal' ? true : false} value="horizontal">Horizontal</option>
          </select>
        </div>
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
      </div>
    </div>
  );
};

export default CardCreator;