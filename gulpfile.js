const gulp         = require('gulp');
const nodemon      = require('gulp-nodemon');
const path         = require('path');
const bs           = require('browser-sync').create();
const sass         = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const postcss      = require('gulp-postcss');
const maps         = require('gulp-sourcemaps');
const concat       = require('gulp-concat');
const csscomb      = require('gulp-csscomb');
require('colors');

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const processors = [
	autoprefixer({browsers: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 8"]})
];
const APP        = path.resolve(__dirname, 'app.js');
const ROUTERS    = path.resolve(__dirname, 'routes');
const VIEW       = path.resolve(__dirname, 'views/**');

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('bs', () => {
	bs.init(null, {
		proxy: "http://localhost:3000",
		port: 2333,
		logLevel: "silent",
		files: path.resolve(__dirname, 'public/**/*.*'),
		ui: {
			port: 7080,
			weinre: {
				port: 9090
			}
		},
		notify: false
	});
	return Promise.resolve()
});

gulp.task('bs-delay', (cb) => {
	console.log('浏览器刷新!'.red);
	return new Promise((resolve, reject) => {
		setTimeout(function () {
			bs.reload();
			bs.notify("This message will only last a second", 1000);
		}, 1700);
		resolve()
	});
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('css:dev', () => {
	return gulp.src(path.resolve(__dirname, 'src/sass/style-output.scss'))
		.pipe(maps.init())
		.pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
		.pipe(csscomb())
		.pipe(maps.write())
		.pipe(gulp.dest(path.resolve(__dirname, 'public/css/')))
});

gulp.task('css:pro', () => {
	return gulp.src(path.resolve(__dirname, 'src/sass/style-output.scss'))
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(gulp.dest(path.resolve(__dirname, 'public/css/')))
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('watch:node', function () {
	gulp.watch(['./routes/**/*.js', './app.js', './bin/www', './views/**/*.html'],
		gulp.parallel('bs-delay')
	);
});

gulp.task('watch:css', () => {
	gulp.watch(path.resolve(__dirname, 'src/sass/**/*.scss'),
		gulp.parallel('css:dev')
	);
});


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('nodemon', (cb) => {
	nodemon({
		script: path.resolve(__dirname, 'bin/www'),
		verbose: false,
		ext: 'js html',
		env: {'NODE_ENV': 'development'},
		watch: [APP, ROUTERS, VIEW]
	}).on('start', () => {
		console.log('启动完成!!!'.green);
	}).on('restart', () => {
		console.log('重启中...................'.blue);
	});
	return Promise.resolve()
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('sp', () => {
	gulp.src('./public/css/*.css')
		.pipe(sprite({slicePath: '../slice',}))
		.pipe(gulpif('*.png', gulp.dest('./public/sprite/'), gulp.dest('./public/csss/')));
	return Promise.resolve()
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('ts', (cb) => {
	require('./utils/editTimeStamp').changeTimeStamp('./views/control/meta.html');
	require('./utils/editTimeStamp').changeTimeStamp('./views/layout/layout.html');
	cb()
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('js', (cb) => {
	gulp.src(['./public/js/pace.js', './public/js/aos.js', './public/js/utils.js'])
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('./public/js'));
	cb()
});

gulp.task('watch:js', () => {
	gulp.watch('./public/js/main.js',
		gulp.parallel('js')
	);
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

gulp.task('dev',
	gulp.series('css:dev', 'nodemon', 'bs', 'js',
		gulp.parallel('watch:node', 'watch:css', 'watch:js')
	)
);

gulp.task('p',
	gulp.parallel('css:pro', 'ts')
);