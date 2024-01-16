import Graph from "./main/graph";
// import Segment from "./primitives/segment";
import Vertex from "./primitives/vertex";
import { getNearestVertex } from "../utils/util";
import Segment from "./primitives/segment";
import Viewport from "./main/viewport";
import VertexColorData from "./dataClass/VertexColorData";
import SegmentColorData from "./dataClass/SegmentColorData";

export enum Theme {
  light,
  dark,
  custom,
}

export type Color = [string, string, string];

export default class GraphEditor {
  public viewport: Viewport;

  public EditorTheme: Theme = Theme.light;

  // Color Data
  public VertexColor: VertexColorData;
  public SegmentColor: SegmentColorData;

  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public graph: Graph;
  public dragging = false;
  public mouse: Vertex | null = null;

  public font = new FontFace("roboto", "url(Roboto-Regular.ttf)");

  //   public selected: Vertex | Segment | null = null;
  public selected: Vertex | null = null;
  //   public hovered: Vertex | Segment | null = null;
  public hovered: Vertex | null = null;

  constructor(viewport: Viewport, graph: Graph) {
    this.viewport = viewport;
    this.canvas = viewport.canvas;
    this.graph = graph;
    this.ctx = this.canvas.getContext("2d")!;

    // Color inti
    this.VertexColor = VertexColorData.Init();
    this.SegmentColor = SegmentColorData.Init();

    this.font.load().then(
      (font) => {
        document.fonts.add(font);
      },
      (err) => {
        console.error(err);
      }
    );
    this.addEventListers();
  }
  private select(vertex: Vertex) {
    if (this.selected) {
      this.graph.tryAddSegment(new Segment(this.selected, vertex));
    }
    this.selected = vertex;
  }
  public dispose() {
    this.graph.dispose();
    this.selected = null;
    this.hovered = null;
  }
  public autoSave() {
    localStorage.setItem("auto-save-graph", JSON.stringify(this.graph));
  }

  public loadGraph(GraphData: string) {
    this.graph = Graph.load(JSON.parse(GraphData));
    this.selected = null;
    this.hovered = null;
  }
  public setTheme(Theme_num: Theme) {
    this.EditorTheme = Theme_num;
  }

  private addEventListers() {
    this.canvas.addEventListener("mousedown", (event) => {
      if (event.button == 2) {
        //right click
        if (this.selected) {
          this.selected = null;
        } else if (this.hovered) {
          this.removeVertex(this.hovered);
        }
      }
      if (event.button == 0) {
        //left click
        if (this.hovered) {
          this.select(this.hovered);
          this.dragging = true;
          return;
        }
        this.graph.addVertex(this.mouse!);
        this.select(this.mouse!);
        this.hovered = this.mouse;
      }
    });
    this.canvas.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
    this.canvas.addEventListener("mouseup", () => {
      this.dragging = false;
    });
    this.canvas.addEventListener("mousemove", (location) => {
      this.mouse = this.viewport.getMouseAsVertex(location);

      this.hovered = getNearestVertex(
        this.mouse,
        this.graph.vertexs,
        22 * this.viewport.zoom
      );
      if (this.dragging == true && this.selected) {
        this.selected.x = this.viewport.getMouse(location).x;
        this.selected.y = this.viewport.getMouse(location).y;
      }
    });
  }
  private removeVertex(vertex: Vertex) {
    this.graph.removeVertex(vertex);
    this.hovered = null;
    this.selected = null;
  }

  display() {
    this.graph.draw(
      this.ctx,
      this.EditorTheme,
      this.VertexColor,
      this.SegmentColor
    );
    if (this.selected) {
      const intent = this.hovered ? this.hovered : this.mouse!;
      new Segment(this.selected, intent).draw(
        this.ctx,
        this.EditorTheme,
        this.SegmentColor,
        {
          width: 2,
          dash: [20, 15],
        }
      );
      this.selected.draw(this.ctx, this.EditorTheme, this.VertexColor, {
        isSelected: true,
      });
    }
    if (this.hovered) {
      this.hovered.draw(this.ctx, this.EditorTheme, this.VertexColor, {
        isHover: true,
      });
    }
  }
}
