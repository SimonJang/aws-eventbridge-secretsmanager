#!/usr/bin/env zx

const fs = require('fs');
const path = require('path');

const secrets = fs.readFileSync(path.join(__dirname, 'secrets.txt'));

const secretsList = secrets.toString()
    .split('\n')
    .filter(line => line.trim())

for (const secret of secretsList) {
    await $`aws secretsmanager delete-secret --secret-id ${secret}`;
}

$`rm ${path.join(__dirname, 'secrets.txt')}`;