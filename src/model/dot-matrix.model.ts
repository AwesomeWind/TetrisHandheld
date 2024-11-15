export class DotMatrix {
    private _matrix: Array<Array<number>>;
    private readonly ROW: number;
    private readonly COL: number;
    get matrix(): number[][] {
        return this._matrix;
    }

    set matrix(value: number[][]) {
        if (!this.isValidMatrix(value)) {
            throw new Error(
                `Invalid matrix size. Expected ${this.ROW}x${this.COL}.`
            );
        }
        this._matrix = value;
    }

    constructor(row: number, col: number) {
        this.ROW = row;
        this.COL = col;
        this._matrix = Array.from(Array(row), () => Array(col).fill(0));
    }
    // 校验矩阵尺寸是否符合要求
    private isValidMatrix(matrix: number[][]): boolean {
        return (
            matrix.length === this.ROW &&
            matrix.every((row) => row.length === this.COL)
        );
    }
    // 直接更新某个点的值
    public updatePoint(row: number, col: number, value: number): void {
        if (row < 0 || row >= this.ROW || col < 0 || col >= this.COL) {
            throw new Error('Point is out of matrix bounds.');
        }
        this._matrix[row][col] = value;
    }

}