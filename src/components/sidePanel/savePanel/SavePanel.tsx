import { useState, useEffect, FormEvent } from "react";
import { IoSaveOutline } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";

import { GraphEditorInstance } from "../../Editor/Editor";

import styles from "./SavePoint.module.css";
import LoadComp from "./loadComp/LoadComp";
import Heading from "../components/heading/Headind";
import FieldGroup from "../components/fieldGroup/FieldGroup";

export interface ICheckPoint {
  CheckPointName: string;
  CheckPointId: string;
  CheckPointData: string;
  CheckPointLastUpdate: string;
}

export default function SavePanel() {
  const [CheckPoints, setCheckPoints] = useState<ICheckPoint[]>([]);

  useEffect(() => {
    if (localStorage.hasOwnProperty("ListOfAllSavePoint")) {
      let SArray = JSON.parse(localStorage.getItem("ListOfAllSavePoint")!);
      setCheckPoints(SArray);
    } else {
      localStorage.setItem("ListOfAllSavePoint", JSON.stringify(CheckPoints));
    }
  }, []);

  const date = new Date();

  const delFunction = (Id: string) => {
    setCheckPoints((prev) => {
      let array = prev.filter((CP) => CP.CheckPointId !== Id);
      SaveChange(array);
      return array;
    });
  };
  const editNameFunction = (Id: string, name: string) => {
    setCheckPoints((prev) => {
      let array = prev.map((value) => {
        if (value.CheckPointId === Id) {
          return { ...value, CheckPointName: name };
        }
        return value;
      });
      SaveChange(array);
      return array;
    });
  };
  const ModifyByID = (CheckPointID: string) => {
    setCheckPoints((prev) => {
      let array = prev.map((value) => {
        if (value.CheckPointId === CheckPointID) {
          let Gdate = JSON.stringify(GraphEditorInstance?.graph);
          return { ...value, CheckPointData: Gdate };
        }
        return value;
      });
      SaveChange(array);
      return array;
    });
  };

  const SaveChange = (CheckPointArray: ICheckPoint[]) => {
    localStorage.setItem("ListOfAllSavePoint", JSON.stringify(CheckPointArray));
  };

  const AddCheckPoint = (e: FormEvent) => {
    e.preventDefault();

    let CheckPointName = (e.target as HTMLFormElement).sName.value as string;
    let CheckPointData = JSON.stringify(GraphEditorInstance?.graph);
    let CheckPointLastUpdate = Date();

    let CheckPoint = {
      CheckPointName,
      CheckPointData,
      CheckPointLastUpdate,
    };

    let CheckPointId = uuidv4();

    setCheckPoints((prev) => {
      let array = [{ ...CheckPoint, CheckPointId }, ...prev];
      SaveChange(array);
      return array;
    });
    // .sort(compare)
  };
  return (
    <>
      <Heading>save and load</Heading>
      <FieldGroup tittle="new save">
        <NewSave
          AddCheckPoint={AddCheckPoint}
          id={`${date.getMonth()}${date.getDate()}${date.getMinutes()}${date.getSeconds()}
          `}
          number={CheckPoints.length}
        />
      </FieldGroup>
      <FieldGroup
        tittle="load"
        style={{
          flex: 1,
        }}
      >
        {CheckPoints.map((e) => {
          return (
            <LoadComp
              key={e.CheckPointId}
              editNameFunction={editNameFunction}
              delFunction={delFunction}
              modifyByID={ModifyByID}
              {...e}
            />
          );
        })}
      </FieldGroup>
    </>
  );
}
interface INewSavePorps {
  AddCheckPoint: Function;
  id: string;
  number: number;
}

const NewSave = ({ AddCheckPoint, id, number }: INewSavePorps) => {
  return (
    <form
      key={"NS" + id + number}
      onSubmit={(e) => {
        AddCheckPoint(e);
      }}
      className={styles.Sform}
    >
      <input
        name="sName"
        defaultValue={
          "Graph " +
          `${Number.parseInt(id).toString(16)} ${number}`.toUpperCase()
        }
        type="text"
      />
      <button type="submit">
        <IoSaveOutline />
      </button>
    </form>
  );
};
