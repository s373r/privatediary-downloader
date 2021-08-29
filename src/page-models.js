'use strict';

import { Selector } from 'testcafe';

import { parseEntriesStatus, parseNote } from './utils';

export class LoginPage {
    constructor () {
        this.userNameInput = Selector('#UserName');
        this.passwordInput = Selector('#Password');
        this.loginButton = Selector('input[type=submit]');
    }
}

export class MainPage {
    constructor () {
        this.entriesSummaryText = Selector('body >div.container.body-content > div:nth-child(2) > div.col-md-9');
        this.readMoreButtons = Selector('a').filter((node) => node.textContent === 'Read more ');
    }

    async getEntriesStatus() {
        const rawEntriesSummaryText = await this.entriesSummaryText.textContent;

        return parseEntriesStatus(rawEntriesSummaryText);
    }

    async hrefForEachReadMoreButtons(callback) {
        const readMoreButtonsCount = await this.readMoreButtons.count;

        for (let i = 0; i < readMoreButtonsCount; ++i) {
            const readMoreButton = this.readMoreButtons.nth(i);
            const href = await readMoreButton.getAttribute('href');

            callback(href);
        }
    }
}

export class NotePage {
    constructor() {
        // Because of !@#ing "Uncaught ReferenceError: jQuery is not defined"
        // on "http://privatediary.net/Records/Edit/", therefore we have the hard way :(
        this.noteText = Selector('body > div.container.body-content > div:nth-child(2)');
    }

    async getNote() {
        const rawNoteText = await this.noteText.innerText;

        return parseNote(rawNoteText);
    }
}