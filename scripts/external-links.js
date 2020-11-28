'use strict';

const fs = require('fs');

const findReplace = [,
    [new RegExp('\\bPluggableMap\\b', 'g'), '[PluggableMap](https://openlayers.org/en/latest/apidoc/module-ol_PluggableMap-PluggableMap.html)']
];

const paramRegex = /^-\s+`[a-zA-Z0-9]+` \*\*/;
const returnRegex = /^Returns \*\*/;
const extendsRegex = /^\*\*Extends/;

function main() {
    if (process.argv.length < 3) {
        console.warn('Please specify a FILE to process.')
        return;
    }
    var fileName = process.argv[2];
    var contents = fs.readFileSync(fileName, 'utf8');
    var lines = contents.split(/\r?\n/)
    lines = lines.map(function(line) {
        var updateLine = paramRegex.test(line) || returnRegex.test(line) || extendsRegex.test(line);
        if (updateLine) {
            // console.log(line);
            findReplace.forEach(function(findReplace) {
                const find = findReplace[0];
                const replace = findReplace[1];
                line = line.replace(find, replace);
            });
            // console.log(line);
        }
        return line;
    });
    fs.writeFileSync(fileName, lines.join('\n'), {encoding: "utf8"});
}

main();