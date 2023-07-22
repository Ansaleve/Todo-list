import React, { useState } from "react";
import { Button, Space } from 'antd';

const ChangeColors = ({ vari, setVari, setTaulukonBg, setTaustanBg, handleVariTallenus, handleVariPeruutus }) => {
  const [taustaBg, setTaustaBg] = useState('');
  const [taulukkoBg, setTaulukkoBg] = useState('');

  const handleVariPeruutusClick = () => {
    setVari(false);
    handleVariPeruutus();
  };

  const handleVariTallenusClick = () => {
    setTaustanBg(taustaBg);
    setTaulukonBg(taulukkoBg);
    setVari(false);
    handleVariTallenus();
  };

  return vari ? (
    <div className="color-input-container">
      <div>
        <h3 className='my-2'>Taustanväri</h3>
        <input
          className="cool-color-input"
          type="color"
          value={taustaBg}
          onChange={(e) => {
            setTaustaBg(e.target.value);
          }}
        />
      </div>
      <div>
        <h3 className='my-2'>Taulukonväri</h3>
        <input
          className="cool-color-input"
          type="color"
          value={taulukkoBg}
          onChange={(e) => {
            setTaulukkoBg(e.target.value);
          }}
        />
      </div>
      <Space className="site-button-ghost-wrapper" wrap>
        <Button type='primary' ghost onClick={handleVariTallenusClick}>Tallenna</Button>
        <Button type='primary' ghost onClick={handleVariPeruutusClick}>Peruuta</Button>
      </Space>
    </div>
  ) : null;
}

export default ChangeColors;