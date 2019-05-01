const fs = require('fs');
const contentFilePath   = './content.json';
const scriptFilePath    = './content/after-effects-script.js';

const save = content => {
    const contentString = JSON.stringify(content);
    return fs.writeFileSync(contentFilePath, contentString);
};

const saveScript = content => {
    const contentSting = JSON.stringify(content);
    const scriptStirng = `var content = ${contentSting}`;

    return fs.writeFileSync(scriptFilePath, scriptStirng);
};

const load = () => {
    const fileBuffer = fs.readFileSync(contentFilePath, 'utf-8');
    const contentJson = JSON.parse(fileBuffer);
    return contentJson;
};

module.exports = { save, saveScript, load };
