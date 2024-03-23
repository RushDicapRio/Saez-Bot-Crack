const colors = require('colors');

/**
 * @param {string} string 
 * @param {'info' | 'err' | 'warn' | 'done' | undefined} style
 */
const log = (string, style) => {
    switch (style) {
        case 'info': {
            console.log(colors.blue('[INFO] ' + string));
            break;
        };
        case 'err': {
            console.error(colors.red('[ERREUR] ' + string));
            break;
        };
        case 'warn': {
            console.warn(colors.yellow('{ATTENTION] ' + string));
            break;
        };
        case 'done': {
            console.log(colors.green('[SUCCES] ' + string));
            break;
        };
        default: {
            console.log(string);
            break;
        };
    };
};

/**
 * @param {number} time
 * @param {import('discord.js').TimestampStylesString} style 
 * @returns {`<t:${string}>`}
 */
const time = (time, style) => {
    return `<t:${Math.floor(time / 1000)}${style ? `:${style}` : ''}`;
};

module.exports = {
    log, 
    time
};