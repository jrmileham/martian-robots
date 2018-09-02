import { expect } from 'chai';

import Robot, { Orientation } from '../src/store/Robot';

describe('Test Robot', function(): void {
  it('Clean out bad instructions', function(): void {
    const robot: Robot = new Robot({x:5, y:5}, Orientation.NORTH);
    
    robot.processInstruction('FRARL');
    expect(robot.instruction).to.equal('FRRL');

    robot.processInstruction('FR2!+RL');
    expect(robot.instruction).to.equal('FRRL');

    robot.processInstruction('FRARLfar');
    expect(robot.instruction).to.equal('FRRLFR');
  });
  it('Can only process 100 instructions', function(): void {
    const robot: Robot = new Robot({x:5, y:5}, Orientation.NORTH);
    
    robot.processInstruction('FR2RLL');
    expect(robot.instruction).to.equal('FRRLL');
    

    robot.processInstruction('FRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLL12345');
    expect(robot.instruction).to.equal('FRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLL');
    
    robot.processInstruction('FRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLL12345FRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFFFFF');
    expect(robot.instruction).to.equal('FRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLLFRRLL');
    expect(robot.instruction.length).to.equal(100);
  });
});
