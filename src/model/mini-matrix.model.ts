import { DotMatrix } from "./dot-matrix.model";
const MATRIX_ROW_SIZE = 5;
const MATRIX_COLUMN_SIZE = 12;

export class MiniMatrix extends DotMatrix{
    constructor() {
        super(MATRIX_ROW_SIZE, MATRIX_COLUMN_SIZE);
    }
}