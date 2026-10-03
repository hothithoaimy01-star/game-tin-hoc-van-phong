/**
 * Main Application Orchestrator for Office Legend 2D RPG
 * Connects Canvas Engine, Minigames, Audio, HUD, Shop, Codex, and Save/Load State.
 */

class OfficeGameApp {
  constructor() {
    this.state = {
      level: 1,
      exp: 0,
      coins: 0,
      energy: 100,
      currentQuestIndex: 0,
      inventory: []
    };

    this.engine = null;
    this.activeNpc = null;
    this.init();
  }

  init() {
    this.loadSaveData();
    this.engine = new GameEngine('game-canvas');
    this.setupHUD();
    this.setupModals();
    this.setupCodex();
    this.setupShop();
    this.updateHUD();

    // Welcome Toast
    setTimeout(() => {
      this.showToast("🚀 Chào mừng đến với Văn Phòng Kỳ Hiệp!", "gold");
      this.showToast("💡 Dùng WASD hoặc phím Mũi tên để di chuyển.", "success");
    }, 500);
  }

  // ==================== SAVE / LOAD DATA ====================
  saveData() {
    localStorage.setItem('office_legend_save', JSON.stringify(this.state));
  }

  loadSaveData() {
    const saved = localStorage.getItem('office_legend_save');
    if (saved) {
      try {
        this.state = Object.assign(this.state, JSON.parse(saved));
      } catch (e) {
        console.warn("Save data corrupted, using defaults");
      }
    }
  }

  // ==================== HUD & UI ====================
  setupHUD() {
    // Sound Button
    const btnSound = document.getElementById('btn-sound');
    btnSound.onclick = () => {
      const enabled = SoundManager.toggleSound();
      btnSound.innerHTML = enabled ? '<span class="btn-icon">🔊</span>' : '<span class="btn-icon">🔇</span>';
      this.showToast(enabled ? "🔊 Đã bật âm thanh & nhạc nền" : "🔇 Đã tắt âm thanh");
    };

    // Codex Button
    document.getElementById('btn-codex').onclick = () => this.openCodex();

    // Shop Button
    document.getElementById('btn-shop').onclick = () => this.openShop();

    // Help Button
    document.getElementById('btn-help').onclick = () => this.openHelp();

    // Promotion Claim Button
    document.getElementById('btn-claim-promotion').onclick = () => {
      document.getElementById('modal-promotion').classList.add('hidden');
    };
  }

  updateHUD() {
    const currentRank = GAME_DATA.ranks[this.state.level - 1] || GAME_DATA.ranks[GAME_DATA.ranks.length - 1];
    
    document.getElementById('player-title').innerText = currentRank.title;
    document.getElementById('coins-val').innerText = this.state.coins.toLocaleString('vi-VN') + " ₫";
    document.getElementById('energy-val').innerText = `${this.state.energy}%`;

    // EXP Bar
    const expPercentage = Math.min(100, Math.round((this.state.exp / currentRank.reqExp) * 100));
    document.getElementById('exp-bar').style.width = `${expPercentage}%`;
    document.getElementById('exp-text').innerText = `EXP: ${this.state.exp} / ${currentRank.reqExp}`;

    // Quest Tracker
    const quest = GAME_DATA.quests[this.state.currentQuestIndex];
    if (quest) {
      document.getElementById('current-quest-title').innerText = quest.title;
      document.getElementById('current-quest-desc').innerText = quest.desc;
    } else {
      document.getElementById('current-quest-title').innerText = "🏆 Đỉnh Cao Sự Nghiệp";
      document.getElementById('current-quest-desc').innerText = "Bạn đã trở thành Tổng Giám Đốc (CEO) Tập Đoàn!";
    }
  }

  // ==================== DIALOGUE & NPC INTERACTION ====================
  interactWithNpc(npc) {
    if (SoundManager) SoundManager.playInteract();
    this.activeNpc = npc;

    const dialogBox = document.getElementById('dialogue-box');
    const speakerAvatar = document.getElementById('speaker-avatar');
    const speakerName = document.getElementById('speaker-name');
    const speakerRole = document.getElementById('speaker-role');
    const dialogueText = document.getElementById('dialogue-text');
    const actionsDiv = document.getElementById('dialogue-actions');

    speakerAvatar.innerText = npc.avatar;
    speakerName.innerText = npc.name;
    speakerRole.innerText = npc.role;

    const currentQuest = GAME_DATA.quests[this.state.currentQuestIndex];
    const isTargetForQuest = currentQuest && currentQuest.targetNpc === npc.id;

    if (isTargetForQuest) {
      dialogueText.innerText = `${npc.dialogues.intro} ${npc.dialogues.quest_prompt}`;
      actionsDiv.innerHTML = `
        <button class="game-btn outline" onclick="GameApp.closeDialogue()">Để Sau ⏳</button>
        <button class="game-btn primary" onclick="GameApp.startQuestMiniGame('${currentQuest.minigameType}')">Vào Thử Thách Ngay 🚀</button>
      `;
    } else {
      dialogueText.innerText = `${npc.dialogues.intro} Hãy tiếp tục hoàn thành các nhiệm vụ được giao nhé!`;
      actionsDiv.innerHTML = `
        <button class="game-btn primary" onclick="GameApp.closeDialogue()">Đã Hiểu 👍</button>
      `;
    }

    dialogBox.classList.remove('hidden');
  }

  closeDialogue() {
    document.getElementById('dialogue-box').classList.add('hidden');
  }

  startQuestMiniGame(type) {
    this.closeDialogue();
    if (type === 'shortcut') MiniGames.shortcut.start();
    else if (type === 'excel') MiniGames.excel.start();
    else if (type === 'word') MiniGames.word.start();
    else if (type === 'ppt') MiniGames.ppt.start();
  }

  closeMiniGame() {
    document.querySelectorAll('.game-modal').forEach(m => m.classList.add('hidden'));
    if (MiniGames.shortcut.isActive) MiniGames.shortcut.endGame(false);
  }

  // ==================== QUEST COMPLETION & LEVEL UP ====================
  completeCurrentQuest() {
    const quest = GAME_DATA.quests[this.state.currentQuestIndex];
    if (!quest) return;

    this.state.exp += quest.rewardExp;
    this.state.coins += quest.rewardCoins;
    this.state.currentQuestIndex++;

    if (this.engine) {
      this.engine.addCelebrationParticles(this.engine.player.x, this.engine.player.y);
    }

    // Check Level Up
    const currentRank = GAME_DATA.ranks[this.state.level - 1];
    if (this.state.exp >= currentRank.reqExp && this.state.level < GAME_DATA.ranks.length) {
      this.state.level++;
      this.showPromotionModal(this.state.level);
    }

    this.saveData();
    this.updateHUD();
  }

  showPromotionModal(newLevel) {
    const rankInfo = GAME_DATA.ranks[newLevel - 1];
    if (SoundManager) SoundManager.playLevelUp();

    document.getElementById('promo-rank-title').innerText = rankInfo.title;
    document.getElementById('promo-reward-cash').innerText = rankInfo.salary;
    document.getElementById('promo-reward-unlock').innerText = rankInfo.unlock;
    document.getElementById('modal-promotion').classList.remove('hidden');

    if (this.engine) {
      this.engine.addCelebrationParticles(this.engine.player.x, this.engine.player.y);
    }
  }

  // ==================== CODEX (BÁCH KHOA TOÀN THƯ) ====================
  setupCodex() {
    const tabs = document.querySelectorAll('.codex-tab');
    tabs.forEach(tab => {
      tab.onclick = () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const tabKey = tab.getAttribute('data-tab');
        this.renderCodexTab(tabKey);
      };
    });
  }

  openCodex() {
    if (SoundManager) SoundManager.playInteract();
    this.renderCodexTab('shortcuts');
    document.getElementById('modal-codex').classList.remove('hidden');
  }

  closeCodex() {
    document.getElementById('modal-codex').classList.add('hidden');
  }

  renderCodexTab(tabKey) {
    const body = document.getElementById('codex-content-body');
    const items = GAME_DATA.codex[tabKey] || [];
    
    body.innerHTML = items.map(item => `
      <div class="codex-item">
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
    `).join("");
  }

  // ==================== SHOP SYSTEM ====================
  setupShop() {}

  openShop() {
    if (SoundManager) SoundManager.playInteract();
    const grid = document.getElementById('shop-items-grid');
    grid.innerHTML = GAME_DATA.shopItems.map(item => `
      <div class="shop-item-card">
        <div class="shop-item-icon">${item.icon}</div>
        <div class="shop-item-name">${item.name}</div>
        <div class="shop-item-price">${item.price.toLocaleString('vi-VN')} ₫</div>
        <div style="font-size: 11px; color: #94a3b8;">${item.effect}</div>
        <button class="game-btn primary sm" onclick="GameApp.buyItem('${item.id}')">Mua Ngay</button>
      </div>
    `).join("");

    document.getElementById('modal-shop').classList.remove('hidden');
  }

  closeShop() {
    document.getElementById('modal-shop').classList.add('hidden');
  }

  buyItem(itemId) {
    const item = GAME_DATA.shopItems.find(i => i.id === itemId);
    if (!item) return;

    if (this.state.coins >= item.price) {
      this.state.coins -= item.price;
      this.state.inventory.push(item.id);
      
      if (item.id === 'coffee') {
        this.state.energy = 100;
      }

      if (SoundManager) SoundManager.playCoin();
      this.showToast(`🎉 Mua thành công: ${item.name}!`, "gold");
      this.saveData();
      this.updateHUD();
    } else {
      if (SoundManager) SoundManager.playError();
      this.showToast("❌ Không đủ tiền thưởng! Hãy hoàn thành thêm nhiệm vụ.", "danger");
    }
  }

  // ==================== HELP MODAL ====================
  openHelp() {
    if (SoundManager) SoundManager.playInteract();
    document.getElementById('modal-help').classList.remove('hidden');
  }

  closeHelp() {
    document.getElementById('modal-help').classList.add('hidden');
  }

  setupModals() {}

  // ==================== TOAST NOTIFICATIONS ====================
  showToast(message, type = "normal") {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
}

// Global initialization
let GameApp = null;
window.addEventListener('DOMContentLoaded', () => {
  GameApp = new OfficeGameApp();
  window.GameApp = GameApp;
});
