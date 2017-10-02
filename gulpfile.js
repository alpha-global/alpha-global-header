var gulp = require('gulp');

var rename = require('gulp-rename');
var concat = require('gulp-concat-util');
var minify = require('gulp-clean-css');
var less = require('gulp-less');
var watch = require("gulp-watch");
var path = require('path');
var rtFonts = require('gulp-rt-font-config');

const LessPluginAutoprefix = require('less-plugin-autoprefix');

//LESS plugins
let lessAutoprefix = new LessPluginAutoprefix({ browsers: [ 'last 2 versions' ]});

/*
gulp.task("polymer", function(){
	return gulp.src('wp-content/themes/alpha-donate/app/alpha-donate-app.html')
    .pipe(vulcanize({
		stripComments : true,
		inlineScripts : true
	})).
	pipe(rename({
		basename : "bundle"
	}))
    .pipe(gulp.dest('wp-content/themes/alpha-donate/app'));

});
*/

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
		//.pipe(rename({
			//extname: '-styles.html'
		//}))
		.pipe(gulp.dest("assets/css"));
});

/**
 * Take the .woff files and build them into data-uri, concatted file
 */
gulp.task('fonts', function() {

	gulp.src('assets/fonts/config.json')

		.pipe(rtFonts.fromConfig({
			// concat the fonts into one file, false or empty will create files for each
			concat : "fonts.min.css",

			// create reference docs (will combine if concat)
			reference : true
		}))

		.pipe(gulp.dest('assets/css'));
});

gulp.task("styles", [
	"polymer-styles",
	"angular-styles"
	//"fonts"
]);

/**
 * Build theme tasks into one
 */
gulp.task("default", [
	"styles",
	"fonts"
]);


gulp.task("watch", function(){
	gulp.watch("assets/less/**/*.less",["styles"]),
	gulp.watch("assets/fonts/config.json",["fonts"])

});
