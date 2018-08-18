var AttackingAdams = function () { };
AttackingAdams.prototype = {
    preload: function () {
        this.load.image('base', './assets/sprites/cannonBase.png');
        this.load.image('barrel', './assets/sprites/cannonBarrel.png');
        this.load.image('bullet', './assets/sprites/bullet.png');
        this.load.image('adam', './assets/sprites/adam.png');
    },
    create: function () {
        this.score = 0;
        this.text = this.add.text(0, 0, "Your Score: 0", { font: "40px Impact" });

        this.base = this.add.sprite(100, 300, 'base').setOrigin(0.5, 0.5);
        this.base.setScale(0.4);

        this.bullet = this.physics.add.sprite(100, 300, 'bullet').setOrigin(0, 0.5);

        this.bullet.setScale(0.85, 0.85);
        this.bullet.body.allowGravity = false;

        this.barrel = this.add.sprite(100, 300, 'barrel').setOrigin(0.3, 0.5);
        this.barrel.setScale(0.5);

        this.enemy1 = this.physics.add.sprite(600, 100, 'adam');
        this.enemy1.body.allowGravity = false;
        this.enemy1.setScale(0.3);
        this.enemy2 = this.physics.add.sprite(600, 300, 'adam');
        this.enemy2.body.allowGravity = false;
        this.enemy2.setScale(0.3);
        this.enemy3 = this.physics.add.sprite(600, 500, 'adam');
        this.enemy3.body.allowGravity = false;
        this.enemy3.setScale(0.3);

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
        this.physics.world.overlap(this.enemy1, this.bullet, this.hitEnemy, null, this);
        this.physics.world.overlap(this.enemy2, this.bullet, this.hitEnemy, null, this);
        this.physics.world.overlap(this.enemy3, this.bullet, this.hitEnemy, null, this);
        if (this.bullet.x > window.innerWidth || this.bullet.y > window.innerHeight
            || this.bullet.x < 0 || this.bullet.y < 0) {
            this.reset();
        }
    },
    fire: function (x, y) {
        this.physics.moveTo(this.bullet, x, y, 60, 750);
    }
    ,
    reset: function () {
        this.bullet.x = 100;
        this.bullet.y = 300;
        this.bullet.setVelocity(0, 0);
    },
    hitEnemy: function (e) {
        this.reset();
        e.destroy();
        this.score += 100;
        this.text.setText("Your Score: " + this.score);
    }

}

export default AttackingAdams;