// Configuration file for easy customization
const LoadingConfig = {
    // Server branding
    serverName: 'QBCore',
    logoPath: '/assets/branding/qbcore.svg',
    
    // Colors (Tailwind classes or custom CSS)
    colors: {
        primary: 'blue-500',
        secondary: 'purple-600',
        accent: 'blue-400',
        background: ['#0f0f23', '#1a1a2e', '#16213e', '#0f3460']
    },
    
    // Animation settings
    animations: {
        gradientSpeed: 15, // seconds
        tipRotationSpeed: 4000, // milliseconds
        particleCount: 50,
        logoEntranceDelay: 0, // milliseconds
        pulseRingSpeed: 4 // seconds
    },
    
    // Server tips that rotate during loading
    serverTips: [
        'Welcome to QBCore! Press F1 to open the radial menu.',
        'Visit our Web UCP: ucp.noteme.site to see all your character details.',
        'Use /help to see all available commands.',
        'Join our Discord for support and updates.',
        'Remember to follow server rules and have fun!',
        'Press TAB to open your inventory.',
        'Use ALT to interact with objects and players.',
        'Press M to open your phone.',
        'Hold B to toggle your seatbelt in vehicles.',
        'Press L to lock/unlock your vehicle.',
        'Use /me to perform roleplay actions.',
        'Press Y to enable cruise control.',
        'Use the radial menu for quick actions.'
    ],
    
    // Audio settings
    audio: {
        enabled: true,
        volume: 0.05,
        autoplay: true
    },
    
    // Performance settings
    performance: {
        enableParticles: true,
        enableAnimations: true,
        reducedMotionFallback: true
    }
};

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoadingConfig;
}