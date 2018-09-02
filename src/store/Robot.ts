import Point from '../util/Point';

export enum Orientation {
  NORTH = 'N',
  EAST = 'E',
  SOUTH = 'S',
  WEST = 'W'
}
export const INSTRUCTION_REGEX: RegExp = /[^RLF]/gi

export default class Robot {
  public readonly isLost: boolean;
  public instruction: string;
  public readonly orientation: Orientation;
  public readonly position: Point;

  constructor(position: Point, orientation: Orientation){
    this.orientation = orientation;
    this.isLost = false;
    this.instruction = '';
    this.position = position;
  }

  public processInstruction(instruction: string): void {
    this.instruction = this.sanitiseInstuction(instruction);
  }
  private sanitiseInstuction(instruction: string): string {
    const sanitised: string = instruction.replace(INSTRUCTION_REGEX, '').toUpperCase();

    return (sanitised.length > 100)? sanitised.substr(0, 100) : sanitised;
  }

}