const suits = ["spades", "hearts", "diams", "clubs"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

const getWeight = (v) => {
    switch (v) {
        case "J":
        case "Q":
        case "K": 
            return 10;
        
        case "A":
            return 11;
        default: 
            return parseInt(v)
    }  
} 

class Deck {
    constructor() {
        this.suits = suits,
        this.values = values,
        this.deck = []
    }

    createDeck() {
        for(let i = 0; i < this.suits.length; i++) {
            for(let q = 0; q < this.values.length; q++) {
                this.deck = [
                    ...this.deck,
                    {
                        suit: this.suits[i],
                        value: this.values[q],
                        weight: getWeight(this.values[q])
                    }
                ]
            }
        }
    }

    // shuffleDeck () {
    //     for(let i = 0; i < this.deck.length; i++) {
    //         const n = Math.floor(Math.random() * this.deck.length - 1);

    //         [this.deck[i], this.deck[n]] = [this.deck[n], this.deck[i]]
    //     }
    // }

    shuffleDeck () {
        const randomT = this.deck.map((item, i) => {
            return {i, value: Math.random()}
        }).sort((a, b) => a.value - b.value);
        this.deck = randomT.map(({i}) => this.deck[i]);
    }

    getCart () {
        return this.deck.pop();
    }
}
export default Deck;