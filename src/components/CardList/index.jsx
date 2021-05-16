import { apiCode, apiUser } from "../../api/axios-instance";
import { useEffect, useState } from "react";
import { Card } from "../Card";

export function CardList() {
  const [userList, setUserList] = useState([""]);
  const [taxesList, setTaxesList] = useState({ result: [] });

  const getAllTaxes = async () => {
    const response = await apiCode.get(
      "?uuid=bcc53fdc-fbc1-4d78-99e7-8cda90065903"
    );
    return response.data;
  };

  const getAllUser = async () => {
    const response = await apiUser.get();
    return response.data;
  };

  useEffect(() => {
    getAllUser().then((resp) => setUserList(resp));
    getAllTaxes().then((resp) => setTaxesList(resp));
  }, []);

  return (
    <>
      {userList.map((user) => {
        const userTaxes = taxesList.result.filter(
          (resp) => resp.idUsuario === user.id
        );
        return <Card user={user} taxes={userTaxes} />;
      })}
    </>
  );
}
