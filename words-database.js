// Comprehensive vocabulary database for middle school students
const WORDS_DATABASE = {
    1: { // Foundation Level
        name: "Foundation",
        color: "from-green-400 to-green-600",
        xpRequired: 0,
        words: [
            // Basic Academic Words
            { word: "analyze", definition: "to examine in detail", example: "Let's analyze the poem's meaning.", synonyms: ["examine", "study", "investigate"], difficulty: 1 },
            { word: "compare", definition: "to examine similarities and differences", example: "Compare these two stories.", synonyms: ["contrast", "evaluate", "examine"], difficulty: 1 },
            { word: "describe", definition: "to give details about something", example: "Describe your favorite character.", synonyms: ["explain", "detail", "portray"], difficulty: 1 },
            { word: "explain", definition: "to make something clear", example: "Can you explain this math problem?", synonyms: ["clarify", "describe", "illustrate"], difficulty: 1 },
            { word: "identify", definition: "to recognize or name something", example: "Identify the main character.", synonyms: ["recognize", "name", "point out"], difficulty: 1 },
            { word: "predict", definition: "to say what will happen", example: "Predict the story's ending.", synonyms: ["forecast", "anticipate", "guess"], difficulty: 1 },
            { word: "sequence", definition: "the order of events", example: "Put the events in sequence.", synonyms: ["order", "series", "arrangement"], difficulty: 1 },
            { word: "summarize", definition: "to give the main points", example: "Summarize the chapter.", synonyms: ["recap", "review", "condense"], difficulty: 1 },
            { word: "evidence", definition: "proof or support for an idea", example: "Find evidence in the text.", synonyms: ["proof", "support", "facts"], difficulty: 1 },
            { word: "conclude", definition: "to decide based on evidence", example: "What can you conclude?", synonyms: ["decide", "determine", "infer"], difficulty: 1 },
            
            // More Foundation Words
            { word: "achieve", definition: "to successfully complete something", example: "She worked hard to achieve her goal.", synonyms: ["accomplish", "reach", "attain"], difficulty: 1 },
            { word: "benefit", definition: "something that helps or improves", example: "Exercise has many benefits.", synonyms: ["advantage", "help", "gain"], difficulty: 1 },
            { word: "challenge", definition: "something difficult to do", example: "The puzzle was a fun challenge.", synonyms: ["difficulty", "test", "obstacle"], difficulty: 1 },
            { word: "develop", definition: "to grow or improve gradually", example: "Plants develop from seeds.", synonyms: ["grow", "evolve", "progress"], difficulty: 1 },
            { word: "establish", definition: "to set up or create", example: "They established new rules.", synonyms: ["create", "found", "set up"], difficulty: 1 },
            { word: "feature", definition: "an important part or characteristic", example: "The main feature of birds is flight.", synonyms: ["characteristic", "trait", "quality"], difficulty: 1 },
            { word: "generate", definition: "to create or produce", example: "Wind can generate electricity.", synonyms: ["create", "produce", "make"], difficulty: 1 },
            { word: "individual", definition: "a single person or thing", example: "Each individual has unique talents.", synonyms: ["person", "single", "separate"], difficulty: 1 },
            { word: "maintain", definition: "to keep something in good condition", example: "We must maintain our equipment.", synonyms: ["keep", "preserve", "sustain"], difficulty: 1 },
            { word: "occur", definition: "to happen or take place", example: "Storms occur in spring.", synonyms: ["happen", "take place", "appear"], difficulty: 1 }
        ]
    },
    
    2: { // Developing Level
        name: "Developing",
        color: "from-blue-400 to-blue-600",
        xpRequired: 200,
        words: [
            { word: "synthesize", definition: "to combine ideas into a whole", example: "Scientists synthesize data from experiments.", synonyms: ["combine", "merge", "integrate"], difficulty: 2 },
            { word: "evaluate", definition: "to judge the value of something", example: "Evaluate the effectiveness of the plan.", synonyms: ["assess", "judge", "appraise"], difficulty: 2 },
            { word: "interpret", definition: "to explain the meaning of something", example: "How do you interpret this poem?", synonyms: ["explain", "understand", "decode"], difficulty: 2 },
            { word: "perspective", definition: "a way of looking at something", example: "Consider different perspectives on the issue.", synonyms: ["viewpoint", "opinion", "angle"], difficulty: 2 },
            { word: "significant", definition: "important or meaningful", example: "This discovery is significant.", synonyms: ["important", "meaningful", "notable"], difficulty: 2 },
            { word: "comprehensive", definition: "complete and including everything", example: "We need a comprehensive plan.", synonyms: ["complete", "thorough", "extensive"], difficulty: 2 },
            { word: "demonstrate", definition: "to show clearly", example: "Demonstrate how to solve this.", synonyms: ["show", "prove", "illustrate"], difficulty: 2 },
            { word: "methodology", definition: "a system of methods used", example: "Our research methodology was careful.", synonyms: ["approach", "system", "method"], difficulty: 2 },
            { word: "legitimate", definition: "legal, valid, or acceptable", example: "That's a legitimate concern.", synonyms: ["valid", "acceptable", "proper"], difficulty: 2 },
            { word: "accommodate", definition: "to provide space or adapt for", example: "The hotel can accommodate 200 guests.", synonyms: ["house", "adapt", "adjust"], difficulty: 2 },
            
            // More Developing Words
            { word: "alternative", definition: "another choice or option", example: "We need an alternative solution.", synonyms: ["option", "choice", "substitute"], difficulty: 2 },
            { word: "concept", definition: "an idea or principle", example: "The concept of gravity is important.", synonyms: ["idea", "notion", "principle"], difficulty: 2 },
            { word: "contribute", definition: "to give or add to something", example: "Everyone should contribute to the project.", synonyms: ["add", "give", "provide"], difficulty: 2 },
            { word: "distinguish", definition: "to recognize differences", example: "Can you distinguish between these sounds?", synonyms: ["differentiate", "separate", "tell apart"], difficulty: 2 },
            { word: "emphasize", definition: "to give special importance to", example: "The teacher emphasized safety.", synonyms: ["stress", "highlight", "underscore"], difficulty: 2 },
            { word: "furthermore", definition: "in addition to what was said", example: "The plan is expensive; furthermore, it's risky.", synonyms: ["moreover", "additionally", "also"], difficulty: 2 },
            { word: "guarantee", definition: "to promise something will happen", example: "I guarantee you'll enjoy this book.", synonyms: ["promise", "assure", "ensure"], difficulty: 2 },
            { word: "hypothesis", definition: "an educated guess to be tested", example: "Our hypothesis proved correct.", synonyms: ["theory", "guess", "assumption"], difficulty: 2 },
            { word: "inevitable", definition: "certain to happen", example: "Change is inevitable.", synonyms: ["unavoidable", "certain", "sure"], difficulty: 2 },
            { word: "justify", definition: "to show or prove something is right", example: "Can you justify your decision?", synonyms: ["explain", "defend", "support"], difficulty: 2 }
        ]
    },
    
    3: { // Proficient Level
        name: "Proficient",
        color: "from-purple-400 to-purple-600",
        xpRequired: 500,
        words: [
            { word: "substantiate", definition: "to provide evidence for a claim", example: "Please substantiate your argument with facts.", synonyms: ["support", "prove", "verify"], difficulty: 3 },
            { word: "demographic", definition: "relating to population characteristics", example: "The demographic data shows age patterns.", synonyms: ["population", "statistical", "census"], difficulty: 3 },
            { word: "infrastructure", definition: "basic systems and services", example: "Good infrastructure supports economic growth.", synonyms: ["framework", "foundation", "systems"], difficulty: 3 },
            { word: "implications", definition: "possible results or consequences", example: "What are the implications of this decision?", synonyms: ["consequences", "results", "effects"], difficulty: 3 },
            { word: "paradigm", definition: "a typical example or model", example: "This represents a new paradigm in science.", synonyms: ["model", "pattern", "framework"], difficulty: 3 },
            { word: "phenomenon", definition: "an observable event or fact", example: "Lightning is a natural phenomenon.", synonyms: ["occurrence", "event", "happening"], difficulty: 3 },
            { word: "coherent", definition: "logical and well-organized", example: "Please write a coherent explanation.", synonyms: ["logical", "clear", "organized"], difficulty: 3 },
            { word: "arbitrary", definition: "based on random choice", example: "The decision seemed arbitrary.", synonyms: ["random", "unreasonable", "capricious"], difficulty: 3 },
            { word: "correlation", definition: "a connection between two things", example: "There's a correlation between study time and grades.", synonyms: ["connection", "relationship", "link"], difficulty: 3 },
            { word: "ambiguous", definition: "having more than one meaning", example: "The instructions were ambiguous.", synonyms: ["unclear", "vague", "confusing"], difficulty: 3 },
            
            // More Proficient Words
            { word: "analogy", definition: "a comparison to explain something", example: "Use an analogy to explain this concept.", synonyms: ["comparison", "parallel", "similarity"], difficulty: 3 },
            { word: "bias", definition: "unfair preference for or against something", example: "Try to avoid bias in your research.", synonyms: ["prejudice", "favoritism", "partiality"], difficulty: 3 },
            { word: "criterion", definition: "a standard for judging", example: "What's the main criterion for selection?", synonyms: ["standard", "measure", "benchmark"], difficulty: 3 },
            { word: "deduce", definition: "to reach a conclusion through reasoning", example: "What can you deduce from this evidence?", synonyms: ["conclude", "infer", "reason"], difficulty: 3 },
            { word: "elaborate", definition: "to give more details", example: "Can you elaborate on your idea?", synonyms: ["expand", "detail", "develop"], difficulty: 3 },
            { word: "fluctuate", definition: "to change irregularly", example: "Prices fluctuate with demand.", synonyms: ["vary", "change", "shift"], difficulty: 3 },
            { word: "generate", definition: "to produce or create", example: "This machine can generate electricity.", synonyms: ["produce", "create", "make"], difficulty: 3 },
            { word: "hierarchy", definition: "a system of ranking", example: "The company has a clear hierarchy.", synonyms: ["ranking", "order", "structure"], difficulty: 3 },
            { word: "innovation", definition: "a new method or idea", example: "This innovation will change everything.", synonyms: ["invention", "advancement", "breakthrough"], difficulty: 3 },
            { word: "juxtapose", definition: "to place side by side for comparison", example: "Let's juxtapose these two theories.", synonyms: ["compare", "contrast", "place together"], difficulty: 3 }
        ]
    },
    
    4: { // Advanced Level
        name: "Advanced",
        color: "from-orange-400 to-orange-600",
        xpRequired: 1000,
        words: [
            { word: "empirical", definition: "based on observation and experiment", example: "We need empirical evidence to support this.", synonyms: ["observational", "experimental", "factual"], difficulty: 4 },
            { word: "rhetoric", definition: "the art of persuasive speaking", example: "His rhetoric was very convincing.", synonyms: ["persuasion", "oratory", "eloquence"], difficulty: 4 },
            { word: "catalyst", definition: "something that causes change", example: "The new policy was a catalyst for reform.", synonyms: ["trigger", "stimulus", "agent"], difficulty: 4 },
            { word: "ideology", definition: "a system of beliefs or ideas", example: "Political ideology shapes many decisions.", synonyms: ["beliefs", "philosophy", "doctrine"], difficulty: 4 },
            { word: "preliminary", definition: "coming before the main part", example: "These are just preliminary results.", synonyms: ["initial", "introductory", "preparatory"], difficulty: 4 },
            { word: "inherent", definition: "existing as a natural part", example: "Risk is inherent in all investments.", synonyms: ["natural", "built-in", "intrinsic"], difficulty: 4 },
            { word: "subsequent", definition: "coming after something else", example: "Subsequent events proved her right.", synonyms: ["following", "later", "next"], difficulty: 4 },
            { word: "predominant", definition: "most common or strongest", example: "Red was the predominant color.", synonyms: ["main", "primary", "dominant"], difficulty: 4 },
            { word: "conducive", definition: "helping to bring about", example: "Quiet is conducive to study.", synonyms: ["helpful", "favorable", "beneficial"], difficulty: 4 },
            { word: "comprehensive", definition: "including everything", example: "We need a comprehensive review.", synonyms: ["complete", "thorough", "extensive"], difficulty: 4 },
            
            // More Advanced Words
            { word: "advocate", definition: "to publicly support something", example: "She advocates for environmental protection.", synonyms: ["support", "champion", "promote"], difficulty: 4 },
            { word: "beneficial", definition: "having a good effect", example: "Exercise is beneficial for health.", synonyms: ["helpful", "advantageous", "useful"], difficulty: 4 },
            { word: "constitute", definition: "to form or make up", example: "These parts constitute the whole machine.", synonyms: ["form", "make up", "compose"], difficulty: 4 },
            { word: "derived", definition: "obtained from another source", example: "This word is derived from Latin.", synonyms: ["obtained", "taken", "extracted"], difficulty: 4 },
            { word: "estimate", definition: "to roughly calculate", example: "Estimate how long this will take.", synonyms: ["calculate", "guess", "approximate"], difficulty: 4 },
            { word: "factor", definition: "something that contributes to a result", example: "Weather is an important factor.", synonyms: ["element", "component", "aspect"], difficulty: 4 },
            { word: "indicate", definition: "to point out or show", example: "The signs indicate danger ahead.", synonyms: ["show", "suggest", "point to"], difficulty: 4 },
            { word: "obtain", definition: "to get or acquire", example: "Where did you obtain this information?", synonyms: ["get", "acquire", "gain"], difficulty: 4 },
            { word: "perceive", definition: "to become aware of through senses", example: "I perceive a change in her attitude.", synonyms: ["notice", "sense", "observe"], difficulty: 4 },
            { word: "relevant", definition: "closely connected to the matter", example: "Is this information relevant?", synonyms: ["applicable", "pertinent", "related"], difficulty: 4 }
        ]
    },
    
    5: { // Expert Level
        name: "Expert",
        color: "from-red-400 to-red-600",
        xpRequired: 2000,
        words: [
            { word: "epistemological", definition: "relating to the nature of knowledge", example: "This raises epistemological questions.", synonyms: ["philosophical", "theoretical", "conceptual"], difficulty: 5 },
            { word: "ubiquitous", definition: "existing everywhere at once", example: "Smartphones are ubiquitous today.", synonyms: ["everywhere", "universal", "omnipresent"], difficulty: 5 },
            { word: "paradigmatic", definition: "serving as a typical example", example: "This is a paradigmatic case study.", synonyms: ["exemplary", "typical", "model"], difficulty: 5 },
            { word: "dialectical", definition: "relating to logical discussion", example: "They engaged in dialectical reasoning.", synonyms: ["logical", "analytical", "rational"], difficulty: 5 },
            { word: "metacognitive", definition: "thinking about thinking", example: "Metacognitive skills help learning.", synonyms: ["self-aware", "reflective", "introspective"], difficulty: 5 },
            { word: "autonomous", definition: "having self-government", example: "The region became autonomous.", synonyms: ["independent", "self-governing", "free"], difficulty: 5 },
            { word: "contemporary", definition: "existing at the same time", example: "She's a contemporary artist.", synonyms: ["modern", "current", "present-day"], difficulty: 5 },
            { word: "predominant", definition: "having the most power", example: "Fear was the predominant emotion.", synonyms: ["dominant", "main", "primary"], difficulty: 5 },
            { word: "simultaneous", definition: "happening at the same time", example: "There were simultaneous explosions.", synonyms: ["concurrent", "synchronized", "parallel"], difficulty: 5 },
            { word: "unprecedented", definition: "never done before", example: "This is an unprecedented situation.", synonyms: ["unparalleled", "unique", "novel"], difficulty: 5 },
            
            // More Expert Words
            { word: "accumulate", definition: "to gather or collect over time", example: "Snow began to accumulate on the ground.", synonyms: ["gather", "collect", "amass"], difficulty: 5 },
            { word: "approximate", definition: "close to the actual but not exact", example: "What's the approximate cost?", synonyms: ["rough", "estimated", "close"], difficulty: 5 },
            { word: "conceive", definition: "to form an idea in the mind", example: "It's hard to conceive such a plan.", synonyms: ["imagine", "think up", "devise"], difficulty: 5 },
            { word: "differentiate", definition: "to recognize differences between", example: "Can you differentiate these species?", synonyms: ["distinguish", "separate", "tell apart"], difficulty: 5 },
            { word: "explicit", definition: "stated clearly and directly", example: "The instructions were explicit.", synonyms: ["clear", "direct", "specific"], difficulty: 5 },
            { word: "fundamental", definition: "forming a necessary base", example: "Reading is a fundamental skill.", synonyms: ["basic", "essential", "core"], difficulty: 5 },
            { word: "implement", definition: "to put a plan into action", example: "We'll implement the new policy tomorrow.", synonyms: ["execute", "carry out", "apply"], difficulty: 5 },
            { word: "infrastructure", definition: "basic systems and structures", example: "The city's infrastructure needs repair.", synonyms: ["framework", "foundation", "systems"], difficulty: 5 },
            { word: "manipulate", definition: "to handle or control skillfully", example: "She can manipulate data effectively.", synonyms: ["handle", "control", "manage"], difficulty: 5 },
            { word: "paradigm", definition: "a typical example or pattern", example: "This represents a new paradigm.", synonyms: ["model", "pattern", "example"], difficulty: 5 }
        ]
    }
};

// Word families for etymology explorer
const ETYMOLOGY_JOURNEYS = [
    {
        word: "democracy",
        root: "demos",
        rootMeaning: "people",
        suffix: "cracy",
        suffixMeaning: "rule/government",
        origin: "Greek",
        wordFamily: ["democratic", "democratize", "democrat", "democratization", "democratically"],
        definition: "a system of government by the whole population"
    },
    {
        word: "biography",
        root: "bio",
        rootMeaning: "life",
        suffix: "graphy",
        suffixMeaning: "writing/study",
        origin: "Greek", 
        wordFamily: ["biological", "biographer", "autobiographical", "biodegradable", "biology"],
        definition: "an account of someone's life written by someone else"
    },
    {
        word: "telephone",
        root: "tele",
        rootMeaning: "distant",
        suffix: "phone",
        suffixMeaning: "sound/voice",
        origin: "Greek",
        wordFamily: ["telephonic", "teleconference", "telephoto", "telepathy", "television"],
        definition: "a device for transmitting sound over long distances"
    },
    {
        word: "microscope",
        root: "micro",
        rootMeaning: "small",
        suffix: "scope", 
        suffixMeaning: "to look at",
        origin: "Greek",
        wordFamily: ["microscopic", "microorganism", "microscopy", "microbiology", "microphone"],
        definition: "an instrument for viewing very small objects"
    },
    {
        word: "geography",
        root: "geo",
        rootMeaning: "earth",
        suffix: "graphy",
        suffixMeaning: "writing/study",
        origin: "Greek",
        wordFamily: ["geological", "geographer", "geometric", "geology", "geothermal"],
        definition: "the study of Earth's surface and features"
    },
    {
        word: "transport",
        root: "trans",
        rootMeaning: "across",
        suffix: "port",
        suffixMeaning: "carry",
        origin: "Latin",
        wordFamily: ["transportation", "portable", "export", "import", "support"],
        definition: "to carry from one place to another"
    },
    {
        word: "psychology",
        root: "psycho",
        rootMeaning: "mind/soul",
        suffix: "logy",
        suffixMeaning: "study of",
        origin: "Greek",
        wordFamily: ["psychological", "psychologist", "psychiatry", "psychotherapy", "psychotic"],
        definition: "the study of the human mind and behavior"
    },
    {
        word: "astronomy",
        root: "astro",
        rootMeaning: "star",
        suffix: "nomy",
        suffixMeaning: "arrangement/law",
        origin: "Greek",
        wordFamily: ["astronomer", "astronaut", "astronomical", "astrophysics", "astrology"],
        definition: "the study of celestial objects and space"
    }
];

// Synonym battles for showdown game
const SYNONYM_BATTLES = [
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
    },
    {
        targetWord: "comprehensive",
        definition: "complete and including everything",
        synonyms: ["complete", "thorough", "extensive"],
        decoys: ["partial", "incomplete", "limited"]
    },
    {
        targetWord: "evaluate",
        definition: "to judge or determine the value of",
        synonyms: ["assess", "judge", "appraise"],
        decoys: ["ignore", "accept", "dismiss"]
    },
    {
        targetWord: "demonstrate",
        definition: "to clearly show the existence of something",
        synonyms: ["show", "prove", "illustrate"],
        decoys: ["hide", "conceal", "confuse"]
    },
    {
        targetWord: "distinguish",
        definition: "to recognize differences between things", 
        synonyms: ["differentiate", "separate", "discriminate"],
        decoys: ["combine", "mix", "confuse"]
    },
    {
        targetWord: "emphasize",
        definition: "to give special importance to something",
        synonyms: ["stress", "highlight", "underscore"],
        decoys: ["downplay", "ignore", "minimize"]
    }
];