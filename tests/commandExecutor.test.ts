import { describe, expect, it, vi } from 'vitest';
import { CommandExecutor } from '../src/commandExecutor';
import { spawn } from 'child_process';

vi.mock('child_process');

describe('CommandExecutor', () => {
  let executor: CommandExecutor;
  let spawnMock: vi.Mock;

  beforeEach(() => {
    executor = new CommandExecutor();
    spawnMock = vi.mock.fn();
    (spawn as vi.Mock).mockImplementation(spawnMock);
  });

  it('should execute command', async () => {
    const mockProcess = {
      on: vi.fn().mockImplementation((event, callback) => {
        if (event === 'close') callback(0);
        return mockProcess;
      }),
      stdio: [null, null, null]
    };
    spawnMock.mockReturnValue(mockProcess);

    await executor.execute({ shortName: 'test', command: 'echo hello', description: 'Test' });
    expect(spawnMock).toHaveBeenCalledWith('echo', ['hello'], { stdio: 'inherit' });
  });

  it('should reject on non-zero exit code', async () => {
    const mockProcess = {
      on: vi.fn().mockImplementation((event, callback) => {
        if (event === 'close') callback(1);
        return mockProcess;
      }),
      stdio: [null, null, null]
    };
    spawnMock.mockReturnValue(mockProcess);

    await expect(executor.execute({ shortName: 'test', command: 'false', description: 'Fail' })).rejects.toThrow();
  });

  it('should reject on error', async () => {
    const mockProcess = {
      on: vi.fn().mockImplementation((event, callback) => {
        if (event === 'error') callback(new Error('Process error'));
        return mockProcess;
      }),
      stdio: [null, null, null]
    };
    spawnMock.mockReturnValue(mockProcess);

    await expect(executor.execute({ shortName: 'test', command: 'invalid', description: 'Invalid' })).rejects.toThrow();
  });
});  