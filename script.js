document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.game-nav-menu .nav-button');
    const sections = document.querySelectorAll('.game-section');
    const mobileMenuToggler = document.querySelector('.mobile-menu-toggler');
    const gameNavMenu = document.querySelector('.game-nav-menu');
    const startButton = document.querySelector('.game-start-button');

    // Fungsi untuk menampilkan panel/section tertentu berdasarkan ID-nya
    function showSection(targetId) {
        // Sembunyikan semua section
        sections.forEach(section => {
            section.classList.remove('active-panel');
        });

        // Tampilkan section yang dituju
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.classList.add('active-panel');
        }

        // Perbarui tombol aktif di navigasi
        navButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('href') === targetId) {
                button.classList.add('active');
            }
        });

        // Tutup menu mobile jika sedang terbuka
        if (gameNavMenu.classList.contains('active')) {
            gameNavMenu.classList.remove('active');
        }
    }

    // Tambahkan event listener untuk setiap tombol navigasi
    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah pindah halaman
            const targetId = button.getAttribute('href'); // Ambil href (misal: "#comms-link")
            showSection(targetId);
            window.history.pushState(null, '', targetId); // Ubah URL tanpa reload
        });
    });

    // Event listener untuk tombol menu mobile
    if (mobileMenuToggler) {
        mobileMenuToggler.addEventListener('click', () => {
            gameNavMenu.classList.toggle('active');
        });
    }

    // Event listener untuk tombol "START GAME"
    if (startButton) {
        startButton.addEventListener('click', () => {
            // Ganti ini dengan ID section game Anda
            const gameSectionId = '#game-library'; 
            showSection(gameSectionId);
            window.history.pushState(null, '', gameSectionId);
        });
    }

    // Tampilkan section yang benar saat halaman pertama kali dimuat
    const initialTarget = window.location.hash || '#home-screen';
    showSection(initialTarget);

    // Observer untuk animasi skill bar di profile
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id === 'player-profile') {
                document.querySelectorAll('.skill-bar .progress').forEach(progress => {
                    const finalWidth = progress.getAttribute('data-width');
                    progress.style.width = '0%';
                    setTimeout(() => {
                        progress.style.width = finalWidth;
                    }, 100);
                });
            }
        });
    }, { threshold: 0.5 });

    const playerProfileSection = document.getElementById('player-profile');
    if (playerProfileSection) {
        observer.observe(playerProfileSection);
    }
});
// --- Modal Logic ---

// Get all buttons that open a modal
const openModalButtons = document.querySelectorAll('[data-modal-target]');
// Get all buttons that close a modal
const closeModalButtons = document.querySelectorAll('[data-close-button]');
// Get the overlay element
const overlay = document.getElementById('overlay');

// Add a click event listener to each "Open" button
openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    });
});

// Add a click event listener to each "Close" button
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal'); // Find the parent modal
        closeModal(modal);
    });
});

// Add a click event listener to the overlay to close modals
overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    });
});

// Function to open a modal
function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

// Function to close a modal
function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}