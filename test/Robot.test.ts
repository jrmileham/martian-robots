import { expect } from 'chai';

import Mars from '../src/store/Mars';
import Robot from '../src/store/Robot';

describe('Test Robot', function(): void {
  let mars: Mars;

  beforeEach( function(): void {
    mars = new Mars({x: 20, y:20});
  });

  it('Clean out bad instructions', function(): void {
    const robot: Robot = new Robot({x:5, y:5, orientation: 0}, mars);
    
    robot.processInstruction('FRARL');
    expect(robot.instruction).to.equal('FRRL');

    robot.processInstruction('FR2!+RL');
    expect(robot.instruction).to.equal('FRRL');

    robot.processInstruction('FRARLfar');
    expect(robot.instruction).to.equal('FRRLFR');
  });
  it('Can only process 100 instructions', function(): void {
    const robot: Robot = new Robot({x:5, y:5, orientation: 0}, mars);
    
    robot.processInstruction('FR2RLL');
    expect(robot.instruction).to.equal('FRRLL');
    

    robot.processInstruction('FRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLL12345');
    expect(robot.instruction).to.equal('FRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLL');
    
    robot.processInstruction('FRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLL12345FRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFFFFF');
    expect(robot.instruction).to.equal('FRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLL');
    expect(robot.instruction.length).to.equal(100);
  });
  it('Can turn left', function(): void {
    const robot: Robot = new Robot({x:5, y:5, orientation: 0}, mars);
    
    robot.processInstruction('L');
    expect(robot.position.orientation).to.equal(3);

    robot.processInstruction('R');
    expect(robot.position.orientation).to.equal(0);

    robot.processInstruction('G');
    expect(robot.position.orientation).to.equal(0);
  });
  it('Can move forward', function(): void {
    const robot: Robot = new Robot({x:5, y:5, orientation: 3}, mars);
    
    robot.processInstruction('F');
    expect(robot.position).to.deep.equal({x:4, y:5, orientation: 3});

    robot.processInstruction('LF');
    expect(robot.position).to.deep.equal({x:4, y:4, orientation: 2});

    robot.processInstruction('LF');
    expect(robot.position).to.deep.equal({x:5, y:4, orientation: 1});
  });
  it('Can be lost', function(): void {
    const robot: Robot = new Robot({x:10, y:20, orientation: 0}, mars);
    expect(robot.isLost).to.be.false;
    
    robot.processInstruction('F');
    expect(robot.isLost).to.be.true;
    expect(robot.position).to.deep.equal({x:10, y:20, orientation: 0});

  });
  it('Ignores move to go lost if marker', function(): void {
    const robot_1: Robot = new Robot({x:10, y:20, orientation: 0}, mars);
    const robot_2: Robot = new Robot({x:10, y:19, orientation: 0}, mars);
    robot_1.processInstruction('F');

    expect(robot_2.isLost).to.be.false;
    expect(mars.lostMarkers.length).to.equal(1);
    expect(mars.lostMarkers[0]).to.deep.equal({x:10, y:20, orientation: 0});

    robot_2.processInstruction('FRF');
    expect(robot_2.position.orientation).to.equal(1);
    expect(robot_2.isLost).to.be.false;
    expect(robot_2.position).to.deep.equal({x:11, y:19, orientation: 1});
  });
  it('Prints its status', function(): void {
    const robot_1: Robot = new Robot({x:10, y:20, orientation: 0}, mars);
    const robot_2: Robot = new Robot({x:10, y:19, orientation: 0}, mars);
    robot_1.processInstruction('F');
    robot_2.processInstruction('FRF');

    expect(robot_1.printPrintPostion()).to.equal('10 20 N LOST');
    expect(robot_2.printPrintPostion()).to.equal('11 19 E');
  });
});
