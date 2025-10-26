document.addEventListener('DOMContentLoaded', function() {
    // Check if device is mobile and has limited resources
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEndDevice = (() => {
        const hardwareConcurrency = navigator.hardwareConcurrency || 4;
        const deviceMemory = navigator.deviceMemory || 4;
        return hardwareConcurrency <= 2 || deviceMemory <= 2;
    })();

    // Create animation container
    const animationContainer = document.createElement('div');
    animationContainer.className = 'animation-container' + (isMobile ? ' mobile' : '');
    document.body.appendChild(animationContainer);

    // Pause animations when page is not visible
    let isPageVisible = true;
    const handleVisibilityChange = () => {
        isPageVisible = !document.hidden;
        if (!isPageVisible) {
            animationContainer.classList.add('inactive');
        } else {
            animationContainer.classList.remove('inactive');
        }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange, false);

    // Skip animations on low-end mobile devices
    if (isMobile && isLowEndDevice) {
        return;
    }

    // Create flower petals
    function createFlowerPetals() {
        // Reduce number of petals on mobile
        const petalCount = isMobile ? 8 : 15;
        for (let i = 0; i < petalCount; i++) {
            setTimeout(() => {
                const petal = document.createElement('div');
                petal.className = 'flower-petal';
                
                // Random position
                petal.style.left = Math.random() * 100 + 'vw';
                petal.style.top = '-20px';
                
                // Random size
                const size = 15 + Math.random() * 10;
                petal.style.width = size + 'px';
                petal.style.height = size + 'px';
                
                // Random animation duration
                const duration = 15 + Math.random() * 15;
                petal.style.animationDuration = duration + 's';
                
                // Random delay
                petal.style.animationDelay = (Math.random() * 5) + 's';
                
                animationContainer.appendChild(petal);
                
                // Remove petal after animation completes
                setTimeout(() => {
                    petal.remove();
                }, duration * 1000);
            }, i * 1000);
        }
    }

    // Create golden confetti
    function createConfetti() {
        // Reduce confetti count on mobile
        const confettiCount = isMobile ? 15 : 30;
        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                // Random position
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-10px';
                
                // Random size
                const size = 5 + Math.random() * 6;
                confetti.style.width = size + 'px';
                confetti.style.height = size + 'px';
                
                // Random color variation
                const colors = ['#FFD700', '#FFC000', '#FFDF00', '#FFEC8B'];
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                // Random animation duration
                const duration = 5 + Math.random() * 10;
                confetti.style.animationDuration = duration + 's';
                
                // Random delay
                confetti.style.animationDelay = (Math.random() * 3) + 's';
                
                // Random rotation
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                animationContainer.appendChild(confetti);
                
                // Remove confetti after animation completes
                setTimeout(() => {
                    confetti.remove();
                }, duration * 1000);
            }, i * 200);
        }
    }

    // Initial animations with requestAnimationFrame for better performance
    let lastAnimationTime = 0;
    const animationInterval = 1000; // 1 second between animation batches
    
    function animate(timestamp) {
        if (!isPageVisible) {
            requestAnimationFrame(animate);
            return;
        }
        
        if (timestamp - lastAnimationTime > animationInterval) {
            if (Math.random() > 0.3) createFlowerPetals();
            if (Math.random() > 0.5) createConfetti();
            lastAnimationTime = timestamp;
        }
        
        requestAnimationFrame(animate);
    }
    
    // Start animation loop
    requestAnimationFrame(animate);

    // Add special animation when card is flipped
    const card = document.querySelector('.card');
    if (card) {
        card.addEventListener('click', function() {
            if (this.classList.contains('is-flipped')) {
                createConfetti();
                createFlowerPetals();
            }
        });
    }
});
