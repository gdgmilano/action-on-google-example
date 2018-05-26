// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const functions = require('firebase-functions');
const {
    WebhookClient
} = require('dialogflow-fulfillment');
const {
    Card,
    Suggestion
} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({
        request,
        response
    });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

    function welcome(agent) {
        agent.add(`Welcome to my agent!`);
    }

    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }
    const vestitiScarpe = {
        'rossa': 'blu',
        'rosso': 'blu',
        'verde': 'marroni',
        'blu': 'rosse',
        'giallo': 'nere',
        'gialla': 'nere',
        'rosa': 'bianche',
        'viola': 'gialle',
        'nero': 'rosse',
        'nera': 'rosse',
        'bianco': 'rosa',
        'bianca': 'rosa',
        'azzurra': 'blu',
        'azzurro': 'blu',
        'marrone': 'verde',
        'turchese': 'bianche',
        'verde lime': 'nere',
        'rosa salmone': 'bianche burro',
        'celeste': 'blu',
        'beige': 'nere',
        'crema': 'nero',
        'verde acqua': 'viola',
        'fucsia': 'nere',
        'grigio': 'crema',
        'lilla': 'verde',
        'viola prugna': 'bianche',
        'viola melanzana': 'gialle',
        'magenta': 'viola melanzana',
        'grigia': 'crema',
        'gialle': 'nere',
        'grigie': 'crema',
        'rosse': 'bianche',
        'nere': 'nere',
        'verdi': 'blu',
        'gialli': 'nere',
        'grigi': 'crema',
        'rossi': 'gialle',
        'neri': 'rosse',
        'bianche': 'verdi',
        'bianchi': 'rosse',
    };

    function accoppiaVestiti(agent) {
        var colore = agent.parameters.colore;
        var newColore = vestitiScarpe[colore];
        if (newColore === undefined) newColore = 'nere';
        
        var msgList = Array(
            `Potresti mettere delle scarpe ${newColore}`,
            `Hai provato con delle scarpe ${newColore}?`,
            `Ti consiglio delle scarpe ${newColore}`
        );
        
        var msg = msgList[Math.floor(Math.random()*msgList.length)];
        
        agent.add(msg);
    }

    function accoppiaScarpe(agent) {
        agent.add(`Non lo so ancora!`);
    }

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Accoppia vestiti', accoppiaVestiti);
    intentMap.set('Accoppia scarpe', accoppiaScarpe);
    intentMap.set('Default Fallback Intent', fallback);

    agent.handleRequest(intentMap);
});
