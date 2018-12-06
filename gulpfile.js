const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const nodemon = require('gulp-nodemon');
const concat = require('gulp-concat');
const path = require('path');

gulp.task('sass', function() {
  return gulp.src('admin/frontend/styles/**/*.sass')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('admin/frontend/assets/styles'));
});

gulp.task('js', () => {
  gulp.src(path.join('admin/frontend/scripts/', '*.js'), { base: 'app' })
    .pipe(concat('app.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('admin/frontend/assets/scripts'));
});

gulp.task('nodemon', () => {
  return nodemon({
    script: 'example.js'
  })
});

gulp.task('watch', function (){
  gulp.watch('admin/frontend/styles/**/*.sass', ['sass']);
  gulp.watch('admin/frontend/scripts/**/*.js', ['js']);
})

gulp.task('default', ['nodemon', 'sass', 'js', 'watch']);
