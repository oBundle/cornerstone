module.exports = {
    target: [
        'assets/js/**/*.{js,ts,tsx}',
        '!assets/js/bundle.js',
        '!assets/js/**/*.spec.{js,ts,tsx}',
        '!assets/js/**/*.d.ts',
    ],
    options: {
        quiet: true,
    },
};
