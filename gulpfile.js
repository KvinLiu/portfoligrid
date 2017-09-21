const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const notify = require('gulp-notify');

let handleError = (task) => {
	return function(err) {
		notify.onError({
			message: task + ' failed, check the logs..',
			sound: false
		})(err);
	};
};

// Compile Sass & Inject Into Browser
gulp.task('sass', () => {
	return gulp.src([
		'node_modules/bootstrap/scss/bootstrap.scss',
		'src/sass/*.sass'
	]).pipe(sass())
		.on('error', handleError('sass'))
		.pipe(gulp.dest("src/css"))
		.pipe(browserSync.stream());
});

// Move JS File to src/js
gulp.task('js', () => {
	return gulp.src([
		'node_modules/bootstrap/dist/js/bootstrap.min.js',
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/popper.js/dist/umd/popper.min.js'
	]).pipe(gulp.dest("src/js"));
});

// Watch Sass & Server
gulp.task('server', ['sass'], () => {
	browserSync.init({
		server: "./src",
		notify: false
	});

	gulp.watch([
		'node_modules/bootstrap/scss/bootstrap.scss',
		'src/sass/*.sass'
	], ['sass']);
	gulp.watch('src/*.html').on('change', browserSync.reload);
});

// Move Fonts Folder to src
gulp.task('fonts', () => {
	return gulp.src('node_modules/font-awesome/fonts/*')
		.pipe(gulp.dest('src/fonts'));
});

// Move Fonts Awesome to src
gulp.task('fa', () => {
	return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
		.pipe(gulp.dest('src/css'));
});

// Default Task
gulp.task('default', ['js', 'server', 'fa', 'fonts']);


