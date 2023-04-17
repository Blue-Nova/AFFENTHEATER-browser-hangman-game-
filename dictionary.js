import dictionaryJSON from './dwdswb-headwords.json' assert {type: 'json'};
const dictionaryARRAY = Object.keys(dictionaryJSON);
export default class dictionary {
    getRandom() {
        return dictionaryARRAY[Math.floor(dictionaryARRAY.length * Math.random())];
    }
}