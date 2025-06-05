document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.game-nav-menu .nav-button');
    const sections = document.querySelectorAll('.game-section');
    const mobileMenuToggler = document.querySelector('.mobile-menu-toggler');
    const gameNavMenu = document.querySelector('.game-nav-menu');
    const startButton = document.querySelector('.game-start-button');
    const homeScreen = document.getElementById('home-screen');

    // Function to show a specific section
    function showSection(id) {
        sections.forEach(section => {
            section.classList.remove('active-panel');
        });
        document.getElementById(id).classList.add('active-panel');

        // Update active class on nav buttons
        navButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('href').includes(id.replace('-screen', ''))) {
                button.classList.add('active');
            }
        });

        // Close mobile menu if open
        if (mobileMenuToggler && gameNavMenu.classList.contains('active')) {
             gameNavMenu.classList.remove('active');
        }
    }

    // Event listener for nav buttons
    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            const targetId = button.getAttribute('href').split('.')[0] + '-screen'; // e.g., 'index-screen'
            showSection(targetId);
        });
    });

    // Event listener for mobile menu toggler
    if (mobileMenuToggler) {
        mobileMenuToggler.addEventListener('click', () => {
            gameNavMenu.classList.toggle('active');
        });
    }

    // Event listener for "START GAME" button on home screen
    if (startButton) {
        startButton.addEventListener('click', () => {
            showSection('game-library'); // Directly go to Game Library or Portfolio
        });
    }

    // Initial load: show home screen or specific section based on URL hash (optional)
    const initialSectionId = window.location.hash.substring(1) + '-screen' || 'home-screen';
    if (document.getElementById(initialSectionId)) {
        showSection(initialSectionId);
    } else {
        showSection('home-screen'); // Default to home if hash invalid
    }

    // Simulate progress bars filling up when profile is active
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.target.id === 'player-profile') {
                document.querySelectorAll('.skill-bar .progress').forEach(progress => {
                    const width = progress.style.width; // Get the defined width
                    progress.style.width = '0%'; // Reset to 0
                    setTimeout(() => {
                        progress.style.width = width; // Set to actual width after short delay
                    }, 100);
                });
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    const playerProfileSection = document.getElementById('player-profile');
    if (playerProfileSection) {
        observer.observe(playerProfileSection);
    }
});