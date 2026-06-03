// --- 1. インターフェース定義 ---
interface Ball {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
}

// --- 2. 初期設定とDOMの取得 ---
const canvas = document.getElementById('simCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const gravityInput = document.getElementById('gravity') as HTMLInputElement;
const bounceInput = document.getElementById('bounce') as HTMLInputElement;
const gravityVal = document.getElementById('gravityVal')!;
const bounceVal = document.getElementById('bounceVal')!;
const resetBtn = document.getElementById('resetBtn')!;

// 物理パラメータの初期化
let gravity = parseFloat(gravityInput.value);
let bounce = parseFloat(bounceInput.value);

// ボールの初期状態
const ball: Ball = {
    x: 100,
    y: 100,
    vx: 4,
    vy: 0,
    radius: 20,
    color: '#00adb5'
};

// --- 3. 物理演算と描画ロジック ---
function update(): void {
    ball.vy += gravity;
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.vy = -ball.vy * bounce;
        ball.vx *= 0.99; // 地面摩擦
    }

    if (ball.x + ball.radius > canvas.width) {
        ball.x = canvas.width - ball.radius;
        ball.vx = -ball.vx * bounce;
    } else if (ball.x - ball.radius < 0) {
        ball.x = ball.radius;
        ball.vx = -ball.vx * bounce;
    }
}

function draw(): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ボール
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = ball.color;
    ctx.fill();
    ctx.closePath();
    ctx.shadowBlur = 0;

    // 速度ベクトル（赤い線）
    ctx.beginPath();
    ctx.moveTo(ball.x, ball.y);
    ctx.lineTo(ball.x + ball.vx * 5, ball.y + ball.vy * 5);
    ctx.strokeStyle = '#ff2e63';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();

    // ステータス表示
    ctx.fillStyle = '#fff';
    ctx.font = '16px monospace';
    ctx.fillText(`Velocity Y (縦速度): ${ball.vy.toFixed(2)} px/f`, 20, 30);
    ctx.fillText(`Velocity X (横速度): ${ball.vx.toFixed(2)} px/f`, 20, 50);
}

function loop(): void {
    update();
    draw();
    requestAnimationFrame(loop);
}

// --- 4. イベントリスナー ---
gravityInput.addEventListener('input', (e) => {
    const val = (e.target as HTMLInputElement).value;
    gravity = parseFloat(val);
    gravityVal.textContent = val;
});

bounceInput.addEventListener('input', (e) => {
    const val = (e.target as HTMLInputElement).value;
    bounce = parseFloat(val);
    bounceVal.textContent = val;
});

resetBtn.addEventListener('click', () => {
    ball.x = 100;
    ball.y = 100;
    ball.vx = 4;
    ball.vy = 0;
});

// 開始
loop();