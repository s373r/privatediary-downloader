import path from 'path';
import { fileURLToPath } from 'url';

import createTestCafe from 'testcafe';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const testcafe = await createTestCafe();

try {
    const runner = testcafe.createRunner();
    const mainPath = path.join(__dirname, 'main.js');

    await runner
        .src(mainPath)
        .browsers(['chrome'])
        .run();
}  finally {
    await testcafe.close();
}