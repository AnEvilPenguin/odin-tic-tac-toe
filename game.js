
function makeGameBoard () {
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

function makePlayer (name, token) {
    const player = {
        name,
        token
    }
    
    return player;
}

