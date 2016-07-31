module.exports = {
    paths: {
        jade: {
            srcIndex:'resourse/jade/index.jade',
            distIndex: 'public',
            src: 'resourse/jade/*.jade',
            dist: 'public/page'
        },
        scss: {
            src: 'resourse/scss/main.scss',
            dist: 'public/css/'
        },
        js: {

            src: 'resourse/js/*.js',
            dist: 'public/js/'
        },
        image: {
            src: 'resourse/img/*.(png | jpg | jpeg)',
            dist: 'public/image/'
        },
        svg: {
            src: 'resourse/img/*/*.svg',
            dist: 'public/'
        },
        watch: {
            src: 'resourse/scss/*.scss'
        }
    },
    root: './public',

    clean: [
        './public/css',
        './public/js',
        './public/image'
    ],

    spriteSvgConfig: {
        mode: {
            symbol: {
                dest: './image/',
                sprite: 'sprite.svg'
            }
        }
    },

    autoprefixerConfig: ['> 1%','last 8 versions','firefox >= 4','safari 7','safari 8','IE 8','IE 9','IE 10','IE 11']
};
