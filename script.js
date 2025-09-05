class HabbitZVocabulary {
    constructor() {
        this.currentView = 'dashboard';
        this.studentProgress = {
            level: 1,
            experience: 45,
            streak: 3,
            totalWords: 28,
            accuracy: 82,
            wordsToday: 0,
            dailyGoal: 5
        };
        this.currentActivity = null;
        this.wordOfDay = {
            word: "synthesize",
            definition: "to combine different ideas or elements to form a coherent whole",
            example: "Scientists synthesize data from multiple experiments to reach conclusions.",
            difficulty: 2,
            category: "Academic"
        };
        
        this.difficultyLevels = {
            1: { 
                name: "Foundation", 
                color: "bg-green-500",
                words: ["analyze", "evidence", "compare", "contrast", "significant"],
                xpRequired: 0
            },
            2: { 
                name: "Developing", 
                color: "bg-blue-500",
                words: ["synthesize", "legitimate", "perspective", "comprehensive", "methodology"],
                xpRequired: 100
            },
            3: { 
                name: "Proficient", 
                color: "bg-purple-500",
                words: ["substantiate", "demographic", "infrastructure", "implications", "paradigm"],
                xpRequired: 300
            },
            4: { 
                name: "Advanced", 
                color: "bg-orange-500",
                words: ["empirical", "rhetoric", "catalyst", "ideology", "hypothesis"],
                xpRequired: 600
            },
            5: { 
                name: "Expert", 
                color: "bg-red-500",
                words: ["epistemological", "ubiquitous", "paradigmatic", "dialectical", "metacognitive"],
                xpRequired: 1000
            }
        };

        this.adventures = [
            {
                id: 'word-builder',
                title: '🧩 Word Builder Challenge',
                description: 'Build words from roots, prefixes, and suffixes',
                duration: '3-5 min',
                difficulty: this.studentProgress.level,
                xpReward: 20 + (this.studentProgress.level * 5)
            },
            {
                id: 'context-detective',
                title: '🔍 Context Detective',
                description: 'Solve vocabulary mysteries using context clues',
                duration: '4-6 min',
                difficulty: this.studentProgress.level,
                xpReward: 25 + (this.studentProgress.level * 5)
            },
            {
                id: 'synonym-showdown',
                title: '⚔️ Synonym Showdown',
                description: 'Battle with words and their relationships',
                duration: '3-4 min',
                difficulty: this.studentProgress.level,
                xpReward: 18 + (this.studentProgress.level * 4)
            },
            {
                id: 'etymology-explorer',
                title: '🗺️ Etymology Explorer',
                description: 'Discover the origins and families of words',
                duration: '5-7 min',
                difficulty: this.studentProgress.level,
                xpReward: 30 + (this.studentProgress.level * 6)
            }
        ];

        this.wordBuilderState = {
            currentWord: {
                root: "spect",
                meaning: "to look/see",
                target: "perspective",
                prefix: "per-",
                suffix: "-ive",
                definition: "a way of looking at something"
            },
            playerAnswer: '',
            feedback: '',
            score: 0
        };

        this.contextDetectiveState = {
            currentCase: {
                sentence: "The scientist's theory was so _____ that it changed how we understand the universe.",
                word: "revolutionary",
                options: ["ordinary", "revolutionary", "confusing", "expensive"],
                correct: 1,
                explanation: "Revolutionary means causing major changes or innovations."
            },
            selectedAnswer: null,
            showExplanation: false,
            casesSolved: 0
        };

        this.synonymShowdownState = {
            currentBattle: {
                targetWord: "analyze",
                definition: "to examine methodically and in detail",
                synonyms: ["examine", "study", "investigate"],
                decoys: ["ignore", "assume", "confuse"],
                timeLeft: 30,
                round: 1,
                maxRounds: 5
            },
            selectedWords: [],
            score: 0,
            gameActive: false,
            feedback: ''
        };

        this.etymologyExplorerState = {
            currentJourney: {
                word: "democracy",
                root: "demos",
                rootMeaning: "people",
                suffix: "cracy",
                suffixMeaning: "rule/government",
                origin: "Greek",
                wordFamily: ["democratic", "democratize", "democrat", "democratization"],
                definition: "a system of government by the whole population"
            },
            discoveredWords: [],
            explorationPoints: 0,
            currentStage: 'root'
        };

        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const app = document.getElementById('app');
        let content = '';

        switch (this.currentView) {
            case 'dashboard':
                content = this.renderDashboard();
                break;
            case 'word-builder':
                content = this.renderWordBuilder();
                break;
            case 'context-detective':
                content = this.renderContextDetective();
                break;
            case 'synonym-showdown':
                content = this.renderSynonymShowdown();
                break;
            case 'etymology-explorer':
                content = this.renderEtymologyExplorer();
                break;
            default:
                content = this.renderDashboard();
        }

        app.innerHTML = content + this.renderNavigationButton();
        this.setupEventListeners();
    }

    renderDashboard() {
        const currentLevel = this.difficultyLevels[this.studentProgress.level];
        const nextLevel = this.difficultyLevels[this.studentProgress.level + 1];
        const progressPercent = nextLevel ? 
            ((this.studentProgress.experience - currentLevel.xpRequired) / (nextLevel.xpRequired - currentLevel.xpRequired)) * 100 : 100;

        return `
            <div class="max-w-6xl mx-auto p-6">
                <!-- Header -->
                <div class="text-center mb-8">
                    <h1 class="text-4xl font-bold text-gray-800 mb-2">📚 HabbitZ Vocabulary 🌟</h1>
                    <p class="text-gray-600 text-lg">Build your word power, level by level!</p>
                </div>

                <!-- Progress Overview -->
                <div class="${currentLevel.color} text-white p-6 rounded-xl shadow-lg mb-6">
                    <div class="flex justify-between items-center mb-4">
                        <div>
                            <h2 class="text-2xl font-bold">Level ${this.studentProgress.level}: ${currentLevel.name}</h2>
                            <p class="opacity-90">Middle School Vocabulary Mastery</p>
                        </div>
                        <div class="text-right">
                            <div class="text-3xl font-bold">${this.studentProgress.experience} XP</div>
                            <div class="text-sm opacity-75">Total Experience</div>
                        </div>
                    </div>
                    
                    ${nextLevel ? `
                        <div>
                            <div class="flex justify-between text-sm mb-2">
                                <span>Progress to ${nextLevel.name}</span>
                                <span>${nextLevel.xpRequired - this.studentProgress.experience} XP needed</span>
                            </div>
                            <div class="w-full bg-black bg-opacity-20 rounded-full h-3">
                                <div class="bg-white h-3 rounded-full progress-bar" style="width: ${Math.max(0, progressPercent)}%"></div>
                            </div>
                        </div>
                    ` : ''}
                </div>

                <!-- Daily Stats -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div class="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
                        <div class="flex items-center">
                            <i data-lucide="calendar" class="text-green-500 mr-3"></i>
                            <div>
                                <div class="text-2xl font-bold text-gray-800">${this.studentProgress.streak}</div>
                                <div class="text-sm text-gray-600">Day Streak 🔥</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
                        <div class="flex items-center">
                            <i data-lucide="target" class="text-blue-500 mr-3"></i>
                            <div>
                                <div class="text-2xl font-bold text-gray-800">${this.studentProgress.accuracy}%</div>
                                <div class="text-sm text-gray-600">Accuracy</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
                        <div class="flex items-center">
                            <i data-lucide="book-open" class="text-purple-500 mr-3"></i>
                            <div>
                                <div class="text-2xl font-bold text-gray-800">${this.studentProgress.totalWords}</div>
                                <div class="text-sm text-gray-600">Words Learned</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-white p-4 rounded-lg shadow border-l-4 border-orange-500">
                        <div class="flex items-center">
                            <i data-lucide="trophy" class="text-orange-500 mr-3"></i>
                            <div>
                                <div class="text-2xl font-bold text-gray-800">${this.studentProgress.wordsToday}/${this.studentProgress.dailyGoal}</div>
                                <div class="text-sm text-gray-600">Today's Goal</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Word of the Day -->
                <div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl shadow-lg mb-8">
                    <div class="flex items-center justify-between">
                        <div class="flex-1">
                            <h3 class="text-xl font-bold mb-2 flex items-center">
                                <i data-lucide="star" class="mr-2"></i> 🌟 Word of the Day
                            </h3>
                            <div class="text-3xl font-bold mb-2">${this.wordOfDay.word}</div>
                            <div class="text-lg opacity-90 mb-2">${this.wordOfDay.definition}</div>
                            <div class="text-sm opacity-75 italic">"${this.wordOfDay.example}"</div>
                        </div>
                        <div class="text-center">
                            <button class="bg-white text-purple-500 p-3 rounded-full hover:bg-gray-100 mb-2">
                                <i data-lucide="volume-2"></i>
                            </button>
                            <div class="text-sm">Level ${this.wordOfDay.difficulty}</div>
                        </div>
                    </div>
                </div>

                <!-- Choose Your Adventure -->
                <div class="mb-8">
                    <h3 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                        <i data-lucide="brain" class="mr-2 text-purple-500"></i>
                        🚀 Choose Your Adventure!
                    </h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${this.adventures.map(adventure => `
                            <div class="bg-white p-6 rounded-lg shadow-lg border hover:shadow-xl transition-shadow adventure-card">
                                <div class="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 class="text-xl font-semibold text-gray-800 mb-2">${adventure.title}</h4>
                                        <p class="text-gray-600 mb-3">${adventure.description}</p>
                                        <div class="flex gap-4 text-sm text-gray-500">
                                            <span class="flex items-center">
                                                <i data-lucide="clock" class="mr-1 w-4 h-4"></i> ${adventure.duration}
                                            </span>
                                            <span class="flex items-center">
                                                <i data-lucide="award" class="mr-1 w-4 h-4"></i> +${adventure.xpReward} XP
                                            </span>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-sm text-gray-500 mb-2">Level ${adventure.difficulty}</div>
                                        <button onclick="app.startActivity('${adventure.id}')" class="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                                            <i data-lucide="play"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Current Level Vocabulary Preview -->
                <div class="bg-white p-6 rounded-lg shadow">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                        <i data-lucide="book-open" class="mr-2 text-green-500"></i>
                        Your Level ${this.studentProgress.level} Vocabulary
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        ${currentLevel.words.map(word => `
                            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 cursor-pointer">
                                ${word}
                            </span>
                        `).join('')}
                    </div>
                    <div class="mt-4 text-sm text-gray-600">
                        Master these words to unlock Level ${this.studentProgress.level + 1} vocabulary!
                    </div>
                </div>
            </div>
        `;
    }

    renderWordBuilder() {
        const { currentWord, playerAnswer, feedback } = this.wordBuilderState;
        
        return `
            <div class="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-8">
                <div class="text-center mb-6">
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">🧩 Word Builder Challenge</h3>
                    <p class="text-gray-600">Combine the word parts to build the target word!</p>
                </div>

                <div class="bg-blue-50 p-4 rounded-lg mb-4">
                    <div class="text-center">
                        <div class="text-lg font-semibold text-blue-800 mb-2">Word Parts:</div>
                        <div class="flex justify-center gap-4 mb-4">
                            <span class="px-4 py-2 bg-blue-200 rounded-lg font-mono word-part">
                                ${currentWord.prefix}
                            </span>
                            <span class="px-4 py-2 bg-blue-300 rounded-lg font-mono font-bold word-part">
                                ${currentWord.root}
                            </span>
                            <span class="px-4 py-2 bg-blue-200 rounded-lg font-mono word-part">
                                ${currentWord.suffix}
                            </span>
                        </div>
                        <div class="text-sm text-blue-700">
                            Root meaning: "${currentWord.meaning}"
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        Build the word that means: "${currentWord.definition}"
                    </label>
                    <input
                        type="text"
                        id="wordBuilderInput"
                        value="${playerAnswer}"
                        class="w-full p-3 border border-gray-300 rounded-lg text-lg font-mono text-center"
                        placeholder="Type your answer here..."
                    />
                </div>

                <div class="flex gap-4 mb-4">
                    <button
                        onclick="app.checkWordBuilderAnswer()"
                        class="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
                    >
                        Check Answer
                    </button>
                    <button
                        onclick="app.resetWordBuilder()"
                        class="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                        <i data-lucide="rotate-ccw"></i>
                    </button>
                </div>

                ${feedback ? `
                    <div class="p-4 rounded-lg ${
                        feedback.includes('Excellent') ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }">
                        ${feedback}
                    </div>
                ` : ''}

                <div class="text-center mt-4">
                    <button
                        onclick="app.goToDashboard()"
                        class="text-blue-500 hover:text-blue-700 font-medium"
                    >
                        ← Back to Dashboard
                    </button>
                </div>
            </div>
        `;
    }

    renderContextDetective() {
        const { currentCase, selectedAnswer, showExplanation, casesSolved } = this.contextDetectiveState;
        
        return `
            <div class="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-8">
                <div class="text-center mb-6">
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">🔍 Context Detective</h3>
                    <p class="text-gray-600">Solve the vocabulary mystery using context clues!</p>
                    <div class="text-sm text-blue-600 mt-2">Cases Solved: ${casesSolved}</div>
                </div>

                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <div class="text-lg font-medium text-gray-800 mb-4">
                        "${selectedAnswer !== null 
                            ? currentCase.sentence.replace('_____', currentCase.options[selectedAnswer])
                            : currentCase.sentence}"
                    </div>
                    <div class="text-sm text-gray-600">
                        🕵️ Detective, which word best completes this sentence?
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-3 mb-6">
                    ${currentCase.options.map((option, index) => {
                        let buttonClass = 'p-4 rounded-lg border-2 text-lg font-medium transition-all ';
                        
                        if (selectedAnswer === null) {
                            buttonClass += 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer';
                        } else {
                            if (selectedAnswer === index) {
                                if (index === currentCase.correct) {
                                    buttonClass += 'border-green-500 bg-green-100 text-green-800';
                                } else {
                                    buttonClass += 'border-red-500 bg-red-100 text-red-800';
                                }
                            } else if (index === currentCase.correct) {
                                buttonClass += 'border-green-500 bg-green-100 text-green-800';
                            } else {
                                buttonClass += 'border-gray-200 bg-gray-50 text-gray-500';
                            }
                        }

                        return `
                            <button
                                onclick="${selectedAnswer === null ? `app.selectContextAnswer(${index})` : ''}"
                                ${selectedAnswer !== null ? 'disabled' : ''}
                                class="${buttonClass}"
                            >
                                ${option}
                            </button>
                        `;
                    }).join('')}
                </div>

                ${showExplanation ? `
                    <div class="p-4 rounded-lg mb-4 ${
                        selectedAnswer === currentCase.correct
                            ? 'bg-green-100 text-green-800'
                            : 'bg-orange-100 text-orange-800'
                    }">
                        <div class="font-semibold mb-2">
                            ${selectedAnswer === currentCase.correct ? '🎉 Case Solved!' : '🤔 Not quite right!'}
                        </div>
                        <div>${currentCase.explanation}</div>
                    </div>
                ` : ''}

                <div class="text-center">
                    <button
                        onclick="app.goToDashboard()"
                        class="text-blue-500 hover:text-blue-700 font-medium"
                    >
                        ← Back to Dashboard
                    </button>
                </div>
            </div>
        `;
    }

    renderSynonymShowdown() {
        const { currentBattle, selectedWords, score, gameActive, feedback } = this.synonymShowdownState;
        const allWords = [...currentBattle.synonyms, ...currentBattle.decoys].sort(() => Math.random() - 0.5);
        
        return `
            <div class="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-8">
                <div class="text-center mb-6">
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">⚔️ Synonym Showdown</h3>
                    <p class="text-gray-600">Battle with words! Select all the synonyms for the target word.</p>
                    <div class="flex justify-center gap-4 text-sm text-blue-600 mt-2">
                        <span>Round: ${currentBattle.round}/${currentBattle.maxRounds}</span>
                        <span>Score: ${score}</span>
                        <span>Time: ${currentBattle.timeLeft}s</span>
                    </div>
                </div>

                <div class="bg-red-50 border-2 border-red-200 p-6 rounded-lg mb-6 text-center">
                    <h4 class="text-2xl font-bold text-red-800 mb-2">🎯 TARGET WORD</h4>
                    <div class="text-3xl font-bold text-red-900 mb-2">${currentBattle.targetWord}</div>
                    <div class="text-lg text-red-700">${currentBattle.definition}</div>
                </div>

                <div class="mb-6">
                    <h5 class="text-lg font-semibold text-gray-800 mb-3">Select ALL the synonyms:</h5>
                    <div class="grid grid-cols-2 gap-3">
                        ${allWords.map(word => {
                            const isSelected = selectedWords.includes(word);
                            const isSynonym = currentBattle.synonyms.includes(word);
                            let buttonClass = 'p-4 rounded-lg border-2 text-lg font-medium transition-all ';
                            
                            if (isSelected) {
                                if (isSynonym) {
                                    buttonClass += 'border-green-500 bg-green-100 text-green-800';
                                } else {
                                    buttonClass += 'border-red-500 bg-red-100 text-red-800';
                                }
                            } else {
                                buttonClass += 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer';
                            }

                            return `
                                <button
                                    onclick="app.toggleSynonymSelection('${word}')"
                                    class="${buttonClass}"
                                >
                                    ${word}
                                </button>
                            `;
                        }).join('')}
                    </div>
                </div>

                <div class="flex gap-4 mb-4">
                    <button
                        onclick="app.submitSynonymBattle()"
                        class="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600"
                    >
                        ⚔️ Battle!
                    </button>
                    <button
                        onclick="app.startNewSynonymRound()"
                        class="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                        <i data-lucide="refresh-cw"></i>
                    </button>
                </div>

                ${feedback ? `
                    <div class="p-4 rounded-lg mb-4 ${
                        feedback.includes('Victory') ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }">
                        ${feedback}
                    </div>
                ` : ''}

                <div class="text-center">
                    <button
                        onclick="app.goToDashboard()"
                        class="text-blue-500 hover:text-blue-700 font-medium"
                    >
                        ← Back to Dashboard
                    </button>
                </div>
            </div>
        `;
    }

    renderEtymologyExplorer() {
        const { currentJourney, discoveredWords, explorationPoints, currentStage } = this.etymologyExplorerState;
        
        return `
            <div class="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-8">
                <div class="text-center mb-6">
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">🗺️ Etymology Explorer</h3>
                    <p class="text-gray-600">Discover the fascinating origins and families of words!</p>
                    <div class="text-sm text-purple-600 mt-2">Exploration Points: ${explorationPoints}</div>
                </div>

                <!-- Current Word Journey -->
                <div class="bg-purple-50 p-6 rounded-lg mb-6">
                    <div class="text-center mb-4">
                        <h4 class="text-2xl font-bold text-purple-800 mb-2">🔍 Current Exploration</h4>
                        <div class="text-3xl font-bold text-purple-900 mb-2">${currentJourney.word}</div>
                        <div class="text-lg text-purple-700 italic">${currentJourney.definition}</div>
                    </div>
                </div>

                <!-- Etymology Breakdown -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div class="bg-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
                        <h5 class="font-semibold text-blue-800 mb-2">📚 Root Word</h5>
                        <div class="text-xl font-bold text-blue-900">${currentJourney.root}</div>
                        <div class="text-sm text-blue-700">Meaning: "${currentJourney.rootMeaning}"</div>
                        <div class="text-xs text-blue-600 mt-1">Origin: ${currentJourney.origin}</div>
                    </div>
                    
                    <div class="bg-green-100 p-4 rounded-lg border-l-4 border-green-500">
                        <h5 class="font-semibold text-green-800 mb-2">🔧 Suffix</h5>
                        <div class="text-xl font-bold text-green-900">${currentJourney.suffix}</div>
                        <div class="text-sm text-green-700">Meaning: "${currentJourney.suffixMeaning}"</div>
                    </div>
                </div>

                <!-- Word Family Challenge -->
                <div class="mb-6">
                    <h5 class="text-lg font-semibold text-gray-800 mb-3">🌳 Discover the Word Family!</h5>
                    <p class="text-sm text-gray-600 mb-4">Click on words that belong to the same family as "${currentJourney.word}"</p>
                    
                    <div class="grid grid-cols-2 gap-2">
                        ${currentJourney.wordFamily.map(word => {
                            const isDiscovered = discoveredWords.includes(word);
                            return `
                                <button
                                    onclick="app.discoverFamilyWord('${word}')"
                                    class="p-3 rounded-lg border-2 transition-all ${
                                        isDiscovered 
                                            ? 'border-green-500 bg-green-100 text-green-800 font-semibold' 
                                            : 'border-purple-300 hover:border-purple-500 hover:bg-purple-50'
                                    }"
                                    ${isDiscovered ? 'disabled' : ''}
                                >
                                    ${isDiscovered ? '✅ ' : ''}${word}
                                </button>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Progress and Actions -->
                <div class="flex gap-4 mb-4">
                    <button
                        onclick="app.exploreNextWord()"
                        class="flex-1 bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600"
                    >
                        🚀 Explore Next Word
                    </button>
                    <button
                        onclick="app.resetEtymologyExploration()"
                        class="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                    >
                        <i data-lucide="refresh-cw"></i>
                    </button>
                </div>

                <!-- Discovery Progress -->
                <div class="bg-yellow-50 p-4 rounded-lg mb-4">
                    <div class="text-sm font-semibold text-yellow-800 mb-2">
                        🏆 Discovery Progress: ${discoveredWords.length}/${currentJourney.wordFamily.length} words found
                    </div>
                    <div class="w-full bg-yellow-200 rounded-full h-2">
                        <div 
                            class="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                            style="width: ${(discoveredWords.length / currentJourney.wordFamily.length) * 100}%"
                        ></div>
                    </div>
                </div>

                <div class="text-center">
                    <button
                        onclick="app.goToDashboard()"
                        class="text-blue-500 hover:text-blue-700 font-medium"
                    >
                        ← Back to Dashboard
                    </button>
                </div>
            </div>
        `;
    }

    renderNavigationButton() {
        return `
            <div class="fixed bottom-4 right-4">
                <button
                    onclick="app.goToDashboard()"
                    class="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
                >
                    <i data-lucide="book-open"></i>
                </button>
            </div>
        `;
    }

    setupEventListeners() {
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Set up input listeners
        const wordBuilderInput = document.getElementById('wordBuilderInput');
        if (wordBuilderInput) {
            wordBuilderInput.addEventListener('input', (e) => {
                this.wordBuilderState.playerAnswer = e.target.value;
            });
        }
    }

    startActivity(activityId) {
        this.currentActivity = activityId;
        this.currentView = activityId;
        this.render();
    }

    goToDashboard() {
        this.currentView = 'dashboard';
        this.render();
    }

    checkWordBuilderAnswer() {
        const answer = this.wordBuilderState.playerAnswer.toLowerCase();
        const target = this.wordBuilderState.currentWord.target.toLowerCase();
        
        if (answer === target) {
            this.wordBuilderState.feedback = '🎉 Excellent! You built the word correctly!';
            this.wordBuilderState.score += 20;
            this.updateProgress(20, 1);
        } else {
            this.wordBuilderState.feedback = '🤔 Not quite right. Think about how the parts combine!';
        }
        this.render();
    }

    resetWordBuilder() {
        this.wordBuilderState.playerAnswer = '';
        this.wordBuilderState.feedback = '';
        this.render();
    }

    selectContextAnswer(index) {
        this.contextDetectiveState.selectedAnswer = index;
        this.contextDetectiveState.showExplanation = true;
        
        const isCorrect = index === this.contextDetectiveState.currentCase.correct;
        if (isCorrect) {
            this.contextDetectiveState.casesSolved++;
            this.updateProgress(25, 1);
        }
        this.render();
    }

    updateProgress(xp, wordsLearned) {
        this.studentProgress.experience += xp;
        this.studentProgress.wordsToday += wordsLearned;
        this.studentProgress.totalWords += wordsLearned;
        
        // Update accuracy
        const currentTotal = this.studentProgress.totalWords - wordsLearned;
        const currentCorrect = Math.round((this.studentProgress.accuracy / 100) * currentTotal);
        this.studentProgress.accuracy = Math.round(((currentCorrect + wordsLearned) / this.studentProgress.totalWords) * 100);
        
        // Level up check
        const nextLevel = this.difficultyLevels[this.studentProgress.level + 1];
        if (nextLevel && this.studentProgress.experience >= nextLevel.xpRequired) {
            this.studentProgress.level++;
            this.showLevelUp();
        }
    }

    showLevelUp() {
        alert(`🎉 Level Up! You've reached Level ${this.studentProgress.level}: ${this.difficultyLevels[this.studentProgress.level].name}!`);
    }

    // Synonym Showdown Methods
    toggleSynonymSelection(word) {
        const index = this.synonymShowdownState.selectedWords.indexOf(word);
        if (index === -1) {
            this.synonymShowdownState.selectedWords.push(word);
        } else {
            this.synonymShowdownState.selectedWords.splice(index, 1);
        }
        this.render();
    }

    submitSynonymBattle() {
        const { selectedWords, currentBattle } = this.synonymShowdownState;
        const { synonyms } = currentBattle;
        
        const correctSelections = selectedWords.filter(word => synonyms.includes(word));
        const incorrectSelections = selectedWords.filter(word => !synonyms.includes(word));
        const missedSynonyms = synonyms.filter(word => !selectedWords.includes(word));
        
        let points = 0;
        let feedback = '';
        
        if (correctSelections.length === synonyms.length && incorrectSelections.length === 0) {
            points = 50 + (currentBattle.round * 10);
            feedback = `🎉 Perfect Victory! You found all ${synonyms.length} synonyms! +${points} points`;
        } else if (correctSelections.length > incorrectSelections.length) {
            points = correctSelections.length * 15;
            feedback = `⚔️ Good battle! You found ${correctSelections.length}/${synonyms.length} synonyms. +${points} points`;
        } else {
            points = correctSelections.length * 5;
            feedback = `💥 Keep fighting! You found ${correctSelections.length}/${synonyms.length} synonyms. +${points} points`;
        }
        
        this.synonymShowdownState.score += points;
        this.synonymShowdownState.feedback = feedback;
        this.updateProgress(points, correctSelections.length);
        
        setTimeout(() => {
            this.startNewSynonymRound();
        }, 2000);
        
        this.render();
    }

    startNewSynonymRound() {
        const synonymBattles = [
            {
                targetWord: "analyze",
                definition: "to examine methodically and in detail",
                synonyms: ["examine", "study", "investigate"],
                decoys: ["ignore", "assume", "confuse"]
            },
            {
                targetWord: "synthesize",
                definition: "to combine different ideas or elements",
                synonyms: ["combine", "merge", "integrate"],
                decoys: ["separate", "destroy", "fragment"]
            },
            {
                targetWord: "substantial",
                definition: "of considerable importance or worth",
                synonyms: ["significant", "considerable", "important"],
                decoys: ["trivial", "minor", "negligible"]
            }
        ];
        
        const randomBattle = synonymBattles[Math.floor(Math.random() * synonymBattles.length)];
        
        this.synonymShowdownState.currentBattle = {
            ...randomBattle,
            timeLeft: 30,
            round: this.synonymShowdownState.currentBattle.round + 1,
            maxRounds: 5
        };
        this.synonymShowdownState.selectedWords = [];
        this.synonymShowdownState.feedback = '';
        this.render();
    }

    // Etymology Explorer Methods
    discoverFamilyWord(word) {
        if (!this.etymologyExplorerState.discoveredWords.includes(word)) {
            this.etymologyExplorerState.discoveredWords.push(word);
            this.etymologyExplorerState.explorationPoints += 20;
            this.updateProgress(20, 1);
            
            if (this.etymologyExplorerState.discoveredWords.length === this.etymologyExplorerState.currentJourney.wordFamily.length) {
                setTimeout(() => {
                    alert('🎉 Amazing! You discovered the entire word family! +100 bonus points!');
                    this.etymologyExplorerState.explorationPoints += 100;
                    this.updateProgress(100, 0);
                }, 500);
            }
        }
        this.render();
    }

    exploreNextWord() {
        const etymologyJourneys = [
            {
                word: "democracy",
                root: "demos",
                rootMeaning: "people",
                suffix: "cracy",
                suffixMeaning: "rule/government",
                origin: "Greek",
                wordFamily: ["democratic", "democratize", "democrat", "democratization"],
                definition: "a system of government by the whole population"
            },
            {
                word: "biography",
                root: "bio",
                rootMeaning: "life",
                suffix: "graphy",
                suffixMeaning: "writing/study",
                origin: "Greek",
                wordFamily: ["biological", "biographer", "autobiographical", "biodegradable"],
                definition: "an account of someone's life written by someone else"
            },
            {
                word: "telephone",
                root: "tele",
                rootMeaning: "distant",
                suffix: "phone",
                suffixMeaning: "sound/voice",
                origin: "Greek",
                wordFamily: ["telephonic", "teleconference", "telephoto", "telepathy"],
                definition: "a device for transmitting sound over long distances"
            },
            {
                word: "microscope",
                root: "micro",
                rootMeaning: "small",
                suffix: "scope",
                suffixMeaning: "to look at",
                origin: "Greek",
                wordFamily: ["microscopic", "microorganism", "microscopy", "microbiology"],
                definition: "an instrument for viewing very small objects"
            }
        ];
        
        const randomJourney = etymologyJourneys[Math.floor(Math.random() * etymologyJourneys.length)];
        
        this.etymologyExplorerState.currentJourney = randomJourney;
        this.etymologyExplorerState.discoveredWords = [];
        this.render();
    }

    resetEtymologyExploration() {
        this.etymologyExplorerState.discoveredWords = [];
        this.etymologyExplorerState.explorationPoints = 0;
        this.render();
    }
}

// Initialize the app
const app = new HabbitZVocabulary();