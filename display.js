
let controller = makeGameController();

let board = document.querySelector('.board');

for (let i = 0; i < 9; i++) {
    const space = document.createElement('div');
    space.classList.add('space');

    board.appendChild(space);
}
