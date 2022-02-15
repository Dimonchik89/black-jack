const startBtn = document.querySelector("#start");
const moreBtn = document.querySelector("#more");
const stayBtn = document.querySelector("#stay");
const fieldContent = document.querySelector(".field-content");
const players = ["Dima", "Yan", "Denis", "Misha"];
const suits = ["spades", "hearts", "diams", "clubs"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const deck = [];

// const createPlayer = (players) => {
//     players.map(item => {
//         const player = document.createElement("div");
//         player.classList.add("player");
//         player.id = item;
//         const playerTitle = document.createElement("p");
//         playerTitle.classList.add("player-title");
//         playerTitle.textContent = item;
//         player.appendChild(playerTitle);
//         const cardBlock = document.createElement("div");
//         cardBlock.classList.add("card-block");
//         player.appendChild(cardBlock);

//         fieldContent.appendChild(player);
//     })
// }

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

const createNewDeck = new Deck();
createNewDeck.createDeck();
createNewDeck.shuffleDeck()
// console.log(createNewDeck.getCart());

// createPlayer(players)


class Player {
    constructor(playersCount) {
        this.playersCount = playersCount;
        this.players = [];
        this.activePlayerCount = 0;
    }

    createPlayer(i) {
        const player = {id: i, value: 0, carts: [], totalScore: 0}
        return player;
    }

    createPlayers() {
        for(let i = 0; i < this.playersCount; i++) {
            this.players.push(this.createPlayer(i))
        }
        return this.players;
    }

    setActivePlayer() {
        const activePlayer = this.players[this.activePlayerCount];
    }

    nextActivePlayer() {
        this.activePlayerCount++;
        return this.activePlayerCount
    }

    resetPlayer() {
        this.players = [];
    }

    totalScorePlayer(thisPlayer) {
        thisPlayer.totalScore = thisPlayer.carts.reduce((acc, item) => {
            return acc += item.weight;
        }, 0)
        console.log(thisPlayer)

    }
}

const player = new Player(4);

player.setActivePlayer();


class RenderUi {
    constructor(players) {
        this.players = players;
    }

    renderPlayers() {
        fieldContent.innerHTML = "";
        this.players.map(item => {
            
            this.renderCard(item)
        })
    }

    renderCard(item) {
        const player = document.createElement("div");
        player.classList.add("player");
        player.id = item.id;
        const playerTitle = document.createElement("p");
        playerTitle.classList.add("player-title");
        playerTitle.textContent = item.id;
        player.appendChild(playerTitle);
        const total = document.createElement("span");

        const cardBlock = document.createElement("div");
        cardBlock.classList.add("card-block");
        player.appendChild(cardBlock);
        const cartinHand = item.carts.map(cart => (
            `<div class="card">
                <span>${cart.value}</span>
                <span>&${cart.suit};</span>
            </div>`
        ));
        const totalScore = item.carts.reduce((acc, elem) => {
                return acc += elem.weight;
        }, 0)
        
        cardBlock.innerHTML = cartinHand;
        console.log
        total.innerHTML = totalScore;
        player.appendChild(total)
        fieldContent.appendChild(player);
    }
}

const renderPlayer = new RenderUi(player.createPlayers());
renderPlayer.renderPlayers();


class StartGames {
    constructor(player) {
        this.player = player;
    }

    startGame() {
        const thisPlayer = this.player.players[this.player.activePlayerCount]
        thisPlayer.carts.push(createNewDeck.getCart())
        renderPlayer.renderPlayers();
    }

    moreCart() {
        const allPlayers = this.player.players.length;
        const activePlayer = player.activePlayerCount;

        if(activePlayer > allPlayers - 1) {
            let vinner;
            let result = 0;
            for(let i = 0; i < player.players.length; i++) {
                if(player.players[i].totalScore > result && player.players[i].totalScore <= 21) {
                    result = player.players[i].totalScore;
                    vinner = player.players[i]
                }
            }
            if(result === 0) {
                alert("Все проиграли")
                window.location.reload()
            } else {
                alert(`Победил ${vinner.id} игрок с результатом ${vinner.totalScore}`)
                window.location.reload()
            }
            console.log(vinner);
        } else {

            const thisPlayer = this.player.players[this.player.activePlayerCount]
            thisPlayer.carts.push(createNewDeck.getCart())
            const allScore = thisPlayer.carts.reduce((acc, item) => {
                return acc += item.weight;
            }, 0);
            player.totalScorePlayer(thisPlayer);
            
            if(allScore > 21) {
                player.nextActivePlayer();  
            }
    
            
            renderPlayer.renderPlayers();

        }
        

    }

}

const start = new StartGames(player);

startBtn.addEventListener("click", () => {
    start.startGame()
})

moreBtn.addEventListener("click", () => {
    start.moreCart();
})

stayBtn.addEventListener("click", () => {
    player.nextActivePlayer();
    start.moreCart();
})