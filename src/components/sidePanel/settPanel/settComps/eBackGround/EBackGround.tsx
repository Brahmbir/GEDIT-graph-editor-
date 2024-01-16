import { GraphEditorInstance } from "../../../../Editor/Editor";
import styles from "./EBackGround.module.css";

import PInput from "../../../components/pInput/PInput";
import { ChangeEvent, useState } from "react";

export interface IEBackgroundProps {}

export default function EBackground(_props: IEBackgroundProps) {
  let viewPort = GraphEditorInstance?.viewport!;

  let isUseSolidColor = viewPort?.isUseSolidColor
    ? viewPort.isUseSolidColor
    : false;

  const [isStyleColor, setIsStyleColor] = useState(isUseSolidColor);
  const [isCustom, setIsCustom] = useState(false);

  const BGPatternHandler = (e: ChangeEvent) => {
    let option = Number((e.target as HTMLSelectElement).value);
    if (option < 0) {
      setIsCustom(() => true);
    } else {
      setIsCustom(() => false);
      viewPort.setBackGround(false, option);
    }
  };

  return (
    <>
      <PInput tittle="BackGround Style" forId="BGStyle">
        <div className={styles.btn}>
          <input
            defaultValue={viewPort.isUseSolidColor ? 1 : 0}
            type="checkbox"
            id="BGStyle"
            onChange={(e) => {
              setIsStyleColor(() => Boolean(e.target.checked));
            }}
            className={styles.checkbox}
          />
          <div className={styles.knobs}>
            <span>Image</span>
          </div>
        </div>
      </PInput>
      {isStyleColor ? (
        <PInput tittle="BG Color" forId="BGColor">
          <input
            id="BGColor"
            defaultValue={viewPort.BgSolidColor}
            onChange={(e) => {
              viewPort.setBackGround(true, e.target.value);
            }}
            type="color"
          />
        </PInput>
      ) : (
        <>
          <PInput tittle="BG Patterns" forId="BGFile">
            <select id="TToggle" onChange={BGPatternHandler}>
              <option value={0}>Green Cross</option>
              <option value={1}>Blue Box</option>
              <option value={2}>Gray Dot</option>
              <option value={3}>Hexagon</option>
              <option value={"-1"}>custom url</option>
            </select>
          </PInput>
          {isCustom && (
            <PInput tittle="BG Url" forId="BGUrl">
              <input
                accept="image/*"
                onChange={(e) => {
                  let Image = e.target as HTMLInputElement;
                  let ImageUrl = Image.files![0];
                  if (ImageUrl) {
                    viewPort.setBackGround(
                      false,
                      URL.createObjectURL(ImageUrl),
                      true
                    );
                  }
                }}
                id="BGUrl"
                type="file"
              />
            </PInput>
          )}
        </>
      )}
    </>
  );
}
