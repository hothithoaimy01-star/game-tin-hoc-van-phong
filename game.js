/**
 * HALLOWEEN NIGHT: Vườn Ma Bí Ngô vs Binh Đoàn Xác Sống Kinh Dị
 * Game Controller & Engine: 40 Missions, 40 Halloween Spooky Towers, 25 Horror Monsters, Custom Cute Cursors
 */

// 40 Levels Unlock Rewards (1 new tower rewarded per level completed!)
const LEVEL_UNLOCK_REWARDS = {
  1: 'NANO_SHIELD',            // Thắng Màn 1 -> Nhận Bia Mộ Hộ Vệ Cổ
  2: 'CRYO_TURRET',            // Thắng Màn 2 -> Nhận Hồn Ma Băng Giá Banshee
  3: 'EMP_BOMB',               // Thắng Màn 3 -> Nhận Bí Ngô Nổ Đoạt Mệnh
  4: 'DURIAN_SHREDDER',        // Thắng Màn 4 -> Nhận Bẫy Xương Gai Nguyền Rủa
  5: 'RAILGUN_CANNON',         // Thắng Màn 5 -> Nhận Pháo Đầu Lâu Kép
  6: 'GATLING_PEA_CAT',        // Thắng Màn 6 -> Nhận Mèo Thần Chết Gatling 4 Nòng
  7: 'TESLA_COIL',             // Thắng Màn 7 -> Nhận Cáo Chín Đuôi U Linh Sét
  8: 'SCATTER_SHOTGUN',        // Thắng Màn 8 -> Nhận Bí Ngô Bắn 3 Làn
  9: 'SNIPER_TURRET',          // Thắng Màn 9 -> Nhận Con Mắt Ma Bắn Tỉa Xuyên Thấu
  10: 'DRONE_HIVE',            // Thắng Màn 10 -> Nhận Tổ Dơi Ma Cà Rồng sang Thế Giới 2
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
// LEVEL GENERATOR FOR 40 HALLOWEEN MISSIONS
// ============================================================================
function generateLevelConfigs() {
  const levels = {};

  // WORLD 1: NGHĨA TRANG BÍ NGÔ MA ÁM (Levels 1 to 10)
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
        const count = w === 0 ? 4 : 7;
        enemyGroups.push({ type: 'TROJAN_BUG', count: count, interval: 2.5 });
      } else if (i === 2) {
        enemyGroups.push({ type: 'TROJAN_BUG', count: 4 + w * 2, interval: 2.2 });
        enemyGroups.push({ type: 'ENCRYPTED_WORM', count: 1 + w, interval: 4.0 });
      } else if (i === 3) {
        enemyGroups.push({ type: 'TROJAN_BUG', count: 4 + w, interval: 2.0 });
        enemyGroups.push({ type: 'ENCRYPTED_WORM', count: 1 + w, interval: 3.5 });
        if (w >= 1) enemyGroups.push({ type: 'BALLOON_SLIME', count: 1 + w, interval: 4.0 });
      } else if (i === 4) {
        enemyGroups.push({ type: 'TROJAN_BUG', count: 4 + w * 2, interval: 1.8 });
        enemyGroups.push({ type: 'ENCRYPTED_WORM', count: 2 + w, interval: 3.0 });
        enemyGroups.push({ type: 'GLITCH_SPRINTER', count: 1 + w, interval: 3.5 });
      } else if (i === 5) {
        enemyGroups.push({ type: 'TROJAN_BUG', count: 4 + w, interval: 1.8 });
        enemyGroups.push({ type: 'ENCRYPTED_WORM', count: 2 + w, interval: 3.0 });
        enemyGroups.push({ type: 'DIGGER_MOLE', count: 1 + Math.floor(w / 2), interval: 4.5 });
        if (w >= 2) enemyGroups.push({ type: 'RANSOMWARE_BRUTE', count: 1, interval: 5.0 });
      } else if (i === 6) {
        enemyGroups.push({ type: 'TROJAN_BUG', count: 4 + w, interval: 1.8 });
        enemyGroups.push({ type: 'STEALTH_SPYWARE', count: 2 + w, interval: 2.8 });
        enemyGroups.push({ type: 'GLITCH_SPRINTER', count: 1 + Math.floor(w / 2), interval: 3.5 });
        enemyGroups.push({ type: 'BALLOON_SLIME', count: 1 + Math.floor(w / 2), interval: 4.0 });
      } else if (i === 7) {
        enemyGroups.push({ type: 'ENCRYPTED_WORM', count: 3 + w, interval: 2.2 });
        enemyGroups.push({ type: 'CYBER_ZOMBIE_MECH', count: 1 + Math.floor(w / 2), interval: 3.8 });
        enemyGroups.push({ type: 'BIO_SYNTH_VIRUS', count: 1 + Math.floor(w / 2), interval: 4.0 });
        if (w >= 2) enemyGroups.push({ type: 'RANSOMWARE_BRUTE', count: 1 + Math.floor(w / 3), interval: 5.0 });
      } else if (i === 8) {
        enemyGroups.push({ type: 'TROJAN_BUG', count: 5 + w * 2, interval: 1.5 });
        enemyGroups.push({ type: 'DISCO_SLIME', count: 1 + Math.floor(w / 2), interval: 5.0 });
        enemyGroups.push({ type: 'CYBER_ZOMBIE_MECH', count: 1 + Math.floor(w / 2), interval: 3.5 });
        enemyGroups.push({ type: 'GLITCH_SPRINTER', count: 2, interval: 3.0 });
      } else if (i === 9) {
        enemyGroups.push({ type: 'HYDRA_TROJAN', count: 1 + Math.floor(w / 2), interval: 4.0 });
        enemyGroups.push({ type: 'RANSOMWARE_BRUTE', count: 1 + Math.floor(w / 2), interval: 4.5 });
        enemyGroups.push({ type: 'DIGGER_MOLE', count: 1 + Math.floor(w / 2), interval: 4.0 });
        enemyGroups.push({ type: 'CYBER_ZOMBIE_MECH', count: 2, interval: 3.5 });
      } else if (i === 10) {
        enemyGroups.push({ type: 'HYDRA_TROJAN', count: 2 + w, interval: 3.5 });
        enemyGroups.push({ type: 'GLITCH_SPRINTER', count: 2 + w, interval: 2.5 });
        enemyGroups.push({ type: 'CYBER_ZOMBIE_MECH', count: 2 + w, interval: 3.0 });
        enemyGroups.push({ type: 'BIO_SYNTH_VIRUS', count: 2, interval: 3.5 });
      }

      waves.push({ delay: w === 0 ? 8 : 7, enemies: enemyGroups });
    }

    levels[i] = {
      world: 'day',
      worldName: 'THẾ GIỚI 1: NGHĨA TRANG BÍ NGÔ MA ÁM 🎃',
      title: isBoss ? 'MÀN 10 (TRÙM VUA XÁC SỐNG): ĐẠI CHIẾN NGHĨA TRANG 💀' : `MÀN ${i < 10 ? '0' + i : i}: THANH TẨY NGHĨA TRANG BÍ NGÔ`,
      initialEnergy: 150 + i * 25,
      hasSkyEnergy: true,
      skyEnergyInterval: 7.0,
      waves: waves,
      isBoss: isBoss
    };
  }

  // WORLD 2: LÂU ĐÀI DRACULA & RỪNG MA CÀ RỒNG (Levels 11 to 20)
  for (let i = 11; i <= 20; i++) {
    const isBoss = (i === 20);
    const wavesCount = i <= 14 ? 4 : 5;
    const waves = [];

    for (let w = 0; w < wavesCount; w++) {
      const isFinalWave = (w === wavesCount - 1);
      const enemyGroups = [];

      if (isBoss && isFinalWave) {
        enemyGroups.push({ type: 'BOTNET_COMMANDER', count: 1, interval: 6.0 });
        enemyGroups.push({ type: 'ARMORED_CYBER_CRUSHER', count: 2, interval: 4.0 });
        enemyGroups.push({ type: 'ROOTKIT_TITAN', count: 2, interval: 4.0 });
        enemyGroups.push({ type: 'SHADOW_STALKER', count: 4, interval: 2.0 });
        enemyGroups.push({ type: 'NINJA_SLIME', count: 4, interval: 2.2 });
        enemyGroups.push({ type: 'FROST_YETI_SLIME', count: 2, interval: 4.5 });
      } else {
        enemyGroups.push({ type: 'ENCRYPTED_WORM', count: 4 + w, interval: 1.8 });
        enemyGroups.push({ type: 'FROST_YETI_SLIME', count: 1 + Math.floor(w / 2), interval: 4.0 });
        enemyGroups.push({ type: 'DIVER_SLIME', count: 2 + w, interval: 2.5 });
        enemyGroups.push({ type: 'NINJA_SLIME', count: 1 + Math.floor(w / 2), interval: 3.0 });
        if (i >= 15) enemyGroups.push({ type: 'SHADOW_STALKER', count: 1 + Math.floor(w / 2), interval: 3.2 });
        if (i >= 17) enemyGroups.push({ type: 'DARK_MATTER_GHOST', count: 1 + Math.floor(w / 3), interval: 4.5 });
      }

      waves.push({ delay: w === 0 ? 8 : 7, enemies: enemyGroups });
    }

    levels[i] = {
      world: 'night',
      worldName: 'THẾ GIỚI 2: LÂU ĐÀI DRACULA & RỪNG MA CÀ RỒNG 🏰',
      title: isBoss ? 'MÀN 20 (TRÙM BÁ TƯỚC DRACULA): HUYẾT CHIẾN LÂU ĐÀI 🧛‍♂️' : `MÀN ${i}: KHÁM PHÁ LÂU ĐÀI BÓNG ĐÊM`,
      initialEnergy: 300 + (i - 10) * 15,
      hasSkyEnergy: false,
      skyEnergyInterval: 999999,
      waves: waves,
      isBoss: isBoss
    };
  }

  // WORLD 3: ĐỊA NGỤC MÁU & HƯ VÔ HẮC ÁM (Levels 21 to 40)
  for (let i = 21; i <= 40; i++) {
    const isMegaBoss = (i === 40);
    const isSuperBoss = (i === 30);
    const isBoss = isMegaBoss || isSuperBoss;
    const wavesCount = i <= 25 ? 4 : i <= 35 ? 5 : 6;
    const waves = [];

    for (let w = 0; w < wavesCount; w++) {
      const isFinalWave = (w === wavesCount - 1);
      const enemyGroups = [];

      if (isMegaBoss && isFinalWave) {
        enemyGroups.push({ type: 'NEURAL_OVERDRIVE_MEGABOSS', count: 1, interval: 7.0 });
        enemyGroups.push({ type: 'ARMORED_CYBER_CRUSHER', count: 3, interval: 3.5 });
        enemyGroups.push({ type: 'ZERO_DAY_EXPLOIT', count: 4, interval: 2.2 });
        enemyGroups.push({ type: 'TROJAN_HORSE_CARRIER', count: 3, interval: 3.5 });
        enemyGroups.push({ type: 'LOGIC_BOMB_GOLEM', count: 4, interval: 2.8 });
        enemyGroups.push({ type: 'QUANTUM_SINGULARITY_CORE', count: 2, interval: 5.0 });
      } else if (isSuperBoss && isFinalWave) {
        enemyGroups.push({ type: 'QUANTUM_LEVIATHAN', count: 1, interval: 6.5 });
        enemyGroups.push({ type: 'TROJAN_HORSE_CARRIER', count: 2, interval: 4.0 });
        enemyGroups.push({ type: 'ZERO_DAY_EXPLOIT', count: 3, interval: 2.5 });
        enemyGroups.push({ type: 'NANO_SWARM_COLONY', count: 3, interval: 3.0 });
      } else {
        enemyGroups.push({ type: 'NANO_SWARM_COLONY', count: 3 + w, interval: 2.0 });
        enemyGroups.push({ type: 'LOGIC_BOMB_GOLEM', count: 1 + Math.floor(w / 2), interval: 3.5 });
        enemyGroups.push({ type: 'ZERO_DAY_EXPLOIT', count: 1 + Math.floor(w / 2), interval: 3.0 });
        enemyGroups.push({ type: 'ARMORED_CYBER_CRUSHER', count: 1 + Math.floor(w / 3), interval: 4.5 });
        if (i >= 26) enemyGroups.push({ type: 'TROJAN_HORSE_CARRIER', count: 1 + Math.floor(w / 3), interval: 4.0 });
        if (i >= 33) enemyGroups.push({ type: 'QUANTUM_SINGULARITY_CORE', count: 1, interval: 5.5 });
      }

      waves.push({ delay: w === 0 ? 8 : 7, enemies: enemyGroups });
    }

    levels[i] = {
      world: 'cloud',
      worldName: 'THẾ GIỚI 3: ĐỊA NGỤC MÁU & HƯ VÔ HẮC ÁM 🩸',
      title: i === 40 ? 'MÀN 40 (MEGA BOSS THẦN CHẾT TỐI THƯỢNG): TRẬN CHIẾN DIỆT THẾ 💀' : `MÀN ${i}: VỰC SÂU ĐỊA NGỤC HẮC ÁM`,
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
    id: 'extraSun', name: 'Linh Hồn Bí Ngô Rực Sáng (+25🎃)',
    desc: 'Bí Ngô Ma Thuật chiêu hồn thêm +25🎃 Linh Hồn mỗi lần bốc cháy!',
    cost: 100, icon: '🎃'
  },
  overclock: {
    id: 'overclock', name: 'Hộp Nhạc Ma Ám (+20% Tốc Độ)',
    desc: 'Toàn bộ bé tháp ma thuật tăng tốc độ bắn thêm 20% vĩnh viễn.',
    cost: 150, icon: '🎵'
  },
  plasmaPower: {
    id: 'plasmaPower', name: 'Ngọn Lửa Địa Ngục (+25% Sát Thương)',
    desc: 'Tăng 25% uy lực hắc ám cho toàn bộ đạn ma thuật của các bé tháp.',
    cost: 200, icon: '🔥'
  },
  shieldBoost: {
    id: 'shieldBoost', name: 'Phong Ấn Bia Mộ Cổ (+35% Máu)',
    desc: 'Bia Mộ Hộ Vệ và Lồng Bí Ngô tăng thêm 35% lượng máu chống đỡ quái vật!',
    cost: 150, icon: '🪦'
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

    this.selectedAvatar = '🎃';
    this.currentAccount = {
      email: '',
      name: 'Bé Mèo Phù Thủy',
      avatar: '🎃'
    };

    // Load active account or fallback
    this.loadActiveAccount();
    this.activeWorldTab = 'day';

    // Spooky background floating bats / wisps
    this.clouds = [];
    for (let c = 0; c < 10; c++) {
      this.clouds.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        w: 40 + Math.random() * 50,
        h: 20 + Math.random() * 20,
        speed: 25 + Math.random() * 35,
        color: ['rgba(36, 0, 70, 0.65)', 'rgba(255, 119, 0, 0.45)', 'rgba(157, 78, 221, 0.4)'][c % 3]
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
    this.waveSpawned = false;
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

  loadActiveAccount() {
    try {
      const activeEmail = localStorage.getItem('cuties_active_email') || '';
      const savedListStr = localStorage.getItem('cuties_user_accounts');
      const accountsList = savedListStr ? JSON.parse(savedListStr) : [];

      if (activeEmail) {
        const found = accountsList.find(a => a.email.toLowerCase() === activeEmail.toLowerCase());
        if (found) {
          this.currentAccount = found;
          this.loadProfile(found);
          return;
        }
      }

      // Default local profile
      this.loadProfile();
    } catch (e) {
      console.warn("Account load fallback", e);
      this.loadProfile();
    }
  }

  saveActiveAccount() {
    try {
      const savedListStr = localStorage.getItem('cuties_user_accounts');
      let accountsList = savedListStr ? JSON.parse(savedListStr) : [];

      const currentProfileData = {
        email: this.currentAccount.email || '',
        name: this.currentAccount.name || 'Bé Mèo Phù Thủy',
        avatar: this.currentAccount.avatar || '🎃',
        maxLevel: this.maxLevel || 1,
        chips: this.chips || 150,
        unlockedUnits: this.unlockedUnits || ['ENERGY_CORE', 'LASER_TURRET'],
        selectedDeck: this.selectedDeck || ['ENERGY_CORE', 'LASER_TURRET'],
        upgrades: this.upgrades || {},
        keys: this.keys || { night: false, cloud: false },
        lastPlayed: new Date().toLocaleString()
      };

      if (this.currentAccount.email) {
        const idx = accountsList.findIndex(a => a.email.toLowerCase() === this.currentAccount.email.toLowerCase());
        if (idx >= 0) {
          accountsList[idx] = currentProfileData;
        } else {
          accountsList.push(currentProfileData);
        }
        localStorage.setItem('cuties_active_email', this.currentAccount.email);
      }

      localStorage.setItem('cuties_user_accounts', JSON.stringify(accountsList));
      this.saveProfile();
    } catch (e) {
      console.warn("Account save fallback", e);
    }
  }

  loadProfile(accountData = null) {
    try {
      const p = accountData || JSON.parse(localStorage.getItem('cyber_cuties_profile_v7') || '{}');
      this.maxLevel = p.maxLevel || 1;
      this.chips = typeof p.chips === 'number' ? p.chips : 150;
      this.unlockedUnits = Array.isArray(p.unlockedUnits) ? p.unlockedUnits : ['ENERGY_CORE', 'LASER_TURRET'];
      this.selectedDeck = Array.isArray(p.selectedDeck) ? p.selectedDeck : ['ENERGY_CORE', 'LASER_TURRET'];
      this.upgrades = p.upgrades || {};
      this.keys = p.keys || { night: false, cloud: false };

      if (p.name) this.currentAccount.name = p.name;
      if (p.avatar) this.currentAccount.avatar = p.avatar;
      if (p.email) this.currentAccount.email = p.email;
    } catch (e) {
      this.maxLevel = 1;
      this.chips = 150;
      this.unlockedUnits = ['ENERGY_CORE', 'LASER_TURRET'];
      this.selectedDeck = ['ENERGY_CORE', 'LASER_TURRET'];
      this.upgrades = {};
      this.keys = { night: false, cloud: false };
    }
  }

  saveProfile() {
    try {
      const p = {
        maxLevel: this.maxLevel,
        chips: this.chips,
        unlockedUnits: this.unlockedUnits,
        selectedDeck: this.selectedDeck,
        upgrades: this.upgrades,
        keys: this.keys,
        email: this.currentAccount.email,
        name: this.currentAccount.name,
        avatar: this.currentAccount.avatar
      };
      localStorage.setItem('cyber_cuties_profile_v7', JSON.stringify(p));
    } catch (e) {
      console.warn("Local storage save error", e);
    }
  }

  initUI() {
    this.updateChipsUI();
    this.updateAccountBanner();
    this.renderLevelGrid(this.activeWorldTab);
    this.renderDeckCards();
  }

  updateAccountBanner() {
    const bName = document.getElementById('banner-user-name');
    const bAvatar = document.getElementById('banner-user-avatar');
    const bEmail = document.getElementById('banner-user-email');
    const hudName = document.getElementById('hud-user-name');
    const hudAvatar = document.getElementById('hud-user-avatar');

    if (bName) bName.innerText = this.currentAccount.name;
    if (bAvatar) bAvatar.innerText = this.currentAccount.avatar;
    if (bEmail) bEmail.innerText = this.currentAccount.email ? `🔮 Phong ấn: ${this.currentAccount.email}` : 'Chưa phong ấn email • Nhấn để lưu hồn phách';
    if (hudName) hudName.innerText = this.currentAccount.name.length > 8 ? this.currentAccount.name.slice(0, 8) + '..' : this.currentAccount.name;
    if (hudAvatar) hudAvatar.innerText = this.currentAccount.avatar;
  }

  updateChipsUI() {
    const menuEl = document.getElementById('menu-chips-count');
    const labEl = document.getElementById('lab-chips-count');
    if (menuEl) menuEl.innerText = this.chips;
    if (labEl) labEl.innerText = this.chips;

    const nKey = document.getElementById('night-key-badge');
    const cKey = document.getElementById('cloud-key-badge');
    if (nKey) {
      nKey.innerText = this.keys.night ? 'ĐÃ KHAI MỞ ✨' : 'PHONG ẤN';
      nKey.className = this.keys.night ? 'unlocked-badge' : 'locked-badge';
    }
    if (cKey) {
      cKey.innerText = this.keys.cloud ? 'ĐÃ KHAI MỞ ✨' : 'PHONG ẤN';
      cKey.className = this.keys.cloud ? 'unlocked-badge' : 'locked-badge';
    }
  }

  initEventListeners() {
    // Start game button -> opens seed selection modal
    document.getElementById('btn-start-game').addEventListener('click', () => {
      this.openSeedSelectionModal();
    });

    // Seed Selection Modal buttons
    document.getElementById('btn-start-battle').addEventListener('click', () => {
      this.startLevel(this.currentLevel);
      document.getElementById('seed-modal').classList.add('hidden');
    });
    document.getElementById('btn-close-seed-modal').addEventListener('click', () => {
      document.getElementById('seed-modal').classList.add('hidden');
      document.getElementById('start-modal').classList.remove('hidden');
    });
    document.getElementById('btn-auto-select-deck').addEventListener('click', () => {
      this.autoSelectDeck();
    });

    // World Selection Tabs
    document.querySelectorAll('.world-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const w = e.currentTarget.getAttribute('data-world');
        if (w === 'night' && !this.keys.night) {
          alert('🗝️ Cửa Ải Đã Phong Ấn! Cần tiêu diệt Trùm Màn 10 để nhận Chìa Khóa Lâu Đài Dracula!');
          return;
        }
        if (w === 'cloud' && !this.keys.cloud) {
          alert('🔑 Cửa Ải Đã Phong Ấn! Cần tiêu diệt Trùm Màn 20 để nhận Chìa Khóa Địa Ngục!');
          return;
        }
        document.querySelectorAll('.world-tab').forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.activeWorldTab = w;
        this.renderLevelGrid(w);
      });
    });

    // TechLab Modal
    document.getElementById('btn-open-techlab').addEventListener('click', () => this.openTechLab());
    document.getElementById('tool-techlab').addEventListener('click', () => this.openTechLab());
    document.getElementById('btn-close-techlab').addEventListener('click', () => this.closeTechLab());
    document.getElementById('btn-close-techlab-ok').addEventListener('click', () => this.closeTechLab());
    document.getElementById('btn-end-techlab').addEventListener('click', () => {
      document.getElementById('end-modal').classList.add('hidden');
      this.openTechLab();
    });

    // How to play
    document.getElementById('btn-open-howtoplay').addEventListener('click', () => {
      document.getElementById('help-modal').classList.remove('hidden');
    });
    document.getElementById('btn-close-help').addEventListener('click', () => {
      document.getElementById('help-modal').classList.add('hidden');
    });
    document.getElementById('btn-help-ok').addEventListener('click', () => {
      document.getElementById('help-modal').classList.add('hidden');
    });

    // Tool Buttons
    document.getElementById('tool-shovel').addEventListener('click', () => this.toggleShovel());
    document.getElementById('tool-speed').addEventListener('click', () => this.toggleSpeed());
    document.getElementById('tool-sound').addEventListener('click', () => this.toggleSound());
    document.getElementById('tool-pause').addEventListener('click', () => this.togglePause());
    document.getElementById('tool-fullscreen').addEventListener('click', () => this.toggleFullscreen());
    document.getElementById('tool-map').addEventListener('click', () => this.openWorldMap());
    document.getElementById('tool-codex').addEventListener('click', () => this.openCodex());
    document.getElementById('tool-account').addEventListener('click', () => this.openAccountModal());
    document.getElementById('btn-open-account-banner').addEventListener('click', () => this.openAccountModal());

    // Account Modal Buttons
    document.getElementById('btn-close-account').addEventListener('click', () => {
      document.getElementById('account-modal').classList.add('hidden');
    });
    document.getElementById('btn-save-login-account').addEventListener('click', () => this.handleSaveLoginAccount());
    document.getElementById('btn-export-save').addEventListener('click', () => this.exportSaveData());
    document.getElementById('btn-import-save').addEventListener('click', () => this.importSaveData());
    document.getElementById('btn-logout-account').addEventListener('click', () => this.handleLogoutAccount());

    // Avatar picker
    document.querySelectorAll('.avatar-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.avatar-option').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.selectedAvatar = e.currentTarget.getAttribute('data-avatar');
      });
    });

    // Codex Tabs
    document.querySelectorAll('.codex-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        document.querySelectorAll('.codex-tab').forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.renderCodex(e.currentTarget.getAttribute('data-tab'));
      });
    });
    document.getElementById('btn-close-codex').addEventListener('click', () => {
      document.getElementById('codex-modal').classList.add('hidden');
    });

    // Victory / Defeat Modal Buttons
    document.getElementById('btn-replay').addEventListener('click', () => {
      document.getElementById('end-modal').classList.add('hidden');
      this.startLevel(this.currentLevel);
    });
    document.getElementById('btn-next-level').addEventListener('click', () => {
      document.getElementById('end-modal').classList.add('hidden');
      if (this.currentLevel < 40) {
        this.currentLevel++;
        this.openSeedSelectionModal();
      } else {
        this.openWorldMap();
      }
    });
    document.getElementById('btn-back-menu').addEventListener('click', () => {
      document.getElementById('end-modal').classList.add('hidden');
      this.openWorldMap();
    });

    // New Unit Unlock Reward modal
    document.getElementById('btn-unlock-ok').addEventListener('click', () => {
      document.getElementById('unlock-modal').classList.add('hidden');
      this.openSeedSelectionModal();
    });

    // Key Drop Modal
    document.getElementById('btn-key-modal-ok').addEventListener('click', () => {
      document.getElementById('key-modal').classList.add('hidden');
      this.openWorldMap();
    });

    // Canvas Mouse & Touch Input
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
    this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
    this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
    this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
  }

  resizeCanvas() {
    const wrapper = document.getElementById('canvas-wrapper');
    if (!wrapper) return;
    const w = wrapper.clientWidth;
    const h = wrapper.clientHeight;

    this.canvas.width = w;
    this.canvas.height = h;

    this.grid.cellW = Math.min(105, Math.max(68, Math.floor((w - 140) / 9)));
    this.grid.cellH = Math.min(105, Math.max(68, Math.floor((h - 50) / 5)));
    this.grid.startX = Math.max(50, Math.floor((w - this.grid.cols * this.grid.cellW) / 2));
    this.grid.startY = Math.max(20, Math.floor((h - this.grid.rows * this.grid.cellH) / 2) - 10);

    // Reposition living units
    this.units.forEach(u => {
      u.x = this.grid.startX + u.col * this.grid.cellW + this.grid.cellW / 2;
      u.y = this.grid.startY + u.row * this.grid.cellH + this.grid.cellH / 2;
    });
  }

  // ==========================================================================
  // LEVEL SELECTION & MAP
  // ==========================================================================
  renderLevelGrid(worldKey) {
    const gridEl = document.getElementById('levels-grid');
    const titleEl = document.getElementById('world-current-title');
    if (!gridEl) return;

    let start = 1, end = 10;
    if (worldKey === 'day') {
      start = 1; end = 10;
      if (titleEl) titleEl.innerText = 'CÁC CỬA ẢI - THẾ GIỚI 1: NGHĨA TRANG BÍ NGÔ MA ÁM 🎃';
    } else if (worldKey === 'night') {
      start = 11; end = 20;
      if (titleEl) titleEl.innerText = 'CÁC CỬA ẢI - THẾ GIỚI 2: LÂU ĐÀI DRACULA & RỪNG MA CÀ RỒNG 🏰';
    } else if (worldKey === 'cloud') {
      start = 21; end = 40;
      if (titleEl) titleEl.innerText = 'CÁC CỬA ẢI - THẾ GIỚI 3: ĐỊA NGỤC MÁU & HƯ VÔ HẮC ÁM 🩸';
    }

    gridEl.innerHTML = '';
    for (let lvl = start; lvl <= end; lvl++) {
      const btn = document.createElement('button');
      const isCompleted = lvl < this.maxLevel;
      const isCurrent = lvl === this.maxLevel;
      const isLocked = lvl > this.maxLevel;

      btn.className = `level-btn ${isCompleted ? 'completed' : isCurrent ? 'current' : 'locked'}`;
      btn.innerHTML = `
        <span class="lvl-num">MÀN ${lvl}</span>
        <span class="lvl-stars">${isCompleted ? '⭐⭐⭐' : isCurrent ? '🎃 CHƠI' : '🔒'}</span>
      `;

      if (!isLocked) {
        btn.addEventListener('click', () => {
          this.currentLevel = lvl;
          document.getElementById('start-modal').classList.add('hidden');
          this.openSeedSelectionModal();
        });
      }

      gridEl.appendChild(btn);
    }
  }

  openWorldMap() {
    this.isRunning = false;
    document.getElementById('start-modal').classList.remove('hidden');
    this.updateChipsUI();
    this.updateAccountBanner();
    this.renderLevelGrid(this.activeWorldTab);
  }

  // ==========================================================================
  // SEED SELECTION SCREEN
  // ==========================================================================
  openSeedSelectionModal() {
    document.getElementById('start-modal').classList.add('hidden');
    const modal = document.getElementById('seed-modal');
    modal.classList.remove('hidden');

    const lvlConfig = LEVEL_CONFIGS[this.currentLevel] || LEVEL_CONFIGS[1];
    document.getElementById('seed-modal-level-title').innerText = `${lvlConfig.title} - ${lvlConfig.worldName}`;

    this.renderSeedChosenDeck();
    this.renderSeedPool();
    this.renderSeedMonstersPreview(lvlConfig);
  }

  renderSeedChosenDeck() {
    const deckEl = document.getElementById('seed-chosen-deck');
    const countEl = document.getElementById('seed-selected-count');
    if (!deckEl) return;

    countEl.innerText = this.selectedDeck.length;
    deckEl.innerHTML = '';

    this.selectedDeck.forEach(type => {
      const u = UNIT_TYPES[type];
      if (!u) return;

      const card = document.createElement('div');
      card.className = 'unit-card';
      card.innerHTML = `
        <div class="card-avatar"><canvas id="chosen-cv-${u.id}" width="48" height="48"></canvas></div>
        <span class="card-cost">${u.cost}🎃</span>
      `;
      card.title = `Nhấn để gỡ bỏ ${u.vietName}`;

      card.addEventListener('click', () => {
        if (this.selectedDeck.length <= 1) {
          alert('Cần chọn tối thiểu 1 bé tháp để bảo vệ nghĩa trang!');
          return;
        }
        this.selectedDeck = this.selectedDeck.filter(t => t !== type);
        this.saveActiveAccount();
        this.renderSeedChosenDeck();
        this.renderSeedPool();
      });

      deckEl.appendChild(card);
    });

    setTimeout(() => {
      this.selectedDeck.forEach(type => {
        const cv = document.getElementById(`chosen-cv-${type}`);
        if (!cv) return;
        const cctx = cv.getContext('2d');
        cctx.clearRect(0, 0, 48, 48);
        const dummy = new TechUnit(type, 0, 0, { startX: 0, startY: 0, cellW: 48, cellH: 48 }, {});
        dummy.x = 24; dummy.y = 24;
        dummy.draw(cctx);
      });
    }, 40);
  }

  renderSeedPool() {
    const poolEl = document.getElementById('seed-pool-grid');
    if (!poolEl) return;
    poolEl.innerHTML = '';

    this.unlockedUnits.forEach(type => {
      const u = UNIT_TYPES[type];
      if (!u) return;
      const isSelected = this.selectedDeck.includes(type);

      const card = document.createElement('div');
      card.className = `unit-card ${isSelected ? 'disabled' : ''}`;
      card.innerHTML = `
        <div class="card-avatar"><canvas id="pool-cv-${u.id}" width="48" height="48"></canvas></div>
        <span class="card-cost">${u.cost}🎃</span>
      `;
      card.title = `${u.vietName} - ${u.role}`;

      card.addEventListener('click', () => {
        if (isSelected) {
          this.selectedDeck = this.selectedDeck.filter(t => t !== type);
        } else {
          if (this.selectedDeck.length >= 8) {
            alert('Đội hình tối đa 8 bé tháp ma thuật! Hãy gỡ bớt 1 bé ra trước.');
            return;
          }
          this.selectedDeck.push(type);
        }
        this.saveActiveAccount();
        this.renderSeedChosenDeck();
        this.renderSeedPool();
      });

      poolEl.appendChild(card);
    });

    setTimeout(() => {
      this.unlockedUnits.forEach(type => {
        const cv = document.getElementById(`pool-cv-${type}`);
        if (!cv) return;
        const cctx = cv.getContext('2d');
        cctx.clearRect(0, 0, 48, 48);
        const dummy = new TechUnit(type, 0, 0, { startX: 0, startY: 0, cellW: 48, cellH: 48 }, {});
        dummy.x = 24; dummy.y = 24;
        dummy.draw(cctx);
      });
    }, 40);
  }

  renderSeedMonstersPreview(lvlConfig) {
    const listEl = document.getElementById('seed-monsters-list');
    if (!listEl) return;

    const monsterTypes = new Set();
    lvlConfig.waves.forEach(w => {
      w.enemies.forEach(g => monsterTypes.add(g.type));
    });

    listEl.innerHTML = '';
    monsterTypes.forEach(mType => {
      const v = VIRUS_TYPES[mType];
      if (!v) return;

      const item = document.createElement('div');
      item.className = 'seed-monster-item';
      item.innerHTML = `
        <div class="m-avatar"><canvas id="m-preview-${v.id}" width="42" height="42"></canvas></div>
        <div class="m-info">
          <strong style="color: ${v.color}; font-size: 12px;">${v.vietName}</strong>
          <span style="display: block; font-size: 10px; color: #d8b4e2;">${v.desc}</span>
        </div>
      `;
      listEl.appendChild(item);
    });

    setTimeout(() => {
      monsterTypes.forEach(mType => {
        const cv = document.getElementById(`m-preview-${mType}`);
        if (!cv) return;
        const cctx = cv.getContext('2d');
        cctx.clearRect(0, 0, 42, 42);
        const dummy = new VirusEnemy(mType, 0, { startX: 0, startY: 0, cellW: 42, cellH: 42, cols: 0 });
        dummy.x = 21; dummy.y = 21;
        dummy.draw(cctx);
      });
    }, 50);
  }

  autoSelectDeck() {
    const defaultPriority = [
      'ENERGY_CORE', 'LASER_TURRET', 'NANO_SHIELD', 'GATLING_PEA_CAT',
      'CRYO_TURRET', 'EMP_BOMB', 'RAILGUN_CANNON', 'TESLA_COIL'
    ];
    this.selectedDeck = this.unlockedUnits.slice(0, 8);
    this.saveActiveAccount();
    this.renderSeedChosenDeck();
    this.renderSeedPool();
  }

  // ==========================================================================
  // IN-GAME CARD DECK
  // ==========================================================================
  renderDeckCards() {
    const deckEl = document.getElementById('card-deck');
    if (!deckEl) return;
    deckEl.innerHTML = '';

    this.selectedDeck.forEach(type => {
      const u = UNIT_TYPES[type];
      if (!u) return;

      const isCooldown = (this.unitCooldowns[type] || 0) > 0;
      const isDisabled = this.energy < u.cost;

      const card = document.createElement('div');
      card.className = `unit-card ${isDisabled ? 'disabled' : ''} ${isCooldown ? 'cooldown' : ''}`;
      card.id = `deck-card-${type}`;
      card.innerHTML = `
        <div class="card-avatar"><canvas id="card-cv-${u.id}" width="48" height="48"></canvas></div>
        <span class="card-cost">${u.cost}🎃</span>
        <div class="card-cooldown-overlay ${isCooldown ? '' : 'hidden'}" id="cd-${u.id}">${isCooldown ? Math.ceil(this.unitCooldowns[type]) : ''}</div>
      `;
      card.title = `${u.vietName} (${u.cost}🎃) - ${u.role}`;

      card.addEventListener('click', () => {
        if (this.unitCooldowns[type] > 0 || this.energy < u.cost) return;
        this.selectUnitType(type);
      });

      deckEl.appendChild(card);
    });

    setTimeout(() => {
      this.selectedDeck.forEach(type => {
        const cv = document.getElementById(`card-cv-${type}`);
        if (!cv) return;
        const cctx = cv.getContext('2d');
        cctx.clearRect(0, 0, 48, 48);
        const dummy = new TechUnit(type, 0, 0, { startX: 0, startY: 0, cellW: 48, cellH: 48 }, {});
        dummy.x = 24; dummy.y = 24;
        dummy.draw(cctx);
      });
    }, 50);
  }

  selectUnitType(type) {
    this.isShovelActive = false;
    document.getElementById('tool-shovel').classList.remove('active');
    this.canvas.classList.remove('shovel-active');

    if (this.selectedUnitType === type) {
      this.selectedUnitType = null;
      this.canvas.classList.remove('placing-unit');
    } else {
      this.selectedUnitType = type;
      this.canvas.classList.add('placing-unit');
    }
    this.updateCardSelectionState();
  }

  updateCardSelectionState() {
    this.selectedDeck.forEach(type => {
      const card = document.getElementById(`deck-card-${type}`);
      if (!card) return;
      if (this.selectedUnitType === type) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }

  // ==========================================================================
  // GAME START & LEVEL MANAGEMENT
  // ==========================================================================
  startLevel(lvlNumber) {
    const config = LEVEL_CONFIGS[lvlNumber] || LEVEL_CONFIGS[1];
    this.currentLevel = lvlNumber;
    this.energy = config.initialEnergy;
    this.score = 0;
    this.kills = 0;
    this.chipsEarnedThisRun = 0;
    this.waveIndex = 0;
    this.totalWaves = config.waves.length;
    this.waveTimer = 0;
    this.waveSpawned = false;
    this.spawnQueue = [];

    this.units = [];
    this.viruses = [];
    this.projectiles = [];
    this.energyOrbs = [];
    this.scanners = [];
    this.particles = [];
    this.floatingTexts = [];
    this.unitCooldowns = {};

    // Initialize 5 Firewall Scanners
    for (let r = 0; r < this.grid.rows; r++) {
      this.scanners.push(new FirewallScanner(r, this.grid));
    }

    this.isShovelActive = false;
    this.selectedUnitType = null;
    this.isRunning = true;
    this.isPaused = false;
    this.skyEnergyTimer = 0;

    this.updateEnergyHUD();
    this.renderDeckCards();
    this.updateWaveHUD();

    document.getElementById('start-modal').classList.add('hidden');
    document.getElementById('end-modal').classList.add('hidden');

    window.cyberAudio.startBGM();
    this.showAlert(`ĐÊM ${lvlNumber}: ${config.title}`, 'BINH ĐOÀN XÁC SỐNG ĐANG TRÀN ĐẾN!');
  }

  updateEnergyHUD() {
    const el = document.getElementById('energy-count');
    if (el) el.innerText = this.energy;

    // Update disabled state for cards
    this.selectedDeck.forEach(type => {
      const card = document.getElementById(`deck-card-${type}`);
      const config = UNIT_TYPES[type];
      if (card && config) {
        if (this.energy < config.cost) {
          card.classList.add('disabled');
        } else {
          card.classList.remove('disabled');
        }
      }
    });
  }

  updateWaveHUD() {
    const titleEl = document.getElementById('level-title');
    const statusEl = document.getElementById('wave-status');
    const barEl = document.getElementById('wave-progress-bar');
    const config = LEVEL_CONFIGS[this.currentLevel] || LEVEL_CONFIGS[1];

    if (titleEl) titleEl.innerText = `${config.worldName} - MÀN ${this.currentLevel}`;
    if (statusEl) statusEl.innerText = `ĐỢT QUÁI ${Math.min(this.waveIndex + 1, this.totalWaves)} / ${this.totalWaves}`;
    if (barEl) {
      const pct = (this.waveIndex / Math.max(1, this.totalWaves)) * 100;
      barEl.style.width = `${pct}%`;
    }
  }

  showAlert(title, subtitle) {
    const alertBox = document.getElementById('cyber-alert');
    const titleEl = document.getElementById('alert-glitch-text');
    const subEl = document.getElementById('alert-sub-text');
    if (!alertBox) return;

    if (titleEl) titleEl.innerText = title;
    if (subEl) subEl.innerText = subtitle;
    alertBox.classList.remove('hidden');

    setTimeout(() => {
      alertBox.classList.add('hidden');
    }, 2800);
  }

  // ==========================================================================
  // GAME LOOP & UPDATES
  // ==========================================================================
  gameLoop(currentTime) {
    const rawDt = Math.min(0.1, (currentTime - this.lastTime) / 1000);
    this.lastTime = currentTime;

    if (this.isRunning && !this.isPaused) {
      const dt = rawDt * this.gameSpeed;
      this.gameTime += dt;
      this.update(dt);
    }

    this.draw();
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  update(dt) {
    const lvlConfig = LEVEL_CONFIGS[this.currentLevel] || LEVEL_CONFIGS[1];

    // Sky Energy Drops
    if (lvlConfig.hasSkyEnergy) {
      this.skyEnergyTimer += dt;
      if (this.skyEnergyTimer >= lvlConfig.skyEnergyInterval) {
        this.skyEnergyTimer = 0;
        const dropX = this.grid.startX + Math.random() * (this.grid.cols * this.grid.cellW);
        const targetY = this.grid.startY + Math.random() * (this.grid.rows * this.grid.cellH);
        this.spawnEnergyOrb(dropX, -30, 25, true, targetY);
      }
    }

    // Waves & Spawning
    if (this.waveIndex < this.totalWaves) {
      const wave = lvlConfig.waves[this.waveIndex];
      this.waveTimer += dt;

      if (!this.waveSpawned) {
        if (this.waveTimer >= wave.delay) {
          wave.enemies.forEach(group => {
            for (let i = 0; i < group.count; i++) {
              this.spawnQueue.push({
                type: group.type,
                time: i * group.interval + Math.random() * 0.8
              });
            }
          });
          this.waveSpawned = true;
          this.updateWaveHUD();

          if (this.waveIndex === this.totalWaves - 1) {
            this.showAlert('ĐỢT QUÁI CUỐI CÙNG!', 'TẬP TRUNG TOÀN LỰC PHÒNG THỦ!');
          }
        }
      } else {
        // Current wave has been queued. When all monsters in queue and on field are defeated:
        if (this.spawnQueue.length === 0 && this.viruses.length === 0) {
          this.waveIndex++;
          this.waveSpawned = false;
          this.waveTimer = 0;
          this.updateWaveHUD();

          if (this.waveIndex >= this.totalWaves) {
            this.triggerVictory();
            return;
          }
        }
      }
    }

    // Process Spawn Queue
    for (let i = this.spawnQueue.length - 1; i >= 0; i--) {
      this.spawnQueue[i].time -= dt;
      if (this.spawnQueue[i].time <= 0) {
        const item = this.spawnQueue[i];
        const randomRow = Math.floor(Math.random() * this.grid.rows);
        this.viruses.push(new VirusEnemy(item.type, randomRow, this.grid));
        this.spawnQueue.splice(i, 1);
      }
    }

    // Update Cooldowns
    Object.keys(this.unitCooldowns).forEach(type => {
      if (this.unitCooldowns[type] > 0) {
        this.unitCooldowns[type] -= dt;
        const cdOverlay = document.getElementById(`cd-${type}`);
        const card = document.getElementById(`deck-card-${type}`);
        if (this.unitCooldowns[type] <= 0) {
          this.unitCooldowns[type] = 0;
          if (cdOverlay) {
            cdOverlay.classList.add('hidden');
            cdOverlay.innerText = '';
          }
          if (card) {
            card.classList.remove('cooldown');
            card.classList.add('ready-flash');
            setTimeout(() => {
              if (card) card.classList.remove('ready-flash');
            }, 450);
          }
        } else {
          if (cdOverlay) {
            cdOverlay.classList.remove('hidden');
            cdOverlay.innerText = Math.ceil(this.unitCooldowns[type]);
          }
          if (card && !card.classList.contains('cooldown')) {
            card.classList.add('cooldown');
          }
        }
      }
    });

    // Update Entities
    this.units = this.units.filter(u => !u.update(dt, this));
    this.viruses = this.viruses.filter(v => !v.update(dt, this));
    this.projectiles = this.projectiles.filter(p => !p.update(dt, this));

    // Update Energy Orbs
    for (let i = this.energyOrbs.length - 1; i >= 0; i--) {
      if (this.energyOrbs[i].update(dt, this)) {
        this.energyOrbs.splice(i, 1);
      }
    }

    // Update Scanners & Breach Detection
    this.scanners.forEach(s => s.update(dt, this));
    this.viruses.forEach(v => {
      if (v.x < this.grid.startX - 30 && v.hp > 0) {
        const scanner = this.scanners[v.row];
        if (scanner && !scanner.triggered) {
          scanner.trigger();
        } else if (!scanner || scanner.triggered) {
          this.triggerGameOver();
        }
      }
    });

    // Particles & Floating Text
    this.particles = this.particles.filter(p => !p.update(dt));
    this.floatingTexts = this.floatingTexts.filter(ft => !ft.update(dt));

    // Background floating wisps drift
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
    this.spawnFloatingText(60, 60, `+${amount}🎃`, '#ff9e00');
  }

  onVirusKilled(virus) {
    this.kills++;
    this.score += virus.config.score;

    const chipsEarned = virus.config.isSuperBoss ? 60 : virus.config.isBoss ? 25 : Math.random() < 0.35 ? 3 : 1;
    this.chips += chipsEarned;
    this.chipsEarnedThisRun += chipsEarned;
    this.updateChipsUI();

    this.spawnGlitchParticles(virus.x, virus.y, virus.config.color || '#ff0054');
    this.spawnFloatingText(virus.x, virus.y - 20, `+${virus.config.score}`, '#39ff14');

    // QUAN TRỌNG: Khi bắn quái chết KHÔNG rơi ra mặt trời / linh hồn theo yêu cầu người dùng!
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
      this.particles.push(new Particle(blastX, blastY, Math.cos(angle) * speed, Math.sin(angle) * speed, '#ff0054', 0.8, 6));
    }
  }

  spawnLaserSpark(x, y, color = '#ff7700') {
    for (let i = 0; i < 6; i++) {
      const vx = (Math.random() - 0.5) * 120;
      const vy = (Math.random() - 0.5) * 120;
      this.particles.push(new Particle(x, y, vx, vy, color, 0.3, 3.5));
    }
  }

  spawnGlitchParticles(x, y, color = '#c77dff') {
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
  // USER INPUT & MOUSE / TOUCH HANDLING
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

    // Emit subtle cute Halloween glowing sparks following the cursor
    if (Math.random() < 0.25) {
      const sparkColor = ['#ffaa00', '#c77dff', '#39ff14', '#ff0054', '#00f5d4'][Math.floor(Math.random() * 5)];
      this.particles.push(new Particle(x + (Math.random() * 8 - 4), y + (Math.random() * 8 - 4), (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, sparkColor, 0.4, 2.5));
    }

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

    // Collect Energy Orbs
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
          this.spawnGlitchParticles(existingUnit.x, existingUnit.y, '#ff0054');
          this.isShovelActive = false;
          document.getElementById('tool-shovel').classList.remove('active');
          this.canvas.classList.remove('shovel-active');
        }
        return;
      }

      if (this.selectedUnitType && !existingUnit) {
        const config = UNIT_TYPES[this.selectedUnitType];
        if (this.energy >= config.cost) {
          this.energy -= config.cost;
          this.updateEnergyHUD();

          this.units.push(new TechUnit(this.selectedUnitType, col, row, this.grid, this.upgrades));
          this.unitCooldowns[this.selectedUnitType] = config.cooldown;
          
          const cdOverlay = document.getElementById(`cd-${this.selectedUnitType}`);
          const card = document.getElementById(`deck-card-${this.selectedUnitType}`);
          if (cdOverlay) {
            cdOverlay.classList.remove('hidden');
            cdOverlay.innerText = Math.ceil(config.cooldown);
          }
          if (card) {
            card.classList.add('cooldown');
          }

          window.cyberAudio.playPlaceUnit();
          this.spawnLaserSpark(this.grid.startX + col * this.grid.cellW + this.grid.cellW / 2, this.grid.startY + row * this.grid.cellH + this.grid.cellH / 2, '#ffaa00');

          this.selectedUnitType = null;
          this.canvas.classList.remove('placing-unit');
          this.updateCardSelectionState();
        }
      }
    }
  }

  handleTouchStart(e) {
    e.preventDefault();
    if (e.touches.length > 0) {
      const t = e.touches[0];
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      this.processPointerMove((t.clientX - rect.left) * scaleX, (t.clientY - rect.top) * scaleY);
    }
  }

  handleTouchMove(e) {
    e.preventDefault();
    if (e.touches.length > 0) {
      const t = e.touches[0];
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;
      this.processPointerMove((t.clientX - rect.left) * scaleX, (t.clientY - rect.top) * scaleY);
    }
  }

  handleTouchEnd(e) {
    e.preventDefault();
    if (this.mousePos.x && this.mousePos.y) {
      this.processPointerClick(this.mousePos.x, this.mousePos.y);
    }
  }

  // ==========================================================================
  // VICTORY & GAME OVER
  // ==========================================================================
  triggerVictory() {
    this.isRunning = false;
    window.cyberAudio.playVictory();

    const lvlConfig = LEVEL_CONFIGS[this.currentLevel] || LEVEL_CONFIGS[1];
    const chipsReward = 50 + this.currentLevel * 10;
    this.chips += chipsReward;

    // Check unlocks & Keys
    let rewardedPlant = null;
    if (this.currentLevel >= this.maxLevel) {
      this.maxLevel = this.currentLevel + 1;

      const newUnitId = LEVEL_UNLOCK_REWARDS[this.currentLevel];
      if (newUnitId && !this.unlockedUnits.includes(newUnitId)) {
        this.unlockedUnits.push(newUnitId);
        if (this.selectedDeck.length < 8) {
          this.selectedDeck.push(newUnitId);
        }
        rewardedPlant = newUnitId;
      }

      if (this.currentLevel === 10) this.keys.night = true;
      if (this.currentLevel === 20) this.keys.cloud = true;
    }

    this.saveActiveAccount();
    this.updateChipsUI();

    // Key dropped modal
    if (this.currentLevel === 10 && !localStorage.getItem('saw_key_10')) {
      localStorage.setItem('saw_key_10', 'true');
      document.getElementById('key-modal-icon').innerText = '🗝️';
      document.getElementById('key-modal-title').innerText = 'NHẬN ĐƯỢC CHÌA KHÓA LÂU ĐÀI DRACULA!';
      document.getElementById('key-modal-desc').innerText = 'Bạn vừa đánh bại Trùm Vua Xác Sống và nhận được Chìa Khóa mở cánh cổng tiến vào Thế Giới 2: Lâu Đài Dracula!';
      document.getElementById('key-modal').classList.remove('hidden');
      return;
    }

    if (this.currentLevel === 20 && !localStorage.getItem('saw_key_20')) {
      localStorage.setItem('saw_key_20', 'true');
      document.getElementById('key-modal-icon').innerText = '🔑';
      document.getElementById('key-modal-title').innerText = 'NHẬN ĐƯỢC CHÌA KHÓA ĐỊA NGỤC HƯ VÔ!';
      document.getElementById('key-modal-desc').innerText = 'Bạn vừa đánh bại Bá Tước Dracula và nhận được Chìa Khóa mở cánh cổng tiến vào Thế Giới 3: Địa Ngục Máu & Hư Vô Hắc Ám!';
      document.getElementById('key-modal').classList.remove('hidden');
      return;
    }

    // New Plant Unlocked Reward Modal
    if (rewardedPlant) {
      const u = UNIT_TYPES[rewardedPlant];
      document.getElementById('unlock-unit-name').innerText = `${u.vietName} (${u.name})`;
      document.getElementById('unlock-unit-stats').innerText = `Linh Hồn: ${u.cost}🎃 | Hồi chiêu: ${u.cooldown}s`;
      document.getElementById('unlock-unit-desc').innerText = u.desc;

      const cv = document.getElementById('unlock-canvas');
      if (cv) {
        const cctx = cv.getContext('2d');
        cctx.clearRect(0, 0, 90, 90);
        const dummy = new TechUnit(u.id, 0, 0, { startX: 0, startY: 0, cellW: 90, cellH: 90 }, {});
        dummy.x = 45; dummy.y = 45;
        dummy.draw(cctx);
      }

      document.getElementById('unlock-modal').classList.remove('hidden');
      return;
    }

    // Standard Victory Modal
    const endModal = document.getElementById('end-modal');
    document.getElementById('end-status-icon').innerText = '🎃';
    document.getElementById('end-title').innerText = 'CHIẾN THẮNG HUY HOÀNG!';
    document.getElementById('end-message').innerText = `Đã phong ấn thành công cửa ải ${this.currentLevel} và bảo vệ an toàn cho Vườn Ma Bí Ngô!`;
    document.getElementById('stat-kills').innerText = this.kills;
    document.getElementById('stat-energy').innerText = this.energy;
    document.getElementById('stat-chips').innerText = `+${chipsReward + this.chipsEarnedThisRun} 🍬`;
    document.getElementById('stat-score').innerText = this.score;

    document.getElementById('btn-next-level').style.display = this.currentLevel >= 40 ? 'none' : 'inline-flex';
    endModal.classList.remove('hidden');
  }

  triggerGameOver() {
    this.isRunning = false;
    window.cyberAudio.playDefeat();

    const endModal = document.getElementById('end-modal');
    document.getElementById('end-status-icon').innerText = '💀';
    document.getElementById('end-title').innerText = 'PHÒNG TUYẾN ĐÃ THẤT THỦ!';
    document.getElementById('end-message').innerText = 'Binh đoàn xác sống đã tràn qua hàng rào nghĩa trang! Hãy triệu hồi lại đội hình tháp ma thuật!';
    document.getElementById('stat-kills').innerText = this.kills;
    document.getElementById('stat-energy').innerText = this.energy;
    document.getElementById('stat-chips').innerText = `+${this.chipsEarnedThisRun} 🍬`;
    document.getElementById('stat-score').innerText = this.score;

    document.getElementById('btn-next-level').style.display = 'none';
    endModal.classList.remove('hidden');
  }

  // ==========================================================================
  // DRAWING & CANVAS RENDERING
  // ==========================================================================
  draw() {
    const { width, height } = this.canvas;
    const ctx = this.ctx;
    const lvlConfig = LEVEL_CONFIGS[this.currentLevel] || LEVEL_CONFIGS[1];
    const world = lvlConfig.world || 'day';

    ctx.clearRect(0, 0, width, height);

    // 1. Spooky Animated Halloween Background
    this.drawEnvironmentBackground(ctx, world);

    // 2. Graveyard Lawn Tiles
    this.drawCyberGrid(ctx, world);

    // 3. Grid Cursor Preview Frame
    if (this.mouseGrid.col >= 0 && this.mouseGrid.row >= 0) {
      this.drawGridCursor(ctx);
    }

    // 4. Entities
    this.scanners.forEach(s => s.draw(ctx));
    this.units.forEach(u => u.draw(ctx));
    this.viruses.forEach(v => v.draw(ctx));
    this.projectiles.forEach(p => p.draw(ctx));
    this.energyOrbs.forEach(orb => orb.draw(ctx));
    this.particles.forEach(p => p.draw(ctx));
    this.floatingTexts.forEach(ft => ft.draw(ctx));
  }

  drawEnvironmentBackground(ctx, world) {
    const { width, height } = this.canvas;

    // Use high-definition 2D hand-crafted battlefield backgrounds if available
    if (window.gameAssets && window.gameAssets.drawBattlefieldBackground(ctx, width, height, world)) {
      // Add subtle atmospheric vignette
      const vig = ctx.createRadialGradient(width / 2, height / 2, width * 0.25, width / 2, height / 2, width * 0.7);
      vig.addColorStop(0, 'rgba(0,0,0,0)');
      vig.addColorStop(1, 'rgba(10, 3, 20, 0.55)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, width, height);
      return;
    }

    if (world === 'day') {
      // World 1: Foggy Haunted Graveyard with Jack-o'-Lanterns
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#0d0518');
      grad.addColorStop(0.5, '#1a0933');
      grad.addColorStop(1, '#080310');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Glowing Full Moon
      ctx.save();
      ctx.fillStyle = '#ffaa00';
      ctx.shadowColor = '#ff7700';
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.arc(width - 120, 75, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Crooked Dead Tree silhouettes
      ctx.fillStyle = 'rgba(10, 4, 18, 0.85)';
      ctx.beginPath();
      ctx.moveTo(30, height); ctx.lineTo(45, height - 120); ctx.lineTo(60, height - 160);
      ctx.lineTo(85, height - 180); ctx.lineTo(55, height - 150); ctx.lineTo(15, height - 170);
      ctx.lineTo(45, height - 110); ctx.lineTo(60, height);
      ctx.closePath();
      ctx.fill();

      // Tombstones in background
      for (let i = 0; i < 6; i++) {
        const tx = 40 + i * (width / 5.5);
        ctx.fillStyle = 'rgba(28, 12, 45, 0.8)';
        ctx.beginPath();
        ctx.roundRect(tx, height - 55, 32, 45, [12, 12, 0, 0]);
        ctx.fill();
        ctx.fillStyle = 'rgba(255, 119, 0, 0.4)';
        ctx.fillRect(tx + 14, height - 46, 4, 16);
        ctx.fillRect(tx + 8, height - 40, 16, 4);
      }

    } else if (world === 'night') {
      // World 2: Dracula's Vampire Gothic Castle with Blood Moon
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#2b0018');
      grad.addColorStop(0.5, '#150020');
      grad.addColorStop(1, '#08000d');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Blood Crimson Moon
      ctx.save();
      ctx.fillStyle = '#ff0054';
      ctx.shadowColor = '#c9184a';
      ctx.shadowBlur = 30;
      ctx.beginPath();
      ctx.arc(width - 130, 80, 36, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Gothic Castle Spires silhouette
      ctx.fillStyle = 'rgba(14, 0, 24, 0.9)';
      for (let s = 0; s < 7; s++) {
        const sx = s * (width / 6);
        ctx.beginPath();
        ctx.moveTo(sx, height);
        ctx.lineTo(sx + 25, height - 140 - (s % 3) * 30);
        ctx.lineTo(sx + 50, height);
        ctx.fill();
      }

    } else if (world === 'cloud') {
      // World 3: Blood Abyss & Nether Void
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#38040e');
      grad.addColorStop(0.4, '#1f0030');
      grad.addColorStop(1, '#0a0012');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Swirling Void Vortex
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 0, 84, 0.25)';
      ctx.lineWidth = 4;
      for (let r = 50; r < 280; r += 35) {
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, r, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Floating Spooky Wisps / Bats
    this.clouds.forEach(c => {
      ctx.fillStyle = c.color;
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.w / 2, c.h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  drawCyberGrid(ctx, world) {
    const { startX, startY, cellW, cellH, rows, cols } = this.grid;
    const has2D = window.gameAssets && window.gameAssets.loaded;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = startX + c * cellW;
        const y = startY + r * cellH;
        const isEven = (r + c) % 2 === 0;

        if (has2D) {
          ctx.fillStyle = isEven ? 'rgba(38, 14, 60, 0.40)' : 'rgba(18, 6, 28, 0.50)';
          ctx.strokeStyle = isEven ? 'rgba(255, 119, 0, 0.25)' : 'rgba(157, 78, 221, 0.25)';
          ctx.lineWidth = 1;
        } else {
          if (world === 'day') {
            ctx.fillStyle = isEven ? 'rgba(38, 14, 60, 0.85)' : 'rgba(24, 8, 42, 0.9)';
          } else if (world === 'night') {
            ctx.fillStyle = isEven ? 'rgba(48, 10, 48, 0.85)' : 'rgba(28, 4, 30, 0.9)';
          } else {
            ctx.fillStyle = isEven ? 'rgba(45, 12, 60, 0.88)' : 'rgba(26, 6, 38, 0.92)';
          }
        }

        ctx.beginPath();
        ctx.roundRect(x + 2, y + 2, cellW - 4, cellH - 4, 12);
        ctx.fill();
        if (has2D) ctx.stroke();

        // Glowing runic dots on corners
        if ((r * cols + c) % 4 === 0) {
          ctx.fillStyle = '#ff7700';
          ctx.beginPath();
          ctx.arc(x + 12, y + 12, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Boundary Line
    ctx.strokeStyle = '#ff7700';
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
      ctx.fillStyle = 'rgba(255, 0, 84, 0.25)';
      ctx.beginPath();
      ctx.roundRect(x + 2, y + 2, cellW - 4, cellH - 4, 14);
      ctx.fill();

      ctx.strokeStyle = '#ff0054';
      ctx.lineWidth = 2.8;
      ctx.stroke();

      ctx.fillStyle = '#ff0054';
      ctx.font = '700 13px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(existing ? '🧹 THU HỒI' : '🧹 CHỌN Ô', x + cellW / 2, y + cellH - 12);

    } else if (this.selectedUnitType) {
      if (existing) {
        ctx.fillStyle = 'rgba(255, 0, 84, 0.25)';
        ctx.beginPath();
        ctx.roundRect(x + 2, y + 2, cellW - 4, cellH - 4, 14);
        ctx.fill();

        ctx.strokeStyle = '#ff0054';
        ctx.lineWidth = 2.8;
        ctx.stroke();

        ctx.fillStyle = '#ff0054';
        ctx.font = '700 12px Fredoka, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('✖ ĐÃ CÓ BÉ THÁP', x + cellW / 2, y + cellH / 2);

      } else {
        const pulse = Math.sin(this.gameTime * 6) * 0.08 + 0.25;
        ctx.fillStyle = `rgba(255, 119, 0, ${pulse})`;
        ctx.beginPath();
        ctx.roundRect(x + 2, y + 2, cellW - 4, cellH - 4, 14);
        ctx.fill();

        ctx.strokeStyle = '#ff9e00';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#ff7700';
        ctx.shadowBlur = 14;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Pumpkin corner markers
        ctx.fillStyle = '#ffea00';
        ctx.beginPath();
        ctx.arc(x + 10, y + 10, 4, 0, Math.PI * 2);
        ctx.arc(x + cellW - 10, y + 10, 4, 0, Math.PI * 2);
        ctx.arc(x + 10, y + cellH - 10, 4, 0, Math.PI * 2);
        ctx.arc(x + cellW - 10, y + cellH - 10, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#fdf0d5';
        ctx.font = '700 12px Fredoka, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🎃 TRIỆU HỒI', x + cellW / 2, y + cellH - 12);
      }
    } else {
      ctx.fillStyle = 'rgba(255, 158, 0, 0.12)';
      ctx.beginPath();
      ctx.roundRect(x + 2, y + 2, cellW - 4, cellH - 4, 14);
      ctx.fill();
    }

    ctx.restore();
  }

  // ==========================================================================
  // TECH LAB & CODEX
  // ==========================================================================
  openTechLab() {
    this.renderTechLab();
    document.getElementById('techlab-modal').classList.remove('hidden');
  }

  closeTechLab() {
    document.getElementById('techlab-modal').classList.add('hidden');
  }

  renderTechLab() {
    const container = document.getElementById('upgrades-container');
    if (!container) return;
    this.updateChipsUI();

    const items = Object.values(UPGRADE_DATA).map(u => {
      const isBought = !!this.upgrades[u.id];
      const canAfford = this.chips >= u.cost;

      return `
        <div class="upgrade-card ${isBought ? 'maxed' : !canAfford ? 'cant-afford' : ''}">
          <div class="upgrade-header">
            <span class="upgrade-icon">${u.icon}</span>
            <div class="upgrade-title">${u.name}</div>
          </div>
          <div class="upgrade-desc">${u.desc}</div>
          <div class="upgrade-footer">
            <span class="upgrade-cost">${u.cost} 🍬</span>
            <button 
              class="cyber-btn small ${isBought ? 'secondary' : canAfford ? 'primary' : 'danger'}" 
              data-upgrade="${u.id}"
              ${isBought || !canAfford ? 'disabled' : ''}
            >
              ${isBought ? '✓ ĐÃ PHONG ẤN' : 'PHÙ PHÉP'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = items;

    container.querySelectorAll('.cyber-btn[data-upgrade]:not([disabled])').forEach(btn => {
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
    this.saveActiveAccount();
    this.updateChipsUI();
    this.renderTechLab();
    window.cyberAudio.playUpgradeSuccess();
  }

  openCodex() {
    this.renderCodex('units');
    document.getElementById('codex-modal').classList.remove('hidden');
  }

  renderCodex(tabKey) {
    const body = document.getElementById('codex-body');
    if (!body) return;

    if (tabKey === 'units') {
      const items = Object.values(UNIT_TYPES).map(u => `
        <div class="codex-entry">
          <div class="codex-avatar-box">
            <canvas id="cv-unit-${u.id}" width="50" height="50"></canvas>
          </div>
          <div class="codex-info">
            <strong style="color: #ffaa00; font-size: 13px;">${u.vietName}</strong>
            <span style="display: block; font-size: 11px; color: #39ff14;">${u.role} | Chi phí: ${u.cost}🎃</span>
            <span style="display: block; font-size: 10px; color: #d8b4e2; margin-top: 2px;">${u.desc}</span>
          </div>
        </div>
      `).join('');
      body.innerHTML = items;

      setTimeout(() => {
        Object.values(UNIT_TYPES).forEach(u => {
          const cv = document.getElementById(`cv-unit-${u.id}`);
          if (!cv) return;
          const cctx = cv.getContext('2d');
          cctx.clearRect(0, 0, 50, 50);
          const dummy = new TechUnit(u.id, 0, 0, { startX: 0, startY: 0, cellW: 50, cellH: 50 }, {});
          dummy.x = 25; dummy.y = 25;
          dummy.draw(cctx);
        });
      }, 50);

    } else {
      const items = Object.values(VIRUS_TYPES).map(v => `
        <div class="codex-entry">
          <div class="codex-avatar-box">
            <canvas id="cv-virus-${v.id}" width="50" height="50"></canvas>
          </div>
          <div class="codex-info">
            <strong style="color: ${v.color}; font-size: 13px;">${v.vietName}</strong>
            <span style="display: block; font-size: 11px; color: #ff0054;">Máu: ${v.hp} HP | Tốc độ: ${v.speed}</span>
            <span style="display: block; font-size: 10px; color: #d8b4e2; margin-top: 2px;">${v.desc}</span>
          </div>
        </div>
      `).join('');
      body.innerHTML = items;

      setTimeout(() => {
        Object.values(VIRUS_TYPES).forEach(v => {
          const cv = document.getElementById(`cv-virus-${v.id}`);
          if (!cv) return;
          const cctx = cv.getContext('2d');
          cctx.clearRect(0, 0, 50, 50);
          const dummy = new VirusEnemy(v.id, 0, { startX: 0, startY: 0, cellW: 50, cellH: 50, cols: 0 });
          dummy.x = 25; dummy.y = 25;
          dummy.draw(cctx);
        });
      }, 50);
    }
  }

  // ==========================================================================
  // ACCOUNT & SAVE MANAGEMENT
  // ==========================================================================
  openAccountModal() {
    const modal = document.getElementById('account-modal');
    modal.classList.remove('hidden');

    document.getElementById('acc-current-name').innerText = this.currentAccount.name;
    document.getElementById('acc-current-avatar').innerText = this.currentAccount.avatar;
    document.getElementById('acc-current-email').innerText = this.currentAccount.email ? `🔮 ${this.currentAccount.email}` : 'Chưa phong ấn email';
    document.getElementById('acc-stat-level').innerText = `Màn ${this.maxLevel}`;
    document.getElementById('acc-stat-chips').innerText = `${this.chips}`;
    document.getElementById('acc-stat-units').innerText = `${this.unlockedUnits.length}/40`;

    document.getElementById('acc-input-name').value = this.currentAccount.name || '';
    document.getElementById('acc-input-email').value = this.currentAccount.email || '';

    this.renderSavedAccountsList();
  }

  handleSaveLoginAccount() {
    const email = document.getElementById('acc-input-email').value.trim();
    const name = document.getElementById('acc-input-name').value.trim() || 'Bé Mèo Phù Thủy';

    this.currentAccount.name = name;
    this.currentAccount.avatar = this.selectedAvatar || '🎃';
    this.currentAccount.email = email;

    this.saveActiveAccount();
    this.updateAccountBanner();
    this.openAccountModal();
    alert('✨ Đã phong ấn và lưu toàn bộ tiến trình thành công!');
  }

  renderSavedAccountsList() {
    const listEl = document.getElementById('saved-accounts-list');
    if (!listEl) return;
    try {
      const saved = JSON.parse(localStorage.getItem('cuties_user_accounts') || '[]');
      if (saved.length === 0) {
        listEl.innerHTML = '<span style="font-size: 11px; color: #d8b4e2;">Chưa có tài khoản nào được lưu trên thiết bị.</span>';
        return;
      }
      listEl.innerHTML = saved.map(acc => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px solid rgba(255, 158, 0, 0.2);">
          <span>${acc.avatar} <strong>${acc.name}</strong> (${acc.email || 'Không có email'})</span>
          <button class="cyber-btn small primary switch-acc-btn" data-email="${acc.email}">Chuyển</button>
        </div>
      `).join('');

      listEl.querySelectorAll('.switch-acc-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const em = e.currentTarget.getAttribute('data-email');
          const found = saved.find(a => a.email === em);
          if (found) {
            this.currentAccount = found;
            this.loadProfile(found);
            localStorage.setItem('cuties_active_email', em);
            this.updateAccountBanner();
            this.openAccountModal();
            this.updateChipsUI();
          }
        });
      });
    } catch (e) {
      listEl.innerHTML = '';
    }
  }

  exportSaveData() {
    const data = btoa(unescape(encodeURIComponent(JSON.stringify({
      account: this.currentAccount,
      maxLevel: this.maxLevel,
      chips: this.chips,
      unlockedUnits: this.unlockedUnits,
      selectedDeck: this.selectedDeck,
      upgrades: this.upgrades,
      keys: this.keys
    }))));
    navigator.clipboard.writeText(data).then(() => {
      alert('📋 Đã sao chép mã phong ấn vào bộ nhớ tạm! Bạn có thể dán sang máy khác.');
    }).catch(() => {
      prompt('Mã sao lưu của bạn:', data);
    });
  }

  importSaveData() {
    const code = prompt('Nhập mã phong ấn khôi phục:');
    if (!code) return;
    try {
      const json = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
      if (json.account) this.currentAccount = json.account;
      if (json.maxLevel) this.maxLevel = json.maxLevel;
      if (typeof json.chips === 'number') this.chips = json.chips;
      if (json.unlockedUnits) this.unlockedUnits = json.unlockedUnits;
      if (json.selectedDeck) this.selectedDeck = json.selectedDeck;
      if (json.upgrades) this.upgrades = json.upgrades;
      if (json.keys) this.keys = json.keys;
      this.saveActiveAccount();
      this.updateAccountBanner();
      this.updateChipsUI();
      this.openAccountModal();
      alert('✨ Khôi phục tiến trình ma thuật thành công!');
    } catch (e) {
      alert('Mã khôi phục không hợp lệ!');
    }
  }

  handleLogoutAccount() {
    if (confirm('Bạn có chắc muốn đăng xuất khỏi tài khoản này?')) {
      localStorage.removeItem('cuties_active_email');
      this.currentAccount = { email: '', name: 'Bé Mèo Phù Thủy', avatar: '🎃' };
      this.loadProfile();
      this.updateAccountBanner();
      this.openAccountModal();
      this.updateChipsUI();
    }
  }

  // Tool Toggles
  toggleShovel() {
    this.isShovelActive = !this.isShovelActive;
    const btn = document.getElementById('tool-shovel');
    if (this.isShovelActive) {
      btn.classList.add('active');
      this.canvas.classList.add('shovel-active');
      this.selectedUnitType = null;
      this.canvas.classList.remove('placing-unit');
      this.updateCardSelectionState();
    } else {
      btn.classList.remove('active');
      this.canvas.classList.remove('shovel-active');
    }
  }

  toggleSpeed() {
    this.gameSpeed = this.gameSpeed === 1 ? 2 : this.gameSpeed === 2 ? 3 : 1;
    document.getElementById('speed-label').innerText = `${this.gameSpeed}x`;
  }

  toggleSound() {
    const isEnabled = window.cyberAudio.toggleSound();
    document.getElementById('sound-icon').innerText = isEnabled ? '🔊' : '🔇';
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    document.getElementById('tool-pause').classList.toggle('active', this.isPaused);
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
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
