class Form {
    constructor() {
        this.input = createInput("name");
        this.button = createButton("submit");
        this.greeting = createElement('h3');

        this.reset = createButton("reset")
        this.gameOver = createElement('h2')

        this.yourRank = createElement("h3")
    }
    hide() {
        this.greeting.hide();
        this.button.hide();
        this.input.hide();
    }
    end() {
        this.gameOver.html("game over");
        this.gameOver.position(displayWidth-200, 20);
        this.yourRank.html("Your rank is: " + player.rank);
        this.yourRank.position(displayWidth/2, 50);
    }
    display() {
        var title = createElement('h2');
        title.html("Multi-Player Car-Racing Game");
        title.position(displayWidth/2-50, 0);
        this.input.position(displayWidth/2-40, displayHeight/2-80);
        this.button.position(displayWidth/2+30, displayHeight/2);
        this.reset.position(displayWidth-100, 20);
        this.button.mousePressed(()=>
        {
            this.input.hide();
            this.button.hide();
            player.name = this.input.value();
            playerCount += 1;
            player.index = playerCount;
            player.update(player.index);
            player.updateCount(playerCount);
            this.greeting.html("Hello " + player.name + ".");
            this.greeting.position(displayWidth/2-50, displayHeight/4);
        })
        this.reset.mousePressed(()=>
        {
            player.updateCount(0);
            game.update(0);
            player.update(0);
            player.updatecar();
            player.destroyEach();
        })
    }
}