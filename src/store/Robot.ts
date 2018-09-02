import Point from '../util/Point';
import Mars from './Mars';

export const Orientation: ReadonlyArray<string> = Object.freeze(['N','E','S','W']);
export const INSTRUCTION_REGEX: RegExp = /[^RLF]/gi
export enum INSTRUCTION_TO_FUNCTION {
  L = 'turnInstruction',
  R = 'turnInstruction',
  F = 'moveInstruction'
};

export default class Robot {
  public isLost: boolean;
  public instruction: string;
  public orientation: number;
  public position: Point;
  private mars: Mars;

  constructor(position: Point, orientation: number, mars: Mars){
    this.orientation = orientation;
    this.isLost = false;
    this.instruction = '';
    this.position = position;
    this.mars = mars;
  }

  public processInstruction(instruction: string): void {
    const self = this;
    this.instruction = this.sanitiseInstuction(instruction);
    this.instruction.split('').forEach( (ins: string): void => {
      self[INSTRUCTION_TO_FUNCTION[ins]](ins);
    });
  }
  private turnInstruction(turn: string): void {
    if(turn === 'L'){
      this.orientation = (this.orientation === 0)? Orientation.length - 1 : this.orientation - 1;
    } else {
      this.orientation = (this.orientation === Orientation.length - 1)? 0 : this.orientation + 1;
    }
  }
  private moveInstruction(move: string): void {
    const { x, y} = this.position;
    const newPosition: Point = { x, y };
    switch(this.orientation) {
      case 0 :
        newPosition.y++;
        break;
      case 1 :
        newPosition.x++;
        break;
      case 2 :
        newPosition.y--;
        break;
      default :
        newPosition.x--;
    }
    // Don't move if the new position is a lost marker
    if(this.mars.findMarkerInLost(newPosition))return;

    // Check of lost
    if(newPosition.x > this.mars.maxPosition.x || newPosition.y > this.mars.maxPosition.y ){
      this.isLost = true;
      this.mars.lostMarkers.push(this.position);
    }
    this.position = newPosition;
  }
  private sanitiseInstuction(instruction: string): string {
    const sanitised: string = instruction.replace(INSTRUCTION_REGEX, '').toUpperCase();
    return (sanitised.length > 100)? sanitised.substr(0, 100) : sanitised;
  }

}