/**
 * CYBER CUTIES: Plants vs Slimes - Entities & Renderers v7.0
 * 40 Unique Cute Plants & 25 Diverse Slime Monsters with Full Procedural Canvas Renderers
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
// KAWAII DRAWING UTILS
// ============================================================================
function drawKawaiiEyes(ctx, x, y, spacing, eyeRadius = 3.5, isBlinking = false, eyeColor = '#241432', sparkle = true) {
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

function drawKawaiiBlush(ctx, x, y, spacing, blushRadius = 4, color = 'rgba(255, 112, 166, 0.65)') {
  ctx.save();
  ctx.fillStyle = color;
  [-spacing, spacing].forEach(offsetX => {
    ctx.beginPath();
    ctx.ellipse(x + offsetX, y, blushRadius, blushRadius * 0.65, 0, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
}

function drawKawaiiMouth(ctx, x, y, type = 'smile', color = '#241432') {
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
    ctx.fillStyle = '#ff70a6';
    ctx.beginPath();
    ctx.arc(x, y + 1.5, 2.5, 0, Math.PI);
    ctx.fill();
  }
  ctx.restore();
}

function drawKawaiiBow(ctx, x, y, size = 6, color = '#ff70a6') {
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
  ctx.fillStyle = '#ffe066';
  ctx.beginPath();
  ctx.arc(x, y, size * 0.38, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  ctx.restore();
}

function drawKawaiiStarCrown(ctx, x, y, size = 8) {
  ctx.save();
  ctx.fillStyle = '#ffbe0b';
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(x - size, y);
  ctx.lineTo(x - size, y - size * 0.8);
  ctx.lineTo(x - size * 0.4, y - size * 0.4);
  ctx.lineTo(x, y - size * 1.2);
  ctx.lineTo(x + size * 0.4, y - size * 0.4);
  ctx.lineTo(x + size, y - size * 0.8);
  ctx.lineTo(x + size, y);
  ctx.closePath();
  ctx.fill(); ctx.stroke();
  ctx.restore();
}

// ============================================================================
// 40 UNIQUE CUTE PLANTS / TECH UNITS
// ============================================================================
const UNIT_TYPES = {
  // World 1: 1 - 10
  ENERGY_CORE: {
    id: 'ENERGY_CORE', name: 'Sunflower Star', vietName: 'Bé Hướng Dương Nắng',
    cost: 50, cooldown: 5, hp: 350, unlockLevel: 0,
    role: 'Tạo Năng Lượng (+50⭐)', desc: 'Tươi cười tỏa sáng rơi ra các Ngôi Sao Năng Lượng kẹo ngọt!',
    color: '#fbbf24', accent: '#f59e0b'
  },
  LASER_TURRET: {
    id: 'LASER_TURRET', name: 'Neko Pea Bot', vietName: 'Bé Mèo Đậu Thần',
    cost: 100, cooldown: 5, hp: 350, unlockLevel: 1,
    role: 'Bắn Đậu Plasma (45 DMG)', desc: 'Bé Mèo đeo nơ hồng bắn tia kẹo sao năng lượng thẳng hàng!',
    color: '#38bdf8', accent: '#ff70a6'
  },
  GATLING_PEA_CAT: {
    id: 'GATLING_PEA_CAT', name: 'Gatling Neko Pea', vietName: 'Bé Mèo Gatling 4 Nòng',
    cost: 175, cooldown: 7, hp: 400, unlockLevel: 0,
    role: 'Bắn 4 Viên Đạn Siêu Tốc (160 DMG)', desc: 'Bé Mèo đội mũ phi công bắn liền 4 viên đạn plasma xé tan mọi quái trâu máu!',
    color: '#22c55e', accent: '#fbbf24'
  },
  DURIAN_SHREDDER: {
    id: 'DURIAN_SHREDDER', name: 'Durian Armor Shredder', vietName: 'Bé Sầu Riêng Gai Nổ',
    cost: 75, cooldown: 10, hp: 4500, unlockLevel: 0,
    role: 'Khiên Gai 4500 HP (45 DMG/s)', desc: 'Lớp gai sầu riêng sắc nhọn vừa chắn đường vừa xé toạc lớp giáp của quái trâu!',
    color: '#a3e635', accent: '#65a30d'
  },
  NANO_SHIELD: {
    id: 'NANO_SHIELD', name: 'Jelly Wallnut', vietName: 'Bé Khoai Tây Giáp Dẻo',
    cost: 50, cooldown: 15, hp: 4500, unlockLevel: 2,
    role: 'Khiên Dẻo 4500 HP', desc: 'Bé Khoai Tây dẻo mềm núng nính ôm khiên tim chặn đứng quái!',
    color: '#4ade80', accent: '#10b981'
  },
  CRYO_TURRET: {
    id: 'CRYO_TURRET', name: 'Penguin Frost', vietName: 'Bé Cánh Cụt Băng Tuyết',
    cost: 150, cooldown: 6, hp: 350, unlockLevel: 3,
    role: 'Bắn Băng Giảm 60% Tốc Độ', desc: 'Bé Cánh Cụt quàng khăn len bắn hoa tuyết làm chậm quái!',
    color: '#70d6ff', accent: '#ffffff'
  },
  EMP_BOMB: {
    id: 'EMP_BOMB', name: 'Cherry Heart', vietName: 'Bé Cherry Trái Tim Nổ',
    cost: 125, cooldown: 25, hp: 600, unlockLevel: 4,
    role: 'Nổ Trái Tim 3x3 (2200 DMG)', desc: 'Bé Cherry má hồng tròn vo phát nổ thành ngàn trái tim 💖!',
    color: '#ff5d8f', accent: '#ff85a2'
  },
  RAILGUN_CANNON: {
    id: 'RAILGUN_CANNON', name: 'Bunny Dual Cannon', vietName: 'Bé Thỏ Pháo Kép Cuti',
    cost: 175, cooldown: 7, hp: 400, unlockLevel: 5,
    role: 'Bắn x2 Kẹo Mút (90 DMG)', desc: 'Bé Thỏ đeo kính phi công bắn liền 2 phát kẹo mút uy lực!',
    color: '#fb923c', accent: '#f97316'
  },
  TESLA_COIL: {
    id: 'TESLA_COIL', name: 'Sparkle Kitsune', vietName: 'Bé Cáo Hồ Ly Sấm Sét',
    cost: 125, cooldown: 10, hp: 400, unlockLevel: 6,
    role: 'Giật Sét Cầu Vồng', desc: 'Phát sóng điện dạ quang giật liên tục vào đàn quái slime!',
    color: '#c084fc', accent: '#38bdf8'
  },
  SCATTER_SHOTGUN: {
    id: 'SCATTER_SHOTGUN', name: 'Corn Tri-Scatter', vietName: 'Bé Bắp Ngô Bắn 3 Làn',
    cost: 150, cooldown: 8, hp: 320, unlockLevel: 7,
    role: 'Bắn Tỏa 3 Làn', desc: 'Bắn chùm hạt bắp kẹo tỏa góc nhọn sang cả làn trên và dưới!',
    color: '#facc15', accent: '#ea580c'
  },
  SNIPER_TURRET: {
    id: 'SNIPER_TURRET', name: 'Bamboo Heart Sniper', vietName: 'Bé Măng Tre Bắn Tỉa Xuyên',
    cost: 175, cooldown: 10, hp: 300, unlockLevel: 8,
    role: 'Xuyên Thấu Cả Hàng (90 DMG)', desc: 'Bắn mũi tên tre tình yêu xuyên qua mọi quái vật trên làn!',
    color: '#f43f5e', accent: '#ffffff'
  },
  NANO_HEALER: {
    id: 'NANO_HEALER', name: 'Sakura Fairy', vietName: 'Bé Hoa Anh Đào Hồi Máu',
    cost: 75, cooldown: 12, hp: 350, unlockLevel: 9,
    role: 'Hồi 150 HP Xung Quanh', desc: 'Vỗ cánh hoa anh đào phóng sóng tim 💖 hồi phục máu cho đồng đội!',
    color: '#34d399', accent: '#059669'
  },
  DRONE_HIVE: {
    id: 'DRONE_HIVE', name: 'Honeybee Swarm', vietName: 'Bé Tổ Ong Mật Mini-Bee',
    cost: 225, cooldown: 12, hp: 350, unlockLevel: 10,
    role: '2 Bé Ong Bay Tự Động', desc: 'Thả 2 bé Ong Vàng má hồng bay tuần tra bắn tỉa tự động!',
    color: '#a3e635', accent: '#38bdf8'
  },

  // World 2: 11 - 20
  FLAMETHROWER_TURRET: {
    id: 'FLAMETHROWER_TURRET', name: 'Chili Fire Pepper', vietName: 'Bé Ớt Hiểm Lửa Đỏ',
    cost: 175, cooldown: 10, hp: 350, unlockLevel: 11,
    role: 'Phun Lửa Thiêu Đốt Cận Chiến', desc: 'Bé Ớt phồng má phun luồng lửa kẹo thiêu đốt quái 2.5 ô!',
    color: '#ef4444', accent: '#f59e0b'
  },
  PLASMA_MORTAR: {
    id: 'PLASMA_MORTAR', name: 'Watermelon Mortar', vietName: 'Bé Dưa Hấu Cầu Vồng',
    cost: 175, cooldown: 9, hp: 320, unlockLevel: 12,
    role: 'Bắn Rót Cầu Vồng Nổ Lan', desc: 'Bắn quả dưa hấu kẹo ngọt bay vòng cung nổ lan nát giáp!',
    color: '#f472b6', accent: '#fbbf24'
  },
  FORCE_REPELLER: {
    id: 'FORCE_REPELLER', name: 'Whirlwind Shroom', vietName: 'Bé Nấm Gió Xoáy Đẩy Lùi',
    cost: 100, cooldown: 12, hp: 400, unlockLevel: 13,
    role: 'Thổi Gió Đẩy Lùi Quái 1.5 Ô', desc: 'Bé Nấm thổi luồng gió xoáy ngũ sắc đẩy lùi quái slime!',
    color: '#38bdf8', accent: '#6366f1'
  },
  MISSILE_SILO: {
    id: 'MISSILE_SILO', name: 'Radish Carrot Pod', vietName: 'Bé Củ Cải Tên Lửa Homing',
    cost: 250, cooldown: 14, hp: 380, unlockLevel: 14,
    role: 'Tên Lửa Đuổi Quái Trâu Nhất', desc: 'Phóng tên lửa củ cải tự tìm quái trâu máu nhất để phát nổ!',
    color: '#fb923c', accent: '#facc15'
  },
  BLACK_HOLE: {
    id: 'BLACK_HOLE', name: 'Cosmic Kitty Vortex', vietName: 'Bé Hố Đen Mèo Vũ Trụ',
    cost: 275, cooldown: 25, hp: 600, unlockLevel: 15,
    role: 'Hút Gom Quái 3x3', desc: 'Tạo lốc xoáy ngân hà tai mèo hút toàn bộ quái slime vào tâm!',
    color: '#8b5cf6', accent: '#ec4899'
  },
  CACTUS_SPIKE: {
    id: 'CACTUS_SPIKE', name: 'Cactus Spike Shield', vietName: 'Bé Xương Rồng Gai Phản Đòn',
    cost: 125, cooldown: 10, hp: 1200, unlockLevel: 16,
    role: 'Bắn Gai & Phản Sát Thương', desc: 'Bắn gai nhọn liên tục và phản 50% sát thương khi quái cắn!',
    color: '#22c55e', accent: '#eab308'
  },
  COCONUT_BOWLING: {
    id: 'COCONUT_BOWLING', name: 'Coconut Bowling Roller', vietName: 'Bé Dừa Lăn Khổng Lồ',
    cost: 150, cooldown: 18, hp: 800, unlockLevel: 17,
    role: 'Lăn Đè Bẹp Quái Toàn Làn', desc: 'Lăn một quả dừa bowling khổng lồ đè bẹp mọi quái trên làn!',
    color: '#854d0e', accent: '#fef08a'
  },
  TIME_WARP_PYLON: {
    id: 'TIME_WARP_PYLON', name: 'Dream Hourglass', vietName: 'Bé Đồng Hồ Cát Mộng Mơ',
    cost: 200, cooldown: 18, hp: 350, unlockLevel: 18,
    role: 'Ngưng Đọng Thời Gian', desc: 'Phóng bụi sao mộng mơ đóng băng thời gian quái toàn hàng!',
    color: '#a855f7', accent: '#38bdf8'
  },
  MAGNET_SHROOM: {
    id: 'MAGNET_SHROOM', name: 'Magnet Star Shroom', vietName: 'Bé Nấm Nam Châm Hút Sao',
    cost: 125, cooldown: 12, hp: 450, unlockLevel: 19,
    role: 'Hút Sao & Tước Giáp Quái', desc: 'Tự động hút toàn bộ Ngôi Sao Năng Lượng và tước giáp quái!',
    color: '#ec4899', accent: '#38bdf8'
  },
  ORBITAL_STRIKE_BEACON: {
    id: 'ORBITAL_STRIKE_BEACON', name: 'Starlight Bunny Beacon', vietName: 'Bé Thỏ Ngắm Sao Vệ Tinh',
    cost: 300, cooldown: 30, hp: 400, unlockLevel: 20,
    role: 'Mưa Sao Băng Cực Đại', desc: 'Triệu hồi mưa sao băng kẹo ngọt rực rỡ (2500 DMG)!',
    color: '#ec4899', accent: '#fbbf24'
  },

  // World 3: 21 - 40
  POISON_ONION: {
    id: 'POISON_ONION', name: 'Stun Sweet Onion', vietName: 'Bé Hành Tây Làm Choáng',
    cost: 100, cooldown: 10, hp: 400, unlockLevel: 21,
    role: 'Phun Sương Làm Choáng 3s', desc: 'Phun sương kẹo ngọt ngào làm choáng quái và gây độc liên tục!',
    color: '#e879f9', accent: '#a855f7'
  },
  GARLIC_DIVERT: {
    id: 'GARLIC_DIVERT', name: 'Garlic Lane Divert', vietName: 'Bé Tỏi Cản Đường Đổi Làn',
    cost: 50, cooldown: 8, hp: 1000, unlockLevel: 22,
    role: 'Khiến Quái Đổi Làn', desc: 'Quái cắn phải sẽ nhăn mặt và lập tức đổi sang làn bên cạnh!',
    color: '#fef08a', accent: '#9ca3af'
  },
  SHROOM_PUFF: {
    id: 'SHROOM_PUFF', name: 'Mini Shroom Puff', vietName: 'Bé Nấm Nhí Bào Tử Siêu Rẻ',
    cost: 25, cooldown: 4, hp: 200, unlockLevel: 23,
    role: 'Bắn Bào Tử Giá Rẻ (25⭐)', desc: 'Bé nấm nhí cực rẻ bắn chùm bào tử tím cự ly gần!',
    color: '#c084fc', accent: '#e879f9'
  },
  LOTUS_REFLECTOR: {
    id: 'LOTUS_REFLECTOR', name: 'Lotus Frost Shield', vietName: 'Bé Hoa Sen Phản Chiếu',
    cost: 125, cooldown: 14, hp: 2500, unlockLevel: 24,
    role: 'Khiên Phản 50% DMG', desc: 'Tạo cánh hoa sen phản ngược 50% sát thương về phía quái!',
    color: '#f472b6', accent: '#70d6ff'
  },
  PUMPKIN_SHELL: {
    id: 'PUMPKIN_SHELL', name: 'Pumpkin Armor Shell', vietName: 'Bé Bí Ngô Bọc Giáp Bảo Vệ',
    cost: 125, cooldown: 15, hp: 4000, unlockLevel: 25,
    role: 'Bọc Giáp 4000 HP Cây Khác', desc: 'Lồng giáp bí ngô bọc bên ngoài bảo vệ bé cây bên trong!',
    color: '#f97316', accent: '#facc15'
  },
  GRAPE_CLUSTER: {
    id: 'GRAPE_CLUSTER', name: 'Grape Cluster Bomb', vietName: 'Bé Chùm Nho Nổ 8 Hạt',
    cost: 150, cooldown: 20, hp: 300, unlockLevel: 26,
    role: 'Nổ Tách 8 Hạt Xung Quanh', desc: 'Phát nổ văng 8 viên đạn nho kẹo ra 8 hướng dọn quái!',
    color: '#9333ea', accent: '#c084fc'
  },
  AVOCADO_RAM: {
    id: 'AVOCADO_RAM', name: 'Avocado Ram Fighter', vietName: 'Bé Bơ Húc Lực Sĩ',
    cost: 175, cooldown: 12, hp: 600, unlockLevel: 27,
    role: 'Húc Văng Quái Lùi 2 Ô', desc: 'Bật nhảy húc văng quái slime với uy lực cực đại!',
    color: '#84cc16', accent: '#65a30d'
  },
  MANGO_BOOMERANG: {
    id: 'MANGO_BOOMERANG', name: 'Mango Boomerang', vietName: 'Bé Xoài Boomerang 2 Lượt',
    cost: 175, cooldown: 8, hp: 350, unlockLevel: 28,
    role: 'Ném Boomerang Đánh x2', desc: 'Ném quả xoài bay đi và bay về đánh trúng quái 2 lần liên tiếp!',
    color: '#facc15', accent: '#f97316'
  },
  LEMON_VOLT: {
    id: 'LEMON_VOLT', name: 'Lemon Thunder Volt', vietName: 'Bé Chanh Sét Liên Hoàn',
    cost: 200, cooldown: 10, hp: 380, unlockLevel: 29,
    role: 'Phóng Điện Giật 4 Quái', desc: 'Phóng tia chớp chanh chua giật liên hoàn 4 quái slime cùng lúc!',
    color: '#fef08a', accent: '#eab308'
  },
  PINEAPPLE_TANK: {
    id: 'PINEAPPLE_TANK', name: 'Pineapple Gatling', vietName: 'Bé Dứa Gai Thiết Giáp',
    cost: 225, cooldown: 12, hp: 800, unlockLevel: 30,
    role: 'Bắn Gai Liên Thanh 4 Hướng', desc: 'Bé Dứa giáp cứng xả mưa gai kẹo liên thanh càn quét quái!',
    color: '#eab308', accent: '#84cc16'
  },
  BANANA_LAUNCHER: {
    id: 'BANANA_LAUNCHER', name: 'Banana Rocket Launcher', vietName: 'Bé Chuối Đại Bác Tầm Xa',
    cost: 250, cooldown: 14, hp: 400, unlockLevel: 31,
    role: 'Phóng Chuối Nổ 150 DMG', desc: 'Bắn đại bác quả chuối tầm xa nổ diện rộng cực mạnh!',
    color: '#fde047', accent: '#ca8a04'
  },
  BLUEBERRY_FROST: {
    id: 'BLUEBERRY_FROST', name: 'Blueberry Absolute Zero', vietName: 'Bé Việt Quất Băng Tuyệt Đối',
    cost: 225, cooldown: 22, hp: 350, unlockLevel: 32,
    role: 'Đóng Băng Cứng 5s', desc: 'Biến quái thành tượng băng tuyết hoàn toàn trong 5 giây!',
    color: '#3b82f6', accent: '#60a5fa'
  },
  KIWI_SPIKETRAP: {
    id: 'KIWI_SPIKETRAP', name: 'Kiwi Spike Trap', vietName: 'Bé Kiwi Bẫy Đinh Đất',
    cost: 100, cooldown: 10, hp: 1500, unlockLevel: 33,
    role: 'Bẫy Đất Quái Dẫm Mất Máu', desc: 'Bẫy đinh kiwi dưới đất quái dẫm lên mất máu liên tục!',
    color: '#65a30d', accent: '#3f6212'
  },
  PALM_ENERGY: {
    id: 'PALM_ENERGY', name: 'Palm Coconut Star Tree', vietName: 'Bé Dừa Nhân Đôi Năng Lượng',
    cost: 150, cooldown: 16, hp: 450, unlockLevel: 34,
    role: 'Nhân Đôi Sao Rơi Trong Làn', desc: 'Nhân đôi giá trị toàn bộ Ngôi Sao Năng Lượng rơi trong làn!',
    color: '#16a34a', accent: '#ca8a04'
  },
  PEACH_REVIVE: {
    id: 'PEACH_REVIVE', name: 'Fairy Peach Revive', vietName: 'Bé Đào Tiên Hồi Sinh',
    cost: 200, cooldown: 25, hp: 400, unlockLevel: 35,
    role: 'Hồi Sinh 1 Cây Gục Ngã', desc: 'Khi 1 cây trong hàng bị hạ gục sẽ tự động hồi sinh 100% HP!',
    color: '#fda4af', accent: '#f43f5e'
  },
  GRAVITY_APPLE: {
    id: 'GRAVITY_APPLE', name: 'Gravity Green Apple', vietName: 'Bé Táo Xanh Đảo Trọng Lực',
    cost: 175, cooldown: 18, hp: 420, unlockLevel: 36,
    role: 'Kéo Lùi Quái Toàn Trận', desc: 'Đảo ngược trường trọng lực đẩy lùi toàn bộ quái về sau!',
    color: '#84cc16', accent: '#4ade80'
  },
  RAINBOW_FUNGUS: {
    id: 'RAINBOW_FUNGUS', name: 'Rainbow Shroom Supreme', vietName: 'Bé Thần Nấm Ngũ Sắc',
    cost: 275, cooldown: 20, hp: 500, unlockLevel: 37,
    role: 'Bắn Tia Laser Cầu Vồng', desc: 'Bắn chùm ánh sáng ngũ sắc quét sạch toàn bộ quái trên đường!',
    color: '#ec4899', accent: '#38bdf8'
  },
  MYSTIC_DRAGON_PLANT: {
    id: 'MYSTIC_DRAGON_PLANT', name: 'Mystic Dragon Flora', vietName: 'Bé Rồng Cây Thần Thoại',
    cost: 325, cooldown: 22, hp: 600, unlockLevel: 38,
    role: 'Phun Plasma Hủy Diệt 3 Làn', desc: 'Phun tia plasma rồng thần thoại hủy diệt cả 3 làn cùng lúc!',
    color: '#a855f7', accent: '#f43f5e'
  },
  TREE_OF_WISDOM: {
    id: 'TREE_OF_WISDOM', name: 'Tree of Wisdom Supreme', vietName: 'Bé Cây Trí Tuệ Tối Thượng',
    cost: 350, cooldown: 30, hp: 1000, unlockLevel: 39,
    role: 'Buff x2 Sát Thương Toàn Trận', desc: 'Tỏa hào quang thần thánh nhân đôi sát thương cho toàn bộ đội hình!',
    color: '#fde047', accent: '#22c55e'
  },
  OVERCLOCK_TOWER: {
    id: 'OVERCLOCK_TOWER', name: 'Lollipop Music Box', vietName: 'Bé Hộp Nhạc Kẹo Mút',
    cost: 150, cooldown: 15, hp: 350, unlockLevel: 40,
    role: 'Buff +50% Tốc Độ Bắn', desc: 'Phát sóng âm nhạc 🎵 giúp tháp xung quanh bắn nhanh gấp rưỡi!',
    color: '#ec4899', accent: '#06b6d4'
  }
};

// ============================================================================
// 25 DIVERSE SLIME MONSTERS
// ============================================================================
const VIRUS_TYPES = {
  TROJAN_BUG: {
    id: 'TROJAN_BUG', name: 'Bé Bọ Slime Cánh Cam', vietName: 'Bé Bọ Slime Cánh Cam',
    hp: 110, speed: 0.16, damage: 80, score: 100, color: '#4ade80',
    desc: 'Bé bọ slime nhún nhảy chậm rãi, má hồng tròn xoe đáng yêu!'
  },
  ENCRYPTED_WORM: {
    id: 'ENCRYPTED_WORM', name: 'Bé Sâu Thạch Bảy Màu', vietName: 'Bé Sâu Thạch Bảy Màu',
    hp: 220, speed: 0.13, damage: 85, score: 150, color: '#fbbf24',
    desc: 'Bé sâu kẹo dẻo bò uốn lượn thong thả với lớp thạch bảo vệ.'
  },
  RANSOMWARE_BRUTE: {
    id: 'RANSOMWARE_BRUTE', name: 'Bé Gấu Slime Bụng Bự', vietName: 'Bé Gấu Slime Bụng Bự',
    hp: 750, speed: 0.09, damage: 130, score: 250, color: '#a855f7',
    desc: 'Bé gấu slime ôm ổ khóa kẹo ngọt to bự, bước đi lạch bạch rất chậm.'
  },
  GLITCH_SPRINTER: {
    id: 'GLITCH_SPRINTER', name: 'Bé Thỏ Lướt Sóng Sao', vietName: 'Bé Thỏ Lướt Sóng Sao (Tốc Độ ⚡)',
    hp: 180, speed: 0.44, damage: 100, score: 200, color: '#38bdf8', isFast: true,
    desc: '⚡ [SKILL TỐC ĐỘ]: Chạy siêu nhanh và bật nhảy qua cây trồng đầu tiên!'
  },
  STEALTH_SPYWARE: {
    id: 'STEALTH_SPYWARE', name: 'Bé Ma Thạch Nơ Xinh', vietName: 'Bé Ma Thạch Nơ Xinh',
    hp: 220, speed: 0.14, damage: 95, score: 220, color: '#c084fc', isStealth: true,
    desc: 'Bé ma trong suốt bồng bềnh lơ lửng, trôi chầm chậm ngọt ngào.'
  },
  BALLOON_SLIME: {
    id: 'BALLOON_SLIME', name: 'Bé Slime Bóng Bay Cầu Vồng', vietName: 'Bé Slime Bóng Bay Cầu Vồng',
    hp: 190, speed: 0.14, damage: 100, score: 240, color: '#f472b6', isFlying: true,
    desc: 'Cầm chùm bóng bay lơ lửng chầm chậm né tránh đạn bắn dưới đất!'
  },
  DIGGER_MOLE: {
    id: 'DIGGER_MOLE', name: 'Bé Chuột Chũi Slime Đào Hầm', vietName: 'Bé Chuột Chũi Slime Đào Hầm',
    hp: 300, speed: 0.15, damage: 110, score: 280, color: '#a16207', isDigger: true,
    desc: 'Đào hầm chui thẳng ra sau lưng phòng tuyến rồi mới trồi lên cắn phá!'
  },
  DISCO_SLIME: {
    id: 'DISCO_SLIME', name: 'Bé Slime Vũ Công Disco', vietName: 'Bé Slime Vũ Công Disco',
    hp: 450, speed: 0.11, damage: 110, score: 320, color: '#ec4899', isSummoner: true,
    desc: 'Lắc lư theo điệu nhạc và triệu hồi thêm 3 bé bọ slime phụ họa!'
  },
  FROST_YETI_SLIME: {
    id: 'FROST_YETI_SLIME', name: 'Bé Slime Kem Tuyết Yeti', vietName: 'Bé Slime Kem Tuyết Yeti',
    hp: 950, speed: 0.10, damage: 140, score: 420, color: '#93c5fd', isFreezer: true,
    desc: 'Bé người tuyết bước chậm rãi, phát sóng giá lạnh đóng băng cây trồng!'
  },
  DIVER_SLIME: {
    id: 'DIVER_SLIME', name: 'Bé Slime Thợ Lặn Kính Bơi', vietName: 'Bé Slime Thợ Lặn Kính Bơi',
    hp: 380, speed: 0.13, damage: 110, score: 260, color: '#06b6d4', isDiver: true,
    desc: 'Đeo kính bơi bơi chậm rãi và lặn né tránh 40% đạn bắn tới!'
  },
  NINJA_SLIME: {
    id: 'NINJA_SLIME', name: 'Bé Slime Ninja Phóng Phi Tiêu', vietName: 'Bé Slime Ninja (Tốc Độ ⚡)',
    hp: 280, speed: 0.28, damage: 120, score: 300, color: '#475569', isShooter: true, isFast: true,
    desc: '⚡ [SKILL TỐC ĐỘ]: Thân pháp nhanh nhẹn, lướt gió phóng phi tiêu từ xa!'
  },
  HYDRA_TROJAN: {
    id: 'HYDRA_TROJAN', name: 'Bé Slime Rồng 3 Đầu Chibi', vietName: 'Bé Slime Rồng 3 Đầu Chibi',
    hp: 550, speed: 0.12, damage: 120, score: 350, color: '#f43f5e', isSplitter: true,
    desc: 'Bé rồng 3 đầu khi bị tiêu diệt sẽ tách đôi thành 2 bé bọ slime nhỏ!'
  },
  NANO_SWARM_COLONY: {
    id: 'NANO_SWARM_COLONY', name: 'Đàn Hạt Slime Cầu Vồng', vietName: 'Đàn Hạt Slime Cầu Vồng',
    hp: 750, speed: 0.11, damage: 120, score: 300, color: '#34d399', isRegen: true,
    desc: 'Đàn hạt slime bò chậm, liên tục tự hồi phục +40 HP mỗi giây!'
  },
  BIO_SYNTH_VIRUS: {
    id: 'BIO_SYNTH_VIRUS', name: 'Bé Sứa Slime Biển Dạ Quang', vietName: 'Bé Sứa Slime Biển Dạ Quang',
    hp: 1100, speed: 0.12, damage: 130, score: 400, color: '#a3e635', isVampire: true,
    desc: 'Bé sứa mềm dẻo trôi dạt chậm, khi cắn cây sẽ tự hút máu hồi phục!'
  },
  CYBER_ZOMBIE_MECH: {
    id: 'CYBER_ZOMBIE_MECH', name: 'Bé Robot Chong Chóng Nổ', vietName: 'Bé Chong Chóng Nổ (Tự Nổ 💥)',
    hp: 850, speed: 0.13, damage: 150, score: 450, color: '#fb923c', isExploder: true, explosionDamage: 250,
    desc: '💥 [SKILL TỰ NỔ]: Khi hết máu sẽ tự phát nổ diện rộng phá hủy cây xung quanh!'
  },
  DARK_MATTER_GHOST: {
    id: 'DARK_MATTER_GHOST', name: 'Bé Mèo Đêm Mộng Mơ', vietName: 'Bé Mèo Đêm Mộng Mơ',
    hp: 1200, speed: 0.12, damage: 150, score: 550, color: '#a855f7', isReflector: true,
    desc: 'Bé mèo bóng đêm tím pastel có 25% cơ hội phản hồi sóng xung kích!'
  },
  ROOTKIT_TITAN: {
    id: 'ROOTKIT_TITAN', name: 'Bé Rùa Bánh Quy Bọc Giáp', vietName: 'Bé Rùa Bánh Quy Bọc Giáp',
    hp: 1600, speed: 0.08, damage: 180, score: 600, color: '#c084fc', armorReduction: 0.45,
    desc: 'Bé rùa mai bánh quy sô-cô-la bò siêu chậm, giảm 45% sát thương!'
  },
  LOGIC_BOMB_GOLEM: {
    id: 'LOGIC_BOMB_GOLEM', name: 'Bé Khổng Lồ Kẹo Bom Nổ', vietName: 'Bé Kẹo Bom Khổng Lồ (Tự Nổ 💥)',
    hp: 1400, speed: 0.09, damage: 180, score: 650, color: '#ef4444', isExploder: true, explosionDamage: 320,
    desc: '💥 [SKILL TỰ NỔ]: Mang khối thuốc nổ kẹo dẻo, khi chết tự nổ hủy diệt 320 DMG!'
  },
  SHADOW_STALKER: {
    id: 'SHADOW_STALKER', name: 'Bé Mèo Đen Bóng Đêm Cuti', vietName: 'Bé Mèo Đen Bóng Đêm (Tốc Độ ⚡)',
    hp: 450, speed: 0.36, damage: 130, score: 450, color: '#312e81', isFast: true,
    desc: '⚡ [SKILL TỐC ĐỘ]: Lướt bóng đêm siêu tốc, thoắt ẩn thoắt hiện!'
  },
  ARMORED_CYBER_CRUSHER: {
    id: 'ARMORED_CYBER_CRUSHER', name: 'Bé Xe Tăng Kẹo Ngọt Mini', vietName: 'Bé Xe Tăng Kẹo Ngọt Mini',
    hp: 2000, speed: 0.07, damage: 220, score: 750, color: '#f43f5e', armorReduction: 0.5,
    desc: 'Bé xe tăng đồ chơi bánh xích lăn chậm rãi với giáp kẹo siêu bền!'
  },
  TROJAN_HORSE_CARRIER: {
    id: 'TROJAN_HORSE_CARRIER', name: 'Bé Kỳ Lân Unicorn Cầu Vồng', vietName: 'Bé Kỳ Lân Unicorn Cầu Vồng',
    hp: 1800, speed: 0.09, damage: 160, score: 700, color: '#facc15', isCarrier: true,
    desc: 'Bé kỳ lân bập bênh chậm rãi chở theo 3 bé bọ slime nhỏ!'
  },
  ZERO_DAY_EXPLOIT: {
    id: 'ZERO_DAY_EXPLOIT', name: 'Bé Tiên Tử Sao Dịch Chuyển', vietName: 'Bé Tiên Tử Sao Dịch Chuyển (Biến Ảo ✨)',
    hp: 950, speed: 0.12, damage: 120, score: 500, color: '#ec4899', isPhaser: true,
    desc: '✨ [SKILL DỊCH CHUYỂN]: Nhấp nháy dịch chuyển tức thời 65px sau mỗi 4 giây!'
  },
  QUANTUM_SINGULARITY_CORE: {
    id: 'QUANTUM_SINGULARITY_CORE', name: 'Bé Cầu Pha Lê Kẹo Xoáy', vietName: 'Bé Cầu Pha Lê Kẹo Xoáy',
    hp: 2500, speed: 0.07, damage: 220, score: 950, color: '#38bdf8',
    desc: 'Quả cầu pha lê xoay tròn trôi lững lờ tích tụ năng lượng sao!'
  },
  DDOS_OVERLORD: {
    id: 'DDOS_OVERLORD', name: 'Bé Vua Slime Khổng Lồ', vietName: 'Bé Vua Slime Khổng Lồ (Boss W1)',
    hp: 2400, speed: 0.08, damage: 200, score: 1000, color: '#ff5d8f', isBoss: true,
    desc: 'Bé Vua Slime khổng lồ bước đi chậm rãi oai vệ, má phúng phính!'
  },
  BOTNET_COMMANDER: {
    id: 'BOTNET_COMMANDER', name: 'Bé Hoàng Tử Bạch Tuộc', vietName: 'Hoàng Tử Bạch Tuộc (Boss W2)',
    hp: 4200, speed: 0.07, damage: 260, score: 1500, color: '#c084fc', isBoss: true,
    desc: 'Bé hoàng tử bạch tuộc trôi chậm, mang khiên và triệu hồi quái con!'
  },
  QUANTUM_LEVIATHAN: {
    id: 'QUANTUM_LEVIATHAN', name: 'Bé Rồng Biển Xanh Mộng Mơ', vietName: 'Bé Rồng Biển Xanh (Super Boss)',
    hp: 7500, speed: 0.06, damage: 350, score: 2200, color: '#38bdf8', isSuperBoss: true,
    desc: 'Bé rồng biển uốn lượn bồng bềnh cực chậm với đôi mắt long lanh!'
  },
  NEURAL_OVERDRIVE_MEGABOSS: {
    id: 'NEURAL_OVERDRIVE_MEGABOSS', name: 'Bé Mèo Thần Vũ Trụ Tối Thượng', vietName: 'Bé Mèo Vũ Trụ Apex (Mega Boss Màn 40)',
    hp: 12000, speed: 0.05, damage: 450, score: 3000, color: '#ec4899', isMegaBoss: true,
    desc: 'Bé Mèo Thần tối thượng trôi lơ lửng uy nghiêm với 4 quả cầu ma thuật!'
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
    if (type === 'NANO_SHIELD' && upgrades.shieldBoost) {
      hpMultiplier = 1.35;
    }
    this.hp = Math.round(this.config.hp * hpMultiplier);
    this.maxHp = this.hp;
    
    this.x = grid.startX + col * grid.cellW + grid.cellW / 2;
    this.y = grid.startY + row * grid.cellH + grid.cellH / 2;
    this.radius = grid.cellW * 0.38;

    this.shootTimer = 0;
    this.shootInterval = type === 'GATLING_PEA_CAT' ? 1.05 : ['BANANA_LAUNCHER', 'PLASMA_MORTAR'].includes(type) ? 2.0 : type === 'SHROOM_PUFF' ? 0.85 : 1.3;
    this.energyTimer = 5;
    this.energyInterval = 8.5;
    this.animTime = Math.random() * 10;
    this.flashHit = 0;
    this.isOverclocked = false;

    if (type === 'EMP_BOMB') {
      this.empTimer = 1.0;
      this.exploded = false;
    }

    this.zapTimer = 0;
    this.zapTarget = null;

    if (type === 'DRONE_HIVE') {
      this.drones = [
        { angle: 0, radius: 26, laserTimer: 0 },
        { angle: Math.PI, radius: 26, laserTimer: 0.5 }
      ];
    }

    if (type === 'NANO_HEALER') this.healTimer = 0;
    if (type === 'FORCE_REPELLER') this.repelTimer = 0;
    if (type === 'TIME_WARP_PYLON') this.warpTimer = 0;
    if (type === 'ORBITAL_STRIKE_BEACON') this.orbitalTimer = 0;
    if (type === 'MAGNET_SHROOM') this.magnetTimer = 0;
  }

  takeDamage(dmg) {
    this.hp -= dmg;
    this.flashHit = 0.1;
    if (this.hp <= 0) this.hp = 0;
  }

  update(dt, gameState) {
    this.animTime += dt;
    if (this.flashHit > 0) this.flashHit -= dt;

    this.isOverclocked = gameState.units.some(u => 
      u.type === 'OVERCLOCK_TOWER' && 
      ((Math.abs(u.col - this.col) === 1 && u.row === this.row) || (Math.abs(u.row - this.row) === 1 && u.col === this.col))
    );

    const speedMultiplier = (this.isOverclocked ? 1.5 : 1.0) * (gameState.upgrades.overclock ? 1.2 : 1.0);
    const effectiveDt = dt * speedMultiplier;

    // 1. Sunflower Star
    if (this.type === 'ENERGY_CORE') {
      this.energyTimer += effectiveDt;
      if (this.energyTimer >= this.energyInterval) {
        this.energyTimer = 0;
        const extraEnergy = gameState.upgrades.extraSun ? 25 : 0;
        gameState.spawnEnergyOrb(this.x + (Math.random()*20 - 10), this.y - 10, 50 + extraEnergy, false);
      }
    }

    // Durian Shredder Contact Shred Damage
    if (this.type === 'DURIAN_SHREDDER') {
      gameState.viruses.forEach(v => {
        if (v.row === this.row && Math.abs(v.x - this.x) < this.grid.cellW * 0.75 && v.hp > 0) {
          v.takeDamage(55 * dt, gameState);
          if (Math.random() < 0.18) {
            gameState.spawnLaserSpark(v.x, v.y, '#a3e635');
          }
        }
      });
    }

    // 2. Shooting Plants
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

    // 3. Cherry Bomb
    if (this.type === 'EMP_BOMB') {
      this.empTimer -= dt;
      if (this.empTimer <= 0 && !this.exploded) {
        this.exploded = true;
        this.hp = 0;
        gameState.triggerEMPExplosion(this.col, this.row);
      }
    }

    // 4. Kitsune Tesla
    if (this.type === 'TESLA_COIL') {
      this.zapTimer += effectiveDt;
      if (this.zapTimer >= 1.2) {
        this.zapTimer = 0;
        const target = gameState.viruses.find(v => v.row === this.row && v.x > this.x && v.x < this.x + this.grid.cellW * 4.5 && v.hp > 0);
        if (target) {
          const dmg = (gameState.upgrades.plasmaPower ? 60 : 45);
          target.takeDamage(dmg, gameState);
          gameState.spawnLaserSpark(target.x, target.y, '#c084fc');
          window.cyberAudio.playLaser(950, 0.08);
          this.zapTarget = { x: target.x, y: target.y, time: 0.15 };
        }
      }
      if (this.zapTarget) {
        this.zapTarget.time -= dt;
        if (this.zapTarget.time <= 0) this.zapTarget = null;
      }
    }

    // 5. Magnet Shroom
    if (this.type === 'MAGNET_SHROOM') {
      this.magnetTimer += effectiveDt;
      if (this.magnetTimer >= 3.0) {
        this.magnetTimer = 0;
        // Auto-collect all orbs on field
        gameState.energyOrbs.forEach(orb => orb.collect());
        // Remove armor from nearest armored slime
        const armored = gameState.viruses.find(v => v.config.armorReduction && v.hp > 0);
        if (armored) {
          armored.config.armorReduction = 0;
          gameState.spawnFloatingText(armored.x, armored.y - 20, '🧲 TƯỚC GIÁP!', '#ec4899');
        }
      }
    }

    // 6. Nano Sakura Healer
    if (this.type === 'NANO_HEALER') {
      this.healTimer += effectiveDt;
      if (this.healTimer >= 4.0) {
        this.healTimer = 0;
        gameState.units.forEach(u => {
          if (Math.abs(u.col - this.col) <= 1 && Math.abs(u.row - this.row) <= 1 && u.hp < u.maxHp) {
            u.hp = Math.min(u.maxHp, u.hp + 150);
            gameState.spawnGlitchParticles(u.x, u.y, '#ff70a6');
          }
        });
        window.cyberAudio.playUpgradeSuccess();
      }
    }

    // 7. Honeybee Hive
    if (this.type === 'DRONE_HIVE' && this.drones) {
      this.drones.forEach(d => {
        d.angle += dt * 3.2;
        d.laserTimer += effectiveDt;
        if (d.laserTimer >= 1.8) {
          d.laserTimer = 0;
          const target = gameState.viruses.find(v => v.row === this.row && v.x > this.x && v.hp > 0);
          if (target) {
            const droneX = this.x + Math.cos(d.angle) * d.radius;
            const droneY = this.y + Math.sin(d.angle) * d.radius;
            gameState.projectiles.push(new Projectile(droneX, droneY, this.row, 'DRONE_LASER', 22));
            window.cyberAudio.playLaser(1100, 0.08);
            gameState.spawnMuzzleFlash(droneX, droneY, '#a3e635');
          }
        }
      });
    }

    // 8. Whirlwind Shroom Repeller
    if (this.type === 'FORCE_REPELLER') {
      this.repelTimer += effectiveDt;
      if (this.repelTimer >= 5.0) {
        this.repelTimer = 0;
        gameState.viruses.forEach(v => {
          if (v.row === this.row && v.x > this.x && v.x < this.x + this.grid.cellW * 3.0) {
            v.x += this.grid.cellW * 1.5;
            v.takeDamage(30, gameState);
            gameState.spawnLaserSpark(v.x, v.y, '#38bdf8');
          }
        });
        window.cyberAudio.playLaser(450, 0.25);
      }
    }

    // 9. Time Warp Hourglass
    if (this.type === 'TIME_WARP_PYLON') {
      this.warpTimer += effectiveDt;
      if (this.warpTimer >= 12.0) {
        this.warpTimer = 0;
        gameState.viruses.forEach(v => {
          if (v.row === this.row && v.hp > 0) {
            v.slowTimer = 4.0;
          }
        });
        window.cyberAudio.playLaser(1400, 0.4);
        gameState.spawnFloatingText(this.x, this.y - 20, '✨ ĐÓNG BĂNG THỜI GIAN ✨', '#38bdf8');
      }
    }

    // 10. Black Hole Singularity
    if (this.type === 'BLACK_HOLE') {
      gameState.viruses.forEach(v => {
        if (v.hp > 0 && Math.abs(v.row - this.row) <= 1) {
          const dx = this.x - v.x;
          if (Math.abs(dx) < this.grid.cellW * 2.5) {
            v.x += (dx > 0 ? 1 : -1) * 24 * dt;
            v.takeDamage(26 * dt, gameState);
          }
        }
      });
    }

    // 11. Starlight Orbital Strike
    if (this.type === 'ORBITAL_STRIKE_BEACON') {
      this.orbitalTimer += effectiveDt;
      if (this.orbitalTimer >= 15.0) {
        this.orbitalTimer = 0;
        gameState.viruses.forEach(v => {
          if (v.row === this.row && v.hp > 0) {
            v.takeDamage(2500, gameState);
          }
        });
        window.cyberAudio.playExplosion();
        gameState.spawnGlitchParticles(this.x + 200, this.y, '#ff70a6');
        gameState.spawnFloatingText(this.x + 100, this.y - 20, '🌟 MƯA SAO BĂNG KẸO NGỌT! 🌟', '#fbbf24');
      }
    }
  }

  fireProjectile(gameState) {
    const dmgBonus = gameState.upgrades.plasmaPower ? 1.25 : 1.0;

    if (this.type === 'GATLING_PEA_CAT') {
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          if (this.hp > 0 && gameState.isPlaying && !gameState.isGameOver) {
            gameState.projectiles.push(new Projectile(this.x + 22, this.y, this.row, 'LASER', 40 * dmgBonus));
            window.cyberAudio.playLaser(850 + i * 40, 0.08);
            gameState.spawnMuzzleFlash(this.x + 22, this.y, '#22c55e');
          }
        }, i * 85);
      }
    } else if (this.type === 'LASER_TURRET') {
      gameState.projectiles.push(new Projectile(this.x + 22, this.y, this.row, 'LASER', 45 * dmgBonus));
      window.cyberAudio.playLaser(750, 0.1);
      gameState.spawnMuzzleFlash(this.x + 22, this.y, '#38bdf8');
    } else if (this.type === 'CRYO_TURRET') {
      gameState.projectiles.push(new Projectile(this.x + 22, this.y, this.row, 'CRYO', 35 * dmgBonus));
      window.cyberAudio.playCryoShot();
      gameState.spawnMuzzleFlash(this.x + 22, this.y, '#70d6ff');
    } else if (this.type === 'RAILGUN_CANNON') {
      gameState.projectiles.push(new Projectile(this.x + 22, this.y - 6, this.row, 'RAILGUN', 45 * dmgBonus));
      window.cyberAudio.playRailgun();
      gameState.spawnMuzzleFlash(this.x + 22, this.y - 6, '#fb923c');
      setTimeout(() => {
        if (this.hp > 0 && gameState.isPlaying && !gameState.isGameOver) {
          gameState.projectiles.push(new Projectile(this.x + 22, this.y + 6, this.row, 'RAILGUN', 45 * dmgBonus));
          window.cyberAudio.playRailgun();
          gameState.spawnMuzzleFlash(this.x + 22, this.y + 6, '#fb923c');
        }
      }, 150);
    } else if (this.type === 'SCATTER_SHOTGUN') {
      [-1, 0, 1].forEach(rowOffset => {
        const targetRow = this.row + rowOffset;
        if (targetRow >= 0 && targetRow < this.grid.rows) {
          gameState.projectiles.push(new Projectile(this.x + 20, this.y, targetRow, 'SCATTER', 30 * dmgBonus, rowOffset * 100));
        }
      });
      window.cyberAudio.playShotgun();
      gameState.spawnMuzzleFlash(this.x + 22, this.y, '#facc15');
    } else if (this.type === 'SNIPER_TURRET') {
      gameState.projectiles.push(new Projectile(this.x + 25, this.y, this.row, 'SNIPER', 140 * dmgBonus));
      window.cyberAudio.playSniper();
      gameState.spawnMuzzleFlash(this.x + 25, this.y, '#f43f5e');
    } else if (this.type === 'PLASMA_MORTAR') {
      gameState.projectiles.push(new Projectile(this.x + 18, this.y, this.row, 'MORTAR', 65 * dmgBonus));
      window.cyberAudio.playMortar();
      gameState.spawnMuzzleFlash(this.x + 18, this.y, '#f472b6');
    } else if (this.type === 'MISSILE_SILO') {
      gameState.projectiles.push(new Projectile(this.x + 20, this.y, this.row, 'MISSILE', 120 * dmgBonus));
      window.cyberAudio.playMissile();
      gameState.spawnMuzzleFlash(this.x + 20, this.y, '#fb923c');
    } else if (this.type === 'SHROOM_PUFF') {
      gameState.projectiles.push(new Projectile(this.x + 18, this.y, this.row, 'PUFF', 14 * dmgBonus));
      window.cyberAudio.playLaser(600, 0.08);
      gameState.spawnMuzzleFlash(this.x + 18, this.y, '#c084fc');
    } else if (this.type === 'BANANA_LAUNCHER') {
      gameState.projectiles.push(new Projectile(this.x + 22, this.y, this.row, 'BANANA', 150 * dmgBonus));
      window.cyberAudio.playMortar();
      gameState.spawnMuzzleFlash(this.x + 22, this.y, '#fde047');
    } else if (this.type === 'BLUEBERRY_FROST') {
      gameState.projectiles.push(new Projectile(this.x + 22, this.y, this.row, 'FROST_BLAST', 40 * dmgBonus));
      window.cyberAudio.playCryoShot();
      gameState.spawnMuzzleFlash(this.x + 22, this.y, '#3b82f6');
    } else if (this.type === 'MYSTIC_DRAGON_PLANT') {
      [-1, 0, 1].forEach(rowOffset => {
        const targetRow = this.row + rowOffset;
        if (targetRow >= 0 && targetRow < this.grid.rows) {
          gameState.projectiles.push(new Projectile(this.x + 25, this.y, targetRow, 'DRAGON_BLAST', 80 * dmgBonus, rowOffset * 60));
        }
      });
      window.cyberAudio.playLaser(1200, 0.15);
      gameState.spawnMuzzleFlash(this.x + 25, this.y, '#ec4899');
    } else if (this.type === 'FLAMETHROWER_TURRET') {
      gameState.viruses.forEach(v => {
        if (v.row === this.row && v.x > this.x && v.x < this.x + this.grid.cellW * 2.8 && v.hp > 0) {
          v.takeDamage(12 * dmgBonus, gameState);
          gameState.spawnLaserSpark(v.x, v.y, '#f43f5e');
        }
      });
      window.cyberAudio.playLaser(450, 0.08);
      gameState.spawnMuzzleFlash(this.x + 26, this.y, '#ec4899');
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    if (this.flashHit > 0) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.arc(0, 0, this.radius + 4, 0, Math.PI * 2);
      ctx.fill();
    }

    if (this.isOverclocked) {
      ctx.strokeStyle = '#ff70a6';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.arc(0, 0, this.radius + 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // DRAW CUTE PLANT SPRITE
    this.drawPlantSprite(ctx);

    if (this.hp < this.maxHp && this.type !== 'EMP_BOMB') {
      this.drawHealthBar(ctx);
    }

    ctx.restore();
  }

  drawHealthBar(ctx) {
    const w = 48;
    const h = 6;
    const pct = Math.max(0, this.hp / this.maxHp);
    ctx.fillStyle = 'rgba(24, 12, 36, 0.85)';
    ctx.beginPath();
    ctx.roundRect(-w/2, -36, w, h, 3);
    ctx.fill();

    ctx.fillStyle = pct > 0.5 ? '#4ade80' : pct > 0.25 ? '#fbbf24' : '#ff5d8f';
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

    if (this.type === 'ENERGY_CORE') {
      // Sunflower
      ctx.fillStyle = '#fde047';
      for (let i = 0; i < 8; i++) {
        const a = (Math.PI * 2 * i) / 8 + this.animTime * 0.8;
        ctx.beginPath();
        ctx.arc(Math.cos(a) * 20, Math.sin(a) * 20, 6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#fbbf24';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      drawKawaiiStarCrown(ctx, 0, -18, 7);
      drawKawaiiEyes(ctx, 0, -2, 6, 3.5, isBlink);
      drawKawaiiBlush(ctx, 0, 3, 9, 3.8);
      drawKawaiiMouth(ctx, 0, 4, 'open');

    } else if (this.type === 'LASER_TURRET') {
      // Neko Pea Bot
      ctx.fillStyle = '#ff70a6';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-16, -6); ctx.lineTo(-14, -22); ctx.lineTo(-4, -14); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(16, -6); ctx.lineTo(14, -22); ctx.lineTo(4, -14); ctx.closePath(); ctx.fill(); ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.roundRect(-18, -14, 36, 30, 14);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#ff70a6';
      ctx.beginPath();
      ctx.roundRect(16, -2, 9, 8, 4);
      ctx.fill(); ctx.stroke();
      drawKawaiiBow(ctx, 0, 14, 5, '#ff5d8f');
      drawKawaiiEyes(ctx, 0, -2, 6, 3.5, isBlink);
      drawKawaiiBlush(ctx, 0, 3, 9, 3.5);
      drawKawaiiMouth(ctx, 0, 4, 'cat');

    } else if (this.type === 'NANO_SHIELD') {
      // Wallnut Bear
      ctx.fillStyle = '#4ade80';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(-14, -16, 7, 0, Math.PI * 2); ctx.arc(14, -16, 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.roundRect(-22, -18, 44, 40, 20); ctx.fill(); ctx.stroke();
      drawKawaiiEyes(ctx, 0, -4, 7, 4, isBlink);
      drawKawaiiBlush(ctx, 0, 2, 11, 4);
      drawKawaiiMouth(ctx, 0, 2, 'smile');

    } else if (this.type === 'CRYO_TURRET') {
      // Penguin Frost
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#70d6ff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-16, -18, 32, 36, 16); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.ellipse(0, 2, 11, 14, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.roundRect(-15, -4, 30, 7, 4); ctx.fill();
      drawKawaiiEyes(ctx, 0, -10, 6, 3, isBlink);
      drawKawaiiBlush(ctx, 0, -7, 9, 3.2);

    } else if (this.type === 'GATLING_PEA_CAT') {
      // Gatling Neko Pea (4 Barrels + Pilot Helmet)
      // Pilot Helmet
      ctx.fillStyle = '#15803d';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, -6, 20, Math.PI, 0); ctx.fill(); ctx.stroke();
      
      // Cat Ears on Helmet
      drawKawaiiCatEars(ctx, 0, -18, 9, '#166534', '#4ade80');

      // Head Body
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(0, 0, 17, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

      // Pilot Goggles
      ctx.fillStyle = '#38bdf8';
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.5;
      [-7, 7].forEach(gx => {
        ctx.beginPath();
        ctx.arc(gx, -10, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(gx - 2, -12, 2, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#38bdf8';
      });

      // 4 Gatling Pea Barrels
      const barrelAngles = [-0.35, -0.12, 0.12, 0.35];
      barrelAngles.forEach(ang => {
        const bx = Math.cos(ang) * 16;
        const by = Math.sin(ang) * 16;
        ctx.fillStyle = '#166534';
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(bx + 4, by, 4.5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      });

      drawKawaiiEyes(ctx, -2, -1, 5, 2.5, isBlink);
      drawKawaiiBlush(ctx, -2, 4, 8, 3);
      drawKawaiiMouth(ctx, -2, 5, 'cat');

    } else if (this.type === 'DURIAN_SHREDDER') {
      // Durian Armor Shredder (Spiky Shell + Determined Cute Face)
      ctx.fillStyle = '#65a30d';
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 2.2;
      
      // Outer Spikes (12 spikes around perimeter)
      const numSpikes = 12;
      ctx.beginPath();
      for (let s = 0; s < numSpikes; s++) {
        const ang = (s / numSpikes) * Math.PI * 2;
        const outR = 23 + (s % 2 === 0 ? 3 : 0);
        const inR = 17;
        const ox = Math.cos(ang) * outR;
        const oy = Math.sin(ang) * outR;
        const midAng = ang + Math.PI / numSpikes;
        const ix = Math.cos(midAng) * inR;
        const iy = Math.sin(midAng) * inR;
        if (s === 0) ctx.moveTo(ox, oy);
        else ctx.lineTo(ox, oy);
        ctx.lineTo(ix, iy);
      }
      ctx.closePath();
      ctx.fill(); ctx.stroke();

      // Inner Soft Durian Face
      ctx.fillStyle = '#fef08a';
      ctx.strokeStyle = '#a3e635';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 13, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

      // Cute Grumpy / Determined Protector Eyes & Mouth
      drawKawaiiEyes(ctx, 0, -2, 5, 3, isBlink);
      drawKawaiiBlush(ctx, 0, 3, 7, 2.8);
      
      // Little Tough Spiky Bandana
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.roundRect(-10, -11, 20, 5, 2); ctx.fill();

    } else if (this.type === 'EMP_BOMB') {
      // Cherry Bomb
      [-9, 9].forEach(cx => {
        ctx.fillStyle = '#f43f5e';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(cx, 0, 13, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        drawKawaiiEyes(ctx, cx, -2, 3.5, 2.5, isBlink);
        drawKawaiiBlush(ctx, cx, 2, 5.5, 2.5);
      });

    } else {
      // Generic Cute Plant Fallback with Unique Color Accent
      ctx.fillStyle = this.config.color || '#ec4899';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.roundRect(-18, -16, 36, 32, 14);
      ctx.fill(); ctx.stroke();

      // Top Leaf / Flower Petals
      ctx.fillStyle = this.config.accent || '#4ade80';
      ctx.beginPath();
      ctx.ellipse(-6, -20, 6, 3.5, -Math.PI / 4, 0, Math.PI * 2);
      ctx.ellipse(6, -20, 6, 3.5, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();

      drawKawaiiEyes(ctx, 0, -3, 6, 3.2, isBlink);
      drawKawaiiBlush(ctx, 0, 3, 9, 3.2);
      drawKawaiiMouth(ctx, 0, 4, 'cat');
    }

    ctx.restore();
  }
}

// ============================================================================
// VIRUS / SLIME ENEMY INSTANCE CLASS
// ============================================================================
class VirusEnemy {
  constructor(type, row, grid) {
    this.type = type;
    this.row = row;
    this.grid = grid;
    this.config = VIRUS_TYPES[type] || VIRUS_TYPES.TROJAN_BUG;

    this.hp = this.config.hp;
    this.maxHp = this.hp;
    this.speed = this.config.speed;
    this.damage = this.config.damage;

    this.x = grid.startX + grid.cols * grid.cellW + 30 + Math.random() * 40;
    this.y = grid.startY + row * grid.cellH + grid.cellH / 2;
    this.radius = grid.cellW * 0.36;

    this.animTime = Math.random() * 10;
    this.flashHit = 0;
    this.slowTimer = 0;
    this.isAttacking = false;
    this.targetUnit = null;

    if (type === 'GLITCH_SPRINTER') this.hasJumped = false;
    if (type === 'DDOS_OVERLORD') this.miniSpawned = false;
    if (type === 'BOTNET_COMMANDER') {
      this.shieldHp = 1500;
      this.summonTimer = 0;
    }
    if (type === 'NEURAL_OVERDRIVE_MEGABOSS') {
      this.shieldHp = 2500;
      this.megaAttackTimer = 0;
    }
    if (type === 'ZERO_DAY_EXPLOIT') {
      this.phaseTimer = 0;
    }
    if (type === 'DISCO_SLIME') {
      this.discoTimer = 0;
    }
  }

  update(dt, gameState) {
    this.animTime += dt;
    if (this.flashHit > 0) this.flashHit -= dt;
    if (this.slowTimer > 0) this.slowTimer -= dt;

    if (this.config.isRegen && this.hp < this.maxHp) {
      this.hp = Math.min(this.maxHp, this.hp + 40 * dt);
    }

    if (this.type === 'ZERO_DAY_EXPLOIT') {
      this.phaseTimer += dt;
      if (this.phaseTimer >= 4.0) {
        this.phaseTimer = 0;
        this.x -= 65;
        gameState.spawnGlitchParticles(this.x, this.y, '#ec4899');
        window.cyberAudio.playLaser(900, 0.1);
      }
    }

    if (this.type === 'DISCO_SLIME') {
      this.discoTimer += dt;
      if (this.discoTimer >= 8.0) {
        this.discoTimer = 0;
        for (let s = 0; s < 2; s++) {
          const dancer = new VirusEnemy('TROJAN_BUG', this.row, this.grid);
          dancer.x = this.x + (s * 30 - 15);
          gameState.viruses.push(dancer);
        }
        gameState.spawnFloatingText(this.x, this.y - 20, '🎵 DISCO DANCE! 🎵', '#ec4899');
      }
    }

    let currentSpeed = this.speed * (this.slowTimer > 0 ? 0.5 : 1.0);

    let collidingUnit = null;
    for (const unit of gameState.units) {
      if (unit.row === this.row && unit.hp > 0) {
        const dist = this.x - unit.x;
        if (dist > 0 && dist < 42) {
          collidingUnit = unit;
          break;
        }
      }
    }

    if (this.type === 'GLITCH_SPRINTER' && !this.hasJumped && collidingUnit) {
      this.hasJumped = true;
      this.x -= 70;
      this.speed = 0.16;
      gameState.spawnGlitchParticles(this.x + 35, this.y, '#38bdf8');
      window.cyberAudio.playLaser(1200, 0.2);
      return;
    }

    if (this.type === 'SHADOW_STALKER') {
      this.shadowDashTimer = (this.shadowDashTimer || 0) + dt;
      if (this.shadowDashTimer >= 3.0 && !collidingUnit) {
        this.shadowDashTimer = 0;
        this.x -= 38;
        gameState.spawnGlitchParticles(this.x + 20, this.y, '#c084fc');
        gameState.spawnLaserSpark(this.x, this.y, '#38bdf8');
        gameState.spawnFloatingText(this.x, this.y - 18, '⚡ LƯỚT BÓNG ĐÊM!', '#c084fc');
      }
    }

    if (this.type === 'DDOS_OVERLORD' && !this.miniSpawned && this.hp <= this.maxHp * 0.5) {
      this.miniSpawned = true;
      const mini = new VirusEnemy('TROJAN_BUG', this.row, this.grid);
      mini.x = this.x - 30;
      gameState.viruses.push(mini);
      gameState.spawnMuzzleFlash(this.x, this.y, '#ff5d8f');
    }

    if (this.type === 'BOTNET_COMMANDER') {
      this.summonTimer += dt;
      if (this.summonTimer >= 7.5) {
        this.summonTimer = 0;
        const minionRow = Math.floor(Math.random() * this.grid.rows);
        const minion = new VirusEnemy('STEALTH_SPYWARE', minionRow, this.grid);
        minion.x = this.x - 20;
        gameState.viruses.push(minion);
        gameState.spawnMuzzleFlash(this.x, this.y, '#c084fc');
      }
    }

    if (collidingUnit) {
      this.isAttacking = true;
      this.targetUnit = collidingUnit;
      collidingUnit.takeDamage(this.damage * dt);
      
      // Garlic lane switch
      if (collidingUnit.type === 'GARLIC_DIVERT') {
        const newRow = this.row === 0 ? 1 : this.row === this.grid.rows - 1 ? this.grid.rows - 2 : Math.random() < 0.5 ? this.row - 1 : this.row + 1;
        this.row = newRow;
        this.y = this.grid.startY + newRow * this.grid.cellH + this.grid.cellH / 2;
        gameState.spawnFloatingText(this.x, this.y - 20, '🧄 CAY QUÁ ĐỔI LÀN!', '#fef08a');
      }
    } else {
      this.isAttacking = false;
      this.targetUnit = null;
      this.x -= currentSpeed * dt * 60;
    }

    if (this.x <= this.grid.startX - 15) {
      const scanner = gameState.scanners.find(s => s.row === this.row && !s.triggered);
      if (scanner) {
        scanner.trigger();
      } else {
        gameState.triggerGameOver(false);
      }
    }
  }

  takeDamage(amount, gameState, isCryo = false) {
    if ((this.type === 'BOTNET_COMMANDER' || this.type === 'NEURAL_OVERDRIVE_MEGABOSS') && this.shieldHp > 0) {
      this.shieldHp -= amount;
      this.flashHit = 0.1;
      window.cyberAudio.playHit();
      return;
    }

    const reduction = this.config.armorReduction || 0;
    const effectiveDamage = amount * (1 - reduction);

    this.hp -= effectiveDamage;
    this.flashHit = 0.1;
    if (isCryo) this.slowTimer = 3.5;
    window.cyberAudio.playHit();

    if (this.hp <= 0) {
      // Self-destruct explosion on death
      if (this.config.isExploder) {
        const explodeDmg = this.config.explosionDamage || 250;
        gameState.units.forEach(u => {
          if (u.row === this.row && Math.abs(u.x - this.x) <= this.grid.cellW * 1.35 && u.hp > 0) {
            u.takeDamage(explodeDmg);
          }
        });
        window.cyberAudio.playExplosion();
        gameState.spawnGlitchParticles(this.x, this.y, '#f43f5e');
        gameState.spawnLaserSpark(this.x, this.y, '#fbbf24');
        gameState.spawnFloatingText(this.x, this.y - 22, '💥 TỰ NỔ HẾT MÁU! 💥', '#ef4444');
      }

      if (this.config.isSplitter) {
        for (let s = 0; s < 2; s++) {
          const child = new VirusEnemy('TROJAN_BUG', this.row, this.grid);
          child.x = this.x + (s * 25 - 12);
          child.hp = 90;
          child.maxHp = 90;
          gameState.viruses.push(child);
        }
      }
      if (this.config.isCarrier) {
        for (let s = 0; s < 3; s++) {
          const trojan = new VirusEnemy('TROJAN_BUG', this.row, this.grid);
          trojan.x = this.x + s * 20;
          gameState.viruses.push(trojan);
        }
      }
      gameState.onVirusKilled(this);
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    const hitFlash = this.flashHit > 0;
    const isSlow = this.slowTimer > 0;
    const walkWobble = Math.sin(this.animTime * 6) * 2;
    const walkTilt = Math.sin(this.animTime * 6) * 0.08;

    ctx.rotate(walkTilt);
    ctx.translate(0, walkWobble);

    if (this.config.isStealth && !this.isAttacking) {
      ctx.globalAlpha = 0.4 + Math.sin(this.animTime * 6) * 0.2;
    }

    if (isSlow) {
      ctx.shadowColor = '#70d6ff';
      ctx.shadowBlur = 12;
    }

    // Speed Trail / Wind Streaks for fast monsters
    if (this.config.isFast && !this.isAttacking) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 1.5;
      const tOff = (this.animTime * 15) % 12;
      [ -6, 0, 6 ].forEach((yo, idx) => {
        ctx.beginPath();
        ctx.moveTo(18 + tOff + idx * 4, yo);
        ctx.lineTo(28 + tOff + idx * 4, yo);
        ctx.stroke();
      });
    }

    // Bomb Aura for exploder monsters
    if (this.config.isExploder) {
      const pulse = 0.5 + Math.sin(this.animTime * 8) * 0.5;
      ctx.fillStyle = `rgba(239, 68, 68, ${0.2 * pulse})`;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius + 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // DRAW SLIME SPRITE
    this.drawSlimeSprite(ctx, hitFlash);

    // Exploder Bomb Badge
    if (this.config.isExploder) {
      ctx.font = '12px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('💣', 0, -22);
    }

    // Fast Runner Lightning Badge
    if (this.config.isFast) {
      ctx.font = '11px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⚡', 12, -18);
    }

    // Health Bar
    if (this.hp < this.maxHp || this.config.isBoss || this.config.isSuperBoss || this.config.isMegaBoss) {
      const isLargeBoss = this.config.isSuperBoss || this.config.isMegaBoss;
      const isMediumBoss = this.config.isBoss || this.type === 'QUANTUM_SINGULARITY_CORE' || this.type === 'ARMORED_CYBER_CRUSHER';
      const w = isLargeBoss ? 96 : isMediumBoss ? 68 : 42;
      const h = isLargeBoss ? 6 : 4;
      const yOffset = isLargeBoss ? -42 : -32;
      const pct = Math.max(0, this.hp / this.maxHp);

      ctx.fillStyle = 'rgba(24, 12, 36, 0.85)';
      ctx.beginPath();
      ctx.roundRect(-w / 2, yOffset, w, h, 2);
      ctx.fill();
      
      ctx.fillStyle = isSlow ? '#38bdf8' : this.config.isMegaBoss ? '#ff0055' : '#ff5d8f';
      ctx.beginPath();
      ctx.roundRect(-w / 2 + 1, yOffset + 1, Math.max(0, (w - 2) * pct), h - 2, 2);
      ctx.fill();
    }

    ctx.restore();
  }

  drawSlimeSprite(ctx, hitFlash) {
    const squish = Math.sin(this.animTime * 5) * 0.08;
    ctx.save();
    ctx.scale(1 + squish, 1 - squish);

    if (this.type === 'TROJAN_BUG') {
      ctx.fillStyle = hitFlash ? '#ffffff' : '#4ade80';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      drawKawaiiEyes(ctx, 0, -2, 5, 3.2, false);
      drawKawaiiBlush(ctx, 0, 2, 8, 3.2);

    } else if (this.type === 'BALLOON_SLIME') {
      // Balloon on top 🎈
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.ellipse(0, -26, 10, 13, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, -13); ctx.lineTo(0, -6); ctx.stroke();

      ctx.fillStyle = '#f472b6';
      ctx.beginPath(); ctx.arc(0, 0, 14, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      drawKawaiiEyes(ctx, 0, -2, 4, 3, false);

    } else if (this.type === 'DIGGER_MOLE') {
      ctx.fillStyle = '#a16207';
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-16, -14, 32, 28, 12); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath(); ctx.ellipse(0, 8, 10, 5, 0, 0, Math.PI * 2); ctx.fill();
      drawKawaiiEyes(ctx, 0, -3, 5, 3, false);

    } else if (this.type === 'DDOS_OVERLORD') {
      ctx.fillStyle = '#ff5d8f';
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 3.5;
      ctx.beginPath(); ctx.arc(0, 0, 34, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      drawKawaiiStarCrown(ctx, 0, -32, 14);
      drawKawaiiEyes(ctx, 0, -4, 11, 6, false);
      drawKawaiiBlush(ctx, 0, 6, 17, 6);

    } else {
      // Generic Slime with Unique Color
      ctx.fillStyle = hitFlash ? '#ffffff' : (this.config.color || '#ec4899');
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-16, -14, 32, 28, 12);
      ctx.fill(); ctx.stroke();
      drawKawaiiEyes(ctx, 0, -3, 5, 3.2, false);
      drawKawaiiBlush(ctx, 0, 2, 8, 3.2);
    }

    ctx.restore();
  }
}

// ============================================================================
// PROJECTILES, ENERGY ORBS & SCANNER
// ============================================================================
class Projectile {
  constructor(x, y, row, type, damage, vy = 0) {
    this.x = x;
    this.y = y;
    this.row = row;
    this.type = type;
    this.damage = damage;
    this.vy = vy;
    this.speed = type === 'RAILGUN' || type === 'SNIPER' ? 700 : type === 'DRONE_LASER' ? 620 : 540;
    this.radius = 6;
    this.pierceCount = type === 'SNIPER' ? 8 : 1;
    this.animTime = 0;
  }

  update(dt, gameState) {
    this.animTime += dt;
    this.x += this.speed * dt;
    this.y += this.vy * dt;

    for (const virus of gameState.viruses) {
      if (virus.row === this.row && virus.hp > 0) {
        const dist = Math.abs(this.x - virus.x);
        if (dist < 26) {
          const isCryo = this.type === 'CRYO' || this.type === 'FROST_BLAST';
          virus.takeDamage(this.damage, gameState, isCryo);
          gameState.spawnLaserSpark(this.x, this.y, '#ff70a6');
          
          this.pierceCount--;
          if (this.pierceCount <= 0) {
            return true;
          }
        }
      }
    }

    return this.x > gameState.canvas.width + 50 || this.y < -50 || this.y > gameState.canvas.height + 50;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    if (this.type === 'LASER') {
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2); ctx.fill();
    } else if (this.type === 'CRYO' || this.type === 'FROST_BLAST') {
      ctx.rotate(this.animTime * 6);
      ctx.strokeStyle = '#70d6ff'; ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath(); ctx.moveTo(-6, 0); ctx.lineTo(6, 0); ctx.stroke();
        ctx.rotate(Math.PI / 3);
      }
    } else if (this.type === 'RAILGUN') {
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath(); ctx.ellipse(0, 0, 10, 5, 0, 0, Math.PI * 2); ctx.fill();
    } else if (this.type === 'SCATTER' || this.type === 'PUFF') {
      ctx.fillStyle = '#facc15';
      ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI * 2); ctx.fill();
    } else if (this.type === 'SNIPER') {
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(-3, -2, 3, Math.PI, 0); ctx.arc(3, -2, 3, Math.PI, 0);
      ctx.lineTo(0, 4); ctx.closePath(); ctx.fill();
    } else if (this.type === 'MORTAR' || this.type === 'BANANA' || this.type === 'DRAGON_BLAST') {
      ctx.fillStyle = '#f472b6';
      ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.fillStyle = '#a3e635';
      ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI * 2); ctx.fill();
    }

    ctx.restore();
  }
}

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
    const wingFlap = Math.sin(this.animTime * 8) * 0.2;
    ctx.scale(pulse, pulse);

    // Wings
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.save();
    ctx.rotate(wingFlap);
    ctx.beginPath();
    ctx.ellipse(-14, -4, 9, 4.5, -Math.PI / 4, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.rotate(-wingFlap);
    ctx.beginPath();
    ctx.ellipse(14, -4, 9, 4.5, Math.PI / 4, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // Smiling Star ⭐
    ctx.fillStyle = '#fbbf24';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, 0, 15, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    drawKawaiiEyes(ctx, 0, -2, 4, 2.5, false, '#713f12');
    drawKawaiiBlush(ctx, 0, 2, 6, 2.5);
    drawKawaiiMouth(ctx, 0, 3, 'smile', '#713f12');

    ctx.restore();
  }
}

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
            gameState.spawnLaserSpark(virus.x, virus.y, '#ff70a6');
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

    ctx.fillStyle = '#fed7aa';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-16, -12, 32, 24, 8); ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#fb923c';
    ctx.beginPath();
    ctx.roundRect(-12, -22, 5, 12, 2.5); ctx.roundRect(7, -22, 5, 12, 2.5); ctx.fill();

    drawKawaiiEyes(ctx, 0, -2, 4.5, 2.5, false, '#431407');
    drawKawaiiBlush(ctx, 0, 2, 7, 2.5);

    ctx.restore();
  }
}

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
    ctx.font = '700 13px Fredoka, Comfortaa, sans-serif';
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
