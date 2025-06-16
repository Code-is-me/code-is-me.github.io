// Wait for the entire HTML document to be loaded and parsed before running the script.
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ELEMENT SELECTION ---
    // Select all the elements we need to work with to keep things organized.
    const navButtons = document.querySelectorAll('.game-nav-menu .nav-button');
    const sections = document.querySelectorAll('.game-section');
    const mobileMenuToggler = document.querySelector('.mobile-menu-toggler');
    const gameNavMenu = document.querySelector('.game-nav-menu');
    const startGameButton = document.querySelector('.game-start-button');
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const closeModalButtons = document.querySelectorAll('[data-close-button]');
    const overlay = document.getElementById('overlay');
    const skillProgressBars = document.querySelectorAll('.skill-bar .progress');
    
    // --- AUDIO ELEMENTS (Remember to add these to your HTML!) ---
    const bgMusic = document.getElementById('background-music');
    const hoverSound = document.getElementById('hover-sound');
    const clickSound = document.getElementById('click-sound');
    const muteBtn = document.getElementById('mute-btn'); // Assuming you'll add a mute button


    // ==========================================================================
    // --- 2. AUDIO FUNCTIONALITY ---
    // ==========================================================================
    
    // Set initial volume levels
    if (hoverSound) hoverSound.volume = 0.5;
    if (clickSound) clickSound.volume = 0.6;
    if (bgMusic) bgMusic.volume = 0.3;

    // A reusable function to play sounds from the beginning
    const playSound = (soundElement) => {
        if (soundElement) {
            soundElement.currentTime = 0; // Rewind the sound to the start
            soundElement.play().catch(error => console.log(`Audio play failed: ${error}`));
        }
    };
    
    // Add sound effects to all buttons and interactive links
    const interactiveElements = document.querySelectorAll('button, a.nav-button, a.social-icon');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => playSound(hoverSound));
        element.addEventListener('click', () => playSound(clickSound));
    });

    // Mute button functionality (if you add one)
    if (muteBtn && bgMusic) {
        muteBtn.addEventListener('click', () => {
            bgMusic.muted = !bgMusic.muted;
            muteBtn.textContent = bgMusic.muted ? 'UNMUTE' : 'MUTE';
            muteBtn.classList.toggle('active', bgMusic.muted);
        });
    }


    // ==========================================================================
    // --- 3. NAVIGATION & SCROLLING ---
    // ==========================================================================

    // This observer highlights the nav button corresponding to the section in view
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                navButtons.forEach(button => {
                    button.classList.remove('active');
                    if (button.getAttribute('href') === `#${sectionId}`) {
                        button.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: "-40% 0px -60% 0px" // Trigger when a section is in the middle of the viewport
    });

    sections.forEach(section => sectionObserver.observe(section));

    // Handle "START GAME" button click to scroll to the game library
    if (startGameButton) {
        startGameButton.addEventListener('click', () => {
            document.getElementById('game-library')?.scrollIntoView({ behavior: 'smooth' });
            // Start background music on the first major interaction
            if (bgMusic && bgMusic.paused) {
                bgMusic.play().catch(error => console.log(`Background music failed to play: ${error}`));
            }
        });
    }


    // ==========================================================================
    // --- 4. MOBILE MENU ---
    // ==========================================================================
    if (mobileMenuToggler && gameNavMenu) {
        mobileMenuToggler.addEventListener('click', () => {
            gameNavMenu.classList.toggle('active');
        });

        // Close mobile menu when a nav link is clicked
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (gameNavMenu.classList.contains('active')) {
                    gameNavMenu.classList.remove('active');
                }
            });
        });
    }


    // ==========================================================================
    // --- 5. MODAL FUNCTIONALITY ---
    // ==========================================================================
    const openModal = (modal) => {
        if (modal) {
            modal.classList.add('active');
            overlay.classList.add('active');
        }
    };

    const closeModal = (modal) => {
        if (modal) {
            modal.classList.remove('active');
            overlay.classList.remove('active');
        }
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
            document.querySelectorAll('.modal.active').forEach(closeModal);
        });
    }

    
    // ==========================================================================
    // --- 6. SKILL BAR ANIMATION ---
    // ==========================================================================
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                progressBar.style.width = progressBar.dataset.width;
                observer.unobserve(progressBar); // Animate only once
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the bar is visible
    });

    skillProgressBars.forEach(bar => skillObserver.observe(bar));

});