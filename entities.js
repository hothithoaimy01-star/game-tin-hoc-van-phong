/**
 * HALLOWEEN NIGHT: Vườn Ma Bí Ngô vs Binh Đoàn Xác Sống Kinh Dị
 * Entities & Renderers: 40 Unique Cute Spooky Towers & 25 Diverse Halloween Horror Monsters
 */

// Canvas 2D roundRect polyfill
if (typeof CanvasRenderingContext2D !== 'undefined' && !CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r = 0) {
    if (typeof r === 'number') r = [r, r, r, r];
    const [tl, tr, br, bl] = r;
    this.beginPath();
    this.moveTo(x + tl, y);
    this.lineTo(x + w - tr, y);
    this.quadraticCurveTo(x + w, y, x + w, y + tr);
    this.lineTo(x + w, y + h - br);
    this.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
    this.lineTo(x + bl, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - bl);
    this.lineTo(x, y + tl);
    this.quadraticCurveTo(x, y, x + tl, y);
    this.closePath();
    return this;
  };
}

// ============================================================================
// HALLOWEEN SPOOKY & CUTE DRAWING UTILS
// ============================================================================
function drawKawaiiEyes(ctx, x, y, spacing, eyeRadius = 3.5, isBlinking = false, eyeColor = '#12041e', sparkle = true) {
  ctx.save();
  [-spacing, spacing].forEach(offsetX => {
    const eyeX = x + offsetX;
    const eyeY = y;

    if (isBlinking) {
      ctx.strokeStyle = eyeColor;
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(eyeX, eyeY + 1, eyeRadius * 0.9, Math.PI * 1.15, Math.PI * 1.85, false);
      ctx.stroke();
    } else {
      ctx.fillStyle = eyeColor;
      ctx.beginPath();
      ctx.arc(eyeX, eyeY, eyeRadius, 0, Math.PI * 2);
      ctx.fill();

      if (sparkle) {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(eyeX - eyeRadius * 0.35, eyeY - eyeRadius * 0.35, eyeRadius * 0.42, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(eyeX + eyeRadius * 0.35, eyeY + eyeRadius * 0.35, eyeRadius * 0.22, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  });
  ctx.restore();
}

function drawKawaiiBlush(ctx, x, y, spacing, blushRadius = 4, color = 'rgba(255, 119, 0, 0.55)') {
  ctx.save();
  ctx.fillStyle = color;
  [-spacing, spacing].forEach(offsetX => {
    ctx.beginPath();
    ctx.ellipse(x + offsetX, y, blushRadius, blushRadius * 0.65, 0, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function drawKawaiiMouth(ctx, x, y, type = 'smile', color = '#12041e') {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';

  if (type === 'smile') {
    ctx.beginPath();
    ctx.arc(x, y - 2, 4, 0.2, Math.PI - 0.2);
    ctx.stroke();
  } else if (type === 'cat') {
    ctx.beginPath();
    ctx.arc(x - 2.5, y - 1, 2.5, 0, Math.PI * 0.85);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x + 2.5, y - 1, 2.5, Math.PI * 0.15, Math.PI);
    ctx.stroke();
  } else if (type === 'open') {
    ctx.beginPath();
    ctx.arc(x, y - 2, 4.5, 0, Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ff0054';
    ctx.beginPath();
    ctx.arc(x, y + 1.5, 2.5, 0, Math.PI);
    ctx.fill();
  } else if (type === 'fangs') {
    ctx.beginPath();
    ctx.arc(x, y - 2, 4.5, 0.2, Math.PI - 0.2);
    ctx.stroke();
    // Two tiny cute fangs
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(x - 3, y - 1); ctx.lineTo(x - 2, y + 3); ctx.lineTo(x - 1, y - 1); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x + 1, y - 1); ctx.lineTo(x + 2, y + 3); ctx.lineTo(x + 3, y - 1); ctx.fill();
  }
  ctx.restore();
}

function drawWitchHat(ctx, x, y, size = 10, hatColor = '#240046', bandColor = '#ff7700') {
  ctx.save();
  // Brim
  ctx.fillStyle = hatColor;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.ellipse(x, y, size * 1.5, size * 0.45, 0, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  // Cone
  ctx.beginPath();
  ctx.moveTo(x - size * 0.9, y);
  ctx.quadraticCurveTo(x - size * 0.3, y - size * 1.5, x + size * 0.6, y - size * 2.2);
  ctx.quadraticCurveTo(x + size * 0.4, y - size * 1.2, x + size * 0.9, y);
  ctx.closePath();
  ctx.fill(); ctx.stroke();
  // Band
  ctx.fillStyle = bandColor;
  ctx.beginPath();
  ctx.roundRect(x - size * 0.75, y - size * 0.45, size * 1.5, size * 0.4, 2);
  ctx.fill();
  // Mini buckle
  ctx.fillStyle = '#ffea00';
  ctx.fillRect(x - 2, y - size * 0.45, 4, size * 0.4);
  ctx.restore();
}

function drawJackOLanternFace(ctx, x, y, size = 10, glow = '#ffea00') {
  ctx.save();
  ctx.fillStyle = glow;
  ctx.shadowColor = glow;
  ctx.shadowBlur = 8;
  // Left eye
  ctx.beginPath();
  ctx.moveTo(x - size * 0.6, y - size * 0.2);
  ctx.lineTo(x - size * 0.2, y - size * 0.2);
  ctx.lineTo(x - size * 0.4, y - size * 0.6);
  ctx.closePath();
  ctx.fill();
  // Right eye
  ctx.beginPath();
  ctx.moveTo(x + size * 0.2, y - size * 0.2);
  ctx.lineTo(x + size * 0.6, y - size * 0.2);
  ctx.lineTo(x + size * 0.4, y - size * 0.6);
  ctx.closePath();
  ctx.fill();
  // Nose
  ctx.beginPath();
  ctx.moveTo(x, y - size * 0.35);
  ctx.lineTo(x - size * 0.15, y - size * 0.1);
  ctx.lineTo(x + size * 0.15, y - size * 0.1);
  ctx.closePath();
  ctx.fill();
  // Jagged smile
  ctx.beginPath();
  ctx.moveTo(x - size * 0.7, y + size * 0.1);
  ctx.lineTo(x - size * 0.4, y + size * 0.4);
  ctx.lineTo(x - size * 0.2, y + size * 0.2);
  ctx.lineTo(x, y + size * 0.5);
  ctx.lineTo(x + size * 0.2, y + size * 0.2);
  ctx.lineTo(x + size * 0.4, y + size * 0.4);
  ctx.lineTo(x + size * 0.7, y + size * 0.1);
  ctx.lineTo(x + size * 0.5, y + size * 0.25);
  ctx.lineTo(x + size * 0.3, y + size * 0.15);
  ctx.lineTo(x, y + size * 0.3);
  ctx.lineTo(x - size * 0.3, y + size * 0.15);
  ctx.lineTo(x - size * 0.5, y + size * 0.25);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawSpookyBatWings(ctx, x, y, wingSpan = 14, color = '#240046') {
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;
  // Left Wing
  ctx.beginPath();
  ctx.moveTo(x - 4, y);
  ctx.quadraticCurveTo(x - wingSpan * 0.7, y - wingSpan * 0.6, x - wingSpan, y - wingSpan * 0.2);
  ctx.quadraticCurveTo(x - wingSpan * 0.7, y + wingSpan * 0.2, x - wingSpan * 0.5, y + wingSpan * 0.1);
  ctx.quadraticCurveTo(x - wingSpan * 0.3, y + wingSpan * 0.3, x - 4, y + 4);
  ctx.closePath();
  ctx.fill(); ctx.stroke();
  // Right Wing
  ctx.beginPath();
  ctx.moveTo(x + 4, y);
  ctx.quadraticCurveTo(x + wingSpan * 0.7, y - wingSpan * 0.6, x + wingSpan, y - wingSpan * 0.2);
  ctx.quadraticCurveTo(x + wingSpan * 0.7, y + wingSpan * 0.2, x + wingSpan * 0.5, y + wingSpan * 0.1);
  ctx.quadraticCurveTo(x + wingSpan * 0.3, y + wingSpan * 0.3, x + 4, y + 4);
  ctx.closePath();
  ctx.fill(); ctx.stroke();
  ctx.restore();
}

function drawKawaiiCatEars(ctx, x, y, size = 8, color = '#240046', innerColor = '#c77dff') {
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.5;
  // Left Ear
  ctx.beginPath();
  ctx.moveTo(x - 12, y + 6); ctx.lineTo(x - 10, y - size); ctx.lineTo(x - 2, y + 2);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  // Left Inner
  ctx.fillStyle = innerColor;
  ctx.beginPath();
  ctx.moveTo(x - 10, y + 4); ctx.lineTo(x - 9, y - size + 3); ctx.lineTo(x - 4, y + 2);
  ctx.closePath(); ctx.fill();
  // Right Ear
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + 12, y + 6); ctx.lineTo(x + 10, y - size); ctx.lineTo(x + 2, y + 2);
  ctx.closePath(); ctx.fill(); ctx.stroke();
  // Right Inner
  ctx.fillStyle = innerColor;
  ctx.beginPath();
  ctx.moveTo(x + 10, y + 4); ctx.lineTo(x + 9, y - size + 3); ctx.lineTo(x + 4, y + 2);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}

function drawKawaiiBow(ctx, x, y, size = 6, color = '#ff0054') {
  ctx.save();
  ctx.fillStyle = color;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, y); ctx.lineTo(x - size, y - size * 0.7); ctx.lineTo(x - size, y + size * 0.7); ctx.closePath();
  ctx.fill(); ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y); ctx.lineTo(x + size, y - size * 0.7); ctx.lineTo(x + size, y + size * 0.7); ctx.closePath();
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#ffea00';
  ctx.beginPath();
  ctx.arc(x, y, size * 0.38, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  ctx.restore();
}

// ============================================================================
// 40 UNIQUE HALLOWEEN SPOOKY & CUTE TOWERS
// ============================================================================
const UNIT_TYPES = {
  // World 1: 1 - 10
  ENERGY_CORE: {
    id: 'ENERGY_CORE', name: 'Jack-o-Lantern Soul', vietName: 'Bí Ngô Ma Thuật (+50🎃)',
    cost: 50, cooldown: 5, hp: 350, unlockLevel: 0,
    role: 'Sinh Linh Hồn Bí Ngô (+50🎃)', desc: 'Chiêu hồn những ngọn lửa bí ngô ma quái rơi lơ lửng để triệu hồi quái binh!',
    color: '#ff9e00', accent: '#ff5400'
  },
  LASER_TURRET: {
    id: 'LASER_TURRET', name: 'Witch Cat Blaster', vietName: 'Mèo Phù Thủy Hắc Ám',
    cost: 100, cooldown: 5, hp: 350, unlockLevel: 0,
    role: 'Bắn Tia Ma Thuật Tím (45 DMG)', desc: 'Bé Mèo đeo nón phù thủy bắn chùm tia ma thuật tím thiêu đốt xác sống!',
    color: '#9d4edd', accent: '#ff0054'
  },
  NANO_SHIELD: {
    id: 'NANO_SHIELD', name: 'Haunted Tombstone', vietName: 'Bia Mộ Hộ Vệ Cổ',
    cost: 50, cooldown: 15, hp: 4500, unlockLevel: 2,
    role: 'Bia Mộ Hộ Vệ 4500 HP', desc: 'Khối bia mộ ma ám khắc chữ RIP sừng sững chặn đứng lũ quái đói khát!',
    color: '#6c757d', accent: '#39ff14'
  },
  CRYO_TURRET: {
    id: 'CRYO_TURRET', name: 'Frost Banshee Ghost', vietName: 'Hồn Ma Băng Giá Banshee',
    cost: 150, cooldown: 6, hp: 350, unlockLevel: 3,
    role: 'Thổi Gió Ma Giảm 60% Tốc', desc: 'Tiếng thét hồn ma băng giá làm đóng băng và đông cứng bước chân quái!',
    color: '#00f5d4', accent: '#ffffff'
  },
  EMP_BOMB: {
    id: 'EMP_BOMB', name: 'Doom Pumpkin Bomb', vietName: 'Bí Ngô Nổ Đoạt Mệnh',
    cost: 125, cooldown: 25, hp: 600, unlockLevel: 4,
    role: 'Nổ Hắc Ám 3x3 (2200 DMG)', desc: 'Quả bí ngô ma quái cười toe toét phát nổ thành ngọn lửa hắc ám quét sạch 3x3 ô!',
    color: '#ff0054', accent: '#ff7700'
  },
  DURIAN_SHREDDER: {
    id: 'DURIAN_SHREDDER', name: 'Cursed Bone Spike', vietName: 'Bẫy Xương Gai Nguyền Rủa',
    cost: 75, cooldown: 10, hp: 4500, unlockLevel: 5,
    role: 'Gai Xương 4500 HP (45 DMG/s)', desc: 'Bãi gai xương yêu ma sắc lẹm xé nát giáp của bất kỳ xác sống nào chạm vào!',
    color: '#fdf0d5', accent: '#c9184a'
  },
  RAILGUN_CANNON: {
    id: 'RAILGUN_CANNON', name: 'Skull Dual Blaster', vietName: 'Pháo Đầu Lâu Kép',
    cost: 175, cooldown: 7, hp: 400, unlockLevel: 6,
    role: 'Bắn x2 Đầu Lâu Ma (90 DMG)', desc: 'Khẩu pháo xương đầu lâu bắn liền 2 quả cầu lửa ma quái uy lực!',
    color: '#ff7700', accent: '#240046'
  },
  GATLING_PEA_CAT: {
    id: 'GATLING_PEA_CAT', name: 'Gatling Reaper Cat', vietName: 'Mèo Thần Chết Gatling 4 Nòng',
    cost: 175, cooldown: 7, hp: 400, unlockLevel: 7,
    role: 'Xả 4 Hỏa Cầu U Linh (160 DMG)', desc: 'Bé Mèo khoác áo choàng thần chết xả liên thanh 4 viên ma đạn xuyên giáp!',
    color: '#39ff14', accent: '#ffaa00'
  },
  TESLA_COIL: {
    id: 'TESLA_COIL', name: 'Ghost Kitsune Reaper', vietName: 'Cáo Chín Đuôi U Linh Sét',
    cost: 125, cooldown: 10, hp: 400, unlockLevel: 8,
    role: 'Sấm Sét U Hồn', desc: 'Hồ ly chín đuôi u linh phóng sét linh hồn xanh biếc giật liên hoàn bầy quái!',
    color: '#c77dff', accent: '#00f5d4'
  },
  SCATTER_SHOTGUN: {
    id: 'SCATTER_SHOTGUN', name: 'Pumpkin Tri-Scatter', vietName: 'Bí Ngô Bắn 3 Làn',
    cost: 150, cooldown: 8, hp: 320, unlockLevel: 9,
    role: 'Bắn Tỏa Lửa 3 Làn', desc: 'Bắn chùm hạt lửa ma thuật tỏa sang cả làn trên và làn dưới!',
    color: '#ffaa00', accent: '#ff0054'
  },
  SNIPER_TURRET: {
    id: 'SNIPER_TURRET', name: 'Evil Eye Sniper', vietName: 'Con Mắt Ma Bắn Tỉa Xuyên Thấu',
    cost: 175, cooldown: 10, hp: 300, unlockLevel: 10,
    role: 'Tia Hủy Diệt Cả Hàng (90 DMG)', desc: 'Nhãn cầu ma quái bắn chùm tia đỏ xuyên thấu toàn bộ quái vật trên làn!',
    color: '#ff0054', accent: '#ffffff'
  },
  DRONE_HIVE: {
    id: 'DRONE_HIVE', name: 'Vampire Bat Nest', vietName: 'Tổ Dơi Ma Cà Rồng',
    cost: 175, cooldown: 14, hp: 350, unlockLevel: 11,
    role: 'Thả 3 Dơi Ma Tự Động Tấn Công', desc: 'Thả đàn dơi quỷ bay lượn rỉa máu quái vật khắp cả hàng!',
    color: '#7b2cbf', accent: '#ff0054'
  },
  FLAMETHROWER_TURRET: {
    id: 'FLAMETHROWER_TURRET', name: 'Hellfire Dragon Breath', vietName: 'Rồng Lửa Địa Ngục',
    cost: 175, cooldown: 8, hp: 400, unlockLevel: 12,
    role: 'Phun Lửa Địa Ngục (70 DMG/s)', desc: 'Phun luồng lửa ma quái thiêu đốt toàn bộ kẻ địch cự ly gần!',
    color: '#ff5400', accent: '#ffea00'
  },
  NANO_HEALER: {
    id: 'NANO_HEALER', name: 'Witch Healing Cauldron', vietName: 'Vạc Thuốc Phù Thủy Hồi Máu',
    cost: 125, cooldown: 12, hp: 350, unlockLevel: 13,
    role: 'Hồi 80 HP/s Cho Bé Tháp Xung Quanh', desc: 'Vạc thuốc ma thuật sôi sùng sục hồi phục sinh mệnh cho các tháp bảo vệ!',
    color: '#39ff14', accent: '#70e000'
  },
  PLASMA_MORTAR: {
    id: 'PLASMA_MORTAR', name: 'Cursed Cauldron Mortar', vietName: 'Vạc Ma Bắn Cầu Lửa Nổ Lan',
    cost: 175, cooldown: 9, hp: 320, unlockLevel: 14,
    role: 'Bắn Rót Cầu Lửa Ma Nổ Lan', desc: 'Bắn những khối cầu độc ma quái rơi cầu vồng nổ tung đám quái tụ tập!',
    color: '#c77dff', accent: '#39ff14'
  },
  FORCE_REPELLER: {
    id: 'FORCE_REPELLER', name: 'Specter Shroom Repeller', vietName: 'Nấm U Linh Đẩy Lùi Quái',
    cost: 100, cooldown: 12, hp: 400, unlockLevel: 15,
    role: 'Thổi Luồng Ma Khí Đẩy Lùi 1.5 Ô', desc: 'Thổi bão sương mù ma ám đẩy lùi đàn xác sống ra xa!',
    color: '#00f5d4', accent: '#9d4edd'
  },
  MISSILE_SILO: {
    id: 'MISSILE_SILO', name: 'Ghost Rocket Pod', vietName: 'Hỏa Tiễn Đầu Lâu Đuổi Quái',
    cost: 250, cooldown: 14, hp: 380, unlockLevel: 16,
    role: 'Tên Lửa Tìm Quái Trâu Nhất', desc: 'Phóng tên lửa đầu lâu lửa xanh tự đuổi kẻ địch nhiều máu nhất!',
    color: '#ff7700', accent: '#ff0054'
  },
  BLACK_HOLE: {
    id: 'BLACK_HOLE', name: 'Void Abyssal Vortex', vietName: 'Hố Đen Hư Vô Hắc Ám',
    cost: 275, cooldown: 25, hp: 600, unlockLevel: 17,
    role: 'Hút Gom Quái 3x3', desc: 'Mở cánh cổng vực sâu hút toàn bộ quái vật vào tâm nghiền nát!',
    color: '#240046', accent: '#c77dff'
  },
  CACTUS_SPIKE: {
    id: 'CACTUS_SPIKE', name: 'Spooky Spider Cactus', vietName: 'Xương Rồng Nhện Gai Ma',
    cost: 125, cooldown: 10, hp: 1200, unlockLevel: 18,
    role: 'Bắn Gai Độc & Phản Sát Thương', desc: 'Xương rồng nhện giăng tơ bắn gai độc và phản sát thương khi bị cắn!',
    color: '#70e000', accent: '#ffaa00'
  },
  COCONUT_BOWLING: {
    id: 'COCONUT_BOWLING', name: 'Giant Skull Rolling Boulder', vietName: 'Đầu Lâu Khổng Lồ Lăn Đè',
    cost: 150, cooldown: 18, hp: 800, unlockLevel: 19,
    role: 'Lăn Đè Bẹp Quái Toàn Làn', desc: 'Lăn một khối đá đầu lâu khổng lồ nghiền nát toàn bộ kẻ địch trên làn!',
    color: '#fdf0d5', accent: '#c9184a'
  },
  TIME_WARP_PYLON: {
    id: 'TIME_WARP_PYLON', name: 'Chrono Ghost Hourglass', vietName: 'Đồng Hồ Cát U Linh Đóng Băng',
    cost: 200, cooldown: 18, hp: 350, unlockLevel: 20,
    role: 'Ngưng Đọng Thời Gian Quái', desc: 'Phóng bụi ma thuật ngưng đọng thời gian đóng băng quái toàn hàng!',
    color: '#c77dff', accent: '#00f5d4'
  },
  MAGNET_SHROOM: {
    id: 'MAGNET_SHROOM', name: 'Soul Magnet Shroom', vietName: 'Nấm Hút Hồn & Tước Giáp',
    cost: 125, cooldown: 12, hp: 450, unlockLevel: 21,
    role: 'Hút Toàn Bộ Linh Hồn & Tước Giáp', desc: 'Tự động hút toàn bộ Linh Hồn Bí Ngô và phá hủy giáp của quái trâu!',
    color: '#ff0054', accent: '#9d4edd'
  },
  ORBITAL_STRIKE_BEACON: {
    id: 'ORBITAL_STRIKE_BEACON', name: 'Blood Meteor Beacon', vietName: 'Triệu Hồi Mưa Thiên Thạch Máu',
    cost: 300, cooldown: 30, hp: 400, unlockLevel: 22,
    role: 'Mưa Thiên Thạch Máu (2500 DMG)', desc: 'Triệu hồi bão thiên thạch đỏ rực giáng xuống hủy diệt chiến trường!',
    color: '#ff0054', accent: '#ffaa00'
  },

  // World 3: 23 - 40
  POISON_ONION: {
    id: 'POISON_ONION', name: 'Toxic Gas Onion', vietName: 'Hành Tây Khí Độc Ma',
    cost: 100, cooldown: 10, hp: 400, unlockLevel: 23,
    role: 'Phun Khí Độc Làm Choáng 3s', desc: 'Phun khí độc màu tím làm choáng và rút máu độc liên tục!',
    color: '#9d4edd', accent: '#39ff14'
  },
  GARLIC_DIVERT: {
    id: 'GARLIC_DIVERT', name: 'Garlic Vampire Ward', vietName: 'Tỏi Xua Đuổi Ma Quái',
    cost: 50, cooldown: 8, hp: 1000, unlockLevel: 24,
    role: 'Ép Quái Đổi Làn Tức Thì', desc: 'Mùi tỏi nồng nặc khiến ma quái và quỷ hút máu kinh hãi chạy sang làn khác!',
    color: '#fdf0d5', accent: '#c9184a'
  },
  SHROOM_PUFF: {
    id: 'SHROOM_PUFF', name: 'Spooky Puff Shroom', vietName: 'Nấm Bào Tử Ma Nhí (25🎃)',
    cost: 25, cooldown: 4, hp: 200, unlockLevel: 25,
    role: 'Bắn Bào Tử Ma Siêu Rẻ (25🎃)', desc: 'Bé nấm u linh nhỏ gọn bắn liên tục những chùm bào tử ma quái cự ly gần!',
    color: '#c77dff', accent: '#ff0054'
  },
  LOTUS_REFLECTOR: {
    id: 'LOTUS_REFLECTOR', name: 'Ghost Lotus Mirror', vietName: 'Hoa Sen Gương Ma Phản Đòn',
    cost: 125, cooldown: 14, hp: 2500, unlockLevel: 26,
    role: 'Khiên Phản 50% Sát Thương', desc: 'Cánh sen u linh phản hồi 50% sát thương trực diện vào quái vật!',
    color: '#ff0054', accent: '#00f5d4'
  },
  PUMPKIN_SHELL: {
    id: 'PUMPKIN_SHELL', name: 'Jack-o-Armor Shell', vietName: 'Lồng Bí Ngô Bọc Giáp 4000 HP',
    cost: 125, cooldown: 15, hp: 4000, unlockLevel: 27,
    role: 'Lồng Giáp 4000 HP Bọc Cây', desc: 'Lớp vỏ bí ngô phát sáng ma quái bọc ngoài bảo vệ các bé tháp bên trong!',
    color: '#ff7700', accent: '#ffaa00'
  },
  GRAPE_CLUSTER: {
    id: 'GRAPE_CLUSTER', name: 'Cursed Grape Cluster', vietName: 'Chùm Nho Ma Nổ 8 Hướng',
    cost: 150, cooldown: 20, hp: 300, unlockLevel: 28,
    role: 'Nổ Tách 8 Đạn Ma Quái', desc: 'Phát nổ văng 8 viên đạn linh hồn tím ra 8 hướng dọn sạch khu vực!',
    color: '#7b2cbf', accent: '#c77dff'
  },
  AVOCADO_RAM: {
    id: 'AVOCADO_RAM', name: 'Gargoyle Ram Fighter', vietName: 'Quỷ Đá Gargoyle Húc Lực Sĩ',
    cost: 175, cooldown: 12, hp: 600, unlockLevel: 29,
    role: 'Húc Văng Quái Lùi 2 Ô', desc: 'Quỷ đá bay lên húc văng quái vật lùi lại với sức mạnh khủng khiếp!',
    color: '#6c757d', accent: '#39ff14'
  },
  MANGO_BOOMERANG: {
    id: 'MANGO_BOOMERANG', name: 'Grim Reaper Scythe', vietName: 'Lưỡi Hái Thần Chết Boomerang',
    cost: 175, cooldown: 8, hp: 350, unlockLevel: 30,
    role: 'Ném Lưỡi Hái Chém x2 Lượt', desc: 'Ném lưỡi hái ma quái xoay tròn chém qua lại quét sạch 2 lần sát thương!',
    color: '#ffaa00', accent: '#ff0054'
  },
  LEMON_VOLT: {
    id: 'LEMON_VOLT', name: 'Witch Lightning Orb', vietName: 'Cầu Sấm Sét Ma Nữ',
    cost: 200, cooldown: 10, hp: 380, unlockLevel: 31,
    role: 'Phóng Tia Sét Giật 4 Quái', desc: 'Phóng tia chớp ma thuật giật liên hoàn 4 kẻ địch cùng lúc!',
    color: '#ffea00', accent: '#c77dff'
  },
  PINEAPPLE_TANK: {
    id: 'PINEAPPLE_TANK', name: 'Iron Spike Fortress', vietName: 'Pháo Đài Gai Sắt Quỷ Dữ',
    cost: 225, cooldown: 12, hp: 800, unlockLevel: 32,
    role: 'Bắn Mưa Đinh Sắt 4 Hướng', desc: 'Xả liên thanh mưa đinh sắt ma ám quét sạch kẻ địch xung quanh!',
    color: '#ffaa00', accent: '#39ff14'
  },
  BANANA_LAUNCHER: {
    id: 'BANANA_LAUNCHER', name: 'Hellfire Skull Mortar', vietName: 'Đại Bác Hỏa Lục Địa Ngục',
    cost: 250, cooldown: 14, hp: 400, unlockLevel: 33,
    role: 'Bắn Pháo Lửa Nổ 150 DMG', desc: 'Bắn đại bác đầu lâu nổ diện rộng thiêu rụi bầy quái hung hãn!',
    color: '#ff7700', accent: '#c9184a'
  },
  BLUEBERRY_FROST: {
    id: 'BLUEBERRY_FROST', name: 'Absolute Zero Banshee', vietName: 'U Hồn Băng Tuyệt Đối (Đóng Băng 5s)',
    cost: 225, cooldown: 22, hp: 350, unlockLevel: 34,
    role: 'Đóng Băng Tượng Đá 5 Giây', desc: 'Biến toàn bộ quái vật thành tượng băng đông cứng bất động 5 giây!',
    color: '#00f5d4', accent: '#7b2cbf'
  },
  KIWI_SPIKETRAP: {
    id: 'KIWI_SPIKETRAP', name: 'Graveyard Spike Trap', vietName: 'Bẫy Gai Đất Nghĩa Trang',
    cost: 100, cooldown: 10, hp: 1500, unlockLevel: 35,
    role: 'Bẫy Gai Đất 1500 HP', desc: 'Những mũi chông từ dưới lòng đất nhô lên đâm xuyên chân bầy quái!',
    color: '#6c757d', accent: '#ff0054'
  },
  PALM_ENERGY: {
    id: 'PALM_ENERGY', name: 'Soul Willow Tree', vietName: 'Cây Liễu Chiêu Hồn (+100🎃)',
    cost: 150, cooldown: 8, hp: 500, unlockLevel: 36,
    role: 'Sinh Linh Hồn Cực Đại (+100🎃)', desc: 'Cây liễu ma chiêu hồn sản sinh lượng linh hồn khổng lồ!',
    color: '#ff7700', accent: '#39ff14'
  },
  PEACH_REVIVE: {
    id: 'PEACH_REVIVE', name: 'Necromancy Soul Core', vietName: 'Hồn Hồi Sinh Chiêu Hồn Thuật',
    cost: 100, cooldown: 20, hp: 300, unlockLevel: 37,
    role: 'Hồi Sinh Bé Tháp Bị Tiêu Diệt', desc: 'Dùng phép thuật hồi sinh bé tháp liền kề khi bị quái cắn đổ!',
    color: '#ff0054', accent: '#ffea00'
  },
  GRAVITY_APPLE: {
    id: 'GRAVITY_APPLE', name: 'Void Singularity Eye', vietName: 'Nhãn Cầu Trọng Lực Hư Vô',
    cost: 200, cooldown: 16, hp: 450, unlockLevel: 38,
    role: 'Ép Trọng Lực Làm Chậm 80%', desc: 'Tạo từ trường đè bẹp trọng lực làm đàn quái lê bước chậm chạp!',
    color: '#c77dff', accent: '#240046'
  },
  RAINBOW_FUNGUS: {
    id: 'RAINBOW_FUNGUS', name: 'Spectral Phantom Spore', vietName: 'Nấm Ma Quái Đổi Nguyên Tố',
    cost: 275, cooldown: 14, hp: 450, unlockLevel: 39,
    role: 'Bắn Đạn Ma Thuật Đa Nguyên Tố', desc: 'Bắn liên tục các loại đạn ma hắc ám, băng giá và hỏa ngục!',
    color: '#ff0054', accent: '#00f5d4'
  },
  MYSTIC_DRAGON_PLANT: {
    id: 'MYSTIC_DRAGON_PLANT', name: 'Infernal Nether Drake', vietName: 'Rồng Quỷ Hư Vô Thần Thoại',
    cost: 325, cooldown: 22, hp: 600, unlockLevel: 40,
    role: 'Phun Lửa Quỷ Hủy Diệt 3 Làn', desc: 'Phun luồng bão lửa địa ngục hủy diệt cùng lúc cả 3 làn chiến đấu!',
    color: '#ff7700', accent: '#c9184a'
  },
  TREE_OF_WISDOM: {
    id: 'TREE_OF_WISDOM', name: 'Ancient Witch Elder Tree', vietName: 'Cổ Thụ Phù Thủy Tối Cao',
    cost: 350, cooldown: 30, hp: 1000, unlockLevel: 40,
    role: 'Tăng x2 Sát Thương Toàn Trận', desc: 'Tỏa hào quang ma thuật hắc ám nhân đôi sát thương cho toàn bộ đội hình!',
    color: '#ffea00', accent: '#39ff14'
  },
  OVERCLOCK_TOWER: {
    id: 'OVERCLOCK_TOWER', name: 'Cursed Music Box', vietName: 'Hộp Nhạc Ma Ám Tăng Tốc',
    cost: 150, cooldown: 15, hp: 350, unlockLevel: 40,
    role: 'Tăng +50% Tốc Độ Bắn Xung Quanh', desc: 'Giai điệu ma quái vang lên khiến tháp xung quanh bắn nhanh như bão!',
    color: '#ff0054', accent: '#9d4edd'
  }
};

// ============================================================================
// 25 DIVERSE HALLOWEEN HORROR MONSTERS
// ============================================================================
const VIRUS_TYPES = {
  TROJAN_BUG: {
    id: 'TROJAN_BUG', name: 'Xác Sống Nhí Slime', vietName: 'Xác Sống Slime Nhí (Zombie)',
    hp: 110, speed: 0.16, damage: 80, score: 100, color: '#70e000',
    desc: 'Xác sống nhí xanh xao lết chân chậm rãi, mắt lồi ghê rợn!'
  },
  ENCRYPTED_WORM: {
    id: 'ENCRYPTED_WORM', name: 'Sâu Ma Độc Dược', vietName: 'Sâu Ma Độc Dược (Poison Worm)',
    hp: 220, speed: 0.13, damage: 85, score: 150, color: '#ffaa00',
    desc: 'Sâu ma độc bò uốn lượn mang lớp giáp nhớt bảo vệ.'
  },
  RANSOMWARE_BRUTE: {
    id: 'RANSOMWARE_BRUTE', name: 'Gã Khổng Lồ Frankenstein', vietName: 'Gã Khổng Lồ Frankenstein (Brute)',
    hp: 750, speed: 0.09, damage: 130, score: 250, color: '#7b2cbf',
    desc: 'Quái vật Frankenstein thân hình hộ pháp, trán khâu chằng chịt, bước đi rung chuyển đất!'
  },
  GLITCH_SPRINTER: {
    id: 'GLITCH_SPRINTER', name: 'Cương Thi Nhảy Xà', vietName: 'Cương Thi Nhảy Xà (Tốc Độ ⚡)',
    hp: 180, speed: 0.44, damage: 100, score: 200, color: '#00f5d4', isFast: true,
    desc: '⚡ [SKILL TỐC ĐỘ]: Dán bùa vàng nhảy chồm chồm cực nhanh, nhảy qua cây đầu tiên!'
  },
  STEALTH_SPYWARE: {
    id: 'STEALTH_SPYWARE', name: 'Ma Nữ Áo Trắng U Linh', vietName: 'Ma Nữ Áo Trắng (Tàng Hình 👻)',
    hp: 220, speed: 0.14, damage: 95, score: 220, color: '#c77dff', isStealth: true,
    desc: 'Ma nữ tóc dài bồng bềnh trong suốt lơ lửng, khó bị phát hiện.'
  },
  BALLOON_SLIME: {
    id: 'BALLOON_SLIME', name: 'Dơi Quỷ Cánh Màng Bay', vietName: 'Dơi Quỷ Bay Lượn (Bay 🦇)',
    hp: 190, speed: 0.14, damage: 100, score: 240, color: '#ff0054', isFlying: true,
    desc: 'Đập cánh dơi quỷ bay lượn trên không né tránh đạn bắn dưới đất!'
  },
  DIGGER_MOLE: {
    id: 'DIGGER_MOLE', name: 'Quái Vật Đào Mộ Dưới Đất', vietName: 'Quái Vật Đào Mộ (Đào Hầm 🪦)',
    hp: 300, speed: 0.15, damage: 110, score: 280, color: '#a16207', isDigger: true,
    desc: 'Đào xuyên qua lòng đất nghĩa trang chui thẳng ra sau lưng phòng tuyến!'
  },
  DISCO_SLIME: {
    id: 'DISCO_SLIME', name: 'Phù Thủy Chiêu Hồn Xác Sống', vietName: 'Phù Thủy Chiêu Hồn (Triệu Hồi 🧙‍♀️)',
    hp: 450, speed: 0.11, damage: 110, score: 320, color: '#c77dff', isSummoner: true,
    desc: 'Đọc thần chú triệu hồi thêm 3 xác sống nhí lao lên trợ chiến!'
  },
  FROST_YETI_SLIME: {
    id: 'FROST_YETI_SLIME', name: 'Quái Quỷ Băng Giá Tuyết Sơn', vietName: 'Quỷ Băng Giá (Đóng Băng ❄️)',
    hp: 950, speed: 0.10, damage: 140, score: 420, color: '#00f5d4', isFreezer: true,
    desc: 'Phát ra luồng khí lạnh căm hờn đóng băng các bé tháp ngưng bắn!'
  },
  DIVER_SLIME: {
    id: 'DIVER_SLIME', name: 'Quái Vật Đầm Lầy Máu', vietName: 'Quái Vật Đầm Lầy (Lặn 🩸)',
    hp: 380, speed: 0.13, damage: 110, score: 260, color: '#c9184a', isDiver: true,
    desc: 'Lặn sâu dưới đầm lầy máu né tránh 40% sát thương từ đạn!'
  },
  NINJA_SLIME: {
    id: 'NINJA_SLIME', name: 'Sát Thủ Bóng Đêm Ninja Quỷ', vietName: 'Ninja Quỷ Ám (Tốc Độ ⚡)',
    hp: 280, speed: 0.28, damage: 120, score: 300, color: '#240046', isShooter: true, isFast: true,
    desc: '⚡ [SKILL TỐC ĐỘ]: Phi thân thoăn thoắt, phóng phi tiêu đầu lâu từ xa!'
  },
  HYDRA_TROJAN: {
    id: 'HYDRA_TROJAN', name: 'Rắn Yêu 3 Đầu Địa Ngục', vietName: 'Rắn Quỷ 3 Đầu (Phân Thân 🐍)',
    hp: 550, speed: 0.12, damage: 120, score: 350, color: '#ff0054', isSplitter: true,
    desc: 'Khi bị chém đứt đầu sẽ phân chia thành 2 xác sống con hung tợn!'
  },
  NANO_SWARM_COLONY: {
    id: 'NANO_SWARM_COLONY', name: 'Bầy Nhện Độc Ăn Thịt', vietName: 'Bầy Nhện Độc (Hồi Máu 🕷️)',
    hp: 750, speed: 0.11, damage: 120, score: 300, color: '#70e000', isRegen: true,
    desc: 'Đàn nhện độc bu lại cắn xé và liên tục tự hồi +40 HP mỗi giây!'
  },
  BIO_SYNTH_VIRUS: {
    id: 'BIO_SYNTH_VIRUS', name: 'Ma Cà Rồng Khát Máu', vietName: 'Ma Cà Rồng Hút Máu (Vampire 🧛‍♂️)',
    hp: 1100, speed: 0.12, damage: 130, score: 400, color: '#c9184a', isVampire: true,
    desc: 'Ma cà rồng nanh nhọn khi tấn công tháp sẽ tự hút sinh lực hồi máu!'
  },
  CYBER_ZOMBIE_MECH: {
    id: 'CYBER_ZOMBIE_MECH', name: 'Bí Ngô Đầu Lâu Nổ Cảm Tử', vietName: 'Bí Ngô Cảm Tử (Tự Nổ 💥)',
    hp: 850, speed: 0.13, damage: 150, score: 450, color: '#ff7700', isExploder: true, explosionDamage: 250,
    desc: '💥 [SKILL TỰ NỔ]: Ôm khối thuốc nổ ma quái, khi chết phát nổ phá hủy tháp xung quanh!'
  },
  DARK_MATTER_GHOST: {
    id: 'DARK_MATTER_GHOST', name: 'Bóng Ma Hư Vô Ám Ảnh', vietName: 'Bóng Ma Hư Vô (Phản Sát Thương 🔮)',
    hp: 1200, speed: 0.12, damage: 150, score: 550, color: '#7b2cbf', isReflector: true,
    desc: 'Thực thể hắc ám có 25% cơ hội phản hồi lại đạn ma thuật về phía tháp!'
  },
  ROOTKIT_TITAN: {
    id: 'ROOTKIT_TITAN', name: 'Cự Thạch Quan Tài Giáp Sắt', vietName: 'Quan Tài Sắt Cổ (Giáp Trâu 🛡️)',
    hp: 1600, speed: 0.08, damage: 180, score: 600, color: '#6c757d', armorReduction: 0.45,
    desc: 'Khối quan tài bọc giáp sắt kiên cố, giảm 45% toàn bộ sát thương gánh chịu!'
  },
  LOGIC_BOMB_GOLEM: {
    id: 'LOGIC_BOMB_GOLEM', name: 'Quỷ Lửa Dung Nham Tự Nổ', vietName: 'Quỷ Dung Nham (Tự Nổ Cực Đại 💥)',
    hp: 1400, speed: 0.09, damage: 180, score: 650, color: '#ff0054', isExploder: true, explosionDamage: 320,
    desc: '💥 [SKILL TỰ NỔ]: Quỷ lửa dung nham phát nổ cực đại gây 320 DMG hủy diệt!'
  },
  SHADOW_STALKER: {
    id: 'SHADOW_STALKER', name: 'Người Sói Ma Cào Xé', vietName: 'Người Sói Khát Máu (Tốc Độ ⚡)',
    hp: 450, speed: 0.36, damage: 130, score: 450, color: '#240046', isFast: true,
    desc: '⚡ [SKILL TỐC ĐỘ]: Lao tới với tốc độ chớp nhoáng, móng vuốt sắc lẹm xé nát hàng rào!'
  },
  ARMORED_CYBER_CRUSHER: {
    id: 'ARMORED_CYBER_CRUSHER', name: 'Xe Tang Ma Ám Bọc Thép', vietName: 'Xe Tang Ma Ám (Thiết Giáp 🛡️)',
    hp: 2000, speed: 0.07, damage: 220, score: 750, color: '#c9184a', armorReduction: 0.5,
    desc: 'Cỗ xe tang ma kéo bởi xương ngựa, giáp siêu bền nghiền nát mọi chướng ngại!'
  },
  TROJAN_HORSE_CARRIER: {
    id: 'TROJAN_HORSE_CARRIER', name: 'Ngựa Gỗ Ma Ám Chở Xác', vietName: 'Ngựa Ma Chở Binh Đoàn (Carrier 🐴)',
    hp: 1800, speed: 0.09, damage: 160, score: 700, color: '#ffaa00', isCarrier: true,
    desc: 'Cỗ ngựa ma quái chở theo 3 xác sống nhí tràn vào đội hình!'
  },
  ZERO_DAY_EXPLOIT: {
    id: 'ZERO_DAY_EXPLOIT', name: 'Linh Hồn Vô Ảnh Dịch Chuyển', vietName: 'Hồn Ma Dịch Chuyển (Biến Ảo ✨)',
    hp: 950, speed: 0.12, damage: 120, score: 500, color: '#c77dff', isPhaser: true,
    desc: '✨ [SKILL DỊCH CHUYỂN]: Biến mất vào hư vô rồi xuất hiện ngay trước mặt tháp sau mỗi 4s!'
  },
  QUANTUM_SINGULARITY_CORE: {
    id: 'QUANTUM_SINGULARITY_CORE', name: 'Mắt Quỷ Sauron Hắc Ám', vietName: 'Mắt Quỷ Hư Vô Khổng Lồ',
    hp: 2500, speed: 0.07, damage: 220, score: 950, color: '#ff5400',
    desc: 'Nhãn cầu khổng lồ rực lửa địa ngục tích tụ năng lượng hủy diệt!'
  },
  DDOS_OVERLORD: {
    id: 'DDOS_OVERLORD', name: 'Chúa Tể Xác Sống Khổng Lồ', vietName: 'Vua Xác Sống Độc Nhãn (Boss W1 💀)',
    hp: 2400, speed: 0.08, damage: 200, score: 1000, color: '#70e000', isBoss: true,
    desc: 'Trùm Chúa Tể Xác Sống khổng lồ, vung chùy xương nghiền nát phòng tuyến!'
  },
  BOTNET_COMMANDER: {
    id: 'BOTNET_COMMANDER', name: 'Bá Tước Ma Cà Rồng Dracula', vietName: 'Bá Tước Dracula (Boss W2 🧛‍♂️)',
    hp: 4200, speed: 0.07, damage: 260, score: 1500, color: '#c9184a', isBoss: true,
    desc: 'Bá tước Dracula hóa dơi triệu hồi bầy tôi tớ xác sống và tạo khiên máu!'
  },
  QUANTUM_LEVIATHAN: {
    id: 'QUANTUM_LEVIATHAN', name: 'Thần Trùng Cthulhu Vực Sâu', vietName: 'Cthulhu Vực Sâu (Super Boss 🐙)',
    hp: 7500, speed: 0.06, damage: 350, score: 2200, color: '#240046', isSuperBoss: true,
    desc: 'Quái thú thần thoại cổ xưa Cthulhu trườn tới với hàng trăm xúc tu u linh!'
  },
  NEURAL_OVERDRIVE_MEGABOSS: {
    id: 'NEURAL_OVERDRIVE_MEGABOSS', name: 'Thần Chết Tối Thượng Grim Reaper', vietName: 'Thần Chết Tối Thượng (Mega Boss Màn 40 💀)',
    hp: 12000, speed: 0.05, damage: 450, score: 3000, color: '#ff0054', isMegaBoss: true,
    desc: 'Thần Chết Tối Thượng mang lưỡi hái diệt thế và 4 khối cầu linh hồn hủy diệt vạn vật!'
  }
};

// ============================================================================
// TECH UNIT INSTANCE CLASS
// ============================================================================
class TechUnit {
  constructor(type, col, row, grid, upgrades = {}) {
    this.type = type;
    this.col = col;
    this.row = row;
    this.grid = grid;
    this.config = UNIT_TYPES[type] || UNIT_TYPES.ENERGY_CORE;

    let hpMultiplier = 1;
    if (upgrades.shieldStrength && (type === 'NANO_SHIELD' || type === 'DURIAN_SHREDDER' || type === 'PUMPKIN_SHELL')) {
      hpMultiplier = 1.35;
    }

    this.maxHp = this.config.hp * hpMultiplier;
    this.hp = this.maxHp;
    this.x = grid.startX + col * grid.cellW + grid.cellW / 2;
    this.y = grid.startY + row * grid.cellH + grid.cellH / 2;

    this.shootTimer = 0;
    this.shootInterval = this.getShootInterval();
    this.energyTimer = 0;
    this.energyInterval = 8.0;
    this.animTime = Math.random() * 10;
    this.hitFlash = 0;

    // Type specific mechanics
    this.empTimer = 1.2;
    this.exploded = false;
    this.zapTimer = 0;
    this.zapTarget = null;
    this.magnetTimer = 0;
    this.healTimer = 0;
    this.droneSpawnTimer = 0;
  }

  getShootInterval() {
    switch (this.type) {
      case 'GATLING_PEA_CAT': return 0.75;
      case 'LASER_TURRET': return 1.4;
      case 'CRYO_TURRET': return 1.6;
      case 'RAILGUN_CANNON': return 1.5;
      case 'SCATTER_SHOTGUN': return 1.7;
      case 'SNIPER_TURRET': return 2.2;
      case 'PLASMA_MORTAR': return 2.5;
      case 'MISSILE_SILO': return 3.2;
      case 'FLAMETHROWER_TURRET': return 0.5;
      case 'CACTUS_SPIKE': return 1.3;
      case 'SHROOM_PUFF': return 1.1;
      case 'MANGO_BOOMERANG': return 1.8;
      case 'LEMON_VOLT': return 2.0;
      case 'PINEAPPLE_TANK': return 1.2;
      case 'BANANA_LAUNCHER': return 2.8;
      case 'BLUEBERRY_FROST': return 4.5;
      case 'RAINBOW_FUNGUS': return 1.4;
      case 'MYSTIC_DRAGON_PLANT': return 2.2;
      default: return 1.5;
    }
  }

  update(dt, gameState) {
    this.animTime += dt;
    if (this.hitFlash > 0) this.hitFlash -= dt * 5;

    this.isOverclocked = gameState.units.some(u => 
      u.type === 'OVERCLOCK_TOWER' && 
      ((Math.abs(u.col - this.col) === 1 && u.row === this.row) || (Math.abs(u.row - this.row) === 1 && u.col === this.col))
    );

    const speedMultiplier = (this.isOverclocked ? 1.5 : 1.0) * (gameState.upgrades.overclock ? 1.2 : 1.0);
    const effectiveDt = dt * speedMultiplier;

    // 1. Jack-o'-Lantern Soul Core
    if (this.type === 'ENERGY_CORE' || this.type === 'PALM_ENERGY') {
      this.energyTimer += effectiveDt;
      const interval = this.type === 'PALM_ENERGY' ? 6.5 : this.energyInterval;
      if (this.energyTimer >= interval) {
        this.energyTimer = 0;
        const extraEnergy = gameState.upgrades.extraSun ? 25 : 0;
        const orbValue = this.type === 'PALM_ENERGY' ? 100 : (50 + extraEnergy);
        gameState.spawnEnergyOrb(this.x + (Math.random()*20 - 10), this.y - 10, orbValue, false);
      }
    }

    // Contact Shred Damage
    if (this.type === 'DURIAN_SHREDDER') {
      gameState.viruses.forEach(v => {
        if (v.row === this.row && Math.abs(v.x - this.x) < this.grid.cellW * 0.75 && v.hp > 0) {
          v.takeDamage(55 * dt, gameState);
          if (Math.random() < 0.18) {
            gameState.spawnLaserSpark(v.x, v.y, '#fdf0d5');
          }
        }
      });
    }

    // 2. Shooting Towers
    const shootingTypes = [
      'LASER_TURRET', 'GATLING_PEA_CAT', 'CRYO_TURRET', 'RAILGUN_CANNON', 'SCATTER_SHOTGUN', 'SNIPER_TURRET',
      'PLASMA_MORTAR', 'MISSILE_SILO', 'FLAMETHROWER_TURRET', 'CACTUS_SPIKE', 'SHROOM_PUFF',
      'MANGO_BOOMERANG', 'LEMON_VOLT', 'PINEAPPLE_TANK', 'BANANA_LAUNCHER', 'BLUEBERRY_FROST',
      'RAINBOW_FUNGUS', 'MYSTIC_DRAGON_PLANT'
    ];

    if (shootingTypes.includes(this.type)) {
      this.shootTimer += effectiveDt;
      
      let hasTarget = false;
      if (this.type === 'SCATTER_SHOTGUN' || this.type === 'MYSTIC_DRAGON_PLANT') {
        hasTarget = gameState.viruses.some(v => Math.abs(v.row - this.row) <= 1 && v.x > this.x - 10 && v.hp > 0);
      } else {
        hasTarget = gameState.viruses.some(v => v.row === this.row && v.x > this.x - 10 && v.hp > 0);
      }
      
      if (hasTarget && this.shootTimer >= this.shootInterval) {
        this.shootTimer = 0;
        this.fireProjectile(gameState);
      }
    }

    // 3. Doom Pumpkin Bomb
    if (this.type === 'EMP_BOMB') {
      this.empTimer -= dt;
      if (this.empTimer <= 0 && !this.exploded) {
        this.exploded = true;
        this.hp = 0;
        gameState.triggerEMPExplosion(this.col, this.row);
      }
    }

    // 4. Kitsune Reaper Tesla
    if (this.type === 'TESLA_COIL') {
      this.zapTimer += effectiveDt;
      if (this.zapTimer >= 1.2) {
        this.zapTimer = 0;
        const target = gameState.viruses.find(v => v.row === this.row && v.x > this.x && v.x < this.x + this.grid.cellW * 4.5 && v.hp > 0);
        if (target) {
          const dmg = (gameState.upgrades.plasmaPower ? 60 : 45);
          target.takeDamage(dmg, gameState);
          gameState.spawnLaserSpark(target.x, target.y, '#c77dff');
          window.cyberAudio.playLaser(950, 0.08);
          this.zapTarget = { x: target.x, y: target.y, time: 0.15 };
        }
      }
      if (this.zapTarget) {
        this.zapTarget.time -= dt;
        if (this.zapTarget.time <= 0) this.zapTarget = null;
      }
    }

    // 5. Soul Magnet Shroom
    if (this.type === 'MAGNET_SHROOM') {
      this.magnetTimer += effectiveDt;
      if (this.magnetTimer >= 3.0) {
        this.magnetTimer = 0;
        gameState.energyOrbs.forEach(orb => orb.collect());
        const armored = gameState.viruses.find(v => v.config.armorReduction && v.hp > 0);
        if (armored) {
          armored.config.armorReduction = 0;
          gameState.spawnFloatingText(armored.x, armored.y - 20, '🧲 TƯỚC GIÁP!', '#ff0054');
        }
      }
    }

    // 6. Healing Cauldron
    if (this.type === 'NANO_HEALER') {
      this.healTimer += dt;
      if (this.healTimer >= 1.0) {
        this.healTimer = 0;
        gameState.units.forEach(u => {
          if (u !== this && Math.abs(u.col - this.col) <= 1 && Math.abs(u.row - this.row) <= 1) {
            u.hp = Math.min(u.maxHp, u.hp + 80);
            gameState.spawnLaserSpark(u.x, u.y, '#39ff14');
          }
        });
      }
    }

    return this.hp <= 0;
  }

  fireProjectile(gameState) {
    const hasBuff = gameState.units.some(u => u.type === 'TREE_OF_WISDOM');
    const dmgMultiplier = (hasBuff ? 2.0 : 1.0) * (gameState.upgrades.plasmaPower ? 1.25 : 1.0);

    if (this.type === 'LASER_TURRET') {
      gameState.projectiles.push(new Projectile(this.x + 18, this.y, 45 * dmgMultiplier, 'laser', '#9d4edd', this.row));
      window.cyberAudio.playLaser(720, 0.09);
    } else if (this.type === 'GATLING_PEA_CAT') {
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          if (this.hp > 0) {
            gameState.projectiles.push(new Projectile(this.x + 18, this.y, 40 * dmgMultiplier, 'plasma_fast', '#39ff14', this.row));
            window.cyberAudio.playLaser(850 + i * 40, 0.06);
          }
        }, i * 90);
      }
    } else if (this.type === 'CRYO_TURRET') {
      gameState.projectiles.push(new Projectile(this.x + 18, this.y, 35 * dmgMultiplier, 'cryo', '#00f5d4', this.row));
      window.cyberAudio.playCryoShot();
    } else if (this.type === 'RAILGUN_CANNON') {
      gameState.projectiles.push(new Projectile(this.x + 18, this.y - 6, 45 * dmgMultiplier, 'cannon', '#ff7700', this.row));
      setTimeout(() => {
        if (this.hp > 0) {
          gameState.projectiles.push(new Projectile(this.x + 18, this.y + 6, 45 * dmgMultiplier, 'cannon', '#ff7700', this.row));
          window.cyberAudio.playRailgun();
        }
      }, 100);
      window.cyberAudio.playRailgun();
    } else if (this.type === 'SCATTER_SHOTGUN') {
      [-0.15, 0, 0.15].forEach(ang => {
        gameState.projectiles.push(new Projectile(this.x + 18, this.y, 35 * dmgMultiplier, 'corn', '#ffaa00', this.row, ang));
      });
      window.cyberAudio.playShotgun();
    } else if (this.type === 'SNIPER_TURRET') {
      gameState.projectiles.push(new Projectile(this.x + 20, this.y, 90 * dmgMultiplier, 'sniper', '#ff0054', this.row, 0, true));
      window.cyberAudio.playSniper();
    } else if (this.type === 'PLASMA_MORTAR') {
      gameState.projectiles.push(new Projectile(this.x + 12, this.y - 12, 120 * dmgMultiplier, 'mortar', '#c77dff', this.row, 0, false, true));
      window.cyberAudio.playMortar();
    } else if (this.type === 'MISSILE_SILO') {
      gameState.projectiles.push(new Projectile(this.x + 10, this.y - 14, 180 * dmgMultiplier, 'missile', '#ff7700', this.row, 0, false, false, true));
      window.cyberAudio.playMissile();
    } else if (this.type === 'FLAMETHROWER_TURRET') {
      gameState.projectiles.push(new Projectile(this.x + 16, this.y, 40 * dmgMultiplier, 'flame', '#ff5400', this.row));
      window.cyberAudio.playLaser(350, 0.08);
    } else if (this.type === 'SHROOM_PUFF') {
      gameState.projectiles.push(new Projectile(this.x + 14, this.y, 25 * dmgMultiplier, 'spore', '#c77dff', this.row));
      window.cyberAudio.playLaser(980, 0.06);
    } else if (this.type === 'CACTUS_SPIKE') {
      gameState.projectiles.push(new Projectile(this.x + 16, this.y, 30 * dmgMultiplier, 'spike', '#70e000', this.row));
      window.cyberAudio.playLaser(750, 0.07);
    } else if (this.type === 'MANGO_BOOMERANG') {
      gameState.projectiles.push(new Projectile(this.x + 16, this.y, 50 * dmgMultiplier, 'boomerang', '#ffaa00', this.row));
      window.cyberAudio.playShotgun();
    } else if (this.type === 'LEMON_VOLT') {
      gameState.projectiles.push(new Projectile(this.x + 16, this.y, 60 * dmgMultiplier, 'lightning', '#ffea00', this.row));
      window.cyberAudio.playLaser(1100, 0.08);
    } else if (this.type === 'PINEAPPLE_TANK') {
      gameState.projectiles.push(new Projectile(this.x + 16, this.y, 45 * dmgMultiplier, 'spikes_all', '#ffaa00', this.row));
      window.cyberAudio.playShotgun();
    } else if (this.type === 'BANANA_LAUNCHER') {
      gameState.projectiles.push(new Projectile(this.x + 16, this.y - 10, 150 * dmgMultiplier, 'banana_rocket', '#ff7700', this.row, 0, false, true));
      window.cyberAudio.playMissile();
    } else if (this.type === 'BLUEBERRY_FROST') {
      gameState.projectiles.push(new Projectile(this.x + 16, this.y, 80 * dmgMultiplier, 'absolute_zero', '#00f5d4', this.row));
      window.cyberAudio.playCryoShot();
    } else if (this.type === 'RAINBOW_FUNGUS') {
      gameState.projectiles.push(new Projectile(this.x + 16, this.y, 65 * dmgMultiplier, 'rainbow', '#ff0054', this.row));
      window.cyberAudio.playLaser(900, 0.08);
    } else if (this.type === 'MYSTIC_DRAGON_PLANT') {
      [-0.1, 0, 0.1].forEach(ang => {
        gameState.projectiles.push(new Projectile(this.x + 20, this.y, 90 * dmgMultiplier, 'dragon_fire', '#ff5400', this.row, ang));
      });
      window.cyberAudio.playExplosion();
    }
  }

  takeDamage(amount) {
    this.hp -= amount;
    this.hitFlash = 1.0;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    // Hit Flash
    if (this.hitFlash > 0) {
      ctx.fillStyle = `rgba(255, 0, 84, ${this.hitFlash * 0.4})`;
      ctx.beginPath();
      ctx.arc(0, 0, 26, 0, Math.PI * 2);
      ctx.fill();
    }

    // Overclock aura
    if (this.isOverclocked) {
      ctx.strokeStyle = '#39ff14';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(0, 0, 28, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Health Bar
    this.drawHealthBar(ctx);

    // Plant Visual
    this.drawPlantSprite(ctx);

    // Tesla zap effect
    if (this.zapTarget) {
      ctx.strokeStyle = '#c77dff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      const midX = (this.zapTarget.x - this.x) * 0.5;
      const midY = (this.zapTarget.y - this.y) * 0.5 + (Math.random() * 14 - 7);
      ctx.lineTo(midX, midY);
      ctx.lineTo(this.zapTarget.x - this.x, this.zapTarget.y - this.y);
      ctx.stroke();
    }

    ctx.restore();
  }

  drawHealthBar(ctx) {
    if (this.hp >= this.maxHp) return;
    const w = 40;
    const h = 5;
    const pct = Math.max(0, this.hp / this.maxHp);

    ctx.fillStyle = 'rgba(10, 4, 18, 0.75)';
    ctx.beginPath();
    ctx.roundRect(-w/2, -36, w, h, 2.5);
    ctx.fill();

    ctx.fillStyle = pct > 0.5 ? '#39ff14' : pct > 0.25 ? '#ffaa00' : '#ff0054';
    ctx.beginPath();
    ctx.roundRect(-w/2 + 1, -35, Math.max(0, (w - 2) * pct), h - 2, 2);
    ctx.fill();
  }

  drawPlantSprite(ctx) {
    const bob = Math.sin(this.animTime * 3.5) * 2;
    const isBlink = Math.sin(this.animTime * 2.5) > 0.9;
    const squish = Math.sin(this.animTime * 3) * 0.05;

    ctx.save();
    ctx.translate(0, bob);
    ctx.scale(1 + squish, 1 - squish);

    // Try 2D Sprite Rendering First
    if (window.gameAssets && window.gameAssets.drawTowerSprite(ctx, this.type, 58, this.animTime, this.hitFlash)) {
      ctx.restore();
      return;
    }

    if (this.type === 'ENERGY_CORE') {
      // Jack-o'-Lantern Soul Core
      ctx.fillStyle = '#ff7700';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 0, 20, 18, 0, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      // Stem
      ctx.fillStyle = '#38b000';
      ctx.fillRect(-3, -22, 6, 6);
      // Face
      drawJackOLanternFace(ctx, 0, 2, 12, '#ffea00');
      drawKawaiiBlush(ctx, 0, 4, 11, 3.5);

    } else if (this.type === 'LASER_TURRET') {
      // Witch Cat Blaster
      ctx.fillStyle = '#240046';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.roundRect(-18, -14, 36, 30, 14);
      ctx.fill(); ctx.stroke();
      drawKawaiiCatEars(ctx, 0, -14, 8, '#240046', '#c77dff');
      drawWitchHat(ctx, 0, -18, 10, '#10002b', '#ff7700');
      drawKawaiiEyes(ctx, 0, -2, 6, 3.5, isBlink, '#c77dff');
      drawKawaiiBlush(ctx, 0, 3, 9, 3.5);
      drawKawaiiMouth(ctx, 0, 4, 'cat', '#c77dff');

    } else if (this.type === 'NANO_SHIELD') {
      // Haunted Tombstone Golem
      ctx.fillStyle = '#6c757d';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-20, -22, 40, 44, [16, 16, 4, 4]);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#240046';
      ctx.font = '700 12px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('R.I.P', 0, -6);
      drawKawaiiEyes(ctx, 0, 6, 6, 3.5, isBlink, '#ffaa00');
      drawKawaiiBlush(ctx, 0, 12, 9, 3);
      drawKawaiiMouth(ctx, 0, 12, 'smile', '#ffaa00');

    } else if (this.type === 'CRYO_TURRET') {
      // Frost Banshee Ghost
      ctx.fillStyle = '#00f5d4';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, -8, 16, Math.PI, 0, false);
      ctx.lineTo(16, 16); ctx.lineTo(8, 10); ctx.lineTo(0, 16); ctx.lineTo(-8, 10); ctx.lineTo(-16, 16);
      ctx.closePath();
      ctx.fill(); ctx.stroke();
      drawKawaiiEyes(ctx, 0, -6, 5, 3.5, isBlink, '#240046');
      drawKawaiiBlush(ctx, 0, 0, 8, 3.5);
      drawKawaiiMouth(ctx, 0, 1, 'open', '#240046');

    } else if (this.type === 'EMP_BOMB') {
      // Doom Pumpkin Bomb
      ctx.fillStyle = '#ff0054';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 19, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      drawJackOLanternFace(ctx, 0, 0, 13, '#ffea00');
      // Spark fuse
      ctx.strokeStyle = '#ffaa00';
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(0, -19); ctx.lineTo(4, -26); ctx.stroke();

    } else if (this.type === 'GATLING_PEA_CAT') {
      // Gatling Reaper Cat
      ctx.fillStyle = '#39ff14';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.roundRect(-18, -14, 36, 30, 14);
      ctx.fill(); ctx.stroke();
      drawKawaiiCatEars(ctx, 0, -14, 8, '#240046', '#39ff14');
      // 4 barrels
      ctx.fillStyle = '#ff7700';
      [-8, -3, 3, 8].forEach(by => {
        ctx.fillRect(16, by, 8, 4);
      });
      drawKawaiiEyes(ctx, 0, -2, 6, 3.5, isBlink, '#240046');
      drawKawaiiBlush(ctx, 0, 3, 9, 3.5);
      drawKawaiiMouth(ctx, 0, 4, 'fangs');

    } else if (this.type === 'TESLA_COIL') {
      // Ghost Kitsune
      ctx.fillStyle = '#c77dff';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.ellipse(0, 0, 18, 16, 0, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      drawKawaiiCatEars(ctx, 0, -12, 10, '#9d4edd', '#00f5d4');
      drawKawaiiEyes(ctx, 0, -2, 6, 3.5, isBlink, '#240046');
      drawKawaiiBlush(ctx, 0, 3, 9, 3.5);
      drawKawaiiMouth(ctx, 0, 4, 'cat');

    } else {
      // Generic Halloween Cute Tower
      ctx.fillStyle = this.config.color || '#ff7700';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-18, -16, 36, 34, 14);
      ctx.fill(); ctx.stroke();
      drawWitchHat(ctx, 0, -18, 8, '#240046', '#ff7700');
      drawKawaiiEyes(ctx, 0, -2, 6, 3.5, isBlink, '#12041e');
      drawKawaiiBlush(ctx, 0, 3, 9, 3.5);
      drawKawaiiMouth(ctx, 0, 4, 'smile');
    }

    ctx.restore();
  }
}

// ============================================================================
// HALLOWEEN HORROR MONSTER ENEMY CLASS
// ============================================================================
class VirusEnemy {
  constructor(type, row, grid) {
    this.type = type;
    this.row = row;
    this.grid = grid;
    this.config = VIRUS_TYPES[type] || VIRUS_TYPES.TROJAN_BUG;

    this.maxHp = this.config.hp;
    this.hp = this.maxHp;
    this.speed = this.config.speed;
    this.damage = this.config.damage;
    this.x = grid.startX + grid.cols * grid.cellW + 40;
    this.y = grid.startY + row * grid.cellH + grid.cellH / 2;

    this.animTime = Math.random() * 10;
    this.slowTimer = 0;
    this.freezeTimer = 0;
    this.stunTimer = 0;
    this.hitFlash = 0;
    this.isEating = false;
    this.eatTarget = null;
    this.hasVaulted = false;
  }

  update(dt, gameState) {
    this.animTime += dt;
    if (this.hitFlash > 0) this.hitFlash -= dt * 5;
    if (this.freezeTimer > 0) {
      this.freezeTimer -= dt;
      return false;
    }
    if (this.stunTimer > 0) {
      this.stunTimer -= dt;
      return false;
    }

    const currentSpeed = this.speed * (this.slowTimer > 0 ? 0.45 : 1.0);
    if (this.slowTimer > 0) this.slowTimer -= dt;

    // Check eating plant target
    const targetPlant = gameState.units.find(u => 
      u.row === this.row && Math.abs(u.x - this.x) < this.grid.cellW * 0.65 && u.hp > 0
    );

    if (targetPlant) {
      this.isEating = true;
      this.eatTarget = targetPlant;

      // Fast Sprinter vaults once over first plant
      if (this.config.isFast && !this.hasVaulted) {
        this.hasVaulted = true;
        this.x -= this.grid.cellW * 1.2;
        gameState.spawnLaserSpark(this.x, this.y, '#ff0054');
        return false;
      }

      targetPlant.takeDamage(this.damage * dt);
      if (Math.random() < 0.25) {
        gameState.spawnLaserSpark(targetPlant.x, targetPlant.y, '#ff0054');
      }

      if (targetPlant.hp <= 0) {
        this.isEating = false;
        this.eatTarget = null;
      }
    } else {
      this.isEating = false;
      this.eatTarget = null;
      this.x -= currentSpeed * 75 * dt;
    }

    return this.hp <= 0;
  }

  takeDamage(amount, gameState) {
    const finalDmg = this.config.armorReduction ? amount * (1 - this.config.armorReduction) : amount;
    this.hp -= finalDmg;
    this.hitFlash = 1.0;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    // Hit Flash
    if (this.hitFlash > 0) {
      ctx.fillStyle = `rgba(255, 255, 255, ${this.hitFlash * 0.6})`;
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.fill();
    }

    // Health Bar
    this.drawHealthBar(ctx);

    // Draw Monster Sprite
    this.drawVirusSprite(ctx);

    ctx.restore();
  }

  drawHealthBar(ctx) {
    if (this.hp >= this.maxHp) return;
    const w = 38;
    const h = 5;
    const pct = Math.max(0, this.hp / this.maxHp);

    ctx.fillStyle = 'rgba(10, 4, 18, 0.75)';
    ctx.beginPath();
    ctx.roundRect(-w/2, -36, w, h, 2);
    ctx.fill();

    ctx.fillStyle = '#ff0054';
    ctx.beginPath();
    ctx.roundRect(-w/2 + 1, -35, Math.max(0, (w - 2) * pct), h - 2, 2);
    ctx.fill();
  }

  drawVirusSprite(ctx) {
    const bob = Math.sin(this.animTime * 4) * 2.5;
    const squish = Math.sin(this.animTime * 3) * 0.08;

    ctx.save();
    ctx.translate(0, bob);
    ctx.scale(1 + squish, 1 - squish);

    // Try 2D Zombie Sprite Rendering First
    if (window.gameAssets && window.gameAssets.drawZombieSprite(ctx, this.type, this.config.isBoss ? 88 : 70, this.animTime, this.hitFlash, this.isEating)) {
      ctx.restore();
      return;
    }

    if (this.config.isBoss || this.config.isSuperBoss || this.config.isMegaBoss) {
      // Giant Boss Monster (Dracula / Reaper / Cthulhu)
      ctx.fillStyle = this.config.color || '#ff0054';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(-26, -26, 52, 52, 20);
      ctx.fill(); ctx.stroke();
      drawWitchHat(ctx, 0, -28, 14, '#240046', '#ff0054');
      drawSpookyBatWings(ctx, 0, 0, 26, '#10002b');
      drawKawaiiEyes(ctx, 0, -4, 9, 5, false, '#ffea00');
      drawKawaiiMouth(ctx, 0, 6, 'fangs', '#ffea00');

    } else if (this.config.isFlying) {
      // Vampire Bat
      ctx.fillStyle = '#240046';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.8;
      drawSpookyBatWings(ctx, 0, 0, 20, '#10002b');
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      drawKawaiiEyes(ctx, 0, -2, 4.5, 3, false, '#ff0054');
      drawKawaiiMouth(ctx, 0, 3, 'fangs', '#ffffff');

    } else {
      // Zombie Slime Monster
      ctx.fillStyle = this.config.color || '#70e000';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(0, -2, 16, Math.PI, 0, false);
      ctx.lineTo(16, 14); ctx.lineTo(8, 10); ctx.lineTo(0, 14); ctx.lineTo(-8, 10); ctx.lineTo(-16, 14);
      ctx.closePath();
      ctx.fill(); ctx.stroke();
      drawKawaiiEyes(ctx, 0, -4, 5.5, 3.5, false, '#240046');
      drawKawaiiMouth(ctx, 0, 3, 'fangs', '#240046');
    }

    ctx.restore();
  }
}

// ============================================================================
// HALLOWEEN JACK-O'-LANTERN SOUL WISP (ENERGY ORB)
// ============================================================================
class EnergyOrb {
  constructor(x, y, value = 50, isSkyDrop = false, targetY = 0) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.isSkyDrop = isSkyDrop;
    this.targetY = targetY || y;
    this.speed = 90;
    this.radius = 22;
    this.life = 12;
    this.collected = false;
    this.collectSpeed = 900;
    this.animTime = Math.random() * 10;
  }

  update(dt, gameState) {
    this.animTime += dt;

    if (this.collected) {
      const targetX = 60;
      const targetY = 45;
      const dx = targetX - this.x;
      const dy = targetY - this.y;
      const dist = Math.hypot(dx, dy);

      if (dist < 30) {
        gameState.addEnergy(this.value);
        window.cyberAudio.playEnergyCollect();
        return true;
      }

      this.x += (dx / dist) * this.collectSpeed * dt;
      this.y += (dy / dist) * this.collectSpeed * dt;
      return false;
    }

    if (this.isSkyDrop && this.y < this.targetY) {
      this.y += this.speed * dt;
    }

    this.life -= dt;
    return this.life <= 0;
  }

  collect() {
    if (!this.collected) {
      this.collected = true;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    const pulse = Math.sin(this.animTime * 5) * 0.08 + 1;
    const wingFlap = Math.sin(this.animTime * 8) * 0.25;
    ctx.scale(pulse, pulse);

    // Spooky Bat Wings
    drawSpookyBatWings(ctx, 0, 0, 16, '#240046');

    // Glowing Jack-o'-Lantern Soul Wisp
    ctx.fillStyle = '#ff9e00';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#ff7700';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    // Stem
    ctx.fillStyle = '#38b000';
    ctx.fillRect(-2, -18, 4, 4);

    // Face
    drawJackOLanternFace(ctx, 0, 1, 9, '#ffea00');

    ctx.restore();
  }
}

// ============================================================================
// HALLOWEEN PROJECTILE CLASS
// ============================================================================
class Projectile {
  constructor(x, y, damage, type = 'laser', color = '#9d4edd', row = 0, angle = 0, isPiercing = false, isMortar = false, isHoming = false) {
    this.x = x;
    this.y = y;
    this.damage = damage;
    this.type = type;
    this.color = color;
    this.row = row;
    this.angle = angle;
    this.isPiercing = isPiercing;
    this.isMortar = isMortar;
    this.isHoming = isHoming;

    this.speed = isMortar ? 260 : isHoming ? 420 : 540;
    this.radius = isMortar ? 10 : 7;
    this.life = 4.0;
    this.hitEnemies = new Set();
    this.mortarTime = 0;
    this.startY = y;
  }

  update(dt, gameState) {
    this.life -= dt;
    if (this.life <= 0) return true;

    if (this.isMortar) {
      this.mortarTime += dt;
      this.x += this.speed * dt;
      this.y = this.startY - Math.sin(this.mortarTime * Math.PI) * 60;
    } else if (this.angle !== 0) {
      this.x += Math.cos(this.angle) * this.speed * dt;
      this.y += Math.sin(this.angle) * this.speed * dt;
    } else {
      this.x += this.speed * dt;
    }

    // Check collision with monsters
    for (const virus of gameState.viruses) {
      if (virus.hp <= 0) continue;
      if (this.hitEnemies.has(virus)) continue;

      const isSameRow = (virus.row === this.row || Math.abs(virus.y - this.y) < 30);
      if (isSameRow && Math.abs(virus.x - this.x) < 30) {
        virus.takeDamage(this.damage, gameState);
        gameState.spawnLaserSpark(virus.x, virus.y, this.color);
        window.cyberAudio.playHit();

        if (this.type === 'cryo' || this.type === 'absolute_zero') {
          virus.slowTimer = 3.5;
        }

        if (this.isPiercing) {
          this.hitEnemies.add(virus);
        } else {
          return true; // Destroy projectile
        }
      }
    }

    return this.x > gameState.canvas.width + 50;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 8;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    ctx.restore();
  }
}

// ============================================================================
// FIREWALL SCANNER (SPOOKY WITCH BROOM / REAPER CART)
// ============================================================================
class FirewallScanner {
  constructor(row, grid) {
    this.row = row;
    this.grid = grid;
    this.x = grid.startX - grid.cellW * 0.65;
    this.y = grid.startY + row * grid.cellH + grid.cellH / 2;
    this.triggered = false;
    this.speed = 700;
    this.animTime = 0;
  }

  trigger() {
    if (!this.triggered) {
      this.triggered = true;
      window.cyberAudio.playScannerLaunch();
    }
  }

  update(dt, gameState) {
    this.animTime += dt;

    if (this.triggered) {
      this.x += this.speed * dt;

      for (const virus of gameState.viruses) {
        if (virus.row === this.row && virus.hp > 0) {
          if (Math.abs(this.x - virus.x) < 45) {
            virus.hp = 0;
            gameState.onVirusKilled(virus);
            gameState.spawnLaserSpark(virus.x, virus.y, '#ff0054');
          }
        }
      }

      return this.x > gameState.canvas.width + 100;
    }
    return false;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    // Spooky Jack-o'-Lantern Cleaner
    ctx.fillStyle = '#ff7700';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
    drawJackOLanternFace(ctx, 0, 0, 10, '#ffea00');

    ctx.restore();
  }
}

// ============================================================================
// PARTICLES & FLOATING TEXTS
// ============================================================================
class Particle {
  constructor(x, y, vx, vy, color, life, size) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.life = life;
    this.maxLife = life;
    this.size = size;
  }

  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.life -= dt;
    return this.life <= 0;
  }

  draw(ctx) {
    const pct = Math.max(0, this.life / this.maxLife);
    ctx.save();
    ctx.globalAlpha = pct;
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * pct, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class FloatingText {
  constructor(x, y, text, color = '#ffffff') {
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color;
    this.life = 1.2;
    this.maxLife = 1.2;
  }

  update(dt) {
    this.y -= 30 * dt;
    this.life -= dt;
    return this.life <= 0;
  }

  draw(ctx) {
    const pct = Math.max(0, this.life / this.maxLife);
    ctx.save();
    ctx.globalAlpha = pct;
    ctx.fillStyle = this.color;
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 4;
    ctx.font = '700 14px Fredoka, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.text, this.x, this.y);
    ctx.restore();
  }
}

// Global exports for browser compatibility
if (typeof window !== 'undefined') {
  window.UNIT_TYPES = UNIT_TYPES;
  window.VIRUS_TYPES = VIRUS_TYPES;
  window.TechUnit = TechUnit;
  window.VirusEnemy = VirusEnemy;
  window.EnergyOrb = EnergyOrb;
  window.FirewallScanner = FirewallScanner;
  window.Projectile = Projectile;
  window.Particle = Particle;
  window.FloatingText = FloatingText;
}
