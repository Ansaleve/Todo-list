import React, { useState } from "react";
import { Button, Space } from 'antd';

const ChangeColors = ({ vari, setVari, selectBg, setSelectBg, selectTaulukkoBg, setSelectTaulukkoBg }) => {
  const [taustaBg, setTaustaBg] = useState(selectBg);
  const [taulukkoBg, setTaulukkoBg] = useState(selectTaulukkoBg);

  const handleVariPeruutusClick = () => {
    setVari(false);
  };

  const handleVariTallenusClick = () => {
    setSelectBg(taustaBg);
    setSelectTaulukkoBg(taulukkoBg);
    setVari(false);
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