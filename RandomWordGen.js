const WORD_LIST = ["Stupid", "Hideous", "Garbage", "Monkey", "Theater"];

class RandomWordGen {
    fetchRandomWord() {
        let ran = Math.random();
        let wordIndex = Math.floor(ran * WORD_LIST.length);
        return WORD_LIST[wordIndex];
    }

} 