
let controller = makeGameController();

const board = document.querySelector('.board');
const statusText = document.querySelector('.status p');

const remainingSpaces = [];
let id = 0;

for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
        const space = document.createElement('div');
        space.classList.add('space');
        space.id = id++;

        let onClick;

        onClick = () => {
            space.removeEventListener("click", onClick);

            remainingSpaces.splice(remainingSpaces.findIndex(s => s.id === space.id), 1);

            controller.makePlay(x, y);

            const token = controller.getSpace(x, y);

            space.textContent = token === 1 ? "X" : "O";

            if (controller.isWin(x, y)) {
                console.log("Winner");
                
                statusText.textContent = token === 1 ?
                    "Player 1 wins!" : "Player 2 wins!";

                remainingSpaces.forEach(s => s.clearOnClick());
                return;
            }

            if (controller.isTie()) {
                console.log("Tie game");

                statusText.textContent = "Tie game";
                return;
            }

            statusText.textContent = token === 1 ? 
                "Player 2s turn" : "Player 1s turn";
        };

        space.addEventListener("click", onClick);

        remainingSpaces.push({
            id: space.id,
            clearOnClick: () => space.removeEventListener("click", onClick),
        });

        board.appendChild(space);
    }
}

