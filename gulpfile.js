






















































































































































































































































































const browsersync = require('browser-sync').create();
const del = require('del');
const gulp = require('gulp');
const concat = require('gulp-concat');
const npmdist = require('gulp-npm-dist');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const cleanCSS = require('gulp-clean-css');
const rtlcss = require('gulp-rtlcss');

const static_path = './app/static/'

const paths = {
	base: {
		base: {
			dir: './'
		},
		node: {
			dir: './node_modules'
		},
		packageLock: {
			files: './package-lock.json'
		}
	},
	static: {
		base: {
			dir: static_path,
			files: static_path + '**/*'
		},
		libs: {
			dir: static_path + 'libs',
		},
		css: {
			dir: static_path + 'css',
			pages: static_path + 'css/pages',
		},
		js: {
			dir: static_path + 'js',
			pages: static_path + 'js/pages',
		},
		img: {
			dir: static_path + 'images',
			files: static_path + 'images/**/*',
		},
		fonts: {
			dir: static_path + 'fonts',
			files: static_path + 'fonts/**/*',
		},
		lang: {
			dir: static_path + 'langs',
			files: static_path + 'langs/**/*',
		},
	},
	src: {
		base: {
			dir: './_src',
			files: './_src/**/*'
		},
		scss_libs: {
			dir: './_src/_libs/scss',
		},
		scss: {
			dir: './_src/scss',
			pages: './_src/scss/pages/*.scss',
			files: './_src/scss/**/*',
			main: './_src/scss/*.scss'
		},
		js_libs: {
			dir: './_src/_libs/js',
		},
		js: {
			dir: './_src/js',
			pages: './_src/js/pages/*.js',
			main: './_src/js/*.js',
		},
		img: {
			dir: './_src/images',
			files: './_src/images/**/*',
		},
		fonts: {
			dir: './_src/fonts',
			files: './_src/fonts/**/*',
		},
		lang: {
			dir: './_src/langs',
			files: './_src/langs/**/*',
		},
	}
};

gulp.task('browsersyncReload', function (callback) {
	browsersync.reload();
	callback();
});

// Fichiers static
gulp.task('base_css', function () {
	return gulp
		.src([
			paths.src.scss.dir + '/bootstrap.scss',
			paths.base.node.dir + '/bootstrap-datepicker/dist/css/bootstrap-datepicker.css',
			paths.base.node.dir + '/datatables.net-bs5/css/dataTables.bootstrap5.css',
			paths.base.node.dir + '/datatables.net-responsive-bs/css/responsive.bootstrap.css',
			paths.base.node.dir + '/select2/dist/css/select2.css',
			paths.base.node.dir + '/select2-bootstrap-5-theme/dist/select2-bootstrap-5-theme.css',
			paths.base.node.dir + '/icheck-bootstrap/icheck-bootstrap.css',
			paths.src.scss.dir + '/icons.scss',
			paths.src.scss.dir + '/app.scss',
		])
		.pipe(concat('base.css'))
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(rename({suffix: ".min"}))
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest(paths.static.css.dir));
});
gulp.task('pages_css', function () {
	return gulp
		.src(paths.src.scss.pages)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(rename({suffix: ".min"}))
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest(paths.static.css.pages));
});
gulp.task('account_js', function () {
	return gulp
		.src([
			paths.base.node.dir + '/jquery/dist/jquery.js',
			paths.base.node.dir + '/bootstrap/dist/js/bootstrap.bundle.js',
			paths.src.js.dir + '/acc.js',
		])
		.pipe(concat('acc.js'))
		.pipe(uglify())
		.pipe(rename({suffix: ".min"}))
		// .pipe(sourcemaps.write("./"))
		.pipe(gulp.dest(paths.static.js.dir));
});

gulp.task('base_js', function () {
	return gulp
		.src([
			paths.base.node.dir + '/jquery/dist/jquery.js',
			paths.base.node.dir + '/bootstrap/dist/js/bootstrap.bundle.js',
			paths.base.node.dir + '/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
			paths.base.node.dir + '/bootstrap-datepicker/dist/locales/bootstrap-datepicker.fr.min.js',
			paths.base.node.dir + '/datatables.net/js/jquery.dataTables.js',
			paths.base.node.dir + '/datatables.net-bs5/js/dataTables.bootstrap5.js',
			paths.base.node.dir + '/datatables.net-responsive/js/dataTables.responsive.js',
			paths.base.node.dir + '/datatables.net-responsive-bs/js/responsive.bootstrap.js',
			paths.base.node.dir + '/datatables.net-buttons/js/dataTables.buttons.js',
			paths.base.node.dir + '/inputmask/dist/inputmask.js',
			paths.base.node.dir + '/inputmask/dist/jquery.inputmask.js',
			paths.src.js_libs.dir + '/inputmask_extend.js',
			paths.base.node.dir + '/select2/dist/js/select2.js',
			paths.base.node.dir + '/metismenu/dist/metisMenu.js',
			paths.base.node.dir + '/simplebar/dist/simplebar.js',
			paths.base.node.dir + '/node-waves/dist/waves.js',
			paths.src.js_libs.dir + '/session.js',
			paths.src.js.dir + '/app.js',
		])
		.pipe(concat('base.js'))
		.pipe(uglify())
		.pipe(rename({suffix: ".min"}))
		// .pipe(sourcemaps.write("./"))
		.pipe(gulp.dest(paths.static.js.dir));
});
gulp.task('pages_js', function () {
	return gulp
		.src(paths.src.js.pages)
		.pipe(uglify())
		.pipe(rename({suffix: ".min"}))
		// .pipe(sourcemaps.write("./"))
		.pipe(gulp.dest(paths.static.js.pages));
});
gulp.task('images', function () {
	return gulp.src(paths.src.img.files)
		.pipe(gulp.dest(paths.static.img.dir));
});
gulp.task('fonts', function () {
	return gulp.src(paths.src.fonts.files)
		.pipe(gulp.dest(paths.static.fonts.dir));
});
gulp.task('lang', function () {
	return gulp.src(paths.src.lang.files)
		.pipe(gulp.dest(paths.static.lang.dir));
});
gulp.task('libs', function () {
	return gulp
		.src(paths.base.node.dir + '/tinymce/**/*')
		.pipe(sourcemaps.init())
		.pipe(rename(function (path) {
			path.dirname = path.dirname.replace(/\/static/, '').replace(/\\static/, '');
		}))
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest(paths.static.libs.dir + '/tinymce'));
});


gulp.task('clean:static', function (callback) {
	del.sync(paths.static.base.dir);
	callback();
});

gulp.task('watch', function () {
	gulp.watch(paths.src.scss.main, gulp.series('base_css'));
	gulp.watch(paths.src.scss.pages, gulp.series('pages_css'));
	gulp.watch(paths.src.js.main, gulp.series('account_js'));
	gulp.watch(paths.src.js.main, gulp.series('base_js'));
	gulp.watch(paths.src.js.pages, gulp.series('pages_js'));
	gulp.watch(paths.src.img.dir, gulp.series('images'));
	gulp.watch(paths.src.fonts.dir, gulp.series('fonts'));
	gulp.watch(paths.src.lang.dir, gulp.series('lang'));
});

gulp.task('default',
	gulp.series(
		gulp.parallel('clean:static'),
		gulp.parallel('base_css', 'pages_css', 'account_js', 'base_js', 'pages_js', 'images', 'fonts', 'lang', 'libs'),
		gulp.parallel('watch')
	)
);
