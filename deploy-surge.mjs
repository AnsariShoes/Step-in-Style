import { spawn } from 'child_process';

const child = spawn('npx.cmd', ['surge', './dist', 'ansarishoes.surge.sh'], {
  stdio: ['pipe', 'pipe', 'pipe'],
  env: { ...process.env, SURGE_LOGIN: 'ansarishoes123@yopmail.com' }
});

child.stdout.on('data', (data) => {
  const str = data.toString();
  console.log(str);
  if (str.toLowerCase().includes('password')) {
    child.stdin.write('Password123!\n');
  }
});

child.stderr.on('data', (data) => {
  console.error(data.toString());
});

child.on('close', (code) => {
  console.log(`Surge exited with code ${code}`);
});
