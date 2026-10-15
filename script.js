/**
 * NeoRain.js - High performance HTML5 Canvas digital rain effect.
 */
const canvas = document.getElementById('neoRainCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fill browser window dynamically
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Characters used for the digital rain cascade (Latin, numbers, Japanese Katakana)
const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-<>~|/\\ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ";
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);

// Initialize drops array (one drop Y position per column)
let drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * -100); // Stagger initial drop heights
}

function draw() {
    // Translucent black rectangle creates the fading trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0'; // Classic Matrix Green
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        // Pick a random character from the charset
        const text = charset.charAt(Math.floor(Math.random() * charset.length));
        
        // Coordinates for the character
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Draw the character
        ctx.fillText(text, x, y);

        // Reset drop to the top once it goes off-screen with random delay
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
    }
}

// Animation loop throttled by requestAnimationFrame
function animate() {
    draw();
    requestAnimationFrame(animate);
}

// Start the rain
animate();