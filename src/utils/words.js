export const WORDS = [
  'APPLE','BRAVE','CRANE','DREAM','EAGLE','FLAME','GRAPE','HOUSE','IMAGE','JOKER',
  'KNIFE','LEMON','MANGO','NIGHT','OCEAN','PLANT','QUEEN','RIVER','STONE','TIGER',
  'UNITY','VIVID','WATER','YOUTH','ZEBRA','CLOUD','DANCE','EARTH','FIELD','GHOST',
  'HEART','LIGHT','MUSIC','PEARL','ROBOT','SMILE','TRAIN','WORLD','BREAD','CHAIR'
];

export const pickRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];
