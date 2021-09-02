'use strict';

function parseEntriesStatus(rawEntriesSummaryText) {
    const regex = /.*: (\d+) \| .*: 1 .* (\d+)$/m;
    const match = regex.exec(rawEntriesSummaryText);
    const noteCount = match[1];
    const pageCount = match[2];

    return [+noteCount, +pageCount];
}

export {
    parseEntriesStatus,
};