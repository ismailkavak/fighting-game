
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
const margin = 15
// c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7
class Sprite {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.jumpTime = 2
        this.attackBoxHeight = 50
        this.attackBoxWidth = 90
        this.health = 100
    }

    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        if (keys.e.pressed) {
            c.fillStyle = "blue"
            c.fillRect(player.position.x, player.position.y, this.attackBoxWidth, this.attackBoxHeight)

            if (player.position.x + player.attackBoxWidth >= enemy.position.x) {
                this.health -= 10
                console.log("It worked!")
                console.log(this.health)
            }

        }

        if (keys.i.pressed) {
            c.fillStyle = "blue"
            c.fillRect(enemy.position.x - (this.attackBoxWidth - this.width), enemy.position.y, this.attackBoxWidth, this.attackBoxHeight)
            // console.log(enemy.position.x + margin + enemy.width)
            // console.log((enemy.position.x - (this.attackBoxWidth - this.width)) - enemy.attackBoxWidth)
            // console.log((enemy.position.x - (this.attackBoxWidth - this.width)) - enemy.attackBoxWidth + this.width)
            // console.log(player.position.x + player.width)

            if ((enemy.position.x - (this.attackBoxWidth - this.width)) - enemy.attackBoxWidth + this.width <= player.position.x + player.width) {
                this.health -= 10
                console.log("It worked!")
                console.log(this.health)
            }

        }
    }


    update() {
        if (this.position.y + this.height > canvas.height) {
            this.position.y = canvas.height - this.height
            this.jumpTime = 2
            this.velocity.y = 0

        } else {
            this.velocity.y += gravity
        }

        if (this.position.x <= margin) {

            this.position.x = margin
        }
        if (this.position.x >= canvas.width - this.width - margin) {

            this.position.x = canvas.width - this.width - margin
        }

        if (player.position.x + this.width + margin > enemy.position.x) {
            this.velocity.x = 0
            if (player.velocity.x > 0 && enemy.velocity.x == 0) {
                player.position.x = enemy.position.x - this.width - margin
            } else if (enemy.velocity.x < 0 && player.velocity.x == 0) {
                enemy.position.x = player.position.x + this.width + margin
            }

            // The above conditions trigger first !
            // else if (player.velocity.x > 0 && enemy.velocity.x < 0) {
            //     player.position.x += (enemy.position.x - player.position.x - this.width) / 2
            //     enemy.position.x -= (enemy.position.x - player.position.x - this.width) / 2
            // }

        }

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y


    }
}


const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }

})

const enemy = new Sprite({
    position: {
        x: 974,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }

})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    e: {
        pressed: false
    },

    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    i: {
        pressed: false
    }
}

function animate() {

    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);



    if (keys.a.pressed) {
        player.velocity.x = -4
    } else if (keys.d.pressed) {
        player.velocity.x = 4

    } else {
        player.velocity.x = 0
    }
    if (keys.w.pressed) {
        player.velocity.y = -10
    }

    player.draw()
    player.update()

    if (keys.ArrowLeft.pressed) {
        enemy.velocity.x = -4
    } else if (keys.ArrowRight.pressed) {
        enemy.velocity.x = 4
    } else {
        enemy.velocity.x = 0
    }
    if (keys.ArrowUp.pressed) {
        enemy.velocity.y = -10
    }
    enemy.draw()
    enemy.update()

    window.requestAnimationFrame(animate)
}


window.requestAnimationFrame(animate)

window.addEventListener("keydown", function (event) {
    switch (event.key) {
        case 'w':
            if (event.repeat) {
                keys.w.pressed = false
            } else {
                keys.w.pressed = true
                player.jumpTime--
                if (player.jumpTime <= 0) {
                    keys.w.pressed = false
                }
            }
            break

        case 'a':
            keys.a.pressed = true
            break

        case 'd':
            keys.d.pressed = true
            break

        case 'e':
            if (event.repeat) {
                keys.e.pressed = false
            } else {
                keys.e.pressed = true
            }

            break

        case 'ArrowUp':
            if (event.repeat) {
                keys.ArrowUp.pressed = false
            } else {
                keys.ArrowUp.pressed = true
                enemy.jumpTime--
                if (enemy.jumpTime <= 0) {
                    keys.ArrowUp.pressed = false
                }
            }
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            break
        case 'i':
            if (event.repeat) {
                keys.i.pressed = false
            } else {
                keys.i.pressed = true
            }

            break
    }
})

window.addEventListener("keyup", function (event) {
    switch (event.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break

        case 'd':
            keys.d.pressed = false
            break
        case 'e':
            keys.e.pressed = false
            break

        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'i':
            keys.i.pressed = false
            break
    }
})
