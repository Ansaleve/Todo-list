import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Space } from "antd";
import { format } from "date-fns";

const AddNewItem = ({
  showInfo,
  setShowInfo,
  addButton,
  handleSave,
  infoCancel,
  onAddItem,
  setAddButton,
}) => {
  const [inputText, setInputText] = useState("");
  const [inputDue, setInputDue] = useState("");
  const [inputTime, setInputTime] = useState("");

  const handleSaveClick = () => {
    const inputDueDate = new Date(inputDue);
    const updatedDueDate = new Date(
      inputDueDate.getFullYear(),
      inputDueDate.getMonth(),
      inputDueDate.getDate()
    );
    const thisDate = new Date();
    const updatedThisDate = new Date(
      thisDate.getFullYear(),
      thisDate.getMonth(),
      thisDate.getDate()
    );
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const updatedTomorrowDate = new Date(
      tomorrowDate.getFullYear(),
      tomorrowDate.getMonth(),
      tomorrowDate.getDate()
    );
    const notAllowedDate = new Date();
    notAllowedDate.setDate(notAllowedDate.getDate() - 1);

    const yesterdayDate = new Date(
      notAllowedDate.getFullYear(),
      notAllowedDate.getMonth(),
      notAllowedDate.getDate()
    );
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const formattedTime = `${hours.toString()}:${minutes.toString()}`;
    const dueTime = inputTime;
    if (updatedDueDate.getTime() < yesterdayDate.getTime()) {
      alert("Virheellinen päivämäärä!");
      return;
    } else if (updatedDueDate.getTime() === updatedThisDate.getTime()) {
      if (formattedTime > dueTime) {
        alert("Valitsemasi aika on mennyt jo! Valitse tuleva aika!");
      } else {
        onAddItem({
          Id: uuidv4(),
          Name: inputText,
          State: "Tekemättä",
          Due: "Tänään",
          Time: inputTime,
        });
        setShowInfo(false);
        setInputText("");
        setInputTime("");
        setAddButton(0);
        console.log(dueTime);
        console.log(formattedTime);
      }
    } else if (updatedTomorrowDate.getTime() === updatedDueDate.getTime()) {
      onAddItem({
        Id: uuidv4(),
        Name: inputText,
        State: "Tekemättä",
        Due: "Huomenna",
        Time: inputTime,
      });
      setShowInfo(false);
      setInputText("");
      setInputTime("");
      setAddButton(0);
    } else if (inputText !== "" && inputDue !== "" && inputTime !== "") {
      onAddItem({
        Id: uuidv4(),
        Name: inputText,
        State: "Tekemättä",
        Due: format(new Date(inputDue), "dd-MM-yyyy"),
        Time: inputTime,
      });
      setShowInfo(false);
      setInputText("");
      setInputTime("");
      setAddButton(0);
      console.log(thisDate);
      console.log(updatedDueDate);
    } else if (inputText === "") {
      alert("Kirjoita To do:lle nimi!");
      return;
    } else if (inputTime === "") {
      alert("Merkitse aika");
      return;
    } else {
      alert("Kerro To do:n DueDate!");
      return;
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
        <lable>Time: </lable>
        <input
          className="mt-[5px]"
          type="time"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
        />
        <Space>
          <Button type="primary" ghost onClick={handleSaveClick}>
            Tallenna
          </Button>
          <Button type="primary" ghost onClick={infoCancel}>
            Peruuta
          </Button>
        </Space>
      </div>
    </div>
  ) : null;
};

export default AddNewItem;
