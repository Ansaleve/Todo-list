import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Button, Space } from 'antd';

const AddNewItem = ({ showInfo, setShowInfo, addButton, handleSave, infoCancel, onAddItem, setAddButton }) => {
  const [inputText, setInputText] = useState("");
  const [inputDue, setInputDue] = useState("");

  const handleSaveClick = () => {
    if (inputText !== '' && inputDue !== '') {
      onAddItem({ Id: uuidv4(), Name: inputText, State: "Tekemättä", Due: inputDue });
      setShowInfo(false);
      setInputText('');
      setAddButton(0)
    } else if (inputText === '') {
      alert('Kirjoita To do:lle nimi!');
      setAddButton(1)
    } else {
      alert('Kerro To do:n DueDate!')
      setAddButton(1)
    }
  };

  return showInfo ? (
    <div className="color-input-container">
      <div className="cool-input">
        <label>Nimi:</label>
        <input
          type="text"
          placeholder="teksti"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <label>DueDate: </label>
        <input
          className="mt-[5px]"
          type="date"
          value={inputDue}
          onChange={(e) => setInputDue(e.target.value)}
        />
        <Space>
        <Button type='primary' ghost onClick={handleSaveClick}>Tallenna</Button>
        <Button type="primary" ghost onClick={infoCancel}>Peruuta</Button>
        </Space>
      </div>
    </div>
  ) : null;
};

export default AddNewItem;