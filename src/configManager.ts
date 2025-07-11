import fs from 'fs/promises';
import path from 'path';
import { ConfigFile } from './types';

const CONFIG_FILE_NAME = '.ceconfig.json';
const CONFIG_PATH = path.join(process.env.HOME || '', CONFIG_FILE_NAME);

console.log('CONFIG_PATH', CONFIG_PATH)

export class ConfigManager {
  async loadConfig(): Promise<ConfigFile> {
    try {
      const data = await fs.readFile(CONFIG_PATH, 'utf-8');
      return JSON.parse(data) as ConfigFile;
    } catch (error) {
      return { commands: [] };
    }
  }

  async saveConfig(config: ConfigFile): Promise<void> {
    await fs.writeFile(CONFIG_PATH, JSON.stringify(config, null, 2));
  }
}  