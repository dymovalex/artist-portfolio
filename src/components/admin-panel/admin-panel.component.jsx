import React, { useEffect, useContext } from 'react';

import { CardsContext } from '../../providers/cards.provider';
import { CardCreatorContext } from '../../providers/card-creator.provider';

import { getImagesFromFirestore } from '../../firebase/firebase.utils';

import './admin-panel.styles.scss';

const AdminPanel = () => {
  const showImage = () => {
    const selectedFile = document.getElementById('selected-file').files[0];
    console.log(selectedFile);
  }

  const { cards, setCards } = useContext(CardsContext);
  const { setCardCreatorVisibility } = useContext(CardCreatorContext);

  useEffect(() => {
    getImagesFromFirestore()
      .then(images => setCards(images));
  }, []);

  return (
    <div className='admin-panel'>
      <div className='admin-panel__header'>
        <h1>Admin dashboard</h1>
        <button onClick={() => setCardCreatorVisibility(true)}>Add a new artwork</button>
      </div>
      {
        cards.map(card => (
          <div className='admin-card' key={card.id}>
            <div className='admin-card__img'>
              <img src={card.imageUrl} />
            </div>
            <div className='admin-card__content'>
              <h2>{card.name}<i className="fas fa-pen-square"></i></h2>
              <p>{card.description}</p>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default AdminPanel;