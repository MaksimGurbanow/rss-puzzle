import Word from '../components/gameMenu/gameBoard/wordSequence/word/Word';

const randomizeWords = (array: {order: number, element: Word}[]) => {
  const randomizedWords = [...array];
  for (let i = randomizedWords.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [randomizedWords[i], randomizedWords[j]] = [randomizedWords[j], randomizedWords[i]];
  }
  return randomizedWords;
};

export default randomizeWords;
