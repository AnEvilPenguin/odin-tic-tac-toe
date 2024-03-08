
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
    
    const checkArray = (arr) => {
        if (!Array.isArray(arr)) {
            throw new Error('Must provide valid array');
        }

        const unique = Array.from(new Set(arr));
        return unique.length === 1 && unique[0] != null;
    }

    const getDiagonal1 = () => [board[0][0], board[1][1], board[2][2]];
    const getDiagonal2 = () => [board[0][2], board[1][1], board[2][0]];

    const checkWin = (x, y) => {

        const rowWin = checkArray(board[y]);
        const columnWin = checkArray(board.map(r => r[x]));
        let diag1Win;
        let diag2Win;

        if (x - y === 0) {
            diag1Win = checkArray(getDiagonal1());
        }

        if (x + y === 2) {
            diag2Win = checkArray(getDiagonal2());
        }

        return {
            rowWin,
            columnWin,
            diag1Win,
            diag2Win,
            win: rowWin || columnWin || diag1Win || diag2Win,
        };
    }

    const makePlay = (x, y) => {
        playToken(x, y, currentPlayer.token);
        const winDetails = checkWin(x, y);

        if (winDetails.win) {
            return {
                ...currentPlayer,
                ...winDetails,
            };
        }
        
        setNextPlayer();
    };

    return {
        board,
        makePlay,
        checkWin,
    };
}
