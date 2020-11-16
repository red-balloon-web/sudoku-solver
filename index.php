<?php include 'functions.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css" >
    <title>Red Balloon Sudoku Solver</title>
</head>
<body>
    <h1>Sudoku Solver</h1>
    <table><?php
    
        // draw the board
        for ($r=0; $r <= 8; $r++ ) {
            echo '<tr>';
            for ($c = 0; $c <= 8; $c++ ) {
                // assign td row column square classes
                echo '<td class="r' . $r . ' c' . $c . ' s' . get_cell_square($r, $c) . '">';
                // same for <input>
                echo '<input type="text" value="" class="ir' . $r . ' ic' . $c . ' is' . get_cell_square($r, $c) . '">';
                echo '</td>';
            }
            echo '</tr>';
        } ?>

    </table>

    <input type="button" value="Solve It!" id="go-button"> 

    <script src="script.js"></script>

</body>
</html>