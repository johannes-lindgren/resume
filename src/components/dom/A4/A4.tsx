import {FunctionComponent, PropsWithChildren} from "react";
import styles from './styles.module.scss'

export const A4: FunctionComponent<PropsWithChildren> = (props) => (
  <div className={styles.class}>
    {props.children}
  </div>
)