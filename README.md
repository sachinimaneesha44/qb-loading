# QBCore Modern Loading Screen

A sleek, modern, and animated loading screen for FiveM QBCore servers featuring gradient backgrounds, floating particles, and smooth animations.

## Features

- **Modern Design**: Clean, minimal interface with gradient backgrounds
- **Smooth Animations**: Logo entrance, floating particles, and progress animations
- **Responsive**: Works on all screen sizes including ultrawide monitors
- **Customizable**: Easy configuration through `config.js`
- **Performance Optimized**: Lightweight with reduced motion support
- **Accessibility**: High contrast and reduced motion support

## Preview

The loading screen features:
- Animated gradient background
- Floating particle effects
- Logo with pulse ring animation
- Gradient progress bar with glow effects
- Rotating server tips
- Player information display
- Modern typography using Inter font

## Installation

1. Replace your existing `qb-loading` resource with this updated version
2. Ensure your server logo is placed at `/assets/branding/qbcore.svg`
3. Customize the configuration in `html/config.js`
4. Restart your server

## Customization

### Quick Customization

Edit `html/config.js` to customize:

- **Server Name**: Change the displayed server name
- **Colors**: Modify the color scheme
- **Tips**: Add/remove/edit rotating server tips
- **Animations**: Adjust animation speeds and effects
- **Performance**: Enable/disable features for better performance

### Logo Replacement

Replace `/assets/branding/qbcore.svg` with your server's logo. Recommended size: 128x128px or larger.

### Audio

Place your audio file at `/assets/audio/noncopyright.mp3` or update the path in the HTML file.

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Performance Notes

- Particles are automatically disabled on mobile devices
- Reduced motion preferences are respected
- Optimized for 60fps animations
- Minimal resource usage

## File Structure

```
qb-loading/
├── fxmanifest.lua
├── html/
│   ├── index.html          # Main loading screen
│   ├── app.js             # Loading logic and animations
│   ├── styles.css         # Custom styles and animations
│   └── config.js          # Configuration file
├── assets/
│   ├── branding/
│   │   └── qbcore.svg     # Server logo
│   ├── audio/
│   │   └── noncopyright.mp3
│   └── images/            # (removed - no longer needed)
└── README.md
```

## License

GNU General Public License v3.0

## Support

For support and updates, join the QBCore community Discord.