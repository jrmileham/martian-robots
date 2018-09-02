import { expect } from 'chai';

import Robot, { Orientation } from '../src/store/Robot';

describe('Test Robot', function(): void {
  it('Clean out bad instructions', function(): void {
    const robot: Robot = new Robot({x:5, y:5}, 0);
    
    robot.processInstruction('FRARL');
    expect(robot.instruction).to.equal('FRRL');

    robot.processInstruction('FR2!+RL');
    expect(robot.instruction).to.equal('FRRL');

    robot.processInstruction('FRARLfar');
    expect(robot.instruction).to.equal('FRRLFR');
  });
  it('Can only process 100 instructions', function(): void {
    const robot: Robot = new Robot({x:5, y:5}, 0);
    
    robot.processInstruction('FR2RLL');
    expect(robot.instruction).to.equal('FRRLL');
    

    robot.processInstruction('FRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLL12345');
    expect(robot.instruction).to.equal('FRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLL');
    
    robot.processInstruction('FRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLL12345FRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFFFFF');
    expect(robot.instruction).to.equal('FRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLL');
    expect(robot.instruction.length).to.equal(100);
  });
  it('Can turn left', function(): void {
    const robot: Robot = new Robot({x:5, y:5}, 0);
    
    robot.processInstruction('L');
    expect(robot.orientation).to.equal(3);

    robot.processInstruction('R');
    expect(robot.orientation).to.equal(0);

    robot.processInstruction('G');
    expect(robot.orientation).to.equal(0);
  });
  it('Can move forward', function(): void {
    const robot: Robot = new Robot({x:5, y:5}, 3);
    
    robot.processInstruction('F');
    expect(robot.orientation).to.equal(3);
    expect(robot.position).to.deep.equal({x:4, y:5});

    robot.processInstruction('LF');
    expect(robot.orientation).to.equal(2);
    expect(robot.position).to.deep.equal({x:4, y:4});

    robot.processInstruction('LF');
    expect(robot.orientation).to.equal(1);
    expect(robot.position).to.deep.equal({x:5, y:4});
  });
});
