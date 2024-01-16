import styles from "./PInput.module.css";

export interface IPInputProps {
  isDisable?: boolean;
  tittle: string;
  forId: string;
  children: JSX.Element | JSX.Element[];
}

export default function PInput(props: IPInputProps) {
  let isDisable = props.isDisable ? true : false;

  return (
    <div className={styles.label} data-disable={isDisable}>
      <label htmlFor={props.forId}>{props.tittle}</label>
      {props.children}
    </div>
  );
}
