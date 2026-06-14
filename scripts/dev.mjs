import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const command = process.platform === 'win32' ? 'cmd.exe' : 'npm';
const args = process.platform === 'win32' ? ['/d', '/s', '/c', 'npm.cmd run dev'] : ['run', 'dev'];
const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const processes = [
  { name: 'server', cwd: 'server', color: '\x1b[36m' },
  { name: 'client', cwd: 'client', color: '\x1b[35m' }
].map(({ name, cwd, color }) => {
  const child = spawn(command, args, {
    cwd: resolve(rootDir, cwd),
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: false
  });

  const prefix = `${color}[${name}]\x1b[0m`;

  child.stdout.on('data', data => {
    process.stdout.write(`${prefix} ${data}`);
  });

  child.stderr.on('data', data => {
    process.stderr.write(`${prefix} ${data}`);
  });

  child.on('exit', code => {
    if (code !== 0 && code !== null) {
      console.error(`${prefix} exited with code ${code}`);
      shutdown(code);
    }
  });

  return child;
});

function shutdown(code = 0) {
  for (const child of processes) {
    if (!child.killed) {
      child.kill();
    }
  }

  process.exit(code);
}

process.on('SIGINT', () => shutdown());
process.on('SIGTERM', () => shutdown());
