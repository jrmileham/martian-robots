import * as readline from 'readline';

import Actions from '../actions/AppActions';
import { App } from '../app';


const INPUT_REGEX = {
  map: /^\d+\s\d+$/,
  robot: /^\d+\s\d+\s[N|E|S|W]$/i,
  instruction: /^[A-Z]+$/i,
}
const INPUT_MAP = {
  map: 'createMap',
  robot: 'startRobot',
  instruction: 'runRobot'
}

export default function startInterface(app: App): void {

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'INPUT> ',
    terminal: false

  });
  
  rl.prompt();
  rl.on('line', (line: string): void => {
    line.trim();
    let ok: boolean = false;
    for (let item in INPUT_REGEX){
      if(INPUT_REGEX[item].test(line)){
        ok = true;
        Actions[INPUT_MAP[item]](app, line);
      }
    }



    rl.prompt();
  }).on('close', () => {
    console.log('Have a great day!');
    process.exit(0);
  });
}

function processInput(line: string): void {
  const input = line.trim
}
