import dictionaryJSON from './dwdswb-headwords.json' assert {type: 'json'};
const dictionaryARRAY = Object.keys(dictionaryJSON);
export default class dictionary {
    getRandom() {
        let word
        do {
            word = dictionaryARRAY[Math.floor(dictionaryARRAY.length * Math.random())];
        } while (!word.match(/^[a-züöä]/gi))
        return word;
    }
}