import { Button, Space } from 'antd';

const DoneTable = ({ Data, selectTaulukkoBg, handleButton, handleBox, handlemuokkaus, handleDateMuokkaus, handleDelete }) => {

    const handleDeleteClick = () => {
        handleDelete();
    }
    const handlemuokkausClick = () => {
        handlemuokkaus();
    }
    const handleDateMuokkausClick = () => {
        handleDateMuokkaus()
    }

  return Data.length > 0 ? (
    <table className='table' style={{ backgroundColor: selectTaulukkoBg }}>
      <thead>
        <tr>
          <th>
            <Button type='primary' ghost onClick={handleButton}>
              Järjestä
            </Button>
          </th>
          <th>To do</th>
          <th>Vaihe</th>
          <th>Due Date</th>
          <th>Toiminnot</th>
        </tr>
      </thead>
      <tbody>
        {Data.map((todo) => {
          return (
            <tr key={todo.Id}>
              <td>
                <Button type='primary' ghost onClick={() => handleBox(todo)}>
                  Merkitse valmiiksi
                </Button>
              </td>
              <td>{todo.Name}</td>
              <td>{todo.State}</td>
              <td>{todo.Due}</td>
              <td>
                <Space>
                  <Button type='primary' ghost onClick={() => handlemuokkausClick(todo.Name, todo.Id)}>
                    Muokkaa nimeä
                  </Button>
                  <Button type='primary' ghost onClick={() => handleDateMuokkausClick(todo.Due, todo.Id)}>
                    Muokkaa Due Date
                  </Button>
                  <Button type='primary' ghost onClick={() => handleDeleteClick(todo.Id)}>
                    Poista
                  </Button>
                </Space>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : null;
};

export default DoneTable;
