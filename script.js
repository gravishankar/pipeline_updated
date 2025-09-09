class HabbitZVocabulary {
    constructor() {
        this.currentView = 'dashboard';
        this.showUserManual = false;
        this.studentProgress = {
            level: 1,
            experience: 0,
            streak: 1,
            totalWords: 0,
            accuracy: 100,
            wordsToday: 0,
            dailyGoal: 10,
            unlockedLevels: [1], // Levels the student has access to
            masteredWords: [], // Words the student has mastered
            currentWordIndex: 0, // Current position in the word list
            levelProgress: {
                1: { mastered: 0, total: 20 },
                2: { mastered: 0, total: 20 },
                3: { mastered: 0, total: 20 },
                4: { mastered: 0, total: 20 },
                5: { mastered: 0, total: 20 }
            }
        };
        
        this.currentActivity = null;
        this.selectedLevel = 1; // Level selected for practice
        this.showLevelSelector = false;
        
        // Get today's featured word
        this.wordOfDay = this.getTodaysWord();
        
        // Game states
        this.wordBuilderState = this.initWordBuilderState();
        this.contextDetectiveState = this.initContextDetectiveState();
        this.synonymShowdownState = this.initSynonymShowdownState();
        this.etymologyExplorerState = this.initEtymologyExplorerState();

        this.adventures = [
            {
                id: 'word-builder',
                title: '🧩 Word Builder Quest',
                description: 'Build magical words from roots, prefixes, and suffixes!',
                duration: '3-5 min',
                emoji: '🧩',
                color: 'from-blue-400 to-purple-600'
            },
            {
                id: 'context-detective',
                title: '🔍 Detective Academy',
                description: 'Solve word mysteries using super detective skills!',
                duration: '4-6 min',
                emoji: '🔍',
                color: 'from-yellow-400 to-orange-600'
            },
            {
                id: 'synonym-showdown',
                title: '⚔️ Word Warriors',
                description: 'Epic battles with word powers and synonyms!',
                duration: '3-4 min',
                emoji: '⚔️',
                color: 'from-red-400 to-pink-600'
            },
            {
                id: 'etymology-explorer',
                title: '🗺️ Word Treasure Hunt',
                description: 'Discover amazing word families and their secrets!',
                duration: '5-7 min',
                emoji: '🗺️',
                color: 'from-green-400 to-teal-600'
            }
        ];

        this.init();
    }

    init() {
        this.updateLevelProgress();
        this.render();
        this.setupEventListeners();
        this.checkLevelUnlocks();
    }

    updateLevelProgress() {
        // Update progress counts for each level
        for (let level = 1; level <= 5; level++) {
            const levelWords = WORDS_DATABASE[level].words;
            const masteredCount = this.studentProgress.masteredWords.filter(word => 
                levelWords.some(w => w.word === word)
            ).length;
            
            this.studentProgress.levelProgress[level] = {
                mastered: masteredCount,
                total: levelWords.length
            };
        }
    }

    getTodaysWord() {
        const currentLevel = WORDS_DATABASE[this.selectedLevel];
        const words = currentLevel.words;
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const wordIndex = dayOfYear % words.length;
        return words[wordIndex];
    }

    checkLevelUnlocks() {
        const currentLevelProgress = this.studentProgress.levelProgress[this.studentProgress.level];
        const masteryThreshold = Math.ceil(currentLevelProgress.total * 0.8);
        
        if (currentLevelProgress.mastered >= masteryThreshold && this.studentProgress.level < 5) {
            const nextLevel = this.studentProgress.level + 1;
            if (!this.studentProgress.unlockedLevels.includes(nextLevel)) {
                this.studentProgress.unlockedLevels.push(nextLevel);
                this.studentProgress.level = nextLevel; // Auto advance to next level
                this.showLevelUpCelebration(nextLevel);
            }
        }
    }

    showLevelUpCelebration(newLevel) {
        this.createCelebrationEffect();
        setTimeout(() => {
            alert(`🎉🎉🎉 AMAZING! You leveled up to Level ${newLevel}: ${WORDS_DATABASE[newLevel].name}! 🎉🎉🎉`);
        }, 500);
    }

    createCelebrationEffect() {
        const emojis = ['🎉', '🌟', '✨', '🎊', '🏆', '👏'];
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const emoji = document.createElement('div');
                emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
                emoji.className = 'fixed text-4xl emoji-rain pointer-events-none z-50';
                emoji.style.left = Math.random() * window.innerWidth + 'px';
                emoji.style.top = '-50px';
                document.body.appendChild(emoji);
                
                setTimeout(() => {
                    if (emoji.parentNode) emoji.parentNode.removeChild(emoji);
                }, 3000);
            }, i * 100);
        }
    }

    initWordBuilderState() {
        const currentLevel = WORDS_DATABASE[this.selectedLevel];
        const randomWord = currentLevel.words[Math.floor(Math.random() * currentLevel.words.length)];
        
        return {
            currentWord: {
                target: randomWord.word,
                definition: randomWord.definition,
                example: randomWord.example,
                hint: this.generateHint(randomWord.word)
            },
            playerAnswer: '',
            feedback: '',
            score: 0,
            wordsCompleted: 0,
            showHint: false
        };
    }

    initContextDetectiveState() {
        const currentLevel = WORDS_DATABASE[this.selectedLevel];
        const word = currentLevel.words[Math.floor(Math.random() * currentLevel.words.length)];
        const correctAnswer = word.word;
        const options = [correctAnswer];
        
        // Add 3 wrong options
        while (options.length < 4) {
            const randomWord = currentLevel.words[Math.floor(Math.random() * currentLevel.words.length)];
            if (!options.includes(randomWord.word)) {
                options.push(randomWord.word);
            }
        }
        
        // Shuffle options
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        
        return {
            currentCase: {
                sentence: this.generateContextSentence(word),
                word: correctAnswer,
                options: options,
                correct: options.indexOf(correctAnswer),
                explanation: word.definition,
                example: word.example
            },
            selectedAnswer: null,
            showExplanation: false,
            casesSolved: 0,
            showHint: false
        };
    }

    initSynonymShowdownState() {
        const currentLevel = WORDS_DATABASE[this.selectedLevel];
        const word = currentLevel.words[Math.floor(Math.random() * currentLevel.words.length)];
        
        return {
            currentBattle: {
                targetWord: word.word,
                definition: word.definition,
                synonyms: word.synonyms.slice(0, 3), // Take first 3 synonyms
                decoys: this.generateDecoys(word, currentLevel.words, 3),
                round: 1,
                maxRounds: 5
            },
            selectedWords: [],
            score: 0,
            gameActive: true,
            feedback: '',
            showHint: false
        };
    }

    initEtymologyExplorerState() {
        const randomJourney = ETYMOLOGY_JOURNEYS[Math.floor(Math.random() * ETYMOLOGY_JOURNEYS.length)];
        
        return {
            currentJourney: randomJourney,
            discoveredWords: [],
            explorationPoints: 0,
            showHint: false
        };
    }

    generateHint(word) {
        const len = word.length;
        if (len <= 3) return word[0] + '_'.repeat(len - 1);
        if (len <= 6) return word[0] + '_'.repeat(len - 2) + word[len - 1];
        const visibleCount = Math.ceil(len * 0.4);
        let hint = '';
        for (let i = 0; i < len; i++) {
            if (i === 0 || i === len - 1 || i % 2 === 0 && hint.replace(/_/g, '').length < visibleCount) {
                hint += word[i];
            } else {
                hint += '_';
            }
        }
        return hint;
    }

    generateContextSentence(word) {
        // Create context sentences that actually use the word properly
        const wordType = this.getWordType(word.word);
        
        const sentenceTemplates = {
            verb: [
                `Students need to _____ the information before writing their essays.`,
                `The teacher asked us to _____ the main ideas from the text.`,
                `Scientists _____ data to understand patterns and trends.`,
                `We must _____ the problem carefully before finding a solution.`,
                `The detective will _____ all the evidence from the crime scene.`
            ],
            adjective: [
                `The _____ results showed clear improvement in student performance.`,
                `Her _____ explanation helped everyone understand the concept.`,
                `The scientist made a _____ discovery that changed everything.`,
                `This _____ information is important for our research project.`,
                `The student's _____ work impressed the entire class.`
            ],
            noun: [
                `The _____ of the experiment surprised all the researchers.`,
                `Students studied the _____ to better understand the topic.`,
                `The teacher explained the _____ using simple examples.`,
                `This _____ is essential for understanding the subject.`,
                `The _____ shows how different concepts are connected.`
            ]
        };
        
        const templates = sentenceTemplates[wordType] || sentenceTemplates.noun;
        return templates[Math.floor(Math.random() * templates.length)];
    }

    getWordType(word) {
        // Simple word type detection based on common patterns
        const verbEndings = ['ize', 'ise', 'ate', 'ify', 'en'];
        const adjectiveEndings = ['ive', 'ous', 'ful', 'less', 'able', 'ible', 'ant', 'ent'];
        const nounEndings = ['tion', 'sion', 'ment', 'ness', 'ity', 'ogy', 'ism', 'ist'];
        
        const lowerWord = word.toLowerCase();
        
        // Check for verb patterns
        if (verbEndings.some(ending => lowerWord.endsWith(ending))) {
            return 'verb';
        }
        
        // Check for adjective patterns  
        if (adjectiveEndings.some(ending => lowerWord.endsWith(ending))) {
            return 'adjective';
        }
        
        // Check for noun patterns
        if (nounEndings.some(ending => lowerWord.endsWith(ending))) {
            return 'noun';
        }
        
        // Default classification based on common academic words
        const commonVerbs = ['analyze', 'synthesize', 'evaluate', 'compare', 'contrast', 'examine', 'investigate', 'demonstrate', 'illustrate', 'identify', 'predict', 'conclude'];
        const commonAdjectives = ['significant', 'comprehensive', 'legitimate', 'substantial', 'accurate', 'precise', 'relevant', 'appropriate', 'effective', 'efficient'];
        
        if (commonVerbs.includes(lowerWord)) return 'verb';
        if (commonAdjectives.includes(lowerWord)) return 'adjective';
        
        return 'noun'; // Default to noun
    }

    generateDecoys(targetWord, allWords, count) {
        const decoys = [];
        const filteredWords = allWords.filter(w => 
            w.word !== targetWord.word && 
            !targetWord.synonyms.includes(w.word)
        );
        
        while (decoys.length < count && filteredWords.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredWords.length);
            decoys.push(filteredWords.splice(randomIndex, 1)[0].word);
        }
        
        return decoys;
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

        app.innerHTML = content;
        
        // Add user manual modal if it should be shown
        if (this.showUserManual) {
            app.innerHTML += this.renderUserManual();
        }
        
        this.setupEventListeners();
    }

    renderDashboard() {
        const currentLevel = WORDS_DATABASE[this.studentProgress.level];
        const selectedLevelData = WORDS_DATABASE[this.selectedLevel];
        const nextLevel = WORDS_DATABASE[this.studentProgress.level + 1];
        const currentLevelProgress = this.studentProgress.levelProgress[this.studentProgress.level];
        const selectedLevelProgress = this.studentProgress.levelProgress[this.selectedLevel];
        const progressPercent = nextLevel ? 
            (this.studentProgress.experience / nextLevel.xpRequired) * 100 : 100;

        // Calculate mastery threshold
        const masteryThreshold = Math.ceil(currentLevelProgress.total * 0.8);
        const wordsNeeded = Math.max(0, masteryThreshold - currentLevelProgress.mastered);

        return `
            <div class="min-h-screen p-4">
                <div class="max-w-6xl mx-auto">
                    <!-- Fun Header -->
                    <div class="text-center mb-8 glass-card p-6 relative overflow-hidden">
                        <div class="absolute top-0 right-0 text-6xl opacity-20">🌟</div>
                        <div class="absolute bottom-0 left-0 text-6xl opacity-20">📚</div>
                        <h1 class="text-5xl font-bold text-white mb-2 fun-font">
                            🎯 HabbitZ Vocabulary Quest! 🚀
                        </h1>
                        <p class="text-white text-xl opacity-90">Level up your word powers!</p>
                        <button onclick="app.toggleUserManual()" class="mt-4 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center mx-auto">
                            📖 User Manual
                        </button>
                    </div>

                    <!-- Level Selection and Progress -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <!-- Current Level Display -->
                        <div class="glass-card p-6 relative overflow-hidden">
                            <div class="bg-gradient-to-r ${currentLevel.color} p-4 rounded-xl text-white mb-4">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <h2 class="text-2xl font-bold">Level ${this.studentProgress.level}</h2>
                                        <p class="text-lg opacity-90">${currentLevel.name} Master</p>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-3xl font-bold xp-counter">${this.studentProgress.experience} XP</div>
                                        <div class="text-sm opacity-75">Total Power</div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Level Progress -->
                            <div class="mb-4">
                                <div class="flex justify-between text-sm text-white mb-2">
                                    <span>🎯 Progress: ${currentLevelProgress.mastered}/${currentLevelProgress.total} words mastered</span>
                                    <span>${wordsNeeded} words to next level!</span>
                                </div>
                                <div class="w-full bg-white bg-opacity-20 rounded-full h-4">
                                    <div class="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full progress-bar" 
                                         style="width: ${Math.max(5, (currentLevelProgress.mastered / masteryThreshold) * 100)}%"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Level Selector -->
                        <div class="glass-card p-6">
                            <h3 class="text-xl font-bold text-white mb-4 flex items-center">
                                🎮 Choose Practice Level
                            </h3>
                            <div class="grid grid-cols-3 gap-3">
                                ${Object.keys(WORDS_DATABASE).map(level => {
                                    const levelData = WORDS_DATABASE[level];
                                    const levelProgress = this.studentProgress.levelProgress[level];
                                    const isUnlocked = this.studentProgress.unlockedLevels.includes(parseInt(level));
                                    const isSelected = this.selectedLevel == level;
                                    
                                    return `
                                        <button
                                            onclick="app.selectLevel(${level})"
                                            class="p-3 rounded-xl text-center transition-all ${
                                                isUnlocked 
                                                    ? isSelected 
                                                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg transform scale-105' 
                                                        : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30' 
                                                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                                            }"
                                            ${!isUnlocked ? 'disabled' : ''}
                                        >
                                            <div class="text-2xl mb-1">${isUnlocked ? '🌟' : '🔒'}</div>
                                            <div class="text-sm font-semibold">Level ${level}</div>
                                            <div class="text-xs">${levelData.name}</div>
                                            ${isUnlocked ? `<div class="text-xs mt-1">${levelProgress.mastered}/${levelProgress.total}</div>` : ''}
                                        </button>
                                    `;
                                }).join('')}
                            </div>
                            <div class="text-center mt-4 text-white text-sm">
                                Currently practicing: <span class="font-bold text-yellow-300">Level ${this.selectedLevel} - ${selectedLevelData.name}</span>
                                <br>Progress: ${selectedLevelProgress.mastered}/${selectedLevelProgress.total} words mastered
                            </div>
                        </div>
                    </div>

                    <!-- Fun Stats -->
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div class="glass-card p-4 text-center">
                            <div class="text-3xl mb-2">🔥</div>
                            <div class="text-2xl font-bold text-white">${this.studentProgress.streak}</div>
                            <div class="text-sm text-white opacity-75">Day Streak</div>
                        </div>
                        
                        <div class="glass-card p-4 text-center">
                            <div class="text-3xl mb-2">🎯</div>
                            <div class="text-2xl font-bold text-white">${this.studentProgress.accuracy}%</div>
                            <div class="text-sm text-white opacity-75">Accuracy</div>
                        </div>
                        
                        <div class="glass-card p-4 text-center">
                            <div class="text-3xl mb-2">📚</div>
                            <div class="text-2xl font-bold text-white">${this.studentProgress.masteredWords.length}</div>
                            <div class="text-sm text-white opacity-75">Words Mastered</div>
                        </div>
                        
                        <div class="glass-card p-4 text-center">
                            <div class="text-3xl mb-2">⚡</div>
                            <div class="text-2xl font-bold text-white">${this.studentProgress.wordsToday}/${this.studentProgress.dailyGoal}</div>
                            <div class="text-sm text-white opacity-75">Today's Goal</div>
                        </div>
                    </div>

                    <!-- Word of the Day -->
                    <div class="glass-card p-6 mb-8 relative overflow-hidden">
                        <div class="absolute top-0 right-0 text-8xl opacity-10">✨</div>
                        <h3 class="text-2xl font-bold text-white mb-4 flex items-center fun-font">
                            🌟 Today's Super Word! 🌟
                        </h3>
                        <div class="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl text-white">
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                <div>
                                    <div class="text-3xl font-bold mb-2 fun-font">${this.wordOfDay.word}</div>
                                    <div class="text-lg opacity-90">${this.wordOfDay.definition}</div>
                                </div>
                                <div class="text-sm italic opacity-80">
                                    "${this.wordOfDay.example}"
                                </div>
                                <div class="text-center">
                                    <button onclick="app.practiceWordOfDay()" class="button-fun text-white px-6 py-3 rounded-full font-semibold">
                                        🎮 Practice Now!
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Adventure Selection -->
                    <div class="mb-8">
                        <h3 class="text-3xl font-bold text-white mb-6 text-center fun-font">
                            🚀 Choose Your Adventure! 🌟
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            ${this.adventures.map(adventure => `
                                <div class="adventure-card p-6 rounded-xl relative overflow-hidden">
                                    <div class="absolute top-0 right-0 text-6xl opacity-20">${adventure.emoji}</div>
                                    <div class="relative z-10">
                                        <h4 class="text-xl font-bold text-gray-800 mb-2 fun-font">${adventure.title}</h4>
                                        <p class="text-gray-600 mb-4">${adventure.description}</p>
                                        <div class="flex justify-between items-center">
                                            <span class="text-sm text-gray-500 flex items-center">
                                                ⏱️ ${adventure.duration}
                                            </span>
                                            <button
                                                onclick="app.startActivity('${adventure.id}')"
                                                class="button-fun text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2"
                                            >
                                                ${adventure.emoji} Let's Go!
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Current Level Words Preview -->
                    <div class="glass-card p-6">
                        <h3 class="text-xl font-semibold text-white mb-4 flex items-center fun-font">
                            📖 Level ${this.selectedLevel} Word Collection (${selectedLevelProgress.mastered}/${selectedLevelProgress.total} mastered)
                        </h3>
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${selectedLevelData.words.slice(0, 15).map(word => {
                                const isMastered = this.studentProgress.masteredWords.includes(word.word);
                                return `
                                    <span class="px-3 py-1 rounded-full text-sm font-medium transition-all cursor-pointer ${
                                        isMastered 
                                            ? 'bg-green-500 text-white' 
                                            : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                                    }">
                                        ${isMastered ? '✅ ' : ''}${word.word}
                                    </span>
                                `;
                            }).join('')}
                            ${selectedLevelData.words.length > 15 ? `
                                <span class="px-3 py-1 bg-white bg-opacity-20 text-white rounded-full text-sm">
                                    +${selectedLevelData.words.length - 15} more words...
                                </span>
                            ` : ''}
                        </div>
                        <div class="text-sm text-white opacity-75">
                            Master ${Math.ceil(selectedLevelData.words.length * 0.8)} words to unlock the next level! 🎯
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    selectLevel(level) {
        this.selectedLevel = parseInt(level);
        this.wordOfDay = this.getTodaysWord();
        this.render();
    }

    practiceWordOfDay() {
        const activities = ['word-builder', 'context-detective'];
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        this.startActivity(randomActivity);
    }

    startActivity(activityId) {
        this.currentActivity = activityId;
        this.currentView = activityId;
        
        switch(activityId) {
            case 'word-builder':
                this.wordBuilderState = this.initWordBuilderState();
                break;
            case 'context-detective':
                this.contextDetectiveState = this.initContextDetectiveState();
                break;
            case 'synonym-showdown':
                this.synonymShowdownState = this.initSynonymShowdownState();
                break;
            case 'etymology-explorer':
                this.etymologyExplorerState = this.initEtymologyExplorerState();
                break;
        }
        
        this.render();
    }

    goToDashboard() {
        this.currentView = 'dashboard';
        this.render();
    }

    // Word Builder Activity
    renderWordBuilder() {
        const { currentWord, playerAnswer, feedback, wordsCompleted, showHint } = this.wordBuilderState;
        
        return `
            <div class="min-h-screen p-4">
                <div class="max-w-2xl mx-auto">
                    <!-- Header -->
                    <div class="glass-card p-6 mb-6 text-center">
                        <h3 class="text-3xl font-bold text-white mb-2 fun-font">🧩 Word Builder Quest!</h3>
                        <p class="text-white opacity-90">Build magical words from clues!</p>
                        <div class="text-yellow-300 font-semibold mt-2">Words Built: ${wordsCompleted} 🏆</div>
                    </div>

                    <!-- Word Challenge -->
                    <div class="glass-card p-6 mb-6">
                        <div class="text-center">
                            <div class="text-lg font-semibold text-white mb-4">🎯 Target Word:</div>
                            <div class="text-2xl font-bold text-yellow-300 mb-4">"${currentWord.definition}"</div>
                            
                            ${showHint ? `
                                <div class="bg-yellow-100 p-4 rounded-lg mb-4">
                                    <div class="text-yellow-800 font-semibold mb-2">💡 Spelling Hint:</div>
                                    <div class="text-2xl font-mono font-bold text-yellow-900">${currentWord.hint}</div>
                                </div>
                            ` : ''}
                            
                            <div class="text-sm text-white opacity-75 mb-4">
                                Example: "${currentWord.example}"
                            </div>
                        </div>
                    </div>

                    <!-- Answer Input -->
                    <div class="glass-card p-6 mb-6">
                        <input
                            type="text"
                            id="wordBuilderInput"
                            value="${playerAnswer}"
                            class="w-full p-4 border-2 border-purple-300 rounded-xl text-xl font-mono text-center bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                            placeholder="Type the word here..."
                        />
                    </div>

                    <!-- Action Buttons -->
                    <div class="grid grid-cols-2 gap-4 mb-6">
                        <button
                            onclick="app.checkWordBuilderAnswer()"
                            class="button-fun text-white py-4 rounded-xl font-semibold text-lg col-span-2"
                        >
                            ✨ Check Answer!
                        </button>
                        
                        <button
                            onclick="app.toggleWordBuilderHint()"
                            class="px-4 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 font-semibold"
                        >
                            💡 ${showHint ? 'Hide' : 'Show'} Hint
                        </button>
                        
                        <button
                            onclick="app.nextWordBuilderWord()"
                            class="px-4 py-3 bg-white bg-opacity-20 text-white rounded-xl hover:bg-opacity-30"
                        >
                            ⏭️ Next Word
                        </button>
                    </div>

                    ${feedback ? `
                        <div class="glass-card p-4 mb-6">
                            <div class="text-center text-white text-lg">
                                ${feedback}
                            </div>
                        </div>
                    ` : ''}

                    <!-- Back Button -->
                    <div class="text-center">
                        <button
                            onclick="app.goToDashboard()"
                            class="text-white hover:text-yellow-300 font-medium text-lg"
                        >
                            🏠 Back to Base
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Context Detective Activity
    renderContextDetective() {
        const { currentCase, selectedAnswer, showExplanation, casesSolved, showHint } = this.contextDetectiveState;
        
        return `
            <div class="min-h-screen p-4">
                <div class="max-w-2xl mx-auto">
                    <!-- Header -->
                    <div class="glass-card p-6 mb-6 text-center">
                        <h3 class="text-3xl font-bold text-white mb-2 fun-font">🔍 Detective Academy!</h3>
                        <p class="text-white opacity-90">Solve word mysteries with context clues!</p>
                        <div class="text-yellow-300 font-semibold mt-2">Cases Solved: ${casesSolved} 🏆</div>
                    </div>

                    <!-- Mystery Case -->
                    <div class="glass-card p-6 mb-6">
                        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mb-4">
                            <h4 class="text-lg font-semibold text-yellow-800 mb-2">🕵️ Mystery Case:</h4>
                            <div class="text-lg text-gray-800">
                                ${currentCase.sentence.replace('_____', 
                                    selectedAnswer !== null 
                                        ? `<span class="font-bold text-blue-600">${currentCase.options[selectedAnswer]}</span>`
                                        : '<span class="font-bold text-red-500">_____</span>'
                                )}
                            </div>
                        </div>
                        
                        ${showHint ? `
                            <div class="bg-blue-100 p-4 rounded-lg mb-4">
                                <div class="text-blue-800 font-semibold mb-2">💡 Detective Hint:</div>
                                <div class="text-blue-700">The word means: "${currentCase.explanation}"</div>
                                <div class="text-sm text-blue-600 mt-2">Example: "${currentCase.example}"</div>
                            </div>
                        ` : ''}
                    </div>

                    <!-- Options -->
                    <div class="grid grid-cols-2 gap-3 mb-6">
                        ${currentCase.options.map((option, index) => {
                            let buttonClass = 'p-4 rounded-lg border-2 text-lg font-medium transition-all ';
                            
                            if (selectedAnswer === null) {
                                buttonClass += 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer bg-white';
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
                                    onclick="${selectedAnswer === null ? `app.selectDetectiveAnswer(${index})` : ''}"
                                    ${selectedAnswer !== null ? 'disabled' : ''}
                                    class="${buttonClass}"
                                >
                                    ${option}
                                </button>
                            `;
                        }).join('')}
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-4 mb-6">
                        <button
                            onclick="app.toggleDetectiveHint()"
                            class="px-6 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 font-semibold"
                        >
                            💡 ${showHint ? 'Hide' : 'Get'} Hint
                        </button>
                        
                        <button
                            onclick="app.nextDetectiveCase()"
                            class="px-6 py-3 bg-white bg-opacity-20 text-white rounded-xl hover:bg-opacity-30 flex-1"
                        >
                            ⏭️ Next Case
                        </button>
                    </div>

                    ${showExplanation ? `
                        <div class="glass-card p-4 mb-6">
                            <div class="text-center text-white">
                                <div class="text-xl font-bold mb-2">
                                    ${selectedAnswer === currentCase.correct ? '🎉 Case Solved!' : '🔍 Keep Investigating!'}
                                </div>
                                <div class="text-lg">${currentCase.explanation}</div>
                            </div>
                        </div>
                    ` : ''}

                    <!-- Back Button -->
                    <div class="text-center">
                        <button
                            onclick="app.goToDashboard()"
                            class="text-white hover:text-yellow-300 font-medium text-lg"
                        >
                            🏠 Back to Base
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Synonym Showdown Activity
    renderSynonymShowdown() {
        const { currentBattle, selectedWords, score, feedback, showHint } = this.synonymShowdownState;
        const allWords = [...currentBattle.synonyms, ...currentBattle.decoys].sort(() => Math.random() - 0.5);
        
        return `
            <div class="min-h-screen p-4">
                <div class="max-w-2xl mx-auto">
                    <!-- Header -->
                    <div class="glass-card p-6 mb-6 text-center">
                        <h3 class="text-3xl font-bold text-white mb-2 fun-font">⚔️ Word Warriors!</h3>
                        <p class="text-white opacity-90">Battle with synonyms and word power!</p>
                        <div class="text-yellow-300 font-semibold mt-2">Battle Score: ${score} 🏆</div>
                    </div>

                    <!-- Battle Arena -->
                    <div class="glass-card p-6 mb-6">
                        <div class="bg-red-50 border-2 border-red-200 p-6 rounded-lg text-center">
                            <h4 class="text-2xl font-bold text-red-800 mb-2">🎯 TARGET WORD</h4>
                            <div class="text-3xl font-bold text-red-900 mb-2">${currentBattle.targetWord}</div>
                            <div class="text-lg text-red-700">${currentBattle.definition}</div>
                        </div>
                        
                        ${showHint ? `
                            <div class="bg-green-100 p-4 rounded-lg mt-4">
                                <div class="text-green-800 font-semibold mb-2">⚔️ Battle Hint:</div>
                                <div class="text-green-700">Synonyms are: ${currentBattle.synonyms.join(', ')}</div>
                            </div>
                        ` : ''}
                    </div>

                    <!-- Word Selection -->
                    <div class="mb-6">
                        <h5 class="text-lg font-semibold text-white mb-3 text-center">🗡️ Select ALL the synonyms:</h5>
                        <div class="grid grid-cols-2 gap-3">
                            ${allWords.map(word => {
                                const isSelected = selectedWords.includes(word);
                                const isSynonym = currentBattle.synonyms.includes(word);
                                let buttonClass = 'p-4 rounded-lg border-2 text-lg font-medium transition-all ';
                                
                                if (isSelected) {
                                    buttonClass += 'border-blue-500 bg-blue-100 text-blue-800 cursor-pointer';
                                } else {
                                    buttonClass += 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer bg-white';
                                }

                                return `
                                    <button
                                        onclick="app.toggleSynonymSelection('${word}')"
                                        class="${buttonClass}"
                                    >
                                        ${isSelected ? '✓ ' : ''}${word}
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="grid grid-cols-2 gap-4 mb-6">
                        <button
                            onclick="app.submitSynonymBattle()"
                            class="button-fun text-white py-4 rounded-xl font-semibold text-lg col-span-2"
                        >
                            ⚔️ ATTACK!
                        </button>
                        
                        <button
                            onclick="app.toggleSynonymHint()"
                            class="px-4 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 font-semibold"
                        >
                            💡 ${showHint ? 'Hide' : 'Battle'} Hint
                        </button>
                        
                        <button
                            onclick="app.nextSynonymBattle()"
                            class="px-4 py-3 bg-white bg-opacity-20 text-white rounded-xl hover:bg-opacity-30"
                        >
                            ⏭️ Next Battle
                        </button>
                    </div>

                    ${feedback ? `
                        <div class="glass-card p-4 mb-6">
                            <div class="text-center text-white text-lg">
                                ${feedback}
                            </div>
                        </div>
                    ` : ''}

                    <!-- Back Button -->
                    <div class="text-center">
                        <button
                            onclick="app.goToDashboard()"
                            class="text-white hover:text-yellow-300 font-medium text-lg"
                        >
                            🏠 Back to Base
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Etymology Explorer Activity
    renderEtymologyExplorer() {
        const { currentJourney, discoveredWords, explorationPoints, showHint } = this.etymologyExplorerState;
        
        return `
            <div class="min-h-screen p-4">
                <div class="max-w-2xl mx-auto">
                    <!-- Header -->
                    <div class="glass-card p-6 mb-6 text-center">
                        <h3 class="text-3xl font-bold text-white mb-2 fun-font">🗺️ Word Treasure Hunt!</h3>
                        <p class="text-white opacity-90">Discover amazing word families and their secrets!</p>
                        <div class="text-yellow-300 font-semibold mt-2">Treasure Points: ${explorationPoints} 🏆</div>
                    </div>

                    <!-- Current Word Journey -->
                    <div class="glass-card p-6 mb-6">
                        <div class="bg-purple-50 p-6 rounded-lg text-center">
                            <h4 class="text-2xl font-bold text-purple-800 mb-2">🔍 Current Treasure</h4>
                            <div class="text-3xl font-bold text-purple-900 mb-2">${currentJourney.word}</div>
                            <div class="text-lg text-purple-700 italic">${currentJourney.definition}</div>
                        </div>
                    </div>

                    <!-- Etymology Breakdown -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div class="glass-card p-4">
                            <h5 class="font-semibold text-blue-200 mb-2">📚 Root Word</h5>
                            <div class="text-xl font-bold text-white">${currentJourney.root}</div>
                            <div class="text-sm text-blue-200">Meaning: "${currentJourney.rootMeaning}"</div>
                            <div class="text-xs text-blue-300 mt-1">Origin: ${currentJourney.origin}</div>
                        </div>
                        
                        <div class="glass-card p-4">
                            <h5 class="font-semibold text-green-200 mb-2">🔧 Suffix</h5>
                            <div class="text-xl font-bold text-white">${currentJourney.suffix}</div>
                            <div class="text-sm text-green-200">Meaning: "${currentJourney.suffixMeaning}"</div>
                        </div>
                    </div>

                    ${showHint ? `
                        <div class="glass-card p-4 mb-6">
                            <div class="text-center">
                                <div class="text-yellow-300 font-semibold mb-2">🗝️ Treasure Map Hint:</div>
                                <div class="text-white">Look for words that contain "${currentJourney.root}" or are related to "${currentJourney.rootMeaning}"</div>
                            </div>
                        </div>
                    ` : ''}

                    <!-- Word Family Challenge -->
                    <div class="glass-card p-6 mb-6">
                        <h5 class="text-lg font-semibold text-white mb-3 text-center">🌳 Find the Word Family Treasures!</h5>
                        <div class="grid grid-cols-2 gap-2">
                            ${currentJourney.wordFamily.map(word => {
                                const isDiscovered = discoveredWords.includes(word);
                                return `
                                    <button
                                        onclick="app.discoverFamilyWord('${word}')"
                                        class="p-3 rounded-lg border-2 transition-all ${
                                            isDiscovered 
                                                ? 'border-green-400 bg-green-100 text-green-800 font-semibold' 
                                                : 'border-purple-300 hover:border-purple-500 hover:bg-purple-50 bg-white'
                                        }"
                                        ${isDiscovered ? 'disabled' : ''}
                                    >
                                        ${isDiscovered ? '🏆 ' : '🎁 '}${word}
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Progress and Actions -->
                    <div class="grid grid-cols-2 gap-4 mb-6">
                        <button
                            onclick="app.toggleEtymologyHint()"
                            class="px-4 py-3 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 font-semibold"
                        >
                            🗝️ ${showHint ? 'Hide' : 'Show'} Map
                        </button>
                        
                        <button
                            onclick="app.exploreNextWord()"
                            class="px-4 py-3 bg-white bg-opacity-20 text-white rounded-xl hover:bg-opacity-30"
                        >
                            🚀 New Treasure
                        </button>
                    </div>

                    <!-- Discovery Progress -->
                    <div class="glass-card p-4 mb-6">
                        <div class="text-sm font-semibold text-yellow-300 mb-2 text-center">
                            🏆 Treasures Found: ${discoveredWords.length}/${currentJourney.wordFamily.length}
                        </div>
                        <div class="w-full bg-white bg-opacity-20 rounded-full h-3">
                            <div 
                                class="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
                                style="width: ${(discoveredWords.length / currentJourney.wordFamily.length) * 100}%"
                            ></div>
                        </div>
                    </div>

                    <!-- Back Button -->
                    <div class="text-center">
                        <button
                            onclick="app.goToDashboard()"
                            class="text-white hover:text-yellow-300 font-medium text-lg"
                        >
                            🏠 Back to Base
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    toggleUserManual() {
        this.showUserManual = !this.showUserManual;
        this.render();
    }

    renderUserManual() {
        return `
            <div class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onclick="this.remove()">
                <div class="bg-white rounded-xl shadow-2xl w-full max-w-4xl relative" style="max-height: 90vh; height: 90vh;" onclick="event.stopPropagation()">
                    <div class="flex flex-col h-full">
                        <div class="flex-shrink-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-xl">
                            <h2 class="text-3xl font-bold text-gray-800 flex items-center">
                                📖 HabbitZ Vocabulary User Manual
                            </h2>
                            <button onclick="app.toggleUserManual()" class="text-gray-500 hover:text-gray-700 text-2xl">
                                ✕
                            </button>
                        </div>
                        
                        <div class="flex-1 overflow-y-auto p-6 space-y-8">
                        <!-- Welcome Section -->
                        <section>
                            <h3 class="text-2xl font-bold text-blue-600 mb-4 flex items-center">
                                🎯 Welcome to HabbitZ Vocabulary Quest!
                            </h3>
                            <p class="text-gray-700 text-lg leading-relaxed">
                                HabbitZ Vocabulary is an interactive learning game designed to help middle school students 
                                build their vocabulary through fun, engaging activities. Master words, level up, and become 
                                a vocabulary champion!
                            </p>
                        </section>

                        <!-- Getting Started -->
                        <section>
                            <h3 class="text-2xl font-bold text-green-600 mb-4 flex items-center">
                                🚀 Getting Started
                            </h3>
                            <div class="bg-green-50 p-4 rounded-lg">
                                <ol class="list-decimal list-inside space-y-3 text-gray-700">
                                    <li><strong>Choose Your Level:</strong> Start at Foundation Level or select any unlocked level for practice</li>
                                    <li><strong>Pick an Adventure:</strong> Choose from four exciting vocabulary activities</li>
                                    <li><strong>Learn & Play:</strong> Complete activities to earn XP and master words</li>
                                    <li><strong>Level Up:</strong> Master 80% of words in your current level to unlock the next one!</li>
                                </ol>
                            </div>
                        </section>

                        <!-- Levels System -->
                        <section>
                            <h3 class="text-2xl font-bold text-purple-600 mb-4 flex items-center">
                                📊 Level System
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="bg-green-50 p-4 rounded-lg">
                                    <h4 class="font-bold text-green-700">🌱 Level 1: Foundation</h4>
                                    <p class="text-gray-600">Basic academic vocabulary and reading comprehension words</p>
                                </div>
                                <div class="bg-blue-50 p-4 rounded-lg">
                                    <h4 class="font-bold text-blue-700">🌿 Level 2: Developing</h4>
                                    <p class="text-gray-600">More complex vocabulary for critical thinking</p>
                                </div>
                                <div class="bg-orange-50 p-4 rounded-lg">
                                    <h4 class="font-bold text-orange-700">🌳 Level 3: Proficient</h4>
                                    <p class="text-gray-600">Advanced academic and analytical vocabulary</p>
                                </div>
                                <div class="bg-red-50 p-4 rounded-lg">
                                    <h4 class="font-bold text-red-700">🦅 Level 4: Advanced</h4>
                                    <p class="text-gray-600">Sophisticated vocabulary for complex texts</p>
                                </div>
                                <div class="bg-purple-50 p-4 rounded-lg md:col-span-2">
                                    <h4 class="font-bold text-purple-700">👑 Level 5: Expert</h4>
                                    <p class="text-gray-600">College-level vocabulary mastery</p>
                                </div>
                            </div>
                            <div class="mt-4 bg-yellow-50 p-4 rounded-lg">
                                <p class="text-yellow-800"><strong>💡 Tip:</strong> Master 80% of words (16 out of 20) in your current level to unlock the next level!</p>
                            </div>
                        </section>

                        <!-- Activities Guide -->
                        <section>
                            <h3 class="text-2xl font-bold text-red-600 mb-4 flex items-center">
                                🎮 Vocabulary Adventures
                            </h3>
                            
                            <!-- Word Builder -->
                            <div class="mb-6 border border-gray-200 rounded-lg p-4">
                                <h4 class="text-xl font-bold text-blue-600 mb-3 flex items-center">
                                    🧩 Word Builder Quest
                                </h4>
                                <p class="text-gray-700 mb-3">Build words from scrambled letters using hints and definitions.</p>
                                <div class="bg-blue-50 p-3 rounded">
                                    <strong>How to Play:</strong>
                                    <ul class="list-disc list-inside mt-2 text-gray-600">
                                        <li>Read the definition and example sentence</li>
                                        <li>Use the scrambled letters to build the target word</li>
                                        <li>Click the hint button if you need help</li>
                                        <li>Type your answer and submit to check</li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Context Detective -->
                            <div class="mb-6 border border-gray-200 rounded-lg p-4">
                                <h4 class="text-xl font-bold text-yellow-600 mb-3 flex items-center">
                                    🔍 Detective Academy
                                </h4>
                                <p class="text-gray-700 mb-3">Use context clues to solve word mysteries!</p>
                                <div class="bg-yellow-50 p-3 rounded">
                                    <strong>How to Play:</strong>
                                    <ul class="list-disc list-inside mt-2 text-gray-600">
                                        <li>Read the sentence with the missing word</li>
                                        <li>Use context clues to understand the meaning</li>
                                        <li>Choose the correct word from the options</li>
                                        <li>Learn from the explanation after each answer</li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Synonym Showdown -->
                            <div class="mb-6 border border-gray-200 rounded-lg p-4">
                                <h4 class="text-xl font-bold text-red-600 mb-3 flex items-center">
                                    ⚔️ Word Warriors
                                </h4>
                                <p class="text-gray-700 mb-3">Battle with words by matching synonyms and relationships!</p>
                                <div class="bg-red-50 p-3 rounded">
                                    <strong>How to Play:</strong>
                                    <ul class="list-disc list-inside mt-2 text-gray-600">
                                        <li>Look at the word and its definition</li>
                                        <li>Find the word that means the same thing (synonym)</li>
                                        <li>Be careful of tricky similar words!</li>
                                        <li>Build your warrior points with correct answers</li>
                                    </ul>
                                </div>
                            </div>

                            <!-- Etymology Explorer -->
                            <div class="mb-6 border border-gray-200 rounded-lg p-4">
                                <h4 class="text-xl font-bold text-green-600 mb-3 flex items-center">
                                    🗺️ Word Treasure Hunt
                                </h4>
                                <p class="text-gray-700 mb-3">Discover word families and their amazing origins!</p>
                                <div class="bg-green-50 p-3 rounded">
                                    <strong>How to Play:</strong>
                                    <ul class="list-disc list-inside mt-2 text-gray-600">
                                        <li>Learn about word roots, prefixes, and suffixes</li>
                                        <li>Discover how words are related to each other</li>
                                        <li>Find patterns in word families</li>
                                        <li>Unlock the treasure of word knowledge!</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <!-- Progress & Rewards -->
                        <section>
                            <h3 class="text-2xl font-bold text-indigo-600 mb-4 flex items-center">
                                🏆 Progress & Rewards
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="bg-indigo-50 p-4 rounded-lg">
                                    <h4 class="font-bold text-indigo-700 mb-2">🎯 Experience Points (XP)</h4>
                                    <p class="text-gray-600">Earn XP for every correct answer and completed activity</p>
                                </div>
                                <div class="bg-green-50 p-4 rounded-lg">
                                    <h4 class="font-bold text-green-700 mb-2">🔥 Daily Streak</h4>
                                    <p class="text-gray-600">Keep your learning streak alive by practicing daily</p>
                                </div>
                                <div class="bg-blue-50 p-4 rounded-lg">
                                    <h4 class="font-bold text-blue-700 mb-2">📈 Accuracy Tracking</h4>
                                    <p class="text-gray-600">Monitor your performance and see improvement over time</p>
                                </div>
                                <div class="bg-purple-50 p-4 rounded-lg">
                                    <h4 class="font-bold text-purple-700 mb-2">🌟 Word Mastery</h4>
                                    <p class="text-gray-600">Master words to build your vocabulary collection</p>
                                </div>
                            </div>
                        </section>

                        <!-- Tips for Success -->
                        <section>
                            <h3 class="text-2xl font-bold text-orange-600 mb-4 flex items-center">
                                💡 Tips for Success
                            </h3>
                            <div class="bg-orange-50 p-4 rounded-lg">
                                <ul class="list-disc list-inside space-y-2 text-gray-700">
                                    <li><strong>Practice Daily:</strong> Even 10 minutes a day helps build vocabulary habits</li>
                                    <li><strong>Use Context Clues:</strong> Look for hints in sentences to understand word meanings</li>
                                    <li><strong>Learn Word Families:</strong> Understanding roots helps you figure out new words</li>
                                    <li><strong>Don't Rush:</strong> Take time to read definitions and examples carefully</li>
                                    <li><strong>Review Mistakes:</strong> Learn from wrong answers to improve next time</li>
                                    <li><strong>Have Fun:</strong> The more you enjoy learning, the better you'll remember!</li>
                                </ul>
                            </div>
                        </section>

                        <!-- Word of the Day -->
                        <section>
                            <h3 class="text-2xl font-bold text-teal-600 mb-4 flex items-center">
                                📅 Word of the Day
                            </h3>
                            <div class="bg-teal-50 p-4 rounded-lg">
                                <p class="text-gray-700">
                                    Check the dashboard daily for a featured vocabulary word with definition and example. 
                                    The Word of the Day changes automatically and helps you discover new words from your selected practice level!
                                </p>
                            </div>
                        </section>

                        <!-- Troubleshooting -->
                        <section>
                            <h3 class="text-2xl font-bold text-gray-600 mb-4 flex items-center">
                                🔧 Need Help?
                            </h3>
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <ul class="list-disc list-inside space-y-2 text-gray-700">
                                    <li><strong>Can't advance levels?</strong> Make sure you've mastered 80% of words in your current level</li>
                                    <li><strong>Activities not loading?</strong> Try refreshing the page or check your internet connection</li>
                                    <li><strong>Want to practice a specific level?</strong> Use the level selector in the dashboard</li>
                                    <li><strong>Forgot a word meaning?</strong> Use the hint buttons or read the explanations carefully</li>
                                </ul>
                            </div>
                        </section>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        const wordBuilderInput = document.getElementById('wordBuilderInput');
        if (wordBuilderInput) {
            wordBuilderInput.addEventListener('input', (e) => {
                this.wordBuilderState.playerAnswer = e.target.value;
            });
            
            wordBuilderInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.checkWordBuilderAnswer();
                }
            });
            
            wordBuilderInput.focus();
        }
    }

    // Word Builder Methods
    toggleWordBuilderHint() {
        this.wordBuilderState.showHint = !this.wordBuilderState.showHint;
        this.render();
    }

    checkWordBuilderAnswer() {
        const answer = this.wordBuilderState.playerAnswer.toLowerCase().trim();
        const target = this.wordBuilderState.currentWord.target.toLowerCase();
        
        if (answer === target) {
            this.wordBuilderState.feedback = '🎉 PERFECT! You built the magical word! ✨';
            this.wordBuilderState.score += 50;
            this.wordBuilderState.wordsCompleted++;
            this.updateProgress(50, 1, this.wordBuilderState.currentWord.target);
            
            setTimeout(() => {
                this.nextWordBuilderWord();
            }, 2000);
        } else {
            this.wordBuilderState.feedback = '🤔 Not quite right! Try again or use a hint! 💪';
        }
        this.render();
    }

    nextWordBuilderWord() {
        this.wordBuilderState = this.initWordBuilderState();
        this.render();
    }

    // Context Detective Methods
    toggleDetectiveHint() {
        this.contextDetectiveState.showHint = !this.contextDetectiveState.showHint;
        this.render();
    }

    selectDetectiveAnswer(index) {
        this.contextDetectiveState.selectedAnswer = index;
        this.contextDetectiveState.showExplanation = true;
        
        const isCorrect = index === this.contextDetectiveState.currentCase.correct;
        if (isCorrect) {
            this.contextDetectiveState.casesSolved++;
            this.updateProgress(25, 1, this.contextDetectiveState.currentCase.word);
        }
        this.render();
    }

    nextDetectiveCase() {
        this.contextDetectiveState = this.initContextDetectiveState();
        this.render();
    }

    // Synonym Showdown Methods
    toggleSynonymHint() {
        this.synonymShowdownState.showHint = !this.synonymShowdownState.showHint;
        this.render();
    }

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
        
        let points = 0;
        let feedback = '';
        
        if (correctSelections.length === synonyms.length && incorrectSelections.length === 0) {
            points = 75;
            feedback = `🎉 VICTORY! Perfect synonym warrior! +${points} points`;
            this.updateProgress(points, 1, currentBattle.targetWord);
        } else if (correctSelections.length > incorrectSelections.length) {
            points = correctSelections.length * 20;
            feedback = `⚔️ Good battle! You found ${correctSelections.length}/${synonyms.length} synonyms. +${points} points`;
            if (correctSelections.length === synonyms.length) {
                this.updateProgress(points, 1, currentBattle.targetWord);
            }
        } else {
            points = correctSelections.length * 10;
            feedback = `💥 Keep fighting! You found ${correctSelections.length}/${synonyms.length} synonyms. +${points} points`;
        }
        
        this.synonymShowdownState.score += points;
        this.synonymShowdownState.feedback = feedback;
        
        setTimeout(() => {
            this.nextSynonymBattle();
        }, 3000);
        
        this.render();
    }

    nextSynonymBattle() {
        this.synonymShowdownState = this.initSynonymShowdownState();
        this.render();
    }

    // Etymology Explorer Methods
    toggleEtymologyHint() {
        this.etymologyExplorerState.showHint = !this.etymologyExplorerState.showHint;
        this.render();
    }

    discoverFamilyWord(word) {
        if (!this.etymologyExplorerState.discoveredWords.includes(word)) {
            this.etymologyExplorerState.discoveredWords.push(word);
            this.etymologyExplorerState.explorationPoints += 30;
            this.updateProgress(30, 1, word);
            
            if (this.etymologyExplorerState.discoveredWords.length === this.etymologyExplorerState.currentJourney.wordFamily.length) {
                setTimeout(() => {
                    alert('🎉 Amazing! You discovered the entire word family! +100 bonus treasure points!');
                    this.etymologyExplorerState.explorationPoints += 100;
                    this.updateProgress(100, 0);
                }, 500);
            }
        }
        this.render();
    }

    exploreNextWord() {
        this.etymologyExplorerState = this.initEtymologyExplorerState();
        this.render();
    }

    updateProgress(xp, wordsLearned, wordMastered = null) {
        this.studentProgress.experience += xp;
        this.studentProgress.wordsToday += wordsLearned;
        this.studentProgress.totalWords += wordsLearned;
        
        if (wordMastered && !this.studentProgress.masteredWords.includes(wordMastered)) {
            this.studentProgress.masteredWords.push(wordMastered);
        }
        
        // Update accuracy (simplified)
        if (wordsLearned > 0) {
            this.studentProgress.accuracy = Math.min(100, this.studentProgress.accuracy + 1);
        }
        
        // Update level progress tracking
        this.updateLevelProgress();
        
        // Check for level progression
        this.checkLevelUnlocks();
        
        // Update streak
        if (wordsLearned > 0) {
            this.studentProgress.streak = Math.max(1, this.studentProgress.streak);
        }
    }
}

// Initialize the app
const app = new HabbitZVocabulary();