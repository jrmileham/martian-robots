import startInterface from './view/interface';
import Mars from './store/Mars';
import Robot from './store/Robot';

export interface App {
  mars: Mars | undefined;
  currentRobot: Robot | undefined;
}

export const app: App = {
  mars: undefined,
  currentRobot: undefined
}

startInterface(app);
