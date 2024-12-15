
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { getUserLanguages, headers, removeQuotes } = require('./helper.js');

const init = async () => {
    const lessonsToComplete = Number(process.env.lessonsToComplete) || 5;
    const token = removeQuotes(process.env.token);
    const userId = removeQuotes(process.env.userId);

    if (!token || !userId) {
        throw new Error('User ID and token must be specified.');
    }

    try {
        const userLanguages = await getUserLanguages();
        console.log('Fetched User Languages:', userLanguages);

        const sessionBody = {
            challengeTypes: [
                "assist", "characterIntro", "characterMatch", "characterPuzzle", "characterSelect",
                "characterTrace", "characterWrite", "completeReverseTranslation", "definition", "dialogue",
                "extendedMatch", "extendedListenMatch", "form", "freeResponse", "gapFill", "judge", "listen",
                "listenComplete", "listenMatch", "match", "name", "listenComprehension", "listenIsolation",
                "listenSpeak", "listenTap", "orderTapComplete", "partialListen", "partialReverseTranslate",
                "patternTapComplete", "radioBinary", "radioImageSelect", "radioListenMatch",
                "radioListenRecognize", "radioSelect", "readComprehension", "reverseAssist", "sameDifferent",
                "select", "selectPronunciation", "selectTranscription", "svgPuzzle", "syllableTap",
                "syllableListenTap", "speak", "tapCloze", "tapClozeTable", "tapComplete", "tapCompleteTable",
                "tapDescribe", "translate", "transliterate", "transliterationAssist", "typeCloze",
                "typeClozeTable", "typeComplete", "typeCompleteTable", "writeComprehension"
            ],
            fromLanguage: userLanguages.fromLanguage,
            learningLanguage: userLanguages.learningLanguage,
            isFinalLevel: false,
            skillIds: ["63f90eb7cf915bcc78bef8efe4c2a6ca"],
            type: "UNIT_TEST"
        };

        for (let i = 0; i < lessonsToComplete; i++) {
            const formattedFraction = `${i + 1}/${lessonsToComplete}`;
            console.log(`Running: ${formattedFraction}`);

            try {
                const createdSession = await fetch("https://www.duolingo.com/2017-06-30/sessions", {
                    headers,
                    method: 'POST',
                    body: JSON.stringify(sessionBody),
                }).then(res => {
                    if (!res.ok) throw new Error('Failed to create session. Check your credentials.');
                    return res.json();
                });

                console.log(`Created Fake Duolingo Practice Session: ${createdSession.id}`);

                const rewards = await fetch(`https://www.duolingo.com/2017-06-30/sessions/${createdSession.id}`, {
                    headers,
                    method: 'PUT',
                    body: JSON.stringify({
                        id: createdSession.id,
                        fromLanguage: "vi",
                        learningLanguage: "en",
                        type: "UNIT_TEST",
                        challengeTimeTakenCutoff: 60000,
                        enableBonusPoints: false,
                        endTime: Math.floor(Date.now() / 1000),
                        startTime: Math.floor((Date.now() - 60000) / 1000),
                        hasBoost: true,
                        sessionExperimentRecord: [],
                        sessionStartExperiments: [],
                        showBestTranslationInGradingRibbon: true,
                        progressUpdates: [],
                        metadata: {
                            id: createdSession.id,
                            type: "unit_test",
                            language: "en",
                            from_language: "vi"
                        },
                        skill_tree_id: "72f8003cc36227580a7b75ea1d3f4f4a",
                        isV2: false,
                    }),
                }).then(res => {
                    if (!res.ok) {
                        return res.text().then(text => {
                            console.error(`Error receiving rewards: ${text}`);
                        });
                    }
                    return res.json();
                });

                console.log(`Submitted Spoof Practice Session Data - Received`);
                console.log(`💪🏆🎉 Earned ${rewards.xpGain} XP!`);
            } catch (err) {
                console.error(`Error in lesson ${formattedFraction}: ${err}`);
            }
        }
    } catch (err) {
        console.error(`Initialization failed: ${err}`);
    }
};

init();
