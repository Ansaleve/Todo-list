import { Button } from "antd";
import { format } from "date-fns";

const DateEditForm = ({
  showDateEdit,
  dateEdit,
  setInputDue,
  inputDue,
  inputTime,
  setInputTime,
  setShowDateEdit,
  Data,
  setData,
  setBackUp,
}) => {
  const handleDateEditSave = () => {
    setShowDateEdit(false);
    const updateDateData = Data.map((dateMuokkaus) => {
      if (dateMuokkaus.Id === dateEdit.Id) {
        return { ...dateMuokkaus, Due: inputDue, Time: inputTime };
      }
      return dateMuokkaus;
    });

    const updatedDueDate = format(new Date(inputDue), "dd-MM-yyyy");
    const thisDate = format(new Date(), "dd-MM-yyyy");

    if (updatedDueDate < thisDate) {
      alert("Virheellinen päivämäärä");
      return;
    } else {
      setData(updateDateData);
      setBackUp(updateDateData);
    }
  };
  const handleDateEditCancel = () => {
    setShowDateEdit(false);
    setInputDue("");
    setInputTime("");
  };
  return (
    <div className="cool-input">
      {showDateEdit && (
        <body>
          <div className="cool-input">
            <input
              class="mb-[5px]"
              type="time"
              value={inputTime}
              onChange={(e) => setInputTime(e.target.value)}
            />
          </div>
          <div className="cool-input">
            <input
              class="mb-[5px] ml-[5px]"
              type="date"
              value={inputDue}
              onChange={(e) => setInputDue(e.target.value)}
            />
          </div>
          <div>
            <Button type="primary" ghost onClick={handleDateEditSave}>
              Tallenna
            </Button>
            <Button type="primary" ghost onClick={handleDateEditCancel}>
              Peruuta
            </Button>
          </div>
        </body>
      )}
    </div>
  );
};

export default DateEditForm;
