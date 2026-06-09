document.addEventListener('DOMContentLoaded', () => {
      const speakBtn = document.getElementById('audio-speak-btn');
      const stopBtn = document.getElementById('audio-stop-btn');
      let synth = window.speechSynthesis;
      let utterance = null;
      let isNarrating = false;

      const stopSpeech = () => {
        if (synth && synth.speaking) {
          synth.cancel();
        }
        isNarrating = false;
        const currentLang = localStorage.getItem('app-language') || 'es';
        const dict = window.translations && window.translations[currentLang] ? window.translations[currentLang] : (window.translations ? window.translations.es : null);
        speakBtn.innerHTML = dict && dict.narrator_btn_speak ? dict.narrator_btn_speak : (currentLang === 'en' ? '🔊 Listen to Manual' : '🔊 Escuchar Manual');
        speakBtn.classList.remove('active');
        stopBtn.style.display = 'none';
      };

      const speakText = (text) => {
        if (!synth) return;
        stopSpeech();

        const currentLang = localStorage.getItem('app-language') || 'es';
        utterance = new SpeechSynthesisUtterance(text);
        
        const langMap = {
          'en': 'en-US', 'es': 'es-ES', 'fr': 'fr-FR', 'de': 'de-DE',
          'it': 'it-IT', 'pt': 'pt-PT', 'ca': 'ca-ES', 'gl': 'gl-ES',
          'eu': 'eu-ES', 'nl': 'nl-NL', 'pl': 'pl-PL', 'ro': 'ro-RO',
          'sv': 'sv-SE', 'da': 'da-DK', 'no': 'no-NO', 'fi': 'fi-FI',
          'cs': 'cs-CZ', 'hu': 'hu-HU', 'el': 'el-GR', 'tr': 'tr-TR',
          'ar': 'ar-SA', 'zh': 'zh-CN', 'ja': 'ja-JP', 'ko': 'ko-KR',
          'hi': 'hi-IN', 'ru': 'ru-RU'
        };
        utterance.lang = langMap[currentLang] || currentLang;
        utterance.rate = 0.95; // Slightly slower for readability
        
        utterance.onend = () => {
          stopSpeech();
        };

        utterance.onerror = () => {
          stopSpeech();
        };

        isNarrating = true;
        
        const dict = window.translations && window.translations[currentLang] ? window.translations[currentLang] : (window.translations ? window.translations.es : null);
        const speakingText = dict && dict.narrator_btn_speaking ? dict.narrator_btn_speaking : (currentLang === 'en' ? '⏸️ Narrating...' : '⏸️ Narrando...');
        
        speakBtn.innerHTML = speakingText;
        speakBtn.classList.add('active');
        stopBtn.style.display = 'inline-block';
        synth.speak(utterance);
      };

      speakBtn.addEventListener('click', () => {
        if (isNarrating) {
          stopSpeech();
        } else {
          let allText = "";
          const currentLang = localStorage.getItem('app-language') || 'es';
          const dict = window.translations && window.translations[currentLang] ? window.translations[currentLang] : (window.translations ? window.translations.es : null);
          const manualTitle = dict && dict.about_title ? dict.about_title + ". " : (currentLang === 'en' ? "User Manual. " : "Manual de Uso. ");
          allText += manualTitle;
          
          const steps = document.querySelectorAll('.easy-step');
          steps.forEach(step => {
            allText += step.getAttribute('data-text') + " ";
          });
          speakText(allText);
        }
      });

      stopBtn.addEventListener('click', stopSpeech);

      const steps = document.querySelectorAll('.easy-step');
      const lseEmoji = document.getElementById('lse-avatar-emoji');
      const lseStatus = document.getElementById('lse-status-text');
      const lseChapter = document.getElementById('lse-chapter-badge');

      const lseActions = {
        '1': { emoji: '🙌' },
        '2': { emoji: '🤝' },
        '3': { emoji: '✍️' },
        '4': { emoji: '👍' },
        '5': { emoji: '👎' }
      };

      steps.forEach(step => {
        step.addEventListener('click', () => {
          steps.forEach(s => s.classList.remove('active'));
          step.classList.add('active');

          const stepId = step.getAttribute('data-step');
          const stepText = step.getAttribute('data-text');

          speakText(stepText);

          const currentLang = localStorage.getItem('app-language') || 'es';
          const action = lseActions[stepId];
          if (action) {
            lseEmoji.innerHTML = action.emoji;
            
            if (window.updateUIForLanguage) {
              window.updateUIForLanguage(currentLang);
            }
            
            lseEmoji.style.animation = 'none';
            setTimeout(() => {
              lseEmoji.style.animation = 'lse-wave 1.5s ease-in-out infinite';
            }, 10);
          }
        });
      });

      // 3. Braille Transliterator
      const brailleInput = document.getElementById('braille-input-field');
      const brailleOutput = document.getElementById('braille-output-text');
      
      const brailleMap = {
        'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
        'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
        'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵',
        'á': '⠷', 'é': '⠮', 'í': '⠊', 'ó': '⠬', 'ú': '⠾', 'ñ': '⠻',
        '1': '⠂', '2': '⠆', '3': '⠒', '4': '⠲', '5': '⠢', '6': '⠖', '7': '⠶', '8': '⠦', '9': '⠔', '0': '⠴',
        ' ': '⠠', '.': '⠤', ',': '⠠', '?': '⠦', '!': '⠮', '-': '⠤'
      };

      const transliterateToBraille = (text) => {
        return text.toLowerCase().split('').map(char => brailleMap[char] || char).join('');
      };

      brailleInput.addEventListener('input', (e) => {
        const val = e.target.value;
        brailleOutput.innerHTML = transliterateToBraille(val) || '⠠';
      });

      const pictoSearch = document.getElementById('picto-search-field');
      const pictoGrid = document.getElementById('picto-results-grid');

      const defaultSearchTerms = {
        es: [
          { query: 'añadir', label: 'Crear' },
          { query: 'editar', label: 'Editar' },
          { query: 'mover', label: 'Mover' },
          { query: 'completado', label: 'Hecho' },
          { query: 'borrar', label: 'Borrar' }
        ],
        en: [
          { query: 'add', label: 'Create' },
          { query: 'edit', label: 'Edit' },
          { query: 'move', label: 'Move' },
          { query: 'completed', label: 'Done' },
          { query: 'delete', label: 'Delete' }
        ]
      };

      const pictoVocabulary = {
        es: {
          'casa': { symbol: '🏠', name: 'Casa' },
          'hogar': { symbol: '🏠', name: 'Hogar' },
          'familia': { symbol: '👪', name: 'Familia' },
          'personal': { symbol: '👤', name: 'Personal' },
          'social': { symbol: '👥', name: 'Social' },
          'amigos': { symbol: '🎉', name: 'Amigos' },
          'trabajo': { symbol: '💼', name: 'Trabajo' },
          'laboral': { symbol: '💼', name: 'Laboral' },
          'ocio': { symbol: '🎭', name: 'Ocio' },
          'juego': { symbol: '🎮', name: 'Juego' },
          'salud': { symbol: '❤️', name: 'Salud' },
          'medico': { symbol: '🏥', name: 'Médico' },
          'dinero': { symbol: '💰', name: 'Dinero' },
          'finanzas': { symbol: '💰', name: 'Finanzas' },
          'comida': { symbol: '🍏', name: 'Comida' },
          'fruta': { symbol: '🍎', name: 'Fruta' },
          'tiempo': { symbol: '⏱️', name: 'Tiempo' },
          'reloj': { symbol: '⏳', name: 'Reloj' },
          'calendario': { symbol: '📅', name: 'Fecha' },
          'correcto': { symbol: '✅', name: 'Hecho' },
          'incorrecto': { symbol: '❌', name: 'Pendiente' },
          'escribir': { symbol: '✏️', name: 'Escribir' },
          'papelera': { symbol: '🗑️', name: 'Borrar' },
          'persona': { symbol: '👤', name: 'Persona' },
          'escuchar': { symbol: '🔊', name: 'Escuchar' },
          'hablar': { symbol: '🗣️', name: 'Hablar' },
          'signos': { symbol: '🧏', name: 'Signos' }
        },
        en: {
          'house': { symbol: '🏠', name: 'House' },
          'home': { symbol: '🏠', name: 'Home' },
          'family': { symbol: '👪', name: 'Family' },
          'personal': { symbol: '👤', name: 'Personal' },
          'social': { symbol: '👥', name: 'Social' },
          'friends': { symbol: '🎉', name: 'Friends' },
          'work': { symbol: '💼', name: 'Work' },
          'job': { symbol: '💼', name: 'Job' },
          'leisure': { symbol: '🎭', name: 'Leisure' },
          'game': { symbol: '🎮', name: 'Game' },
          'health': { symbol: '❤️', name: 'Health' },
          'doctor': { symbol: '🏥', name: 'Doctor' },
          'money': { symbol: '💰', name: 'Money' },
          'finance': { symbol: '💰', name: 'Finance' },
          'food': { symbol: '🍏', name: 'Food' },
          'fruit': { symbol: '🍎', name: 'Fruit' },
          'time': { symbol: '⏱️', name: 'Time' },
          'clock': { symbol: '⏳', name: 'Clock' },
          'calendar': { symbol: '📅', name: 'Calendar' },
          'correct': { symbol: '✅', name: 'Done' },
          'incorrect': { symbol: '❌', name: 'Pending' },
          'write': { symbol: '✏️', name: 'Write' },
          'trash': { symbol: '🗑️', name: 'Delete' },
          'person': { symbol: '👤', name: 'Person' },
          'listen': { symbol: '🔊', name: 'Listen' },
          'speak': { symbol: '🗣️', name: 'Speak' },
          'signs': { symbol: '🧏', name: 'Signs' }
        }
      };

      const renderFallbackPictos = (filterText, lang) => {
        pictoGrid.innerHTML = '';
        const dict = pictoVocabulary[lang] || pictoVocabulary.es;
        let found = false;
        
        for (const [key, value] of Object.entries(dict)) {
          if (key.includes(filterText) || value.name.toLowerCase().includes(filterText)) {
            const card = document.createElement('div');
            card.className = 'picto-card';
            card.title = value.name;
            card.innerHTML = `<span class="picto-symbol">${value.symbol}</span><span class="picto-name">${value.name}</span>`;
            pictoGrid.appendChild(card);
            found = true;
          }
        }
        
        if (!found) {
          const empty = document.createElement('div');
          empty.style.cssText = 'grid-column: 1 / -1; text-align: center; font-size: 0.85rem; opacity: 0.6; padding: 1rem;';
          empty.innerHTML = lang === 'en' 
            ? `No pictograms found for "${filterText}"`
            : `No se encontraron pictogramas para "${filterText}"`;
          pictoGrid.appendChild(empty);
        }
      };

      const loadDefaultPictograms = (lang) => {
        const terms = defaultSearchTerms[lang] || defaultSearchTerms.es;
        pictoGrid.innerHTML = '';
        
        const emojis = {
          'Crear': '➕', 'Create': '➕',
          'Editar': '✏️', 'Edit': '✏️',
          'Mover': '🔄', 'Move': '🔄',
          'Hecho': '✅', 'Done': '✅',
          'Borrar': '🗑️', 'Delete': '🗑️'
        };

        terms.forEach(t => {
          const card = document.createElement('div');
          card.className = 'picto-card';
          card.title = t.label;
          const fallbackEmoji = emojis[t.label] || '❓';
          
          card.innerHTML = `<span class="picto-symbol">${fallbackEmoji}</span><span class="picto-name">${t.label}</span>`;
          pictoGrid.appendChild(card);
          
          const apiLang = lang === 'en' ? 'en' : 'es';
          fetch(`https://api.arasaac.org/api/pictograms/${apiLang}/search/${encodeURIComponent(t.query)}`)
            .then(res => res.json())
            .then(data => {
              if (Array.isArray(data) && data.length > 0) {
                const id = data[0]._id || data[0].idPictogram;
                if (id) {
                  const imgUrl = `https://api.arasaac.org/api/pictograms/${id}`;
                  const symbolSpan = card.querySelector('.picto-symbol');
                  if (symbolSpan) {
                    symbolSpan.innerHTML = `<img src="${imgUrl}" class="picto-img" alt="${t.label}">`;
                  }
                }
              }
            })
            .catch(err => {
              console.warn('ARASAAC API error for term: ' + t.query, err);
            });
        });
      };

      let searchTimeout = null;
      const performSearch = (query) => {
        const lang = localStorage.getItem('app-language') || 'es';
        const searchVal = query.toLowerCase().trim();
        
        if (!searchVal) {
          loadDefaultPictograms(lang);
          return;
        }
        
        pictoGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; font-size: 0.85rem; opacity: 0.6; padding: 1rem;">${lang === 'en' ? 'Loading...' : 'Cargando...'}</div>`;
        
        const apiLang = lang === 'en' ? 'en' : 'es';
        fetch(`https://api.arasaac.org/api/pictograms/${apiLang}/search/${encodeURIComponent(searchVal)}`)
          .then(res => res.json())
          .then(data => {
            pictoGrid.innerHTML = '';
            if (Array.isArray(data) && data.length > 0) {
              const items = data.slice(0, 12); // Limit to top 12 results
              items.forEach(item => {
                const id = item._id || item.idPictogram;
                const keyword = item.keywords && item.keywords[0] ? item.keywords[0].keyword : item.keyword || searchVal;
                
                const card = document.createElement('div');
                card.className = 'picto-card';
                card.title = keyword;
                
                const imgUrl = `https://api.arasaac.org/api/pictograms/${id}`;
                card.innerHTML = `
                  <span class="picto-symbol">
                    <img src="${imgUrl}" class="picto-img" alt="${keyword}">
                  </span>
                  <span class="picto-name">${keyword}</span>
                `;
                pictoGrid.appendChild(card);
              });
            } else {
              renderFallbackPictos(searchVal, lang);
            }
          })
          .catch(err => {
            console.warn('ARASAAC search API failed, falling back to local emojis:', err);
            renderFallbackPictos(searchVal, lang);
          });
      };

      pictoSearch.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          performSearch(e.target.value);
        }, 400);
      });


      const activeLang = localStorage.getItem('app-language') || 'es';
      loadDefaultPictograms(activeLang);

      window.addEventListener('languagechanged', (e) => {
        loadDefaultPictograms(e.detail.language);
        pictoSearch.value = '';
      });

      window.addEventListener('beforeunload', () => {
        if (synth) synth.cancel();
      });
    });