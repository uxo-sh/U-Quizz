export type Question = {
  id: string;
  game: 'dark-souls-1' | 'dark-souls-2' | 'dark-souls-3' | 'bloodborne' | 'sekiro' | 'elden-ring' | 'demons-souls';
  difficulty: 'hollowed' | 'undead' | 'true-lord';
  type: 'multiple-choice' | 'true-false' | 'item-description';
  question: string;
  options: string[];
  correctIndex: number;
  loreExplainer: string;
};

export const mockQuestions: Question[] = [
  {
    id: '1',
    game: 'dark-souls-1',
    difficulty: 'hollowed',
    type: 'multiple-choice',
    question: "Who is the legendary knight of Gwyn who traversed the Abyss?",
    options: ["Knight Artorias", "Dragon Slayer Ornstein", "Executioner Smough", "Great Grey Wolf Sif"],
    correctIndex: 0,
    loreExplainer: "Knight Artorias, one of Gwyn's Four Knights, is legendary for his ability to traverse the Abyss."
  },
  {
    id: '2',
    game: 'elden-ring',
    difficulty: 'undead',
    type: 'multiple-choice',
    question: "What is the name of the first demigod to perish in the Night of the Black Knives?",
    options: ["Morgott", "Godwyn the Golden", "Rykard", "Radahn"],
    correctIndex: 1,
    loreExplainer: "Godwyn the Golden was the first demigod to die, resulting in the Shatering and the creation of Those Who Live in Death."
  },
  {
    id: '3',
    game: 'bloodborne',
    difficulty: 'true-lord',
    type: 'item-description',
    question: "This tool, once used by the Healing Church, is said to 'grant us eyes'. What is it?",
    options: ["Old Hunter Bone", "Messenger's Gift", "Augur of Ebrietas", "A Call Beyond"],
    correctIndex: 2,
    loreExplainer: "The Augur of Ebrietas is a remnant of the Great One Ebrietas, used by the Choir to communicate."
  },
  {
    id: '4',
    game: 'sekiro',
    difficulty: 'undead',
    type: 'multiple-choice',
    question: "What is the true name of the Sculptor?",
    options: ["Isshin", "Genichiro", "Sekijo", "Owl"],
    correctIndex: 2,
    loreExplainer: "The Sculptor was once a shinobi known as Sekijo (the One-Armed Orangutan)."
  },
  {
    id: '5',
    game: 'dark-souls-3',
    difficulty: 'hollowed',
    type: 'multiple-choice',
    question: "Which of these is NOT a Lord of Cinder?",
    options: ["Abyss Watchers", "Yhorm the Giant", "Aldrich, Saint of the Deep", "Pontiff Sulyvahn"],
    correctIndex: 3,
    loreExplainer: "Pontiff Sulyvahn is a ruler of Irithyll but never linked the First Flame."
  },
  {
    id: '6',
    game: 'demons-souls',
    difficulty: 'undead',
    type: 'multiple-choice',
    question: "What is the name of the Maiden in Black's companion?",
    options: ["The Old One", "The Monumental", "King Allant", "Stockpile Thomas"],
    correctIndex: 0,
    loreExplainer: "The Maiden in Black serves the Old One, keeping it slumbering."
  },
  {
    id: '7',
    game: 'dark-souls-1',
    difficulty: 'true-lord',
    type: 'multiple-choice',
    question: "What was the name of Seath the Scaleless's research archive?",
    options: ["The Grand Archives", "The Duke's Archives", "The Crystal Caves", "The Painted World"],
    correctIndex: 1,
    loreExplainer: "The Duke's Archives was the center of Seath's obsessive research into immortality."
  },
  {
    id: '8',
    game: 'bloodborne',
    difficulty: 'undead',
    type: 'multiple-choice',
    question: "Who founded the Healing Church?",
    options: ["Master Willem", "Gehrman", "Laurence", "Lady Maria"],
    correctIndex: 2,
    loreExplainer: "Laurence left Byrgenwerth to found the Healing Church, despite Willem's warnings."
  },
  {
    id: '9',
    game: 'elden-ring',
    difficulty: 'hollowed',
    type: 'multiple-choice',
    question: "Which Outer God is associated with the Frenzied Flame?",
    options: ["The Greater Will", "The Formless Mother", "The Moon", "The Three Fingers"],
    correctIndex: 3,
    loreExplainer: "The Three Fingers are the avatars of the Frenzied Flame's chaotic influence."
  },
  {
    id: '10',
    game: 'sekiro',
    difficulty: 'true-lord',
    type: 'multiple-choice',
    question: "What is the name of the sword used by the Divine Dragon?",
    options: ["Kusanagi", "Seven-Branched Sword", "Mortal Blade", "Kusabimaru"],
    correctIndex: 1,
    loreExplainer: "The Divine Dragon wields a massive, glowing Seven-Branched Sword."
  },
  {
    id: '11',
    game: 'dark-souls-2',
    difficulty: 'undead',
    type: 'multiple-choice',
    question: "Who is the Queen of Drangleic?",
    options: ["Nashandra", "Elana", "Nadalia", "Alsanna"],
    correctIndex: 0,
    loreExplainer: "Nashandra, a fragment of Manus, manipulated King Vendrick to gain the Throne of Want."
  },
  {
    id: '12',
    game: 'dark-souls-3',
    difficulty: 'true-lord',
    type: 'multiple-choice',
    question: "Who was the first scholar of the Grand Archives?",
    options: ["Sulyvahn", "Logan", "Orbeck", "Aldia"],
    correctIndex: 3,
    loreExplainer: "While debatable, many theories suggest Aldia as the First Scholar who influenced Prince Lothric."
  },
  {
    id: '13',
    game: 'bloodborne',
    difficulty: 'hollowed',
    type: 'multiple-choice',
    question: "What is the name of the doll in the Hunter's Dream?",
    options: ["The Plain Doll", "Lady Maria", "Arianna", "Adella"],
    correctIndex: 0,
    loreExplainer: "The Plain Doll was created by Gehrman in the likeness of his student, Maria."
  },
  {
    id: '14',
    game: 'dark-souls-1',
    difficulty: 'undead',
    type: 'multiple-choice',
    question: "Which item allows you to walk through the Abyss?",
    options: ["Covenant of Artorias", "Orange Charred Ring", "Rusted Iron Ring", "Pendant"],
    correctIndex: 0,
    loreExplainer: "The Covenant of Artorias ring is required to face Four Kings in the Abyss."
  },
  {
    id: '15',
    game: 'elden-ring',
    difficulty: 'true-lord',
    type: 'multiple-choice',
    question: "What is the name of Malenia's teacher?",
    options: ["Radagon", "Miquella", "The Blue Swordsman", "Gowry"],
    correctIndex: 2,
    loreExplainer: "The blind Blue Swordsman taught Malenia the flowing style to suppress the Rot."
  },
  {
    id: '16',
    game: 'sekiro',
    difficulty: 'hollowed',
    type: 'multiple-choice',
    question: "Who is the 'Demon of Hatred'?",
    options: ["Isshin", "Owl", "The Sculptor", "Hanbei"],
    correctIndex: 2,
    loreExplainer: "The Sculptor succumbed to the flames of hatred, becoming a fail-beast."
  },
  {
    id: '17',
    game: 'dark-souls-2',
    difficulty: 'hollowed',
    type: 'multiple-choice',
    question: "What is the hub area of Dark Souls II?",
    options: ["Firelink Shrine", "Majula", "The Hunter's Dream", "The Nexus"],
    correctIndex: 1,
    loreExplainer: "Majula is the sun-drenched, melancholic hub of Drangleic."
  },
  {
    id: '18',
    game: 'demons-souls',
    difficulty: 'true-lord',
    type: 'multiple-choice',
    question: "What is the name of the boss who guards the Old Monk?",
    options: ["Maneater", "Fool's Idol", "Phalanx", "Storm King"],
    correctIndex: 1,
    loreExplainer: "The Fool's Idol is the last defense before the Ivory Tower's heart."
  },
  {
    id: '19',
    game: 'dark-souls-3',
    difficulty: 'undead',
    type: 'multiple-choice',
    question: "Who is the Father of the Abyss?",
    options: ["Manus", "Gwyn", "Nito", "The Pygmy"],
    correctIndex: 0,
    loreExplainer: "Manus, the Father of the Abyss, is the primeval man whose humanity went wild."
  },
  {
    id: '20',
    game: 'elden-ring',
    difficulty: 'undead',
    type: 'multiple-choice',
    question: "What was Radahn's horse's name?",
    options: ["Torrent", "Leonard", "Steed", "Shadow"],
    correctIndex: 1,
    loreExplainer: "Radahn learned gravity magic specifically to keep riding his beloved scrawny horse, Leonard."
  }
];
