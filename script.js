document.getElementById('go-button').onclick = function() {
    previousCell = null;
    currentCellRow = '0';
    currentCellColumn = '0';
    logicLevel = 2;
    changed = false;
    doLogic = setInterval(runCellLogic, 10);
};

function runCellLogic() {

    if (logicLevel == 1) {

        // light it up
        currentCell = document.getElementsByClassName('r' + currentCellRow + ' c' + currentCellColumn);
        currentCell[0].classList.add('current');

        // turn the last one off
        if (previousCell) {
            previousCell.classList.remove('current');
            previousCell.classList.remove('solved');
        }
        previousCell = currentCell[0];

        // do the business
        currentCellInput = document.getElementsByClassName('ir' + currentCellRow + ' ic' + currentCellColumn);
        currentCellValue = currentCellInput[0].value;
        if (!currentCellValue) {

            // initialise possibles
            possibles = [1,2,3,4,5,6,7,8,9];

            // test current row
            currentRow = document.getElementsByClassName('ir' + currentCellRow);
            for (i = 0; i < 9; i++) {
                testCell = currentRow[i];
                if (testCell.value) {
                    const valueIndex = possibles.indexOf(parseInt(testCell.value));
                    if (valueIndex > -1) {
                        possibles.splice(valueIndex, 1);
                    }
                }
            }

            // test current column
            currentColumn = document.getElementsByClassName('ic' + currentCellColumn);
            for (i = 0; i < 9; i++) {
                testCell = currentColumn[i];
                if (testCell.value) {
                    //console.log(testCell.value);
                    const valueIndex = possibles.indexOf(parseInt(testCell.value));
                    if (valueIndex > -1) {
                        possibles.splice(valueIndex, 1);
                    }
                }
            }

            // test current square
            currentCellSquare = getCurrentCellSquare(currentCellRow, currentCellColumn);
            currentSquare = document.getElementsByClassName('is' + currentCellSquare);
            for (i = 0; i < 9; i++) {
                testCell = currentSquare[i];
                if (testCell.value) {
                    const valueIndex = possibles.indexOf(parseInt(testCell.value));
                    if (valueIndex > -1) {
                        possibles.splice(valueIndex, 1);
                    }
                }
            }

            // update square if only one possible
            console.log(possibles);
            if (possibles.length == 1) {
                currentCellInput[0].value = possibles[0];
                changed = true;
                currentCell[0].classList.add('solved');
            }
        }
        
        // move logic level on if it's the last cell
        if (currentCellColumn == 8 && currentCellRow == 8) {
            console.log ('starting logic level 2');
            currentCellColumn = 0;
            currentCellRow = 0;
            logicLevel = 2;
                
        } else { // otherwise move onto the next cell
            currentCellColumn ++;
            if (currentCellColumn > 8 && currentCellRow <= 8) {
                currentCellColumn = 0;
                currentCellRow++;
            }
        }
        
    } else if (logicLevel == 2) {

        console.log ('logic level 2');

        // take the first row
        currentRow = document.getElementsByClassName('ir0');

        // do a test to see if the row is already completed

        // go through and test for each number
        for (i = 1; i <= 9; i++) {
            console.log ('testing for number ' + i);

            inRow = false;

            // is the number already in the row?
            for (ii = 0; ii <= 8; ii++) {
                if (currentRow[ii].value == i) {
                    console.log(i + ' is already in row');
                    inRow = true;
                }
            }
            
            // otherwise test each square to see if it could be
            if (!inRow) {
                possibles = [0,1,2,3,4,5,6,7,8];
                for (ii = 0; ii <= 8; ii++) {
                    if (currentRow[ii].value) {
                        //console.log ('square ' + ii + ' already has a value');
                        const valueIndex = possibles.indexOf(ii);
                        possibles.splice(valueIndex, 1);
                    }
                }
                console.log ('vacant squares for ' + i);
                console.log (possibles);

                // now test each square to see if it can be that number
                finalPossibles = [];
                for (ii = 0; ii < possibles.length; ii++ ) { // the array of vacant squares
                    console.log('testing cell no. ' + possibles[ii]);
                    canItBe = true;

                    // test the column
                    console.log('testing column no. ' + possibles[ii])
                    columnSquares = document.getElementsByClassName('ic' + possibles[ii]);
                    for (iii = 0; iii <= 8; iii++) {
                        if (columnSquares[iii].value) {
                            if (columnSquares[iii].value == i) {
                                console.log (i + ' found in column ' + possibles[ii]);
                                canItBe = false;
                            }
                        }
                    }

                    if (canItBe) {
                        finalPossibles.push(possibles[ii]);
                    }
                }

                console.log ('final possibles for ' + i);
                console.log(finalPossibles);

                if (finalPossibles.length == 1) {
                    console.log ('solved cell ' + finalPossibles[0] + ' = ' + i);
                    
                    // get the input cell and add the new value
                    classString = 'ic' + finalPossibles[0] + ' ' + 'ir0'; // make rows dynamic
                    theInputCell = document.getElementsByClassName(classString);
                    theInputCell[0].value = i;

                    // get the table cell and light it up
                    classString = 'c' + finalPossibles[0] + ' ' + 'r0'; // make rows dynamic
                    theTableCell = document.getElementsByClassName(classString);
                    theTableCell[0].classList.add('solved');
                    window.setTimeout(function() { theTableCell[0].classList.remove('solved'); }, 50);
                }

            }
        }

        // stop if we're not making any changes
        if (!changed) {
            console.log('finished');
            window.clearInterval(doLogic);
        }
    } // logic level 2
}


/*
// move logic level on if it's the last cell
        if (currentCellColumn == 8 && currentCellRow == 8) {
            if (!changed) {
                window.clearInterval(doLogic);
                console.log ('finished');
            } else {
                currentCellRow = '0';
                currentCellColumn = '0';
                changed = false;
            }
        }
*/

function getCurrentCellSquare(row, column) {
    if (row <=2 ) {
        if (column <= 2) {
            return 0;
        } else if (column <= 5) {
            return 1;
        } else {
            return 2;
        }
    } else if (row <= 5) {
        if (column <= 2) {
            return 3;
        } else if (column <= 5) {
            return 4;
        } else {
            return 5;
        }
    } else {
        if (column <= 2) {
            return 6;
        } else if (column <= 5) {
            return 7;
        } else {
            return 8;
        }
    }
}