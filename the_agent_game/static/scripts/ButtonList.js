
import Button from './Button.js';

export default class ButtonList {

    constructor(container, name1, name2) {

        this.container = container;

        // Split the container into two halves
        const leftHalf = document.createElement('div');
        const rightHalf = document.createElement('div');

        // Apply some basic styles to split the container
        leftHalf.style.width = '50%';
        leftHalf.style.float = 'left';
        leftHalf.style.backgroundColor = 'red';

        rightHalf.style.width = '50%';
        rightHalf.style.float = 'right';
        rightHalf.style.backgroundColor = 'blue';

        // Append the halves to the main container
        this.container.appendChild(leftHalf);
        this.container.appendChild(rightHalf);

        this.button1 = new Button(leftHalf, name1);
        this.button2 = new Button(rightHalf, name2);
    }

    render() {

        this.button1.render();
        this.button2.render();

    }
}
