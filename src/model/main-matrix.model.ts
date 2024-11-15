import { DotMatrix } from "./dot-matrix.model";

const MATRIX_ROW_SIZE = 10;
const MATRIX_COLUMN_SIZE = 20;

export class MainDotMatrix extends DotMatrix {
    constructor() {
        super(MATRIX_ROW_SIZE, MATRIX_COLUMN_SIZE);
    }
}