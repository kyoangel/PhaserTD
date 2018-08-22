/// <reference path="./../defs/phaser.d.ts"/>
var AttackingAdams = function () { };
AttackingAdams.prototype = {
    life: 3,
    preload: function () {
        this.load.image('base', './assets/sprites/cannonBase.png');
        this.load.image('barrel', './assets/sprites/cannonBarrel.png');
        this.load.image('bullet', './assets/sprites/bullet.png');
        this.load.image('adam', './assets/sprites/adam.png');
        this.load.image('wall', './assets/sprites/wall.png');
    },
    create: function () {
        this.score = 0;
        this.enemySpeedUp = 0;
        this.walls = this.physics.add.group();
        this.walls.allowGravity = false;
        this.buildWall();

        this.text = this.add.text(0, 0, "Your Score: 0", { font: "40px Impact" });

        this.base = this.add.sprite(100, 300, 'base').setOrigin(0.5, 0.5);
        this.base.setScale(0.4);

        this.bullet = this.physics.add.sprite(100, 300, 'bullet').setOrigin(0, 0.5);
        this.bullet.setScale(0.85, 0.85);
        this.bullet.body.allowGravity = false;

        this.barrel = this.add.sprite(100, 300, 'barrel').setOrigin(0.3, 0.5);
        this.barrel.setScale(0.5);

        this.enemies = [];
        var y = 100;
        for (var i = 0; i < 3; i++) {
            var enemy = this.physics.add.sprite(800, y, 'adam');
            enemy.body.allowGravity = false;
            enemy.setScale(0.3);
            enemy.flipX = true;
            this.enemies.push(enemy);
            this.enemyAttack(enemy);
            y += 200;
        }

        this.input.on('pointermove', function (pointer) {
            let cursor = pointer;
            let angle = Phaser.Math.Angle.Between(this.barrel.x, this.barrel.y, cursor.x + this.cameras.main.scrollX, cursor.y + this.cameras.main.scrollY);
            this.barrel.rotation = angle;
            if (this.bullet.x == 100 && this.bullet.y == 300) {
                this.bullet.rotation = angle;
            }
        }, this);
        this.input.on('pointerdown', function (pointer) {
            let cursor = pointer;
            let angle = Phaser.Math.Angle.Between(this.barrel.x, this.barrel.y, cursor.x + this.cameras.main.scrollX, cursor.y + this.cameras.main.scrollY);
            this.barrel.rotation = angle;
            if (this.bullet.x == 100 && this.bullet.y == 300) {
                this.bullet.rotation = angle;
                this.fire(cursor.x, cursor.y);
            }
        }, this);

    },
    update: function () {
        var self = this;
        this.enemies.forEach(enemy => {
            if (!enemy.isFirst) {
                this.physics.world.overlap(enemy, this.bullet, this.hitEnemy, null, self);
                this.physics.world.overlap(enemy, this.walls, this.breakWall, null, self);
            }
            else {
                enemy.isFirst = false;
            }
        });

        if (this.bullet.x > window.innerWidth || this.bullet.y > window.innerHeight
            || this.bullet.x < 0 || this.bullet.y < 0) {
            this.reset(null);
        }
    },
    fire: function (x, y) {
        this.physics.moveTo(this.bullet, x, y, 60, 750);
    },
    enemyAttack: function (enemy) {
        this.physics.moveTo(enemy, this.base.x, enemy.y, 60 + this.enemySpeedUp, 0);
    },
    reset: function (enemy) {
        this.bullet.x = 100;
        this.bullet.y = 300;
        this.bullet.setVelocity(0, 0);
        if (enemy) {
            enemy.x = 900;
            this.enemySpeedUp += Math.floor((Math.random() * 10));
        }
    },
    hitEnemy: function (enemy, bullet) {
        this.reset(enemy);
        this.score += 100;
        this.text.setText("Your Score: " + this.score);
    },
    buildWall: function () {
        for (var i = 0; i < 650; i += 36) {
            var wall = this.physics.add.sprite(140, i, 'wall').setOrigin(0, 0);
            wall.body.allowGravity = false;
            wall.setScale(0.1);
            this.walls.add(wall);
        }
    },
    breakWall: function (enemy, wall) {
        var y = enemy.y;
        enemy.destroy();
        for (var i=0;i<3;i++){
            var oldEnemy = this.enemies[i];
            if (y == oldEnemy.y) {
                var newEnemy = this.physics.add.sprite(800, y, 'adam');
                newEnemy.body.allowGravity = false;
                newEnemy.setScale(0.3);
                newEnemy.flipX = true;
                newEnemy.isFirst = true;
                newEnemy.setVelocity(0);
                this.enemies[i]= newEnemy;
                this.enemyAttack(newEnemy);
                break;
            }
        }

        this.life--;
        if (this.life <= 0)
           alert("Game Over!");
    }


}

export default AttackingAdams;