import Point, { Orientation } from '../util/Point';
import Mars from './Mars';

export const INSTRUCTION_REGEX: RegExp = /[^RLF]/gi
export enum INSTRUCTION_TO_FUNCTION {
  L = 'turnInstruction',
  R = 'turnInstruction',
  F = 'moveInstruction'
};

export default class Robot {
  public isLost: boolean;
  public instruction: string;
  public position: Point;
  private mars: Mars;
  private lostMarkers: Point[];

  constructor(position: Point, mars: Mars){
    this.isLost = false;
    this.instruction = '';
    this.position = position;
    this.mars = mars;
    this.lostMarkers = [];
  }

  public processInstruction(instruction: string): void {
    const self = this;
    this.instruction = this.sanitiseInstuction(instruction);
    this.instruction.split('').forEach( (ins: string): void => {
      if(!this.isLost){
        self[INSTRUCTION_TO_FUNCTION[ins]](ins);
      }
    });
    if(this.lostMarkers.length > 0) {
      this.lostMarkers.forEach( (point: Point): void => this.mars.addLostMarker(point));
    }
  }
  private turnInstruction(turn: string): void {
    if(turn === 'L'){
      this.position.orientation = (this.position.orientation === 0)? (Orientation.length - 1) : (this.position.orientation - 1);
    } else {
      this.position.orientation = (this.position.orientation === (Orientation.length - 1))? 0 : (this.position.orientation + 1);
    }
  }
  private moveInstruction(move: string): void {
    const { x, y, orientation } = this.position;
    const newPosition: Point = { x, y, orientation };
    switch(this.position.orientation) {
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
      this.lostMarkers.push(this.position);
    } else {
      this.isLost = false;
      this.position = newPosition;
    }
  }
  private sanitiseInstuction(instruction: string): string {
    const sanitised: string = instruction.replace(INSTRUCTION_REGEX, '').toUpperCase();
    return (sanitised.length > 100)? sanitised.substr(0, 100) : sanitised;
  }
  public printPrintPostion(): string {
    const { isLost, position  } = this;
    const { x, y, orientation } = position;
    return `${x} ${y} ${Orientation[orientation]}${(isLost)? ' LOST': ''}`
  }
 
}