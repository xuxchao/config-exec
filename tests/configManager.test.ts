import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ConfigManager } from '../src/configManager';
import fs from 'fs/promises';

vi.mock('fs/promises');
vi.mock('path', () => ({
  join: vi.fn(() => '/home/user/.ceconfig.json'),
}));

describe('ConfigManager', () => {
  let configManager: ConfigManager;

  beforeEach(() => {
    configManager = new ConfigManager();
    vi.clearAllMocks();
  });

  it('should load existing config', async () => {
    const mockConfig = { commands: [{ shortName: 'test', command: 'echo test', description: 'Test command' }] };
    (fs.readFile as vi.Mock).mockResolvedValueOnce(JSON.stringify(mockConfig));

    const config = await configManager.loadConfig();
    expect(config).toEqual(mockConfig);
  });

  it('should return empty config if file does not exist', async () => {
    (fs.readFile as vi.Mock).mockRejectedValueOnce(new Error('File not found'));

    const config = await configManager.loadConfig();
    expect(config).toEqual({ commands: [] });
  });

  it('should save config', async () => {
    const mockConfig = { commands: [] };
    const writeFileMock = vi.fn();
    (fs.writeFile as vi.Mock).mockImplementation(writeFileMock);

    await configManager.saveConfig(mockConfig);
    expect(writeFileMock).toHaveBeenCalledWith(
      '/home/user/.ceconfig.json',
      JSON.stringify(mockConfig, null, 2)
    );
  });
});  