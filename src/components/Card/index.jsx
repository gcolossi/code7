import { FaUserCircle } from "react-icons/fa";
import { MdExpandMore, MdEdit , MdExpandLess } from "react-icons/md";
import { HiOutlinePlus } from "react-icons/hi";
import { useState } from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import format from "date-fns/format";

export function Card({ user, taxes }) {
  const [isEdit, setIsEdit] = useState(false);

  const showEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imgContainer}>
        <div className={styles.iconUser}>
          <FaUserCircle />
        </div>

        <div key={user.id} className={styles.cardContent}>
          <span>
            <strong>Nome: </strong> {user.name}
          </span>
          <span>
            <strong>Usuário: </strong> {user.username}
          </span>
          <span>
            <strong>Email: </strong> {user.email}
          </span>
          <span>
            <strong>Dívidas: </strong>
            {taxes.length}
          </span>
        </div>
      </div>
      <div className={styles.buttonCard}>
        <Link to={`/user/0`}>
          <HiOutlinePlus />
        </Link>
        {taxes.length > 0 ? (
          <button
            onClick={showEdit}
            className={styles.buttonCard}
            title={"Dívidas"}
          >
            {isEdit ? <MdExpandLess /> : <MdExpandMore/>}
          </button>
        ) : (
          ""
        )}
      </div>
      <div className={styles.listDebitContent}>
        {isEdit === true ? (
          <table>
            <tbody>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Data de criação</th>
              </tr>
              {taxes.map((resp) => {
                return (
                  <tr key={resp._id}>
                    <td>{resp.motivo}</td>
                    <td>R${resp.valor}</td>
                    <td>{format(new Date(resp.criado), "dd/MM/yyyy")}</td>
                    <td>
                      <Link
                        title={"Clique para editar"}
                        to={`/user/${resp._id}`}
                      >
                        <MdEdit />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
