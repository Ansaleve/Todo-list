import { Button } from "antd";

const EditForm = ({
  setShowEdit,
  setInputText,
  Data,
  setData,
  setBackUp,
  edit,
  setEdit,
  showEdit,
  inputText,
}) => {
  const handleEditSave = () => {
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
  const handleCancel = () => {
    setEdit("");
    setShowEdit(false);
    setInputText("");
  };
  return (
    <div className="cool-input">
      {showEdit && (
        <div>
          <input
            type="text"
            placeholder="Muokkaus"
            value={inputText}
            onChange={(event) => setInputText(event.target.value)}
          />
          <Button type="primary" ghost onClick={handleEditSave}>
            Tallenna
          </Button>
          <Button type="primary" ghost onClick={handleCancel}>
            Peruuta
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditForm;
