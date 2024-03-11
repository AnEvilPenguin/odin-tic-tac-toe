
let controller = makeGameController();

let board = document.querySelector('.board');

for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
        const space = document.createElement('div');
        space.classList.add('space');

        let onClick;

        onClick = () => {
            const result = controller.makePlay(x, y);
            console.log(result);

            const token = controller.getSpace(x, y);
            console.log(token);

            space.removeEventListener("click", onClick);
        };

        space.addEventListener("click", onClick);
        board.appendChild(space);
    }
}

