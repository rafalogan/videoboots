const algorithmia = require('algorithmia');

function robot(contnet) {
    fetchContentFromWikipedia(contnet);
    // sanitizeContent(contnet);
    // breakContentIntoSenlinces(contnet);

    function fetchContentFromWikipedia(content) {
        const algorithmiaAuthenticated = algorithmia('API KEY TEMPORARIA');
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2');
        const wikipediaResponse =  wikipediaAlgorithm.pipe(content.searchTerm);
        const wikipediaContent = wikipediaResponse.get();

        console.log(wikipediaContent);
    }
}

module.exports = robot;
