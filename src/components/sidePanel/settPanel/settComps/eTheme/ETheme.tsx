import { ChangeEvent } from "react";
import { GraphEditorInstance } from "../../../../Editor/Editor";
import { Theme } from "../../../../../classes/graphEditor";
import PInput from "../../../components/pInput/PInput";

interface IETheme {
  toggle: (fun: () => boolean) => void;
}

export default function ETheme({ toggle }: IETheme) {
  const Mode = (e: ChangeEvent) => {
    let theme = (e.target as HTMLSelectElement).value;
    if (theme == Theme.custom.toString()) {
      toggle(() => true);
    } else {
      toggle(() => false);
    }
    GraphEditorInstance?.setTheme(Number.parseInt(theme) as Theme);
  };
  return (
    <PInput forId="Mode" tittle="Editor Theme">
      <select id="Mode" onChange={Mode}>
        <option value={Theme.light}>light</option>
        <option value={Theme.dark}>dark</option>
        <option value={Theme.custom}>custom</option>
      </select>
    </PInput>
  );
}
