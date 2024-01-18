
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

// c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2
class Sprite {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.jumpTime = 2
    }

    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    update() {

        this.position.x += this.velocity.x

        this.position.y += this.velocity.y
        if (this.position.y + this.height >= canvas.height) {
            this.velocity.y = 0
            this.position.y = canvas.height - this.height
            this.jumpTime = 2
            console.log("Reset : ", this.jumpTime)
            
        } else {
            this.velocity.y += gravity
        }


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

    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

function animate() {

    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.draw()
    player.update()

    enemy.draw()
    enemy.update()

    if (keys.a.pressed) {
        player.velocity.x = -1
    } else if (keys.d.pressed) {
        player.velocity.x = 1

    } else {
        player.velocity.x = 0
    }
    if (keys.w.pressed) {
        player.velocity.y = -7

    }
    if (keys.ArrowLeft.pressed) {
        enemy.velocity.x = -1
    } else if (keys.ArrowRight.pressed) {
        enemy.velocity.x = 1
    } else {
        enemy.velocity.x = 0
    }
    if (keys.ArrowUp.pressed) {
        enemy.velocity.y = -7
    }

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
                if( player.jumpTime <= 0 ){
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

        case 'ArrowUp':
            if (event.repeat) {
                keys.ArrowUp.pressed = false
            } else {
                keys.ArrowUp.pressed = true
                enemy.jumpTime--
                if(enemy.jumpTime <= 0){
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

        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break

        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
    }
})
