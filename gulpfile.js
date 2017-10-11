const gulp = require('gulp');
const path = require('path');
const rtFonts = require('gulp-rt-font-config');



/**
 * Take the .woff files and build them into data-uri, concatted file
 */
gulp.task('fonts', function() {

	gulp.src('assets/fonts/fonts.json')
		.pipe(rtFonts.fromConfig({
			// concat the fonts into one file, false or empty will create files for each
			concat : "fonts.min.css",

		}))
		.pipe(gulp.dest('assets/less/imports'));
	});


/**
 * Build theme tasks into one
 */
gulp.task("default", [
	"fonts"
]);
