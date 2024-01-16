lineIntersectionOnRect(width, height, xB, yB, xA, yA) {
    var w = width / 2;
    var h = height / 2;

    var dx = xA - xB;
    var dy = yA - yB;

    //if A=B return B itself
    if (dx == 0 && dy == 0)
        return {
            x: xB,
            y: yB,
        };

    var tan_phi = h / w;
    var tan_theta = Math.abs(dy / dx);

    //tell me in which quadrant the A point is
    var qx = Math.sign(dx);
    var qy = Math.sign(dy);

    if (tan_theta > tan_phi) {
        xI = xB + (h / tan_theta) * qx;
        yI = yB + h * qy;
    } else {
        xI = xB + w * qx;
        yI = yB + w * tan_theta * qy;
    }

    return {
        x: xI,
        y: yI,
    };
}

  private InterSection(line1: Line, line2: Line): Point | null {
    let denominator =
        (line2.point2.y - line2.point1.y) * (line1.point2.x - line1.point1.x) -
        (line2.point2.x - line2.point1.x) * (line1.point2.y - line1.point1.y);

    let ua =
        ((line2.point2.x - line2.point1.x) * (line1.point1.y - line2.point1.y) -
            (line2.point2.y - line2.point1.y) * (line1.point1.x - line2.point1.x)) /
        denominator;
    let ub =
        ((line1.point2.x - line1.point1.x) * (line1.point1.y - line2.point1.y) -
            (line1.point2.y - line1.point1.y) * (line1.point1.x - line2.point1.x)) /
        denominator;
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
        return null;
    }
    return {
        x: line1.point1.x + ua * (line1.point2.x - line1.point1.x),
        y: line1.point1.y + ua * (line1.point2.y - line1.point1.y),
    };
}

  private RectMidPoint(v1: Vertex, v2: Vertex): Point {
    return { x: (v1.x + v2.x) / 2, y: (v1.y + v2.y) / 2 };
}

  private getMidPoints(line: Line, rectPoints: Point[]) {
    let points = new Set();
    for (let i = 0; i < rectPoints.length; i++) {
        let temp = this.InterSection(line, {
            point1: rectPoints[i],
            point2: rectPoints[(i + 1) % rectPoints.length],
        });
        if (temp) {
            points.add(temp);
        }
    }
    return Array.from(points);
}

  private Rect4Points(mid: Point, width: number, height: number): Point[] {
    const halfW = width / 2;
    const halfH = height / 2;
    return [
        { x: mid.x - halfW, y: mid.y - halfH },
        { x: mid.x + halfW, y: mid.y - halfH },
        { x: mid.x + halfW, y: mid.y + halfH },
        { x: mid.x - halfW, y: mid.y + halfH },
    ];
}
  private Neraest(Ver1: Vertex, PArray: Point[]) {
    if (
        Math.hypot(Ver1.x - PArray[0].x, Ver1.y - PArray[0].y) <
        Math.hypot(Ver1.x - PArray[1].x, Ver1.y - PArray[1].y)
    ) {
        return [PArray[0], PArray[1]];
    }
    return [PArray[1], PArray[0]];
}

  private disConnect() {
    const mid = {
        x: (this.v1.x + this.v2.x) / 2,
        y: (this.v1.y + this.v2.y) / 2,
    };
}