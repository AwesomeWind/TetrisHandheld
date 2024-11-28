import { DisplayScreen } from "../model/dot-matrix-display.model";

export const HIGH_LIGHT_COLOR = "rgba(0, 0, 0, 0.7)";//矩阵液晶显示屏高亮的颜色
export const UN_HIGH_LIGHT_COLOR = "rgba(192, 192, 192, 0.3)";//矩阵液晶显示屏非高亮的颜色
export const BACKGROUND_COLOR = "rgba(255, 255, 255, 0.3)";//矩阵液晶显示屏背景颜色


export class DisplayRenderer {
    private canvas: HTMLCanvasElement;
    private displayScreenData: DisplayScreen;
    private score: DigitalTubeNumber;
    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, displayScreenData?: DisplayScreen) {
        this.canvas = canvas;
        this.canvas.width = 500;
        this.canvas.height = 300;
        this.displayScreenData = displayScreenData ?? new DisplayScreen();
        this.ctx = canvas.getContext("2d")!;
        const dpr = window.devicePixelRatio;
        const { width, height } = this.canvas;
        // 重新设置 canvas 自身宽高大小和 css 大小。放大 canvas；css 保持不变，因为我们需要那么多的点
        this.canvas.width = Math.round(width * dpr);
        this.canvas.height = Math.round(height * dpr);
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
        this.score = new DigitalTubeNumber(this.ctx, 0, 0, 0);
    }
    /**
     * 绘制显示屏中的所有内容的方法
     * @param
     */
    private render() {
    }
}



abstract class BaseGraphicObject {
    abstract render(...args: any[]): void;
    drawDiamond(ctx: CanvasRenderingContext2D, points: number[][]) {

        ctx.beginPath();

        let i = 0;
        ctx.moveTo(points[i][0], points[i][1]);
        while (i < points.length) {
            ctx.lineTo(points[i][0], points[i][1]);
            i++;
        }
        ctx.closePath();
        ctx.fill();
    }
}
class DigitalTubeNumber extends BaseGraphicObject {
    private _number: number = 0;
    private _ctx: CanvasRenderingContext2D;
    private _x: number;
    private _y: number;
    private _size: number = 40;//数字宽度


    get number() {
        return this._number;
    }
    set number(number: number) {
        this.render(this._x, this._y, number);
        this._number = number;
    }
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number, number: number) {
        super();
        this._x = x;
        this._y = y;
        this._ctx = ctx;
        this.number = number;
    }
    /**
     * 用于绘制一个数码管风格的数字数字0~9
     *   --- (0)
     * |     |
     *(1)   (2)
     * |     |
     *  --- (3)
     * |     |
     *(4)   (5)
     * |     |
     *  --- (6)
     * @param {number} x
     * @param {number} y
     * @param {number} digit
     */
    render(x: number, y: number, digit: number) {
        const size = this._size;//数字宽度
        const a = 90; // 数码管顶角角度
        const G = size * 0.05;// 管间距
        const GH = (Math.sqrt(3) / 2) * G;//1，3，4三个数码管顶角组成的等边三角形的高
        const W = (size * 0.9 / 2 + G - 2 * GH) / 2;// 管宽
        const H = (2 * size - 2 * G - W) / 2;// 管高
        const gh = (W / 2) * Math.tan((a / 2) * (Math.PI / 180));//数码管尖角组成的三角形的高

        const segments: number[][][] = [
            // 顶部水平段 (Segment 0)
            [
                [x + W / 2 + GH + gh, y],                         // 左上角
                [x + size - (W / 2 + GH + gh), y],                // 右上角
                [x + size - (W / 2 + GH), y + W / 2],             // 右尖角
                [x + size - (W / 2 + GH + gh), y + W],            // 右下角
                [x + W / 2 + GH + gh, y + W],                     // 左下角
                [x + (W / 2) + GH, y + W / 2],                    // 左尖角
            ],
            // 左上垂直段 (Segment 1)
            [
                [x, y + W / 2 + GH + gh],                         // 左上角
                [x + (W / 2), y + W / 2 + GH],                    // 上尖角
                [x + W, y + W / 2 + GH + gh],                     // 右上角
                [x + W, y + size - (W / 2 + GH + gh)],            // 右下角
                [x + W / 2, y + size - (W / 2 + GH)],             // 下尖角
                [x, y + size - (W / 2 + GH + gh)],                // 左下角
            ],

            // 右上垂直段 (Segment 2)
            [
                [x + size - W, y + W / 2 + GH + gh],               // 左上角
                [x + size - (W / 2), y + W / 2 + GH],              // 上尖角
                [x + size, y + W / 2 + GH + gh],                   // 右上角
                [x + size, y + size - (W / 2 + GH + gh)],          // 右下角
                [x + size - W / 2, y + size - (W / 2 + GH)],       // 下尖角
                [x + size - W, y + size - (W / 2 + GH + gh)],      // 左下角
            ],

            // 中间水平段 (Segment 3)
            [
                [x + W / 2 + GH + gh, y + H - G],                   // 左上角
                [x + size - (W / 2 + GH + gh), y + H - G],          // 右上角
                [x + size - (W / 2 + GH), y + W / 2 + H - G],       // 右尖角
                [x + size - (W / 2 + GH + gh), y + W + H - G],      // 右下角
                [x + W / 2 + GH + gh, y + W + H - G],               // 左下角
                [x + (W / 2) + GH, y + W / 2 + H - G],              // 左尖角
            ],

            // 左下垂直段 (Segment 4)
            [
                [x, y + W / 2 + GH + gh + H - G],                    // 左上角
                [x + (W / 2), y + W / 2 + GH + H - G],               // 上尖角
                [x + W, y + W / 2 + GH + gh + H - G],                // 右上角
                [x + W, y + size - (W / 2 + GH + gh) + H - G],       // 右下角
                [x + W / 2, y + size - (W / 2 + GH) + H - G],        // 下尖角
                [x, y + size - (W / 2 + GH + gh) + H - G],           // 左下角
            ],

            // 右下垂直段 (Segment 5)
            [
                [x + size - W, y + W / 2 + GH + gh + H - G],          // 左上角
                [x + size - (W / 2), y + W / 2 + GH + H - G],         // 上尖角
                [x + size, y + W / 2 + GH + gh + H - G],              // 右上角
                [x + size, y + size - (W / 2 + GH + gh) + H - G],     // 右下角
                [x + size - W / 2, y + size - (W / 2 + GH) + H - G],  // 下尖角
                [x + size - W, y + size - (W / 2 + GH + gh) + H - G], // 左下角
            ],

            // 底部水平段 (Segment 6)
            [
                [x + W / 2 + GH + gh, y + 2 * (H - G)],               // 左上角
                [x + size - (W / 2 + GH + gh), y + 2 * (H - G)],      // 右上角
                [x + size - (W / 2 + GH), y + W / 2 + 2 * (H - G)],   // 右尖角
                [x + size - (W / 2 + GH + gh), y + W + 2 * (H - G)],  // 右下角
                [x + W / 2 + GH + gh, y + W + 2 * (H - G)],           // 左下角
                [x + (W / 2) + GH, y + W / 2 + 2 * (H - G)],          // 左尖角
            ],
        ];

        const digitMap = [
            [1, 1, 1, 0, 1, 1, 1], // 0
            [0, 0, 1, 0, 0, 1, 0], // 1
            [1, 0, 1, 1, 1, 0, 1], // 2
            [1, 0, 1, 1, 0, 1, 1], // 3
            [0, 1, 1, 1, 0, 1, 0], // 4
            [1, 1, 0, 1, 0, 1, 1], // 5
            [1, 1, 0, 1, 1, 1, 1], // 6
            [1, 0, 1, 0, 0, 1, 0], // 7
            [1, 1, 1, 1, 1, 1, 1], // 8
            [1, 1, 1, 1, 0, 1, 1]  // 9
        ];

        const activeSegments = digitMap[digit];


        let i = 0;
        segments.forEach((segment, i) => {
            if (activeSegments[i] === 1) {
                this._ctx.fillStyle = HIGH_LIGHT_COLOR;
            } else {
                this._ctx.fillStyle = UN_HIGH_LIGHT_COLOR;
            }
            this.drawDiamond(this._ctx, segment);

        })
    }
}