import './App.css';
import { Button, Space, Table,} from 'antd';
import initCollapseMotion from 'antd/es/_util/motion';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [showInfo, setShowInfo] = useState(false);
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
  const { Column } = Table

  const handleSave = () => {
    setShowInfo(false);
    if (inputtext !== "") {
      setData([...Data, { Id: uuidv4(), Name: inputtext, State: "Tekemättä" }]);
      setBackUp([...Data, { Id: uuidv4(), Name: inputtext, State: "Tekemättä" }]);
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
    setShowInfo(true);
    setVari(false);
  };

  const handlevari = () => {
    setShowInfo(false);
    setVari(true);
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

  const handletoinen = (Name) => {
    setMuokkaus(true);
    setInputText(Name)
    setEdit(Name);
  }

  const handletoinentallennus = () => {
    setMuokkaus(false);
    const updateToinen = Data.map((muokattava) => {
      if (muokattava.Name === edit.Name) {
        return {...muokattava, Name: inputtext};
      }
      return muokattava;
    })
    setData(updateToinen)
  }

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

  

  document.title = "To-do list";

  return (
    <html>
    <head>
      <title>Your Website Name</title>
    </head>
    <body>
    <div className='app-container'>
      <h1 class='text-[60px] italic'>Köyhän miehen todo lista</h1>
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
            <h3>Taustanväri</h3>
            <input
              className="cool-color-input"
              type="color"
              onChange={(e) => {
                document.documentElement.style.setProperty('--bg-cool-color', e.target.value);
              }}
            />
          </div>
          <div>
            <h3>Taulukonväri</h3>
            <input
              className="cool-color-input"
              type="color"
              onChange={(e) => {
                document.documentElement.style.setProperty('--table-color', e.target.value);
              }}
            />
          </div>
          <div>
            <h3>Taulukon otsikon väri</h3>
            <input
              className='cool-color-input'
              type='color'
              onChange={(e) => {
                document.documentElement.style.setProperty('--table-th-color', e.target.value)
              }}
            />
          </div>
          <h3>
            <Space className="site-button-ghost-wrapper" wrap>
            <Button type='primary' ghost onClick={() => setVari(false)}>Tallenna</Button>
            </Space>
          </h3>
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
            <Button type='primary' ghost onClick={handleSave}>Tallenna</Button>
            </Space>
          </div>
        </div>
      )}
      <h2 class='text-[40px]'>Tekemättä</h2>
      <table className='table'>
        <thead>
          <tr>
            <Space className="site-button-ghost-wrapper" wrap>
            <th><Button type='primary' ghost onClick={handlebutton}>Sort</Button></th>
            </Space>
            <th>Name</th>
            <th>State</th>
            <th></th>
            <th></th>
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
                <td className="muokkaa-cell">
                  <Space className="site-button-ghost-wrapper" wrap>
                  <Button type='primary' ghost onClick={() => handlemuokkaus(todo)}>
                    Muokkaa
                  </Button>
                  </Space>
                </td>
                <td>
                  <Space className="site-button-ghost-wrapper" wrap>
                  <Button type='primary' ghost onClick={()=> handleDelete(todo)}>Poista</Button>
                  </Space>
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
          <Button type='primary' ghost onClick={handletoinentallennus}>Tallenna</Button>
        </div>
      )}
      <h2 class='text-2xl'>Tehdyt</h2>
      <table className='table'>
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
                <td>{valmis.Name}</td>
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
