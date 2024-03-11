
function makeGameController(player1Name = 'Player 1', player2Name = 'Player 2') {
    const makePlayer = (name, token) => {
        const player = {
            name,
            token
        }

        return player;
    }
    const player1 = makePlayer(player1Name, 1);
    const player2 = makePlayer(player2Name, 2);

    const { board, playToken, getSpace } = (() => {
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

        const getSpace = (x, y) => board[y][x];

        return {
            board,
            getSpace,
            playToken,
        };
    })();

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

    /* diag1 top left to bottom right */
    const getDiagonal1 = () => [board[0][0], board[1][1], board[2][2]];
    /* dag2 top right to bottom left */
    const getDiagonal2 = () => [board[0][2], board[1][1], board[2][0]];

    const checkWin = (x, y) => {
        const rowWin = checkArray(board[y]);
        const columnWin = checkArray(board.map(r => r[x]));
        let diag1Win;
        let diag2Win;

        // only need to check diagonals when a relevant space is occupied
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

    let round = 0;

    const makePlay = (x, y) => {
        round++;
        playToken(x, y, currentPlayer.token);
        const winDetails = checkWin(x, y);

        if (winDetails.win) {
            return {
                ...currentPlayer,
                ...winDetails,
            };
        } else if (round === 9) {
            return {
                tieGame: true,
            };
        }

        setNextPlayer();
    };

    return {
        board,
        getSpace,
        makePlay,
    };
}

