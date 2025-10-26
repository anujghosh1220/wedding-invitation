document.addEventListener('DOMContentLoaded', function() {
    const card = document.getElementById('birthdayCard');
    const loadingOverlay = document.querySelector('.font-loading');
    
    // Show loading until fonts are loaded and content is ready
    function showContent() {
        // Add loaded class to trigger fade-in animation
        document.documentElement.classList.add('fonts-loaded');
        
        // Hide loading overlay
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }
        
        // Mark card as loaded
        if (card) {
            card.classList.add('loaded');
            
            // Add click handler for card flip
            card.addEventListener('click', function() {
                this.classList.toggle('is-flipped');
            });
            
            // Add keyboard support for accessibility
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.classList.toggle('is-flipped');
                }
            });
        }
    }
    
    // Check if fonts are loaded
    if (document.fonts) {
        document.fonts.ready.then(function() {
            showContent();
        });
    } else {
        // Fallback if FontFace API is not supported
        window.addEventListener('load', showContent);
    }
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Force reflow to fix any layout issues
            if (card) {
                card.style.display = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.display = '';
            }
        }, 250);
    });
    
    // Add touch support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (card) {
        card.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        card.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for a swipe
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left
            if (card && !card.classList.contains('is-flipped')) {
                card.classList.add('is-flipped');
            }
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right
            if (card && card.classList.contains('is-flipped')) {
                card.classList.remove('is-flipped');
            }
        }
    }
});
