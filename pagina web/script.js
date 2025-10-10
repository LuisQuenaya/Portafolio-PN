// === EFECTO DE REDES NEURONALES ANIMADAS ===
// Crea un fondo con nodos conectados que se mueven suavemente

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

canvas.classList.add("neural-background");

let width, height;
let particles = [];
const numParticles = 70; // cantidad de nodos
const maxDistance = 150;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Particle {
  constructor() {
    this.x = random(0, width);
    this.y = random(0, height);
    this.vx = random(-0.6, 0.6);
    this.vy = random(-0.6, 0.6);
    this.radius = random(1, 3);
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 255, 255, 0.8)";
    ctx.fill();
  }
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < maxDistance) {
        const opacity = 1 - distance / maxDistance;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 255, 255, ${opacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(p => {
    p.move();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animate);
}

// Crear las partículas
for (let i = 0; i < numParticles; i++) {
  particles.push(new Particle());
}

// Iniciar la animación
animate();
