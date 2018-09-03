import { expect } from 'chai';

import Actions from '../src/actions/AppActions';
import Mars from '../src/store/Mars';
import { App } from '../src/app'

describe('Functional Test', function(): void {
  const app: App = {
    mars: undefined,
    currentRobot: undefined
  };
  beforeEach(function(): void {
    Actions.createMap(app, '5 3');
  });
  it('Create Mars', function(): void {
    expect(app.mars).to.not.be.undefined;
  });
  it('Move Robot', function(): void {
    Actions.startRobot(app, '1 1 E');
    Actions.runRobot(app, 'RFRFRFRF');
    expect(app.mars).to.not.be.undefined;
    expect(app.currentRobot).to.not.be.undefined;
    expect(app.currentRobot!.printPrintPostion()).to.equal('1 1 E');
  });
  it('Move multiple Robot', function(): void {
    Actions.startRobot(app, '1 1 E');
    Actions.runRobot(app, 'RFRFRFRF');
    expect(app.currentRobot).to.not.be.undefined;
      expect(app.currentRobot!.printPrintPostion()).to.equal('1 1 E');

    Actions.startRobot(app, '3 2 N');
    Actions.runRobot(app, 'FRRFLLFFRRFLL');
    expect(app.currentRobot).to.not.be.undefined;
      expect(app.currentRobot!.printPrintPostion()).to.equal('3 3 N LOST');

    Actions.startRobot(app, '0 3 W');
    Actions.runRobot(app, 'LLFFFLFLFL');

    expect(app.currentRobot).to.not.be.undefined;
      expect(app.currentRobot!.printPrintPostion()).to.equal('2 3 S');
  });
});