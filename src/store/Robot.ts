import Point from '../util/Point';

export enum Orientation {
  NORTH = 'N',
  EAST = 'E',
  SOUTH = 'S',
  WEST = 'W'
}

export default class Robot {
  public orientation: Orientation;
  public isLost: boolean;
  public position: Point;

  constructor(position: Point, orientation: Orientation){
    this.orientation = orientation;
    this.isLost = false;
    this.position = position;
  }
}