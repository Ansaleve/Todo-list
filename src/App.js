import "./App.css";
import { Button, Space } from "antd";
import { useState } from "react";
import { format } from "date-fns";

import AddNewItem from "./components/addNewItem";
import ChangeColors from "./components/changeColors";
import UnDoneTable from "./components/unDoneTable";

export default function App() {
  const [showInfo, setShowInfo] = useState(false);
  const [addButton, setAddButton] = useState(0);
  const [colorButton, setColorButton] = useState(0);
  const [inputText, setInputText] = useState("");
  const [Data, setData] = useState([]);
  const [Done, setDone] = useState([]);
  const [vari, setVari] = useState(false);
  const [edit, setEdit] = useState([]);
  const [dateEdit, setDateEdit] = useState("");
  const [backUp, setBackUp] = useState([]);
  const [doneBackUp, setDoneBackUp] = useState([]);
  const [sortButton, setSortButton] = useState(false);
  const [inputDue, setInputDue] = useState("");
  const [inputTime, setInputTime] = useState("");

  const [selectBg, setSelectBg] = useState("#FFFFFF");
  const [selectTaulukkoBg, setSelectTaulukkoBg] = useState("#FFFFFF");

  const [showEdit, setShowEdit] = useState(false);
  const [showDateEdit, setShowDateEdit] = useState(false);

  const handleSave = (newItem) => {
    setData([...Data, newItem]);
    setBackUp([...Data, newItem]);
  };

  const infoCancel = () => {
    setShowInfo(false);
    setInputText("");
    setAddButton(0);
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
      setVari(false);
      setColorButton(0);
    }
  };

  const handleBox = (todo) => {
    const formattedDueDates = format(new Date(todo.Due), "dd-MM-yyyy");
    const currentDate = format(new Date(), "dd-MM-yyyy");
    const currentTime = format(new Date(), "HH:mm");
    const dueTime = inputTime;
    console.log("Päivä täällä on", formattedDueDates);

    if (currentDate === formattedDueDates) {
      if (dueTime < currentTime) {
        const updatedDone = [...Done, { ...todo, State: "Tehty Myöhässä" }];
        const updatedData = Data.filter(
          (siirrettävä) => siirrettävä.Id !== todo.Id
        );

        setDone(updatedDone);
        setData(updatedData);
        setBackUp(updatedData);
        setDoneBackUp(updatedDone);
      } else if (dueTime > currentTime) {
        const updatedDone = [...Done, { ...todo, State: "Tehty Ajoissa" }];
        const updatedData = Data.filter(
          (siirrettävä) => siirrettävä.Id !== todo.Id
        );

        setDone(updatedDone);
        setData(updatedData);
        setBackUp(updatedData);
        setDoneBackUp(updatedDone);
      }
    } else if (currentDate > formattedDueDates) {
      const updatedDone = [
        ...Done,
        { ...todo, State: "Tehty Ajoissa", dueDate: inputDue },
      ];
      const updatedData = Data.filter(
        (siirrettävä) => siirrettävä.Id !== todo.Id
      );

      setDone(updatedDone);
      setData(updatedData);
      setBackUp(updatedData);
      setDoneBackUp(updatedDone);
    } else {
      const updatedDone = [...Done, { ...todo, State: "Tehty Myöhässä" }];
      const updatedData = Data.filter(
        (siirrettävä) => siirrettävä.Id !== todo.Id
      );

      setDone(updatedDone);
      setData(updatedData);
      setBackUp(updatedData);
      setDoneBackUp(updatedDone);
    }
  };

  const handleDateMuokkaus = (Due, Id) => {
    setShowDateEdit(true);
    setInputDue(Due);
    setDateEdit({ Id });
  };

  const handleDelete = (Id) => {
    const updatedData = Data.filter((poistettava) => poistettava.Id !== Id);
    const updatedBackUp = backUp.filter((poistettava) => poistettava.Id !== Id);
    setData(updatedData);
    setBackUp(updatedBackUp);
  };

  const handleDefault = () => {
    setData(backUp);
  };

  const handleButton = () => {
    if (sortButton === false) {
      handleSort();
      setSortButton(true);
    } else {
      handleDefault();
      setSortButton(false);
    }
  };

  document.title = "To-do list";

  return (
    <html>
      <head>
        <title>Your Website Name</title>
      </head>
      <body style={{ backgroundColor: selectBg }}>
        <div className="app-container">
          <h1 class="text-[60px] italic font-serif mb-[10px]">
            Köyhän miehen to do -lista
          </h1>
          <div className="color-input-container">
            <div>
              <Space className="site-button-ghost-wrapper" wrap>
                <Button type="primary" ghost onClick={handleNewItem}>
                  Lisää
                </Button>
              </Space>
            </div>
            <div>
              <Space className="site-button-ghost-wrapper" wrap>
                <Button type="primary" ghost onClick={handlevari}>
                  Värit
                </Button>
              </Space>
            </div>
          </div>
          <ChangeColors
            vari={vari}
            setVari={setVari}
            selectBg={selectBg}
            setSelectBg={setSelectBg}
            selectTaulukkoBg={selectTaulukkoBg}
            setSelectTaulukkoBg={setSelectTaulukkoBg}
          />
          <AddNewItem
            showInfo={showInfo}
            setShowInfo={setShowInfo}
            addButton={addButton}
            infoCancel={infoCancel}
            onAddItem={handleSave}
            setAddButton={setAddButton}
            inputDue={inputDue}
            setInputDue={setInputDue}
          />
          <h2 class="text-[40px] font-seriff italic mt-[10px]">Tekemättä</h2>
          <UnDoneTable
            Data={Data}
            selectTaulukkoBg={selectTaulukkoBg}
            handleButton={handleButton}
            handleBox={handleBox}
            handleDateMuokkaus={handleDateMuokkaus}
            handleDelete={handleDelete}
            setData={setData}
            setBackUp={setBackUp}
            backUp={backUp}
            showEdit={showEdit}
            showDateEdit={showDateEdit}
            setShowEdit={setShowEdit}
            setShowDateEdit={setShowDateEdit}
            setDateEdit={setDateEdit}
            dateEdit={dateEdit}
            inputText={inputText}
            setInputText={setInputText}
            edit={edit}
            setEdit={setEdit}
            setInputDue={setInputDue}
            inputDue={inputDue}
            inputTime={inputTime}
            setInputTime={setInputTime}
          />
          <h2 class="text-[40px] font-mono">Tehdyt {inputDue}</h2>
          <UnDoneTable
            Data={Done}
            selectTaulukkoBg={selectTaulukkoBg}
            handleButton={handleButton}
            handleBox={handleBox}
            handleDateMuokkaus={handleDateMuokkaus}
            handleDelete={handleDelete}
            setData={setData}
            setBackUp={setBackUp}
            backUp={backUp}
          />
        </div>
      </body>
    </html>
  );
}
