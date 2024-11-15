import { DotMatrix } from "./dot-matrix.model";
const MATRIX_ROW_SIZE = 3;
const MATRIX_COLUMN_SIZE = 4;

export class MiniMatrix extends DotMatrix{
    constructor() {
        super(MATRIX_ROW_SIZE, MATRIX_COLUMN_SIZE);
    }
}