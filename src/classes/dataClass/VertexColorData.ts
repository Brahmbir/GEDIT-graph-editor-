import { Color } from "../graphEditor";

export default class VertexColorData {
  public V_StrokeColor: Color = ["#11552b", "#040505", "#5a2651"];
  public V_FillColor: Color = ["#22aa55", "#343995", "#69c8f8"];
  public V_HoverFillColor: Color = ["#1d954b", "#2a309d", "#0982be"];
  public V_SelectGradientFillColor: Color = ["#ffffff", "#040505", "#c8715b"];

  public V_TextColor: Color = ["#222222", "#cccccc", "#000000"];

  constructor(data?: {
    V_StrokeColor: Color;
    V_FillColor: Color;
    V_TextColor: Color;
    V_HoverFillColor: Color;
    V_SelectGradientFillColor: Color;
  }) {
    if (data) {
      this.V_StrokeColor = data.V_StrokeColor;
      this.V_FillColor = data.V_FillColor;
      this.V_TextColor = data.V_TextColor;
      this.V_HoverFillColor = data.V_HoverFillColor;
      this.V_SelectGradientFillColor = data.V_SelectGradientFillColor;
    }
  }

  public static Init() {
    let NeededKeys = [
      "V_StrokeColor",
      "V_FillColor",
      "V_TextColor",
      "V_HoverFillColor",
      "V_SelectGradientFillColor",
    ];
    let data = localStorage.getItem("VertexColor-Data");

    if (!data) return new VertexColorData();

    let VColor = JSON.parse(data);

    if (NeededKeys.every((key) => Object.keys(VColor).includes(key))) {
      return new VertexColorData(VColor);
    } else {
      return new VertexColorData();
    }
  }

  public SetStrokeC(Color: string) {
    this.V_StrokeColor[2] = Color;
    this.Save();
  }
  public SetFillC(Color: string) {
    this.V_FillColor[2] = Color;
    this.Save();
  }
  public SetTextC(Color: string) {
    this.V_TextColor[2] = Color;
    this.Save();
  }
  public SetHoverC(Color: string) {
    this.V_HoverFillColor[2] = Color;
    this.Save();
  }
  public SetSelectC(Color: string) {
    this.V_SelectGradientFillColor[2] = Color;
    this.Save();
  }
  private Save() {
    localStorage.setItem("VertexColor-Data", JSON.stringify(this));
  }
}
