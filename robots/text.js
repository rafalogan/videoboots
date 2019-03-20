const algorithmia = require('algorithmia');
const algorithmiaApiKey = require('../credentials/algorithmia').apikey;
const sentenceBoundaryDetection = require('sbd');

async function robot(content) {
    await fetchContentFromWikipedia(content);
    sanitizeContent(content);
    breakContentIntoSenlinces(content);

    async function fetchContentFromWikipedia(content) {
        const algorithmiaAuthenticated = algorithmia(algorithmiaApiKey);
        const wikipediaAlgorithm = algorithmiaAuthenticated.algo('web/WikipediaParser/0.1.2');
        const wikipediaResponse = await wikipediaAlgorithm.pipe(content.searchTerm);
        const wikipediaContent = wikipediaResponse.get();

        content.sourceContentOriginal = wikipediaContent.content;
    }

    function sanitizeContent(content) {
        const withoutBlankLinesAndMarkdown = removeBlankLinesAndMarkdown(content.sourceContentOriginal);
        const withoutDatesInParentheses = renoveDatesInParentheses(withoutBlankLinesAndMarkdown);

        content.sourceContentSanitized = withoutDatesInParentheses;

        function removeBlankLinesAndMarkdown(text) {
            const allLines = text.split('\n');
            const whithoutBlankLinesAndMarkdown = allLines.filter( line => {
                if (line.trim().length === 0 || line.trim().startsWith('=')) return false;
                return true
            });

            return whithoutBlankLinesAndMarkdown.join(' ')
        }

        function renoveDatesInParentheses(text) {
            return text.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g,' ')
        }
    }

    function breakContentIntoSenlinces(content) {
        content.sentences = [];

        const sentences = sentenceBoundaryDetection.sentences(content.sourceContentSanitized)

        sentences.forEach(sentence => {
            content.sentences.push({
                text: sentence,
                keywords: [],
                imagens: []
            })
        });
    }
}

module.exports = robot;
