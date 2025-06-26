// i18next configuration
const resources = {
    en: {
        translation: {
            nav: {
                home: "Home",
                about: "About",
                work: "My Work",
                contact: "Contact"
            },
            hero: {
                title: "Hi, I'm Mohammed",
                role: "Graphic Designer | 3D Artist"
            },
            about: {
                title: "About Me",
                text: "I am a passionate graphic designer and 3D artist, dedicated to delivering exceptional work for my clients. With a keen eye for detail and a love for Practical solutions, I Love to create designs that not only look beautiful but also serve their purpose effectively."
            },
            work: {
                title: "My Work",
                projects: {
                    project1: "Bright Fork",
                    project2: "Luna Dental Group",
                    project3: "SwiftLink",
                    project4: "Burger Shot",
                    project5: "Bunz Shack",
                    project6: "Bright Future School",
                    project7: "New York",
                    project8: "Maze Magazine",
                    project9: "NorthField University"
                },
                descriptions: {
                    project1: "VC Company Logo",
                    project2: "Dental Group Logo",
                    project3: "Food delivery company logo",
                    project4: "Burger restaurant Ad",
                    project5: "Restaurant Poster",
                    project6: "Elementry school Poster",
                    project7: "Decorative print",
                    project8: "Magazine cover",
                    project9: "University Admission Poster"
                },
                showMore: "Show More",
                showLess: "Show Less"
            },
            contact: {
                title: "Get in Touch",
                text: "Interested in working together? Let's create something amazing!",
                button: "Contact Me"
            }
        }
    },
    ar: {
        translation: {
            nav: {
                home: "الرئيسية",
                about: "من أنا",
                work: "أعمالي",
                contact: "تواصل معي"
            },
            hero: {
                title: "مرحباً، أنا محمد",
                role: "مصمم جرافيك | فنان ثلاثي الأبعاد"
            },
            about: {
                title: "من أنا",
                text: "أنا مصمم جرافيك و فنان ثلاثي الأبعاد شغوف، ملتزم بتقديم عمل استثنائي لعملائي. مع عين دقيقة للتفاصيل وحب للحلول العملية، أحب إنشاء تصميمات لا تبدو جميلة فحسب، بل أيضًا تخدم غرضها بفعالية."
            },
            work: {
                title: "أعمالي",
                projects: {
                    project1: "Bright Fork",
                    project2: "Luna Dental Group",
                    project3: "SwiftLink",
                    project4: "Burger Shot",
                    project5: "Bunz Shack",
                    project6: "Bright Future School",
                    project7: "New York",
                    project8: "Maze Magazine",
                    project9: "NorthField University"
                },
                descriptions: {
                    project1: "شعار شركة استثمار",
                    project2: "شعار مجموعة طب الأسنان",
                    project3: "شعار شركة توصيل الطعام",
                    project4: "إعلان مطعم برجر",
                    project5: "ملصق مطعم",
                    project6: "ملصق مدرسة ابتدائية",
                    project7: "لوحة ديكور",
                    project8: "غلاف مجلة",
                    project9: "ملصق قبول جامعي"
                },
                showMore: "عرض المزيد",
                showLess: "عرض أقل"
            },
            contact: {
                title: "تواصل معي",
                text: "هل أنت مهتم بالعمل معاً؟ لا تتردد في التواصل إذا كان لديك أي أسئلة",
                button: "تواصل معي"
            }
        }
    }
};

// Initialize i18next
i18next.init({
    resources,
    lng: localStorage.getItem('language') || (navigator.language.startsWith('ar') ? 'ar' : 'en'),
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
});

// Check system theme preference and language on first visit
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const savedLang = localStorage.getItem('language');
    const themeToggle = document.querySelector('.theme-toggle i');
    
    // Video playback control
    const heroVideo = document.querySelector('.hero-video');
    let playCount = 0;
    
    // Remove the loop attribute after the video loads
    heroVideo.addEventListener('loadedmetadata', () => {
        heroVideo.loop = false;
    });
    
    heroVideo.addEventListener('ended', () => {
        playCount++;
        if (playCount < 2) {
            heroVideo.play();
        } else {
            // Ensure we're at the last frame
            heroVideo.currentTime = heroVideo.duration - 0.1;
            heroVideo.pause();
        }
    });
    
    // Set initial language if not previously saved
    if (!savedLang) {
        const browserLang = navigator.language.startsWith('ar') ? 'ar' : 'en';
        i18next.changeLanguage(browserLang).then(() => {
            document.documentElement.setAttribute('lang', browserLang);
            document.body.style.direction = browserLang === 'ar' ? 'rtl' : 'ltr';
            localStorage.setItem('language', browserLang);
            updateContent();
        });
    }
    
    // Rest of the existing theme code...
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            themeToggle.classList.remove('fa-moon');
            themeToggle.classList.add('fa-sun');
        }
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.body.setAttribute('data-theme', 'dark');
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.classList.remove('fa-moon');
            themeToggle.classList.add('fa-sun');
        }
    }

    // Initial content update
    updateContent();

    // Set up intersection observer for sections
    const sections = document.querySelectorAll('.about-section, .contact-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.2
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});

// Burger menu functionality
const burgerMenu = document.querySelector('.burger-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-menu a');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const html = document.documentElement;
    const themeToggle = document.querySelector('.theme-toggle i');
    const mobileThemeToggle = document.querySelector('.mobile-menu .theme-toggle i');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        html.removeAttribute('data-theme');
        themeToggle.classList.remove('fa-sun');
        themeToggle.classList.add('fa-moon');
        mobileThemeToggle.classList.remove('fa-sun');
        mobileThemeToggle.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        html.setAttribute('data-theme', 'dark');
        themeToggle.classList.remove('fa-moon');
        themeToggle.classList.add('fa-sun');
        mobileThemeToggle.classList.remove('fa-moon');
        mobileThemeToggle.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
}

function copyEmail() {
    const email = 'mohammedwor076@gmail.com'; // Replace with your email
    navigator.clipboard.writeText(email).then(() => {
        alert('Email copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy email: ', err);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function toggleProjects() {
    const grid = document.getElementById('workGrid');
    const btn = document.getElementById('showMoreBtn');
    const expanded = grid.classList.toggle('expanded');
    btn.textContent = expanded ? i18next.t('work.showLess') : i18next.t('work.showMore');
    
    if (expanded) {
        // When showing more, scroll to the button
        btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        // When showing less, first remove the expanded class
        grid.classList.remove('expanded');
        // Then scroll to the work section
        requestAnimationFrame(() => {
            document.querySelector('#work').scrollIntoView({ behavior: 'smooth' });
        });
    }
} 

// Language toggle functionality
function toggleLanguage() {
    const currentLang = i18next.language;
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    
    i18next.changeLanguage(newLang).then(() => {
        document.documentElement.setAttribute('lang', newLang);
        document.body.style.direction = newLang === 'ar' ? 'rtl' : 'ltr';
        localStorage.setItem('language', newLang);
        updateContent();
    });
}

// Update content based on selected language
function updateContent() {
    // Update navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        const id = link.getAttribute('href').substring(1);
        link.textContent = i18next.t(`nav.${id}`);
    });

    // Update mobile menu links
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        const id = link.getAttribute('href').substring(1);
        link.textContent = i18next.t(`nav.${id}`);
    });

    // Update hero section
    document.querySelector('.hero-text h1').textContent = i18next.t('hero.title');
    document.querySelector('.hero-text p').textContent = i18next.t('hero.role');

    // Update about section
    document.querySelector('.about-section h2').textContent = i18next.t('about.title');
    document.querySelector('.about-section p').textContent = i18next.t('about.text');

    // Update work section
    document.querySelector('.work-section h2').textContent = i18next.t('work.title');

    // Update contact section
    document.querySelector('.contact-section h2').textContent = i18next.t('contact.title');
    document.querySelector('.contact-section p').textContent = i18next.t('contact.text');
    document.querySelector('.email-btn').textContent = i18next.t('contact.button');

    // Update show more button
    const showMoreBtn = document.getElementById('showMoreBtn');
    if (showMoreBtn) {
        showMoreBtn.textContent = i18next.t('work.showMore');
    }

    // Update project cards
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach((item, index) => {
        const projectNumber = index + 1;
        const title = item.querySelector('h3');
        const description = item.querySelector('p');
        
        if (title) {
            title.textContent = i18next.t(`work.projects.project${projectNumber}`);
        }
        if (description) {
            description.textContent = i18next.t(`work.descriptions.project${projectNumber}`);
        }
    });
}

// Image Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const workItems = document.querySelectorAll('.work-item');
    const body = document.body;

    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <img src="" alt="Enlarged view">
            <div class="close-modal">×</div>
        </div>
    `;
    document.body.appendChild(modal);

    const modalImg = modal.querySelector('img');
    const closeModal = modal.querySelector('.close-modal');

    // Open modal when clicking on work items
    workItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            modalImg.src = imgSrc;
            modal.classList.add('active');
            body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Close modal functions
    function closeModalFunc() {
        modal.classList.remove('active');
        body.style.overflow = ''; // Restore scrolling
    }

    closeModal.addEventListener('click', closeModalFunc);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunc();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalFunc();
        }
    });
}); 