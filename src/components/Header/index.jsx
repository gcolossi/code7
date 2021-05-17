import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";
import styles from "./styles.module.scss";

export function Header() {
  const currentDate = format(new Date(), "EEEEEE,d MMMM", {
    locale: ptBR,
  });

  return (
    <header className={styles.headerContainer}>
      <img src="/logo-code7.svg" alt="Logo Code7" />
      <p>Portal de controle e atualização de dividas</p>
      <span>{currentDate}</span>
    </header>
  );
}
