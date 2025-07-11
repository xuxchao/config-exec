export interface CommandConfig {
  shortName: string;
  command: string;
  description: string;
}

export interface ConfigFile {
  commands: CommandConfig[];
}  