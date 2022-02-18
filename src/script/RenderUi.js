const fieldContent = document.querySelector(".field-content");


class RenderUi {

    renderPlayers(players) {
        fieldContent.innerHTML = "";
        
        players.map(item => {
            this.renderCard(item)
        })
        // this.setActivePlayer();
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

    // setActivePlayer() {
    //     const allPlayers = document.querySelectorAll(".player")
    //     for(let i = 0; i < allPlayers.length; i++) {
    //         if(allPlayers[i].id == this.activePlayerCount) {
    //             allPlayers[i].classList.add("active__player")
    //         } else {
    //             allPlayers[i].classList.remove("active__player")
    //         }
    //     }
    // }

    resetPlayers() {
        this.players = []
    }
}

export default RenderUi;