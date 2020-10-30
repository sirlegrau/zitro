const config = {

    /** configuracion del juego, tamaño de la pantalla, centnrado al medio y fondo blanco **/
    width: 416,
    height: 721,
    parent: "container",
    type: Phaser.AUTO,
    backgroundColor: '#FFFFFF',
    autoCenter: true,
    // scene: [SceneA],
    scene: {
        preload,
        create,
        update,
    },
};

game = new Phaser.Game(config);


function preload() {

    /** Cargamos los assets**/
    this.load.image("spin", "./assets/spin.png");
    this.load.image("left", "./assets/simbolos.png");
    this.load.image("right", "./assets/simbolos.png");
    this.load.image("center", "./assets/simbolos.png");
    this.load.image("fondo", "./assets/fondo.png");

}

function create() {

    /** Declaramos y pintamos los elementos**/

    center = this.add.tileSprite(config.width / 2, config.height / 2, 0, 0, "center");
    left = this.add.tileSprite(config.width / 4, config.height / 2, 0, 0, "left");
    right = this.add.tileSprite(config.width / 1.33, config.height / 2, 0, 0, "right");
    this.fondo = this.add.image(config.width / 2, config.height / 2, "fondo");
    this.spin = this.add.sprite(config.width / 2, config.height / 1.5 + 100, "spin").setInteractive();


    this.spin.on('pointerdown', function () {
        actionOnClick();
    });


    text = this.add.text(config.width / 4, 150, '', {fill: '#FFFFFF'});

}


function update(time) {

    /** Usaremos el metodo update para actualizar el reloj dinamicamente, se esta anclado a la api http://worldtimeapi.org/api/ip**/

    var llamada = time.toFixed();
    if (llamada % 5 === 0) {
        fetch('http://worldtimeapi.org/api/ip')
            .then((res) => res.json()).then((data) => updatedate(data));
    }
    //console.log(time);

}


function updatedate(data) {

    var dateapi = data.datetime.slice(0, -13);

    var year = dateapi.slice(0, -15);
    var mes = dateapi.slice(5, -12);
    var dia = dateapi.slice(8, -9);
    var currenttime = dateapi.slice(-8);

    text.text = dia + '/' + mes + '/' + year + ' ' + currenttime;
    //console.log(data.datetime);
}


function actionOnClick() {

    /** Botón SPIN que pone ne marcha lso slots, faltan animarlos y hacer que se paren alineados justo en el medio. Están completamente randomizados. **/

    let i;
    let j;
    let k;

    if (left.tilePositionY <= -10000) {
        left.tilePositionY = 0;
    }
    if (right.tilePositionY <= -10000) {
        right.tilePositionY = 0;
    }
    if (right.tilePositionY <= -10000) {
        right.tilePositionY = 0;
    }

    left.tilePositionY = left.tilePositionY + (Math.floor(Math.random() * 100) + 51);
    right.tilePositionY = right.tilePositionY + (Math.floor(Math.random() * 150) + 51);
    center.tilePositionY = center.tilePositionY + (Math.floor(Math.random() * 233) + 51);


    for (k = 0; k < 50000; k++) {
        setTimeout(function () {
        }, 10);
        left.tilePositionY = left.tilePositionY - (Math.floor(Math.random() * 6) + 2);
        if (left.tilePositionY % 65 === 0) {
            k = 50000;
        }
    }
    for (j = 0; j < 50000; j++) {
        center.tilePositionY = center.tilePositionY - (Math.floor(Math.random() * 6) + 2);
        if (center.tilePositionY % 65 === 0) {
            j = 50000;
        }
    }
    for (i = 0; i < 50000; i++) {
        right.tilePositionY = right.tilePositionY - (Math.floor(Math.random() * 6) + 2);
        if (right.tilePositionY % 65 === 0) {
            i = 50000;
        }
    }
}
