import { useRef, useState } from "react";
import styles from "./SidePanel.module.css";

import { IoSaveOutline } from "react-icons/io5";
import SavePanel from "./savePanel/SavePanel";
import SettingPanel from "./settPanel/SettPanel";

export interface ISidePanelProps {}

export default function SidePanel(_props: ISidePanelProps) {
  // const AllPanels: string[] = ["save/load", "algorithm", "setting"];
  const AllPanels: string[] = ["save/load", "setting"];

  const Panel = useRef<null | HTMLDivElement>(null);

  const [currentPanel, setCurrentPanel] = useState(AllPanels[0]);

  const handlePanelAction = (Pname?: string) => {
    if (Pname === currentPanel) {
      if (Panel.current?.getAttribute("data-visible") === "false") {
        Panel.current?.setAttribute("data-visible", "true");
      } else {
        Panel.current?.setAttribute("data-visible", "false");
      }
    } else {
      setCurrentPanel(() => Pname!);
      if (Panel.current?.getAttribute("data-visible") === "false") {
        Panel.current?.setAttribute("data-visible", "true");
      }
    }
  };

  const Button = ({
    Pname,
    Icon,
    dataIsCurrent,
  }: {
    dataIsCurrent: boolean;
    Pname: string;
    Icon?: JSX.Element;
  }) => {
    return (
      <button
        data-current={dataIsCurrent}
        onClick={() => {
          handlePanelAction(Pname);
        }}
      >
        <h3>{Pname}</h3>
        {Icon}
      </button>
    );
  };

  return (
    <div ref={Panel} data-visible="false" className={styles.panelContainer}>
      <div className={styles.btnArray}>
        {AllPanels.map((value, index) => {
          return (
            <Button
              dataIsCurrent={value === currentPanel}
              key={"ff" + index}
              Pname={value}
              Icon={<IoSaveOutline />}
            />
          );
        })}
      </div>
      <div className={styles.panel}>
        <PanelComponent Panel={currentPanel} />
      </div>
      {/* <div className={styles.pside}>
      </div> */}
    </div>
  );
}

const PanelComponent = ({ Panel }: { Panel: string }) => {
  switch (Panel) {
    case "save/load":
      return <SavePanel />;

    case "algorithm":
      return <>algorithm</>;

    case "setting":
      return <SettingPanel />;

    default:
      return <>404</>;
  }
};
