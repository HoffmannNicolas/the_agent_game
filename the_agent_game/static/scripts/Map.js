
import PerlinNoise from './Perlin_Noise.js';


export default class Map {

    constructor(container) {
        this.container = container;
        this.array_width = 100;
        this.array_height = 100;
        // this.array = this.generateRandomArray(
        this.array = this.generate_perlin_noise(
                this.array_width,
            this.array_height
        );
    }

    generateRandomArray(width, height) {
        const array = [];
        for (let i = 0; i < height; i++) {
            const row = [];
            for (let j = 0; j < width; j++) {
                row.push(Math.floor(Math.random() * 256)); // Random value between 0 and 255
            }
            array.push(row);
        }
        return array;
    }


    generate_perlin_noise(width, height) {
        const perlin = new PerlinNoise();
        const array = [];
        for (let i = 0; i < height; i++) {
            const row = [];
            for (let j = 0; j < width; j++) {
                const val = perlin.noise(i * 0.06, j * 0.06);
                row.push(Math.floor((1 + val) * 128));
            }
            array.push(row);
        }

        return array;
    }

    render() {
        const table = document.createElement('table');
        table.style.borderCollapse = 'collapse';
        table.style.width = '100%';
        table.style.height = '100%';

        this.array.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(value => {
                const td = document.createElement('td');
                const greyValue = Math.max(0, Math.min(255, value)); // Clamp value between 0 and 255
                td.style.backgroundColor = `rgb(${greyValue}, ${greyValue}, ${greyValue})`;
                td.style.width = `{100/this.array_width}%`; // '20px';
                td.style.height = `{100/this.array_height}%`; // '20px';
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });

        this.container.appendChild(table);
    }
}

