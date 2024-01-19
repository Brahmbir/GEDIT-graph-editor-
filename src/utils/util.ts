import Segment from "../classes/primitives/segment";
import Vertex from "../classes/primitives/vertex";

interface Point {
  x: number;
  y: number;
}

function distance(p1: Vertex | Point, p2: Vertex | Point) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

export function getNearestVertex(
  loc: Vertex,
  vertexs: Vertex[],
  threshold = Number.MAX_SAFE_INTEGER
): Vertex | null {
  let shortestDistance = Number.MAX_SAFE_INTEGER;
  let nearest: Vertex | null = null;
  for (const vertex of vertexs) {
    let dist = distance(vertex, loc);
    if (dist < shortestDistance && dist < threshold) {
      shortestDistance = dist;
      nearest = vertex;
    }
  }
  return nearest;
}
export function getNearestSegment(
  center: Vertex,
  segments: Segment[],
  threshold = Number.MAX_SAFE_INTEGER
): Segment | null {
  let shortestDistance = Number.MAX_SAFE_INTEGER;
  let nearest: Segment | null = null;
  for (const segment of segments) {
    let dist = distance(segment.center(), center);
    if (dist < shortestDistance && dist < threshold) {
      shortestDistance = dist;
      nearest = segment;
    }
  }
  return nearest;
}

export function add(p1: Point, p2: Point): Point {
  return { x: p1.x + p2.x, y: p1.y + p2.y };
}
export function subtract(p1: Point, p2: Point): Point {
  return { x: p1.x - p2.x, y: p1.y - p2.y };
}
export function scale(p1: Point, sca: number) {
  return { x: p1.x * sca, y: p1.y * sca };
}

// export function add(p1: Vertex, p2: Vertex) {
//   return new Vertex(p1.x + p2.x, p1.y + p2.y);
// }
// export function subtract(p1: Vertex, p2: Vertex) {
//   return new Vertex(p1.x - p2.x, p1.y - p2.y);
// }
// export function scale(p1: Vertex, sca: number) {
//   return new Vertex(p1.x * sca, p1.y * sca);
// }
