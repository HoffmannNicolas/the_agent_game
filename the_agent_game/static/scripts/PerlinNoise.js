
export default class PerlinNoise {

    constructor() {
        this.gradients = {};
        this.permutations = [...Array(256).keys()];
        this.shuffleArray(this.permutations);
        this.permutations = this.permutations.concat(this.permutations);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    dotGridGradient(ix, iy, x, y) {
        const gradient = this.getGradient(ix, iy);
        const dx = x - ix;
        const dy = y - iy;
        return dx * gradient[0] + dy * gradient[1];
    }

    getGradient(x, y) {
        const key = `${x},${y}`;
        if (!this.gradients[key]) {
            const angle = Math.random() * Math.PI * 2;
            this.gradients[key] = [Math.cos(angle), Math.sin(angle)];
        }
        return this.gradients[key];
    }

    fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    lerp(a, b, t) {
        return a + t * (b - a);
    }

    noise(x, y) {
        const x0 = Math.floor(x);
        const x1 = x0 + 1;
        const y0 = Math.floor(y);
        const y1 = y0 + 1;

        const sx = this.fade(x - x0);
        const sy = this.fade(y - y0);

        const n0 = this.dotGridGradient(x0, y0, x, y);
        const n1 = this.dotGridGradient(x1, y0, x, y);
        const ix0 = this.lerp(n0, n1, sx);

        const n2 = this.dotGridGradient(x0, y1, x, y);
        const n3 = this.dotGridGradient(x1, y1, x, y);
        const ix1 = this.lerp(n2, n3, sx);

        return this.lerp(ix0, ix1, sy);
    }
}

