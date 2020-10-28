class Game {
    constructor() {

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function(data){
            gameState = data.val();
        })
    }
    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
        if (gameState === 0) {
            player = new Player(); 
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form();
            form.display();
        }
        car1 = createSprite(100, 200);
        car2 = createSprite(300, 200);
        car3 = createSprite(500, 200);
        car4 = createSprite(700, 200);
        car1.addImage(car1Image);
        car2.addImage(car2Image);
        car3.addImage(car3Image);
        car4.addImage(car4Image);
        cars = [car1, car2, car3, car4];
    }
    play() {
        form.hide();
        //textSize(30);
        //text("Game Started", 150, 150);
        Player.getPlayerInfo();
        player.getcarEnd();
        if (allPlayers !== undefined) {
            background("black");
            image(trackImage, 0, -displayHeight*4, displayWidth, displayHeight*5);
            var index = 0;
            var x = 150;
            var y;
            //var displayPosition = 150;
            for (var plr in allPlayers) {
                index = index + 1;
                x = x + 175;
                y = displayHeight-allPlayers[plr].distance;
                cars[index-1].x = x;
                cars[index-1].y = y;
                if (index === player.index) {
                    stroke(10);
                    fill("red");
                    ellipse(x, y, 75, 75);
                   cars[index-1].shapeColor = "red";
                   camera.position.x = displayWidth/2;
                   camera.position.y = cars[index - 1].y;
                }
                //displayPosition += 20;
                //textSize(15);
                //text(allPlayers[plr].name + ":" + allPlayers[plr].distance, 125, displayPosition);
            }
        }
        if (keyDown("up") && player.index !== null) {
            player.distance += 10;
            player.update(index);
        }
        if (player.distance > 3600){
            gameState = 2;
            player.rank += 1;
            Player.updatecarEnd(player.rank);
        }
        drawSprites();
    }
}