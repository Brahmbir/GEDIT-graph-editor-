import { useEffect, useRef, useState } from "react";
import Viewport from "../../classes/main/viewport";
import Graph from "../../classes/main/graph";
import GraphEditor, { ISelect } from "../../classes/graphEditor";
import styles from "./Editor.module.css";
import { IoIosArrowDown } from "react-icons/io";
import PInput from "../sidePanel/components/pInput/PInput";
import Vertex from "../../classes/primitives/vertex";
import Segment from "../../classes/primitives/segment";

let GraphEditorInstance: GraphEditor | null;

const Editor = () => {
  let MyCan = useRef(null);

  const [selectedData, setSelectedData] = useState<ISelect>(null);

  useEffect(() => {
    function animate() {
      viewport.reset();
      GraphEditorInstance!.display();
      requestAnimationFrame(animate);
    }

    const GraphString = localStorage.getItem("auto-save-graph");

    const graph = GraphString
      ? Graph.load(JSON.parse(GraphString))
      : new Graph();

    const MyCanvas: HTMLCanvasElement = MyCan.current!;

    MyCanvas.width = MyCanvas.clientWidth;
    MyCanvas.height = MyCanvas.clientHeight;

    const viewport = new Viewport(MyCanvas);
    GraphEditorInstance = new GraphEditor(viewport, graph, setSelectedData);

    animate();
  }, []);

  return (
    <div className={styles.shell}>
      <canvas ref={MyCan} className={styles.canvas}></canvas>
      <SDetail key={"same"} Data={selectedData} />
    </div>
  );
};

interface ISDetailProps {
  Data: ISelect;
}

function SDetail(props: ISDetailProps) {
  const [isHidden, setIsHidden] = useState(true);

  let SettField: JSX.Element | string = "Currently not Selected";

  if (props.Data) {
    if (props.Data instanceof Vertex) {
      SettField = (
        <>
          <p>
            <span>Vexter ID :</span> {props.Data.VertexId}
          </p>
          <PInput key={props.Data.VertexId} forId="vlabel" tittle="Label">
            <input
              id="vlabel"
              type="text"
              defaultValue={props.Data.label}
              onChange={(e) => {
                (props.Data as Vertex).setName(e);
              }}
            ></input>
          </PInput>
        </>
      );
    }
    if (props.Data instanceof Segment) {
      SettField = (
        <>
          <p>
            <span>Segment</span>{" "}
          </p>
          <PInput forId="Svalue" tittle="Label">
            <input
              id="Svalue"
              type="number"
              min={0}
              onChange={(e) => {
                (props.Data as Segment).setValue(
                  (e.target as HTMLInputElement).value
                );
              }}
              defaultValue={props.Data.value}
            ></input>
          </PInput>
        </>
      );
    }
  }

  return (
    <div data-hid={isHidden} className={styles.detailBox}>
      <div className={styles.interaction}>
        <h3>Details</h3>
        <button
          onClick={() => {
            setIsHidden((prev) => !prev);
          }}
        >
          <IoIosArrowDown />
        </button>
      </div>
      <div className={styles.dData}>{SettField}</div>
    </div>
  );
}

export { GraphEditorInstance };

export default Editor;
