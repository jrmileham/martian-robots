import Mars from '../store/Mars';
import { Orientation } from '../util/Point';
import Robot from '../store/Robot';
import { App } from '../app';

export default class AppActions {
  public static createMap(app: App, input: string): void {
    const data: string[] = input.split(' ');
    app.mars = new Mars({x: parseInt(data[0]), y: parseInt(data[1])});
  }
  public static startRobot(app: App, input: string): void {
    const data: string[] = input.split(' ');
    if(!AppActions.marsCheck(app)) return;
    const orientation: number = Orientation.indexOf(data[2])
    app.currentRobot = new Robot({x: parseInt(data[0]), y: parseInt(data[1]), orientation}, app.mars!);
  }
  public static runRobot(app: App, input: string): void {
    if(!AppActions.marsCheck(app)) return;
    if(!app.currentRobot) {
      console.error(' ** NO ROBOT ** ');
      return
    };
    app.currentRobot.processInstruction(input);
    console.log('OUTPUT> ', app.currentRobot.printPrintPostion());
  }

  private static marsCheck(app: App): boolean {
    if(!app.mars){
      console.error(' ** NO MARS **');
      return false;
    }
    return true;
  }
}