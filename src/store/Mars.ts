import Point, { GridPoint } from '../util/Point';
import Robot from './Robot';

const GRID_THRESHOLD = <Point>{x: 50, y:50};

export default class Mars {
  public readonly lostMarkers: Point[];
  public readonly maxPosition: GridPoint;
  public readonly robots: Robot[];

  constructor(size: GridPoint){
    this.robots = [];
    this.lostMarkers = [];

    this.maxPosition = this.sanitisePoint(size);
  }

  public addLostMarker(point: Point): void {
    if(this.findMarkerInLost(point)) return;
    this.lostMarkers.push(point);
  }

  private sanitisePoint(point: GridPoint): GridPoint {
    let { x, y } = point;
    x = (x > GRID_THRESHOLD.x)? GRID_THRESHOLD.x : x;
    y = (y > GRID_THRESHOLD.y)? GRID_THRESHOLD.y : y;
    return { x, y };
  }
  public findMarkerInLost(point: Point): Point | undefined {
    return this.lostMarkers.find((value: Point): boolean => (point.x === value.x && point.y === value.y && point.orientation === value.orientation));
  }
}