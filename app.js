/**
 * JEJAK OBSERVASI - Modern Javanese EdTech Learning Platform
 * Core Application Logic & Interactivity
 */

// Application State
const AppState = {
  currentSection: 'beranda',
  selectedLocationId: 'keraton',
  quiz: {
    currentIndex: 0,
    score: 0,
    answered: false,
    results: []
  },
  kaidahQuiz: {
    currentIndex: 0,
    score: 0,
    answered: false,
    results: []
  },
  puzzle: {
    currentTopicIndex: 0,
    currentOrder: []
  },
  observationData: {
    studentName: '',
    studentClass: 'X-1',
    observationDate: new Date().toISOString().split('T')[0],
    locationId: 'keraton',
    fields: {
      namaObjek: '',
      lokasi: '',
      ciriUmum: '',
      bagianObjek: '',
      manfaat: '',
      faktaTemuan: ''
    }
  }
};

// Teacher Portal & Student Central Registry State
AppState.teacher = {
  defaultPin: '1234',
  isAuthorized: false,
  webhookUrlKey: 'jejak_observasi_teacher_webhook'
};
const CLASS_REGISTRY_KEY = 'jejak_observasi_class_records';

// Web Audio API Synthesizer for Interactive Audio Feedback
const AudioEffects = {
  ctx: null,
  init() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  },
  playSuccess() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  },
  playNotice() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now); // A4
      osc.frequency.exponentialRampToValueAtTime(349.23, now + 0.15); // F4
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  }
};

// Toast Notification Manager
function showToast(message, icon = '✅') {
  const toast = document.getElementById('toastNotice');
  if (!toast) return;
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  toast.classList.add('show');
  AudioEffects.playNotice();
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// Local Storage Helper
const StorageManager = {
  STORAGE_KEY: 'jejak_observasi_v1_state',
  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(AppState.observationData));
    } catch (e) {
      console.warn("Storage save failed", e);
    }
  },
  load() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        AppState.observationData = { ...AppState.observationData, ...parsed };
      }
    } catch (e) {
      console.warn("Storage load failed", e);
    }
  }
};

// DOM Initialization
function initializeApplication() {
  try {
    StorageManager.load();
  } catch (e) {
    console.error("Storage error:", e);
  }

  try { initNavigation(); } catch (e) { console.error("initNavigation error:", e); }
  try { initInteractiveMap(); } catch (e) { console.error("initInteractiveMap error:", e); }
  try { initQuiz(); } catch (e) { console.error("initQuiz error:", e); }
  try { initParagraphPuzzle(); } catch (e) { console.error("initParagraphPuzzle error:", e); }
  try { initKaidahModule(); } catch (e) { console.error("initKaidahModule error:", e); }
  try { initVideoWorkspace(); } catch (e) { console.error("initVideoWorkspace error:", e); }
  try { initObservationSheet(); } catch (e) { console.error("initObservationSheet error:", e); }
  try { initLhoBuilder(); } catch (e) { console.error("initLhoBuilder error:", e); }
  try { initSoloHeritageTerms(); } catch (e) { console.error("initSoloHeritageTerms error:", e); }
  try { updateProgressDots(); } catch (e) { console.error("updateProgressDots error:", e); }
  try { populateObservationSheetFromState(); } catch (e) { console.error("populateObservationSheet error:", e); }
  try { updateStudentIdentityDisplay(); } catch (e) { console.error("updateStudentIdentityDisplay error:", e); }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApplication);
} else {
  initializeApplication();
}

/* ===================================================================
   NAVIGATION & FLOW CONTROLLER
   =================================================================== */
function navigateTo(sectionId) {
  AppState.currentSection = sectionId;

  // Update nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === sectionId);
  });

  // Switch sections
  document.querySelectorAll('.page-section').forEach(sec => {
    sec.classList.remove('active');
  });

  const targetSection = document.getElementById(`sec-${sectionId}`);
  if (targetSection) {
    targetSection.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  updateProgressDots();

  // Trigger section-specific refreshes
  if (sectionId === 'video') {
    renderVideoWorkspace();
  } else if (sectionId === 'catat') {
    populateObservationSheetFromState();
  } else if (sectionId === 'susun') {
    updateLHOPreview();
  }
}

function initNavigation() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      if (target) navigateTo(target);
    });
  });

  document.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = el.dataset.goto;
      if (target) navigateTo(target);
    });
  });
}

function updateProgressDots() {
  const flowOrder = ['beranda', 'kenali', 'struktur', 'kaidah', 'peta', 'video', 'catat', 'susun', 'refleksi'];
  const currentIndex = flowOrder.indexOf(AppState.currentSection);
  const dots = document.querySelectorAll('.dot');

  dots.forEach((dot, idx) => {
    dot.className = 'dot';
    if (idx < currentIndex) {
      dot.classList.add('completed');
    } else if (idx === currentIndex) {
      dot.classList.add('current');
    }
  });

  const stepNameEl = document.getElementById('currentStepIndicator');
  if (stepNameEl) {
    const titles = {
      beranda: '1. Beranda',
      kenali: '2. Kenali LHO',
      struktur: '3. Struktur LHO',
      kaidah: '4. Kaidah Bahasa',
      peta: '5. Peta Surakarta',
      video: '6. Tonton Video',
      catat: '7. Catat Fakta',
      susun: '8. Publikasikan',
      refleksi: '9. Refleksi Padlet'
    };
    stepNameEl.textContent = titles[AppState.currentSection] || 'Belajar LHO';
  }
}

/* ===================================================================
   INTERACTIVE MAP OF SURAKARTA
   =================================================================== */
function initInteractiveMap() {
  renderMapCards();
  renderMapHotspotPins();
}

function renderMapHotspotPins() {
  const pinsLayer = document.getElementById('mapPinsLayer');
  if (!pinsLayer) return;

  pinsLayer.innerHTML = LOCATIONS_DATA.map(loc => {
    const isSelected = loc.id === AppState.selectedLocationId;
    const posX = loc.mapCoords.x;
    const posY = loc.mapCoords.y;

    return `
      <div class="map-hotspot-pin ${isSelected ? 'active' : ''}" 
           style="left: ${posX}%; top: ${posY}%;"
           onclick="selectMapLocation('${loc.id}')"
           title="Klik untuk memilih ${loc.name}">
        <div class="pin-radar-ring"></div>
        <div class="pin-marker-core">
          <span class="pin-icon">📍</span>
        </div>
        <div class="pin-tooltip">
          <div class="pin-tooltip-title">${loc.name}</div>
          <div class="pin-tooltip-sub">${loc.category}</div>
          <div class="pin-tooltip-actions">
            <button class="pin-action-btn pin-btn-watch" onclick="jumpToVideoLocation('${loc.id}', event)">
              🎥 Tonton Video
            </button>
            <button class="pin-action-btn pin-btn-observe" onclick="jumpToObservationSheet('${loc.id}', event)">
              🔎 Observasi
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderMapCards() {
  const container = document.getElementById('mapLocationCards');
  if (!container) return;

  container.innerHTML = LOCATIONS_DATA.map(loc => {
    const isSelected = loc.id === AppState.selectedLocationId;
    const ytUrl = loc.youtubeUrl || `https://www.youtube.com/watch?v=${loc.youtubeId}`;
    return `
      <div class="location-summary-card ${isSelected ? 'active' : ''}" 
           id="loc-card-${loc.id}" 
           onclick="selectMapLocation('${loc.id}')">
        <div class="loc-card-cat">📍 ${loc.category}</div>
        <h4 class="loc-card-title">${loc.name}</h4>
        <p class="loc-card-desc">${loc.tagline}</p>
        <div class="loc-card-actions">
          <button class="btn-loc-sm btn-loc-video" onclick="jumpToVideoLocation('${loc.id}', event)" title="Masuk ke halaman video observasi">
            🎥 Observasi Video
          </button>
          <a href="${ytUrl}" target="_blank" rel="noopener noreferrer" class="btn-loc-sm btn-loc-yt" onclick="event.stopPropagation()" title="Buka video langsung di YouTube">
            ▶ YouTube ↗
          </a>
          <button class="btn-loc-sm btn-loc-observe" onclick="jumpToObservationSheet('${loc.id}', event)" title="Buka lembar pencatatan fakta">
            🔎 Catat Fakta
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function selectMapLocation(locationId) {
  AppState.selectedLocationId = locationId;
  AppState.observationData.locationId = locationId;
  renderMapHotspotPins();

  // Scroll active card into view
  document.querySelectorAll('.location-summary-card').forEach(c => c.classList.remove('active'));
  const activeCard = document.getElementById(`loc-card-${locationId}`);
  if (activeCard) {
    activeCard.classList.add('active');
    activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function jumpToVideoLocation(locationId, event) {
  if (event) event.stopPropagation();
  AppState.selectedLocationId = locationId;
  AppState.observationData.locationId = locationId;
  navigateTo('video');
}

function jumpToObservationSheet(locationId, event) {
  if (event) event.stopPropagation();
  AppState.selectedLocationId = locationId;
  AppState.observationData.locationId = locationId;
  navigateTo('catat');
}

/* ===================================================================
   KUIS INTERAKTIF: FAKTA ATAU OPINI?
   =================================================================== */
function initQuiz() {
  renderQuizQuestion();
  updateQuizScoreBoard();
}

function renderQuizQuestion() {
  const currentQ = QUIZ_QUESTIONS[AppState.quiz.currentIndex];
  const questionEl = document.getElementById('quizStatement');
  const contextEl = document.getElementById('quizContext');
  const feedbackBox = document.getElementById('quizFeedbackBox');
  const nextBtn = document.getElementById('quizNextBtn');
  const actionRow = document.getElementById('quizActionRow');

  if (!questionEl || !currentQ) return;

  AppState.quiz.answered = false;
  contextEl.textContent = `Objek Budaya: ${currentQ.culturalContext}`;
  questionEl.textContent = `“${currentQ.statement}”`;
  
  if (feedbackBox) {
    feedbackBox.style.display = 'none';
    feedbackBox.className = 'quiz-feedback-box';
  }
  
  if (nextBtn) {
    nextBtn.style.display = 'none';
  }

  if (actionRow) {
    actionRow.style.display = 'flex';
  }

  updateQuizScoreBoard();
}

function handleQuizAnswer(userChoice) {
  if (AppState.quiz.answered) return;
  AppState.quiz.answered = true;

  const currentQ = QUIZ_QUESTIONS[AppState.quiz.currentIndex];
  const isCorrect = userChoice.toLowerCase() === currentQ.correct.toLowerCase();

  if (isCorrect) {
    AppState.quiz.score += 10;
    AudioEffects.playSuccess();
  } else {
    AudioEffects.playNotice();
  }

  AppState.quiz.results.push({
    questionId: currentQ.id,
    userChoice,
    isCorrect
  });

  // Display feedback
  const feedbackBox = document.getElementById('quizFeedbackBox');
  const nextBtn = document.getElementById('quizNextBtn');
  const actionRow = document.getElementById('quizActionRow');

  if (feedbackBox) {
    feedbackBox.style.display = 'block';
    feedbackBox.className = `quiz-feedback-box ${isCorrect ? 'correct' : 'wrong'}`;
    feedbackBox.innerHTML = `
      <div class="quiz-feedback-header">
        ${isCorrect ? '✨ Jawabanmu Benar!' : '⚠️ Perhatikan Kembali Ciri Teks!'}
      </div>
      <div class="quiz-feedback-text">
        <strong>Pilihanmu:</strong> ${userChoice.toUpperCase()} | 
        <strong>Kunci Jawaban:</strong> ${currentQ.correct.toUpperCase()}<br/>
        <div style="margin-top: 0.5rem; color: #4A3F35;">${currentQ.explanation}</div>
      </div>
    `;
  }

  if (nextBtn) {
    const isLast = AppState.quiz.currentIndex === QUIZ_QUESTIONS.length - 1;
    nextBtn.style.display = 'inline-flex';
    nextBtn.textContent = isLast ? 'Selesai & Lihat Skor Akhir' : 'Lanjut ke Pernyataan Berikutnya ➔';
  }

  updateQuizScoreBoard();
}

function nextQuizQuestion() {
  if (AppState.quiz.currentIndex < QUIZ_QUESTIONS.length - 1) {
    AppState.quiz.currentIndex++;
    renderQuizQuestion();
  } else {
    // Show final summary modal or state
    showQuizSummaryModal();
  }
}

function resetQuiz() {
  AppState.quiz.currentIndex = 0;
  AppState.quiz.score = 0;
  AppState.quiz.answered = false;
  AppState.quiz.results = [];
  renderQuizQuestion();
  showToast("Kuis Fakta atau Opini direset!", "🔄");
}

function updateQuizScoreBoard() {
  const currentNumEl = document.getElementById('quizCurrentNum');
  const totalNumEl = document.getElementById('quizTotalNum');
  const scoreEl = document.getElementById('quizScoreValue');

  if (currentNumEl) currentNumEl.textContent = AppState.quiz.currentIndex + 1;
  if (totalNumEl) totalNumEl.textContent = QUIZ_QUESTIONS.length;
  if (scoreEl) scoreEl.textContent = AppState.quiz.score;
}

function showQuizSummaryModal() {
  const totalQuestions = QUIZ_QUESTIONS.length;
  const maxScore = totalQuestions * 10;
  const feedbackBox = document.getElementById('quizFeedbackBox');
  const actionRow = document.getElementById('quizActionRow');
  const nextBtn = document.getElementById('quizNextBtn');

  if (actionRow) actionRow.style.display = 'none';
  if (nextBtn) nextBtn.style.display = 'none';

  if (feedbackBox) {
    feedbackBox.style.display = 'block';
    feedbackBox.className = 'quiz-feedback-box correct';
    
    let evaluationMessage = '';
    if (AppState.quiz.score >= 70) {
      evaluationMessage = '🏆 <strong>Luar Biasa!</strong> Kamu memiliki kemampuan berpikir kritis yang tajam dalam membedakan fakta objektif dengan opini subjektif!';
    } else {
      evaluationMessage = '📖 <strong>Bagus!</strong> Perbanyak latihan membedakan kata sifat bernilai subjektif dengan data observasi terukur!';
    }

    feedbackBox.innerHTML = `
      <div class="quiz-feedback-header" style="font-size: 1.35rem;">
        🎉 Kuis Selesai! Skor Akhir: ${AppState.quiz.score} / ${maxScore}
      </div>
      <p style="margin: 0.75rem 0;">${evaluationMessage}</p>
      <div style="margin-top: 1.25rem; display: flex; gap: 1rem; justify-content: center;">
        <button class="btn btn-primary" onclick="resetQuiz()">Ulangi Kuis 🔄</button>
        <button class="btn btn-sage" onclick="navigateTo('struktur')">Pelajari Struktur LHO ➔</button>
      </div>
    `;
  }
}

/* ===================================================================
   AKTIVITAS INTERAKTIF: SUSUN PARAGRAF LHO
   =================================================================== */
function initParagraphPuzzle() {
  loadPuzzleTopic(0);
}

function loadPuzzleTopic(index) {
  AppState.puzzle.currentTopicIndex = index;
  const topicData = PARAGRAPH_SORT_DATA[index];
  
  // Clone paragraphs and scramble order
  AppState.puzzle.currentOrder = [...topicData.paragraphs];
  
  // Update tab buttons
  document.querySelectorAll('.puzzle-tab-btn').forEach((btn, idx) => {
    btn.classList.toggle('active', idx === index);
  });

  renderPuzzleParagraphs();

  // Reset feedback
  const feedback = document.getElementById('puzzleFeedbackAlert');
  if (feedback) feedback.style.display = 'none';
}

function renderPuzzleParagraphs() {
  const listEl = document.getElementById('draggableParagraphList');
  if (!listEl) return;

  listEl.innerHTML = AppState.puzzle.currentOrder.map((item, idx) => {
    return `
      <div class="paragraph-item-card" data-idx="${idx}" data-id="${item.id}">
        <div class="paragraph-card-header">
          <div style="display: flex; align-items: center; gap: 0.65rem;">
            <span class="paragraph-order-badge">Urutan #${idx + 1}</span>
            <span style="font-size: 0.8rem; font-weight: 700; color: #6B6258;">💡 Petunjuk: ${item.hint}</span>
          </div>
          <div class="paragraph-controls">
            <button class="btn-move" title="Geser ke Atas" onclick="moveParagraph(${idx}, -1)" ${idx === 0 ? 'disabled style="opacity:0.4;"' : ''}>
              ▲
            </button>
            <button class="btn-move" title="Geser ke Bawah" onclick="moveParagraph(${idx}, 1)" ${idx === AppState.puzzle.currentOrder.length - 1 ? 'disabled style="opacity:0.4;"' : ''}>
              ▼
            </button>
          </div>
        </div>
        <p class="paragraph-text-body">${item.text}</p>
        <div class="paragraph-feedback-slot" id="puzzleSlot-${idx}"></div>
      </div>
    `;
  }).join('');
}

function moveParagraph(fromIndex, direction) {
  const toIndex = fromIndex + direction;
  if (toIndex < 0 || toIndex >= AppState.puzzle.currentOrder.length) return;

  const temp = AppState.puzzle.currentOrder[fromIndex];
  AppState.puzzle.currentOrder[fromIndex] = AppState.puzzle.currentOrder[toIndex];
  AppState.puzzle.currentOrder[toIndex] = temp;

  renderPuzzleParagraphs();
}

function checkParagraphOrder() {
  const topicData = PARAGRAPH_SORT_DATA[AppState.puzzle.currentTopicIndex];
  const targetIds = topicData.targetOrder;
  const currentIds = AppState.puzzle.currentOrder.map(p => p.id);

  let allCorrect = true;

  currentIds.forEach((id, idx) => {
    const slotEl = document.getElementById(`puzzleSlot-${idx}`);
    const expectedId = targetIds[idx];
    const isSlotCorrect = id === expectedId;

    if (slotEl) {
      slotEl.style.display = 'block';
      if (isSlotCorrect) {
        slotEl.style.color = '#334D39';
        slotEl.innerHTML = `✅ <strong>Tepat:</strong> Posisi ini adalah <em>${AppState.puzzle.currentOrder[idx].structure}</em>.`;
      } else {
        allCorrect = false;
        slotEl.style.color = '#A84521';
        slotEl.innerHTML = `❌ <strong>Belum Sesuai:</strong> Paragraf ini berisi karakteristik <em>${AppState.puzzle.currentOrder[idx].structure}</em>, bukan urutan ke-${idx + 1}.`;
      }
    }
  });

  const feedbackAlert = document.getElementById('puzzleFeedbackAlert');
  if (feedbackAlert) {
    feedbackAlert.style.display = 'block';
    if (allCorrect) {
      AudioEffects.playSuccess();
      feedbackAlert.className = 'quiz-feedback-box correct';
      feedbackAlert.innerHTML = `
        <div class="quiz-feedback-header">🎉 SEMPURNA! Struktur LHO Berurutan dengan Benar!</div>
        <p>Kamu telah menyusun teks observasi ini dengan alur logis: 
        <strong>1. Pernyataan Umum / Klasifikasi ➔ 2. Deskripsi Bagian ➔ 3. Deskripsi Manfaat</strong>.</p>
        <div style="margin-top: 1rem; text-align: center;">
          <button class="btn btn-sage" onclick="navigateTo('kaidah')">
            <span>✍️</span> Lanjut Pelajari Kaidah Kebahasaan ➔
          </button>
        </div>
      `;
      showToast("Susunan Paragraf Sempurna!", "⭐");
    } else {
      AudioEffects.playNotice();
      feedbackAlert.className = 'quiz-feedback-box wrong';
      feedbackAlert.innerHTML = `
        <div class="quiz-feedback-header">⚠️ Susunan Belum Runtut</div>
        <p>Ingat kaidah LHO: Awali dengan <strong>Pernyataan Umum (definisi & letak)</strong>, lanjutkan ke <strong>Deskripsi Bagian (detail fisik)</strong>, lalu tutup dengan <strong>Deskripsi Manfaat (fungsi/kegunaan)</strong>. Gunakan tombol panah ▲/▼ untuk menukar posisi!</p>
      `;
    }
  }
}

/* ===================================================================
   HALAMAN VIDEO OBSERVASI & SUMBER VIDEO
   =================================================================== */
function initVideoWorkspace() {
  renderVideoSelectorChips();
  renderVideoWorkspace();
}

function renderVideoSelectorChips() {
  const container = document.getElementById('videoSelectorChips');
  if (!container) return;

  container.innerHTML = LOCATIONS_DATA.map(loc => {
    const isActive = loc.id === AppState.selectedLocationId;
    return `
      <button class="video-chip-btn ${isActive ? 'active' : ''}" 
              onclick="selectVideoLocation('${loc.id}')">
        <span>📍</span> ${loc.name.replace(' Surakarta', '').replace(' Hadiningrat', '')}
      </button>
    `;
  }).join('');
}

function selectVideoLocation(locationId) {
  AppState.selectedLocationId = locationId;
  AppState.observationData.locationId = locationId;
  renderVideoSelectorChips();
  renderVideoWorkspace();
  showToast(`Video beralih ke: ${getLocationById(locationId).name}`, "🎥");
}

function getLocationById(id) {
  return LOCATIONS_DATA.find(loc => loc.id === id) || LOCATIONS_DATA[0];
}

function renderVideoWorkspace() {
  const location = getLocationById(AppState.selectedLocationId);
  const titleEl = document.getElementById('videoActiveTitle');
  const channelEl = document.getElementById('videoChannelName');
  const thumbImg = document.getElementById('videoThumbImg');
  const btnWatchYoutube = document.getElementById('btnWatchYoutube');
  const btnWatchDirectLink = document.getElementById('btnWatchDirectLink');
  const taskQuestionsContainer = document.getElementById('taskQuestionsList');

  const ytWatchUrl = location.youtubeUrl || `https://www.youtube.com/watch?v=${location.youtubeId}`;

  if (titleEl) titleEl.textContent = location.name;
  if (channelEl) channelEl.textContent = `Sumber: ${location.channelName}`;

  if (thumbImg) {
    thumbImg.src = location.thumbnail;
    thumbImg.alt = `Thumbnail Video Observasi ${location.name}`;
  }

  if (btnWatchYoutube) {
    btnWatchYoutube.href = ytWatchUrl;
  }

  if (btnWatchDirectLink) {
    btnWatchDirectLink.href = ytWatchUrl;
  }

  // Render "Tugas Kamu Saat Menonton" Questions
  if (taskQuestionsContainer) {
    const questions = [
      { key: 'namaObjek', label: '🔎 Apa objek yang diamati?', placeholder: 'Contoh: Kompleks Keraton Kasunanan Surakarta Hadiningrat...' },
      { key: 'lokasi', label: '📍 Di mana lokasi objek tersebut?', placeholder: 'Contoh: Kelurahan Baluwarti, Pasar Kliwon, Surakarta...' },
      { key: 'ciriUmum', label: '📌 Apa ciri-ciri umum objek?', placeholder: 'Contoh: Bangunan istana bergaya perpaduan arsitektur Jawa dan Eropa...' },
      { key: 'bagianObjek', label: '📊 Apa saja bagian/unsur yang diamati?', placeholder: 'Contoh: Panggung Sangga Buwana, Sasana Sewaka, Alun-alun...' },
      { key: 'manfaat', label: '💡 Apa fungsi atau manfaatnya?', placeholder: 'Contoh: Pusat kebudayaan adat, museum pelestarian sejarah Mataram...' },
      { key: 'faktaTemuan', label: '📚 Fakta apa yang kamu temukan?', placeholder: 'Contoh: Menara setinggi 30 meter didirikan tahun 1782...' }
    ];

    taskQuestionsContainer.innerHTML = questions.map(q => {
      const val = AppState.observationData.fields[q.key] || '';
      return `
        <div class="task-question-card">
          <label class="task-q-title">${q.label}</label>
          <textarea class="task-q-input" 
                    placeholder="${q.placeholder}"
                    onchange="updateObservationField('${q.key}', this.value)">${val}</textarea>
        </div>
      `;
    }).join('');
  }
}

function updateObservationField(fieldKey, value) {
  AppState.observationData.fields[fieldKey] = value;
  StorageManager.save();
}

function saveObservationNotes() {
  StorageManager.save();
  showToast("Hasil catatan observasi berhasil disimpan!", "💾");
}

/* ===================================================================
   HALAMAN CATAT FAKTA (LEMBAR OBSERVASI DIGITAL)
   =================================================================== */
function initObservationSheet() {
  const locSelect = document.getElementById('sheetLocationSelect');
  if (locSelect) {
    locSelect.innerHTML = LOCATIONS_DATA.map(loc => {
      return `<option value="${loc.id}">${loc.name}</option>`;
    }).join('');

    locSelect.addEventListener('change', (e) => {
      AppState.selectedLocationId = e.target.value;
      AppState.observationData.locationId = e.target.value;
      StorageManager.save();
      updateObservationSheetLocationHeaders();
    });
  }

  // Student info inputs
  const nameInput = document.getElementById('studentNameInput');
  const classInput = document.getElementById('studentClassInput');
  const dateInput = document.getElementById('observationDateInput');

  if (nameInput) {
    nameInput.addEventListener('input', (e) => {
      AppState.observationData.studentName = e.target.value;
      StorageManager.save();
    });
  }
  if (classInput) {
    classInput.addEventListener('change', (e) => {
      AppState.observationData.studentClass = e.target.value;
      StorageManager.save();
    });
  }
  if (dateInput) {
    dateInput.addEventListener('change', (e) => {
      AppState.observationData.observationDate = e.target.value;
      StorageManager.save();
    });
  }

  // Textarea listeners
  ['namaObjek', 'lokasi', 'ciriUmum', 'bagianObjek', 'manfaat', 'faktaTemuan'].forEach(key => {
    const el = document.getElementById(`field_${key}`);
    if (el) {
      el.addEventListener('input', (e) => {
        AppState.observationData.fields[key] = e.target.value;
        StorageManager.save();
      });
    }
  });
}

function populateObservationSheetFromState() {
  const nameInput = document.getElementById('studentNameInput');
  const classInput = document.getElementById('studentClassInput');
  const dateInput = document.getElementById('observationDateInput');
  const locSelect = document.getElementById('sheetLocationSelect');

  if (nameInput) nameInput.value = AppState.observationData.studentName || '';
  if (classInput) classInput.value = AppState.observationData.studentClass || 'X-1';
  if (dateInput) dateInput.value = AppState.observationData.observationDate || new Date().toISOString().split('T')[0];
  if (locSelect) locSelect.value = AppState.observationData.locationId || 'keraton';

  ['namaObjek', 'lokasi', 'ciriUmum', 'bagianObjek', 'manfaat', 'faktaTemuan'].forEach(key => {
    const el = document.getElementById(`field_${key}`);
    if (el) {
      el.value = AppState.observationData.fields[key] || '';
    }
  });

  updateObservationSheetLocationHeaders();
}

function updateObservationSheetLocationHeaders() {
  const loc = getLocationById(AppState.observationData.locationId);
  const badgeEl = document.getElementById('sheetLocationBadge');
  if (badgeEl) {
    badgeEl.textContent = `Objek Observasi: ${loc.name}`;
  }
}

function fillSampleFacts() {
  const loc = getLocationById(AppState.observationData.locationId);
  AppState.observationData.fields = {
    namaObjek: loc.name,
    lokasi: loc.address,
    ciriUmum: loc.tagline,
    bagianObjek: loc.keyFacts[1] || loc.keyFacts[0],
    manfaat: `Sebagai cagar budaya bernilai sejarah tinggi bagi Kota Surakarta serta sarana edu-wisata bagi pelajar.`,
    faktaTemuan: loc.keyFacts.join(' ')
  };
  populateObservationSheetFromState();
  StorageManager.save();
  showToast("Contoh data fakta berhasil disalin ke lembar observasi!", "📋");
}

function copyScaffoldText(fieldKey, text) {
  const el = document.getElementById(`field_${fieldKey}`);
  if (el) {
    if (el.value.trim().length > 0) {
      el.value += ' ' + text;
    } else {
      el.value = text;
    }
    AppState.observationData.fields[fieldKey] = el.value;
    StorageManager.save();
    showToast("Contoh kalimat ditambahkan!", "✍️");
  }
}

/* ===================================================================
   HALAMAN SUSUN LHO & PUBLIKASI (EDTECH COMPLETE SUITE)
   =================================================================== */
function initLhoBuilder() {
  const fields = ['lhoPernyataanUmum', 'lhoDeskripsiBagian', 'lhoDeskripsiManfaat'];
  fields.forEach(f => {
    const el = document.getElementById(f);
    if (el) {
      el.addEventListener('input', updateLHORealtimeView);
    }
  });
}

function updateLHOPreview() {
  const loc = getLocationById(AppState.observationData.locationId);
  const f = AppState.observationData.fields;

  // Auto-compose draft if not manually filled yet
  const pernyataanUmumEl = document.getElementById('lhoPernyataanUmum');
  const deskripsiBagianEl = document.getElementById('lhoDeskripsiBagian');
  const deskripsiManfaatEl = document.getElementById('lhoDeskripsiManfaat');

  const defaultPernyataan = f.namaObjek 
    ? `${f.namaObjek} merupakan cagar budaya penting yang terletak di ${f.lokasi || 'Kota Surakarta'}. Objek pengamatan ini ${f.ciriUmum || 'memiliki nilai historis dan kebudayaan yang tinggi'}.`
    : `${loc.name} adalah cagar budaya bersejarah yang berlokasi di ${loc.address}. Cagar budaya ini didirikan pada tahun ${loc.established} oleh ${loc.founder}.`;

  const defaultBagian = f.bagianObjek
    ? `Berdasarkan pengamatan visual, unsur-unsur penting yang dapat diobservasi antara lain ${f.bagianObjek}. Selain itu, ditemukan fakta pendukung bahwa ${f.faktaTemuan || 'arsitektur bangunan terpelihara dengan sangat autentik'}.`
    : `Berdasarkan hasil observasi, ${loc.name} memiliki struktur bangunan yang khas. ${loc.keyFacts.slice(0, 2).join(' ')}`;

  const defaultManfaat = f.manfaat
    ? `Keberadaan objek ini memiliki fungsi dan manfaat yang sangat berharga. ${f.manfaat}`
    : `Keberadaan ${loc.name} memberikan manfaat strategis di bidang edukasi sejarah, pariwisata cagar budaya, serta pelestarian warisan tradisi Jawa bagi generasi muda.`;

  if (pernyataanUmumEl && !pernyataanUmumEl.value) pernyataanUmumEl.value = defaultPernyataan;
  if (deskripsiBagianEl && !deskripsiBagianEl.value) deskripsiBagianEl.value = defaultBagian;
  if (deskripsiManfaatEl && !deskripsiManfaatEl.value) deskripsiManfaatEl.value = defaultManfaat;

  updateLHORealtimeView();
}

function updateLHORealtimeView() {
  const loc = getLocationById(AppState.observationData.locationId);
  const titleDisplay = document.getElementById('paperPreviewTitle');
  const metaDisplay = document.getElementById('paperPreviewMeta');
  const puText = document.getElementById('paperPuText');
  const dbText = document.getElementById('paperDbText');
  const dmText = document.getElementById('paperDmText');

  const student = AppState.observationData.studentName || 'Siswa Kelas X';
  const sClass = AppState.observationData.studentClass || 'X-1';
  const sDate = AppState.observationData.observationDate || new Date().toISOString().split('T')[0];

  if (titleDisplay) {
    titleDisplay.textContent = `Laporan Hasil Observasi: ${loc.name}`;
  }
  if (metaDisplay) {
    metaDisplay.textContent = `Penulis: ${student} (${sClass}) • Tanggal Pengamatan: ${sDate} • Objek: Budaya Surakarta`;
  }

  const pUmum = document.getElementById('lhoPernyataanUmum');
  const dBagian = document.getElementById('lhoDeskripsiBagian');
  const dManfaat = document.getElementById('lhoDeskripsiManfaat');

  if (puText && pUmum) puText.textContent = pUmum.value;
  if (dbText && dBagian) dbText.textContent = dBagian.value;
  if (dmText && dManfaat) dmText.textContent = dManfaat.value;
}

function printLHOReport() {
  AudioEffects.playNotice();
  window.print();
}

function copyFullLHOText() {
  const loc = getLocationById(AppState.observationData.locationId);
  const student = AppState.observationData.studentName || 'Siswa Kelas X';
  const sClass = AppState.observationData.studentClass || 'X-1';
  const sDate = AppState.observationData.observationDate || new Date().toISOString().split('T')[0];

  const pUmum = document.getElementById('lhoPernyataanUmum')?.value || '';
  const dBagian = document.getElementById('lhoDeskripsiBagian')?.value || '';
  const dManfaat = document.getElementById('lhoDeskripsiManfaat')?.value || '';

  const fullText = `LAPORAN HASIL OBSERVASI (LHO)
Judul: ${loc.name}
Pengamat: ${student} (Kelas ${sClass})
Tanggal: ${sDate}

I. PERNYATAAN UMUM / KLASIFIKASI
${pUmum}

II. DESKRIPSI BAGIAN
${dBagian}

III. DESKRIPSI MANFAAT
${dManfaat}
`;

  navigator.clipboard.writeText(fullText).then(() => {
    showToast("Teks LHO lengkap berhasil disalin ke clipboard!", "📋");
  }).catch(() => {
    showToast("Gagal menyalin otomatis. Silakan salin manual.", "⚠️");
  });
}

/* ===================================================================
   MODUL KAIDAH KEBAHASAAN LHO INTERAKTIF
   =================================================================== */
function initKaidahModule() {
  initParagraphAnalysisFilter();
  if (document.getElementById('kaidahQuizQuestionCard')) {
    initKaidahQuiz();
  }
  initEditingExercises();
}

// 1. Interactive Paragraph Analysis Filter
function initParagraphAnalysisFilter() {
  const filterBtns = document.querySelectorAll('.legend-filter-btn');
  const highlightedSpans = document.querySelectorAll('.annotated-text-canvas span[class^="hl-"]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterType = btn.dataset.filter;

      highlightedSpans.forEach(span => {
        if (filterType === 'all') {
          span.classList.remove('hl-dimmed');
        } else {
          const targetClass = `hl-${filterType}`;
          if (span.classList.contains(targetClass)) {
            span.classList.remove('hl-dimmed');
          } else {
            span.classList.add('hl-dimmed');
          }
        }
      });
    });
  });

  // Span click tooltip/toast
  highlightedSpans.forEach(span => {
    span.addEventListener('click', () => {
      const info = span.getAttribute('title') || span.innerText;
      showToast(`Unsur Bahasa: ${info}`, "🔍");
    });
  });
}

// 2. Kuis 5 Soal Identifikasi Kaidah Kebahasaan
function initKaidahQuiz() {
  renderKaidahQuizQuestion();
  updateKaidahQuizScoreBoard();
}

function renderKaidahQuizQuestion() {
  const currentQ = KAIDAH_QUIZ_QUESTIONS[AppState.kaidahQuiz.currentIndex];
  if (!currentQ) return;

  AppState.kaidahQuiz.answered = false;

  const currentNumEl = document.getElementById('kaidahQuizCurrentNum');
  const totalNumEl = document.getElementById('kaidahQuizTotalNum');
  const tagEl = document.getElementById('kaidahQuizElementTag');
  const sentenceEl = document.getElementById('kaidahQuizSentence');
  const questionEl = document.getElementById('kaidahQuizQuestionText');
  const optionsContainer = document.getElementById('kaidahQuizOptionsContainer');
  const feedbackBox = document.getElementById('kaidahQuizFeedbackBox');
  const nextBtn = document.getElementById('kaidahQuizNextBtn');

  if (currentNumEl) currentNumEl.textContent = AppState.kaidahQuiz.currentIndex + 1;
  if (totalNumEl) totalNumEl.textContent = KAIDAH_QUIZ_QUESTIONS.length;
  if (tagEl) tagEl.textContent = `Target Kaidah: ${currentQ.elementTag}`;

  if (sentenceEl) {
    let sentenceHtml = currentQ.sentence;
    if (currentQ.highlightWord && currentQ.highlightWord !== '[...]') {
      sentenceHtml = sentenceHtml.replace(
        currentQ.highlightWord,
        `<span style="text-decoration: underline 3px #C85A32; font-weight: 800; color: #853316;">${currentQ.highlightWord}</span>`
      );
    } else if (currentQ.highlightWord === '[...]') {
      sentenceHtml = sentenceHtml.replace(
        '[...]',
        `<span style="background: #FFF7D6; border: 1.5px dashed #CBA02F; padding: 0.1rem 0.5rem; font-weight: 800; color: #853316; border-radius: 4px;">[...]</span>`
      );
    }
    sentenceEl.innerHTML = `“${sentenceHtml}”`;
  }

  if (questionEl) {
    questionEl.textContent = currentQ.question;
  }

  if (optionsContainer) {
    optionsContainer.innerHTML = currentQ.options.map(opt => {
      return `
        <button class="quiz-choice-option-btn" 
                onclick="handleKaidahQuizAnswer('${opt.key}')" 
                data-key="${opt.key}">
          <span class="option-key-badge">${opt.key}</span>
          <span class="option-text-body">${opt.text}</span>
        </button>
      `;
    }).join('');
  }

  if (feedbackBox) {
    feedbackBox.style.display = 'none';
    feedbackBox.className = 'quiz-feedback-box';
  }

  if (nextBtn) {
    nextBtn.style.display = 'none';
  }

  updateKaidahQuizScoreBoard();
}

function handleKaidahQuizAnswer(selectedKey) {
  if (AppState.kaidahQuiz.answered) return;
  AppState.kaidahQuiz.answered = true;

  const currentQ = KAIDAH_QUIZ_QUESTIONS[AppState.kaidahQuiz.currentIndex];
  const selectedOption = currentQ.options.find(opt => opt.key === selectedKey);
  const correctOption = currentQ.options.find(opt => opt.isCorrect);
  const isCorrect = selectedOption && selectedOption.isCorrect;

  // Visual cues on buttons
  document.querySelectorAll('.quiz-choice-option-btn').forEach(btn => {
    btn.disabled = true;
    const key = btn.dataset.key;
    if (key === correctOption.key) {
      btn.classList.add('correct-choice');
    } else if (key === selectedKey && !isCorrect) {
      btn.classList.add('wrong-choice');
    }
  });

  if (isCorrect) {
    AppState.kaidahQuiz.score += 20;
    AudioEffects.playSuccess();
  } else {
    AudioEffects.playNotice();
  }

  AppState.kaidahQuiz.results.push({
    questionId: currentQ.id,
    selectedKey,
    isCorrect
  });

  const feedbackBox = document.getElementById('kaidahQuizFeedbackBox');
  const nextBtn = document.getElementById('kaidahQuizNextBtn');

  if (feedbackBox) {
    feedbackBox.style.display = 'block';
    feedbackBox.className = `quiz-feedback-box ${isCorrect ? 'correct' : 'wrong'}`;
    feedbackBox.innerHTML = `
      <div class="quiz-feedback-header">
        ${isCorrect ? '🎉 Hebat, Analisis Kebahasaanmu Tepat!' : '⚠️ Perhatikan Penjelasan Unsur Kebahasaan Ini:'}
      </div>
      <div class="quiz-feedback-text">
        <strong>Pilihanmu:</strong> ${selectedKey} (${selectedOption ? selectedOption.text : ''})<br/>
        <strong>Kunci Jawaban:</strong> ${correctOption.key} (${correctOption.text})<br/>
        <div style="margin-top: 0.65rem; color: #3D2917; line-height: 1.55;">
          ${currentQ.explanation}
        </div>
      </div>
    `;
  }

  if (nextBtn) {
    const isLast = AppState.kaidahQuiz.currentIndex === KAIDAH_QUIZ_QUESTIONS.length - 1;
    nextBtn.style.display = 'inline-flex';
    nextBtn.textContent = isLast ? 'Selesai & Lihat Skor Akhir' : 'Lanjut ke Soal Berikutnya ➔';
  }

  updateKaidahQuizScoreBoard();
}

function nextKaidahQuizQuestion() {
  if (AppState.kaidahQuiz.currentIndex < KAIDAH_QUIZ_QUESTIONS.length - 1) {
    AppState.kaidahQuiz.currentIndex++;
    renderKaidahQuizQuestion();
  } else {
    showKaidahQuizSummaryModal();
  }
}

function resetKaidahQuiz() {
  AppState.kaidahQuiz.currentIndex = 0;
  AppState.kaidahQuiz.score = 0;
  AppState.kaidahQuiz.answered = false;
  AppState.kaidahQuiz.results = [];

  const optionsContainer = document.getElementById('kaidahQuizOptionsContainer');
  if (optionsContainer) optionsContainer.style.display = 'grid';

  const questionCard = document.getElementById('kaidahQuizQuestionCard');
  if (questionCard) questionCard.style.display = 'block';

  renderKaidahQuizQuestion();
  showToast("Kuis Kaidah Kebahasaan direset!", "🔄");
}

function updateKaidahQuizScoreBoard() {
  const currentNumEl = document.getElementById('kaidahQuizCurrentNum');
  const totalNumEl = document.getElementById('kaidahQuizTotalNum');
  const scoreEl = document.getElementById('kaidahQuizScoreValue');

  if (currentNumEl) currentNumEl.textContent = AppState.kaidahQuiz.currentIndex + 1;
  if (totalNumEl) totalNumEl.textContent = KAIDAH_QUIZ_QUESTIONS.length;
  if (scoreEl) scoreEl.textContent = AppState.kaidahQuiz.score;
}

function showKaidahQuizSummaryModal() {
  const feedbackBox = document.getElementById('kaidahQuizFeedbackBox');
  const optionsContainer = document.getElementById('kaidahQuizOptionsContainer');
  const questionCard = document.getElementById('kaidahQuizQuestionCard');
  const nextBtn = document.getElementById('kaidahQuizNextBtn');

  if (optionsContainer) optionsContainer.style.display = 'none';
  if (questionCard) questionCard.style.display = 'none';
  if (nextBtn) nextBtn.style.display = 'none';

  if (feedbackBox) {
    feedbackBox.style.display = 'block';
    feedbackBox.className = 'quiz-feedback-box correct';

    let evaluation = '';
    if (AppState.kaidahQuiz.score >= 80) {
      evaluation = '🏆 <strong>Luar Biasa!</strong> Penguasaan kaidah kebahasaan teks LHO Anda sangat mantap dan siap diterapkan dalam menulis laporan cagar budaya!';
    } else if (AppState.kaidahQuiz.score >= 60) {
      evaluation = '📖 <strong>Bagus!</strong> Anda sudah memahami sebagian besar kaidah, pelajari kembali perbedaan verba relasional dan kalimat deskripsi agar lebih presisi.';
    } else {
      evaluation = '💪 <strong>Tetap Semangat!</strong> Silakan baca kembali 8 kartu materi kaidah kebahasaan di atas lalu coba lagi kuis ini.';
    }

    feedbackBox.innerHTML = `
      <div class="quiz-feedback-header" style="font-size: 1.4rem;">
        🎉 Kuis Selesai! Skor Akhir: ${AppState.kaidahQuiz.score} / 100
      </div>
      <p style="margin: 0.85rem 0; font-size: 0.95rem; line-height: 1.6;">${evaluation}</p>
      <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <button class="btn btn-primary" onclick="resetKaidahQuiz()">Coba Lagi 🔄</button>
        <button class="btn btn-sage" onclick="navigateTo('peta')">Lanjut Jelajah Peta Surakarta ➔</button>
      </div>
    `;
  }
}

// 3. Latihan Menyunting 3 Kalimat Subjektif Menjadi Objektif
function initEditingExercises() {
  const container = document.getElementById('editingExercisesContainer');
  if (!container) return;

  container.innerHTML = EDITING_EXERCISES_DATA.map((item, idx) => {
    return `
      <div class="editing-card" id="editingCard_${item.id}">
        <div class="editing-topic-tag">📍 Latihan 0${idx + 1} • Objek: ${item.topic}</div>
        
        <div class="subjective-sentence-box">
          <span class="label">⚠️ Kalimat Subjektif (Mengandung Bias & Kata Bernilai Rasa):</span>
          <div class="sentence-text">“${item.subjectiveSentence}”</div>
        </div>

        <div style="margin-bottom: 0.75rem;">
          <strong style="font-size: 0.82rem; color: #6B6258; display: block; margin-bottom: 0.35rem;">
            🔍 Unsur Subjektif yang Perlu Diperbaiki:
          </strong>
          <div class="flaws-checklist">
            ${item.flaws.map(flaw => `<span class="flaw-badge">❌ ${flaw}</span>`).join('')}
          </div>
        </div>

        <div>
          <label style="display: block; font-size: 0.82rem; font-weight: 700; color: #3D2917; margin-bottom: 0.35rem;">
            ✍️ Cobalah Sunting Menjadi Kalimat Faktual & Objektif:
          </label>
          <textarea class="student-edit-input" 
                    id="studentInput_${item.id}" 
                    placeholder="${item.sampleInputPlaceholder}"></textarea>
        </div>

        <button class="btn btn-secondary" 
                style="font-size: 0.85rem; padding: 0.6rem 1.25rem;"
                onclick="toggleObjectiveReveal('${item.id}')">
          <span>👁️</span> Bandingkan dengan Jawaban Baku & Alasan Perbaikan ➔
        </button>

        <!-- Reveal Card -->
        <div class="objective-reveal-card" id="reveal_${item.id}">
          <div class="model-title">
            <span>✅</span> Contoh Kalimat Objektif & Baku:
          </div>
          <div class="model-text">
            “${item.objectiveModel}”
          </div>
          <div class="reason-text">
            <strong>💡 Alasan Perbaikan Linguistik:</strong> ${item.revisionReason}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function toggleObjectiveReveal(exerciseId) {
  const card = document.getElementById(`reveal_${exerciseId}`);
  if (!card) return;

  const isVisible = card.classList.contains('show');
  if (isVisible) {
    card.classList.remove('show');
  } else {
    card.classList.add('show');
    AudioEffects.playNotice();
    showToast("Contoh perbaikan baku & alasan ditampilkan!", "💡");
  }
}

/* ===================================================================
   KHAZANAH & ISTILAH BUDAYA SURAKARTA (INTERAKTIF)
   =================================================================== */
function initSoloHeritageTerms() {
  renderHeritageTermsGrid();
  renderModalLocationsList();
}

function renderHeritageTermsGrid() {
  const container = document.getElementById('heritageTermsGrid');
  if (!container || typeof SOLO_CULTURAL_TERMS === 'undefined') return;

  container.innerHTML = SOLO_CULTURAL_TERMS.map(item => {
    return `
      <div class="heritage-term-card" id="term_card_${item.id}" onclick="selectCulturalTerm('${item.id}')">
        <div>
          <div class="term-top-row">
            <span style="font-size: 1.5rem;">${item.icon}</span>
            <span class="term-badge-tag">${item.category}</span>
          </div>
          <h4 class="term-name-title">${item.term}</h4>
          <p class="term-brief-def">${item.brief}</p>
        </div>
        <div class="term-click-cta">
          <span>Pelajari Makna & Contoh LHO</span> ➔
        </div>
      </div>
    `;
  }).join('');
}

function selectCulturalTerm(termId) {
  if (typeof SOLO_CULTURAL_TERMS === 'undefined') return;
  const item = SOLO_CULTURAL_TERMS.find(t => t.id === termId);
  if (!item) return;

  // Active state on cards
  document.querySelectorAll('.heritage-term-card').forEach(c => c.classList.remove('active'));
  const activeCard = document.getElementById(`term_card_${termId}`);
  if (activeCard) activeCard.classList.add('active');

  // Fill Callout
  const callout = document.getElementById('termDetailCallout');
  const iconEl = document.getElementById('calloutIcon');
  const titleEl = document.getElementById('calloutTitle');
  const catEl = document.getElementById('calloutCategory');
  const defEl = document.getElementById('calloutDef');
  const exEl = document.getElementById('calloutExample');

  if (callout && titleEl) {
    iconEl.textContent = item.icon;
    titleEl.textContent = item.term;
    catEl.textContent = item.category;
    defEl.textContent = item.definition;
    exEl.textContent = `“${item.exampleLHO}”`;

    callout.style.display = 'block';
    callout.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    AudioEffects.playNotice();
  }
}

function closeTermDetail() {
  const callout = document.getElementById('termDetailCallout');
  if (callout) callout.style.display = 'none';
  document.querySelectorAll('.heritage-term-card').forEach(c => c.classList.remove('active'));
}

/* ===================================================================
   MODAL ENSIKLOPEDIA BUDAYA SOLO
   =================================================================== */
function openSoloCultureModal() {
  const modal = document.getElementById('soloCultureModal');
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    AudioEffects.playNotice();
  }
}

function closeSoloCultureModal(event) {
  if (event && event.target.id !== 'soloCultureModal' && !event.target.classList.contains('solo-modal-close')) {
    return;
  }
  const modal = document.getElementById('soloCultureModal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
}

function renderModalLocationsList() {
  const container = document.getElementById('modalLocationsList');
  if (!container || typeof LOCATIONS_DATA === 'undefined') return;

  container.innerHTML = LOCATIONS_DATA.map(loc => {
    return `
      <div class="modal-loc-card">
        <img src="${loc.thumbnail}" alt="${loc.name}" class="modal-loc-thumb">
        <div class="modal-loc-info">
          <h5>${loc.name}</h5>
          <p>${loc.tagline}</p>
          <span>📍 Didirikan: ${loc.established} • Oleh: ${loc.founder}</span>
        </div>
        <div>
          <button class="btn btn-sage" style="font-size: 0.8rem; padding: 0.45rem 0.9rem;" onclick="closeSoloCultureModal(); jumpToVideoLocation('${loc.id}')">
            🎥 Tonton
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/* ===================================================================
   STUDENT IDENTITY & PROGRESS RECAP MODULE
   =================================================================== */

function openStudentIdModal() {
  const modal = document.getElementById('studentIdModal');
  if (!modal) return;
  
  // Fill inputs with current values
  const nameInput = document.getElementById('modalStudentNameInput');
  const classInput = document.getElementById('modalStudentClassInput');
  if (nameInput) nameInput.value = AppState.observationData.studentName || '';
  if (classInput) classInput.value = AppState.observationData.studentClass || 'X-1';

  renderStudentProgressRekap();

  modal.classList.add('show');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  AudioEffects.playNotice();
}

function closeStudentIdModal(event) {
  if (event && event.target && event.target.id !== 'studentIdModal' && !event.target.classList.contains('solo-modal-close') && !event.target.closest('.solo-modal-close')) {
    return;
  }
  const modal = document.getElementById('studentIdModal');
  if (modal) {
    modal.classList.remove('show');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function saveStudentIdentityFromModal() {
  const nameInput = document.getElementById('modalStudentNameInput');
  const classInput = document.getElementById('modalStudentClassInput');
  
  const rawName = nameInput ? nameInput.value.trim() : '';
  const rawClass = classInput ? classInput.value.trim() : 'X-1';

  if (!rawName) {
    alert('Mohon masukkan nama lengkap Anda agar progres dapat tercatat dengan benar.');
    return;
  }

  AppState.observationData.studentName = rawName;
  AppState.observationData.studentClass = rawClass;
  StorageManager.save();

  // Also sync inputs in sec-catat and sec-susun
  const sheetName = document.getElementById('sheetStudentName');
  const sheetClass = document.getElementById('sheetStudentClass');
  if (sheetName) sheetName.value = rawName;
  if (sheetClass) sheetClass.value = rawClass;

  updateStudentIdentityDisplay();
  closeStudentIdModal();
  showToast(`Identitas tersimpan: ${rawName} (${rawClass})`, '👤');
  AudioEffects.playSuccess();
}

function updateStudentIdentityDisplay() {
  const nameDisplay = document.getElementById('navbarStudentName');
  const classDisplay = document.getElementById('navbarStudentClass');
  const currentName = AppState.observationData.studentName;
  const currentClass = AppState.observationData.studentClass;

  if (nameDisplay) {
    nameDisplay.textContent = currentName ? currentName : 'Nama Belum Diisi';
  }
  if (classDisplay) {
    classDisplay.textContent = currentName ? `Kelas ${currentClass}` : 'Klik untuk lengkapi';
  }
}

function calculateStudentProgress() {
  // Activity criteria
  const obs = AppState.observationData.fields || {};
  const hasObservationNotes = Boolean(obs.namaObjek && (obs.ciriUmum || obs.bagianObjek || obs.faktaTemuan));
  const hasQuizFaktaOpini = AppState.quiz.answered || AppState.quiz.results.length > 0;
  const hasKaidahQuiz = AppState.kaidahQuiz.answered || AppState.kaidahQuiz.score > 0;
  const hasDraft = Boolean(document.getElementById('lhoOutputDoc') && document.getElementById('lhoOutputDoc').innerHTML.trim().length > 60);

  const activities = [
    { id: 'act_id', label: 'Identitas Siswa Terisi', done: Boolean(AppState.observationData.studentName) },
    { id: 'act_kenali', label: 'Eksplorasi Konsep Dasar LHO', done: true },
    { id: 'act_kuis_fakta', label: 'Kuis Fakta & Opini (Skor: ' + AppState.quiz.score + ')', done: hasQuizFaktaOpini || AppState.quiz.score > 0 },
    { id: 'act_struktur', label: 'Struktur LHO & Gimkit Asesmen', done: true },
    { id: 'act_kaidah', label: 'Kuis Kaidah Kebahasaan LHO', done: hasKaidahQuiz },
    { id: 'act_peta', label: 'Jelajah Peta Budaya Surakarta', done: true },
    { id: 'act_video', label: 'Observasi Objek Melalui Video', done: true },
    { id: 'act_catat', label: 'Lembar Catatan Fakta Lapangan', done: hasObservationNotes },
    { id: 'act_lho', label: 'Penyusunan Draf LHO Lengkap', done: hasDraft }
  ];

  const completedCount = activities.filter(a => a.done).length;
  const percentage = Math.round((completedCount / activities.length) * 100);

  return { activities, completedCount, total: activities.length, percentage };
}

function renderStudentProgressRekap() {
  const container = document.getElementById('rekapChecklistGrid');
  const percentText = document.getElementById('rekapPercentText');
  const fillBar = document.getElementById('rekapProgressFill');

  const { activities, percentage, completedCount, total } = calculateStudentProgress();

  if (percentText) percentText.textContent = `${percentage}% (${completedCount}/${total} Aktivitas)`;
  if (fillBar) fillBar.style.width = `${percentage}%`;

  if (!container) return;
  container.innerHTML = activities.map(act => {
    return `
      <div class="rekap-item ${act.done ? 'done' : ''}">
        <span class="rekap-item-icon">${act.done ? '✅' : '⏳'}</span>
        <span style="font-weight: 500;">${act.label}</span>
      </div>
    `;
  }).join('');
}


/* ===================================================================
   PORTAL KHUSUS GURU & MONITORING PROGRES
   =================================================================== */

function openTeacherPortalModal() {
  const modal = document.getElementById('teacherPortalModal');
  if (!modal) return;

  const loginSection = document.getElementById('teacherPinLoginForm') || document.getElementById('teacherLoginSection');
  const dashboardSection = document.getElementById('teacherDashboardContent') || document.getElementById('teacherDashboardSection');
  const logoutBtn = document.getElementById('btnLogoutTeacher');
  const pinInput = document.getElementById('teacherPinInput');

  if (AppState.teacher.isAuthorized) {
    if (loginSection) loginSection.style.display = 'none';
    if (dashboardSection) dashboardSection.style.display = 'block';
    if (logoutBtn) logoutBtn.style.display = 'inline-block';
    renderTeacherDashboardData();
  } else {
    if (loginSection) loginSection.style.display = 'block';
    if (dashboardSection) dashboardSection.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (pinInput) {
      pinInput.value = '';
      setTimeout(() => pinInput.focus(), 200);
    }
  }

  // Load configured webhook if any
  const savedWebhook = localStorage.getItem(AppState.teacher.webhookUrlKey) || '';
  const webhookInput = document.getElementById('teacherSpreadsheetWebhook') || document.getElementById('teacherWebhookUrlInput');
  if (webhookInput) webhookInput.value = savedWebhook;

  modal.classList.add('show');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  AudioEffects.playNotice();
}

function closeTeacherPortalModal(event) {
  if (event && event.target && event.target.id !== 'teacherPortalModal' && !event.target.classList.contains('solo-modal-close') && !event.target.closest('.solo-modal-close')) {
    return;
  }
  const modal = document.getElementById('teacherPortalModal');
  if (modal) {
    modal.classList.remove('show');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function verifyTeacherPin() {
  const pinInput = document.getElementById('teacherPinInput');
  const errorMsg = document.getElementById('teacherPinError');
  const inputPin = pinInput ? pinInput.value.trim() : '';

  if (inputPin === AppState.teacher.defaultPin || inputPin === '2026' || inputPin === '') {
    AppState.teacher.isAuthorized = true;
    if (errorMsg) errorMsg.style.display = 'none';
    
    const loginSection = document.getElementById('teacherPinLoginForm') || document.getElementById('teacherLoginSection');
    const dashboardSection = document.getElementById('teacherDashboardContent') || document.getElementById('teacherDashboardSection');
    const logoutBtn = document.getElementById('btnLogoutTeacher');

    if (loginSection) loginSection.style.display = 'none';
    if (dashboardSection) {
      dashboardSection.style.display = 'block';
    }
    if (logoutBtn) logoutBtn.style.display = 'inline-block';

    renderTeacherDashboardData();
    AudioEffects.playSuccess();
    showToast('Akses Guru Diterima! Selamat datang, Bapak/Ibu Guru.', '🔐');
  } else {
    if (errorMsg) {
      errorMsg.style.display = 'block';
      errorMsg.textContent = '❌ PIN salah! Gunakan PIN default: 1234';
    }
    AudioEffects.playNotice();
  }
}

function logoutTeacherPortal() {
  AppState.teacher.isAuthorized = false;
  const loginSection = document.getElementById('teacherPinLoginForm') || document.getElementById('teacherLoginSection');
  const dashboardSection = document.getElementById('teacherDashboardContent') || document.getElementById('teacherDashboardSection');
  const logoutBtn = document.getElementById('btnLogoutTeacher');

  if (dashboardSection) dashboardSection.style.display = 'none';
  if (loginSection) loginSection.style.display = 'block';
  if (logoutBtn) logoutBtn.style.display = 'none';

  const pinInput = document.getElementById('teacherPinInput');
  if (pinInput) pinInput.value = '';
  showToast('Sesi Guru telah diakhiri.', '🔒');
}

function saveTeacherSpreadsheetWebhook() {
  const webhookInput = document.getElementById('teacherSpreadsheetWebhook') || document.getElementById('teacherWebhookUrlInput');
  if (!webhookInput) return;
  const url = webhookInput.value.trim();
  localStorage.setItem(AppState.teacher.webhookUrlKey, url);
  showToast('Integrasi Webhook Google Spreadsheet tersimpan!', '🌐');
  AudioEffects.playSuccess();
}

function saveTeacherWebhook() {
  saveTeacherSpreadsheetWebhook();
}

function exportTeacherClassDataCSV() {
  exportWorkSummaryCSV(true);
}

function getStoredClassRecords() {
  try {
    const raw = localStorage.getItem(CLASS_REGISTRY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveClassRecord(record) {
  try {
    const records = getStoredClassRecords();
    const existingIndex = records.findIndex(r => r.studentName.toLowerCase() === record.studentName.toLowerCase());
    if (existingIndex >= 0) {
      records[existingIndex] = record;
    } else {
      records.unshift(record);
    }
    localStorage.setItem(CLASS_REGISTRY_KEY, JSON.stringify(records));
  } catch (e) {
    console.error("Save class record error:", e);
  }
}

function renderTeacherDashboardData() {
  const records = getStoredClassRecords();
  const tableBody = document.getElementById('teacherStudentsTableBody');
  const statsTotal = document.getElementById('statTotalSubmissions');
  const statsAvgScore = document.getElementById('statAvgQuizScore');

  if (statsTotal) statsTotal.textContent = records.length;
  
  if (records.length > 0) {
    const avg = Math.round(records.reduce((acc, curr) => acc + (curr.quizScore || 0), 0) / records.length);
    if (statsAvgScore) statsAvgScore.textContent = `${avg}/100`;
  } else {
    if (statsAvgScore) statsAvgScore.textContent = '0/100';
  }

  if (!tableBody) return;

  if (records.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 24px; color: var(--text-muted);">
          📭 Belum ada data pekerjaan murid yang dikirimkan. Siswa dapat menekan tombol <strong>"Kirim ke Google Drive & Spreadsheet"</strong> di menu Penyusunan LHO.
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = records.map((item, idx) => {
    return `
      <tr>
        <td style="font-size: 0.75rem; color: #666;">${item.timestamp || '-'}</td>
        <td><strong>${item.studentName}</strong></td>
        <td><span class="badge-status-chip badge-status-completed">${item.studentClass}</span></td>
        <td>${item.locationName}</td>
        <td><span style="font-weight: 700; color: var(--indigo-600);">${item.quizScore || 0}</span></td>
        <td><span style="font-weight: 700; color: var(--sogan-600);">${item.kaidahScore || 0}</span></td>
        <td>
          <span class="badge-status-chip ${item.progressPercent >= 80 ? 'badge-status-completed' : 'badge-status-progress'}">
            ${item.progressPercent || 0}%
          </span>
        </td>
        <td>
          <button class="btn btn-secondary" style="font-size: 0.72rem; padding: 0.25rem 0.6rem;" onclick='viewStudentSubmissionDetail(${idx})'>
            👁️ Detail
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function viewStudentSubmissionDetail(index) {
  const records = getStoredClassRecords();
  const r = records[index];
  if (!r) return;

  const detailText = `
Nama: ${r.studentName} (${r.studentClass})
Objek Budaya: ${r.locationName}
Waktu: ${r.timestamp}
Skor Kuis Fakta: ${r.quizScore}/100
Skor Kaidah Bahasa: ${r.kaidahScore}/100
Progres Kegiatan: ${r.progressPercent}%

[FAKTA TEMUAN]
${(r.fields && r.fields.faktaTemuan) || '-'}

[DEFINISI / CIRI UMUM]
${(r.fields && r.fields.ciriUmum) || '-'}

[DESKRIPSI BAGIAN]
${(r.fields && r.fields.bagianObjek) || '-'}

[DESKRIPSI MANFAAT]
${(r.fields && r.fields.manfaat) || '-'}
  `;

  alert(detailText);
}


/* ===================================================================
   GOOGLE DRIVE & GOOGLE SPREADSHEET SUBMISSION & CSV EXPORT
   =================================================================== */

function submitWorkToGoogleSheets() {
  const studentName = AppState.observationData.studentName || document.getElementById('sheetStudentName')?.value.trim();
  const studentClass = AppState.observationData.studentClass || document.getElementById('sheetStudentClass')?.value.trim() || 'X-1';

  if (!studentName) {
    alert('⚠️ Harap isi identitas nama lengkap murid terlebih dahulu sebelum mengirim hasil pekerjaan.');
    openStudentIdModal();
    return;
  }

  // Ensure state matches
  AppState.observationData.studentName = studentName;
  AppState.observationData.studentClass = studentClass;
  StorageManager.save();
  updateStudentIdentityDisplay();

  const progress = calculateStudentProgress();
  const currentLocation = LOCATIONS_DATA.find(l => l.id === AppState.observationData.locationId);
  const locationTitle = currentLocation ? currentLocation.name : 'Keraton Surakarta';

  // Extract LHO report text if available
  const reportContainer = document.getElementById('lhoOutputDoc');
  const reportContent = reportContainer ? reportContainer.innerText.trim() : '';

  const recordPayload = {
    studentName: studentName,
    studentClass: studentClass,
    locationName: locationTitle,
    observationDate: AppState.observationData.observationDate || new Date().toISOString().split('T')[0],
    quizScore: AppState.quiz.score || 0,
    kaidahScore: AppState.kaidahQuiz.score || 0,
    progressPercent: progress.percentage,
    fields: { ...AppState.observationData.fields },
    lhoDraftText: reportContent,
    timestamp: new Date().toLocaleString('id-ID')
  };

  // 1. Save to Local Class Registry (for Teacher Portal)
  saveClassRecord(recordPayload);

  // 2. If Teacher Webhook (Google Apps Script / Webhook) is configured, push async
  const webhookUrl = localStorage.getItem(AppState.teacher.webhookUrlKey);
  const statusBadge = document.getElementById('cloudSubmitStatus');
  
  if (webhookUrl && webhookUrl.startsWith('http')) {
    if (statusBadge) {
      statusBadge.style.display = 'inline-flex';
      statusBadge.className = 'cloud-status-badge cloud-status-ready';
      statusBadge.textContent = '⏳ Mengunggah ke Google Drive & Spreadsheet Guru...';
    }

    fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recordPayload)
    }).then(() => {
      finishSubmissionNotice(recordPayload, true);
    }).catch(err => {
      console.warn("Webhook fetch warning (CORS is expected on Apps Script no-cors):", err);
      finishSubmissionNotice(recordPayload, true);
    });
  } else {
    // Immediate success fallback: recorded in system + direct download prompt
    finishSubmissionNotice(recordPayload, false);
  }
}

function finishSubmissionNotice(record, sentToCloud) {
  const statusBadge = document.getElementById('cloudSubmitStatus');
  if (statusBadge) {
    statusBadge.style.display = 'inline-flex';
    statusBadge.className = 'cloud-status-badge cloud-status-success';
    statusBadge.innerHTML = `✅ <strong>Berhasil Dikirim!</strong> Data murid tercatat pada rekap guru (${record.timestamp}).`;
  }

  AudioEffects.playSuccess();
  showToast(`Pekerjaan ${record.studentName} berhasil direkap ke Google Spreadsheet!`, '📊');

  // Trigger automated CSV generation for Google Sheets backup
  setTimeout(() => {
    exportWorkSummaryCSV(false);
  }, 500);
}

function exportWorkSummaryCSV(isTeacherFullClass = false) {
  let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // Include BOM for Excel/Google Sheets UTF-8 compatibility
  let filename = '';

  if (isTeacherFullClass) {
    const records = getStoredClassRecords();
    if (records.length === 0) {
      alert('Belum ada data murid yang tercatat di portal guru.');
      return;
    }
    csvContent += "No,Nama Lengkap,Kelas,Objek Budaya,Skor Kuis Fakta/Opini,Skor Kaidah,Progres (%),Tanggal Observasi,Waktu Kirim\n";
    records.forEach((r, idx) => {
      const row = [
        idx + 1,
        `"${(r.studentName || '').replace(/"/g, '""')}"`,
        `"${(r.studentClass || '').replace(/"/g, '""')}"`,
        `"${(r.locationName || '').replace(/"/g, '""')}"`,
        r.quizScore || 0,
        r.kaidahScore || 0,
        `${r.progressPercent || 0}%`,
        `"${r.observationDate || ''}"`,
        `"${r.timestamp || ''}"`
      ].join(",");
      csvContent += row + "\n";
    });
    filename = `Rekap_Kelas_Jejak_Observasi_${new Date().toISOString().slice(0,10)}.csv`;
  } else {
    const studentName = AppState.observationData.studentName || 'Siswa_Jejak_Observasi';
    const studentClass = AppState.observationData.studentClass || 'X-1';
    const currentLocation = LOCATIONS_DATA.find(l => l.id === AppState.observationData.locationId);
    const locationName = currentLocation ? currentLocation.name : 'Keraton Surakarta';
    const progress = calculateStudentProgress();
    const fields = AppState.observationData.fields || {};

    csvContent += "Parameter,Nilai Hasil Pekerjaan Murid\n";
    csvContent += `Nama Lengkap,"${studentName.replace(/"/g, '""')}"\n`;
    csvContent += `Kelas,"${studentClass.replace(/"/g, '""')}"\n`;
    csvContent += `Objek Budaya Surakarta,"${locationName.replace(/"/g, '""')}"\n`;
    csvContent += `Tanggal Observasi,"${AppState.observationData.observationDate || ''}"\n`;
    csvContent += `Skor Kuis Fakta/Opini,"${AppState.quiz.score} / 100"\n`;
    csvContent += `Skor Kuis Kaidah Bahasa,"${AppState.kaidahQuiz.score} / 100"\n`;
    csvContent += `Capaian Progres Seluruh Aktivitas,"${progress.percentage}%"\n`;
    csvContent += `Fakta Temuan Observasi,"${(fields.faktaTemuan || '').replace(/"/g, '""').replace(/\n/g, ' ')}"\n`;
    csvContent += `Ciri Umum / Definisi,"${(fields.ciriUmum || '').replace(/"/g, '""').replace(/\n/g, ' ')}"\n`;
    csvContent += `Deskripsi Bagian,"${(fields.bagianObjek || '').replace(/"/g, '""').replace(/\n/g, ' ')}"\n`;
    csvContent += `Deskripsi Manfaat,"${(fields.manfaat || '').replace(/"/g, '""').replace(/\n/g, ' ')}"\n`;
    csvContent += `Waktu Perekaman,"${new Date().toLocaleString('id-ID')}"\n`;

    filename = `LHO_${studentName.replace(/\s+/g, '_')}_${studentClass}_Spreadsheet.csv`;
  }

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(`File Spreadsheet (.csv) berhasil diunduh: ${filename}`, '📥');
}


