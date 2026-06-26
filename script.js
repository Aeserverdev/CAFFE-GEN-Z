// Shared script for CAFFE GEN Z
(function () {
  const yearEls = document.querySelectorAll('#year');
  yearEls.forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));

      // Simple approach: toggle inline display
      if (!expanded) {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.right = '4vw';
        nav.style.top = '64px';
        nav.style.padding = '12px';
        nav.style.borderRadius = '16px';
        nav.style.background = 'rgba(7,7,19,.85)';
        nav.style.border = '1px solid rgba(255,255,255,.12)';
        nav.style.gap = '8px';
      } else {
        nav.style.display = '';
        nav.removeAttribute('style');
      }
    });
  }

  // Smooth scroll for in-page hash links
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Menu page: filter + search + modal
  const menuGrid = document.getElementById('menuGrid');
  const menuEmpty = document.getElementById('menuEmpty');
  const menuSearch = document.getElementById('menuSearch');
  const chips = document.getElementById('chips');

  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalText = document.getElementById('modalText');
  const modalClose = document.getElementById('modalClose');
  const modalOk = document.getElementById('modalOk');

  let activeChip = 'all';
  let searchValue = '';

  function openModal(title) {
    if (!modal) return;
    modalTitle.textContent = title || '(placeholder)';
    const lookup = {
      'Gen Z Matcha Latte': {
        text:
          'Matcha-nya earthy, nggak pahit berlebihan—dipadukan dengan susu creamy biar mulus di tenggorokan. Pilihan ukuran: 250 ml (S) / 350 ml (M). Harga: Rp 18.000 (S) & Rp 23.000 (M).\n\nKomposisi: matcha powder, susu, sedikit gula aren (opsional).'
      },
      'Strawberry Neon Frappe': {
        text:
          'Strawberry-nya fruity dan segar, plus tekstur frappe yang thick jadi makin nikmat buat ngopi sore. Pilihan ukuran: 250 ml (S) / 450 ml (L). Harga: Rp 20.000 (S) & Rp 28.000 (L).\n\nKomposisi: strawberry puree, base frappe, susu, es batu.'
      },
      'Coffee Chill Serius': {
        text:
          'Kopi chill yang tegas tapi smooth: rasa dark roast dengan aftertaste cokelat ringan. Pilihan ukuran: 250 ml (S) / 350 ml (M). Harga: Rp 16.000 (S) & Rp 21.000 (M).\n\nKomposisi: espresso/cold brew, susu (opsional), foam tipis.'
      },
      'Cinnamon Cream Coffee': {
        text:
          'Perpaduan kopi hangat dengan aroma cinnamon yang bikin nyaman—manisnya pas, nggak bikin enek. Ukuran: 250 ml (S) / 350 ml (M). Harga: Rp 17.000 (S) & Rp 22.000 (M).\n\nKomposisi: kopi, cinnamon syrup, susu, whipped cream.'
      },
      'Taro Dream Cloud': {
        text:
          'Taro yang creamy dan lembut kayak “cloud”—rasanya manis-nutty dengan hint vanilla. Ukuran: 250 ml (S) / 400 ml (L). Harga: Rp 19.000 (S) & Rp 26.000 (L).\n\nKomposisi: taro, susu, vanilla, topping crumb (opsional).'
      },
      'Matcha Pop Chill': {
        text:
          'Matcha yang lebih fresh dengan sensasi pop—enak buat kamu yang pengen sesuatu yang ringan tapi tetap berkarakter. Ukuran: 250 ml (S) / 350 ml (M). Harga: Rp 18.000 (S) & Rp 24.000 (M).\n\nKomposisi: matcha, susu, sirup vanilla, es batu.'
      }
    };

    const picked = lookup[title];
    modalText.textContent =
      (picked && picked.text)
        ? picked.text
        : 'Detail menu akan ditambahkan: deskripsi rasa, komposisi, pilihan ukuran, dan harga.';

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOk) modalOk.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  function applyMenuFilter() {
    if (!menuGrid) return;

    const cards = Array.from(menuGrid.querySelectorAll('.menu-card'));
    const query = searchValue.trim().toLowerCase();

    let visibleCount = 0;

    cards.forEach((card) => {
      const name = (card.getAttribute('data-name') || '').toLowerCase();
      const type = (card.getAttribute('data-type') || '').toLowerCase();

      const chipOk =
        activeChip === 'all' ? true : type.split(/\s+/).includes(activeChip);
      const searchOk = query.length === 0 ? true : name.includes(query);

      const ok = chipOk && searchOk;
      card.style.display = ok ? '' : 'none';
      if (ok) visibleCount++;
    });

    if (menuEmpty) {
      menuEmpty.hidden = visibleCount !== 0;
    }
  }

  if (chips) {
    chips.querySelectorAll('.chip').forEach((btn) => {
      btn.addEventListener('click', () => {
        chips.querySelectorAll('.chip').forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        activeChip = btn.getAttribute('data-chip') || 'all';
        applyMenuFilter();
      });
    });
  }

  if (menuSearch) {
    menuSearch.addEventListener('input', () => {
      searchValue = menuSearch.value || '';
      applyMenuFilter();
    });
  }

  if (menuGrid) {
    menuGrid.addEventListener('click', (e) => {
      const t = e.target;
      const btn = t && t.closest && t.closest('[data-action="detail"]');
      if (!btn) return;

      const title = btn.getAttribute('data-title') || 'Menu';
      openModal(title);
    });
  }

  // Contact page: fake submit
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Pesan masuk (demo). Konten masih tahap penambahan materi.');
      contactForm.reset();
    });
  }
})();

