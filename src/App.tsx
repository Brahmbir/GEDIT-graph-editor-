// import reactLogo from "./assets/react.svg"; //from assets
// import viteLogo from "/vite.svg"; // from public
import { useEffect } from "react";
import "./App.css";
import Editor, { GraphEditorInstance } from "./components/Editor/Editor";
import CanvasCantainer from "./components/canvasCantainer/CanvasCantainer";
import Header from "./components/header/Header";
import HelpModal from "./components/helpModal/HelpModal";
import SidePanel from "./components/sidePanel/SidePanel";

function App() {
  useEffect(() => {
    //   window.addEventListener(
    //     "wheel",
    //     (e) => {
    //       e.preventDefault();
    //     },
    //     { passive: false }
    //   );

    //Implementing the setInterval method
    const interval = setInterval(() => {
      GraphEditorInstance?.autoSave();
    }, 5000);

    //Clearing the interval
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <Header />
      <CanvasCantainer>
        <Editor />
        <HelpModal>
          <div>
            <span>Pan</span>
            <ul>
              <li>
                <code>CTRL</code> key + Trackpad movement
              </li>
              <li>Mouse wheel button + mouse movement</li>
            </ul>
          </div>
          <div>
            <span>Zoom</span>

            <ul>
              <li>Trackpad Vertical movement</li>
              <li>Mouse Wheel</li>
            </ul>
          </div>
          <div>
            <span>Add</span>
            <ul>
              <li>For vertex : click on empty space</li>
              <li>
                For Segment : Select a vertex, then click on Non-selected vertex
                or empty space
              </li>
            </ul>
          </div>
          <div>
            <span>Unselect</span>
            <ul>
              <li>right click a selected vertex</li>
            </ul>
          </div>
          <div>
            <span>Remove</span>
            <ul>
              <li>right click a unselected vertex</li>
            </ul>
          </div>
        </HelpModal>
        <SidePanel />
      </CanvasCantainer>
    </>
  );
}

export default App;
