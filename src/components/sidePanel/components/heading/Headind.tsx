import styles from "./Heading.module.css";

export interface IHeadingProps {
  children: string;
}

export default function Heading({ children }: IHeadingProps) {
  return (
    <>
      <h3 className={styles.heading}>{children}</h3>
      <hr className={styles.hr} />
    </>
  );
}
