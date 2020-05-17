import React from 'react';

import './admin-panel.styles.scss';

const AdminPanel = () => {
  const showImage = () => {
    const selectedFile = document.getElementById('selected-file').files[0];
    console.log(selectedFile);
  }

  return (
    <div className='admin-panel'>
      <span>Admin Panel</span>
      <div>
        <label>Name</label>
        <input type='text' />
      </div>
      <div>
        <label>Description</label>
        <textarea />
      </div>
      <div>
        <label>Orientation</label>
        <select name="select-orientation">
          <option value="vertical">Vertical</option>
          <option value="horizontal">Horizontal</option>
        </select>
      </div>
      <div>
        <input id='selected-file' type='file' onChange={showImage} />
      </div>
    </div>
  );
};

export default AdminPanel;