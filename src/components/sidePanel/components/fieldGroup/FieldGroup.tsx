import styles from "./FieldGroup.module.css";

export interface IFieldGroupProps {
  children: JSX.Element | JSX.Element[] | null | string;
  tittle: string;
  disable?: boolean;
  style?: {};
}

export default function FieldGroup(props: IFieldGroupProps) {
  return (
    <div
      data-disable={props.disable}
      className={styles.group}
      style={props.style}
    >
      <h3 className={styles.tittle}>{props.tittle}</h3>
      {props.children}
    </div>
  );
}
