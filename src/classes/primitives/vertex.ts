import VertexColorData from "../dataClass/VertexColorData";
import { Theme } from "../graphEditor";

interface vertexDraw {
  size?: number;
  isSelected?: boolean;
  isHover?: boolean;
}
export default class Vertex {
  public x: number;
  public y: number;
  public name: string;

  // public id

  // * all Colors for Vertex

  constructor(x: number, y: number, name: string = "Ab") {
    this.x = x;
    this.y = y;
    this.name = name;
  }

  equals(node: Vertex | { x: number; y: number; name: string }) {
    return this.x == node.x && this.y == node.y;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    ETheme: Theme = Theme.light,
    COLOR: VertexColorData,
    { size = 45, isSelected = false, isHover = false }: vertexDraw
  ) {
    const rad = size / 2;
    if (isSelected) {
      ctx.save();
      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        rad,
        this.x,
        this.y,
        rad + 30
      );
      // Add three color stops
      gradient.addColorStop(0, `${COLOR.V_SelectGradientFillColor[ETheme]}99`);
      gradient.addColorStop(
        0.5,
        `${COLOR.V_SelectGradientFillColor[ETheme]}00`
      );
      gradient.addColorStop(1, "#00000000");
      ctx.fillStyle = gradient;
      ctx.fillRect(this.x - rad - 15, this.y - rad - 15, size + 30, size + 30);
      ctx.restore();
    }
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = COLOR.V_StrokeColor[ETheme];
    ctx.fillStyle = COLOR.V_FillColor[ETheme];

    if (isHover) {
      ctx.fillStyle = COLOR.V_HoverFillColor[ETheme];
    }

    ctx.arc(this.x, this.y, rad, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.font = "22px roboto";
    ctx.textAlign = "center";

    // ctx.fillStyle = COLOR.V_TextColor[ETheme];
    // ctx.fillText(this.name, this.x, this.y + rad / 4, size);
    ctx.restore();
  }
}
