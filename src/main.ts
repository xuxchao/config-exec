#!/usr/bin/env node
import { CLI } from './cli';

(async () => {
  try {
    const cli = new CLI();
    await cli.run();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();  