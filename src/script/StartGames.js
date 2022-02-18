import Deck from "./Deck"
import Player from "./Player"
import RenderUi from "./RenderUi";

const startBtn = document.querySelector("#start");
const moreBtn = document.querySelector("#more");
const stayBtn = document.querySelector("#stay");
const resultField = document.querySelector(".control__field");


class StartGames {
    constructor() {
        this.deck = new Deck();
        this.player = new Player();
        this.renderUi = new RenderUi();
    }

    init() {
        startBtn.addEventListener("click", this.startGame.bind(this))
        moreBtn.addEventListener("click", this.moreCart.bind(this))
        stayBtn.addEventListener("click",this.stay.bind(this))
    }

    startGame() {
        this.player.resetPlayer();
        this.deck.createDeck()
        this.deck.shuffleDeck()
        this.player.createPlayers()
        const card = this.deck.getCart();
        this.player.pushCardToActivePlayer(card);
        this.renderUi.renderPlayers(this.player.players)
        this.player.setActivePlayer()

    }

    stay(){
        this.player.nextActivePlayer();
        // this.player.setActivePlayer();
        this.moreCart();
    }

    moreCart() {
        const allPlayersLength = this.player.players.length;
        const activePlayer = this.player.activePlayerCount;

        if(activePlayer > allPlayersLength - 1) {
            this.resultGame()
        }  else {
            const thisPlayer = this.player.getActivePlayer()
            thisPlayer.carts.push(this.deck.getCart())
            const allScore = thisPlayer.carts.reduce((acc, item) => {
                return acc += item.weight;
            }, 0);
            this.player.totalScorePlayer(thisPlayer);
            if(allScore > 21) {
                this.player.nextActivePlayer();  
                if(activePlayer == allPlayersLength - 1) {
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
            }
    }

}
 export default StartGames;