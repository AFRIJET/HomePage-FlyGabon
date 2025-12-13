module.exports = {
  theme: {
    extend: {
      animation: {
        // Définir la vitesse: 30s linéaire, et infini
        'scroll-rtl': 'scroll-rtl 30s linear infinite', 
      },
      keyframes: {
        'scroll-rtl': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}