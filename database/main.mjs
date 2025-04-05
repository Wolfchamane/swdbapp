#!/usr/bin/env node

import { existsSync, statSync, readdirSync } from 'node:fs';
import path from 'node:path';

const generatorsFolderPath = path.resolve(process.cwd(), 'database', 'generators');

(async () => {
    if (!existsSync(generatorsFolderPath) || !statSync(generatorsFolderPath).isDirectory()) {
        console.error('[@swdbapp/database] DB generators folder does not exists!');
        process.exit(1);
    }

    const generators = readdirSync(generatorsFolderPath);
    for (const generator of generators) {
        const generatorFilePath = path.resolve(generatorsFolderPath, generator);
        await import(generatorFilePath);
    }

    process.exit(0);
})();
