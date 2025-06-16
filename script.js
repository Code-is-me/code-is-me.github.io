// Menunggu hingga seluruh dokumen HTML selesai dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. FUNGSI NAVIGASI HALAMAN (SINGLE-PAGE) ---
    const navButtons = document.querySelectorAll('.game-nav-menu .nav-button');
    const sections = document.querySelectorAll('.game-section.screen-panel');

    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah link berpindah halaman secara default

            // Hapus kelas 'active' dari tombol dan panel yang aktif saat ini
            document.querySelector('.nav-button.active').classList.remove('active');
            document.querySelector('.screen-panel.active-panel').classList.remove('active-panel');

            // Tambahkan kelas 'active' ke tombol yang diklik
            button.classList.add('active');

            // Tampilkan panel/section yang sesuai dengan tombol yang diklik
            const targetId = button.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.classList.add('active-panel');

            // *** NEW ADDITION: Scroll to the top of the target section ***
            // Use setTimeout to allow the display: block to render first
            setTimeout(() => {
                targetSection.scrollIntoView({
                    behavior: 'smooth' // For smooth scrolling
                });
            }, 0); // Execute immediately after current task queue, allowing display change to apply
        });
    });

    // --- 2. FUNGSI TOMBOL "START GAME" ---
    const startGameButton = document.querySelector('.game-start-button');
    if (startGameButton) {
        startGameButton.addEventListener('click', () => {
            // Mensimulasikan klik pada tombol navigasi "GAMES"
            document.querySelector('a.nav-button[href="#game-library"]').click();
        });
    }

    // --- 3. FUNGSI MENU MOBILE (HAMBURGER) ---
    const mobileMenuToggler = document.querySelector('.mobile-menu-toggler');
    const gameNavMenu = document.querySelector('.game-nav-menu');

    if (mobileMenuToggler && gameNavMenu) {
        mobileMenuToggler.addEventListener('click', () => {
            // Menambah/menghapus kelas 'active' untuk menampilkan/menyembunyikan menu
            gameNavMenu.classList.toggle('active');
        });
    }

    // --- 4. FUNGSI MODAL (POP-UP PROYEK) ---
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('overlay');

    const openModal = (modal) => {
        if (modal == null) return;
        modal.classList.add('active');
        overlay.classList.add('active');
    };

    const closeModal = (modal) => {
        if (modal == null) return;
        modal.classList.remove('active');
        overlay.classList.remove('active');
    };

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        });
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    if (overlay) {
        overlay.addEventListener('click', () => {
            const activeModals = document.querySelectorAll('.modal.active');
            activeModals.forEach(modal => {
                closeModal(modal);
            });
        });
    }

    // --- 5. FUNGSI ANIMASI SKILL BAR SAAT TERLIHAT ---
    const skillProgressBars = document.querySelectorAll('.skill-bar .progress');

    // Menggunakan Intersection Observer untuk efisiensi
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Jika elemen masuk ke dalam area pandang (viewport)
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = width;
                // Hentikan pengamatan setelah animasi berjalan agar tidak berulang
                observer.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5 // Animasi berjalan saat 50% elemen terlihat
    });

    skillProgressBars.forEach(bar => {
        skillObserver.observe(bar);
    });

});