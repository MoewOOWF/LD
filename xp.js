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
