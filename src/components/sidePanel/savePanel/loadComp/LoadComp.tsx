import { RiDeleteBin2Line } from "react-icons/ri";
import { useEffect, useRef } from "react";
import { ICheckPoint } from "../SavePanel";
import styles from "./LoadComp.module.css";
import { GraphEditorInstance } from "../../../Editor/Editor";

export interface ILoadCompProps extends ICheckPoint {
  editNameFunction: (Id: string, name: string) => void;
  delFunction: (Id: string) => void;
  modifyByID: (Id: string) => void;
}

export default function LoadComp(props: ILoadCompProps) {
  const Image = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (Image.current) {
      (Image.current as HTMLInputElement).addEventListener(
        "focusout",
        (event) => {
          let CPName = (event.target as HTMLInputElement).value;
          props.editNameFunction(props.CheckPointId, CPName);
        }
      );
    }
  }, []);
  const LoadGraph = () => {
    GraphEditorInstance?.loadGraph(props.CheckPointData);
  };
  return (
    <div className={styles.loadCard}>
      <div className={styles.topBar}>
        <span>{props.CheckPointId}</span>
        <button onClick={(): void => props.delFunction(props.CheckPointId)}>
          <RiDeleteBin2Line />
        </button>
      </div>
      <div className={styles.form}>
        <label htmlFor={"CPName" + props.CheckPointId}>Name</label>
        <input
          id={"CPName" + props.CheckPointId}
          className={styles.inp}
          ref={Image}
          // onKeyDown={}
          // onSubmit={props.editNameFunction}
          type="text"
          defaultValue={props.CheckPointName}
        />
      </div>
      <div className={styles.btnBar}>
        <button className={styles.load} onClick={LoadGraph}>
          load
        </button>
        <button
          className={styles.load}
          onClick={() => props.modifyByID(props.CheckPointId)}
        >
          Save
        </button>
      </div>
    </div>
  );
}
