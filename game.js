
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

    const { getSpace, setSpace, isWin } = (() => {
        const makeRow = () => new Array(3);

        const board = [
            makeRow(),
            makeRow(),
            makeRow(),
        ]

        const getSpace = (x, y) => board[y][x];

        const setSpace = (x, y, token) => board[y][x] = token;

        const checkArray = (arr) => {
            if (!Array.isArray(arr)) {
                throw new Error('Must provide valid array');
            }

            const unique = Array.from(new Set(arr));
            return unique.length === 1 && unique[0] != null;
        }

        /* diag1 top left to bottom right */
            const getDiagonal1 = () => [getSpace(0, 0), getSpace(1, 1), getSpace(2, 2)]
        /* dag2 top right to bottom left */
            const getDiagonal2 = () => [getSpace(2, 0), getSpace(1, 1), getSpace(0, 2)];


        const isWin = (x, y) => {
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

            return rowWin || columnWin || diag1Win || diag2Win;
        }

        return {
            board,
            getSpace,
            setSpace,
            isWin,
        };
    })();

    let currentPlayer = player1;

    const setNextPlayer = () => currentPlayer === player1 ?
        currentPlayer = player2 :
        currentPlayer = player1;

    let round = 0;
    
    const isTie = () => round === 9;

    const makePlay = (x, y) => {
        round++;

        const space = getSpace(x, y);

        if (space) {
            throw new Error('Space not empty');
        }

        setSpace(x, y, currentPlayer.token);
        setNextPlayer();
    };

    return {
        getSpace,
        makePlay,
        isWin,
        isTie,
    };
}

