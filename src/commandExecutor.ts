import { exec, spawn } from 'child_process';
import { CommandConfig } from './types';

export class CommandExecutor {
  execute(command: CommandConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      const cmd = command.command
      const child = exec(cmd, { encoding: 'utf8' }, (error, stdout, stderr) => {
        if (error) {
          console.error(`执行命令时出错: ${error.message}`);
          return;
        }

        if (stderr) {
          console.error(`命令错误输出: ${stderr}`);
          return;
        }

        // 输出命令结果
        console.log(`命令输出结果:\n${stdout}`);
      });
    });
  }
}  