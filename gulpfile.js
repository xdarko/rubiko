'use strict';

var 	gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		globbing       = require('gulp-css-globbing'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		pngquant       = require('imagemin-pngquant'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		pug            = require('gulp-pug'),
		pugBeautify    = require('gulp-pug-beautify'),
		rename         = require('gulp-rename');

// =================== FLOW ===================

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		}
	})
});

gulp.task('sass', function() {
	return gulp.src('app/sass/styles.scss')
		.pipe(globbing({extensions: ['.scss']}))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleanCSS({keepBreaks: true}))
		.pipe(rename('styles.min.css'))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});


gulp.task('libs', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		// 'app/libs/magnific-popup/magnific-popup.min.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'));
});

gulp.task('pug', function() {
	return gulp.src('app/pug/*.pug')
		.pipe(pug({
			pretty: true,
			compileDebug: true
		}))
		.pipe(pugBeautify({
			tab_size: 4
		}))
		.pipe(gulp.dest('app/'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', ['pug', 'sass', 'libs', 'browser-sync'], function() {
	gulp.watch('app/pug/**/*.pug', ['pug']);
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['watch']);

// =================== BUILD ===================

gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('dist/img')); 
});

gulp.task('removedist', function() { return del.sync('dist'); });

gulp.task('build', ['removedist', 'imagemin', 'pug', 'sass', 'libs'], function() {

	var buildCss = gulp.src('app/css/styles.min.css')
	.pipe(cleanCSS())
	.pipe(gulp.dest('dist/css'));

	var buildFiles = gulp.src([
		'app/**.html',
		'app/.htaccess'
	]).pipe(gulp.dest('dist'));

	var buildFonts = gulp.src('app/fonts/**/*').pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

// =================== OTHER ===================

gulp.task('clearcache', function () { return cache.clearAll(); });