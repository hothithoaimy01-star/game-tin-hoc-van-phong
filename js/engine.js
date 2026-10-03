/**
 * 2D Canvas RPG Engine for Office Legend
 * Renders modern pixel/vector office environment, player movement, collision, NPCs, and interactions.
 */

class GameEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    // Player State
    this.player = {
      x: 512,
      y: 320,
      width: 28,
      height: 36,
      speed: 3.5,
      direction: 'down', // up, down, left, right
      isMoving: false,
      animFrame: 0,
      animTimer: 0,
      name: "Thực Tập Sinh",
      color: "#6366f1"
    };

    // Input States
    this.keys = {};
    this.touchDirection = null;

    // Nearby NPC for interaction
    this.nearbyNpc = null;

    // Particle System
    this.particles = [];

    // Office Furniture & Obstacles
    this.initOfficeLayout();

    // Setup Event Listeners
    this.setupInputs();

    // Start Game Loop
    this.lastTime = performance.now();
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  initOfficeLayout() {
    this.rooms = [
      { name: "Phòng Hành Chính & Nhân Sự", x: 40, y: 50, w: 420, h: 220, color: "rgba(59, 130, 246, 0.08)", border: "#3b82f6" },
      { name: "Phòng Kế Toán & Dữ Liệu", x: 564, y: 50, w: 420, h: 220, color: "rgba(16, 185, 129, 0.08)", border: "#10b981" },
      { name: "Phòng Pháp Chế & Soạn Thảo", x: 40, y: 330, w: 420, h: 220, color: "rgba(168, 85, 247, 0.08)", border: "#a855f7" },
      { name: "Phòng Họp & Thuyết Trình", x: 564, y: 330, w: 420, h: 220, color: "rgba(249, 115, 22, 0.08)", border: "#f97316" }
    ];

    // Solid collision boxes (Desks, Walls, Equipment)
    this.obstacles = [
      // Outer boundaries
      { x: 0, y: 0, w: this.width, h: 20 },
      { x: 0, y: this.height - 20, w: this.width, h: 20 },
      { x: 0, y: 0, w: 20, h: this.height },
      { x: this.width - 20, y: 0, w: 20, h: this.height },

      // HR Room Desks
      { x: 120, y: 120, w: 90, h: 45, label: "Bàn Làm Việc", type: "desk" },
      { x: 280, y: 150, w: 100, h: 50, label: "Bàn Sếp Tuấn", type: "boss_desk" },
      { x: 50, y: 60, w: 40, h: 40, label: "Cây Xanh", type: "plant" },

      // Accounting Room Desks
      { x: 680, y: 150, w: 100, h: 50, label: "Bàn Chị Lan", type: "boss_desk" },
      { x: 840, y: 120, w: 90, h: 45, label: "Máy Tính Excel", type: "desk" },
      { x: 930, y: 60, w: 40, h: 40, label: "Máy In", type: "printer" },

      // Legal & Docs Room Desks
      { x: 200, y: 390, w: 100, h: 50, label: "Bàn Mai", type: "boss_desk" },
      { x: 80, y: 440, w: 80, h: 45, label: "Tủ Tài Liệu", type: "shelf" },

      // Boardroom Table
      { x: 680, y: 390, w: 140, h: 70, label: "Bàn Hội Nghị", type: "board_table" },
      { x: 860, y: 340, w: 100, h: 20, label: "Màn Chiếu PPT", type: "screen" },

      // Center Hallway Pantry / Water Cooler
      { x: 480, y: 260, w: 64, h: 40, label: "Quầy Cà Phê ☕", type: "pantry" }
    ];
  }

  setupInputs() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.key.toLowerCase()] = true;
      this.keys[e.code] = true;

      // Interaction key E or Space
      if ((e.key === 'e' || e.key === 'E' || e.code === 'Space') && this.nearbyNpc) {
        if (window.GameApp) {
          window.GameApp.interactWithNpc(this.nearbyNpc);
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key.toLowerCase()] = false;
      this.keys[e.code] = false;
    });

    // Touch D-Pad setup
    const dpadBtns = document.querySelectorAll('.dpad-btn[data-key]');
    dpadBtns.forEach(btn => {
      const key = btn.getAttribute('data-key');
      btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.keys[key] = true;
      });
      btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.keys[key] = false;
      });
      btn.addEventListener('mousedown', () => { this.keys[key] = true; });
      btn.addEventListener('mouseup', () => { this.keys[key] = false; });
      btn.addEventListener('mouseleave', () => { this.keys[key] = false; });
    });

    // Canvas click to move/interact
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      const clickX = (e.clientX - rect.left) * scaleX;
      const clickY = (e.clientY - rect.top) * scaleY;

      // Check if clicked near an NPC
      GAME_DATA.npcs.forEach(npc => {
        const dist = Math.hypot(npc.x - clickX, npc.y - clickY);
        if (dist < 40) {
          if (window.GameApp) {
            window.GameApp.interactWithNpc(npc);
          }
        }
      });
    });
  }

  update(deltaTime) {
    // Determine movement intent
    let dx = 0;
    let dy = 0;

    if (this.keys['w'] || this.keys['arrowup']) { dy -= 1; this.player.direction = 'up'; }
    if (this.keys['s'] || this.keys['arrowdown']) { dy += 1; this.player.direction = 'down'; }
    if (this.keys['a'] || this.keys['arrowleft']) { dx -= 1; this.player.direction = 'left'; }
    if (this.keys['d'] || this.keys['arrowright']) { dx += 1; this.player.direction = 'right'; }

    // Normalize diagonal speed
    if (dx !== 0 && dy !== 0) {
      dx *= 0.7071;
      dy *= 0.7071;
    }

    const nextX = this.player.x + dx * this.player.speed;
    const nextY = this.player.y + dy * this.player.speed;

    this.player.isMoving = (dx !== 0 || dy !== 0);

    // Collision Resolution with Obstacles
    if (!this.checkCollision(nextX, this.player.y)) {
      this.player.x = nextX;
    }
    if (!this.checkCollision(this.player.x, nextY)) {
      this.player.y = nextY;
    }

    // Animation frame update
    if (this.player.isMoving) {
      this.player.animTimer += deltaTime;
      if (this.player.animTimer > 150) {
        this.player.animFrame = (this.player.animFrame + 1) % 4;
        this.player.animTimer = 0;
        if (SoundManager) SoundManager.playKeypress();
      }
    } else {
      this.player.animFrame = 0;
    }

    // Check NPC Proximity
    this.checkNpcProximity();

    // Update Particles
    this.updateParticles(deltaTime);
  }

  checkCollision(x, y) {
    const pw = this.player.width;
    const ph = this.player.height;
    const pLeft = x - pw / 2;
    const pRight = x + pw / 2;
    const pTop = y - ph / 2;
    const pBottom = y + ph / 2;

    for (let obs of this.obstacles) {
      if (
        pRight > obs.x &&
        pLeft < obs.x + obs.w &&
        pBottom > obs.y &&
        pTop < obs.y + obs.h
      ) {
        return true;
      }
    }
    return false;
  }

  checkNpcProximity() {
    let closestNpc = null;
    let minDistance = 60; // Interaction radius

    GAME_DATA.npcs.forEach(npc => {
      const dist = Math.hypot(npc.x - this.player.x, npc.y - this.player.y);
      if (dist < minDistance) {
        closestNpc = npc;
      }
    });

    this.nearbyNpc = closestNpc;

    const bubble = document.getElementById('interaction-bubble');
    if (bubble) {
      if (closestNpc) {
        bubble.classList.remove('hidden');
        bubble.innerHTML = `<span class="key-badge">E</span> Gặp <b>${closestNpc.name}</b> (${closestNpc.role})`;
      } else {
        bubble.classList.add('hidden');
      }
    }
  }

  addCelebrationParticles(x, y) {
    for (let i = 0; i < 40; i++) {
      this.particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8 - 3,
        size: Math.random() * 6 + 3,
        color: ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#38bdf8'][Math.floor(Math.random() * 5)],
        life: 1.0,
        decay: Math.random() * 0.02 + 0.015
      });
    }
  }

  updateParticles(dt) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15; // gravity
      p.life -= p.decay;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Office Floor Tiles (Grid Pattern)
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, this.width, this.height);

    // Floor Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    const tileSize = 32;
    for (let x = 0; x < this.width; x += tileSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }
    for (let y = 0; y < this.height; y += tileSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }

    // 2. Draw Office Rooms (Glass Dividers)
    this.rooms.forEach(room => {
      ctx.fillStyle = room.color;
      ctx.fillRect(room.x, room.y, room.w, room.h);

      ctx.strokeStyle = room.border;
      ctx.lineWidth = 2;
      ctx.strokeRect(room.x, room.y, room.w, room.h);

      // Room Name Banner
      ctx.fillStyle = room.border;
      ctx.font = 'bold 12px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(room.name, room.x + 12, room.y + 20);
    });

    // 3. Draw Furniture & Obstacles
    this.obstacles.forEach(obs => {
      if (obs.type === 'desk' || obs.type === 'boss_desk') {
        // Desk Body
        ctx.fillStyle = obs.type === 'boss_desk' ? '#1e293b' : '#334155';
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
        ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);

        // Computer Monitor on Desk
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(obs.x + obs.w / 2 - 14, obs.y + 8, 28, 16);
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(obs.x + obs.w / 2 - 12, obs.y + 10, 24, 12);

        // Keyboard & Papers
        ctx.fillStyle = '#94a3b8';
        ctx.fillRect(obs.x + obs.w / 2 - 10, obs.y + 28, 20, 6);

      } else if (obs.type === 'board_table') {
        // Conference Table
        ctx.fillStyle = '#1e1b4b';
        ctx.strokeStyle = '#4338ca';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(obs.x, obs.y, obs.w, obs.h, 12);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#a5b4fc';
        ctx.font = '11px sans-serif';
        ctx.fillText("Hội Nghị Ban Lãnh Đạo", obs.x + 16, obs.y + obs.h / 2 + 4);

      } else if (obs.type === 'pantry') {
        ctx.fillStyle = '#78350f';
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
        ctx.fillStyle = '#fbbf24';
        ctx.font = '12px sans-serif';
        ctx.fillText("☕ Căng Tin", obs.x + 4, obs.y + 24);

      } else if (obs.type === 'plant') {
        ctx.font = '24px sans-serif';
        ctx.fillText("🪴", obs.x + 6, obs.y + 30);
      } else if (obs.type === 'screen') {
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
        ctx.fillStyle = '#f97316';
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText("📽️ Màn Chiếu PPT", obs.x + 8, obs.y + 14);
      }
    });

    // 4. Render NPCs
    GAME_DATA.npcs.forEach(npc => {
      this.drawNpc(npc);
    });

    // 5. Render Player Character
    this.drawPlayer();

    // 6. Render Particles
    this.particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1.0;
    });
  }

  drawNpc(npc) {
    const ctx = this.ctx;

    // NPC Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(npc.x, npc.y + 16, 14, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // NPC Avatar Emoji & Body
    ctx.font = '28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(npc.avatar, npc.x, npc.y + 10);

    // NPC Name Tag & Quest Indicator
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = npc.color;
    ctx.lineWidth = 1.5;
    const nameWidth = ctx.measureText(npc.name).width + 16;
    ctx.fillRect(npc.x - nameWidth / 2, npc.y - 34, nameWidth, 18);
    ctx.strokeRect(npc.x - nameWidth / 2, npc.y - 34, nameWidth, 18);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(npc.name, npc.x, npc.y - 21);

    // Floating Quest Indicator Exclamation Mark
    const bounceOffset = Math.sin(performance.now() / 200) * 4;
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText("❗", npc.x, npc.y - 42 + bounceOffset);
  }

  drawPlayer() {
    const ctx = this.ctx;
    const p = this.player;

    // Player Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.beginPath();
    ctx.ellipse(p.x, p.y + 14, 12, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Character Body Representation
    const walkBob = p.isMoving ? Math.sin(performance.now() / 80) * 2 : 0;

    ctx.save();
    ctx.translate(p.x, p.y + walkBob);

    // Base sprite
    ctx.font = '28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText("👨‍💼", 0, 10);

    // Player Name Tag
    ctx.fillStyle = 'rgba(99, 102, 241, 0.9)';
    ctx.font = 'bold 11px "Plus Jakarta Sans", sans-serif';
    const tagW = ctx.measureText("Bạn (Bạn)").width + 12;
    ctx.fillRect(-tagW / 2, -30, tagW, 16);
    ctx.fillStyle = '#ffffff';
    ctx.fillText("Bạn", 0, -18);

    ctx.restore();
  }

  loop(timestamp) {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame(this.loop);
  }
}
