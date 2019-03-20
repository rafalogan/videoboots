const robots = {
    userInput: require('./robots/userInput'),
    text: require('./robots/text')
};

async function start() {
    const content = {
        maximunSentences: 7
    };

    robots.userInput(content);
    await robots.text(content);

    console.log(content);
}

start();
