import styles from "./styles.module.scss";
import { apiUser, apiCode } from "../../api/axios-instance";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

const initialValue = {
  idUsuario: 1,
  motivo: "",
  valor: "",
};

export function Panel({ id }) {
  const [userList, setUserlist] = useState([""]);
  const [taxesList, setTaxesList] = useState(initialValue);
  const history = useHistory();

  const getAllUser = async () => {
    const response = await apiUser.get();
    return response.data;
  };

  const getAllTaxes = async () => {
    const response = await apiCode.get(
      "?uuid=bcc53fdc-fbc1-4d78-99e7-8cda90065903"
    );
    return response.data;
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setTaxesList({ ...taxesList, [name]: value });
    console.log(taxesList)
  };

  async function deleteTaxes  (id) {
    await apiCode.delete(
      `/${id}?uuid=bcc53fdc-fbc1-4d78-99e7-8cda90065903`
    );
  }  



  const onSubmit = async (event) => {
    event.preventDefault();

    const method = id != 0 ? "put" : "post";
    const url = id  != 0 ? `/${id}?uuid=bcc53fdc-fbc1-4d78-99e7-8cda90065903` : "/?uuid=bcc53fdc-fbc1-4d78-99e7-8cda90065903";

    const response = await apiCode[method](url, taxesList).then(
      (resp) => {
        history.push('/');
        history.go(0);
      }
    );
 
    return response;
  };

  useEffect(() => {
    console.log(taxesList)
    getAllUser().then((resp) => setUserlist(resp));
    if (id != 0) {
      getAllTaxes().then((resp) =>
        resp.result.map((r) => {
          if (r._id === id) {
            setTaxesList({
              idUsuario: r.idUsuario,
              motivo: r.motivo,
              valor: r.valor,
            });
          }
        })
      );
    }
  }, [id]);

  return (
    (id ?
    <form onSubmit={onSubmit}>
      <div className={styles.editContainer}>
        <div className={styles.editContent}>
          
          <label>
            <strong>Cliente</strong>
          </label>
          <select  name="idUsuario" onChange={onChange}>
            {id != 0
              ? userList.map((user) => {
                  if (taxesList.idUsuario === user.id) {
                    console.log(user.name);
                    return <option value={user.id}>{user.name}</option>;
                  }
                })
              : userList.map((user) => {
                  return <option value={user.id}>{user.name}</option>;
                })}
          </select>

          <label>
            <strong>Motivo</strong>
          </label>
          <input
            type="text"
            name="motivo"
            onChange={onChange}
            value={taxesList.motivo}
          />
          <label>
            <strong>Valor</strong>
          </label>
          <input
            type="text"
            name="valor"
            onChange={onChange}
            value={taxesList.valor}
          />
          <span>{taxesList.criado}</span>
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit">Salvar</button>
          <button onClick={()=> deleteTaxes(id)}>Excluir</button>
        </div>
      </div>
    </form>
  : ""))
}
