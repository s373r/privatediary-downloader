'use strict';

import { createWriteStream } from 'fs';
import { mkdir } from 'fs/promises';
import { join } from 'path';

import { Selector } from 'testcafe';

import { LoginPage, MainPage, NotePage } from './page-models';

const OUTPUT_DIR = 'output';

async function createDirectoryIfNeeded(directory) {
    try {
        await mkdir(directory)
    } catch (e) {
        if (e.code !== 'EEXIST') {
            throw e;
        }
    }
}

fixture `Getting Started`
    .page `http://privatediary.net/`;

test('Grub notes', async (t) => {
    console.log();

    //
    // Login
    //

    const loginPage = new LoginPage();
    const user = process.env['PDD_USER'];
    const password = process.env['PDD_PASSWORD'];

    await t
        .typeText(loginPage.userNameInput, user)
        .typeText(loginPage.passwordInput, password)
        .click(loginPage.loginButton);

    const searchInputExist = Selector('#search').exists;

    // checks success of auth
    await t.expect(searchInputExist).ok();

    //
    // Grub notes URLs
    //

    const mainPage = new MainPage();
    const entriesStatus = await mainPage.getEntriesStatus();
    const noteCount = entriesStatus[0];
    const pageCount = entriesStatus[1];

    console.log(`ℹ️ Found ${noteCount} note(s) from ${pageCount} page(s)`);

    await t.expect(noteCount).notEql(0);

    const noteUrls = [];

    // iterates pages and grubs note URLs
    for (let pageNo = 1; pageNo <= pageCount; ++pageNo) {
        // start page is first page
        if (pageNo !== 1) {
            await t.navigateTo('/?page=' + pageNo);
        }

        await mainPage.hrefForEachReadMoreButtons((href) => noteUrls.push(href));
    }

    // checks count of notes
    await t.expect(noteCount).eql(noteUrls.length);

    //
    // Grub notes
    //

    const notePage = new NotePage();
    const notes = [];

    console.log(`ℹ️ Processing notes...`);

    for (const noteUrl of noteUrls) {
        await t.navigateTo(noteUrl);

        const note = await notePage.getNote()

        console.log(`   • ${note.title} ✔️`)

        notes.push(note);
    }

    console.log(`ℹ️ Processing notes... ✔️`);

    //
    // Save to a file
    //

    await createDirectoryIfNeeded(OUTPUT_DIR);

    const outputFilenamePath = join(OUTPUT_DIR, `${user}.txt`)
    const stream = createWriteStream(outputFilenamePath);

    stream.once('open', () => {
        stream.write('Generated by https://github.com/s373r/privatediary-downloader\n');
        stream.write(`Version: ${process.env['PDD_VERSION']}\n`);
        stream.write('\n');

        const sortingKind = process.env['PDD_SORT'];
        const sortedNotes = sortingKind === 'desc'
            ? notes // already sorted
            : notes.reverse();

        for (const { title, timestamp, text } of sortedNotes) {
            stream.write(`${title}\n`);
            stream.write(`${timestamp}\n`);
            stream.write(`${text}\n`);
            stream.write('\n');
        }

        stream.end();
    });

    console.log();
});
