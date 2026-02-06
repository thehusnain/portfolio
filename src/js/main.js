// Boot Screen Animation
document.addEventListener('DOMContentLoaded', () => {
    const bootScreen = document.getElementById('bootScreen');
    
    // Hide boot screen after animation completes
    setTimeout(() => {
        bootScreen.classList.add('fade-out');
        setTimeout(() => {
            bootScreen.style.display = 'none';
        }, 500);
    }, 6000); // 6 seconds total boot time
    
    // Allow skipping with any key press or click
    const skipBoot = () => {
        bootScreen.classList.add('fade-out');
        setTimeout(() => {
            bootScreen.style.display = 'none';
        }, 500);
    };
    
    document.addEventListener('keydown', skipBoot, { once: true });
    bootScreen.addEventListener('click', skipBoot, { once: true });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offset = 80;
                    const targetPosition = target.offsetTop - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                lazyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('lazy-section');
        lazyObserver.observe(section);
    });
});

let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        document.body.style.overflowY = 'auto';
    }, 150);
}, { passive: true });

/// Certificate Image Modal Functions
function openCertificateImage(imageUrl) {
    const modal = document.createElement('div');
    modal.className = 'cert-image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="closeCertificateImage()">&times;</span>
            <img src="${imageUrl}" alt="Certificate Full View">
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeCertificateImage() {
    const modal = document.querySelector('.cert-image-modal');
    if (modal) {
        modal.style.display = 'none';
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

// Close image modal with Escape key or click outside
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeCertificateImage();
        closeCertificate();
    }
});

document.addEventListener('click', function(event) {
    const imageModal = document.querySelector('.cert-image-modal');
    if (imageModal && event.target === imageModal) {
        closeCertificateImage();
    }
    
    const certModal = document.getElementById('certificateModal');
    if (certModal && event.target === certModal) {
        closeCertificate();
    }
});

// Old certificate preview functions (for text-based previews)
function openCertificate(type) {
    const modal = document.getElementById('certificateModal');
    const certificateView = document.getElementById('certificateView');
    
    let certificateHTML = '';
    
    if (type === 'ctiga') {
        certificateHTML = `
            <div class="certificate-preview">
                <div class="certificate-header">
                    <h3>RED TEAM LEADERS</h3>
                    <div class="certificate-issuer">Certified Threat Intelligence & Governance Analyst</div>
                    <div style="color: #aaa; font-size: 0.9rem; margin-top: 0.5rem;">Professional Certification</div>
                </div>
                
                <div class="certificate-body">
                    <div style="color: #aaa; margin: 1rem 0;">This is to acknowledge that</div>
                    
                    <div class="certificate-name">HUSNAIN</div>
                    
                    <div class="certificate-details">
                        successfully completed all the requirements and passed the examination for
                    </div>
                    
                    <div class="certificate-title">Certified Threat Intelligence & Governance Analyst (CTIGA)</div>
                </div>
                
                <div class="certificate-footer">
                    <div class="certificate-date">Issued: February 6, 2026</div>
                    <div class="certificate-id">Certificate ID: CTIGA-2026-${Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                    <div style="margin-top: 1rem; color: #888; font-size: 0.8rem;">
                        Verify at: <a href="https://redteamleaders.com/certificate-verification" target="_blank" style="color: #00D9FF;">redteamleaders.com/certificate-verification</a>
                    </div>
                </div>
            </div>
        `;
    } else if (type === 'cisco') {
        certificateHTML = `
            <div class="certificate-preview">
                <div class="certificate-header">
                    <h3>CISCO NETWORKING ACADEMY</h3>
                    <div class="certificate-issuer">Introduction to Cybersecurity</div>
                </div>
                
                <div class="certificate-body">
                    <div style="color: #aaa; margin: 1rem 0;">This certificate is awarded to</div>
                    
                    <div class="certificate-name">HUSNAIN</div>
                    
                    <div class="certificate-details">
                        for successful completion of the Introduction to Cybersecurity course
                    </div>
                </div>
                
                <div class="certificate-footer">
                    <div class="certificate-date">Issued: 2025</div>
                    <div style="margin-top: 1rem; color: #888; font-size: 0.8rem;">
                        Verify at: <a href="https://skillsforall.com/certification" target="_blank" style="color: #00D9FF;">skillsforall.com/certification</a>
                    </div>
                </div>
            </div>
        `;
    }
    
    certificateView.innerHTML = certificateHTML;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeCertificate() {
    const modal = document.getElementById('certificateModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}