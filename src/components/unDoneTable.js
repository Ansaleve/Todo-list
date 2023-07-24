import { Button, Space } from "antd";
import { format } from "date-fns";

const UnDoneTable = ({
  Data,
  selectTaulukkoBg,
  handleButton,
  handleBox,
  backUp,
  setData,
  setBackUp,
  showEdit,
  showDateEdit,
  setShowEdit,
  setShowDateEdit,
  setDateEdit,
  dateEdit,
  inputText,
  inputDue,
  setInputDue,
  setInputText,
  edit,
  setEdit,
  inputTime,
  setInputTime,
}) => {
  const handleDateEditCancel = () => {
    setShowDateEdit(false);
    setInputDue("");
    setInputTime("");
  };

  const handleDelete = (Id) => {
    const updatedData = Data.filter((poistettava) => poistettava.Id !== Id);
    const updatedBackUp = backUp.filter((poistettava) => poistettava.Id !== Id);
    setData(updatedData);
    setBackUp(updatedBackUp);
    console.log("trying to delete");
  };
  const isUncompletedTasks = Data.some((todo) => todo.State === "Tekemättä");

  const handleDateEdit = (Due, Id) => {
    setShowDateEdit(true);
    setInputDue(Due);
    setDateEdit({ Id });
  };

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
    } else {
      setData(updateDateData);
      setBackUp(updateDateData);
    }
  };

  const handleEdit = (Name, Id) => {
    setShowEdit(true);
    setInputText(Name);
    setEdit({ Id, Name });
  };

  return (
    <body>
      <table className="table" style={{ backgroundColor: selectTaulukkoBg }}>
        <thead>
          <tr>
            <th>
              <Button type="primary" ghost onClick={handleButton}>
                Järjestä
              </Button>
            </th>
            <th>To do</th>
            <th>Vaihe</th>
            <th>Due Date & Time</th>
            {isUncompletedTasks && <th>Toiminnot</th>}
          </tr>
        </thead>
        <tbody>
          {Data.length === 0 ? (
            <tr>
              <td colSpan="5">
                <p className="flex justify-center items-center text-[30px]">
                  Kaikki tehty! Hyvä sinä!
                </p>
              </td>
            </tr>
          ) : (
            Data.map((todo) => (
              <tr key={todo.Id}>
                <td>
                  {todo.State === "Tekemättä" && (
                    <Button
                      type="primary"
                      ghost
                      onClick={() => handleBox(todo, inputDue)}
                    >
                      Merkitse valmiiksi
                    </Button>
                  )}
                </td>
                <td>{todo.Name}</td>
                <td>{todo.State}</td>
                <td>
                  {todo.ShownDue} & klo: {todo.Time}
                </td>
                {todo.State === "Tekemättä" && (
                  <td>
                    <Space>
                      <Button
                        type="primary"
                        ghost
                        onClick={() => handleEdit(todo.Name, todo.Id)}
                      >
                        Muokkaa nimeä
                      </Button>
                      <Button
                        type="primary"
                        ghost
                        onClick={() =>
                          handleDateEdit(todo.Due, todo.Id, todo.Time)
                        }
                      >
                        Muokkaa Due Date
                      </Button>
                      <Button
                        type="primary"
                        ghost
                        onClick={() => handleDelete(todo.Id)}
                      >
                        Poista
                      </Button>
                    </Space>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
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
    </body>
  );
};

export default UnDoneTable;
