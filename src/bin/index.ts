#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import crypto from 'crypto';
import path from 'path';

// Initialisiere das Command-Programm
const program = new Command();

// Befehl zum Erzeugen eines neuen Secrets
program
  .command("secret")
  .description("Generate a new secret and save it in a .env file")
  .action(() => {
    const secret = crypto.randomBytes(32).toString("hex");
    const envPath = path.join(process.cwd(), ".env");
    const envContent = `# Mira Auth\nMIRA_SECRET="${secret}"`;

    fs.writeFileSync(envPath, envContent, { flag: "a" });
    console.log(`Secret generated and saved to ${envPath}`);
  });

// Verarbeite die übergebenen Argumente
program.parse(process.argv);