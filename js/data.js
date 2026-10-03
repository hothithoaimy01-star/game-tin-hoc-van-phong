/**
 * Game Data & Educational Content for Office Legend RPG
 * Comprehensive questions and interactive levels for Word, Excel, PowerPoint, Shortcuts.
 */

const GAME_DATA = {
  ranks: [
    { level: 1, title: "Level 1: Thực Tập Sinh (Intern)", reqExp: 100, salary: "3,000,000 ₫", unlock: "Kỹ năng Phím tắt & Bàn phím" },
    { level: 2, title: "Level 2: Nhân Viên Chính Thức (Junior)", reqExp: 250, salary: "8,000,000 ₫", unlock: "Soạn Thảo Word & Nghị Định 30" },
    { level: 3, title: "Level 3: Chuyên Viên Dữ Liệu (Senior)", reqExp: 450, salary: "15,000,000 ₫", unlock: "Phòng Kế Toán & Hàm Excel Thần Thánh" },
    { level: 4, title: "Level 4: Trưởng Phòng Dự Án (Lead)", reqExp: 700, salary: "25,000,000 ₫", unlock: "Phòng Họp & PowerPoint Thuyết Trình" },
    { level: 5, title: "Level 5: Tổng Giám Đốc (CEO)", reqExp: 1000, salary: "60,000,000 ₫", unlock: "Đỉnh Cao Quản Trị Doanh Nghiệp" }
  ],

  // NPCs on the office map
  npcs: [
    {
      id: "tuan",
      name: "Sếp Tuấn",
      role: "Trưởng Phòng Nhân Sự & Hành Chính",
      avatar: "🧑‍💼",
      x: 320,
      y: 180,
      color: "#3b82f6",
      dialogues: {
        intro: "Chào mừng bạn đến với TechCorp! Để trở thành nhân viên xuất sắc, bạn cần rèn luyện phản xạ phím tắt văn phòng trước.",
        quest_prompt: "Hãy giúp tôi xử lý đống tài liệu gấp bằng các tổ hợp phím tắt nhé!",
        completed: "Làm tốt lắm! Tốc độ phím tắt của cậu rất ấn tượng. Hãy ghé gặp Chị Lan phòng Kế Toán nhé!"
      }
    },
    {
      id: "lan",
      name: "Chị Lan",
      role: "Kế Toán Trưởng & Chuyên Gia Excel",
      avatar: "👩‍💼",
      x: 720,
      y: 180,
      color: "#10b981",
      dialogues: {
        intro: "Chào em! Chị đang cần một trợ lý tính toán bảng lương và doanh thu tháng này bằng các hàm Excel.",
        quest_prompt: "Chị có các bảng dữ liệu cần tính SUM, AVERAGE, IF và VLOOKUP. Em sẵn sàng chưa?",
        completed: "Tuyệt vời! Dữ liệu khớp 100%, không sai một li nào. Em xứng đáng thăng chức Senior!"
      }
    },
    {
      id: "mai",
      name: "Mai",
      role: "Trưởng Nhóm Soạn Thảo & Pháp Chế",
      avatar: "👩‍💻",
      x: 240,
      y: 420,
      color: "#a855f7",
      dialogues: {
        intro: "Hi bạn! Một văn bản chuẩn Nghị định 30 của công ty phải có căn lề, font chữ và canh dòng chuẩn xác.",
        quest_prompt: "Có một tờ trình đang bị lỗi định dạng nghiêm trọng. Cùng mình sửa lại nhé!",
        completed: "Văn bản nhìn chuyên nghiệp và đẹp mắt hơn hẳn! Cảm ơn bạn rất nhiều."
      }
    },
    {
      id: "nam",
      name: "Anh Nam",
      role: "Giám Đốc Dự Án (Project Director)",
      avatar: "👨‍🏫",
      x: 740,
      y: 420,
      color: "#f97316",
      dialogues: {
        intro: "Chào bạn trẻ! Cuộc họp báo cáo chiến lược với Hội Đồng Quản Trị sắp diễn ra trong 5 phút nữa.",
        quest_prompt: "Cậu hãy làm chủ các kỹ thuật trình chiếu PowerPoint và xử lý tình huống trên sân khấu giúp tôi!",
        completed: "Bài thuyết trình quá mượt mà! Cả Ban Giám Đốc đều vỗ tay khen ngợi cậu."
      }
    }
  ],

  // Quest Progression Chain
  quests: [
    {
      id: "q1_shortcuts",
      title: "Nhiệm vụ 1: Luyện Phím Tắt Thần Tốc",
      desc: "Đến gặp Sếp Tuấn (Phòng Hành chính - phía trên bên trái) để nhận thử thách phím tắt.",
      targetNpc: "tuan",
      minigameType: "shortcut",
      rewardExp: 100,
      rewardCoins: 2000000
    },
    {
      id: "q2_word",
      title: "Nhiệm vụ 2: Chuẩn Hóa Văn Bản Word",
      desc: "Đến gặp Mai (Phòng Pháp chế - phía dưới bên trái) để sửa văn bản chuẩn thể thức.",
      targetNpc: "mai",
      minigameType: "word",
      rewardExp: 150,
      rewardCoins: 3000000
    },
    {
      id: "q3_excel",
      title: "Nhiệm vụ 3: Làm Chủ Bảng Tính Excel",
      desc: "Đến gặp Chị Lan (Phòng Kế toán - phía trên bên phải) để giải quyết bảng doanh thu.",
      targetNpc: "lan",
      minigameType: "excel",
      rewardExp: 200,
      rewardCoins: 5000000
    },
    {
      id: "q4_ppt",
      title: "Nhiệm vụ 4: Trình Chiếu PowerPoint Đỉnh Cao",
      desc: "Đến gặp Anh Nam (Phòng Họp - phía dưới bên phải) để chuẩn bị bài thuyết trình VIP.",
      targetNpc: "nam",
      minigameType: "ppt",
      rewardExp: 250,
      rewardCoins: 8000000
    }
  ],

  // Shortcut Battle Questions
  shortcutBattles: [
    {
      action: "Sao chép nội dung đã chọn (Copy)",
      keys: "Ctrl + C",
      keyMatch: { ctrl: true, key: "c" },
      hint: "Tổ hợp kinh điển dùng để sao chép văn bản, hình ảnh hoặc file.",
      enemy: "👾 Deadline Báo Cáo"
    },
    {
      action: "Dán nội dung từ bộ nhớ đệm (Paste)",
      keys: "Ctrl + V",
      keyMatch: { ctrl: true, key: "v" },
      hint: "Dùng để dán dữ liệu sau khi đã nhấn Ctrl+C.",
      enemy: "🦇 Lỗi Thiếu File"
    },
    {
      action: "Lưu tài liệu tức thời (Save Document)",
      keys: "Ctrl + S",
      keyMatch: { ctrl: true, key: "s" },
      hint: "Cứ 5 phút hãy bấm tổ hợp này một lần để tránh mất bài khi cúp điện!",
      enemy: "🔥 Nguy Cơ Mất Điện"
    },
    {
      action: "Hoàn tác thao tác vừa thực hiện (Undo)",
      keys: "Ctrl + Z",
      keyMatch: { ctrl: true, key: "z" },
      hint: "Phao cứu sinh khi bạn lỡ tay xóa nhầm một đoạn văn quan trọng.",
      enemy: "👻 Lỡ Tay Xóa Nhầm"
    },
    {
      action: "Tìm kiếm từ hoặc số liệu trong tài liệu (Find)",
      keys: "Ctrl + F",
      keyMatch: { ctrl: true, key: "f" },
      hint: "Mở thanh tìm kiếm siêu tốc trong Word, Excel, Trình duyệt.",
      enemy: "🐉 Mớ Dữ Liệu Hỗn Loạn"
    },
    {
      action: "Chọn toàn bộ nội dung trong văn bản (Select All)",
      keys: "Ctrl + A",
      keyMatch: { ctrl: true, key: "a" },
      hint: "Bôi đen toàn bộ trang hoặc bảng tính trong 1 nốt nhạc.",
      enemy: "🕷️ Bọ Định Dạng Lộn Xộn"
    },
    {
      action: "Chuyển nhanh giữa các ứng dụng đang mở (Switch Apps)",
      keys: "Alt + Tab",
      keyMatch: { alt: true, key: "Tab" },
      hint: "Tổ hợp phím thần thánh giúp đa nhiệm như một Hacker.",
      enemy: "🤖 Trì Hoãn Công Việc"
    }
  ],

  // Excel Missions
  excelMissions: [
    {
      id: "excel_sum",
      title: "Màn 1: Tính Tổng Doanh Thu Tháng",
      briefing: "Sếp cần biết tổng doanh thu của 4 phòng ban. Hãy viết công thức tính Tổng tại ô <strong>B6</strong>.",
      headers: ["A", "B", "C"],
      grid: [
        ["1", "Phòng Ban", "Doanh Thu (VNĐ)", "Ghi chú"],
        ["2", "Kinh Doanh 1", "50000000", "Đạt KPI"],
        ["3", "Kinh Doanh 2", "75000000", "Vượt KPI"],
        ["4", "Marketing", "30000000", "Đạt"],
        ["5", "Thương Mại ĐT", "45000000", "Đạt"],
        ["6", "Tổng Cộng", "", "<- Điền công thức tại B6"]
      ],
      targetCell: "B6",
      validFormulas: [
        "=SUM(B2:B5)",
        "=sum(b2:b5)",
        "=SUM(B2,B3,B4,B5)",
        "=B2+B3+B4+B5"
      ],
      correctValue: "200,000,000 VNĐ",
      explanation: "Công thức chính xác là <code>=SUM(B2:B5)</code> giúp cộng dồn tất cả các giá trị số trong dải ô từ B2 đến B5."
    },
    {
      id: "excel_avg",
      title: "Màn 2: Tính Điểm Trung Bình Đánh Giá",
      briefing: "Hãy tính <strong>Điểm Đánh Giá Trung Bình</strong> của các nhân viên và điền công thức vào ô <strong>B6</strong>.",
      headers: ["A", "B", "C"],
      grid: [
        ["1", "Nhân Viên", "Điểm KPI", "Xếp Loại"],
        ["2", "Nguyễn Văn An", "8.5", "Tốt"],
        ["3", "Trần Thị Bình", "9.0", "Xuất sắc"],
        ["4", "Lê Hoàng Cúc", "7.5", "Khá"],
        ["5", "Phạm Quốc Dũng", "9.0", "Xuất sắc"],
        ["6", "Trung Bình", "", "<- Điền công thức tại B6"]
      ],
      targetCell: "B6",
      validFormulas: [
        "=AVERAGE(B2:B5)",
        "=average(b2:b5)",
        "=SUM(B2:B5)/4"
      ],
      correctValue: "8.5 Điểm",
      explanation: "Hàm <code>=AVERAGE(B2:B5)</code> tự động cộng tổng và chia cho số lượng phần tử có giá trị số."
    },
    {
      id: "excel_if",
      title: "Màn 3: Xét Thưởng Bằng Hàm Điều Kiện IF",
      briefing: "Nếu Doanh Số tại ô B2 >= 50 triệu thì ghi \"Thưởng\", ngược lại ghi \"Không\". Điền công thức vào ô <strong>C2</strong>.",
      headers: ["A", "B", "C"],
      grid: [
        ["1", "Nhân Viên", "Doanh Số", "Thưởng Tháng"],
        ["2", "Đặng Minh Tuấn", "60000000", "<- Nhập công thức IF tại C2"],
        ["3", "Hoàng Kim Ngân", "40000000", "Đang chờ tính"],
        ["4", "Vũ Đình Phong", "55000000", "Đang chờ tính"]
      ],
      targetCell: "C2",
      validFormulas: [
        '=IF(B2>=50000000,"Thưởng","Không")',
        '=if(b2>=50000000,"Thưởng","Không")',
        '=IF(B2>=50000000,"Thuong","Khong")',
        '=IF(B2>49999999,"Thưởng","Không")'
      ],
      correctValue: "Thưởng",
      explanation: "Cú pháp: <code>=IF(logic_test, value_if_true, value_if_false)</code>. Vì 60tr >= 50tr là TRUE nên kết quả là 'Thưởng'."
    },
    {
      id: "excel_vlookup",
      title: "Màn 4: Tra Cứu Đơn Giá Bằng VLOOKUP",
      briefing: "Tra cứu giá sản phẩm 'Laptop Pro' (mã tại E2) từ bảng danh mục A2:B5 và trả về cột thứ 2 (Đơn giá). Nhập vào ô <strong>F2</strong>.",
      headers: ["A", "B", "C", "D", "E", "F"],
      grid: [
        ["1", "Mã SP", "Đơn Giá (VNĐ)", "|", "Mã Cần Tra", "Kết Quả Đơn Giá"],
        ["2", "Laptop Pro", "25000000", "|", "Laptop Pro", "<- Nhập VLOOKUP tại F2"],
        ["3", "Chuột Game", "450000", "|", "", ""],
        ["4", "Bàn Phím Cơ", "1200000", "|", "", ""],
        ["5", "Màn Hình 4K", "8500000", "|", "", ""]
      ],
      targetCell: "F2",
      validFormulas: [
        '=VLOOKUP(E2,A2:B5,2,FALSE)',
        '=VLOOKUP(E2,A2:B5,2,0)',
        '=vlookup(e2,a2:b5,2,false)',
        '=vlookup(e2,a2:b5,2,0)',
        '=VLOOKUP("Laptop Pro",A2:B5,2,FALSE)',
        '=VLOOKUP("Laptop Pro",A2:B5,2,0)'
      ],
      correctValue: "25,000,000 VNĐ",
      explanation: "Cú pháp: <code>=VLOOKUP(giá_trị_tìm, bảng_dữ_liệu, số_thứ_tự_cột, FALSE)</code>. Dùng FALSE (hoặc 0) để tìm kiếm chính xác 100%!"
    }
  ],

  // Word Formatter Missions
  wordMissions: [
    {
      id: "word_nd30",
      title: "Chuẩn Hóa Tờ Trình Đề Xuất Dự Án (Nghị Định 30/2020/NĐ-CP)",
      desc: "Văn bản này đang vi phạm các quy chuẩn hành chính. Hãy sửa lại:",
      tasks: [
        { id: "align_quochieu", text: "1. Tiêu ngữ 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM' phải CĂN GIỮA (Ctrl+E) và IN ĐẬM (Ctrl+B).", targetBlock: 0, req: { align: "center", bold: true } },
        { id: "title_style", text: "2. Tên văn bản 'TỜ TRÌNH DỰ ÁN' phải CĂN GIỮA (Ctrl+E), IN ĐẬM (Ctrl+B) và Size 16pt.", targetBlock: 2, req: { align: "center", bold: true, size: "16" } },
        { id: "body_justify", text: "3. Nội dung phần thân văn bản phải CĂN ĐỀU 2 BÊN (Ctrl+J).", targetBlock: 3, req: { align: "justify" } }
      ],
      docBlocks: [
        { id: "block_0", text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc", align: "left", bold: false, italic: false, size: "13" },
        { id: "block_1", text: "Số: 12/TTr-TECHCORP          Hà Nội, ngày 15 tháng 10 năm 2026", align: "right", bold: false, italic: true, size: "13" },
        { id: "block_2", text: "TỜ TRÌNH DỰ ÁN\nVề việc nâng cấp hệ thống tin học văn phòng toàn công ty", align: "left", bold: false, italic: false, size: "13" },
        { id: "block_3", text: "Kính gửi: Ban Tổng Giám Đốc Tập đoàn TechCorp.\nCăn cứ vào nhu cầu thực tế nâng cao năng suất làm việc của cán bộ nhân viên, Phòng Công nghệ thông tin kính trình Ban Giám đốc phê duyệt đề án chuyển đổi số và chuẩn hóa kỹ năng Word, Excel, PowerPoint năm 2026.", align: "left", bold: false, italic: false, size: "13" },
        { id: "block_4", text: "Nơi nhận:\n- Như trên;\n- Lưu: VT, CNTT.", align: "left", bold: false, italic: true, size: "12" }
      ]
    }
  ],

  // PowerPoint Master Missions
  pptMissions: [
    {
      id: "ppt_q1",
      question: "Bạn đang đứng trước Ban Giám Đốc. Để BẮT ĐẦU TRÌNH CHIẾU toàn màn hình từ trang đầu tiên, bạn nhấn phím gì?",
      slideText: "📊 BÁO CÁO TỔNG KẾT NĂM 2026\nTechCorp Strategy Meeting",
      options: [
        { text: "F5", isCorrect: true, reason: "Chính xác! Phím F5 bắt đầu trình chiếu từ slide đầu tiên." },
        { text: "Shift + F5", isCorrect: false, reason: "Sai rồi. Shift + F5 chỉ trình chiếu từ slide hiện tại đang chọn." },
        { text: "Ctrl + P", isCorrect: false, reason: "Sai rồi. Ctrl + P là lệnh in ấn (Print)." },
        { text: "Alt + F4", isCorrect: false, reason: "Nguy hiểm! Alt + F4 sẽ đóng phần mềm ngay lập tức!" }
      ]
    },
    {
      id: "ppt_q2",
      question: "Bạn đang thuyết trình ở Slide số 15 và muốn tạm thời làm ĐEN MÀN HÌNH (Black Screen) để khán giả tập trung nghe bạn nói. Bạn nhấn phím gì?",
      slideText: "🎯 PHÂN TÍCH THỊ TRƯỜNG & ĐỐI THỦ\nSlide 15 / 30",
      options: [
        { text: "Phím B (hoặc dấu chấm .)", isCorrect: true, reason: "Xuất sắc! Phím B (Black) làm đen màn hình chiếu, nhấn lại B để tiếp tục trình chiếu." },
        { text: "Phím W", isCorrect: false, reason: "Phím W sẽ làm trắng màn hình (White screen), không phải làm đen." },
        { text: "Phím Escape (Esc)", isCorrect: false, reason: "Phím Esc sẽ thoát hẳn chế độ trình chiếu." },
        { text: "Spacebar", isCorrect: false, reason: "Phím Space sẽ chuyển sang slide tiếp theo." }
      ]
    },
    {
      id: "ppt_q3",
      question: "Quy tắc thiết kế slide chuyên nghiệp 'Quy tắc 6 x 6' trong PowerPoint khuyên điều gì?",
      slideText: "💡 NGUYÊN TẮC THIẾT KẾ SLIDE CHUẨN",
      options: [
        { text: "Tối đa 6 dòng mỗi slide, mỗi dòng không quá 6 từ", isCorrect: true, reason: "Rất chuẩn! Giúp slide thoáng đãng, người nghe không bị ngợp chữ." },
        { text: "Mỗi bài thuyết trình phải có đúng 36 slides", isCorrect: false, reason: "Không có giới hạn số lượng slide cố định, tùy thuộc vào thời gian." },
        { text: "Dùng 6 font chữ và 6 màu sắc khác nhau trên 1 slide", isCorrect: false, reason: "Sai lầm lớn! Dùng quá nhiều màu và font sẽ làm slide rối loạn." },
        { text: "Phải tập thuyết trình 6 lần trong 6 ngày", isCorrect: false, reason: "Không phải định nghĩa của quy tắc 6x6." }
      ]
    },
    {
      id: "ppt_q4",
      question: "Để vẽ một hình Tròn hoàn hảo (hoặc hình Vuông hoàn hảo) trong PowerPoint, bạn giữ phím nào trong khi kéo chuột vẽ?",
      slideText: "🎨 HƯỚNG DẪN VẼ GRAPHICS & SHAPES",
      options: [
        { text: "Phím Shift", isCorrect: true, reason: "Chuẩn xác! Giữ Shift khi vẽ Shape giúp khóa tỉ lệ 1:1 tạo hình tròn/vuông tuyệt đối." },
        { text: "Phím Ctrl", isCorrect: false, reason: "Giữ Ctrl chỉ giúp vẽ hình mở rộng từ tâm." },
        { text: "Phím Alt", isCorrect: false, reason: "Giữ Alt giúp tắt chế độ bắt dính lưới (Snap to grid)." },
        { text: "Phím Tab", isCorrect: false, reason: "Phím Tab dùng để chuyển đổi giữa các đối tượng." }
      ]
    }
  ],

  // Office Codex Knowledge Base (Bí Kíp)
  codex: {
    shortcuts: [
      { title: "Ctrl + C / Ctrl + V / Ctrl + X", desc: "Sao chép, Dán, và Cắt nội dung dữ liệu siêu tốc trên toàn hệ điều hành." },
      { title: "Ctrl + Z / Ctrl + Y", desc: "Undo (Hoàn tác thao tác lỗi) và Redo (Làm lại thao tác vừa hủy)." },
      { title: "Windows + Shift + S", desc: "Chụp ảnh màn hình một vùng tùy chọn (Snipping Tool) và lưu ngay vào Clipboard." },
      { title: "Windows + D", desc: "Ẩn tất cả cửa sổ và quay về màn hình Desktop tức thì (Cực hữu ích khi sếp đi ngang!)." },
      { title: "Alt + Tab / Windows + Tab", desc: "Chuyển nhanh giữa các ứng dụng đang mở hoặc mở giao diện Task View." },
      { title: "Ctrl + Shift + T", desc: "Khôi phục lại Tab vừa lỡ tay đóng trên trình duyệt web Chrome / Edge." }
    ],
    excel: [
      { title: "=SUM(dãy_ô)", desc: "Tính tổng tất cả các ô trong phạm vi, ví dụ: <code>=SUM(A1:A10)</code>" },
      { title: "=AVERAGE(dãy_ô)", desc: "Tính giá trị trung bình cộng của dải số được chọn." },
      { title: "=IF(điều_kiện, đúng, sai)", desc: "Hàm điều kiện logic xét thưởng, phân loại: <code>=IF(B2>=5, \"Đỗ\", \"Trượt\")</code>" },
      { title: "=VLOOKUP(lookup_val, table, col_index, [range_lookup])", desc: "Tra cứu giá trị theo cột dọc. Lưu ý: Luôn để tham số cuối là 0 hoặc FALSE để tìm chính xác." },
      { title: "=COUNTIF(dãy_ô, điều_kiện)", desc: "Đếm số ô thỏa mãn tiêu chí nhất định, ví dụ: <code>=COUNTIF(C2:C50, \">100\")</code>" },
      { title: "Phím F4 trong Excel", desc: "Chuyển đổi kiểu tham chiếu (Tuyệt đối $A$1 / Tương đối A1) hoặc lặp lại thao tác vừa làm." },
      { title: "Alt + = (AutoSum)", desc: "Phím tắt tự động chèn hàm SUM cho dòng hoặc cột hiện tại trong 0.1 giây." }
    ],
    word: [
      { title: "Quy chuẩn Nghị định 30/2020/NĐ-CP", desc: "Font chữ Times New Roman, Cỡ chữ thân bài 13-14pt, Căn lề trên/dưới 20-25mm, Trái 30mm, Phải 15-20mm." },
      { title: "Ctrl + E / Ctrl + L / Ctrl + R / Ctrl + J", desc: "Căn giữa, Căn trái, Căn phải, và Căn đều 2 bên (Justify)." },
      { title: "Ctrl + Enter", desc: "Ngắt trang (Page Break) chuẩn thay vì nhấn Enter 20 lần để sang trang mới." },
      { title: "Mail Merge (Trộn Thư)", desc: "Tính năng xuất hàng nghìn hợp đồng, giấy báo lương tự động từ danh sách Excel sang Word." }
    ],
    ppt: [
      { title: "F5 vs Shift + F5", desc: "F5: Bắt đầu trình chiếu từ slide đầu. Shift + F5: Trình chiếu từ slide đang chọn." },
      { title: "Phím B (Black) & Phím W (White)", desc: "Ẩn màn hình chiếu để lôi cuốn sự chú ý của người nghe về phía diễn giả." },
      { title: "Slide Master (View > Slide Master)", desc: "Định dạng template, logo, footer cho hàng trăm slide đồng loạt chỉ với 1 cú click." }
    ],
    tips: [
      { title: "Quy tắc Đặt tên File Chuyên Nghiệp", desc: "Nên đặt theo cấu trúc: <code>YYYYMMDD_TenDuAn_TenFile_v1.0.docx</code> để dễ tìm kiếm và quản lý phiên bản." },
      { title: "Bảo Mật & Phục Hồi AutoRecover", desc: "Vào File > Options > Save > Chỉnh 'Save AutoRecover information every 1 minutes' để không bao giờ sợ mất bài." }
    ]
  },

  // Shop Items
  shopItems: [
    { id: "coffee", name: "Cà Phê Highlands Đậm Vị", price: 500000, icon: "☕", effect: "Hồi phục 100% Năng Lượng làm việc" },
    { id: "keyboard_rgb", name: "Bàn Phím Cơ Custom RGB", price: 2500000, icon: "⌨️", effect: "Tăng 50% EXP khi gõ phím tắt" },
    { id: "ergonomic_mouse", name: "Chuột Công Thái Học MX Master", price: 3000000, icon: "🖱️", effect: "Tăng tốc độ di chuyển và xử lý Excel" },
    { id: "mos_cert", name: "Chứng Chỉ MOS Master Quốc Tế", price: 10000000, icon: "📜", effect: "Danh hiệu Master Tin Học Văn Phòng VIP" }
  ]
};
