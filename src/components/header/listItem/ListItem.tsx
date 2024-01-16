import styles from "./ListItem.module.css";

export interface IListItemProps {
  icon: JSX.Element;
  href: string;
  title: string;
}

export default function ListItem(props: IListItemProps) {
  return (
    <li className={styles.item}>
      <a href={props.href} target="_blank" rel="noopener noreferrer">
        <span>{props.icon}</span>
        <div>{props.title}</div>
      </a>
    </li>
  );
}
