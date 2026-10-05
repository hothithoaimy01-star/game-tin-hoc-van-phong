/**
 * HALLOWEEN NIGHT - 2D Asset & Sprite Manager
 * Loads high definition 2D hand-crafted art assets:
 * - 2D Graveyard Arena Battlefield (World 1)
 * - 2D Dracula Vampire Castle Courtyard (World 2)
 * - 2D Blood Hell & Nether Void Arena (World 3)
 * - 2D Defender Sprite Sheets 1 & 2 (40 Spooky Towers)
 * - 2D Zombie Monster Sprite Sheets 1 & 2 (25 Horror Enemies & Bosses)
 * - 2D Gothic UI Kit (HUD, Frames, Shovel, Soul Meter)
 * - Title Screen Key Art Banner
 */

class GameAssetManager {
  constructor() {
    this.loaded = false;
    this.images = {};
    this.sprites = {};
    this.uiSprites = {};

    this.init();
  }

  init() {
    const assetSources = {
      battlefield: './assets/battlefield.jpg',
      battlefield_castle: './assets/battlefield_castle.jpg',
      battlefield_hell: './assets/battlefield_hell.jpg',
      towers: './assets/towers_sheet.jpg',
      towers_2: './assets/towers_sheet_2.jpg',
      zombies: './assets/zombies_sheet.jpg',
      zombies_2: './assets/zombies_sheet_2.jpg',
      ui_hud: './assets/ui_hud.jpg',
      title_banner: './assets/title_banner.jpg'
    };

    let remaining = Object.keys(assetSources).length;

    Object.entries(assetSources).forEach(([key, src]) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        this.images[key] = img;
        remaining--;
        if (remaining === 0) {
          this.processAllSprites();
          this.loaded = true;
          console.log('🎃 All 2D Game Assets (Sheets 1 & 2, Worlds 1-3) Loaded & Processed!');
        }
      };
      img.onerror = () => {
        console.warn(`Asset fallback: ${src}`);
        remaining--;
        if (remaining === 0) {
          this.processAllSprites();
          this.loaded = true;
        }
      };
      img.src = src;
    });
  }

  // Process sprite sheets into transparent standalone sprite canvases
  processAllSprites() {
    if (this.images.towers) {
      this.extractTowerSprites(this.images.towers);
    }
    if (this.images.towers_2) {
      this.extractTowerSprites2(this.images.towers_2);
    }
    if (this.images.zombies) {
      this.extractZombieSprites(this.images.zombies);
    }
    if (this.images.zombies_2) {
      this.extractZombieSprites2(this.images.zombies_2);
    }
    if (this.images.ui_hud) {
      this.extractUISprites(this.images.ui_hud);
    }
  }

  // Helper to extract a region and make neutral/light background transparent
  createTransparentSprite(img, sxPct, syPct, swPct, shPct, isDarkBg = false) {
    const iw = img.naturalWidth || img.width || 1000;
    const ih = img.naturalHeight || img.height || 600;

    const sx = Math.floor(sxPct * iw);
    const sy = Math.floor(syPct * ih);
    const sw = Math.floor(swPct * iw);
    const sh = Math.floor(shPct * ih);

    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, sw);
    canvas.height = Math.max(1, sh);
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

    try {
      const imgData = ctx.getImageData(0, 0, sw, sh);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (!isDarkBg) {
          // Chroma key light/white/gray background
          if (r > 200 && g > 200 && b > 200) {
            const brightness = (r + g + b) / 3;
            if (brightness > 235) {
              data[i + 3] = 0;
            } else {
              data[i + 3] = Math.floor((235 - brightness) / 35 * 255);
            }
          }
        } else {
          // Chroma key dark background if needed
          if (r < 25 && g < 25 && b < 30) {
            data[i + 3] = 0;
          }
        }
      }
      ctx.putImageData(imgData, 0, 0);
    } catch (e) {
      console.warn('Canvas pixel processing skipped (CORS/tainted)', e);
    }

    return canvas;
  }

  extractTowerSprites(img) {
    // 1) Glow Lantern Sunflower (Jack-o'-Lantern Soul)
    this.sprites['ENERGY_CORE'] = this.createTransparentSprite(img, 0.14, 0.08, 0.14, 0.28);
    this.sprites['SUN_SHROOM'] = this.sprites['ENERGY_CORE'];
    this.sprites['TWIN_SUNFLOWER'] = this.createTransparentSprite(img, 0.03, 0.08, 0.13, 0.28);

    // 2) Witch Cat Gunner
    this.sprites['LASER_TURRET'] = this.createTransparentSprite(img, 0.43, 0.08, 0.16, 0.28);
    this.sprites['CAT_SWORD'] = this.createTransparentSprite(img, 0.32, 0.08, 0.14, 0.28);
    this.sprites['SHROOM_PUFF'] = this.sprites['LASER_TURRET'];

    // 3) Tombstone Guardian (Wallnut)
    this.sprites['NANO_SHIELD'] = this.createTransparentSprite(img, 0.74, 0.08, 0.13, 0.28);
    this.sprites['DURIAN_SHREDDER'] = this.createTransparentSprite(img, 0.86, 0.08, 0.13, 0.28);
    this.sprites['PUMPKIN_SHELL'] = this.createTransparentSprite(img, 0.63, 0.08, 0.13, 0.28);

    // 4) Banshee Ghost (Cryo Turret / Ice Peashooter)
    this.sprites['CRYO_TURRET'] = this.createTransparentSprite(img, 0.14, 0.43, 0.18, 0.28);
    this.sprites['GHOST_PEPPER'] = this.createTransparentSprite(img, 0.02, 0.43, 0.14, 0.28);
    this.sprites['BLUEBERRY_FROST'] = this.createTransparentSprite(img, 0.34, 0.43, 0.17, 0.28);

    // 5) Jack-o'-Bomb (Doom Pumpkin Bomb / Cherry Bomb)
    this.sprites['EMP_BOMB'] = this.createTransparentSprite(img, 0.35, 0.71, 0.18, 0.28);
    this.sprites['POTATO_MINE'] = this.createTransparentSprite(img, 0.03, 0.73, 0.17, 0.26);
    this.sprites['JALAPENO_FIRE'] = this.createTransparentSprite(img, 0.20, 0.72, 0.16, 0.27);

    // 6) Reaper Cat Gatling (Gatling Pea / Dual Cannon)
    this.sprites['GATLING_PEA_CAT'] = this.createTransparentSprite(img, 0.56, 0.54, 0.43, 0.44);
    this.sprites['RAILGUN_CANNON'] = this.createTransparentSprite(img, 0.70, 0.54, 0.29, 0.30);
    this.sprites['SCATTER_SHOTGUN'] = this.sprites['GATLING_PEA_CAT'];
  }

  extractTowerSprites2(img) {
    // 1) Nine-Tailed Ghost Fox (Tesla Coil)
    this.sprites['TESLA_COIL'] = this.createTransparentSprite(img, 0.02, 0.08, 0.32, 0.34);
    this.sprites['NINE_TAIL_FOX'] = this.sprites['TESLA_COIL'];

    // 2) Haunted Floating Eye Sniper
    this.sprites['SNIPER_TURRET'] = this.createTransparentSprite(img, 0.35, 0.08, 0.30, 0.34);
    this.sprites['EYE_SNIPER'] = this.sprites['SNIPER_TURRET'];

    // 3) Vampire Bat Hive Tree
    this.sprites['DRONE_HIVE'] = this.createTransparentSprite(img, 0.67, 0.08, 0.31, 0.48);
    this.sprites['BAT_HIVE'] = this.sprites['DRONE_HIVE'];
    this.sprites['NANO_HEALER'] = this.sprites['DRONE_HIVE'];

    // 4) Spooky Flamethrower Dragon Gourd
    this.sprites['FLAMETHROWER_TURRET'] = this.createTransparentSprite(img, 0.02, 0.48, 0.44, 0.24);
    this.sprites['DRAGON_CANNON'] = this.sprites['FLAMETHROWER_TURRET'];
    this.sprites['COCONUT_BOWLING'] = this.sprites['FLAMETHROWER_TURRET'];

    // 5) Dark Wizard Mushroom
    this.sprites['MAGIC_MUSHROOM'] = this.createTransparentSprite(img, 0.02, 0.73, 0.44, 0.25);
    this.sprites['PLASMA_MORTAR'] = this.sprites['MAGIC_MUSHROOM'];
    this.sprites['TIME_WARP_PYLON'] = this.sprites['MAGIC_MUSHROOM'];
    this.sprites['MAGNET_SHROOM'] = this.sprites['MAGIC_MUSHROOM'];
    this.sprites['POISON_ONION'] = this.sprites['MAGIC_MUSHROOM'];

    // 6) Black Hole Singularity Portal Pumpkin
    this.sprites['BLACK_HOLE'] = this.createTransparentSprite(img, 0.50, 0.73, 0.48, 0.25);
    this.sprites['MISSILE_SILO'] = this.sprites['BLACK_HOLE'];
    this.sprites['ORBITAL_STRIKE_BEACON'] = this.sprites['BLACK_HOLE'];
    this.sprites['CACTUS_SPIKE'] = this.sprites['BLACK_HOLE'];
  }

  extractZombieSprites(img) {
    // 1) Green Slime Zombie
    this.sprites['TROJAN_BUG'] = this.createTransparentSprite(img, 0.05, 0.04, 0.26, 0.44);
    this.sprites['ENCRYPTED_WORM'] = this.sprites['TROJAN_BUG'];

    // 2) Frankenstein Brute
    this.sprites['RANSOMWARE_BRUTE'] = this.createTransparentSprite(img, 0.37, 0.04, 0.27, 0.44);
    this.sprites['FROST_YETI_SLIME'] = this.sprites['RANSOMWARE_BRUTE'];

    // 3) Jiangshi Hopping Vampire
    this.sprites['GLITCH_SPRINTER'] = this.createTransparentSprite(img, 0.70, 0.04, 0.26, 0.44);
    this.sprites['NINJA_SHADOW'] = this.sprites['GLITCH_SPRINTER'];

    // 4) Red Bat Demon Gargoyle
    this.sprites['BALLOON_SLIME'] = this.createTransparentSprite(img, 0.02, 0.54, 0.30, 0.44);
    this.sprites['FLYING_DRONE'] = this.sprites['BALLOON_SLIME'];

    // 5) Digger Mole Miner
    this.sprites['DIGGER_MOLE'] = this.createTransparentSprite(img, 0.36, 0.56, 0.28, 0.42);

    // 6) Vampire Witch Summoner
    this.sprites['DISCO_SLIME'] = this.createTransparentSprite(img, 0.68, 0.52, 0.29, 0.46);
    this.sprites['STEALTH_SPYWARE'] = this.sprites['DISCO_SLIME'];
    this.sprites['WIZARD_DARK'] = this.sprites['DISCO_SLIME'];
  }

  extractZombieSprites2(img) {
    // 1) Grim Reaper Death Lord
    this.sprites['REAPER_DEATH_LORD'] = this.createTransparentSprite(img, 0.02, 0.03, 0.32, 0.46);
    this.sprites['WIZARD_DARK'] = this.sprites['REAPER_DEATH_LORD'];

    // 2) Egyptian Pharaoh Mummy Zombie
    this.sprites['MUMMY_PHARAOH'] = this.createTransparentSprite(img, 0.36, 0.03, 0.28, 0.46);
    this.sprites['ENCRYPTED_WORM'] = this.sprites['MUMMY_PHARAOH'];

    // 3) Cute Purple Werewolf Zombie
    this.sprites['WEREWOLF_SLIME'] = this.createTransparentSprite(img, 0.66, 0.03, 0.32, 0.46);
    this.sprites['GLITCH_SPRINTER'] = this.sprites['WEREWOLF_SLIME'];

    // 4) Horned Red Demon Dragon Boss
    this.sprites['DEMON_DRAGON_BOSS'] = this.createTransparentSprite(img, 0.01, 0.52, 0.38, 0.46);
    this.sprites['CYBER_DRAGON_BOSS'] = this.sprites['DEMON_DRAGON_BOSS'];
    this.sprites['GIANT_GARGANTUAR'] = this.sprites['DEMON_DRAGON_BOSS'];

    // 5) Ghostly Headless Pumpkin Knight
    this.sprites['HEADLESS_KNIGHT'] = this.createTransparentSprite(img, 0.40, 0.52, 0.29, 0.46);
    this.sprites['NINJA_SHADOW'] = this.sprites['HEADLESS_KNIGHT'];

    // 6) Vampire Count in crimson cape
    this.sprites['VAMPIRE_COUNT'] = this.createTransparentSprite(img, 0.71, 0.52, 0.28, 0.46);
    this.sprites['DISCO_SLIME'] = this.sprites['VAMPIRE_COUNT'];
  }

  extractUISprites(img) {
    // Shovel tool
    this.uiSprites['shovel'] = this.createTransparentSprite(img, 0.78, 0.06, 0.19, 0.44, true);
    // Soul Lantern
    this.uiSprites['lantern'] = this.createTransparentSprite(img, 0.03, 0.08, 0.20, 0.36, true);
    // Wave Slime Vial
    this.uiSprites['wave_vial'] = this.createTransparentSprite(img, 0.74, 0.63, 0.24, 0.32, true);
  }

  // Draw 2D Tower Sprite on Canvas
  drawTowerSprite(ctx, type, size = 64, animTime = 0, hitFlash = 0) {
    const sprite = this.sprites[type];
    if (sprite) {
      ctx.save();
      if (hitFlash > 0) {
        ctx.filter = 'brightness(2.2) drop-shadow(0 0 8px #ffffff)';
      } else {
        ctx.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))';
      }

      const aspect = sprite.width / sprite.height;
      let drawW = size;
      let drawH = size;
      if (aspect > 1) {
        drawH = size / aspect;
      } else {
        drawW = size * aspect;
      }

      ctx.drawImage(sprite, -drawW / 2, -drawH / 2 - 2, drawW, drawH);
      ctx.restore();
      return true;
    }
    return false;
  }

  // Draw 2D Zombie Sprite on Canvas
  drawZombieSprite(ctx, type, size = 70, animTime = 0, hitFlash = 0, isEating = false) {
    const sprite = this.sprites[type] || this.sprites['TROJAN_BUG'];
    if (sprite) {
      ctx.save();
      if (hitFlash > 0) {
        ctx.filter = 'brightness(2.2) drop-shadow(0 0 10px #ff0054)';
      } else {
        ctx.filter = 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.6))';
      }

      const aspect = sprite.width / sprite.height;
      let drawW = size;
      let drawH = size;
      if (aspect > 1) {
        drawH = size / aspect;
      } else {
        drawW = size * aspect;
      }

      ctx.drawImage(sprite, -drawW / 2, -drawH / 2 - 6, drawW, drawH);
      ctx.restore();
      return true;
    }
    return false;
  }

  // Draw 2D Battlefield Background on Canvas
  drawBattlefieldBackground(ctx, width, height, world = 'day') {
    let img = this.images.battlefield;
    if (world === 'night' && this.images.battlefield_castle) {
      img = this.images.battlefield_castle;
    } else if ((world === 'cloud' || world === 'hell') && this.images.battlefield_hell) {
      img = this.images.battlefield_hell;
    }

    if (img && img.complete && img.naturalWidth > 0) {
      ctx.drawImage(img, 0, 0, width, height);
      return true;
    }
    return false;
  }
}

// Global instance
window.gameAssets = new GameAssetManager();
