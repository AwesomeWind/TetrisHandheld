import { MainDotMatrix } from './main-matrix.model';
import { MiniMatrix } from "./mini-matrix.model";


const SCORE_MAX_LENGTH = 6;
const LEVEL_MAX_LENGTH = 2;
const LIVES_MAX_LENGTH = 2;

enum HandState { UP, MIDDLE, DOWN }
export interface DotMatrixSize {
    row: number;
    col: number;
}
export class DisplayScreen {
    private _mainMatrix: MainDotMatrix = new MainDotMatrix();//主点阵
    private _score: number = 0;//分数
    private _level: number = 0;//关卡
    private _lives: number = 0;//生命值
    private _miniMatrix: MiniMatrix = new MiniMatrix();//侧边栏中的小矩阵
    private _handState: HandState = HandState.UP; // 小人手的状态

    public get mainMatrix(): number[][] {
        return this._mainMatrix.matrix;
    }
    public set mainMatrix(value: number[][]) {
        this._mainMatrix.matrix = value;
    }

    public get score(): number {
        return this._score;
    }
    public set score(value: number) {
        if(value < 0) {
            this._score = 0;
        }
        // score max length is 6
        const maxValue = Math.pow(10, SCORE_MAX_LENGTH) - 1;
        if (value > maxValue) {
            this._score = maxValue;
            return;
        }
        this._score = value;
    }

    public get level(): number {
        return this._level;
    }
    public set level(value: number) {
        if(value < 0) {
            this._level = 0;
        }
        // level max length is 2
        const maxValue = Math.pow(10, LEVEL_MAX_LENGTH) - 1;
        if (value > maxValue) {
            this._level = maxValue;
            return;
        }
        this._level = value;
    }

    public get lives(): number {
        return this._lives;
    }
    public set lives(value: number) {
        if(value < 0) {
            this._lives = 0;
        }
        // lives max length is 2
        const maxValue = Math.pow(10, LIVES_MAX_LENGTH) - 1;
        if (value > maxValue) {
            this._lives = maxValue;
            return;
        }
        this._lives = value;
    }

    public get miniMatrix(): number[][] {
        return this._miniMatrix.matrix;
    }
    public set miniMatrix(value: number[][]) {
        this._miniMatrix.matrix = value;
    }

    public get handState(): HandState {
        return this._handState;
    }
    public set handState(value: HandState) {
        this._handState = value;
    }

    constructor(
        _MainDotMatrix?: number[][],
        score?: number,
        level?: number,
        lives?: number,
        _MiniMatrix?: number[][],
        handState?: HandState
    ) {
        if (_MainDotMatrix) {
            this.mainMatrix = _MainDotMatrix;
        }
        if (score) {
            this.score = score;
        }
        if (level) {
            this.level = level;
        }
        if (lives) {
            this.lives = lives;
        }
        if (_MiniMatrix) {
            this.miniMatrix = _MiniMatrix;
        }
        if (handState) {
            this.handState = handState;
        }
    }
}