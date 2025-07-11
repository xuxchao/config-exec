import { spawn } from 'child_process';
import { CommandConfig } from './types';

export class CommandExecutor {
  execute(command: CommandConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      const [cmd, ...args] = command.command.split(' ');
      const child = spawn(cmd, args, { stdio: 'inherit' });

      child.on('close', (code) => {
        if (code !== 0) {
          reject(new Error(`Command failed with exit code ${code}`));
        } else {
          resolve();
        }
      });

      child.on('error', (err) => {
        reject(err);
      });
    });
  }
}  