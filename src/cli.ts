import { program } from 'commander';
import { ConfigManager } from './configManager';
import { CommandExecutor } from './commandExecutor';
import inquirer from 'inquirer';
import { CommandConfig } from './types';

export class CLI {
  private configManager = new ConfigManager();
  private executor = new CommandExecutor();

  async run(): Promise<void> {
    program
      .command('list')
      .description('List all configured commands')
      .action(this.handleList.bind(this));

    program
      .command('e <shortName>')
      .description('Execute a command by short name')
      .action(this.handleExecute.bind(this));

    await program.parseAsync(process.argv);
  }

  private async handleList(): Promise<void> {
    const config = await this.configManager.loadConfig();
    if (config.commands.length === 0) {
      console.log('No commands configured.');
      return;
    }

    console.log('Configured commands:');
    config.commands.forEach((cmd, index) => {
      console.log(`[${index + 1}] ${cmd.shortName}: ${cmd.description}`);
    });

    const answer = await inquirer.prompt([
      {
        type: 'number',
        name: 'selection',
        message: 'Enter number to execute (0 to exit):',
        validate: (value) =>
          !isNaN(value) && value >= 0 && value <= config.commands.length || 'Invalid selection',
      },
    ]);

    if (answer.selection > 0) {
      const selectedCommand = config.commands[answer.selection - 1];
      await this.executor.execute(selectedCommand);
    }
  }

  private async handleExecute(shortName: string): Promise<void> {
    const config = await this.configManager.loadConfig();
    const command = config.commands.find((cmd) => cmd.shortName === shortName);

    if (!command) {
      console.error(`Command with short name "${shortName}" not found.`);
      process.exit(1);
    }

    await this.executor.execute(command);
  }
}  