import { useState } from "react";
import FieldGroup from "../../../components/fieldGroup/FieldGroup";
import ETheme from "../eTheme/ETheme";
import PInput from "../../../components/pInput/PInput";
import { GraphEditorInstance } from "../../../../Editor/Editor";

export default function () {
  const [isCustomShow, setIsCustomShow] = useState(false);

  const Vertex = GraphEditorInstance?.VertexColor;
  const Segment = GraphEditorInstance?.SegmentColor;

  return (
    <>
      <FieldGroup tittle="mode">
        <ETheme toggle={setIsCustomShow} />
      </FieldGroup>
      <FieldGroup disable={!isCustomShow} tittle="Custom values">
        <>
          <span>Vertex</span>
          <PInput tittle="Stroke Color" forId="VSC">
            <input
              id="VSC"
              disabled={!isCustomShow}
              onChange={(e) => {
                Vertex?.SetStrokeC(e.target.value);
              }}
              defaultValue={Vertex?.V_StrokeColor[2]}
              type="color"
            />
          </PInput>
          <PInput tittle="Fill Color" forId="VFC">
            <input
              id="VFC"
              disabled={!isCustomShow}
              onChange={(e) => {
                Vertex?.SetFillC(e.target.value);
              }}
              defaultValue={Vertex?.V_FillColor[2]}
              type="color"
            />
          </PInput>
          {/* <PInput tittle="Text Color" forId="VTC">
            <input
              id="VTC"
              disabled={!isCustomShow}
              onChange={(e) => {
                Vertex?.SetTextC(e.target.value);
              }}
              defaultValue={Vertex?.V_TextColor[2]}
              type="color"
            />
          </PInput> */}
          <PInput tittle="Hover Vertex Color" forId="HSVC">
            <input
              id="HSVC"
              disabled={!isCustomShow}
              onChange={(e) => {
                Vertex?.SetHoverC(e.target.value);
              }}
              defaultValue={Vertex?.V_HoverFillColor[2]}
              type="color"
            />
          </PInput>
          <PInput tittle="Select Vertex Color" forId="SSVC">
            <input
              id="VTC"
              disabled={!isCustomShow}
              onChange={(e) => {
                Vertex?.SetSelectC(e.target.value);
              }}
              defaultValue={Vertex?.V_SelectGradientFillColor[2]}
              type="color"
            />
          </PInput>
        </>
        <>
          <span>Segment</span>
          <PInput tittle="Stroke Color" forId="SSC">
            <input
              id="SSC"
              disabled={!isCustomShow}
              onChange={(e) => {
                Segment?.SetStrokeC(e.target.value);
              }}
              defaultValue={Segment?.S_StrokeColor[2]}
              type="color"
            />
          </PInput>
          {/* <PInput tittle="Text Color" forId="STC">
            <input
              id="STC"
              disabled={!isCustomShow}
              onChange={(e) => {
                Segment?.SetTextC(e.target.value);
              }}
              defaultValue={Segment?.S_TextColor[2]}
              type="color"
            />
          </PInput> 
          <PInput tittle="Hover Segment Color" forId="HSSC">
            <input
              id="HSSC"
              disabled={!isCustomShow}
              onChange={(e) => {
                Segment?.SetHoverC(e.target.value);
              }}
              defaultValue={Segment?.S_HoverStrokeColor[2]}
              type="color"
            />
          </PInput>
          <PInput tittle="Select Segment Color" forId="SSSC">
            <input
              id="SSSC"
              disabled={!isCustomShow}
              onChange={(e) => {
                Segment?.SetSSelectC(e.target.value);
              }}
              defaultValue={Segment?.S_SelectStrokeColor[2]}
              type="color"
            />
            </PInput> */}
        </>
      </FieldGroup>
    </>
  );
}
