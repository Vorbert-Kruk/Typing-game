class Letter {
    constructor(value, x = 0, y = 0, velocity = 25 / 4, fontSize = 25, color = getRandomColor()) {
        this.value = value;
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.fontSize = fontSize;
        this.color = color;
    }
}