const gulp = require('gulp')
const less = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const cleanCss = require('gulp-clean-css')
const del = require('del')
gulp.task('clean', function (done) {
  del.sync('build')
  done()
})
gulp.task('less', function (done) {
  gulp.src('src/**/*.less')
    .pipe(less())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 5 versions', 'Firefox > 20'],
      cascade: false
    }))
    .pipe(cleanCss())
    .pipe(gulp.dest('build'))
  done()
})
gulp.task('default', gulp.series('clean','less', function (done) {
  console.log('done!')
  done()
}))

gulp.task('watch', function (done) {
  const watcher = gulp.watch('src/**/*', gulp.series('default'))
  watcher.on('all', function (event, path, stats) {
    console.log('File ' + path + ' was ' + event + ', running tasks...')
  })
  done()
})
