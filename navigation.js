// Slide Configuration
// To add a new slide: Add an entry to this array with the filename and title
// To remove a slide: Delete the entry from this array
// The order of slides follows the order in this array

const slides = [
    { file: 'index.html', title: 'CoreTech' },
    { file: 'slide2.html', title: 'What We Offer' },
    { file: 'slide3.html', title: 'Product Usage' },
    { file: 'slide4.html', title: 'Slide 4' },
    { file: 'slide5.html', title: '2025 Achievements' },
    { file: 'slide6.html', title: 'Demos' },
    { file: 'slide7.html', title: 'Fontspire Feedback' },
    { file: 'slide8.html', title: 'Auto Tag' },
    { file: 'slide9.html', title: 'High Resolution GIF Support in Express' },
    { file: 'slide10.html', title: 'Math Expressions Feature support in Indesign' },
    { file: 'slide11.html', title: '2026 Theme' },
    { file: 'slide12.html', title: 'Key Initiatives: 2026-H1' },
    { file: 'slide13.html', title: 'Thank You' },
    { file: 'slide14.html', title: 'Platform Coverage' },
    { file: 'slide15.html', title: 'Our Impact' }
];

// Get current slide information
function getCurrentSlideInfo() {
    const currentFile = window.location.pathname.split('/').pop() || 'index.html';
    const currentIndex = slides.findIndex(s => s.file === currentFile);
    return {
        index: currentIndex,
        total: slides.length,
        current: slides[currentIndex],
        prev: currentIndex > 0 ? slides[currentIndex - 1] : null,
        next: currentIndex < slides.length - 1 ? slides[currentIndex + 1] : null
    };
}

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', function() {
    const info = getCurrentSlideInfo();
    const nav = document.querySelector('.navigation');
    
    if (!nav) return;
    
    // Clear existing navigation
    nav.innerHTML = '';
    
    // Create navigation buttons
    const homeBtn = document.createElement('a');
    homeBtn.href = 'index.html';
    homeBtn.className = 'nav-button';
    homeBtn.innerHTML = '⌂';
    homeBtn.title = 'Home';
    nav.appendChild(homeBtn);
    
    // Previous button
    const prevBtn = document.createElement('a');
    if (info.prev) {
        prevBtn.href = info.prev.file;
        prevBtn.className = 'nav-button';
        prevBtn.innerHTML = '‹';
        prevBtn.title = 'Previous';
    } else {
        prevBtn.href = '#';
        prevBtn.className = 'nav-button disabled';
        prevBtn.innerHTML = '‹';
    }
    nav.appendChild(prevBtn);
    
    // Slide counter with editable input
    const counterContainer = document.createElement('span');
    counterContainer.className = 'nav-button slide-counter';
    counterContainer.style.minWidth = '60px';
    counterContainer.style.textAlign = 'center';
    counterContainer.style.display = 'flex';
    counterContainer.style.alignItems = 'center';
    counterContainer.style.justifyContent = 'center';
    counterContainer.style.gap = '4px';
    counterContainer.style.cursor = 'pointer';
    counterContainer.style.pointerEvents = 'auto';
    counterContainer.title = 'Click to jump to slide';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.value = info.index + 1;
    input.className = 'slide-number-input';
    input.style.width = '28px';
    input.style.textAlign = 'center';
    input.style.background = 'transparent';
    input.style.border = 'none';
    input.style.color = 'white';
    input.style.fontSize = '12px';
    input.style.fontWeight = '600';
    input.style.padding = '0';
    input.style.outline = 'none';
    
    const separator = document.createTextNode(' / ');
    const total = document.createTextNode(info.total);
    
    counterContainer.appendChild(input);
    counterContainer.appendChild(separator);
    counterContainer.appendChild(total);
    nav.appendChild(counterContainer);
    
    // Handle slide jump
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const slideNum = parseInt(input.value);
            
            if (slideNum >= 1 && slideNum <= info.total) {
                const targetSlide = slides[slideNum - 1];
                window.location.href = targetSlide.file;
            } else {
                alert(`Please enter a number between 1 and ${info.total}`);
                input.value = info.index + 1;
            }
        } else if (e.key === 'Escape') {
            input.value = info.index + 1;
            input.blur();
        }
    });
    
    // Select all text on focus
    input.addEventListener('focus', function() {
        input.select();
    });
    
    // Prevent navigation keys from triggering when input is focused
    input.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Home') {
            e.stopPropagation();
        }
    });
    
    // Next button
    const nextBtn = document.createElement('a');
    if (info.next) {
        nextBtn.href = info.next.file;
        nextBtn.className = 'nav-button';
        nextBtn.innerHTML = '›';
        nextBtn.title = 'Next';
    } else {
        nextBtn.href = '#';
        nextBtn.className = 'nav-button disabled';
        nextBtn.innerHTML = '›';
    }
    nav.appendChild(nextBtn);
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const info = getCurrentSlideInfo();
    
    if (e.key === 'ArrowLeft' && info.prev) {
        window.location.href = info.prev.file;
    } else if (e.key === 'ArrowRight' && info.next) {
        window.location.href = info.next.file;
    } else if (e.key === 'Home') {
        e.preventDefault();
        window.location.href = 'index.html';
    }
});

