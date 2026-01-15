document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    const menuLinks = document.querySelectorAll('.menu-link');
    const manualClose = document.getElementById('manualClose');
    const body = document.body;

    function toggleMenu() {
        menuToggle.classList.toggle('active');
        sideMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    menuToggle.addEventListener('click', toggleMenu);
    manualClose.addEventListener('click', toggleMenu);

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (sideMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === "#" || href === "javascript:void(0)") return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 90,
                    behavior: 'smooth'
                });
            }
        });
    });

    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    // --- FLIP CARD LOGIC ---
    const treatmentCards = document.querySelectorAll('.treatment-card');
    treatmentCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    const openModal = (e) => {
        if(e) e.preventDefault();
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(50, 50, 50, 0.98); z-index: 10005;
            display: flex; align-items: center; justify-content: center;
            backdrop-filter: blur(15px);
        `;
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: #ffffff; padding: 5rem 3rem; border: 1px solid #d9b199;
            max-width: 480px; width: 90%; text-align: center;
            box-shadow: 0 40px 100px rgba(0,0,0,0.3);
            font-family: 'Montserrat', sans-serif;
        `;
        modal.innerHTML = `
            <h2 style="font-family: 'Playfair Display'; margin-bottom: 1.5rem; color: #323232; font-size: 2.2rem;">Request Consultation</h2>
            <p style="margin-bottom: 2rem; color: #323232; opacity: 0.8; line-height: 1.6;">Fill details in the form link provided below and we will get back to you.</p>
            
            <!-- Highlighted Boxed Link -->
            <a href="https://forms.gle/dummyLink" target="_blank" style="display: inline-block; margin-bottom: 2.5rem; background: #323232; color: white; padding: 18px 45px; font-weight: 600; text-decoration: none; letter-spacing: 2px; font-size: 0.9rem; text-transform: uppercase; transition: 0.3s; border: none; cursor: pointer;">Open Google Form</a>
            
            <br>
            <!-- Simple Type Dismiss Button -->
            <button id="closeModal" style="background: transparent; color: #323232; border: none; padding: 10px; cursor: pointer; font-weight: 500; text-transform: uppercase; letter-spacing: 1.5px; font-size: 0.75rem; opacity: 0.6;">Dismiss</button>
        `;
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        document.getElementById('closeModal').onclick = () => overlay.remove();
        overlay.onclick = (event) => { if(event.target === overlay) overlay.remove(); };
    };

    document.querySelectorAll('.nav-cta, .primary-btn, #mobileBook, #menuBookBtn, #heroBooking').forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 10px 40px rgba(0,0,0,0.03)';
        } else {
            navbar.style.padding = '25px 0';
            navbar.style.boxShadow = 'none';
        }
    });
});
