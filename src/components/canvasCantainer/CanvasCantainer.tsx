import styles from "./CanvasCantainer.module.css";

export interface ICanvasCantainerProps {
  children: JSX.Element[];
}

export default function CanvasCantainer({ children }: ICanvasCantainerProps) {
  const [Editor, ...OtherComponent] = children;

  return (
    <div className={styles.container}>
      <div className={styles.shell}>{Editor}</div> {OtherComponent}
    </div>
  );
}
