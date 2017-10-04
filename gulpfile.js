const gulp = require('gulp');

const rename = require('gulp-rename');
const concat = require('gulp-concat-util');
const minify = require('gulp-clean-css');
const less = require('gulp-less');
const watch = require("gulp-watch");
const path = require('path');
const rtFonts = require('gulp-rt-font-config');

const LessPluginAutoprefix = require('less-plugin-autoprefix');

//LESS plugins
let lessAutoprefix = new LessPluginAutoprefix({ browsers: [ 'last 2 versions' ]});


/**
 * Polymer Styles
 */
gulp.task("polymer-styles", function(){
	return gulp.src("assets/less/styles/**/*.less")

		.pipe(less({
			plugins: [lessAutoprefix]
		}))
		//.pipe(minify())
		.pipe(concat.header('<dom-module id="<%= moduleId(file) %>"><template><style>', {moduleId:function(file){
			return path.basename(file.path, ".css") + "-styles"
		}}))
		.pipe(concat.footer('</style></template></dom-module>'))
		.pipe(rename({
			extname: '-styles.html'
		}))
		.pipe(gulp.dest("assets/css"));
	});

/**
 * Angular Styles
 */
gulp.task("angular-styles", function(){
	return gulp.src("assets/less/styles/**/*.less")
		.pipe(less({
			plugins: [lessAutoprefix]
		}))
		//.pipe(minify())
		.pipe(gulp.dest("assets/css"));
});

/**
 * Take the .woff files and build them into data-uri, concatted file
 */
gulp.task('fonts:avant-garde', function() {

	gulp.src('assets/fonts/fonts.json')
		.pipe(rtFonts.fromConfig())
		.pipe(gulp.dest('assets/css'));
	});

gulp.task('fonts:icons', function() {

	gulp.src('assets/fonts/icons.json')
		.pipe(rtFonts.fromConfig())
		.pipe(gulp.dest('assets/css'));
});

gulp.task("fonts", [
	"fonts:avant-garde",
	"fonts:icons"
]);

gulp.task("styles", [
	"polymer-styles",
	"angular-styles"
]);

/**
 * Build theme tasks into one
 */
gulp.task("default", [
	"styles"
]);


gulp.task("watch", function(){
	gulp.watch("assets/less/**/*.less",["styles"]),
	gulp.watch("assets/fonts/*.json",["fonts"])

});
