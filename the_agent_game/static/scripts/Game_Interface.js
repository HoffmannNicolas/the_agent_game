
import Map from './Map.js';

export default class Game_Interface {

    constructor(container) {

        this.container = container;

        // Get width and hiehgt of the container in pixel
        const map_size = Math.min(container.offsetWidth, container.offsetHeight);

        const map_container = document.createElement('div');
        map_container.style.width = `${map_size}px`;
        map_container.style.height = `${map_size}px`;
        map_container.style.backgroundColor = 'green';
        this.container.appendChild(map_container);

        this.map = new Map(map_container);

    }

    render() {

        this.map.render();

    }
}
