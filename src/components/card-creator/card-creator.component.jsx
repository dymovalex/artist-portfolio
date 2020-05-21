import React, { useContext } from 'react';

import { CardCreatorContext } from '../../providers/card-creator.provider';

import './card-creator.styles.scss';

const CardCreator = () => {
  const { cardCreatorVisibility, setCardCreatorVisibility } = useContext(CardCreatorContext);

  return (
    <div className={`card-creator ${cardCreatorVisibility ? 'visible' : ''}`}>
      <div className='inner'>
        <div className='inner__close-button' onClick={() => setCardCreatorVisibility(false)}>
          <i className="fas fa-times" ></i>
        </div>
        <div className='inner__name'>
          <label>Name</label>
          <input type='text' />
        </div>
        <div className='inner__description'>
          <label>Description</label>
          <textarea />
        </div>
        <div className='inner__orientation'>
          <label>Orientation</label>
          <select name="select-orientation">
            <option value="vertical">Vertical</option>
            <option value="horizontal">Horizontal</option>
          </select>
        </div>
        <div className='inner__selected-file'>
          <input id='selected-file' type='file' />
        </div>

      </div>
    </div>
  );
};

export default CardCreator;