module.exports = {
    presets: ['next/babel'],
    plugins: [['transform-define', process.env.NEXT_PUBLIC_BACKEND_URL]],
}