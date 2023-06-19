import './App.css';
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

  const handleSave = () => {
    setShowInfo(false);
    if (inputtext !== "") {
      setData([...Data, { Id: uuidv4(), Name: inputtext, State: "Tekemättä" }]);
    }
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
  };

  const handleDelete = (todo) => {
    const updatedData = Data.filter((poistettava) => poistettava.Id !== todo.Id);
    setData(updatedData);
  };

  return (
    <div className='app-container'>
      <h1>Köyhän miehen todo lista</h1>
      <div className="color-input-container">
        <div>
          <button onClick={handleinfo} className="button-9">Lisää</button>
        </div>
        <div>
          <button onClick={handlevari} className='button-9'>Värit</button>
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
            <button onClick={() => setVari(false)} className='muokkaus-nappi'>Tallenna</button>
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
            <button onClick={handleSave} className="muokkaus-nappi">Tallenna</button>
          </div>
        </div>
      )}
      <h2>Tekemättä</h2>
      <table className='table'>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th>State</th>
            <th>Color</th>
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
                <td>{todo.Id}</td>
                <td>{todo.Name}</td>
                <td>{todo.State}</td>
                <td>{todo.Color}</td>
                <td className="muokkaa-cell">
                  <button className="muokkaus-nappi" onClick={() => handlemuokkaus(todo)}>
                    Muokkaa
                  </button>
                </td>
                <td>
                  <button onClick={()=> handleDelete(todo)} className='muokkaus-nappi'>Poista</button>
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
          <button onClick={handlemuokkaustallennus} className="muokkaus-nappi">Tallenna</button>
        </div>
      )}
      <h2>Tehdyt</h2>
      <table className='table'>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th>State</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          {Tehty.map((valmis) => {
            return (
              <tr key={valmis.Id}>
                <td></td>
                <td>{valmis.Id}</td>
                <td>{valmis.Name}</td>
                <td>{valmis.State}</td>
                <td>{valmis.Color}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
