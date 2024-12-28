
import Map from './Map.js';
import MapDisplay from './MapDisplay.js';

export default class GameInterface {

    constructor(container) {
        this.container = container;

        this.map_width_cell = 100;
        this.map_height_cell = 100;
        this.map = new Map(this.map_width_cell, this.map_height_cell);

        const map_size_pixels = Math.min(container.offsetWidth, container.offsetHeight);
        const map_container = document.createElement('div');
        map_container.style.width = `${map_size_pixels}px`;
        map_container.style.height = `${map_size_pixels}px`;
        map_container.style.backgroundColor = 'green';
        this.container.appendChild(map_container);

        let initial_n_cell_displayed = Math.floor((this.map_width_cell + this.map_height_cell) / 3);
        let initial_center_cell = [Math.floor(this.map_width_cell / 2), Math.floor(this.map_height_cell / 2)];
        this.map_display = new MapDisplay(map_container, this.map, initial_n_cell_displayed, initial_center_cell);
    
        document.addEventListener('DOMContentLoaded', () => {
            const keyCallbacks = {
                'ArrowUp': () => this.map_display.move_up(),
                'ArrowDown': () => this.map_display.move_down(),
                'ArrowLeft': () => this.map_display.move_left(),
                'ArrowRight': () => this.map_display.move_right(),
                'Enter': () => console.log('Enter key pressed!'),
                'Escape': () => this.map_display.reset_view(),
                ' ': () => console.log('Space key pressed!'),
                'a': () => this.map_display.zoom_in(),
                'z': () => this.map_display.zoom_out(),
            };

            // Add the event listener for keydown
            document.addEventListener('keydown', (event) => {
                const key = event.key; // Get the key that was pressed
                if (keyCallbacks[key]) {
                    keyCallbacks[key](); // Call the callback if it exists
                }
            });

        });

    
    }




    render() {

        this.map_display.render();

    }
}
