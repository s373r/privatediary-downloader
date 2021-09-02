import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

import createTestCafe from 'testcafe';
import { Command, Option } from 'commander';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const { version } = JSON.parse(readFileSync(packageJsonPath, { encoding: 'utf8'}));
const program = new Command();

// NOTE: since we run a test it is OK to set env vars
process.env['PDD_VERSION'] = version;

program
    .version(version)
    .requiredOption('-u <user>')
    .requiredOption('-p <password>')
    .option('-b [browser]', 'specify browser to launch', 'firefox')
    .addOption(
        new Option('-s, --sort [kind]', 'change output sorting kind')
            .choices(['asc', 'desc'])
            .default('desc')
    );

program.parse(process.argv);

const {
    u: user,
    p: password,
    b: browser,
    sort,
} = program.opts();

process.env['PDD_USER'] = user;
process.env['PDD_PASSWORD'] = password;
process.env['PDD_SORT'] = sort;

const testcafe = await createTestCafe();

try {
    const runner = testcafe.createRunner();
    const mainPath = path.join(__dirname, 'main.js');

    await runner
        .src(mainPath)
        .browsers([browser])
        .run();
}  finally {
    await testcafe.close();
}
