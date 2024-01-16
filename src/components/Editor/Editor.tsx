import { useEffect, useRef } from "react";
import Viewport from "../../classes/main/viewport";
import Graph from "../../classes/main/graph";
import GraphEditor from "../../classes/graphEditor";
import styles from "./Editor.module.css";

let GraphEditorInstance: GraphEditor | null;

const Editor = () => {
  let MyCan = useRef(null);

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
    GraphEditorInstance = new GraphEditor(viewport, graph);

    animate();
  }, []);

  return (
    <div className={styles.shell}>
      <canvas ref={MyCan} className={styles.canvas}></canvas>
    </div>
  );
};

export { GraphEditorInstance };

export default Editor;
