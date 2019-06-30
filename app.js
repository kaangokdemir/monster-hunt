new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsOn: false,
        gameRenew: false,
        gameWon: false,
        logs: [],
        condition: true,
        myColor: "green",
        hisColor: "green",
        specialCounter: 0,
    },
    methods: {
        startGame() {
            this.gameIsOn = true;
            this.gameRenew = false;
            this.gameWon = false;
            this.specialCounter = 0;
        },
        attack() {
            var point = Math.ceil(Math.random() * 9);
            this.monsterHealth = this.monsterHealth - point;
            this.addToLog({ turn: "YOU", text: "YOU HIT (" + point + ")" });
            this.specialCounter -= 1;
            this.monsterAttack();

        },
        specialAttack() {
            var point3 = Math.ceil(Math.random() * 20 + 5);
            this.monsterHealth = this.monsterHealth - point3;
            this.addToLog({ turn: "YOU", text: "YOU HIT (" + point3 + ")" });
            this.specialCounter = 3;
            this.monsterAttack();
        },
        healUp() {
            var point4 = Math.ceil(Math.random() * 20);
            this.playerHealth = this.playerHealth + point4;
            this.addToLog({ turn: "YOU", text: "YOU GAIN (" + point4 + ")" });
            this.specialCounter -= 1;
            this.monsterAttack();
        },
        giveUp() {
            this.playerHealth = 0;
        },

        monsterAttack() {
            var point2 = Math.ceil(Math.random() * 15);
            this.monsterHealth = this.monsterHealth + 2;
            this.playerHealth = this.playerHealth - point2;
            this.addToLog({ turn: "MONSTER", text: "YOU TOOK (" + point2 + ")" });
        },
        renewGame() {
            window.location.reload();
        },

        addToLog(log) {
            this.logs.push(log);
        },
        playSound(sound) {
            if (sound) {
                var audio = new Audio(sound);
                audio.play();
            }
        },
    },
    watch: {
        playerHealth: function (value) {
            if (value <= 0) {
                this.playerHealth = 0;
                this.playSound('https://kaangokdemir.me/monsterhunt/sounds/lose.mp3');
                this.gameRenew = true;

            }

            else if (value <= 25 && value > 0) {
                this.myColor = "red";

            }
            else if (value <= 50 && value > 25) {
                this.myColor = "orange";

            } else if (value <= 75 && value > 50) {
                this.myColor = "yellow";

            } else if (value <= 100 && value > 75) {
                this.myColor = "green";

            }
            else if (value >= 100) {
                this.playerHealth = 100;
            }
        },
        monsterHealth: function (value) {
            if (value <= 0) {
                this.monsterHealth = 0;
                this.playSound('https://kaangokdemir.me/monsterhunt/sounds/ff7.mp3');
                this.gameWon = true;

            }
            else if (value <= 25 && value > 0) {
                this.hisColor = "red";

            }
            else if (value <= 50 && value > 25) {
                this.hisColor = "orange";

            } else if (value <= 75 && value > 50) {
                this.hisColor = "yellow";

            } else if (value <= 100 && value > 75) {
                this.hisColor = "green";

            }
            else if (value >= 100) {
                this.monsterHealth = 100;
            }
        },

        specialCounter: function (value) {
            if (value <= 0) {
                this.specialCounter = 0;
            }
        },
        logs: function (value) {
            if (this.logs.length > 14) {
                this.logs.shift();
            }
        }

    }
})