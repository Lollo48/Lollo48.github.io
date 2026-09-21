(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 36);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px' });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // All project videos are muted + playsinline, so modern browsers allow autoplay.
  // We also retry play() in JS and pause off-screen videos to avoid wasting resources.
  const videos = [...document.querySelectorAll('.autoplay-video')];

  videos.forEach(video => {
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const tryPlay = () => video.play().catch(() => {});
    if (video.readyState >= 2) tryPlay();
    else video.addEventListener('loadeddata', tryPlay, { once: true });

    video.addEventListener('error', () => {
      const frame = video.closest('.media-frame');
      if (frame) frame.classList.add('media-missing');
    });
  });

  if ('IntersectionObserver' in window && videos.length) {
    const videoObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.08, rootMargin: '220px 0px 220px' });

    videos.forEach(video => videoObserver.observe(video));
  }

  // The header is fixed, so linking to #top alone can fail to move the page in some browsers.
  // Handle all "#top" links explicitly and always return to the document origin.
  document.querySelectorAll('a[href="#top"]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      if (history.replaceState) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    });
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();

const contactModal = document.getElementById("contact-modal");
const contactModalTitle = document.getElementById("contact-modal-title");
const contactModalValue = document.getElementById("contact-modal-value");
const contactModalLabel = document.getElementById("contact-modal-label");
const contactModalClose = document.getElementById("contact-modal-close");
const contactCopyButton = document.getElementById("contact-copy-button");

const contactData = {
  email: {
    label: "EMAIL",
    title: "Email me",
    value: "loory4895@gmail.com"
  },

  discord: {
    label: "DISCORD",
    title: "Find me on Discord",
    value: "Lollo48#2497"
  }
};

document.querySelectorAll(".contact-popup-link").forEach(button => {
  button.addEventListener("click", () => {
    const type = button.dataset.contact;
    const data = contactData[type];

    contactModalLabel.textContent = data.label;
    contactModalTitle.textContent = data.title;
    contactModalValue.textContent = data.value;

    contactCopyButton.textContent = "Copy to clipboard";

    contactModal.showModal();
  });
});

contactModalClose.addEventListener("click", () => {
  contactModal.close();
});

contactModal.addEventListener("click", event => {
  if (event.target === contactModal) {
    contactModal.close();
  }
});

contactCopyButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(contactModalValue.textContent);

  contactCopyButton.textContent = "Copied ✓";

  setTimeout(() => {
    contactCopyButton.textContent = "Copy to clipboard";
  }, 1500);
});