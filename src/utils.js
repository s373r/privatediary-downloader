'use strict';

function parseEntriesStatus(rawEntriesSummaryText) {
    const regex = /Total entries: (\d+) \| Page: 1 of (\d+)/g;
    const match = regex.exec(rawEntriesSummaryText);
    const noteCount = match[1];
    const pageCount = match[2];

    return [noteCount, pageCount];
}

function parseNote(rawNoteText) {
    const noteLines = rawNoteText.split('\n');
    const title = noteLines[0];
    const timeStamp = noteLines[noteLines.length - 2].trim();
    const text = noteLines.slice(2, noteLines.length - 2).join('\n');

    return { title:title, timeStamp:timeStamp, text:text };
}

export { parseEntriesStatus, parseNote };