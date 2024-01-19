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
  isSelected?: boolean;
  isHover?: boolean;
}

export default class Segment {
  public v1: Vertex;
  public v2: Vertex;
  public value: number;

  constructor(v1: Vertex, v2: Vertex, Value: number = 1) {
    this.v1 = v1;
    this.v2 = v2;
    this.value = Value;
  }
  public center(): Point {
    return { x: (this.v1.x + this.v2.x) / 2, y: (this.v1.y + this.v2.y) / 2 };
  }
  public setValue(value: string) {
    let temp = Number.parseInt(value);

    this.value = Number.isNaN(temp) ? 0 : temp;
  }
  public equals(seg: Segment) {
    return this.includes(seg.v1) && this.includes(seg.v2);
  }

  public includes(node: Vertex) {
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

  public draw(
    ctx: CanvasRenderingContext2D,
    ETheme: Theme = Theme.light,
    COLOR: SegmentColorData,
    { width = 1.5, dash = [], isSelected = false, isHover = false }: SegmentDraw
  ) {
    const center = {
      x: (this.v1.x + this.v2.x) / 2,
      y: (this.v1.y + this.v2.y) / 2,
    };

    width = isSelected ? 3 : width;
    const Color = isSelected
      ? COLOR.S_SelectStrokeColor[ETheme]
      : COLOR.S_StrokeColor[ETheme];

    let metrics = ctx.measureText(this.value.toString());
    const TextW = metrics.width + 25;
    const TextH =
      metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent + 15;
    ctx.beginPath();
    ctx.lineWidth = width!;
    ctx.strokeStyle = Color;

    ctx.setLineDash(dash!);
    ctx.moveTo(this.v1.x, this.v1.y);

    if (dash?.length == 0) {
      // code for underline
      if (isHover || isSelected) {
        ctx.fillStyle = Color;

        ctx.fillRect(
          center.x - TextW * 0.25,
          center.y + TextH * 0.2,
          TextW * 0.5,
          2
        );
        ctx.fill();
      }

      let first = this.interSectionP(this.v1, center, TextW, TextH);
      ctx.lineTo(first.x, first.y);

      ctx.font = "17.5px roboto";
      ctx.textAlign = "center";

      ctx.fillStyle = COLOR.S_TextColor[ETheme];
      ctx.fillText(this.value.toString(), center.x, center.y + 3, TextW);

      let second = this.interSectionP(this.v2, center, TextW, TextH);

      ctx.fillStyle = Color;

      if (isSelected) {
        ctx.moveTo(first.x, first.y);
        ctx.arc(first.x, first.y, 2.5, 0, 2 * Math.PI);
        ctx.moveTo(second.x, second.y);
        ctx.arc(second.x, second.y, 2.5, 0, 2 * Math.PI);
        ctx.fill();
      }

      ctx.moveTo(second.x, second.y);
    }

    ctx.lineTo(this.v2.x, this.v2.y);
    ctx.stroke();
    ctx.closePath();

    ctx.setLineDash([]);
  }
}
