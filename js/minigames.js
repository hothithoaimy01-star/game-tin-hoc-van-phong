/**
 * Minigames Controller:
 * 1. Shortcut Battle (Phím Tắt Thần Tốc)
 * 2. Excel Simulator (Phòng Thí Nghiệm Bảng Tính)
 * 3. Word Formatter (Soạn Thảo Chuẩn Thể Thức)
 * 4. PowerPoint Master (Thuyết Trình Đỉnh Cao)
 */

const MiniGames = {
  // ==================== 1. SHORTCUT BATTLE ====================
  shortcut: {
    currentBattleIndex: 0,
    score: 0,
    timer: 30,
    interval: null,
    isActive: false,

    start() {
      this.currentBattleIndex = 0;
      this.score = 0;
      this.timer = 40;
      this.isActive = true;
      
      document.getElementById('modal-shortcut-game').classList.remove('hidden');
      this.loadQuestion();

      if (this.interval) clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.timer--;
        document.getElementById('shortcut-timer').innerText = this.timer + "s";
        if (this.timer <= 0) {
          this.endGame(false);
        }
      }, 1000);

      window.addEventListener('keydown', this.handleKeyDown);
    },

    loadQuestion() {
      const q = GAME_DATA.shortcutBattles[this.currentBattleIndex];
      document.getElementById('shortcut-question').innerHTML = `Hành động: <strong>${q.action}</strong>`;
      document.getElementById('shortcut-expected-keys').innerHTML = `Nhấn phím: <kbd>${q.keys}</kbd>`;
      document.getElementById('shortcut-hint').innerText = `💡 Gợi ý: ${q.hint}`;
      document.getElementById('shortcut-enemy-name').innerText = q.enemy;
      document.getElementById('shortcut-score').innerText = `${this.currentBattleIndex} / ${GAME_DATA.shortcutBattles.length}`;
      document.getElementById('enemy-hp').style.width = '100%';
      document.getElementById('last-pressed-key').innerText = "Đang chờ bạn nhấn đúng tổ hợp phím...";
    },

    handleKeyDown(e) {
      if (!MiniGames.shortcut.isActive) return;

      const q = GAME_DATA.shortcutBattles[MiniGames.shortcut.currentBattleIndex];
      const pressedCtrl = e.ctrlKey || e.metaKey;
      const pressedAlt = e.altKey;
      const key = e.key.toLowerCase();

      // Show key visualizer
      let keyDisplay = [];
      if (e.ctrlKey) keyDisplay.push("Ctrl");
      if (e.altKey) keyDisplay.push("Alt");
      if (e.shiftKey) keyDisplay.push("Shift");
      keyDisplay.push(e.key.toUpperCase());
      document.getElementById('last-pressed-key').innerText = `Bạn vừa nhấn: ${keyDisplay.join(" + ")}`;

      // Check match
      let isMatch = false;
      if (q.keyMatch.ctrl && pressedCtrl && key === q.keyMatch.key.toLowerCase()) {
        isMatch = true;
      } else if (q.keyMatch.alt && pressedAlt && (e.key === 'Tab' || key === 'tab')) {
        isMatch = true;
      }

      if (isMatch) {
        e.preventDefault();
        MiniGames.shortcut.onCorrectKey();
      }
    },

    onCorrectKey() {
      if (SoundManager) SoundManager.playSuccess();
      this.score++;
      
      // Damage animation on enemy
      document.getElementById('enemy-hp').style.width = '0%';
      GameApp.showToast("⚔️ Chính xác! Sát thương chí mạng lên Deadline!", "success");

      setTimeout(() => {
        this.currentBattleIndex++;
        if (this.currentBattleIndex >= GAME_DATA.shortcutBattles.length) {
          this.endGame(true);
        } else {
          this.loadQuestion();
        }
      }, 500);
    },

    endGame(isVictory) {
      this.isActive = false;
      clearInterval(this.interval);
      window.removeEventListener('keydown', this.handleKeyDown);

      if (isVictory) {
        if (SoundManager) SoundManager.playLevelUp();
        GameApp.showToast("🎉 Xuất sắc! Bạn đã tiêu diệt toàn bộ Quái Vật Deadline!", "gold");
        GameApp.completeCurrentQuest();
      } else {
        if (SoundManager) SoundManager.playError();
        GameApp.showToast("⏰ Hết giờ! Hãy thử lại để rèn luyện phản xạ phím tắt.", "danger");
      }
      setTimeout(() => {
        GameApp.closeMiniGame();
      }, 800);
    }
  },

  // ==================== 2. EXCEL SIMULATOR ====================
  excel: {
    currentMissionIndex: 0,
    activeMission: null,

    start() {
      this.currentMissionIndex = 0;
      document.getElementById('modal-excel-game').classList.remove('hidden');
      this.loadMission();
      this.setupExcelEvents();
    },

    loadMission() {
      this.activeMission = GAME_DATA.excelMissions[this.currentMissionIndex];
      document.getElementById('excel-mission-title').innerText = `📊 ${this.activeMission.title}`;
      document.getElementById('excel-briefing').innerHTML = this.activeMission.briefing;
      document.getElementById('excel-formula-input').value = "";
      
      const feedbackEl = document.getElementById('excel-feedback');
      feedbackEl.className = "excel-feedback";
      feedbackEl.innerText = "";

      document.getElementById('btn-excel-next-task').disabled = true;

      // Render Grid
      this.renderTable();
    },

    renderTable() {
      const mission = this.activeMission;
      const table = document.getElementById('excel-table');
      table.innerHTML = "";

      // Header row
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      headerRow.innerHTML = `<th>#</th>` + mission.headers.map(h => `<th>${h}</th>`).join("");
      thead.appendChild(headerRow);
      table.appendChild(thead);

      // Body rows
      const tbody = document.createElement('tbody');
      mission.grid.forEach((row, rIdx) => {
        const tr = document.createElement('tr');
        const rowNumber = row[0];
        
        tr.innerHTML = `<td class="row-header">${rowNumber}</td>`;
        
        for (let cIdx = 1; cIdx < row.length; cIdx++) {
          const colLetter = mission.headers[cIdx - 1];
          const cellId = `${colLetter}${rowNumber}`;
          const isTarget = (cellId === mission.targetCell);

          const td = document.createElement('td');
          td.id = `cell-${cellId}`;
          td.innerText = row[cIdx];
          if (isTarget) {
            td.classList.add('target-cell');
          }

          td.addEventListener('click', () => {
            document.querySelectorAll('.excel-table td').forEach(el => el.classList.remove('selected-cell'));
            td.classList.add('selected-cell');
            const input = document.getElementById('excel-formula-input');
            if (isTarget && !input.value) {
              input.value = "=";
              input.focus();
            }
          });

          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
    },

    setupExcelEvents() {
      const input = document.getElementById('excel-formula-input');
      const submitBtn = document.getElementById('btn-submit-formula');
      const hintBtn = document.getElementById('btn-excel-hint');
      const nextBtn = document.getElementById('btn-excel-next-task');

      input.onkeydown = (e) => {
        if (e.key === 'Enter') {
          this.validateFormula();
        }
      };

      submitBtn.onclick = () => {
        this.validateFormula();
      };

      hintBtn.onclick = () => {
        alert(this.activeMission.explanation);
      };

      nextBtn.onclick = () => {
        this.currentMissionIndex++;
        if (this.currentMissionIndex < GAME_DATA.excelMissions.length) {
          this.loadMission();
        } else {
          GameApp.completeCurrentQuest();
          GameApp.closeMiniGame();
        }
      };
    },

    validateFormula() {
      const input = document.getElementById('excel-formula-input');
      const val = input.value.trim().replace(/\s+/g, '');
      const mission = this.activeMission;
      const feedbackEl = document.getElementById('excel-feedback');

      const isCorrect = mission.validFormulas.some(f => f.replace(/\s+/g, '').toLowerCase() === val.toLowerCase());

      if (isCorrect) {
        if (SoundManager) SoundManager.playSuccess();
        feedbackEl.className = "excel-feedback show correct";
        feedbackEl.innerHTML = `✅ <strong>Chính xác tuyệt đối!</strong> Giá trị tính ra là: <b>${mission.correctValue}</b>.<br>${mission.explanation}`;
        
        // Update target cell visually
        const targetCellEl = document.getElementById(`cell-${mission.targetCell}`);
        if (targetCellEl) {
          targetCellEl.innerText = mission.correctValue;
          targetCellEl.style.color = "#10b981";
          targetCellEl.style.fontWeight = "bold";
        }

        document.getElementById('btn-excel-next-task').disabled = false;
        document.getElementById('btn-excel-next-task').innerText = 
          this.currentMissionIndex === GAME_DATA.excelMissions.length - 1 ? "Hoàn Tất Xuất Sắc Báo Cáo 🎉" : "Bài Tập Tiếp Theo ➡️";
      } else {
        if (SoundManager) SoundManager.playError();
        feedbackEl.className = "excel-feedback show wrong";
        feedbackEl.innerHTML = `❌ <strong>Công thức chưa đúng cú pháp.</strong><br>Hãy kiểm tra lại tên hàm (SUM, AVERAGE, IF, VLOOKUP) và địa chỉ các ô tham chiếu!`;
      }
    }
  },

  // ==================== 3. WORD FORMATTER ====================
  word: {
    selectedBlockIndex: 0,
    currentMission: null,

    start() {
      this.currentMission = GAME_DATA.wordMissions[0];
      document.getElementById('modal-word-game').classList.remove('hidden');
      this.renderDoc();
      this.setupWordToolbar();
    },

    renderDoc() {
      const doc = this.currentMission;
      const container = document.getElementById('word-doc-content');
      container.innerHTML = "";

      doc.docBlocks.forEach((b, idx) => {
        const div = document.createElement('div');
        div.className = `word-doc-block ${idx === this.selectedBlockIndex ? 'active' : ''}`;
        div.id = `word-block-${idx}`;
        div.innerText = b.text;
        
        // Apply inline styles
        div.style.textAlign = b.align || 'left';
        div.style.fontWeight = b.bold ? 'bold' : 'normal';
        div.style.fontStyle = b.italic ? 'italic' : 'normal';
        div.style.fontSize = (b.size || '13') + 'pt';

        div.onclick = () => {
          this.selectedBlockIndex = idx;
          document.querySelectorAll('.word-doc-block').forEach(el => el.classList.remove('active'));
          div.classList.add('active');
          if (SoundManager) SoundManager.playTone(400, 'sine', 0.05, 0.05);
        };

        container.appendChild(div);
      });

      // Render Checklist
      const checkList = document.getElementById('word-checklist-items');
      checkList.innerHTML = doc.tasks.map(t => `<li id="task-${t.id}">⬜ ${t.text}</li>`).join("");
    },

    setupWordToolbar() {
      const toolBtns = document.querySelectorAll('.word-toolbar .tool-btn');
      toolBtns.forEach(btn => {
        btn.onclick = () => {
          const action = btn.getAttribute('data-action');
          this.applyFormat(action);
        };
      });

      const sizeSelect = document.getElementById('word-font-size');
      sizeSelect.onchange = (e) => {
        const block = this.currentMission.docBlocks[this.selectedBlockIndex];
        block.size = e.target.value;
        this.renderDoc();
      };

      document.getElementById('btn-word-verify').onclick = () => {
        this.verifyFormatting();
      };
    },

    applyFormat(action) {
      const block = this.currentMission.docBlocks[this.selectedBlockIndex];
      if (!block) return;

      if (action === 'bold') block.bold = !block.bold;
      if (action === 'italic') block.italic = !block.italic;
      if (action === 'underline') block.underline = !block.underline;
      if (action.startsWith('align-')) {
        block.align = action.replace('align-', '');
      }

      if (SoundManager) SoundManager.playKeypress();
      this.renderDoc();
    },

    verifyFormatting() {
      const doc = this.currentMission;
      let allPassed = true;

      doc.tasks.forEach(task => {
        const block = doc.docBlocks[task.targetBlock];
        let taskPassed = true;

        if (task.req.align && block.align !== task.req.align) taskPassed = false;
        if (task.req.bold !== undefined && block.bold !== task.req.bold) taskPassed = false;
        if (task.req.size && block.size !== task.req.size) taskPassed = false;

        const li = document.getElementById(`task-${task.id}`);
        if (taskPassed) {
          li.className = "checked";
          li.innerHTML = `✅ ${task.text}`;
        } else {
          li.className = "";
          li.innerHTML = `❌ ${task.text}`;
          allPassed = false;
        }
      });

      if (allPassed) {
        if (SoundManager) SoundManager.playSuccess();
        GameApp.showToast("🎉 Văn bản chuẩn thể thức Nghị định 30 hoàn hảo!", "gold");
        GameApp.completeCurrentQuest();
        setTimeout(() => GameApp.closeMiniGame(), 1000);
      } else {
        if (SoundManager) SoundManager.playError();
        GameApp.showToast("Chưa đạt chuẩn! Vui lòng kiểm tra lại các mục gạch chéo đỏ.", "danger");
      }
    }
  },

  // ==================== 4. POWERPOINT MASTER ====================
  ppt: {
    currentStep: 0,

    start() {
      this.currentStep = 0;
      document.getElementById('modal-ppt-game').classList.remove('hidden');
      this.loadSlide();
    },

    loadSlide() {
      const mission = GAME_DATA.pptMissions[this.currentStep];
      document.getElementById('ppt-current-step').innerText = `${this.currentStep + 1} / ${GAME_DATA.pptMissions.length}`;
      document.getElementById('ppt-slide-content').innerText = mission.slideText;
      document.getElementById('ppt-question').innerText = mission.question;

      const fb = document.getElementById('ppt-feedback');
      fb.style.display = "none";

      const optContainer = document.getElementById('ppt-options');
      optContainer.innerHTML = "";

      mission.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = "ppt-option-btn";
        btn.innerText = `${String.fromCharCode(65 + idx)}. ${opt.text}`;
        btn.onclick = () => this.handleAnswer(opt);
        optContainer.appendChild(btn);
      });
    },

    handleAnswer(opt) {
      const fb = document.getElementById('ppt-feedback');
      fb.style.display = "block";

      if (opt.isCorrect) {
        if (SoundManager) SoundManager.playSuccess();
        fb.className = "ppt-feedback excel-feedback show correct";
        fb.innerHTML = `✅ <strong>Chính xác!</strong> ${opt.reason}`;

        setTimeout(() => {
          this.currentStep++;
          if (this.currentStep < GAME_DATA.pptMissions.length) {
            this.loadSlide();
          } else {
            GameApp.showToast("🎉 Thuyết trình thành công rực rỡ trước Hội Đồng Quản Trị!", "gold");
            GameApp.completeCurrentQuest();
            setTimeout(() => GameApp.closeMiniGame(), 800);
          }
        }, 1200);
      } else {
        if (SoundManager) SoundManager.playError();
        fb.className = "ppt-feedback excel-feedback show wrong";
        fb.innerHTML = `❌ <strong>Chưa chính xác.</strong> ${opt.reason}`;
      }
    }
  }
};
