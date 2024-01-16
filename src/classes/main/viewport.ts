import { subtract, add, scale } from "../../utils/util";
import Vertex from "../primitives/vertex";

interface Point {
  x: number;
  y: number;
}

export default class Viewport {
  public canvas;
  public ctx;
  public zoom = 1;

  public isUseSolidColor: boolean = false;
  public BgSolidColor: string = "#111111";
  private BgPattern: CanvasPattern | null = null;
  private matrix = new DOMMatrix([1, 0, 0, 1, 0, 0]);

  public center: Point;
  public offset: Point;
  public drag = {
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    active: false,
  };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    // image function here
    this.LoadImage(BGImage[0]);

    this.center = {
      x: this.canvas.clientWidth / 2,
      y: this.canvas.clientHeight / 2,
    };
    this.offset = scale(this.center, -1);
    this.addEventListeners();
    this.Resize();
  }

  public setBackGround(
    setIsUseSolidColor: boolean,
    Background: number | string,
    revoke: boolean = false
  ): void {
    if (setIsUseSolidColor == false) {
      // it is a image background
      if (typeof Background === "number") {
        this.LoadImage(BGImage[Background]);
      } else {
        // console.log(Background);
        this.LoadImage(Background, revoke);
      }
    } else {
      // it is a color background
      this.BgSolidColor = Background as string;
    }
    this.isUseSolidColor = setIsUseSolidColor;
  }

  public getMouse(event: MouseEvent, subtractDragOffset = false) {
    const vertex = {
      x: (event.offsetX - this.center.x) * this.zoom - this.offset.x,
      y: (event.offsetY - this.center.y) * this.zoom - this.offset.y,
    };
    return subtractDragOffset ? subtract(vertex, this.drag.offset) : vertex;
  }

  public getMouseAsVertex(event: MouseEvent): Vertex {
    const vertex = {
      x: (event.offsetX - this.center.x) * this.zoom - this.offset.x,
      y: (event.offsetY - this.center.y) * this.zoom - this.offset.y,
    };
    return new Vertex(
      vertex.x - this.drag.offset.x,
      vertex.y - this.drag.offset.y
    );
  }

  public getOffset() {
    return add(this.offset, this.drag.offset);
  }

  public reset() {
    const offset = this.getOffset();
    this.ctx?.restore();
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.isUseSolidColor) {
      this.ctx!.fillStyle = this.BgSolidColor;
    } else {
      if (this.BgPattern) {
        this.BgPattern.setTransform(
          this.matrix
            .translate(this.center.x, this.center.y)
            .scale((1 / this.zoom) * 1)
            .translate(offset.x, offset.y)
        );
        this.ctx!.fillStyle = this.BgPattern;
      }
    }
    this.ctx!.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx?.save();
    this.ctx?.translate(this.center.x, this.center.y);
    this.ctx?.scale(1 / this.zoom, 1 / this.zoom);
    this.ctx?.translate(offset.x, offset.y);
  }
  private LoadImage(url: string, revoke?: boolean) {
    const img = new Image();
    img.src = url;

    img.onload = () => {
      this.BgPattern = this.ctx!.createPattern(img, "repeat");
      if (revoke) {
        URL.revokeObjectURL(url);
      }
    };
    img.onerror = (e) => {
      console.error(e);
    };
  }
  private Resize() {
    var elementHeight = this.canvas.clientHeight,
      elementWidth = this.canvas.clientWidth;

    var action = () => {
      //do the check here and call some external event function or something.
      this.setViweportSize();
      this.setCenter();
    };
    window.addEventListener("resize", () => {
      if (
        this.canvas.clientHeight !== elementHeight ||
        this.canvas.clientWidth !== elementWidth
      ) {
        action();
      }
    });
  }
  private setViweportSize() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
  }

  private setCenter() {
    this.center = {
      x: this.canvas.clientWidth / 2,
      y: this.canvas.clientHeight / 2,
    };
  }

  private mouseWheelHandler(event: WheelEvent) {
    if (event.ctrlKey) {
      this.offset = add(this.offset, { x: -event.deltaX, y: -event.deltaY });
      // scale -= e.deltaY * 0.01;
    } else {
      const direction = Math.sign(event.deltaY);
      const step = 0.1;
      this.zoom += direction * step;
      this.zoom = Math.max(1, Math.min(5, this.zoom));
    }
  }
  private mouseDownHandler(event: WheelEvent) {
    if (event.button == 1) {
      this.drag.start = this.getMouse(event);
      this.drag.active = true;
    }
  }
  private mouseMoveHandler(event: WheelEvent) {
    if (this.drag.active) {
      this.drag.end = this.getMouse(event);
      this.drag.offset = subtract(this.drag.end, this.drag.start);
    }
  }
  private mouseUpHandler() {
    if (this.drag.active) {
      this.offset = add(this.offset, this.drag.offset);
      this.drag = {
        start: { x: 0, y: 0 },
        end: { x: 0, y: 0 },
        offset: { x: 0, y: 0 },
        active: false,
      };
    }
  }

  private addEventListeners() {
    this.canvas.addEventListener("wheel", (e) =>
      this.mouseWheelHandler(e as WheelEvent)
    );
    this.canvas.addEventListener("mousedown", (e) =>
      this.mouseDownHandler(e as WheelEvent)
    );
    this.canvas.addEventListener("mousemove", (e) =>
      this.mouseMoveHandler(e as WheelEvent)
    );
    this.canvas.addEventListener("mouseup", () => {
      this.mouseUpHandler();
    });
  }
}

let BGImage = ["pattern1.svg", "pattern0.svg", "pattern2.svg", "pattern3.svg"];
