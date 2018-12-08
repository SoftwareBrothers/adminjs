const gulp = require('gulp')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const nodemon = require('gulp-nodemon')
const concat = require('gulp-concat')
const path = require('path')

gulp.task('sass', () => {
  gulp.src('src/frontend/styles/**/*.sass')
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .pipe(autoprefixer())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('src/frontend/assets/styles'))
})

gulp.task('js', () => {
  gulp.src(path.join('src/frontend/scripts/', '*.js'), { base: 'app' })
    .pipe(concat('app.js'))
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('src/frontend/assets/scripts'))
})

gulp.task('nodemon', () => {
  nodemon({
    script: 'example.js',
  })
})

gulp.task('watch', () => {
  gulp.watch('src/frontend/styles/**/*.sass', ['sass'])
  gulp.watch('src/frontend/scripts/**/*.js', ['js'])
})

gulp.task('default', ['nodemon', 'sass', 'js', 'watch'])
