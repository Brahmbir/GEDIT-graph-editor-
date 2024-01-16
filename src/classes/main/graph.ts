import SegmentColorData from "../dataClass/SegmentColorData";
import VertexColorData from "../dataClass/VertexColorData";
import { Theme } from "../graphEditor";
import Segment from "../primitives/segment";
import Vertex from "../primitives/vertex";

export default class Graph {
  public vertexs: Vertex[];
  public segments: Segment[];

  constructor(vertexs: Vertex[] = [], segments: Segment[] = []) {
    this.vertexs = vertexs;
    this.segments = segments;
  }
  static load(info: { vertexs: Vertex[]; segments: Segment[] }) {
    const vertexs: Vertex[] = [];
    const segments: Segment[] = [];
    for (const vertexInfo of info.vertexs) {
      vertexs.push(new Vertex(vertexInfo.x, vertexInfo.y));
    }
    // Todo add id to verters and segment
    for (const segmentInfo of info.segments) {
      segments.push(
        new Segment(
          vertexs.find((v) => v.equals(segmentInfo.v1))!,
          vertexs.find((v) => v.equals(segmentInfo.v2))!
        )
      );
    }
    return new Graph(vertexs, segments);
  }

  addVertex(vertex: Vertex) {
    this.vertexs.push(vertex);
  }

  containsVertex(vertex: Vertex) {
    return this.vertexs.find((p) => p.equals(vertex));
  }

  tryAddVertex(vertex: Vertex) {
    if (!this.containsVertex(vertex)) {
      this.addVertex(vertex);
      return true;
    }
    return false;
  }

  removeVertex(vertex: Vertex) {
    const segs = this.getSegmentsWithVertex(vertex);
    for (const seg of segs) {
      this.removeSegment(seg);
    }
    this.vertexs.splice(this.vertexs.indexOf(vertex), 1);
  }

  addSegment(seg: Segment) {
    this.segments.push(seg);
  }

  containsSegment(seg: Segment) {
    return this.segments.find((s) => s.equals(seg));
  }

  tryAddSegment(seg: Segment) {
    if (!this.containsSegment(seg) && !seg.v1.equals(seg.v2)) {
      this.addSegment(seg);
      return true;
    }
    return false;
  }

  removeSegment(seg: Segment) {
    this.segments.splice(this.segments.indexOf(seg), 1);
  }

  getSegmentsWithVertex(vertex: Vertex) {
    const segs = [];
    for (const seg of this.segments) {
      if (seg.includes(vertex)) {
        segs.push(seg);
      }
    }
    return segs;
  }

  dispose() {
    this.vertexs.length = 0;
    this.segments.length = 0;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    ETheme: Theme,
    VertexColor: VertexColorData,
    SegmentColor: SegmentColorData
  ) {
    for (const seg of this.segments) {
      seg.draw(ctx, ETheme, SegmentColor, {
        dash: [],
      });
    }

    for (const vertex of this.vertexs) {
      vertex.draw(ctx, ETheme, VertexColor, {});
    }
  }
}
