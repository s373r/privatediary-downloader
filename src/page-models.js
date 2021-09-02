'use strict';

import dayjs from 'dayjs';
import { NodeType, parse } from 'node-html-parser';
import { Selector } from 'testcafe';

import { parseEntriesStatus } from './utils';

class LoginPage {
    constructor () {
        this.userNameInput = Selector('#UserName');
        this.passwordInput = Selector('#Password');
        this.loginButton = Selector('input[type=submit]');
    }
}

class MainPage {
    constructor () {
        this.entriesSummaryText = Selector('body >div.container.body-content > div:nth-child(2) > div.col-md-9');
        this.readMoreButtons = Selector('.media').find('.btn');
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

class NotePage {
    constructor() {
        this.noteDiv = Selector('.body-content > div:nth-child(2)').addCustomDOMProperties({
            innerHTML: el => el.innerHTML,
        });
    }

    async #getText() {
        const noteHtml = await this.noteDiv.innerHTML;

        return parse(noteHtml).childNodes
            .filter(({ nodeType }) => nodeType === NodeType.TEXT_NODE)
            .map(({ text }) => text.trim())
            .filter((text) => text !== '')
            .join('\n');
    }

    async getNote() {
        const text = await this.#getText()
        const titleElement = this.noteDiv.find('h3')
        const title = (await titleElement.innerText).trim();
        const timestampElement = this.noteDiv.find('.time-meta');
        const timestampValue = Number(await timestampElement.getAttribute('data-entrydate'));
        const timestamp = dayjs(timestampValue).format('YYYY-MM-DD HH:mm:ss')

        return {
            text,
            title,
            timestamp,
        };
    }
}

export {
    LoginPage,
    MainPage,
    NotePage,
}