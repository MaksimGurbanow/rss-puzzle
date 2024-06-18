import { Round } from '../types/round';

const setRandom = (rounds: Round[]) => {
  const randomRound = Math.floor(Math.random() * rounds.length);
  return rounds[randomRound];
};

export default setRandom;
