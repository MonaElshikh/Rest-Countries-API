/*
npm install sass gulp-sass --save-dev 	                                >>>>>[https://www.npmjs.com/package/gulp-sass]
npm install  gulp-autoprefixer  --save-dev	                         >>>>>[https://www.npmjs.com/package/gulp-autoprefixer]
npm install gulp-typescript typescript --save-dev	             >>>>>[npmjs.com/package/gulp-typescript]
npm install  gulp-connect --save-dev		                           >>>>>[npmjs.com/package/gulp-connect]
npm i gulp-sourcemaps --save-dev                                      >>>>>[https://www.npmjs.com/package/gulp-sourcemaps]
npm i gulp-pug --save-dev                                                   >>>>>[https://www.npmjs.com/package/gulp-pug]
npm i gulp-uglify --save-dev                                                >>>>>[https://www.npmjs.com/package/gulp-uglify]
*/
import gulpVar from 'gulp';
const { task, src, dest, watch, series } = gulpVar;
import gulpConnect from 'gulp-connect';
const { server, reload } = gulpConnect;
import gulpSource from 'gulp-sourcemaps';
const { init, write } = gulpSource
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import prefixer from 'gulp-autoprefixer';
import ts from 'gulp-typescript';
import pug from 'gulp-pug';
import uglify from 'gulp-uglify';

// html task
task("html", () => {
    return src('src/pug/index.pug')
        .pipe(pug({ pretty: true }))
        .pipe(dest('.'));
});
// css task
task("css", () => {
    return src('src/sass/main.scss')
        .pipe(init())
        .pipe(sass({ outputStyle: "compressed" }).on('error', sass.logError))
        .pipe(prefixer('last 2 versions'))
        .pipe(write('.'))
        .pipe(dest('dist/css'))
})
// js task
task("js", () => {
    return src('src/ts/*.ts')
        .pipe(init())
        .pipe(ts({
            target: "es2016",
            strict: true,
            noImplicitAny: false,
            removeComments: true,
            outFile: 'main.js',
        }))
        .pipe(uglify())
        .pipe(write('.'))
        .pipe(dest('dist/js'))
});
// connect task
task("connect", () => {
    server({
        root: './dist',
        livereload: true,
        port: 8000
    });
});
// watch task
task("watch", () => {
    reload();
    watch('src/pug/**/*.pug', series(['html']));
    watch('src/sass/**/*.scss', series(['css']));
    watch('src/ts/*.ts', series(['js']));
});
// Default task is WATCH
task('default', series('watch'));