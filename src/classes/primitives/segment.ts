import SegmentColorData from "../dataClass/SegmentColorData";
import { Theme } from "../graphEditor";
import Vertex from "./vertex";
interface Point {
  x: number;
  y: number;
}
interface SegmentDraw {
  width?: number;
  dash?: number[];
}

export default class Segment {
  public v1: Vertex;
  public v2: Vertex;
  public value: number = 1;
  constructor(v1: Vertex, v2: Vertex) {
    this.v1 = v1;
    this.v2 = v2;
  }
  equals(seg: Segment) {
    return this.includes(seg.v1) && this.includes(seg.v2);
  }

  includes(node: Vertex) {
    return this.v1.equals(node) || this.v2.equals(node);
  }
  private interSectionP(
    Point: Vertex,
    Center: Point,
    Width: number,
    Height: number
  ) {
    // Coordinates Translated
    let Px = Math.abs(Point.x - Center.x);
    let Py = Math.abs(Point.y - Center.y);

    let Pm = Py / Px;
    let Rm = Height / Width;

    let res: [number, number] = [0, 0];

    if (!(Px < Width / 2 && Py < Height / 2)) {
      if (Pm <= Rm) {
        res[0] = Width / 2;
        res[1] = (Width * Pm) / 2;
      } else {
        res[0] = Height / (Pm * 2);
        res[1] = Height / 2;
      }
      if (Point.x - Center.x < 0) res[0] *= -1;
      if (Point.y - Center.y < 0) res[1] *= -1;
    }
    return { x: res[0] + Center.x, y: res[1] + Center.y };
  }

  draw(
    ctx: CanvasRenderingContext2D,
    ETheme: Theme = Theme.light,
    COLOR: SegmentColorData,
    { width, dash }: SegmentDraw
  ) {
    const center = {
      x: (this.v1.x + this.v2.x) / 2,
      y: (this.v1.y + this.v2.y) / 2,
    };

    let metrics = ctx.measureText(this.value.toString());
    const TextW = metrics.width + 10;
    let TextH =
      metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent + 15;
    ctx.beginPath();
    ctx.lineWidth = width!;
    ctx.strokeStyle = COLOR.S_StrokeColor[ETheme];
    ctx.setLineDash(dash!);
    ctx.moveTo(this.v1.x, this.v1.y);

    // ! remove false

    if (false && dash?.length == 0) {
      ctx.font = "17.5px roboto";
      ctx.textAlign = "center";

      ctx.fillStyle = COLOR.S_TextColor[ETheme];
      ctx.fillText(this.value.toString(), center.x, center.y + 6, TextW + 15);
      let first = this.interSectionP(this.v1, center, TextW, TextH);
      ctx.lineTo(first.x, first.y);

      let second = this.interSectionP(this.v2, center, TextW, TextH);
      ctx.moveTo(second.x, second.y);
    }

    ctx.lineTo(this.v2.x, this.v2.y);
    ctx.stroke();
    ctx.closePath();

    ctx.setLineDash([]);
  }
}
