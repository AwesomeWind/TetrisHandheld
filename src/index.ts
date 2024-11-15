function drawDigit(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, digit: number) {
    const w = size; // 每段的宽度
    const h = size / 2; // 每段的高度
    const offset = size / 10; // 菱形偏移
    const segments = [
        [x + w / 2, y, x + w, y + h / 2, x + w / 2, y + h, x, y + h / 2], // Segment 0
        [x, y + h / 2, x + offset, y + h + offset, x, y + 2 * h - offset, x - offset, y + h + offset], // Segment 1
        [x + w, y + h / 2, x + w - offset, y + h + offset, x + w, y + 2 * h - offset, x + w + offset, y + h + offset], // Segment 2
        [x + w / 2, y + 2 * h, x + w, y + 2.5 * h, x + w / 2, y + 3 * h, x, y + 2.5 * h], // Segment 3
        [x, y + 2.5 * h, x + offset, y + 3 * h + offset, x, y + 4 * h - offset, x - offset, y + 3 * h + offset], // Segment 4
        [x + w, y + 2.5 * h, x + w - offset, y + 3 * h + offset, x + w, y + 4 * h - offset, x + w + offset, y + 3 * h + offset], // Segment 5
        [x + w / 2, y + 4 * h, x + w, y + 4.5 * h, x + w / 2, y + 5 * h, x, y + 4.5 * h], // Segment 6
    ];

    // 定义每个数字的段状态 (0 表示灭, 1 表示亮)
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
        [1, 1, 1, 1, 0, 1, 1], // 9
    ];

    // 获取当前数字的段状态
    const activeSegments = digitMap[digit];

    // 绘制每个段
    ctx.fillStyle = "black";
    for (let i = 0; i < segments.length; i++) {
        if (activeSegments[i] === 1) {
            drawDiamond(ctx, segments[i]);
        }
    }
}

function drawDiamond(ctx: CanvasRenderingContext2D, points: number[]) {
    ctx.beginPath();
    ctx.moveTo(points[0], points[1]);
    for (let i = 2; i < points.length; i += 2) {
        ctx.lineTo(points[i], points[i + 1]);
    }
    ctx.closePath();
    ctx.fill();
}

// 示例用法
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
drawDigit(ctx, 50, 50, 20, 8); // 绘制数字 8
