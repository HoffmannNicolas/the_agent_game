
export default class MapDisplay {

    constructor(container, map, initial_n_cells_displayed, initial_center_cell, agents) {
        this.container = container;
        this.map = map;
        this.initial_n_cells_displayed = initial_n_cells_displayed;
        this.n_cells_displayed = initial_n_cells_displayed;
        this.inital_center_cell = initial_center_cell;
        this.center_cell = [...this.inital_center_cell];
        this.agents = agents;
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

        this.w_min = this.center_cell[0] - Math.floor(this.n_cells_displayed / 2);
        this.w_max = this.center_cell[0] + Math.ceil(this.n_cells_displayed / 2);
        this.h_min = this.center_cell[1] - Math.floor(this.n_cells_displayed / 2);
        this.h_max = this.center_cell[1] + Math.ceil(this.n_cells_displayed / 2);

        for (let h = this.h_min; h < this.h_max; h++) {
            const row = document.createElement('tr');
            for (let w = this.w_min; w < this.w_max; w++) {
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

        // Draw agents
        for (let agent of this.agents) {
            const [x, y] = agent.get_position();
            const [x_percent, y_percent] = this.cell_to_percent(x, y);
            const agent_element = document.createElement('div');
            const agent_size = agent.get_size();
            agent_element.style.position = 'absolute';
            agent_element.style.width = `${100 * agent_size / this.n_cells_displayed}%`;
            agent_element.style.height = `${100 * agent_size / this.n_cells_displayed}%`;
            agent_element.style.borderRadius = '50%';
            agent_element.style.backgroundColor = 'red';
            agent_element.style.left = `${x_percent}%`;
            agent_element.style.top = `${y_percent}%`;
            this.container.appendChild(agent_element);
        }
    }

    cell_to_percent(x_cell, y_cell) {
        const x_prop = (0.5 + x_cell - this.w_min) / (this.w_max - this.w_min);
        const y_prop = (0.5 + y_cell - this.h_min) / (this.h_max - this.h_min);
        return [100 * x_prop, 100 * y_prop];
    }
        

    move_up() {
        this.center_cell[1] -= Math.ceil(this.n_cells_displayed / 15);
        this.container.innerHTML = '';
        this.render();
    }

    move_down() {
        this.center_cell[1] += Math.ceil(this.n_cells_displayed / 15);
        this.container.innerHTML = '';
        this.render();
    }

    move_left() {
        this.center_cell[0] -= Math.ceil(this.n_cells_displayed / 15);
        this.container.innerHTML = '';
        this.render();
    }

    move_right() {
        this.center_cell[0] += Math.ceil(this.n_cells_displayed / 15);
        this.container.innerHTML = '';
        this.render();
    }


    zoom_in() {
        this.n_cells_displayed = Math.max(10, Math.ceil(this.n_cells_displayed*0.9));
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

