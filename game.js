
function makeGameBoard() {
    const makeRow = () => new Array(3);

    const board = [
        makeRow(),
        makeRow(),
        makeRow(),
    ]

    const playToken = (x, y, token) => {
        const space = board[y][x];

        if (space) {
            throw new Error('Space already full');
        }

        board[y][x] = token;
    };

    return {
        board,
        playToken
    };
}

function makePlayer(name, token) {
    const player = {
        name,
        token
    }

    return player;
}

function makeGameController() {
    const player1 = makePlayer('Player 1', 1);
    const player2 = makePlayer('Player 2', 2);

    const { board, playToken } = makeGameBoard();

    let currentPlayer = player1;
    const setNextPlayer = () => currentPlayer === player1 ?
        currentPlayer = player2 :
        currentPlayer = player1;

    const makePlay = (x, y) => {
        playToken(x, y, currentPlayer.token);
        // TODO check if player won
        setNextPlayer();
    };

    return {
        board,
        makePlay,
    };
}

