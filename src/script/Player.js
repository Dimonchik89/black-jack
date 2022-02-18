

class Player {
    constructor() {
        this.playersCount = 4;
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

    getActivePlayer(){
        return this.players[this.activePlayerCount]
    }

    pushCardToActivePlayer(card){
        const activePlayer = this.getActivePlayer();
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

export default Player;