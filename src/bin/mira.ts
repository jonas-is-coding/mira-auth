#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs");
const nodeCrypto = require("crypto");
const path = require("path");
const dotenv = require("dotenv");

const program = new Command();

program
  .command("secret")
  .description("Generate a new secret and save it in a .env file")
  .action(() => {
    const secret = nodeCrypto.randomBytes(32).toString("hex");    
    const envPath = path.join(process.cwd(), ".env");
    const envContent = `# Mira Auth\nMIRA_SECRET = "${secret}"`;

    fs.writeFileSync(envPath, envContent, { flag: "a" });
    console.log(`Secret generated and saved to ${envPath}`);
  });

program.parse(process.argv);
