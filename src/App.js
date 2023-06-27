import './App.css';
import { Button, Space } from 'antd';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [showInfo, setShowInfo] = useState(false);
  const [lisääButton, setLisääButton] = useState(0)
  const [väriButton, setVäriButton] = useState(0)
  const [inputtext, setInputText] = useState("");
  const [showMuokkaus, setMuokkaus] = useState(false);
  const [Data, setData] = useState([]);
  const [Tehty, setTehty] = useState([]);
  const [vari, setVari] = useState(false);
  const [edit, setEdit] = useState([]);
  const [backUp, setBackUp] = useState([]);
  const [tehtyBackUp, setTehtyBackUp] = useState([]);
  const [sortButton, setSortButton] = useState(false)
  const [tehdytSortButton, setTehdytSortButton] = useState(false)

  const [taustaBg, setTaustaBg] = useState('')
  const [taulukkoBg, setTaulukkoBg] = useState('')
  const [selectBg, setTaustanBg] = useState('#FFFFFF')
  const [selectTaulukkoBg, setTaulukonBg] = useState('#FFFFFF')

  const handleSave = () => {
    setShowInfo(false);
    if (inputtext !== "") {
      setData([...Data, { Id: uuidv4(), Name: inputtext, State: "Tekemättä" }]);
      setBackUp([...Data, { Id: uuidv4(), Name: inputtext, State: "Tekemättä" }]);
      setInputText('')
      setLisääButton(0);
    }
    else {
      setLisääButton(0)
    }
  };
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

const handleinfo = () => {
  if (lisääButton === 0) {
    setShowInfo(true);
    setVari(false);
    setLisääButton(1);
    setVäriButton(0);
  }
  if (lisääButton === 1) {
    setShowInfo(false);
    setLisääButton(0);
  }
};


  const handlevari = () => {
    if (väriButton === 0) {
      setVari(true);
      setVäriButton(1);
      setLisääButton(0);
    }
    if (väriButton === 1) {
      setVari(false)
      setVäriButton(0)
    }
  };


  const handleBox = (todo) => {
    const updatedTehty = [...Tehty, { ...todo, State: 'Tehty' }];
    const updatedData = Data.filter((siirrettävä) => siirrettävä.Id !== todo.Id);
    setTehty(updatedTehty);
    setData(updatedData);
    setBackUp(updatedData);
    setTehtyBackUp(updatedTehty);
  };
  

  const handlemuokkaus = (todo) => {
    setMuokkaus(true);
    setInputText(todo.Name);
    setEdit(todo);
  };

  const handlemuokkaustallennus = () => {
    setMuokkaus(false);
    const updatedData = Data.map((muokkaus) => {
      if (muokkaus.Id === edit.Id) {
        return { ...muokkaus, Name: inputtext };
      }
      return muokkaus;
    });
    setData(updatedData);
    setBackUp(updatedData);
  };


  const handleDelete = (todo) => {
    const updatedData = Data.filter((poistettava) => poistettava.Id !== todo.Id);
    const updatedBackUp = backUp.filter((poistettava) => poistettava.Id !== todo.Id);
    setData(updatedData);
    setBackUp(updatedBackUp);
  };

  const handletehtysort = () => {
    const tehtysorted = [...Tehty].sort((a, b) => {
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
    setTehty(tehtysorted)
  };

  const handleDefault = () => {
    setData(backUp);
  }
  const handleDefaultTehdyt = () => {
    setTehty(tehtyBackUp);
  }
  const handlebutton = () => {
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
    if (tehdytSortButton === false) {
      handletehtysort();
      setTehdytSortButton(true);
    }
    else {
      handleDefaultTehdyt();
      setTehdytSortButton(false);
    }
  }

  const handlevaritallenus = () => {
    setTaustanBg(taustaBg);
    setTaulukonBg(taulukkoBg);
    setVari(false);
    setVäriButton(0);
  }

  const handleVariPeruutus = () => {
    setVari(false);
    setVäriButton(0);
  }

  

  document.title = "To-do list";

  return (
    <html>
    <head>
      <title>Your Website Name</title>
    </head>
    <body style={{ backgroundColor: selectBg }}>
    <div className='app-container'>
      <h1 class='text-[60px] italic font-serif'>Köyhän miehen to do -lista</h1>
      <div className="color-input-container">
        <div>
          <Space className="site-button-ghost-wrapper" wrap>
          <Button type='primary' ghost onClick={handleinfo}>Lisää</Button>
          </Space>
        </div>
        <div>
          <Space className="site-button-ghost-wrapper" wrap>
          <Button type='primary' ghost onClick={handlevari}>Värit</Button>
          </Space>
        </div>
      </div>
      {vari && (
        <div className="color-input-container">
          <div>
            <h3 class='my-2'>Taustanväri</h3>
            <input
              className="cool-color-input"
              type="color"
              value={selectBg}
              onChange={(e) => {
                setTaustaBg(e.target.value)
              }}
            />
          </div>
          <div>
            <h3 class='my-2'>Taulukonväri</h3>
            <input
              className="cool-color-input"
              type="color"
              value={selectTaulukkoBg}
              onChange={(e) => {
                setTaulukkoBg(e.target.value)
              }}
            />
          </div>
            <Space className="site-button-ghost-wrapper" wrap>
            <Button type='primary' ghost onClick={handlevaritallenus}>Tallenna</Button>
            <Button type='primary' ghost onClick={handleVariPeruutus}>Peruuta</Button>
            </Space>
        </div>
      )}
      {showInfo && (
        <div className='color-input-container'>
          <div className='cool-input'>
            <input
              type="text"
              placeholder="teksti"
              onChange={(e) => setInputText(e.target.value)}
            />
            <Space className="site-button-ghost-wrapper" wrap>
            <Button type='primary' ghost onClick={handleSave} className='tallenna-button'>Tallenna</Button>
            </Space>
          </div>
        </div>
      )}
      <h2 class='text-[40px] font-mono'>Tekemättä</h2>
      <table className='table' style={{ backgroundColor: selectTaulukkoBg }}>
        <thead>
          <tr>
            <th><Button type='primary' ghost onClick={handlebutton}>Sort</Button></th>
            <th>Name</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Data.map((todo) => {
            return (
              <tr key={todo.Id}>
                <td>
                  <input
                    type='checkbox'
                    defaultChecked={false}
                    onChange={() => handleBox(todo)}
                  />
                </td>
                <td>{todo.Name}</td>
                <td>{todo.State}</td>
                <td >
                  <Button type='primary' ghost onClick={() => handlemuokkaus(todo)}>Muokkaa</Button>
                  <Button type='primary' ghost onClick={()=> handleDelete(todo)}>Poista</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showMuokkaus && (
        <div className='cool-input'>
          <input
            type="text"
            placeholder="Muokkaus"
            value={inputtext}
            onChange={(event) => setInputText(event.target.value)}
          />
          <Button type='primary' ghost onClick={handlemuokkaustallennus}>Tallenna</Button>
        </div>
      )}
      <h2 class='text-[40px] font-mono'>Tehdyt</h2>
      <table className='table' style={{ backgroundColor: selectTaulukkoBg }}>
        <thead>
          <tr>
            <th><Button type='primary' ghost onClick={handleTehdytButton}>Sort</Button></th>
            <th>Name</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {Tehty.map((valmis) => {
            return (
              <tr key={valmis.Id}>
                <td></td>
                <td class='font-mono line-through'>{valmis.Name}</td>
                <td>{valmis.State}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </body>
  </html>
  );
};
