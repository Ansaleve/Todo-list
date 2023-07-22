import './App.css';
import { Button, Space } from 'antd';
import { useState } from "react";

import AddNewItem from './components/addNewItem';
import ChangeColors from './components/changeColors';
import DoneTable from './components/doneTable';

export default function App() {
  const [showInfo, setShowInfo] = useState(false);
  const [addButton, setAddButton] = useState(0)
  const [colorButton, setColorButton] = useState(0)
  const [inputText, setInputText] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showDateEdit, setShowDateEdit] = useState(false)
  const [Data, setData] = useState([]);
  const [Done, setDone] = useState([]);
  const [vari, setVari] = useState(false);
  const [edit, setEdit] = useState([]);
  const [dateEdit, setDateEdit] = useState('')
  const [backUp, setBackUp] = useState([]);
  const [doneBackUp, setDoneBackUp] = useState([]);
  const [sortButton, setSortButton] = useState(false)
  const [doneSortButton, setDoneSortButton] = useState(false)
  const [inputDue, setInputDue] = useState('')

  const [taustaBg, setTaustaBg] = useState('')
  const [taulukkoBg, setTaulukkoBg] = useState('')
  const [selectBg, setTaustanBg] = useState('#FFFFFF')
  const [selectTaulukkoBg, setTaulukonBg] = useState('#FFFFFF')



  const handleSave = (newItem) => {
    setData([...Data, newItem]);
    setBackUp([...Data, newItem]);
  };

  const infoCancel = () => {
    setShowInfo(false);
    setInputText('')
    setAddButton(0)
  }


  const handleSort = () => {
    const sorted = [...Data].sort((a, b) => {
      const name1 = a.Name.toLowerCase();
      const name2 = b.Name.toLowerCase();
      if (name1 < name2) {
        return -1;
      }
      if (name1 > name2) {
        return 1;
      }
      return 0;
    });
  
    setData(sorted);
  };

const handleNewItem = () => {
  if (addButton === 0) {
    setShowInfo(true);
    setVari(false);
    setAddButton(1);
    setColorButton(0);
  }
  if (addButton === 1) {
    setShowInfo(false);
    setAddButton(0);
  }
};


  const handlevari = () => {
    if (colorButton === 0) {
      setVari(true);
      setShowInfo(false);
      setColorButton(1);
      setAddButton(0);
    }
    if (colorButton === 1) {
      setVari(false)
      setColorButton(0)
    }
  };


  const handleBox = (todo) => {
    const updatedDone = [...Done, { ...todo, State: 'Tehty' }];
    const updatedData = Data.filter((siirrettävä) => siirrettävä.Id !== todo.Id);
    setDone(updatedDone);
    setData(updatedData);
    setBackUp(updatedData);
    setDoneBackUp(updatedDone);
  };
  

  const handlemuokkaus = (Name, Id) => {
    setShowEdit(true);
    setInputText(Name);
    setEdit({Id})
  };

  const handleDateMuokkaus = (Due, Id) => {
    setShowDateEdit(true);
    setInputDue(Due);
    setDateEdit({ Id });
  };

  const handleDateMuokkausTallennus = () => {
    setShowDateEdit(false);
    const updateDateData = Data.map((dateMuokkaus) => {
      if (dateMuokkaus.Id === dateEdit.Id) {
        return { ...dateMuokkaus, Due: inputDue };
      }
      return dateMuokkaus;
    });

    const updatedDueDate = new Date(inputDue);
    const thisDate = new Date();

    if (updatedDueDate < thisDate) {
      alert('Virheellinen päivämäärä');
    } else {
      setData(updateDateData);
      setBackUp(updateDateData);
    }
  };

  const handlemuokkaustallennus = () => {
    setShowEdit(false);
    const updatedData = Data.map((muokkaus) => {
      if (muokkaus.Id === edit.Id) {
        return { ...muokkaus, Name: inputText };
      }
      return muokkaus;
    });
    setData(updatedData);
    setBackUp(updatedData);
  };


  const handleDelete = (Id) => {
    const updatedData = Data.filter((poistettava) => poistettava.Id !== Id);
    const updatedBackUp = backUp.filter((poistettava) => poistettava.Id !== Id);
    setData(updatedData);
    setBackUp(updatedBackUp);
  };

  const handleDonesort = () => {
    const Donesorted = [...Done].sort((a, b) => {
    const aname = a.Name.toLowerCase();
    const bname = b.Name.toLowerCase();
    if (aname < bname) {
      return -1;
    }
    if (aname > bname) {
      return 1;
    }
    return 0;
    });
    setDone(Donesorted)
  };

  const handleDefault = () => {
    setData(backUp);
  }
  const handleDefaultTehdyt = () => {
    setDone(doneBackUp);
  }
  const handleButton = () => {
    if (sortButton === false) {
      handleSort();
      setSortButton(true);
    }
    else {
      handleDefault();
      setSortButton(false);
    }
  }


  const handleTehdytButton = () => {
    if (doneSortButton === false) {
      handleDonesort();
      setDoneSortButton(true);
    }
    else {
      handleDefaultTehdyt();
      setDoneSortButton(false);
    }
  }

  const handlevaritallenus = () => {
    setTaustanBg(taustaBg);
    setTaulukonBg(taulukkoBg);
    setVari(false);
    setColorButton(0);
  };

  const handleVariPeruutus = () => {
    setVari(false);
    setColorButton(0);
  };


  document.title = "To-do list";

  return (
    <html>
    <head>
      <title>Your Website Name</title>
    </head>
    <body style={{ backgroundColor: selectBg }}>
    <div className='app-container'>
      <h1 class='text-[60px] italic font-serif mb-[10px]'>Köyhän miehen to do -lista</h1>
      <div className="color-input-container">
        <div>
          <Space className="site-button-ghost-wrapper" wrap>
          <Button type='primary' ghost onClick={handleNewItem}>Lisää</Button>
          </Space>
        </div>
        <div>
          <Space className="site-button-ghost-wrapper" wrap>
          <Button type='primary' ghost onClick={handlevari}>Värit</Button>
          </Space>
        </div>
      </div>
    <ChangeColors
      vari={vari}
      setVari={setVari}
      setTaulukkoBg={setTaulukkoBg}
      taulukkoBg={taulukkoBg}
      setTaustanBg={setTaustanBg}
      handleVariTallenus={handlevaritallenus}
      handleVariPeruutus={handleVariPeruutus}
    />
    <AddNewItem
      showInfo={showInfo}
      setShowInfo={setShowInfo}
      addButton={addButton}
      infoCancel={infoCancel}
      onAddItem={handleSave}
      setAddButton={setAddButton}
    />
      <h2 class='text-[40px] font-seriff italic mt-[10px]'>Tekemättä</h2>
      <DoneTable
        Data={Data}
        selectTaulukkoBg={selectTaulukkoBg}
        handleButton={handleButton}
        handleBox={handleBox}
        handleDateMuokkaus={handleDateMuokkaus}
        handleDelete={handleDelete}
        handlemuokkaus={handlemuokkaus}
      />

      {showEdit && (
        <div className='cool-input'>
          <input
            type="text"
            placeholder="Muokkaus"
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
          />
          <Button type='primary' ghost onClick={handlemuokkaustallennus}>Tallenna</Button>
          <Button type='primary' ghost onClick={()=>setEdit(false)}>Peruuta</Button>
        </div>
      )}
      {showDateEdit && (
        <div className='cool-input'>
          <input
            class='mb-[5px]'
            type='date'
            value={inputDue}
            onChange={(e) => setInputDue(e.target.value)}
          />
          <Button type='primary' ghost onClick={handleDateMuokkausTallennus}>Tallenna</Button>
          <button>Peruuta</button>
        </div>
      )}
      <h2 class='text-[40px] font-mono'>Tehdyt</h2>
      <table className='table' style={{ backgroundColor: selectTaulukkoBg }}>
        <thead>
          <tr>
            <th><Button type='primary' ghost onClick={handleTehdytButton}>Järjestä</Button></th>
            <th>To do</th>
            <th>Vaihe</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {Done.map((valmis) => {
            return (
              <tr key={valmis.Id}>
                <td></td>
                <td class='font-mono line-through'>{valmis.Name}</td>
                <td>{valmis.State}</td>
                <td>{valmis.Due}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </body>
  </html>
  );
}