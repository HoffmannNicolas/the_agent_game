
import Map from './Map.js';


export default class MapDisplay {

    constructor(container, map, initial_n_cells_displayed, initial_center_cell) {
        this.container = container;
        this.map = map;
        this.initial_n_cells_displayed = initial_n_cells_displayed;
        this.n_cells_displayed = initial_n_cells_displayed;
        this.inital_center_cell = initial_center_cell;
        this.center_cell = [...this.inital_center_cell];
    }

    cell_is_in_map(w, h) {
        if (w < 0 || w >= this.map.map_width) {
            return false;
        }
        if (h < 0 || h >= this.map.map_height) {
            return false;
        }
        return true;
    }

    render() {
        this.container.innerHTML = '';

        const table = document.createElement('table');
        table.style.borderCollapse = 'collapse';
        table.style.width = '100%';
        table.style.height = '100%';

        const w_min = this.center_cell[0] - Math.floor(this.n_cells_displayed / 2);
        const w_max = this.center_cell[0] + Math.ceil(this.n_cells_displayed / 2);
        const h_min = this.center_cell[1] - Math.floor(this.n_cells_displayed / 2);
        const h_max = this.center_cell[1] + Math.ceil(this.n_cells_displayed / 2);

        for (let h = h_min; h < h_max; h++) {
            const row = document.createElement('tr');
            for (let w = w_min; w < w_max; w++) {
                const cell = document.createElement('td');
                cell.style.width = `${100 / this.n_cells_displayed}%`;
                cell.style.height = `${100 / this.n_cells_displayed}%`;
                
                let val = 0;
                if (this.cell_is_in_map(w, h)) {
                    val = this.map.array[h][w];
                }
                cell.style.backgroundColor = `rgb(${val}, ${val}, ${val})`;
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        this.container.appendChild(table);
    }

    move_up() {
        this.center_cell[1] -= Math.floor(this.n_cells_displayed / 15);
        this.container.innerHTML = '';
        this.render();
    }

    move_down() {
        this.center_cell[1] += Math.floor(this.n_cells_displayed / 15);
        this.container.innerHTML = '';
        this.render();
    }

    move_left() {
        this.center_cell[0] -= Math.floor(this.n_cells_displayed / 15);
        this.container.innerHTML = '';
        this.render();
    }

    move_right() {
        this.center_cell[0] += Math.floor(this.n_cells_displayed / 15);
        this.container.innerHTML = '';
        this.render();
    }


    zoom_in() {
        this.n_cells_displayed = Math.max(10, Math.floor(this.n_cells_displayed*0.9));
        this.container.innerHTML = '';
        this.render();
    }

    zoom_out() {
        this.n_cells_displayed = Math.min(1000, Math.ceil(this.n_cells_displayed*1.1));
        this.container.innerHTML = '';
        this.render();
    }

    reset_view() {
        this.center_cell = [...this.inital_center_cell];
        this.n_cells_displayed = this.initial_n_cells_displayed;
        this.container.innerHTML = '';
        this.render();
    }

}

