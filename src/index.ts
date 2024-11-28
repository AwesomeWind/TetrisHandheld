import { DisplayRenderer } from "./renderer/display-renderer"

/**
 * 主进程
 */
(function main() {
    // 示例用法
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d")!;
    const displayRenderer:DisplayRenderer = new DisplayRenderer(canvas);
})();