
import PerlinNoise from './PerlinNoise.js';


export default class Map {

    constructor(map_width, map_height) {
        this.map_width = map_width;
        this.map_height = map_height;

        this.array = this.generate_perlin_noise(
            this.map_width,
            this.map_height
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

}

