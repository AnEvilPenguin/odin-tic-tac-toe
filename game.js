
function makeGameBoard () {
    const makeRow = () => new Array(3);

    const board = [
        makeRow(),
        makeRow(),
        makeRow(),
    ]
    return board;
}
