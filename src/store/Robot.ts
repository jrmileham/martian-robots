import Point from '../util/Point';

export const Orientation: ReadonlyArray<string> = Object.freeze(['N','E','S','W']);
export const INSTRUCTION_REGEX: RegExp = /[^RLF]/gi
export enum INSTRUCTION_TO_FUNCTION {
  L = 'turnInstruction',
  R = 'turnInstruction',
  F = 'moveInstruction'
};

export default class Robot {
  public readonly isLost: boolean;
  public instruction: string;
  public orientation: number;
  public readonly position: Point;

  constructor(position: Point, orientation: number){
    this.orientation = orientation;
    this.isLost = false;
    this.instruction = '';
    this.position = position;
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
    switch(this.orientation) {
      case 0 :
        this.position.y++;
        break;
      case 1 :
        this.position.x++;
        break;
      case 2 :
        this.position.y--;
        break;
      default :
        this.position.x--;
    }
  }
  private sanitiseInstuction(instruction: string): string {
    const sanitised: string = instruction.replace(INSTRUCTION_REGEX, '').toUpperCase();
    return (sanitised.length > 100)? sanitised.substr(0, 100) : sanitised;
  }

}