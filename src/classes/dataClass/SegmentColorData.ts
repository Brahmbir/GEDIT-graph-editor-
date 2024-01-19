import { Color } from "../graphEditor";

export default class SegmentColorData {
  public S_StrokeColor: Color = ["#22aa55", "#6571ca", "#fdede1"];
  public S_TextColor: Color = ["#22aa55", "#6571ca", "#fdede1"];

  public S_HoverStrokeColor: Color = ["#2a5", "", ""];
  public S_SelectStrokeColor: Color = ["#2a5", "", ""];

  constructor(data?: {
    S_StrokeColor: Color;
    S_TextColor: Color;
    S_HoverStrokeColor: Color;
    S_SelectStrokeColor: Color;
  }) {
    if (data) {
      this.S_StrokeColor = data.S_StrokeColor;
      this.S_TextColor = data.S_TextColor;
      this.S_HoverStrokeColor = data.S_HoverStrokeColor;
      this.S_SelectStrokeColor = data.S_SelectStrokeColor;
    }
  }

  public static Init() {
    let NeededKeys = [
      "S_StrokeColor",
      "S_TextColor",
      "S_HoverStrokeColor",
      "S_SelectStrokeColor",
    ];
    let data = localStorage.getItem("SegmentColor-Data");

    if (!data) return new SegmentColorData();

    let VColor = JSON.parse(data);

    if (NeededKeys.every((key) => Object.keys(VColor).includes(key))) {
      return new SegmentColorData(VColor);
    } else {
      return new SegmentColorData();
    }
  }

  public SetStrokeC(Color: string) {
    this.S_StrokeColor[2] = Color;
    this.Save();
  }
  public SetTextC(Color: string) {
    this.S_TextColor[2] = Color;
    this.Save();
  }
  public SetHoverC(Color: string) {
    this.S_HoverStrokeColor[2] = Color;
    this.Save();
  }
  public SetSSelectC(Color: string) {
    this.S_SelectStrokeColor[2] = Color;
    this.Save();
  }
  private Save() {
    localStorage.setItem("SegmentColor-Data", JSON.stringify(this));
  }
}
