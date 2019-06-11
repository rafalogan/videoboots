const algorithmia = require('algorithmia');
const algorithmiaApiKey = require('../credentials/algorithmia').apikey;
const sentenceBoundaryDetection = require('sbd');

const watsonApiKey = require('../credentials/watson-nlu').apikey;
const naturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1');

const nlu = new naturalLanguageUnderstandingV1({
    iam_apikey: watsonApiKey,
    version: '2018-04-05',
    url: "https://gateway.watsonplatform.net/natural-language-understanding/api"
});

const state = require('./state');

async function robot() {
    const content = state.load();
    await fetchContentFromWikipedia(content);
    sanitizeContent(content);
    breakContentIntoSenlinces(content);
    limitMaximumSnetences(content);
    await fetchKeywordsOfAllSentences(content);

    state.save(content);

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
                images: []
            })
        });
    }

    function limitMaximumSnetences(content) {
        content.sentences = content.sentences.slice(0, content.maximunSentences)
    }

    async function fetchKeywordsOfAllSentences(content) {
        for (const sentence of content.sentences) {
            sentence.keywords = await fetchWatsonAndReturnKeywords(sentence.text)
        }
    }

    async function fetchWatsonAndReturnKeywords(sentence) {
        return new Promise((resolve, reject) => {
            nlu.analyze({
                text: sentence,
                features: {
                    keywords: {}
                }
            }, (error, response) => {
                if (error) {
                    reject(error);
                    return
                }

                const keywords = response.keywords.map(keyword => keyword.text);
                resolve(keywords)
            })
        })
    }
}

module.exports = robot;
