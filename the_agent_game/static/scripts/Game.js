
import Map from './Map.js';
import Agent from './Agent.js';


export default class Game {

    constructor(map_width_cell, map_height_cell) {

        this.map = new Map(map_width_cell, map_height_cell);

        this.agents = [];
        this.agents.push(new Agent(5, 5, 0.5));
        this.tick();
    }

    tick() {
        for (let agent of this.agents) {
            agent.tick();
        }
    }


}

