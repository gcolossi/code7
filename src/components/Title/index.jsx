import styles from './styles.module.scss'



export function Title ({contentTitle}) {
    return(
        <div className={styles.title}>
           <h2>{contentTitle}</h2>
        </div>
    )
}