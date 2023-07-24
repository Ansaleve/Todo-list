import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Space } from "antd";
import { format, addDays, subDays } from "date-fns";

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
  const [inputTime, setInputTime] = useState("");
  const [inputDue, setInputDue] = useState("");

  const handleSaveClick = () => {
    if (inputDue !== "" && inputTime !== "" && inputText !== "") {
      const inputDueDate = format(new Date(inputDue), "dd-MM-yyyy");
      const currentDate = new Date();
      const formattedCurrentDate = format(currentDate, "dd-MM-yyyy");
      const tomorrowDate = addDays(currentDate, 1);
      const formattedTomorrowDate = format(tomorrowDate, "dd-MM-yyyy");
      const notAllowedDate = subDays(currentDate, 1);
      const formattedNotAllowedDate = format(notAllowedDate, "dd-MM-yyy");
      const currentTime = format(new Date(), "HH:mm");
      const dueTime = inputTime;
      console.log("input", inputDue);
      console.log("päivä additems", inputDueDate);
      if (inputDueDate < formattedNotAllowedDate) {
        alert("Virheellinen päivämäärä!");
        return;
      } else if (inputDueDate === formattedCurrentDate) {
        if (currentTime > dueTime) {
          alert("Valitsemasi aika on mennyt jo! Valitse tuleva aika!");
        } else {
          onAddItem({
            Id: uuidv4(),
            Name: inputText,
            State: "Tekemättä",
            Due: inputDue,
            Time: inputTime,
            ShownDue: "Tänään",
          });
          setShowInfo(false);
          setInputText("");
          setInputTime("");
          setAddButton(0);
          setInputDue("");
          console.log(dueTime);
        }
      } else if (formattedTomorrowDate === inputDueDate) {
        onAddItem({
          Id: uuidv4(),
          Name: inputText,
          State: "Tekemättä",
          Due: inputDue,
          Time: inputTime,
          ShownDue: "Huomenna",
        });
        setShowInfo(false);
        setInputText("");
        setInputTime("");
        setInputDue("");
        setAddButton(0);
      } else if (inputText !== "" && inputDue !== "" && inputTime !== "") {
        onAddItem({
          Id: uuidv4(),
          Name: inputText,
          State: "Tekemättä",
          Due: inputDue,
          Time: inputTime,
          ShownDue: inputDue,
        });
        setShowInfo(false);
        setInputText("");
        setInputTime("");
        setAddButton(0);
        setInputDue("");
      }
    } else {
      alert("Täydennä kaikki kentät!");
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
        <label>Time: </label>
        <input
          className="mt-[5px]"
          type="time"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
        />
        <Space>
          <Button
            type="primary"
            className="mt-[5px]"
            ghost
            onClick={handleSaveClick}
          >
            Tallenna
          </Button>
          <Button
            type="primary"
            className="mt-[5px]"
            ghost
            onClick={infoCancel}
          >
            Peruuta
          </Button>
        </Space>
      </div>
    </div>
  ) : null;
};

export default AddNewItem;
