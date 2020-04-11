require('dotenv').config();
const readline = require('readline');
const sphero = require('sphero');

// run one of the info scripts in the package.json to get the info of your device
// then create your .env and add UUID or BTADDRESS with the info form the info scripts
// see env.example for details of .env variables.
const sprkp = sphero(process.env.UUID, { timeout: 500 });

exports.handle = () => {
  sprkp.connect(() => {
    // roll(device, speed, direction);
    const stop = sprkp.roll.bind(sprkp, 0, 0);
    // roll(device, speed);
    const roll = sprkp.roll.bind(sprkp, 30);
    const stdin = process.stdin;

    readline.emitKeypressEvents(stdin);

    if (stdin.isTTY) {
      stdin.setRawMode(true);
    }
    stdin.resume();

    stdin.on('keypress', (str, key) => {
      if (key.ctrl && key.name === 'c') {
        process.exit();
      } else {
        console.log(`You pressed the "${str}" key`);

        if (key.ctrl && key.name === 't') {
          process.stdin.pause();
          process.exit();
        }

        if (key.name === 'e') {
          sprkp.startCalibration();
        }

        if (key.name === 'q') {
          sprkp.finishCalibration();
        }

        if (key.name === 'w') {
          roll(0);
          sprkp.color('green');
        }

        if (key.name === 's') {
          roll(180);
          sprkp.color('red');
        }

        if (key.name === 'a') {
          roll(270);
          sprkp.color('orange');
        }

        if (key.name === 'd') {
          roll(90);
          sprkp.color('blue');
        }

        if (key.name === 'space') {
          stop();
        }
      }
    });
  });
};
