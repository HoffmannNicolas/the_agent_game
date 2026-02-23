


export default class Agent {

    constructor(initial_position_x, initial_position_y, size) {

        this.position_x = initial_position_x;
        this.position_y = initial_position_y;
        this.size = size;
        
    }

    get_position() {
        return [this.position_x, this.position_y];
    }

    get_size() {
        return this.size;
    }


    tick() {

        console.log("agent tick");

    }


}

