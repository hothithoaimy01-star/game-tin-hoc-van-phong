/**
 * CYBER CUTIES: Plants vs Slimes - Game Controller & Engine v7.0
 * 40 Missions, 40 Unlockable Cute Plants, 25 Diverse Slime Monsters, Seed Selection Screen
 */

// 40 Levels Unlock Rewards (1 new plant rewarded per level completed!)
const LEVEL_UNLOCK_REWARDS = {
  1: 'NANO_SHIELD',            // Thắng Màn 1 -> Nhận Bé Khoai Tây Giáp Dẻo
  2: 'CRYO_TURRET',            // Thắng Màn 2 -> Nhận Bé Cánh Cụt Băng Tuyết
  3: 'EMP_BOMB',               // Thắng Màn 3 -> Nhận Bé Cherry Trái Tim Nổ
  4: 'DURIAN_SHREDDER',        // Thắng Màn 4 -> Nhận Bé Sầu Riêng Gai Nổ
  5: 'RAILGUN_CANNON',         // Thắng Màn 5 -> Nhận Bé Thỏ Pháo Kép
  6: 'GATLING_PEA_CAT',        // Thắng Màn 6 -> Nhận Bé Mèo Gatling 4 Nòng
  7: 'TESLA_COIL',             // Thắng Màn 7 -> Nhận Bé Cáo Sấm Sét
  8: 'SCATTER_SHOTGUN',        // Thắng Màn 8 -> Nhận Bé Bắp Ngô Bắn 3 Làn
  9: 'SNIPER_TURRET',          // Thắng Màn 9 -> Nhận Bé Măng Tre Bắn Tỉa để đánh Boss Màn 10
  10: 'DRONE_HIVE',            // Thắng Màn 10 -> Nhận Bé Tổ Ong Mật sang Thế Giới 2
  11: 'FLAMETHROWER_TURRET',
  12: 'NANO_HEALER',
  13: 'PLASMA_MORTAR',
  14: 'FORCE_REPELLER',
  15: 'MISSILE_SILO',
  16: 'BLACK_HOLE',
  17: 'CACTUS_SPIKE',
  18: 'COCONUT_BOWLING',
  19: 'TIME_WARP_PYLON',
  20: 'MAGNET_SHROOM',
  21: 'ORBITAL_STRIKE_BEACON',
  22: 'POISON_ONION',
  23: 'GARLIC_DIVERT',
  24: 'SHROOM_PUFF',
  25: 'LOTUS_REFLECTOR',
  26: 'PUMPKIN_SHELL',
  27: 'GRAPE_CLUSTER',
  28: 'AVOCADO_RAM',
  29: 'MANGO_BOOMERANG',
  30: 'LEMON_VOLT',
  31: 'PINEAPPLE_TANK',
  32: 'BANANA_LAUNCHER',
  33: 'BLUEBERRY_FROST',
  34: 'KIWI_SPIKETRAP',
  35: 'PALM_ENERGY',
  36: 'PEACH_REVIVE',
  37: 'GRAVITY_APPLE',
  38: 'RAINBOW_FUNGUS',
  39: 'MYSTIC_DRAGON_PLANT',
  40: 'TREE_OF_WISDOM'
};

// ============================================================================
// LEVEL GENERATOR FOR 40 MISSIONS (Integrating 25 Slime Monster Types)
// ============================================================================
function generateLevelConfigs() {
  const levels = {};

  // WORLD 1: THẢO NGUYÊN NẮNG ẤM (Levels 1 to 10)
  // Escalating difficulty: introducing 1 new monster type & 1 new tactical challenge each level
  for (let i = 1; i <= 10; i++) {
    const isBoss = (i === 10);
    const wavesCount = i === 1 ? 2 : i <= 4 ? 3 : i <= 8 ? 4 : 5;
    const waves = [];

    for (let w = 0; w < wavesCount; w++) {
      const isFinalWave = (w === wavesCount - 1);
      const enemyGroups = [];

      if (isBoss && isFinalWave) {
        enemyGroups.push({ type: 'DDOS_OVERLORD', count: 1, interval: 6.0 });
        enemyGroups.push({ type: 'RANSOMWARE_BRUTE', count: 3, interval: 3.5 });
        enemyGroups.push({ type: 'GLITCH_SPRINTER', count: 4, interval: 2.2 });
        enemyGroups.push({ type: 'CYBER_ZOMBIE_MECH', count: 3, interval: 3.0 });
        enemyGroups.push({ type: 'DISCO_SLIME', count: 2, interval: 4.5 });
      } else if (i === 1) {
        // Level 1: Gentle introduction (Trojan bugs only)
        const count = w === 0 ? 4 : 7;
        enemyGroups.push({ type: 'TROJAN_BUG', count: count, interval: 2.5 });
      } else if (i === 2) {
        // Level 2: Introduces Encrypted Worm (player has Wallnut)
        enemyGroups.push({ type: 'TROJAN_BUG', count: 4 + w * 2, interval: 2.2 });
        enemyGroups.push({ type: 'ENCRYPTED_WORM', count: 1 + w, interval: 4.0 });
      } else if (i === 3) {
        // Level 3: Introduces Balloon Slime (player has Cryo Turret)
        enemyGroups.push({ type: 'TROJAN_BUG', count: 4 + w, interval: 2.0 });
        enemyGroups.push({ type: 'ENCRYPTED_WORM', count: 1 + w, interval: 3.5 });
        if (w >= 1) enemyGroups.push({ type: 'BALLOON_SLIME', count: 1 + w, interval: 4.0 });
      } else if (i === 4) {
        // Level 4: Introduces Glitch Sprinter ⚡ (player has Cherry Heart Bomb)
        enemyGroups.push({ type: 'TROJAN_BUG', count: 4 + w * 2, interval: 1.8 });
        enemyGroups.push({ type: 'ENCRYPTED_WORM', count: 2 + w, interval: 3.0 });
        enemyGroups.push({ type: 'GLITCH_SPRINTER', count: 1 + w, interval: 3.5 });
      } else if (i === 5) {
        // Level 5: Introduces Digger Mole & Ransomware Brute (player has Durian Shredder)
        enemyGroups.push({ type: 'TROJAN_BUG', count: 4 + w, interval: 1.8 });
        enemyGroups.push({ type: 'ENCRYPTED_WORM', count: 2 + w, interval: 3.0 });
        enemyGroups.push({ type: 'DIGGER_MOLE', count: 1 + Math.floor(w / 2), interval: 4.5 });
        if (w >= 2) enemyGroups.push({ type: 'RANSOMWARE_BRUTE', count: 1, interval: 5.0 });
      } else if (i === 6) {
        // Level 6: Introduces Stealth Spyware (player has Bunny Dual Cannon)
        enemyGroups.push({ type: 'TROJAN_BUG', count: 4 + w, interval: 1.8 });
        enemyGroups.push({ type: 'STEALTH_SPYWARE', count: 2 + w, interval: 2.8 });
        enemyGroups.push({ type: 'GLITCH_SPRINTER', count: 1 + Math.floor(w / 2), interval: 3.5 });
        enemyGroups.push({ type: 'BALLOON_SLIME', count: 1 + Math.floor(w / 2), interval: 4.0 });
      } else if (i === 7) {
        // Level 7: Introduces Exploder Mech 💣 & Vampire Jellyfish (player has Gatling Neko Pea)
        enemyGroups.push({ type: 'ENCRYPTED_WORM', count: 3 + w, interval: 2.2 });
        enemyGroups.push({ type: 'CYBER_ZOMBIE_MECH', count: 1 + Math.floor(w / 2), interval: 3.8 });
        enemyGroups.push({ type: 'BIO_SYNTH_VIRUS', count: 1 + Math.floor(w / 2), interval: 4.0 });
        if (w >= 2) enemyGroups.push({ type: 'RANSOMWARE_BRUTE', count: 1 + Math.floor(w / 3), interval: 5.0 });
      } else if (i === 8) {
        // Level 8: Introduces Disco Slime (player has Sparkle Kitsune)
        enemyGroups.push({ type: 'TROJAN_BUG', count: 5 + w * 2, interval: 1.5 });
        enemyGroups.push({ type: 'DISCO_SLIME', count: 1 + Math.floor(w / 2), interval: 5.0 });
        enemyGroups.push({ type: 'CYBER_ZOMBIE_MECH', count: 1 + Math.floor(w / 2), interval: 3.5 });
        enemyGroups.push({ type: 'GLITCH_SPRINTER', count: 2, interval: 3.0 });
      } else if (i === 9) {
        // Level 9: Introduces Hydra 3-Head Splitter (player has Corn Tri-Scatter)
        enemyGroups.push({ type: 'HYDRA_TROJAN', count: 1 + Math.floor(w / 2), interval: 4.0 });
        enemyGroups.push({ type: 'RANSOMWARE_BRUTE', count: 1 + Math.floor(w / 2), interval: 4.5 });
        enemyGroups.push({ type: 'DIGGER_MOLE', count: 1 + Math.floor(w / 2), interval: 4.0 });
        enemyGroups.push({ type: 'CYBER_ZOMBIE_MECH', count: 2, interval: 3.5 });
      } else if (i === 10) {
        // Level 10 Pre-boss waves (player has Bamboo Sniper)
        enemyGroups.push({ type: 'HYDRA_TROJAN', count: 2 + w, interval: 3.5 });
        enemyGroups.push({ type: 'GLITCH_SPRINTER', count: 2 + w, interval: 2.5 });
        enemyGroups.push({ type: 'CYBER_ZOMBIE_MECH', count: 2 + w, interval: 3.0 });
        enemyGroups.push({ type: 'BIO_SYNTH_VIRUS', count: 2, interval: 3.5 });
      }

      waves.push({ delay: w === 0 ? 8 : 7, enemies: enemyGroups });
    }

    levels[i] = {
      world: 'day',
      worldName: 'THẾ GIỚI 1: THẢO NGUYÊN NẮNG ẤM 🌻',
      title: isBoss ? 'MÀN 10 (TRÙM ĐẠI ĐẾ SLIME): GIẢI CỨU VƯỜN HOA' : `MÀN ${i < 10 ? '0' + i : i}: BẢO VỆ ĐỒNG CỎ XANH`,
      initialEnergy: 150 + i * 25,
      hasSkyEnergy: true,
      skyEnergyInterval: 7.0,
      waves: waves,
      isBoss: isBoss
    };
  }

  // WORLD 2: RỪNG SAO ĐÊM MỘNG MƠ (Levels 11 to 20)
  for (let i = 11; i <= 20; i++) {
    const isBoss = (i === 20);
    const wavesCount = i <= 14 ? 4 : 5;
    const waves = [];

    for (let w = 0; w < wavesCount; w++) {
      const isFinalWave = (w === wavesCount - 1);
      const enemyGroups = [];

      if (isBoss && isFinalWave) {
        enemyGroups.push({ type: 'BOTNET_COMMANDER', count: 2, interval: 6.0 });
        enemyGroups.push({ type: 'ARMORED_CYBER_CRUSHER', count: 2, interval: 5.0 });
        enemyGroups.push({ type: 'DARK_MATTER_GHOST', count: 4, interval: 3.5 });
        enemyGroups.push({ type: 'ROOTKIT_TITAN', count: 4, interval: 4.0 });
        enemyGroups.push({ type: 'NINJA_SLIME', count: 5, interval: 2.5 });
        enemyGroups.push({ type: 'FROST_YETI_SLIME', count: 2, interval: 5.0 });
      } else {
        const step = i - 10;
        enemyGroups.push({ type: 'ENCRYPTED_WORM', count: 3 + step + w, interval: 2.5 });
        enemyGroups.push({ type: 'STEALTH_SPYWARE', count: 2 + step, interval: 2.8 });

        if (i >= 12) enemyGroups.push({ type: 'HYDRA_TROJAN', count: 2 + Math.floor(step / 2), interval: 3.5 });
        if (i >= 13) enemyGroups.push({ type: 'NINJA_SLIME', count: 2 + Math.floor(step / 3), interval: 3.0 });
        if (i >= 14) enemyGroups.push({ type: 'DIVER_SLIME', count: 2 + Math.floor(step / 3), interval: 3.5 });
        if (i >= 15) enemyGroups.push({ type: 'FROST_YETI_SLIME', count: 1 + Math.floor(step / 4), interval: 5.0 });
        if (i >= 16) enemyGroups.push({ type: 'ROOTKIT_TITAN', count: 2 + Math.floor(step / 4), interval: 4.5 });
        if (i >= 17) enemyGroups.push({ type: 'ARMORED_CYBER_CRUSHER', count: 1 + Math.floor(step / 4), interval: 5.5 });
        if (i >= 18) enemyGroups.push({ type: 'ZERO_DAY_EXPLOIT', count: 2 + w, interval: 3.0 });
        if (i >= 19) enemyGroups.push({ type: 'TROJAN_HORSE_CARRIER', count: 1, interval: 1.0 });
      }

      waves.push({ delay: w === 0 ? 9 : 7, enemies: enemyGroups });
    }

    levels[i] = {
      world: 'night',
      worldName: 'THẾ GIỚI 2: RỪNG SAO ĐÊM MỘNG MƠ 🌙',
      title: isBoss ? 'MÀN 20 (TRÙM BẠCH TUỘC HOÀNG TỬ): ÁNH SAO ĐÊM' : `MÀN ${i}: RỪNG NẤM DẠ QUANG`,
      initialEnergy: 300 + (i - 10) * 15,
      hasSkyEnergy: false,
      skyEnergyInterval: 999999,
      waves: waves,
      isBoss: isBoss
    };
  }

  // WORLD 3: KẸO BÔNG TRÊN MÂY (Levels 21 to 40)
  for (let i = 21; i <= 40; i++) {
    const isBoss = (i % 5 === 0);
    const wavesCount = i <= 28 ? 4 : i <= 35 ? 5 : 6;
    const waves = [];

    for (let w = 0; w < wavesCount; w++) {
      const isFinalWave = (w === wavesCount - 1);
      const enemyGroups = [];
      const step = i - 20;

      if (isBoss && isFinalWave) {
        if (i === 40) {
          enemyGroups.push({ type: 'NEURAL_OVERDRIVE_MEGABOSS', count: 1, interval: 1.0 });
          enemyGroups.push({ type: 'QUANTUM_LEVIATHAN', count: 1, interval: 8.0 });
          enemyGroups.push({ type: 'QUANTUM_SINGULARITY_CORE', count: 3, interval: 4.5 });
          enemyGroups.push({ type: 'ARMORED_CYBER_CRUSHER', count: 4, interval: 4.0 });
          enemyGroups.push({ type: 'FROST_YETI_SLIME', count: 4, interval: 3.5 });
          enemyGroups.push({ type: 'ZERO_DAY_EXPLOIT', count: 6, interval: 2.0 });
        } else {
          enemyGroups.push({ type: i % 10 === 0 ? 'QUANTUM_SINGULARITY_CORE' : 'BOTNET_COMMANDER', count: 2, interval: 4.0 });
          enemyGroups.push({ type: 'ARMORED_CYBER_CRUSHER', count: 2, interval: 5.0 });
          enemyGroups.push({ type: 'TROJAN_HORSE_CARRIER', count: 2, interval: 5.0 });
          enemyGroups.push({ type: 'ROOTKIT_TITAN', count: 4, interval: 3.0 });
        }
      } else {
        enemyGroups.push({ type: 'ROOTKIT_TITAN', count: 2 + Math.floor(step / 4) + w, interval: 3.0 });
        enemyGroups.push({ type: 'NINJA_SLIME', count: 3 + Math.floor(step / 3), interval: 2.5 });
        enemyGroups.push({ type: 'BALLOON_SLIME', count: 2 + Math.floor(step / 4), interval: 3.5 });
        enemyGroups.push({ type: 'DIVER_SLIME', count: 2 + Math.floor(step / 4), interval: 3.5 });
        enemyGroups.push({ type: 'ZERO_DAY_EXPLOIT', count: 2 + Math.floor(step / 5) + w, interval: 3.2 });
        if (i >= 25) enemyGroups.push({ type: 'QUANTUM_SINGULARITY_CORE', count: 1 + Math.floor(step / 6), interval: 6.0 });
        enemyGroups.push({ type: 'TROJAN_HORSE_CARRIER', count: 1 + Math.floor(step / 6), interval: 5.0 });
        enemyGroups.push({ type: 'NANO_SWARM_COLONY', count: 3 + w, interval: 2.2 });
      }

      waves.push({ delay: w === 0 ? 8 : 6, enemies: enemyGroups });
    }

    levels[i] = {
      world: 'cloud',
      worldName: 'THẾ GIỚI 3: KẸO BÔNG TRÊN MÂY ☁️',
      title: i === 40 ? 'MÀN 40 (TRÙM MÈO THẦN VŨ TRỤ): BẢO VỆ NGÂN HÀ KẸO' : `MÀN ${i}: VƯƠNG QUỐC TRÊN MÂY`,
      initialEnergy: 400 + (i - 20) * 15,
      hasSkyEnergy: true,
      skyEnergyInterval: 6.0,
      waves: waves,
      isBoss: isBoss
    };
  }

  return levels;
}

const LEVEL_CONFIGS = generateLevelConfigs();

const UPGRADE_DATA = {
  extraSun: {
    id: 'extraSun', name: 'Nụ Cười Tỏa Nắng (+25⭐ Sao)',
    desc: 'Bé Hướng Dương sinh thêm +25⭐ Năng Lượng mỗi lần nở nụ cười rạng rỡ!',
    cost: 100, icon: '🌻'
  },
  overclock: {
    id: 'overclock', name: 'Giai Điệu Vui Nhộn (+20% Tốc Độ)',
    desc: 'Toàn bộ bé cây trồng bắn kẹo nhanh hơn 20% vĩnh viễn.',
    cost: 150, icon: '🎵'
  },
  plasmaPower: {
    id: 'plasmaPower', name: 'Kẹo Ngọt Đậm Đà (+25% Sát Thương)',
    desc: 'Tăng 25% uy lực cho toàn bộ đạn bắn của các bé cây trồng.',
    cost: 200, icon: '🍬'
  },
  shieldBoost: {
    id: 'shieldBoost', name: 'Thạch Jelly Dẻo Dai (+35% Máu)',
    desc: 'Bé Khoai Tây Giáp Dẻo tăng thêm 35% lượng máu chống chịu núng nính!',
    cost: 150, icon: '🛡️'
  }
};

// ============================================================================
// GAME CONTROLLER CLASS
// ============================================================================
class CyberGame {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    
    this.grid = {
      rows: 5,
      cols: 9,
      startX: 120,
      startY: 40,
      cellW: 90,
      cellH: 100
    };

    this.selectedAvatar = '🐱';
    this.currentAccount = {
      email: '',
      name: 'Bé Mèo Dễ Thương',
      avatar: '🐱'
    };

    // Load active account or fallback
    this.loadActiveAccount();
    this.activeWorldTab = 'day';

    // Floating Clouds / Bubbles background particles
    this.clouds = [];
    for (let c = 0; c < 10; c++) {
      this.clouds.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        w: 90 + Math.random() * 120,
        h: 35 + Math.random() * 25,
        speed: 12 + Math.random() * 18,
        color: ['rgba(255, 255, 255, 0.45)', 'rgba(255, 214, 230, 0.4)', 'rgba(214, 235, 255, 0.4)'][c % 3]
      });
    }

    this.currentLevel = 1;
    this.energy = 250;
    this.score = 0;
    this.kills = 0;
    this.chipsEarnedThisRun = 0;
    this.gameTime = 0;
    this.isRunning = false;
    this.isPaused = false;
    this.gameSpeed = 1;
    this.isShovelActive = false;
    this.selectedUnitType = null;

    this.units = [];
    this.viruses = [];
    this.projectiles = [];
    this.energyOrbs = [];
    this.scanners = [];
    this.particles = [];
    this.floatingTexts = [];

    this.waveIndex = 0;
    this.totalWaves = 0;
    this.waveTimer = 0;
    this.spawnQueue = [];
    this.skyEnergyTimer = 0;

    this.unitCooldowns = {};
    this.mouseGrid = { col: -1, row: -1 };
    this.mousePos = { x: 0, y: 0 };

    this.initUI();
    this.initEventListeners();
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    window.addEventListener('orientationchange', () => setTimeout(() => this.resizeCanvas(), 250));

    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  resizeCanvas() {
    const wrapper = document.getElementById('canvas-wrapper');
    const w = (wrapper && wrapper.clientWidth > 50 ? wrapper.clientWidth : window.innerWidth) || 1200;
    const h = (wrapper && wrapper.clientHeight > 50 ? wrapper.clientHeight : (window.innerHeight - 96)) || 700;

    this.canvas.width = Math.max(320, w);
    this.canvas.height = Math.max(240, h);

    // Dynamically calculate grid cell size for all screen sizes (mobile portrait/landscape & desktop)
    const availableW = this.canvas.width;
    const availableH = this.canvas.height;

    const marginRatio = availableW < 600 ? 0.06 : availableW < 900 ? 0.10 : 0.14;
    const playW = Math.max(280, availableW * (1 - marginRatio));
    const playH = Math.max(200, availableH - (availableW < 600 ? 25 : 55));

    const maxCellW = Math.floor(playW / (this.grid.cols + 1.2));
    const maxCellH = Math.floor(playH / this.grid.rows);
    const cellSize = Math.max(32, Math.min(maxCellW, maxCellH, 90));

    this.grid.cellW = cellSize;
    this.grid.cellH = cellSize;
    this.grid.startX = Math.max(Math.floor(cellSize * 1.1), Math.floor((availableW - this.grid.cellW * this.grid.cols) / 2) + Math.floor(cellSize * 0.45));
    this.grid.startY = Math.max(12, Math.floor((availableH - this.grid.cellH * this.grid.rows) / 2));

    this.units.forEach(u => {
      u.x = this.grid.startX + u.col * this.grid.cellW + this.grid.cellW / 2;
      u.y = this.grid.startY + u.row * this.grid.cellH + this.grid.cellH / 2;
    });
    this.scanners.forEach(s => {
      s.x = this.grid.startX - this.grid.cellW * 0.65;
      s.y = this.grid.startY + s.row * this.grid.cellH + this.grid.cellH / 2;
    });
  }

  getUnlockedUnitsList(unlockedLevel) {
    const list = ['ENERGY_CORE', 'LASER_TURRET'];
    for (let lvl = 1; lvl < unlockedLevel; lvl++) {
      const reward = LEVEL_UNLOCK_REWARDS[lvl];
      if (reward && !list.includes(reward)) {
        list.push(reward);
      }
    }
    return list;
  }

  loadActiveAccount() {
    const activeEmail = localStorage.getItem('cyber_active_email') || '';
    if (activeEmail) {
      const profileStr = localStorage.getItem('cyber_profile_' + activeEmail.trim().toLowerCase());
      if (profileStr) {
        try {
          const p = JSON.parse(profileStr);
          this.currentAccount = {
            email: p.email || activeEmail,
            name: p.name || p.email.split('@')[0] || 'Bé Mèo Dễ Thương',
            avatar: p.avatar || '🐱'
          };
          this.selectedAvatar = this.currentAccount.avatar;
          this.chips = typeof p.chips === 'number' ? p.chips : 150;
          this.upgrades = p.upgrades || {};
          this.unlockedLevel = typeof p.unlockedLevel === 'number' ? Math.max(1, p.unlockedLevel) : 1;
          this.hasNightKey = !!p.hasNightKey;
          this.hasCloudKey = !!p.hasCloudKey;
          
          const legitimateUnlocked = this.getUnlockedUnitsList(this.unlockedLevel);
          this.unlockedUnits = legitimateUnlocked;

          let sDeck = Array.isArray(p.selectedDeck) ? p.selectedDeck.filter(u => legitimateUnlocked.includes(u)) : [];
          if (sDeck.length === 0) {
            sDeck = legitimateUnlocked.slice(0, 8);
          }
          this.selectedDeck = sDeck;
          return;
        } catch (e) {
          console.warn('Failed to parse account profile', e);
        }
      }
    }

    // Default or guest load
    this.chips = parseInt(localStorage.getItem('cyber_chips') || '150', 10);
    this.upgrades = JSON.parse(localStorage.getItem('cyber_upgrades') || '{}');
    this.unlockedLevel = parseInt(localStorage.getItem('cyber_unlocked_level') || '1', 10);
    this.hasNightKey = localStorage.getItem('cyber_night_key') === 'true';
    this.hasCloudKey = localStorage.getItem('cyber_cloud_key') === 'true';
    
    const legitimateUnlocked = this.getUnlockedUnitsList(this.unlockedLevel);
    this.unlockedUnits = legitimateUnlocked;

    let savedDeck = JSON.parse(localStorage.getItem('cyber_selected_deck') || '[]');
    let sDeck = Array.isArray(savedDeck) ? savedDeck.filter(u => legitimateUnlocked.includes(u)) : [];
    if (sDeck.length === 0) {
      sDeck = legitimateUnlocked.slice(0, 8);
    }
    this.selectedDeck = sDeck;

    this.currentAccount = {
      email: activeEmail,
      name: localStorage.getItem('cyber_player_name') || 'Bé Mèo Dễ Thương',
      avatar: localStorage.getItem('cyber_player_avatar') || '🐱'
    };
    this.selectedAvatar = this.currentAccount.avatar;
  }

  saveActiveAccount() {
    // 1. Save local session keys
    localStorage.setItem('cyber_chips', this.chips.toString());
    localStorage.setItem('cyber_upgrades', JSON.stringify(this.upgrades));
    localStorage.setItem('cyber_unlocked_level', this.unlockedLevel.toString());
    localStorage.setItem('cyber_night_key', this.hasNightKey.toString());
    localStorage.setItem('cyber_cloud_key', this.hasCloudKey.toString());
    localStorage.setItem('cyber_unlocked_units', JSON.stringify(this.unlockedUnits));
    localStorage.setItem('cyber_selected_deck', JSON.stringify(this.selectedDeck));
    localStorage.setItem('cyber_player_name', this.currentAccount.name);
    localStorage.setItem('cyber_player_avatar', this.currentAccount.avatar);

    // 2. Save profile under email if logged in
    if (this.currentAccount.email) {
      const emailKey = this.currentAccount.email.trim().toLowerCase();
      localStorage.setItem('cyber_active_email', emailKey);

      const profileData = {
        email: this.currentAccount.email,
        name: this.currentAccount.name,
        avatar: this.currentAccount.avatar,
        chips: this.chips,
        upgrades: this.upgrades,
        unlockedLevel: this.unlockedLevel,
        hasNightKey: this.hasNightKey,
        hasCloudKey: this.hasCloudKey,
        unlockedUnits: this.unlockedUnits,
        selectedDeck: this.selectedDeck,
        lastSaved: Date.now()
      };
      localStorage.setItem('cyber_profile_' + emailKey, JSON.stringify(profileData));

      // Update accounts registry
      let accounts = JSON.parse(localStorage.getItem('cyber_all_accounts') || '[]');
      const idx = accounts.findIndex(a => a.email && a.email.toLowerCase() === emailKey);
      const accMeta = {
        email: this.currentAccount.email,
        name: this.currentAccount.name,
        avatar: this.currentAccount.avatar,
        level: this.unlockedLevel,
        chips: this.chips,
        lastLogin: Date.now()
      };
      if (idx >= 0) {
        accounts[idx] = accMeta;
      } else {
        accounts.push(accMeta);
      }
      localStorage.setItem('cyber_all_accounts', JSON.stringify(accounts));
    }
  }

  updateAccountUI() {
    const avatar = this.currentAccount.avatar || '🐱';
    const name = this.currentAccount.name || 'Bé Mèo Dễ Thương';
    const email = this.currentAccount.email;

    // Top Bar HUD
    const hudAvatar = document.getElementById('hud-user-avatar');
    const hudName = document.getElementById('hud-user-name');
    if (hudAvatar) hudAvatar.textContent = avatar;
    if (hudName) hudName.textContent = email ? (name.length > 8 ? name.slice(0, 8) + '..' : name) : 'TÀI KHOẢN';

    // Start Screen Banner
    const bannerAvatar = document.getElementById('banner-user-avatar');
    const bannerName = document.getElementById('banner-user-name');
    const bannerEmail = document.getElementById('banner-user-email');
    if (bannerAvatar) bannerAvatar.textContent = avatar;
    if (bannerName) bannerName.textContent = name;
    if (bannerEmail) {
      bannerEmail.textContent = email ? `💌 ${email} • Đã lưu tự động cho lần sau ✓` : 'Chưa đăng nhập email • Nhấn để lưu tiến trình';
      bannerEmail.style.color = email ? '#a7f3d0' : '#fbcfe8';
    }

    // Account Modal Header Details
    const accModalAvatar = document.getElementById('acc-current-avatar');
    const accModalName = document.getElementById('acc-current-name');
    const accModalEmail = document.getElementById('acc-current-email');
    const accStatLvl = document.getElementById('acc-stat-level');
    const accStatChips = document.getElementById('acc-stat-chips');
    const accStatUnits = document.getElementById('acc-stat-units');

    if (accModalAvatar) accModalAvatar.textContent = avatar;
    if (accModalName) accModalName.textContent = name;
    if (accModalEmail) accModalEmail.textContent = email ? `Email: ${email}` : 'Chưa liên kết email tài khoản';
    if (accStatLvl) accStatLvl.textContent = `Màn ${this.unlockedLevel}/40`;
    if (accStatChips) accStatChips.textContent = `${this.chips} 🍬`;
    if (accStatUnits) accStatUnits.textContent = `${this.unlockedUnits.length}/40`;
  }

  initUI() {
    this.updateChipsUI();
    this.updateWorldTabsAndKeysUI();
    this.updateAccountUI();
    this.renderLevelGrid();
    this.renderCodex('units');
    this.renderTechLab();
  }

  updateChipsUI() {
    document.getElementById('menu-chips-count').textContent = this.chips;
    document.getElementById('lab-chips-count').textContent = this.chips;
    this.saveActiveAccount();
    this.updateAccountUI();
  }

  updateWorldTabsAndKeysUI() {
    const nightKeyBadge = document.getElementById('night-key-badge');
    const cloudKeyBadge = document.getElementById('cloud-key-badge');
    const nightTab = document.getElementById('tab-world-night');
    const cloudTab = document.getElementById('tab-world-cloud');

    if (this.hasNightKey) {
      nightKeyBadge.textContent = 'ĐÃ MỞ KHÓA ✓';
      nightKeyBadge.className = 'unlocked-badge';
      nightTab.classList.remove('locked');
      nightTab.querySelector('.w-sub').textContent = '10 Màn • Đã Mở Khóa ✨';
    } else {
      nightKeyBadge.textContent = 'CHƯA MỞ';
      nightKeyBadge.className = 'locked-badge';
      nightTab.classList.add('locked');
    }

    if (this.hasCloudKey) {
      cloudKeyBadge.textContent = 'ĐÃ MỞ KHÓA ✓';
      cloudKeyBadge.className = 'unlocked-badge';
      cloudTab.classList.remove('locked');
      cloudTab.querySelector('.w-sub').textContent = '20 Màn • Đã Mở Khóa ✨';
    } else {
      cloudKeyBadge.textContent = 'CHƯA MỞ';
      cloudKeyBadge.className = 'locked-badge';
      cloudTab.classList.add('locked');
    }
  }

  renderLevelGrid() {
    const container = document.getElementById('levels-grid');
    if (!container) return;

    let start = 1;
    let end = 10;
    let title = 'DANH SÁCH MÀN CHƠI - THẾ GIỚI 1: THẢO NGUYÊN NẮNG ẤM 🌻';

    if (this.activeWorldTab === 'night') {
      start = 11;
      end = 20;
      title = 'DANH SÁCH MÀN CHƠI - THẾ GIỚI 2: RỪNG SAO ĐÊM MỘNG MƠ 🌙';
    } else if (this.activeWorldTab === 'cloud') {
      start = 21;
      end = 40;
      title = 'DANH SÁCH MÀN CHƠI - THẾ GIỚI 3: KẸO BÔNG TRÊN MÂY ☁️';
    }

    document.getElementById('world-current-title').textContent = title;

    let html = '';
    for (let lvl = start; lvl <= end; lvl++) {
      const isLocked = lvl > this.unlockedLevel;
      const isCompleted = lvl < this.unlockedLevel;
      const isActive = lvl === this.currentLevel;
      const isBoss = (lvl % 10 === 0) || (lvl === 40);

      html += `
        <button 
          class="level-btn ${isLocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''} ${isActive ? 'active-level' : ''}" 
          data-level="${lvl}"
          ${isLocked ? 'disabled' : ''}
        >
          <span class="lvl-num">${lvl < 10 ? '0' + lvl : lvl}</span>
          <span class="lvl-tag">${isBoss ? '👑 TRÙM' : isCompleted ? '⭐ XONG' : '🌱 MỞ'}</span>
        </button>
      `;
    }

    container.innerHTML = html;

    container.querySelectorAll('.level-btn:not(.locked)').forEach(btn => {
      btn.addEventListener('click', (e) => {
        container.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active-level'));
        e.currentTarget.classList.add('active-level');
        this.currentLevel = parseInt(e.currentTarget.getAttribute('data-level'), 10);
      });
    });
  }

  initEventListeners() {
    // Open Seed Selection Screen when clicking Start from World Map
    document.getElementById('btn-start-game').addEventListener('click', () => {
      document.getElementById('start-modal').classList.add('hidden');
      this.openSeedSelectionModal();
    });

    // Start Battle with Selected Deck
    document.getElementById('btn-start-battle').addEventListener('click', () => {
      if (this.selectedDeck.length === 0) {
        alert('Hãy chọn ít nhất 1 Bé Cây Trồng vào đội hình nhé!');
        return;
      }
      document.getElementById('seed-modal').classList.add('hidden');
      this.startLevel(this.currentLevel, this.selectedDeck);
    });

    // Auto-select deck
    document.getElementById('btn-auto-select-deck').addEventListener('click', () => {
      this.autoSelectDeck();
    });

    // Close seed modal back to world map
    document.getElementById('btn-close-seed-modal').addEventListener('click', () => {
      document.getElementById('seed-modal').classList.add('hidden');
      document.getElementById('start-modal').classList.remove('hidden');
      this.renderLevelGrid();
    });

    document.querySelectorAll('.world-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const target = e.currentTarget;
        const world = target.getAttribute('data-world');

        if (world === 'night' && !this.hasNightKey) {
          alert('Hãy vượt qua Màn 10 để nhận Chìa Khóa Đêm Mộng Mơ 🗝️ nhé!');
          return;
        }
        if (world === 'cloud' && !this.hasCloudKey) {
          alert('Hãy vượt qua Màn 20 để nhận Chìa Khóa Mây Bồng Bềnh 🔑 nhé!');
          return;
        }

        document.querySelectorAll('.world-tab').forEach(t => t.classList.remove('active'));
        target.classList.add('active');
        this.activeWorldTab = world;

        if (world === 'day') this.currentLevel = 1;
        else if (world === 'night') this.currentLevel = 11;
        else if (world === 'cloud') this.currentLevel = 21;

        this.renderLevelGrid();
      });
    });

    document.getElementById('tool-map').addEventListener('click', () => {
      document.getElementById('start-modal').classList.remove('hidden');
      document.getElementById('seed-modal').classList.add('hidden');
      this.isRunning = false;
      this.renderLevelGrid();
    });

    document.getElementById('btn-key-modal-ok').addEventListener('click', () => {
      document.getElementById('key-modal').classList.add('hidden');
      document.getElementById('start-modal').classList.remove('hidden');
      this.renderLevelGrid();
    });

    document.getElementById('btn-unlock-ok').addEventListener('click', () => {
      document.getElementById('unlock-modal').classList.add('hidden');
      document.getElementById('start-modal').classList.remove('hidden');
      this.renderLevelGrid();
    });

    document.getElementById('btn-open-techlab').addEventListener('click', () => {
      document.getElementById('techlab-modal').classList.remove('hidden');
      this.renderTechLab();
    });
    document.getElementById('tool-techlab').addEventListener('click', () => {
      document.getElementById('techlab-modal').classList.remove('hidden');
      this.renderTechLab();
    });
    document.getElementById('btn-end-techlab').addEventListener('click', () => {
      document.getElementById('techlab-modal').classList.remove('hidden');
      this.renderTechLab();
    });
    document.getElementById('btn-close-techlab').addEventListener('click', () => {
      document.getElementById('techlab-modal').classList.add('hidden');
    });
    document.getElementById('btn-close-techlab-ok').addEventListener('click', () => {
      document.getElementById('techlab-modal').classList.add('hidden');
    });

    const shovelBtn = document.getElementById('tool-shovel');
    shovelBtn.addEventListener('click', () => {
      this.isShovelActive = !this.isShovelActive;
      this.selectedUnitType = null;
      shovelBtn.classList.toggle('active', this.isShovelActive);
      this.updateCardSelectionUI();
    });

    const speedBtn = document.getElementById('tool-speed');
    speedBtn.addEventListener('click', () => {
      this.gameSpeed = this.gameSpeed === 1 ? 2 : 1;
      document.getElementById('speed-label').textContent = `${this.gameSpeed}x`;
    });

    const soundBtn = document.getElementById('tool-sound');
    soundBtn.addEventListener('click', () => {
      const enabled = window.cyberAudio.toggleSound();
      document.getElementById('sound-icon').textContent = enabled ? '🔊' : '🔇';
    });

    const pauseBtn = document.getElementById('tool-pause');
    pauseBtn.addEventListener('click', () => {
      this.isPaused = !this.isPaused;
      pauseBtn.querySelector('.btn-icon').textContent = this.isPaused ? '▶️' : '⏸️';
    });

    document.getElementById('tool-codex').addEventListener('click', () => {
      document.getElementById('codex-modal').classList.remove('hidden');
    });
    document.getElementById('btn-close-codex').addEventListener('click', () => {
      document.getElementById('codex-modal').classList.add('hidden');
    });

    document.querySelectorAll('.codex-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.codex-tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        this.renderCodex(e.target.getAttribute('data-tab'));
      });
    });

    document.getElementById('btn-open-howtoplay').addEventListener('click', () => {
      document.getElementById('help-modal').classList.remove('hidden');
    });
    document.getElementById('btn-close-help').addEventListener('click', () => {
      document.getElementById('help-modal').classList.add('hidden');
    });
    document.getElementById('btn-help-ok').addEventListener('click', () => {
      document.getElementById('help-modal').classList.add('hidden');
    });

    document.getElementById('btn-replay').addEventListener('click', () => {
      document.getElementById('end-modal').classList.add('hidden');
      this.openSeedSelectionModal();
    });
    document.getElementById('btn-next-level').addEventListener('click', () => {
      document.getElementById('end-modal').classList.add('hidden');
      this.currentLevel = Math.min(40, this.currentLevel + 1);
      this.openSeedSelectionModal();
    });
    document.getElementById('btn-back-menu').addEventListener('click', () => {
      document.getElementById('end-modal').classList.add('hidden');
      document.getElementById('start-modal').classList.remove('hidden');
      this.isRunning = false;
      this.updateChipsUI();
      this.renderLevelGrid();
    });

    // Fullscreen Toggle Button
    const fullBtn = document.getElementById('tool-fullscreen');
    if (fullBtn) {
      fullBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      });
    }

    // Mouse events
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mouseleave', () => {
      this.mouseGrid.col = -1;
      this.mouseGrid.row = -1;
    });
    this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
    this.canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.selectedUnitType = null;
      this.isShovelActive = false;
      document.getElementById('tool-shovel').classList.remove('active');
      this.updateCardSelectionUI();
    });

    // Touch events for mobile phones & tablets
    const getCanvasTouchPos = (touch) => {
      const rect = this.canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return { x: 0, y: 0 };
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
      };
    };

    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        const pos = getCanvasTouchPos(e.touches[0]);
        this.processPointerMove(pos.x, pos.y);
        this.processPointerClick(pos.x, pos.y);
      }
    }, { passive: false });

    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        const pos = getCanvasTouchPos(e.touches[0]);
        this.processPointerMove(pos.x, pos.y);
      }
    }, { passive: false });

    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.mouseGrid.col = -1;
      this.mouseGrid.row = -1;
    }, { passive: false });

    // Account Modal Buttons & Listeners
    const openAccount = () => this.openAccountModal();
    const toolAcc = document.getElementById('tool-account');
    if (toolAcc) toolAcc.addEventListener('click', openAccount);

    const bannerAcc = document.getElementById('btn-open-account-banner');
    if (bannerAcc) bannerAcc.addEventListener('click', openAccount);

    const closeAcc = document.getElementById('btn-close-account');
    if (closeAcc) closeAcc.addEventListener('click', () => {
      document.getElementById('account-modal').classList.add('hidden');
    });

    // Avatar picker in account modal
    document.querySelectorAll('.avatar-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.avatar-option').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.selectedAvatar = e.currentTarget.getAttribute('data-avatar') || '🐱';
      });
    });

    // Login / Save button
    const saveAccBtn = document.getElementById('btn-save-login-account');
    if (saveAccBtn) {
      saveAccBtn.addEventListener('click', () => {
        const emailInput = document.getElementById('acc-input-email');
        const nameInput = document.getElementById('acc-input-name');
        const email = emailInput ? emailInput.value.trim() : '';
        const name = nameInput ? nameInput.value.trim() : '';
        this.loginOrRegisterEmail(email, name, this.selectedAvatar);
      });
    }

    // Export save code
    const exportBtn = document.getElementById('btn-export-save');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportSaveCode());
    }

    // Import save code
    const importBtn = document.getElementById('btn-import-save');
    if (importBtn) {
      importBtn.addEventListener('click', () => this.importSaveCode());
    }

    // Logout
    const logoutBtn = document.getElementById('btn-logout-account');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.logoutAccount());
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.selectedUnitType = null;
        this.isShovelActive = false;
        document.getElementById('tool-shovel').classList.remove('active');
        this.updateCardSelectionUI();
      }
    });
  }

  // ==========================================================================
  // USER ACCOUNT & PROFILE SYSTEM METHODS
  // ==========================================================================
  openAccountModal() {
    const modal = document.getElementById('account-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    this.renderAccountModal();
  }

  renderAccountModal() {
    this.updateAccountUI();
    const emailInput = document.getElementById('acc-input-email');
    const nameInput = document.getElementById('acc-input-name');
    if (emailInput) emailInput.value = this.currentAccount.email || '';
    if (nameInput) nameInput.value = this.currentAccount.name || '';

    // Active avatar selection
    document.querySelectorAll('.avatar-option').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-avatar') === (this.currentAccount.avatar || '🐱'));
    });

    // Render list of saved accounts
    const container = document.getElementById('saved-accounts-list');
    if (!container) return;

    const accounts = JSON.parse(localStorage.getItem('cyber_all_accounts') || '[]');
    if (accounts.length === 0) {
      container.innerHTML = `<div style="font-size: 12px; color: #c4b5fd; text-align: center; padding: 10px;">Chưa có tài khoản nào được lưu trên máy này. Hãy nhập email phía trên để lưu nhé!</div>`;
      return;
    }

    container.innerHTML = accounts.map(acc => {
      const isCurrent = this.currentAccount.email && this.currentAccount.email.toLowerCase() === acc.email.toLowerCase();
      return `
        <div class="saved-account-item ${isCurrent ? 'current-active' : ''}">
          <div class="saved-acc-left">
            <span class="saved-acc-avatar">${acc.avatar || '🐱'}</span>
            <div class="saved-acc-info">
              <span class="saved-acc-name">${acc.name || acc.email} ${isCurrent ? '<span style="color:#4ade80;">(Đang dùng)</span>' : ''}</span>
              <span class="saved-acc-sub">${acc.email} • Màn ${acc.level || 1} • ${acc.chips || 0} 🍬</span>
            </div>
          </div>
          <div class="saved-acc-actions">
            ${!isCurrent ? `<button class="saved-acc-btn switch" data-email="${acc.email}">Đổi sang</button>` : ''}
            <button class="saved-acc-btn delete" data-email="${acc.email}">Xóa</button>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.saved-acc-btn.switch').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const email = e.currentTarget.getAttribute('data-email');
        this.switchAccount(email);
      });
    });

    container.querySelectorAll('.saved-acc-btn.delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const email = e.currentTarget.getAttribute('data-email');
        if (confirm(`Bạn có chắc muốn xóa tài khoản ${email} khỏi máy này?`)) {
          this.deleteSavedAccount(email);
        }
      });
    });
  }

  loginOrRegisterEmail(email, customName, avatar) {
    if (!email || !email.includes('@') || !email.includes('.')) {
      alert('Vui lòng nhập địa chỉ Email hợp lệ (ví dụ: beyeu@gmail.com)!');
      return;
    }

    const emailKey = email.trim().toLowerCase();
    const profileStr = localStorage.getItem('cyber_profile_' + emailKey);

    if (profileStr) {
      // Account exists, load its data!
      try {
        const p = JSON.parse(profileStr);
        this.currentAccount = {
          email: email.trim(),
          name: customName || p.name || email.split('@')[0],
          avatar: avatar || p.avatar || '🐱'
        };
        this.chips = typeof p.chips === 'number' ? p.chips : 150;
        this.upgrades = p.upgrades || {};
        this.unlockedLevel = p.unlockedLevel || 1;
        this.hasNightKey = !!p.hasNightKey;
        this.hasCloudKey = !!p.hasCloudKey;
        this.unlockedUnits = Array.isArray(p.unlockedUnits) ? p.unlockedUnits : ['ENERGY_CORE', 'LASER_TURRET'];
        this.selectedDeck = Array.isArray(p.selectedDeck) ? p.selectedDeck : ['ENERGY_CORE', 'LASER_TURRET'];
      } catch (e) {
        console.error(e);
      }
    } else {
      // New email: attach current session or fresh profile
      this.currentAccount = {
        email: email.trim(),
        name: customName || email.split('@')[0],
        avatar: avatar || '🐱'
      };
    }

    this.saveActiveAccount();
    this.updateChipsUI();
    this.updateWorldTabsAndKeysUI();
    this.renderLevelGrid();
    this.renderAccountModal();

    window.cyberAudio.playUpgradeSuccess();
    alert(`🎉 Đã đăng nhập và lưu tài khoản "${this.currentAccount.email}" thành công!\nMọi tiến trình chơi game sẽ tự động được lưu lại cho lần sau.`);
    document.getElementById('account-modal').classList.add('hidden');
  }

  switchAccount(email) {
    const emailKey = email.trim().toLowerCase();
    const profileStr = localStorage.getItem('cyber_profile_' + emailKey);
    if (!profileStr) return;

    try {
      const p = JSON.parse(profileStr);
      this.currentAccount = {
        email: p.email || email,
        name: p.name || email.split('@')[0],
        avatar: p.avatar || '🐱'
      };
      this.chips = typeof p.chips === 'number' ? p.chips : 150;
      this.upgrades = p.upgrades || {};
      this.unlockedLevel = p.unlockedLevel || 1;
      this.hasNightKey = !!p.hasNightKey;
      this.hasCloudKey = !!p.hasCloudKey;
      this.unlockedUnits = Array.isArray(p.unlockedUnits) ? p.unlockedUnits : ['ENERGY_CORE', 'LASER_TURRET'];
      this.selectedDeck = Array.isArray(p.selectedDeck) ? p.selectedDeck : ['ENERGY_CORE', 'LASER_TURRET'];

      this.saveActiveAccount();
      this.updateChipsUI();
      this.updateWorldTabsAndKeysUI();
      this.renderLevelGrid();
      this.renderAccountModal();
      window.cyberAudio.playUpgradeSuccess();
      alert(`Đã chuyển sang tài khoản ${this.currentAccount.name} (${this.currentAccount.email})!`);
    } catch (e) {
      console.error(e);
    }
  }

  deleteSavedAccount(email) {
    const emailKey = email.trim().toLowerCase();
    localStorage.removeItem('cyber_profile_' + emailKey);

    let accounts = JSON.parse(localStorage.getItem('cyber_all_accounts') || '[]');
    accounts = accounts.filter(a => a.email && a.email.toLowerCase() !== emailKey);
    localStorage.setItem('cyber_all_accounts', JSON.stringify(accounts));

    if (this.currentAccount.email.toLowerCase() === emailKey) {
      this.logoutAccount();
    } else {
      this.renderAccountModal();
    }
  }

  exportSaveCode() {
    const data = {
      email: this.currentAccount.email,
      name: this.currentAccount.name,
      avatar: this.currentAccount.avatar,
      chips: this.chips,
      upgrades: this.upgrades,
      unlockedLevel: this.unlockedLevel,
      hasNightKey: this.hasNightKey,
      hasCloudKey: this.hasCloudKey,
      unlockedUnits: this.unlockedUnits,
      selectedDeck: this.selectedDeck,
      version: '6.0',
      time: Date.now()
    };
    try {
      const code = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
      navigator.clipboard.writeText(code).then(() => {
        alert('📋 Đã sao chép mã sao lưu vào bộ nhớ tạm!\nBạn có thể gửi mã này qua điện thoại / máy khác và chọn "Nhập mã khôi phục" để đồng bộ tiến trình.');
      }).catch(() => {
        prompt('Mã sao lưu của bạn (hãy copy toàn bộ đoạn mã này):', code);
      });
    } catch (e) {
      alert('Không thể tạo mã sao lưu: ' + e.message);
    }
  }

  importSaveCode() {
    const code = prompt('Dán mã sao lưu tiến trình của bạn vào đây:');
    if (!code) return;

    try {
      const jsonStr = decodeURIComponent(escape(atob(code.trim())));
      const p = JSON.parse(jsonStr);

      if (typeof p.unlockedLevel !== 'number') {
        throw new Error('Mã sao lưu không hợp lệ!');
      }

      this.currentAccount = {
        email: p.email || this.currentAccount.email || '',
        name: p.name || 'Bé Mèo Dễ Thương',
        avatar: p.avatar || '🐱'
      };
      this.chips = typeof p.chips === 'number' ? p.chips : 150;
      this.upgrades = p.upgrades || {};
      this.unlockedLevel = p.unlockedLevel || 1;
      this.hasNightKey = !!p.hasNightKey;
      this.hasCloudKey = !!p.hasCloudKey;
      this.unlockedUnits = Array.isArray(p.unlockedUnits) ? p.unlockedUnits : ['ENERGY_CORE', 'LASER_TURRET'];
      this.selectedDeck = Array.isArray(p.selectedDeck) ? p.selectedDeck : ['ENERGY_CORE', 'LASER_TURRET'];

      this.saveActiveAccount();
      this.updateChipsUI();
      this.updateWorldTabsAndKeysUI();
      this.renderLevelGrid();
      this.renderAccountModal();
      window.cyberAudio.playVictory();
      alert(`🎉 Khôi phục tiến trình thành công! Đã mở Màn ${this.unlockedLevel} với ${this.chips} 🍬 kẹo!`);
    } catch (e) {
      alert('❌ Mã sao lưu không đúng hoặc đã bị lỗi! Chi tiết: ' + e.message);
    }
  }

  logoutAccount() {
    localStorage.removeItem('cyber_active_email');
    this.currentAccount = {
      email: '',
      name: 'Bé Mèo Dễ Thương',
      avatar: '🐱'
    };
    this.saveActiveAccount();
    this.updateChipsUI();
    this.renderAccountModal();
    alert('Đã đăng xuất tài khoản!');
  }

  // ==========================================================================
  // SEED / PLANT DECK SELECTION SCREEN
  // ==========================================================================
  openSeedSelectionModal() {
    const modal = document.getElementById('seed-modal');
    modal.classList.remove('hidden');

    const config = LEVEL_CONFIGS[this.currentLevel] || LEVEL_CONFIGS[1];
    document.getElementById('seed-modal-level-title').textContent = `${config.worldName} • ${config.title}`;

    // Ensure selectedDeck is within valid unlockedUnits
    this.selectedDeck = this.selectedDeck.filter(u => this.unlockedUnits.includes(u));
    if (this.selectedDeck.length === 0) {
      this.autoSelectDeck();
    }

    this.renderSeedSelectionUI();
  }

  autoSelectDeck() {
    // Fill up to 8 cards from unlockedUnits
    this.selectedDeck = [];
    const pool = [...this.unlockedUnits];
    for (let i = 0; i < Math.min(8, pool.length); i++) {
      this.selectedDeck.push(pool[i]);
    }
    this.updateChipsUI();
    this.renderSeedSelectionUI();
  }

  renderSeedSelectionUI() {
    const chosenDeckContainer = document.getElementById('seed-chosen-deck');
    const poolGrid = document.getElementById('seed-pool-grid');
    const monsterList = document.getElementById('seed-monsters-list');
    const countEl = document.getElementById('seed-selected-count');

    countEl.textContent = this.selectedDeck.length;

    // 1. Render 8 Chosen Slots
    chosenDeckContainer.innerHTML = '';
    for (let slot = 0; slot < 8; slot++) {
      const uKey = this.selectedDeck[slot];
      const slotEl = document.createElement('div');
      slotEl.className = `seed-slot ${uKey ? 'filled' : ''}`;

      if (uKey) {
        const u = UNIT_TYPES[uKey];
        slotEl.innerHTML = `
          <div class="unit-card" title="Nhấn để gỡ khỏi đội hình">
            <div class="card-avatar"><canvas id="chosen-icon-${slot}" width="48" height="48"></canvas></div>
            <div class="card-cost">${u ? u.cost : 50}⭐</div>
          </div>
        `;
        slotEl.addEventListener('click', () => {
          this.selectedDeck.splice(slot, 1);
          this.updateChipsUI();
          this.renderSeedSelectionUI();
        });
      } else {
        slotEl.innerHTML = `<span style="font-size:20px; opacity:0.35;">+</span>`;
      }
      chosenDeckContainer.appendChild(slotEl);

      if (uKey) {
        setTimeout(() => this.drawCustomIcon(`chosen-icon-${slot}`, uKey), 10);
      }
    }

    // 2. Render Unlocked Pool Grid
    poolGrid.innerHTML = '';
    this.unlockedUnits.forEach((uKey, idx) => {
      const u = UNIT_TYPES[uKey];
      if (!u) return;
      const isInDeck = this.selectedDeck.includes(uKey);

      const card = document.createElement('div');
      card.className = `unit-card ${isInDeck ? 'in-deck' : ''}`;
      card.title = `${u.vietName} (${u.name})\nGiá: ${u.cost}⭐\n${u.desc}`;
      card.innerHTML = `
        <div class="card-avatar"><canvas id="pool-icon-${idx}" width="48" height="48"></canvas></div>
        <div class="card-cost">${u.cost}⭐</div>
      `;

      card.addEventListener('click', () => {
        if (isInDeck) {
          this.selectedDeck = this.selectedDeck.filter(k => k !== uKey);
        } else if (this.selectedDeck.length < 8) {
          this.selectedDeck.push(uKey);
        } else {
          alert('Đội hình đã đầy (tối đa 8 Bé Cây Trồng)! Hãy gỡ bớt 1 thẻ trước nhé.');
        }
        this.updateChipsUI();
        this.renderSeedSelectionUI();
      });

      poolGrid.appendChild(card);
      setTimeout(() => this.drawCustomIcon(`pool-icon-${idx}`, uKey), 10);
    });

    // 3. Render Monster Previews for this level
    monsterList.innerHTML = '';
    const config = LEVEL_CONFIGS[this.currentLevel] || LEVEL_CONFIGS[1];
    const uniqueMonsters = new Set();
    config.waves.forEach(w => {
      w.enemies.forEach(e => uniqueMonsters.add(e.type));
    });

    Array.from(uniqueMonsters).forEach((vKey, mIdx) => {
      const v = VIRUS_TYPES[vKey] || VIRUS_TYPES.TROJAN_BUG;
      const mItem = document.createElement('div');
      mItem.className = 'seed-monster-item';
      mItem.innerHTML = `
        <div class="seed-monster-img"><canvas id="seed-m-icon-${mIdx}" width="36" height="36"></canvas></div>
        <div class="seed-monster-info">
          <span class="seed-monster-name" style="color: ${v.color};">${v.vietName}</span>
          <span class="seed-monster-stat">${v.hp} HP | ${v.desc.slice(0, 32)}...</span>
        </div>
      `;
      monsterList.appendChild(mItem);

      setTimeout(() => {
        const cv = document.getElementById(`seed-m-icon-${mIdx}`);
        if (!cv) return;
        const ctx = cv.getContext('2d');
        ctx.clearRect(0, 0, 36, 36);
        const dummy = new VirusEnemy(vKey, 0, { startX: 0, startY: 0, cellW: 36, cellH: 36, cols: 0 });
        dummy.x = 18; dummy.y = 18;
        dummy.draw(ctx);
      }, 10);
    });
  }

  drawCustomIcon(canvasId, unitKey) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(w / 2, h / 2 + 1);
    ctx.scale(0.85, 0.85);
    const dummy = new TechUnit(unitKey, 0, 0, { startX: 0, startY: 0, cellW: w, cellH: h }, this.upgrades);
    dummy.animTime = 0;
    dummy.drawPlantSprite(ctx);
    ctx.restore();
  }

  // ==========================================================================
  // LEVEL LIFECYCLE
  // ==========================================================================
  startLevel(levelNum, chosenRoster = null) {
    this.currentLevel = levelNum;
    const config = LEVEL_CONFIGS[levelNum] || LEVEL_CONFIGS[1];

    this.resizeCanvas();
    this.energy = config.initialEnergy;
    this.score = 0;
    this.kills = 0;
    this.chipsEarnedThisRun = 0;
    this.gameTime = 0;
    this.isRunning = true;
    this.isPaused = false;
    this.isShovelActive = false;
    document.getElementById('tool-shovel').classList.remove('active');

    this.units = [];
    this.viruses = [];
    this.projectiles = [];
    this.energyOrbs = [];
    this.particles = [];
    this.floatingTexts = [];

    this.scanners = [];
    for (let r = 0; r < this.grid.rows; r++) {
      this.scanners.push(new FirewallScanner(r, this.grid));
    }

    const activeRoster = chosenRoster || this.selectedDeck;
    this.unitCooldowns = {};
    activeRoster.forEach(uKey => {
      this.unitCooldowns[uKey] = 0;
    });

    this.waveIndex = 0;
    this.waveTimer = 0;
    this.spawnQueue = [];
    this.skyEnergyTimer = 0;
    this.totalWaves = config.waves.length;

    this.scheduleNextWave();

    this.renderDeckCards(activeRoster);
    this.updateEnergyHUD();

    document.getElementById('level-title').textContent = `${config.worldName} • ${config.title}`;
    this.updateWaveHUD();

    window.cyberAudio.startBGM();
    this.showAlertBanner('🌸 BẮT ĐẦU MÀN CHƠI 🌸', config.title);
  }

  scheduleNextWave() {
    const config = LEVEL_CONFIGS[this.currentLevel];
    if (this.waveIndex >= config.waves.length) return;

    const waveData = config.waves[this.waveIndex];
    this.waveTimer = waveData.delay;

    waveData.enemies.forEach(group => {
      for (let i = 0; i < group.count; i++) {
        this.spawnQueue.push({
          type: group.type,
          spawnTime: waveData.delay + i * group.interval,
          row: Math.floor(Math.random() * this.grid.rows)
        });
      }
    });

    if (this.waveIndex === config.waves.length - 1) {
      setTimeout(() => {
        if (this.isRunning) {
          this.showAlertBanner('✨ ĐỢT SÓNG CUỐI CÙNG! ✨', 'Đoàn quân quái slime đang tiến tới!');
          window.cyberAudio.playWarning();
        }
      }, waveData.delay * 1000 - 1500);
    }
  }

  // ==========================================================================
  // CARD DECK & HUD
  // ==========================================================================
  renderDeckCards(availableUnitKeys) {
    const deck = document.getElementById('card-deck');
    deck.innerHTML = '';

    availableUnitKeys.forEach(uKey => {
      const u = UNIT_TYPES[uKey] || UNIT_TYPES.ENERGY_CORE;
      const card = document.createElement('div');
      card.className = 'unit-card';
      card.id = `card-${uKey}`;
      card.setAttribute('data-unit', uKey);
      card.title = `${u.vietName} (${u.name})\nGiá: ${u.cost}⭐\n${u.desc}`;

      card.innerHTML = `
        <div class="card-avatar">
          <canvas id="icon-${uKey}" width="48" height="48"></canvas>
        </div>
        <div class="card-cost">${u.cost}⭐</div>
        <div class="card-cooldown-overlay" id="cd-${uKey}" style="height: 0%;"></div>
      `;

      card.addEventListener('click', () => this.selectUnitCard(uKey));
      deck.appendChild(card);

      this.drawCardIcon(uKey);
    });
  }

  drawCardIcon(unitKey) {
    const canvas = document.getElementById(`icon-${unitKey}`);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.translate(w / 2, h / 2 + 1);
    ctx.scale(0.85, 0.85);
    const dummy = new TechUnit(unitKey, 0, 0, { startX: 0, startY: 0, cellW: w, cellH: h }, this.upgrades);
    dummy.animTime = 0;
    dummy.drawPlantSprite(ctx);
    ctx.restore();
  }

  selectUnitCard(unitKey) {
    const config = UNIT_TYPES[unitKey];
    if (this.energy < config.cost || (this.unitCooldowns[unitKey] && this.unitCooldowns[unitKey] > 0)) {
      return;
    }

    this.isShovelActive = false;
    document.getElementById('tool-shovel').classList.remove('active');

    if (this.selectedUnitType === unitKey) {
      this.selectedUnitType = null;
    } else {
      this.selectedUnitType = unitKey;
    }

    this.updateCardSelectionUI();
  }

  updateCardSelectionUI() {
    document.querySelectorAll('.unit-card').forEach(card => {
      const uKey = card.getAttribute('data-unit');
      const config = UNIT_TYPES[uKey];
      if (!config) return;
      const onCd = this.unitCooldowns[uKey] > 0;
      const notEnoughEnergy = this.energy < config.cost;

      card.classList.toggle('active', this.selectedUnitType === uKey);
      card.classList.toggle('selected', this.selectedUnitType === uKey);
      card.classList.toggle('disabled', onCd || notEnoughEnergy);

      const cdEl = document.getElementById(`cd-${uKey}`);
      if (cdEl) {
        const cdPct = onCd ? (this.unitCooldowns[uKey] / config.cooldown) * 100 : 0;
        cdEl.style.height = `${cdPct}%`;
      }
    });
  }

  updateEnergyHUD() {
    document.getElementById('energy-count').textContent = this.energy;
    this.updateCardSelectionUI();
  }

  updateWaveHUD() {
    document.getElementById('wave-status').textContent = `ĐỢT ${Math.min(this.waveIndex + 1, this.totalWaves)} / ${this.totalWaves}`;
    const pct = Math.min(100, ((this.waveIndex + 1) / this.totalWaves) * 100);
    document.getElementById('wave-progress-bar').style.width = `${pct}%`;
  }

  showAlertBanner(mainText, subText) {
    const alertBox = document.getElementById('cyber-alert');
    document.getElementById('alert-glitch-text').textContent = mainText;
    document.getElementById('alert-sub-text').textContent = subText;
    alertBox.classList.remove('hidden');

    setTimeout(() => {
      alertBox.classList.add('hidden');
    }, 2800);
  }

  // ==========================================================================
  // MAIN GAME LOOP & UPDATES
  // ==========================================================================
  gameLoop(currentTime) {
    const dt = Math.min(0.1, (currentTime - this.lastTime) / 1000) * this.gameSpeed;
    this.lastTime = currentTime;

    if (this.isRunning && !this.isPaused) {
      this.update(dt);
    }
    this.render();

    requestAnimationFrame((t) => this.gameLoop(t));
  }

  update(dt) {
    this.gameTime += dt;
    const config = LEVEL_CONFIGS[this.currentLevel];

    // Sky Energy Drops
    if (config.hasSkyEnergy) {
      this.skyEnergyTimer += dt;
      if (this.skyEnergyTimer >= config.skyEnergyInterval) {
        this.skyEnergyTimer = 0;
        const dropX = this.grid.startX + Math.random() * (this.grid.cols * this.grid.cellW - 60);
        const targetY = this.grid.startY + Math.random() * (this.grid.rows * this.grid.cellH - 40);
        this.spawnEnergyOrb(dropX, -30, 25, true, targetY);
      }
    }

    // Waves & Spawning
    if (this.spawnQueue.length > 0) {
      for (let i = this.spawnQueue.length - 1; i >= 0; i--) {
        const item = this.spawnQueue[i];
        item.spawnTime -= dt;
        if (item.spawnTime <= 0) {
          const v = new VirusEnemy(item.type, item.row, this.grid);
          this.viruses.push(v);
          this.spawnQueue.splice(i, 1);
        }
      }
    } else if (this.waveTimer > 0) {
      this.waveTimer -= dt;
      if (this.waveTimer <= 0) {
        this.waveIndex++;
        this.updateWaveHUD();
        if (this.waveIndex < config.waves.length) {
          this.scheduleNextWave();
        }
      }
    } else if (this.viruses.length === 0 && this.spawnQueue.length === 0 && this.waveIndex >= config.waves.length) {
      this.triggerGameOver(true);
    }

    // Cooldowns
    Object.keys(this.unitCooldowns).forEach(k => {
      if (this.unitCooldowns[k] > 0) {
        this.unitCooldowns[k] = Math.max(0, this.unitCooldowns[k] - dt);
      }
    });
    this.updateCardSelectionUI();

    // Update Entities
    this.units.forEach(u => u.update(dt, this));
    this.units = this.units.filter(u => u.hp > 0);

    this.viruses.forEach(v => v.update(dt, this));
    this.viruses = this.viruses.filter(v => v.hp > 0);

    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      if (this.projectiles[i].update(dt, this)) {
        this.projectiles.splice(i, 1);
      }
    }

    for (let i = this.energyOrbs.length - 1; i >= 0; i--) {
      if (this.energyOrbs[i].update(dt, this)) {
        this.energyOrbs.splice(i, 1);
      }
    }

    for (let i = this.scanners.length - 1; i >= 0; i--) {
      if (this.scanners[i].update(dt, this)) {
        this.scanners.splice(i, 1);
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      if (this.particles[i].update(dt)) {
        this.particles.splice(i, 1);
      }
    }

    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      if (this.floatingTexts[i].update(dt)) {
        this.floatingTexts.splice(i, 1);
      }
    }

    // Clouds Drift
    this.clouds.forEach(c => {
      c.x += c.speed * dt;
      if (c.x > this.canvas.width + 150) c.x = -150;
    });
  }

  spawnEnergyOrb(x, y, value = 50, isSkyDrop = false, targetY = 0) {
    this.energyOrbs.push(new EnergyOrb(x, y, value, isSkyDrop, targetY));
  }

  addEnergy(amount) {
    this.energy += amount;
    this.updateEnergyHUD();
    this.spawnFloatingText(60, 60, `+${amount}⭐`, '#fbbf24');
  }

  onVirusKilled(virus) {
    this.kills++;
    this.score += virus.config.score;

    const chipsEarned = virus.config.isSuperBoss ? 60 : virus.config.isBoss ? 25 : Math.random() < 0.35 ? 3 : 1;
    this.chips += chipsEarned;
    this.chipsEarnedThisRun += chipsEarned;
    this.updateChipsUI();

    this.spawnGlitchParticles(virus.x, virus.y, virus.config.color);
    this.spawnFloatingText(virus.x, virus.y - 20, `+${virus.config.score}`, '#4ade80');

    if (Math.random() < 0.32) {
      this.spawnEnergyOrb(virus.x, virus.y, 25, false);
    }
  }

  triggerEMPExplosion(centerCol, centerRow) {
    window.cyberAudio.playExplosion();
    const blastX = this.grid.startX + centerCol * this.grid.cellW + this.grid.cellW / 2;
    const blastY = this.grid.startY + centerRow * this.grid.cellH + this.grid.cellH / 2;

    this.viruses.forEach(v => {
      const vCol = Math.floor((v.x - this.grid.startX) / this.grid.cellW);
      if (Math.abs(v.row - centerRow) <= 1 && Math.abs(vCol - centerCol) <= 1) {
        v.takeDamage(1800, this);
      }
    });

    for (let i = 0; i < 40; i++) {
      const angle = (Math.PI * 2 * i) / 40;
      const speed = 180 + Math.random() * 120;
      this.particles.push(new Particle(blastX, blastY, Math.cos(angle) * speed, Math.sin(angle) * speed, '#ff5d8f', 0.8, 6));
    }
  }

  spawnLaserSpark(x, y, color = '#ff70a6') {
    for (let i = 0; i < 6; i++) {
      const vx = (Math.random() - 0.5) * 120;
      const vy = (Math.random() - 0.5) * 120;
      this.particles.push(new Particle(x, y, vx, vy, color, 0.3, 3.5));
    }
  }

  spawnMuzzleFlash(x, y, color) {
    for (let i = 0; i < 5; i++) {
      const vx = Math.random() * 80 + 20;
      const vy = (Math.random() - 0.5) * 40;
      this.particles.push(new Particle(x, y, vx, vy, color, 0.25, 3.5));
    }
  }

  spawnGlitchParticles(x, y, color = '#c084fc') {
    for (let i = 0; i < 18; i++) {
      const vx = (Math.random() - 0.5) * 180;
      const vy = (Math.random() - 0.5) * 180;
      this.particles.push(new Particle(x, y, vx, vy, color, 0.6, 5));
    }
  }

  spawnFloatingText(x, y, text, color = '#ffffff') {
    this.floatingTexts.push(new FloatingText(x, y, text, color));
  }

  // ==========================================================================
  // USER INPUT & POINTER/TOUCH HANDLING
  // ==========================================================================
  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    this.processPointerMove((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
  }

  processPointerMove(x, y) {
    this.mousePos.x = x;
    this.mousePos.y = y;

    const col = Math.floor((this.mousePos.x - this.grid.startX) / this.grid.cellW);
    const row = Math.floor((this.mousePos.y - this.grid.startY) / this.grid.cellH);

    if (col >= 0 && col < this.grid.cols && row >= 0 && row < this.grid.rows) {
      this.mouseGrid.col = col;
      this.mouseGrid.row = row;
    } else {
      this.mouseGrid.col = -1;
      this.mouseGrid.row = -1;
    }
  }

  handleCanvasClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    this.processPointerClick((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
  }

  processPointerClick(clickX, clickY) {
    if (!this.isRunning || this.isPaused) return;

    // Collect Energy Orbs (with extra generous touch radius for phones)
    for (let i = this.energyOrbs.length - 1; i >= 0; i--) {
      const orb = this.energyOrbs[i];
      const dist = Math.hypot(orb.x - clickX, orb.y - clickY);
      if (dist < orb.radius + 28) {
        orb.collect();
        return;
      }
    }

    const col = Math.floor((clickX - this.grid.startX) / this.grid.cellW);
    const row = Math.floor((clickY - this.grid.startY) / this.grid.cellH);

    if (col >= 0 && col < this.grid.cols && row >= 0 && row < this.grid.rows) {
      const existingUnit = this.units.find(u => u.col === col && u.row === row);

      if (this.isShovelActive) {
        if (existingUnit) {
          existingUnit.hp = 0;
          this.addEnergy(Math.floor(existingUnit.config.cost * 0.4));
          window.cyberAudio.playLaser(400, 0.1);
          this.spawnGlitchParticles(existingUnit.x, existingUnit.y, '#ff70a6');
          this.isShovelActive = false;
          document.getElementById('tool-shovel').classList.remove('active');
        }
        return;
      }

      if (this.selectedUnitType && !existingUnit) {
        const config = UNIT_TYPES[this.selectedUnitType];
        if (this.energy >= config.cost) {
          this.energy -= config.cost;
          this.unitCooldowns[this.selectedUnitType] = config.cooldown;
          
          const newUnit = new TechUnit(this.selectedUnitType, col, row, this.grid, this.upgrades);
          this.units.push(newUnit);

          window.cyberAudio.playPlaceUnit();
          this.spawnMuzzleFlash(newUnit.x, newUnit.y, config.color);
          this.selectedUnitType = null;
          this.updateCardSelectionUI();
          this.updateEnergyHUD();
        }
      }
    }
  }

  // ==========================================================================
  // GAME OVER, VICTORY & REWARD UNLOCK FLOW
  // ==========================================================================
  triggerGameOver(isVictory) {
    this.isRunning = false;

    if (isVictory) {
      if (this.currentLevel >= this.unlockedLevel) {
        this.unlockedLevel = Math.min(40, this.currentLevel + 1);
      }

      const rewardUnitKey = LEVEL_UNLOCK_REWARDS[this.currentLevel];
      const isNewUnit = rewardUnitKey && !this.unlockedUnits.includes(rewardUnitKey);

      if (isNewUnit) {
        this.unlockedUnits.push(rewardUnitKey);
        if (!this.selectedDeck.includes(rewardUnitKey) && this.selectedDeck.length < 8) {
          this.selectedDeck.push(rewardUnitKey);
        }
        this.updateChipsUI();
        this.showNewUnitUnlockedModal(rewardUnitKey);
        return;
      }

      if (this.currentLevel === 10 && !this.hasNightKey) {
        this.hasNightKey = true;
        this.updateChipsUI();
        this.updateWorldTabsAndKeysUI();
        this.showKeyDropModal('🗝️', 'NHẬN ĐƯỢC CHÌA KHÓA ĐÊM MỘNG MƠ!', 'Bạn vừa đánh bại bé Trùm Slime! Thế Giới 2: Rừng Sao Đêm Mộng Mơ đã sẵn sàng chào đón!');
        return;
      }

      if (this.currentLevel === 20 && !this.hasCloudKey) {
        this.hasCloudKey = true;
        this.updateChipsUI();
        this.updateWorldTabsAndKeysUI();
        this.showKeyDropModal('🔑', 'NHẬN ĐƯỢC CHÌA KHÓA MÂY BỒNG BỀNH!', 'Bạn vừa đánh bại Hoàng Tử Bạch Tuộc! Thế Giới 3: Kẹo Bông Trên Mây đã được mở khóa!');
        return;
      }

      const modal = document.getElementById('end-modal');
      modal.classList.remove('hidden');

      const iconEl = document.getElementById('end-status-icon');
      const titleEl = document.getElementById('end-title');
      const msgEl = document.getElementById('end-message');
      const nextBtn = document.getElementById('btn-next-level');

      iconEl.textContent = '🏆';
      titleEl.textContent = 'CHIẾN THẮNG TUYỆT VỜI!';
      titleEl.style.color = '#4ade80';
      msgEl.textContent = `Đã hoàn thành xuất sắc ${LEVEL_CONFIGS[this.currentLevel].title}!`;
      nextBtn.style.display = this.currentLevel === 40 ? 'none' : 'inline-flex';
      window.cyberAudio.playVictory();

      const levelBonus = this.currentLevel * 15;
      this.chips += levelBonus;
      this.chipsEarnedThisRun += levelBonus;
      this.updateChipsUI();
    } else {
      const modal = document.getElementById('end-modal');
      modal.classList.remove('hidden');

      const iconEl = document.getElementById('end-status-icon');
      const titleEl = document.getElementById('end-title');
      const msgEl = document.getElementById('end-message');
      const nextBtn = document.getElementById('btn-next-level');

      iconEl.textContent = '🧸';
      titleEl.textContent = 'CỐ GẮNG LẦN SAU NHÉ!';
      titleEl.style.color = '#ff5d8f';
      msgEl.textContent = 'Đàn quái slime đã tiến vào vườn kẹo, hãy cùng các bé cây thử lại nhé!';
      nextBtn.style.display = 'none';
      window.cyberAudio.playDefeat();
    }

    document.getElementById('stat-kills').textContent = this.kills;
    document.getElementById('stat-energy').textContent = this.energy;
    document.getElementById('stat-chips').textContent = `+${this.chipsEarnedThisRun} 🍬`;
    document.getElementById('stat-score').textContent = this.score;
  }

  showNewUnitUnlockedModal(unitKey) {
    const u = UNIT_TYPES[unitKey];
    if (!u) return;

    const modal = document.getElementById('unlock-modal');
    document.getElementById('unlock-unit-name').textContent = `${u.vietName.toUpperCase()} (${u.name})`;
    document.getElementById('unlock-unit-stats').textContent = `Chi phí: ${u.cost}⭐ | Hồi chiêu: ${u.cooldown}s | ${u.role}`;
    document.getElementById('unlock-unit-desc').textContent = u.desc;

    const canvas = document.getElementById('unlock-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 90, 90);
      const dummy = new TechUnit(unitKey, 0, 0, { startX: 0, startY: 0, cellW: 90, cellH: 90 }, this.upgrades);
      dummy.x = 45; dummy.y = 45;
      dummy.draw(ctx);
    }

    modal.classList.remove('hidden');
    window.cyberAudio.playUnlockUnitFanfare();
  }

  showKeyDropModal(icon, title, desc) {
    const modal = document.getElementById('key-modal');
    document.getElementById('key-modal-icon').textContent = icon;
    document.getElementById('key-modal-title').textContent = title;
    document.getElementById('key-modal-desc').textContent = desc;
    modal.classList.remove('hidden');
    window.cyberAudio.playUpgradeSuccess();
  }

  // ==========================================================================
  // CANVAS RENDERING
  // ==========================================================================
  render() {
    const { ctx, canvas } = this;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.shadowBlur = 0;
    ctx.shadowColor = 'transparent';
    ctx.setLineDash([]);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const config = LEVEL_CONFIGS[this.currentLevel] || LEVEL_CONFIGS[1];
    const world = config.world;

    this.drawEnvironmentBackground(ctx, world);
    this.drawCyberGrid(ctx, world);

    if (this.mouseGrid.col >= 0 && this.mouseGrid.row >= 0) {
      this.drawGridCursor(ctx);
    }

    this.scanners.forEach(s => s.draw(ctx));
    this.units.forEach(u => u.draw(ctx));
    this.viruses.forEach(v => v.draw(ctx));
    this.projectiles.forEach(p => p.draw(ctx));
    this.energyOrbs.forEach(orb => orb.draw(ctx));
    this.particles.forEach(p => p.draw(ctx));
    this.floatingTexts.forEach(ft => ft.draw(ctx));
  }

  // Cute Animated Backgrounds for 3 Worlds
  drawEnvironmentBackground(ctx, world) {
    const { width, height } = this.canvas;

    if (world === 'day') {
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#bae6fd');
      grad.addColorStop(0.35, '#dcfce7');
      grad.addColorStop(1, '#86efac');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#4ade80';
      ctx.beginPath();
      ctx.ellipse(width * 0.3, height + 80, width * 0.45, 160, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.ellipse(width * 0.75, height + 90, width * 0.45, 170, 0, 0, Math.PI * 2);
      ctx.fill();

    } else if (world === 'night') {
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#2e1065');
      grad.addColorStop(0.5, '#1e1b4b');
      grad.addColorStop(1, '#0f172a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < 24; i++) {
        const sx = ((i * 137.5) % width);
        const sy = ((i * 89.3) % (height * 0.6));
        const twinkle = Math.sin(this.gameTime * 3 + i) * 0.4 + 0.6;
        ctx.fillStyle = `rgba(255, 240, 245, ${twinkle})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 2 + (i % 3), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.save();
      ctx.translate(width - 90, 70);
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#2e1065';
      ctx.beginPath();
      ctx.arc(-8, -6, 20, 0, Math.PI * 2); ctx.fill();
      ctx.restore();

    } else if (world === 'cloud') {
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#fbcfe8');
      grad.addColorStop(0.4, '#bae6fd');
      grad.addColorStop(1, '#ddd6fe');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      const rainbowColors = ['#f43f5e', '#fb923c', '#facc15', '#4ade80', '#38bdf8', '#a855f7'];
      rainbowColors.forEach((col, idx) => {
        ctx.strokeStyle = col;
        ctx.lineWidth = 5;
        ctx.globalAlpha = 0.35;
        ctx.beginPath();
        ctx.arc(width * 0.5, height * 0.9, 260 - idx * 5, Math.PI, 0, false);
        ctx.stroke();
      });
      ctx.restore();
    }

    this.clouds.forEach(c => {
      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.w / 2, c.h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  drawCyberGrid(ctx, world) {
    const { startX, startY, cellW, cellH, rows, cols } = this.grid;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = startX + c * cellW;
        const y = startY + r * cellH;
        const isEven = (r + c) % 2 === 0;

        if (world === 'day') {
          ctx.fillStyle = isEven ? 'rgba(134, 239, 172, 0.75)' : 'rgba(74, 222, 128, 0.75)';
        } else if (world === 'night') {
          ctx.fillStyle = isEven ? 'rgba(76, 29, 149, 0.75)' : 'rgba(49, 16, 104, 0.85)';
        } else {
          ctx.fillStyle = isEven ? 'rgba(255, 245, 250, 0.8)' : 'rgba(240, 249, 255, 0.85)';
        }

        ctx.beginPath();
        ctx.roundRect(x + 2, y + 2, cellW - 4, cellH - 4, 10);
        ctx.fill();

        if ((r * cols + c) % 5 === 0) {
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(x + 12, y + 12, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    ctx.strokeStyle = '#ff70a6';
    ctx.lineWidth = 3.5;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(startX - 10, startY - 6);
    ctx.lineTo(startX - 10, startY + rows * cellH + 6);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  drawGridCursor(ctx) {
    const { startX, startY, cellW, cellH } = this.grid;
    const x = startX + this.mouseGrid.col * cellW;
    const y = startY + this.mouseGrid.row * cellH;
    const existing = this.units.find(u => u.col === this.mouseGrid.col && u.row === this.mouseGrid.row);

    ctx.save();

    if (this.isShovelActive) {
      ctx.fillStyle = 'rgba(255, 93, 143, 0.25)';
      ctx.beginPath();
      ctx.roundRect(x + 2, y + 2, cellW - 4, cellH - 4, 12);
      ctx.fill();

      ctx.strokeStyle = '#ff3385';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(x + 2, y + 2, cellW - 4, cellH - 4, 12);
      ctx.stroke();

      ctx.fillStyle = '#ff3385';
      ctx.font = '700 12px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(existing ? '🪄 THU HỒI' : '🪄 CHỌN Ô', x + cellW / 2, y + cellH - 12);

    } else if (this.selectedUnitType) {
      if (existing) {
        ctx.fillStyle = 'rgba(244, 63, 94, 0.25)';
        ctx.beginPath();
        ctx.roundRect(x + 2, y + 2, cellW - 4, cellH - 4, 12);
        ctx.fill();

        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = '#f43f5e';
        ctx.font = '700 12px Fredoka, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('✖ ĐÃ CÓ BÉ CÂY', x + cellW / 2, y + cellH / 2);

      } else {
        const pulse = Math.sin(this.gameTime * 6) * 0.08 + 0.22;
        ctx.fillStyle = `rgba(255, 112, 166, ${pulse})`;
        ctx.beginPath();
        ctx.roundRect(x + 2, y + 2, cellW - 4, cellH - 4, 12);
        ctx.fill();

        ctx.strokeStyle = '#ff70a6';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#ff70a6';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = '#ffffff';
        ctx.font = '700 12px Fredoka, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('💖 TRỒNG BÉ CÂY', x + cellW / 2, y + cellH - 12);
      }
    } else {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.beginPath();
      ctx.roundRect(x + 2, y + 2, cellW - 4, cellH - 4, 12);
      ctx.fill();
    }

    ctx.restore();
  }

  // ==========================================================================
  // TECH LAB & CODEX
  // ==========================================================================
  renderTechLab() {
    const container = document.getElementById('upgrades-container');
    if (!container) return;

    this.updateChipsUI();

    const items = Object.values(UPGRADE_DATA).map(u => {
      const isBought = !!this.upgrades[u.id];
      const canAfford = this.chips >= u.cost;

      return `
        <div class="upgrade-card ${isBought ? 'maxed' : !canAfford ? 'cant-afford' : ''}">
          <div class="upg-icon">${u.icon}</div>
          <div class="upg-info">
            <div class="upg-title">${u.name}</div>
            <div class="upg-desc">${u.desc}</div>
          </div>
          <button 
            class="upg-btn" 
            data-upgrade="${u.id}"
            ${isBought || !canAfford ? 'disabled' : ''}
          >
            ${isBought ? '✓ ĐÃ NÂNG' : `${u.cost} 🍬`}
          </button>
        </div>
      `;
    }).join('');

    container.innerHTML = items;

    container.querySelectorAll('.upg-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const upId = e.currentTarget.getAttribute('data-upgrade');
        this.buyUpgrade(upId);
      });
    });
  }

  buyUpgrade(upgradeId) {
    const data = UPGRADE_DATA[upgradeId];
    if (!data || this.chips < data.cost || this.upgrades[upgradeId]) return;

    this.chips -= data.cost;
    this.upgrades[upgradeId] = true;
    this.updateChipsUI();
    this.renderTechLab();
    window.cyberAudio.playUpgradeSuccess();
  }

  renderCodex(tabKey) {
    const body = document.getElementById('codex-body');
    if (!body) return;

    if (tabKey === 'units') {
      const items = Object.values(UNIT_TYPES).map(u => `
        <div class="codex-item">
          <div class="codex-item-img">
            <canvas id="cv-unit-${u.id}" width="58" height="58"></canvas>
          </div>
          <div class="codex-item-info">
            <div class="codex-item-title">${u.vietName} (${u.name})</div>
            <div class="codex-item-stats">${u.role} | Chi phí: <strong>${u.cost}⭐</strong></div>
            <div class="codex-item-desc">${u.desc}</div>
          </div>
        </div>
      `).join('');
      body.innerHTML = `<div class="codex-grid">${items}</div>`;

      setTimeout(() => {
        Object.values(UNIT_TYPES).forEach(u => {
          const cv = document.getElementById(`cv-unit-${u.id}`);
          if (!cv) return;
          const cctx = cv.getContext('2d');
          cctx.clearRect(0, 0, 58, 58);
          const dummy = new TechUnit(u.id, 0, 0, { startX: 0, startY: 0, cellW: 58, cellH: 58 }, {});
          dummy.x = 29; dummy.y = 29;
          dummy.draw(cctx);
        });
      }, 50);

    } else {
      const items = Object.values(VIRUS_TYPES).map(v => `
        <div class="codex-item">
          <div class="codex-item-img">
            <canvas id="cv-virus-${v.id}" width="58" height="58"></canvas>
          </div>
          <div class="codex-item-info">
            <div class="codex-item-title" style="color: ${v.color};">${v.vietName}</div>
            <div class="codex-item-stats">Máu: <strong>${v.hp} HP</strong> | Tốc độ: <strong>${v.speed}</strong></div>
            <div class="codex-item-desc">${v.desc}</div>
          </div>
        </div>
      `).join('');
      body.innerHTML = `<div class="codex-grid">${items}</div>`;

      setTimeout(() => {
        Object.values(VIRUS_TYPES).forEach(v => {
          const cv = document.getElementById(`cv-virus-${v.id}`);
          if (!cv) return;
          const cctx = cv.getContext('2d');
          cctx.clearRect(0, 0, 58, 58);
          const dummy = new VirusEnemy(v.id, 0, { startX: 0, startY: 0, cellW: 58, cellH: 58, cols: 0 });
          dummy.x = 29; dummy.y = 29;
          dummy.draw(cctx);
        });
      }, 50);
    }
  }
}

// Instantiate Game
window.addEventListener('DOMContentLoaded', () => {
  window.cyberGame = new CyberGame();
  setTimeout(() => {
    if (window.cyberGame) window.cyberGame.resizeCanvas();
  }, 60);
  setTimeout(() => {
    if (window.cyberGame) window.cyberGame.resizeCanvas();
  }, 350);
});
