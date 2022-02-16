const startBtn = document.querySelector("#start");
const moreBtn = document.querySelector("#more");
const stayBtn = document.querySelector("#stay");
const newGame = document.querySelector("#new");
const fieldContent = document.querySelector(".field-content");
const resultField = document.querySelector(".control__field");
const players = ["Dima", "Yan", "Denis", "Misha"];
const suits = ["spades", "hearts", "diams", "clubs"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const deck = [];

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

// const createNewDeck = new Deck();
// createNewDeck.createDeck();
// createNewDeck.shuffleDeck()


class Player {
    constructor(playersCount) {
        this.playersCount = 4;
        this.players = [];
        this.activePlayerCount = 0;
    }

    createPlayer(i) {
        const player = {id: i, value: 0, carts: [], totalScore: 0}
        return player;
    }

    getActivePlayer(){
        return this.players[this.activePlayerCount]
    }

    createPlayers() {
        for(let i = 0; i < this.playersCount; i++) {
            this.players.push(this.createPlayer(i))
        }
        return this.players;
    }
    pushCardToActivePlayer(card){
        const activePlayer = this.getActivePlayer();
        console.log(activePlayer);
        activePlayer.carts.push(card)
    }

    setActivePlayer() {
        const allPlayers = document.querySelectorAll(".player")
        for(let i = 0; i < allPlayers.length; i++) {
            if(allPlayers[i].id == this.activePlayerCount) {
                allPlayers[i].classList.add("active__player")
            } else {
                allPlayers[i].classList.remove("active__player")
            }
        }
    }

    nextActivePlayer() {
        this.activePlayerCount++;
        return this.activePlayerCount
    }

    resetPlayer() {
        this.players = [];
        this.activePlayerCount = 0;
    }

    totalScorePlayer(thisPlayer) {
        thisPlayer.totalScore = thisPlayer.carts.reduce((acc, item) => {
            return acc += item.weight;
        }, 0)
    }
}

// const player = new Player(4);

class RenderUi {
    constructor() {
       
    }

    renderPlayers(players) {
        fieldContent.innerHTML = "";
        players.map(item => {
            
            this.renderCard(item)
        })
    }

    renderCard(item) {
        const player = document.createElement("div");
        player.classList.add("player");
        player.id = item.id;
        const playerTitle = document.createElement("p");
        playerTitle.classList.add("player-title");
        playerTitle.textContent = `Имя игрока: ${item.id}`;
        player.appendChild(playerTitle);
        const total = document.createElement("p");

        const cardBlock = document.createElement("div");
        cardBlock.classList.add("playingCards");
        player.appendChild(cardBlock);
        const cartinHand = item.carts?.map(cart => (
            `<div class="card rank-1 ${cart.suit}">
                 <span class="rank">${cart.value}</span>    
                 <span class="suit">&${cart.suit};</span>
            </div>`
        ));
        const totalScore = item.carts.reduce((acc, elem) => {
                return acc += elem.weight;
        }, 0)
        
        cardBlock.innerHTML = cartinHand;
        total.innerHTML = totalScore;
        playerTitle.append(total)
        fieldContent.appendChild(player);
    }

    resetPlayers() {
        this.players = []
    }
}

// const renderPlayer = new RenderUi(player.createPlayers());
// renderPlayer.renderPlayers();


class StartGames {
    constructor() {
        // this.player = new player;
        this.deck = new Deck();
        this.player = new Player(4);
        this.renderUi = new RenderUi();
    }

    init() {
        startBtn.addEventListener("click", this.startGame.bind(this))
        
        moreBtn.addEventListener("click", this.moreCart.bind(this))
        
        stayBtn.addEventListener("click",this.stay.bind(this))
        
        newGame.addEventListener("click", (e) => {
            this.player.resetPlayer();

            // this.startGame()
            console.log(this.player);
            // renderPlayer.resetPlayers();
            // player.resetPlayer();
            // // window.location.reload()
            // startBtn.removeAttribute("disabled")
            // e.target.setAttribute("disabled", "disabled")
            // renderPlayer.renderPlayers()

        })
    }

    startGame() {
        this.player.resetPlayer();
        this.deck.createDeck()
        this.deck.shuffleDeck()
        this.player.createPlayers()
        console.log(this.player.players);
        const card = this.deck.getCart();
        this.player.pushCardToActivePlayer(card);
        this.renderUi.renderPlayers(this.player.players)

        this.player.setActivePlayer()
        
        // renderPlayer.renderPlayers()
        // player.setActivePlayer()
    }

    stay(){
        this.player.nextActivePlayer();
        this.moreCart();
    }

    moreCart() {
        const allPlayersLength = this.player.players.length;
        const activePlayer = this.player.activePlayerCount;

        if(activePlayer > allPlayersLength - 1) {
            // let winner;
            // let result = 0;
            // for(let i = 0; i < player.players.length; i++) {
            //     if(player.players[i].totalScore > result && player.players[i].totalScore <= 21) {
            //         result = player.players[i].totalScore;
            //         winner = player.players[i]
            //     }
            // }

            this.resultGame()
        }  else {
            const thisPlayer = this.player.players[this.player.activePlayerCount]
            console.log(this.deck);
            thisPlayer.carts.push(this.deck.getCart())
            console.log(thisPlayer);
            const allScore = thisPlayer.carts.reduce((acc, item) => {
                return acc += item.weight;
            }, 0);
            this.player.totalScorePlayer(thisPlayer);
            if(allScore > 21) {
                this.player.nextActivePlayer();  
                console.log(activePlayer);
                if(activePlayer == allPlayersLength - 1) {
                    this.renderUi.renderPlayers();
                    this.resultGame()
                }
            }
            
            this.renderUi.renderPlayers(this.player.players);
            this.player.setActivePlayer();
        }
        
        
    }

    resultGame() {
        let winner = [];
            let result = 0;
            for(let i = 0; i < this.player.players.length; i++) {
                if(this.player.players[i].totalScore == result) {
                    result = this.player.players[i].totalScore;
                    winner = [
                        ...winner,
                        this.player.players[i]
                    ]
                }
                if(this.player.players[i].totalScore > result && this.player.players[i].totalScore <= 21) {
                    result = this.player.players[i].totalScore;
                    winner = [
                        this.player.players[i]
                    ]
                }
            }
            if(result === 0) {
                resultField.innerHTML = "Все проиграли"
                newGame.removeAttribute("disabled")
            } else {
                let resultArr = [];
                for(let i = 0; i < winner.length; i++) {
                    let oneWinner = `Победил игрок ${winner[i].id} с результатом ${winner[i].totalScore}`;
                    resultArr = [
                        ...resultArr,
                        oneWinner
                    ]
                }
                resultField.innerHTML = resultArr
                newGame.removeAttribute("disabled")
            }
    }

}

 const game = new StartGames();
 game.init();

