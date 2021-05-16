import React from 'react'
import { Header } from '../../components/Header'
import { Panel } from '../../components/Panel'
import { CardList } from '../../components/CardList'
import { Title } from '../../components/Title'
import { useParams } from 'react-router-dom'



export function Main () {
  const { id } = useParams();

    return (
        <div className="App">
          <Header />
          <Title contentTitle={"Lista de usuários ativos"}/>
          <Panel id={id ? id : null} />
          <CardList />
        </div>
      );
    }


