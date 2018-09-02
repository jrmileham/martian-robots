import Point from '../util/Point';
import Robot from './Robot';

const GRID_THRESHOLD = <Point>{x: 50, y:50};

export default class Mars {
  public readonly lostMarkers: Point[];
  public readonly maxPosition: Point;
  public readonly robots: Robot[];

  constructor(size: Point){
    this.robots = [];
    this.lostMarkers = [];

    this.maxPosition = this.sanitisePoint(size);
  }

  public addLostMarker(point: Point): void {
    const pointExists: Point | undefined = this.lostMarkers.find((value: Point): boolean => (point.x === value.x && point.y === value.y));
    if(pointExists) return;
    this.lostMarkers.push(point);
  }

  private sanitisePoint(point: Point): Point {
    let { x, y } = point;
    x = (x > GRID_THRESHOLD.x)? GRID_THRESHOLD.x : x;
    y = (y > GRID_THRESHOLD.y)? GRID_THRESHOLD.y : y;
    return {x, y};
  }
}