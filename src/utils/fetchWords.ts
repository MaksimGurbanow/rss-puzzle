import rounds from '../assets/data/level1.js';
import setRandom from './setRandom';

function fetchWords() {
  return setRandom(rounds.rounds);
}
export default fetchWords;
