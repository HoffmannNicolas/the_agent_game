
export default class Button {

    constructor(container, name) {

        this.container = container;
        this.name = name;

    }

    render() {

        const button = document.createElement('button');
        button.textContent = this.name;

        this.container.appendChild(button);

    }
}
