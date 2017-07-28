/**
 * Created by s373r on 26/07/17.
 */

'use strict';

import { Selector } from 'testcafe';

import { LoginPage, MainPage, NotePage } from './page-models';
import * as fs from 'fs';

fixture `Getting Started`
    .page `http://privatediary.net/`;

test('Grub notes', async t => {
    //
    // Login
    //

    const loginPage = new LoginPage();

    const userName = 'jyhifnkgb_emltmp.com';
    const password = 'jyhifnkgb@emltmp.com';

    await t
        .typeText(loginPage.userNameInput, userName)
        .typeText(loginPage.passwordInput, password)
        .click   (loginPage.loginButton);

    const createNewEntryButtonExist =
        Selector('a').filter(node => node.textContent === 'Create new entry').exists;

    // checks success of auth
    await t.expect(createNewEntryButtonExist).ok();

    //
    // Grub notes URLs
    //

    const mainPage      = new MainPage();

    const entriesStatus = await mainPage.getEntriesStatus();
    const noteCount     = entriesStatus[0];
    const pageCount     = entriesStatus[1];

    await t.expect(noteCount).notEql(0);

    let   noteUrls      = [];

    // iterates pages and grubs note URLs
    for (let pageNo = 1; pageNo <= pageCount; ++pageNo) {
        // start page is first page
        if (pageNo !== 1) {
            await t.navigateTo('/?page=' + pageNo);
        }

        await mainPage.hrefForEachReadMoreButtons(href => noteUrls.push(href));
    }

    // checks count of notes
    await t.expect(noteCount).eql(noteUrls.length.toString());

    //
    // Grub notes
    //

    const notePage = new NotePage();

    let   notes    = [];

    for (let index in noteUrls) {
        await t.navigateTo(noteUrls[index]);

        notes.push(await notePage.getNote());
        console.log(notes);
    }

    //
    // Save to a file
    //

    const stream = fs.createWriteStream('output/' + userName + '.txt');
    stream.once('open', (fd) => {
        stream.write('Generated by https://github.com/s373r/privatediary-downloader\n');
        stream.write('\n');

        for (let index in notes) {
            const note = notes[index];

            stream.write(note.title  + '\n');
            stream.write(note.timeStamp + '\n');
            stream.write(note.text + '\n');
            stream.write('\n');
        }

        stream.end();
    });
});
