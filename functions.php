<?php

function get_cell_square($row, $column) {
    if ($row <=2 ) {
        if ($column <= 2) {
            return 0;
        } else if ($column <= 5) {
            return 1;
        } else {
            return 2;
        }
    } else if ($row <= 5) {
        if ($column <= 2) {
            return 3;
        } else if ($column <= 5) {
            return 4;
        } else {
            return 5;
        }
    } else {
        if ($column <= 2) {
            return 6;
        } else if ($column <= 5) {
            return 7;
        } else {
            return 8;
        }
    }
}