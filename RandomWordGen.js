const WORD_LIST = ["Stupid", "Hideous", "Garbage", "Monkey", "Theater"];
export class RandomWordGen {
    fetchRandomWord() {
        let ran = Math.random(); // 0.7
        let wordIndex = Math.floor(ran * WORD_LIST.length); //0.7
        return WORD_LIST[wordIndex];
    }

} 