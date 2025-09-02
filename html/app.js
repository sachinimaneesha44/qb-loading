// Modern QBCore Loading Screen Configuration
class LoadingScreen {
    constructor() {
        this.currentTipIndex = 0;
        this.progress = 0;
        this.serverData = {
            currentPlayers: 0,
            maxPlayers: 64
        };
        
        // Server tips/messages that rotate
        this.serverTips = [
            'Welcome to QBCore! Press F1 to open the radial menu.',
            'Use /help to see all available commands.',
            'Join our Discord for support and updates.',
            'Remember to follow server rules and have fun!',
            'Press TAB to open your inventory.',
            'Use ALT to interact with objects and players.',
            'Press M to open your phone.',
            'Hold B to toggle your seatbelt in vehicles.'
        ];
        
        this.init();
    }
    
    init() {
        this.createParticles();
        this.startTipRotation();
        this.setupAudio();
        this.requestPlayerData();
        this.simulateLoading();
    }
    
    createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size between 2-6px
            const size = Math.random() * 4 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random horizontal position
            particle.style.left = `${Math.random() * 100}%`;
            
            // Random animation delay
            particle.style.animationDelay = `${Math.random() * 20}s`;
            
            // Random animation duration
            particle.style.animationDuration = `${Math.random() * 10 + 15}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    startTipRotation() {
        this.updateTip();
        setInterval(() => {
            this.currentTipIndex = (this.currentTipIndex + 1) % this.serverTips.length;
            this.updateTip();
        }, 4000); // Change tip every 4 seconds
    }
    
    updateTip() {
        const tipElement = document.getElementById('loadingTip');
        tipElement.style.opacity = '0';
        
        setTimeout(() => {
            tipElement.textContent = this.serverTips[this.currentTipIndex];
            tipElement.style.opacity = '1';
        }, 200);
    }
    
    setupAudio() {
        const audio = document.getElementById('audio');
        if (audio) {
            audio.volume = 0.05;
            audio.play().catch(e => console.log('Audio autoplay prevented'));
        }
    }
    
    // Request initial player data from server
    requestPlayerData() {
        if (typeof invokeNative !== 'undefined') {
            // Request player data from server
            fetch(`https://${GetParentResourceName()}/requestPlayerData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({})
            }).catch(() => {
                // Fallback if fetch fails
                console.log('Failed to request player data');
            });
        }
    }
    
    updateProgress(percentage) {
        this.progress = Math.min(100, Math.max(0, percentage));
        
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        
        if (progressBar && progressText) {
            progressBar.style.width = `${this.progress}%`;
            progressText.textContent = `${Math.round(this.progress)}%`;
        }
    }
    
    updatePlayerCount(current, max) {
        this.serverData.currentPlayers = current || 0;
        this.serverData.maxPlayers = max || 64;
        
        const currentElement = document.getElementById('currentPlayers');
        const maxElement = document.getElementById('maxPlayers');
        
        if (currentElement) currentElement.textContent = this.serverData.currentPlayers;
        if (maxElement) maxElement.textContent = this.serverData.maxPlayers;
    }
    
    simulateLoading() {
        // Simulate loading progress for demonstration
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 3;
            this.updateProgress(progress);
            
            if (progress >= 100) {
                clearInterval(interval);
                this.onLoadingComplete();
            }
        }, 100);
    }
    
    onLoadingComplete() {
        // This would typically hide the loading screen
        console.log('Loading complete!');
    }
}

// FiveM Event Handlers
let count = 0;
let thisCount = 0;
let loadingScreen;

const handlers = {
    startInitFunctionOrder(data) {
        count = data.count;
        if (loadingScreen) {
            loadingScreen.updateProgress(0);
        }
    },

    initFunctionInvoking(data) {
        if (loadingScreen && count > 0) {
            const progress = (data.idx / count) * 100;
            loadingScreen.updateProgress(progress);
        }
    },

    startDataFileEntries(data) {
        count = data.count;
        thisCount = 0;
    },

    performMapLoadFunction(data) {
        ++thisCount;
        if (loadingScreen && count > 0) {
            const progress = (thisCount / count) * 100;
            loadingScreen.updateProgress(progress);
        }
    },
    
    // Handler for real-time player count updates
    'qb-loading:updatePlayerCount'(data) {
        if (loadingScreen) {
            loadingScreen.updatePlayerCount(data.currentPlayers, data.maxPlayers);
        }
    }
};

// Initialize loading screen when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadingScreen = new LoadingScreen();
});

// FiveM message handler
window.addEventListener("message", function (e) {
    const handler = handlers[e.data.eventName];
    if (handler) {
        handler(e.data);
    }
});

// Audio controls (keeping compatibility with original)
function audiotoggle() {
    const audio = document.getElementById("audio");
    if (audio) {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    }
}