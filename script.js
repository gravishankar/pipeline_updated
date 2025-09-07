class HabbitZVocabulary {
    constructor() {
        this.currentView = 'dashboard';
        this.studentProgress = {
            level: 1,
            experience: 0,
            streak: 0,
            totalWords: 0,
            accuracy: 100,
            wordsToday: 0,
            dailyGoal: 10,
            unlockedLevels: [1], // Levels the student has access to
            masteredWords: [], // Words the student has mastered
            currentWordIndex: 0 // Current position in the word list
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
        this.render();
        this.setupEventListeners();
        this.checkLevelUnlocks();
    }

    getTodaysWord() {
        const currentLevel = WORDS_DATABASE[this.selectedLevel];
        const words = currentLevel.words;
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const wordIndex = dayOfYear % words.length;
        return words[wordIndex];
    }

    checkLevelUnlocks() {
        const currentLevelWords = WORDS_DATABASE[this.studentProgress.level].words;
        const masteredInLevel = this.studentProgress.masteredWords.filter(word => 
            currentLevelWords.some(w => w.word === word)
        ).length;
        
        // Unlock next level when 80% of current level is mastered
        const masteryThreshold = Math.ceil(currentLevelWords.length * 0.8);
        if (masteredInLevel >= masteryThreshold && this.studentProgress.level < 5) {
            const nextLevel = this.studentProgress.level + 1;
            if (!this.studentProgress.unlockedLevels.includes(nextLevel)) {
                this.studentProgress.unlockedLevels.push(nextLevel);
                this.showLevelUpCelebration(nextLevel);
            }
        }
    }

    showLevelUpCelebration(newLevel) {
        // Create celebration animation
        this.createCelebrationEffect();
        setTimeout(() => {
            alert(`🎉🎉🎉 AMAZING! You unlocked Level ${newLevel}: ${WORDS_DATABASE[newLevel].name}! 🎉🎉🎉`);
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
        const availableWords = currentLevel.words.filter(w => w.word.includes('-') || w.word.length > 6);
        const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)] || currentLevel.words[0];
        
        return {
            currentWord: {
                root: this.extractRoot(randomWord.word),
                meaning: "to examine/look",
                target: randomWord.word,
                prefix: this.extractPrefix(randomWord.word),
                suffix: this.extractSuffix(randomWord.word),
                definition: randomWord.definition
            },
            playerAnswer: '',
            feedback: '',
            score: 0,
            wordsCompleted: 0
        };
    }

    initContextDetectiveState() {
        const currentLevel = WORDS_DATABASE[this.selectedLevel];
        const word = currentLevel.words[Math.floor(Math.random() * currentLevel.words.length)];
        
        return {
            currentCase: {
                sentence: this.generateContextSentence(word),
                word: word.word,
                options: this.generateContextOptions(word),
                correct: 0,
                explanation: word.definition
            },
            selectedAnswer: null,
            showExplanation: false,
            casesSolved: 0
        };
    }

    initSynonymShowdownState() {
        const battles = SYNONYM_BATTLES.filter(battle => {
            const currentLevel = WORDS_DATABASE[this.selectedLevel];
            return currentLevel.words.some(w => w.word === battle.targetWord);
        });
        
        const randomBattle = battles.length > 0 ? battles[Math.floor(Math.random() * battles.length)] : SYNONYM_BATTLES[0];
        
        return {
            currentBattle: {
                ...randomBattle,
                timeLeft: 45,
                round: 1,
                maxRounds: 5
            },
            selectedWords: [],
            score: 0,
            gameActive: true,
            feedback: ''
        };
    }

    initEtymologyExplorerState() {
        const randomJourney = ETYMOLOGY_JOURNEYS[Math.floor(Math.random() * ETYMOLOGY_JOURNEYS.length)];
        
        return {
            currentJourney: randomJourney,
            discoveredWords: [],
            explorationPoints: 0,
            currentStage: 'root'
        };
    }

    extractRoot(word) {
        // Simple root extraction logic
        const commonRoots = ['spect', 'dict', 'struct', 'port', 'form'];
        for (let root of commonRoots) {
            if (word.includes(root)) return root;
        }
        return word.substring(0, Math.min(4, word.length));
    }

    extractPrefix(word) {
        const commonPrefixes = ['pre-', 'un-', 're-', 'dis-', 'mis-', 'over-', 'under-'];
        for (let prefix of commonPrefixes) {
            if (word.startsWith(prefix.replace('-', ''))) return prefix;
        }
        return word.length > 6 ? word.substring(0, 2) + '-' : '';
    }

    extractSuffix(word) {
        const commonSuffixes = ['-ing', '-ed', '-er', '-est', '-ly', '-tion', '-sion'];
        for (let suffix of commonSuffixes) {
            if (word.endsWith(suffix.replace('-', ''))) return suffix;
        }
        return word.length > 6 ? '-' + word.substring(word.length - 2) : '';
    }

    generateContextSentence(word) {
        const templates = [
            `The student's answer was so _____ that the teacher was impressed.`,
            `Scientists need to _____ the data carefully before drawing conclusions.`,
            `The _____ evidence supported the theory perfectly.`,
            `Her explanation was _____ and easy to understand.`
        ];
        return templates[Math.floor(Math.random() * templates.length)].replace('_____', '_____');
    }

    generateContextOptions(word) {
        const options = [word.word];
        const currentLevel = WORDS_DATABASE[this.selectedLevel];
        const otherWords = currentLevel.words.filter(w => w.word !== word.word);
        
        while (options.length < 4 && otherWords.length > 0) {
            const randomWord = otherWords.splice(Math.floor(Math.random() * otherWords.length), 1)[0];
            options.push(randomWord.word);
        }
        
        // Shuffle options
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        
        return options;
    }

    render() {
        const app = document.getElementById('app');
        let content = '';

        switch (this.currentView) {
            case 'dashboard':
                content = this.renderDashboard();
                break;
            case 'level-select':
                content = this.renderLevelSelector();
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
        this.setupEventListeners();
    }

    renderDashboard() {
        const currentLevel = WORDS_DATABASE[this.studentProgress.level];
        const selectedLevelData = WORDS_DATABASE[this.selectedLevel];
        const nextLevel = WORDS_DATABASE[this.studentProgress.level + 1];
        const progressPercent = nextLevel ? 
            (this.studentProgress.experience / nextLevel.xpRequired) * 100 : 100;

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
                            
                            ${nextLevel ? `
                                <div class="mb-4">
                                    <div class="flex justify-between text-sm text-white mb-2">
                                        <span>🎯 Next Level: ${nextLevel.name}</span>
                                        <span>${nextLevel.xpRequired - this.studentProgress.experience} XP to go!</span>
                                    </div>
                                    <div class="w-full bg-white bg-opacity-20 rounded-full h-4">
                                        <div class="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full progress-bar" 
                                             style="width: ${Math.max(5, progressPercent)}%"></div>
                                    </div>
                                </div>
                            ` : ''}
                        </div>

                        <!-- Level Selector -->
                        <div class="glass-card p-6">
                            <h3 class="text-xl font-bold text-white mb-4 flex items-center">
                                🎮 Choose Practice Level
                            </h3>
                            <div class="grid grid-cols-3 gap-3">
                                ${Object.keys(WORDS_DATABASE).map(level => {
                                    const levelData = WORDS_DATABASE[level];
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
                                        </button>
                                    `;
                                }).join('')}
                            </div>
                            <div class="text-center mt-4 text-white text-sm">
                                Currently practicing: <span class="font-bold text-yellow-300">Level ${this.selectedLevel} - ${selectedLevelData.name}</span>
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
                            📖 Level ${this.selectedLevel} Word Collection (${selectedLevelData.words.length} words)
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
        // Start with a random activity featuring the word of the day
        const activities = ['word-builder', 'context-detective'];
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        this.startActivity(randomActivity);
    }

    startActivity(activityId) {
        this.currentActivity = activityId;
        this.currentView = activityId;
        
        // Re-initialize the activity with current level
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

    // Activity rendering methods will be added next...
    renderWordBuilder() {
        const { currentWord, playerAnswer, feedback, wordsCompleted } = this.wordBuilderState;
        
        return `
            <div class="min-h-screen p-4">
                <div class="max-w-2xl mx-auto">
                    <!-- Header -->
                    <div class="glass-card p-6 mb-6 text-center">
                        <h3 class="text-3xl font-bold text-white mb-2 fun-font">🧩 Word Builder Quest!</h3>
                        <p class="text-white opacity-90">Build magical words from their parts!</p>
                        <div class="text-yellow-300 font-semibold mt-2">Words Built: ${wordsCompleted} 🏆</div>
                    </div>

                    <!-- Word Building Area -->
                    <div class="glass-card p-6 mb-6">
                        <div class="text-center">
                            <div class="text-lg font-semibold text-white mb-4">🔮 Magic Word Parts:</div>
                            <div class="flex justify-center gap-4 mb-6">
                                ${currentWord.prefix ? `<div class="word-part px-6 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-xl font-mono text-lg">${currentWord.prefix}</div>` : ''}
                                <div class="word-part px-6 py-3 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-xl font-mono text-lg font-bold">${currentWord.root}</div>
                                ${currentWord.suffix ? `<div class="word-part px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-xl font-mono text-lg">${currentWord.suffix}</div>` : ''}
                            </div>
                            <div class="text-white text-sm opacity-75">
                                ✨ Root meaning: "${currentWord.meaning}"
                            </div>
                        </div>
                    </div>

                    <!-- Answer Input -->
                    <div class="glass-card p-6 mb-6">
                        <label class="block text-lg font-medium text-white mb-4 text-center">
                            🎯 Build the word that means: "<span class="text-yellow-300">${currentWord.definition}</span>"
                        </label>
                        <input
                            type="text"
                            id="wordBuilderInput"
                            value="${playerAnswer}"
                            class="w-full p-4 border-2 border-purple-300 rounded-xl text-xl font-mono text-center bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                            placeholder="Type your magical word here..."
                        />
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-4 mb-6">
                        <button
                            onclick="app.checkWordBuilderAnswer()"
                            class="flex-1 button-fun text-white py-4 rounded-xl font-semibold text-lg"
                        >
                            ✨ Cast Spell!
                        </button>
                        <button
                            onclick="app.nextWordBuilderWord()"
                            class="px-6 py-4 bg-white bg-opacity-20 text-white rounded-xl hover:bg-opacity-30"
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
            
            wordBuilderInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.checkWordBuilderAnswer();
                }
            });
        }
    }

    checkWordBuilderAnswer() {
        const answer = this.wordBuilderState.playerAnswer.toLowerCase().trim();
        const target = this.wordBuilderState.currentWord.target.toLowerCase();
        
        if (answer === target) {
            this.wordBuilderState.feedback = '🎉 AMAZING! You built the perfect word! ✨';
            this.wordBuilderState.score += 50;
            this.wordBuilderState.wordsCompleted++;
            this.updateProgress(50, 1, this.wordBuilderState.currentWord.target);
            
            setTimeout(() => {
                this.nextWordBuilderWord();
            }, 2000);
        } else {
            this.wordBuilderState.feedback = '🤔 Not quite right! Think about how the magical parts combine! Try again! 💪';
        }
        this.render();
    }

    nextWordBuilderWord() {
        this.wordBuilderState = this.initWordBuilderState();
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
        
        // Check for level progression
        this.checkLevelUnlocks();
        
        // Update streak
        if (wordsLearned > 0) {
            this.studentProgress.streak = Math.max(1, this.studentProgress.streak + 1);
        }
    }

    // Placeholder for other activity renderers - will implement based on the same pattern
    renderContextDetective() {
        return `<div class="p-8 text-center text-white">🔍 Context Detective Coming Soon!</div>`;
    }

    renderSynonymShowdown() {
        return `<div class="p-8 text-center text-white">⚔️ Word Warriors Coming Soon!</div>`;
    }

    renderEtymologyExplorer() {
        return `<div class="p-8 text-center text-white">🗺️ Word Treasure Hunt Coming Soon!</div>`;
    }
}

// Initialize the app
const app = new HabbitZVocabulary();