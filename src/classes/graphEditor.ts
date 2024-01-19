import Graph from "./main/graph";
// import Segment from "./primitives/segment";
import Vertex from "./primitives/vertex";
import { getNearestSegment, getNearestVertex } from "../utils/util";
import Segment from "./primitives/segment";
import Viewport from "./main/viewport";
import VertexColorData from "./dataClass/VertexColorData";
import SegmentColorData from "./dataClass/SegmentColorData";

export enum Theme {
  light,
  dark,
  custom,
}

export type ISelect = Vertex | Segment | null;
interface IProxy {
  selected: ISelect;
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

  private ProxyS: { selected: ISelect };

  public selected: ISelect = null;

  public hovered: ISelect = null;
  // public hovered: Vertex | null = null;

  constructor(viewport: Viewport, graph: Graph, SelectFunction: Function) {
    this.viewport = viewport;
    this.canvas = viewport.canvas;
    this.graph = graph;
    this.ctx = this.canvas.getContext("2d")!;

    this.ProxyS = new Proxy<IProxy>(
      {
        selected: null,
      },
      {
        get: (target: IProxy, key: "selected") => {
          return target[key];
        },
        set: (
          target: IProxy,
          property: "selected",
          value: ISelect
        ): boolean => {
          SelectFunction(() => value);
          target[property] = value;
          return true;
        },
      }
    );

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

  private selectVexter(vertex: Vertex) {
    if (this.ProxyS.selected && this.ProxyS.selected instanceof Vertex) {
      this.graph.tryAddSegment(new Segment(this.ProxyS.selected, vertex));
    }
    this.ProxyS.selected = vertex;
  }
  private selectSegment(segment: Segment) {
    this.ProxyS.selected = segment;
  }
  public dispose() {
    this.graph.dispose();

    // this.selected = null;
    this.ProxyS.selected = null;

    this.hovered = null;
  }
  public autoSave() {
    localStorage.setItem("auto-save-graph", JSON.stringify(this.graph));
  }

  public loadGraph(GraphData: string) {
    this.graph = Graph.load(JSON.parse(GraphData));

    this.ProxyS.selected = null;
    this.hovered = null;
  }
  public setTheme(Theme_num: Theme) {
    this.EditorTheme = Theme_num;
  }

  private addEventListers() {
    this.canvas.addEventListener("mousedown", (event) => {
      if (event.button == 2) {
        //right click
        if (this.ProxyS.selected) {
          this.ProxyS.selected = null;
        } else if (this.hovered && this.hovered instanceof Vertex) {
          this.removeVertex(this.hovered);
        }
      }
      if (event.button == 0) {
        //left click
        if (this.hovered) {
          if (this.hovered instanceof Vertex) {
            this.selectVexter(this.hovered);
            this.dragging = true;
            return;
          } else {
            this.selectSegment(this.hovered);
            return;
          }
        }
        this.graph.addVertex(this.mouse!);
        this.selectVexter(this.mouse!);
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

      let temp: Vertex | Segment | null = getNearestVertex(
        this.mouse,
        this.graph.vertexs,
        22 * this.viewport.zoom
      );
      if (temp == null) {
        temp = getNearestSegment(
          this.mouse,
          this.graph.segments,
          16 * this.viewport.zoom
        );
      }

      this.hovered = temp;
      if (this.dragging == true && this.ProxyS.selected) {
        if (this.ProxyS.selected instanceof Vertex) {
          this.ProxyS.selected!.x = this.viewport.getMouse(location).x;
          this.ProxyS.selected!.y = this.viewport.getMouse(location).y;
        }
      }
    });
  }
  private removeVertex(vertex: Vertex) {
    this.graph.removeVertex(vertex);
    this.hovered = null;
    this.ProxyS.selected = null;
  }

  display() {
    if (this.ProxyS.selected && this.ProxyS.selected instanceof Segment) {
      this.ProxyS.selected.draw(this.ctx, this.EditorTheme, this.SegmentColor, {
        width: 2,
        isSelected: true,
      });
    }
    if (this.hovered instanceof Segment) {
      this.hovered.draw(this.ctx, this.EditorTheme, this.SegmentColor, {
        width: 2,
        isHover: true,
      });
    }
    this.graph.draw(
      this.ctx,
      this.EditorTheme,
      this.VertexColor,
      this.SegmentColor
    );
    if (this.ProxyS.selected && this.ProxyS.selected instanceof Vertex) {
      const intent = this.hovered
        ? this.hovered instanceof Vertex
          ? this.hovered
          : this.mouse!
        : this.mouse!;
      new Segment(this.ProxyS.selected, intent).draw(
        this.ctx,
        this.EditorTheme,
        this.SegmentColor,
        {
          width: 2,
          dash: [20, 15],
        }
      );
      this.ProxyS.selected.draw(this.ctx, this.EditorTheme, this.VertexColor, {
        isSelected: true,
      });
    }
    if (this.hovered instanceof Vertex) {
      this.hovered.draw(this.ctx, this.EditorTheme, this.VertexColor, {
        isHover: true,
      });
    }
  }
}
