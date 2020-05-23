import React, { useState, useEffect, useContext } from 'react';

import { CardCreatorContext } from '../../providers/card-creator.provider';

import { uploadImageToFirebaseStorage, createNewImageInFirestore } from '../../firebase/firebase.utils';

import './card-creator.styles.scss';

const CardCreator = () => {
  const [imageToUpload, setImageToUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [orientation, setOrientation] = useState('vertical');

  const { cardCreatorVisibility, setCardCreatorVisibility } = useContext(CardCreatorContext);

  useEffect(() => {
    if (imageUrl) {
      createNewImageInFirestore({ imageUrl, name, description, orientation });
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
        <div className='inner__close-button' onClick={() => setCardCreatorVisibility(false)}>
          <i className="fas fa-times" ></i>
        </div>
        <div className='inner__name'>
          <label>Name</label>
          <input type='text' onChange={e => setName(e.target.value)} />
        </div>
        <div className='inner__description'>
          <label>Description</label>
          <textarea onChange={e => setDescription(e.target.value)} />
        </div>
        <div className='inner__orientation'>
          <label>Orientation</label>
          <select name="select-orientation" onChange={e => setOrientation(e.target.value)}>
            <option value="vertical">Vertical</option>
            <option value="horizontal">Horizontal</option>
          </select>
        </div>
        <div className='inner__selected-file'>
          <input id='selected-file' type='file' accept=".jpg, .jpeg, .png" onChange={handleFileSelect} />
        </div>
        <button onClick={handleClick}>Upload an image</button>
      </div>
    </div>
  );
};

export default CardCreator;