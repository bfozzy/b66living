const gulp = require("gulp");
const concat = require("gulp-concat");
const babel = require("gulp-babel");
const sass = require("gulp-sass");
gulp.task("js", function() {
    gulp.src(["./js/app.js", "./js/**/*.js"]) //can drop in an array of files or use a wildcard
        .pipe(concat("all.js"))
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(gulp.dest("./dist"))
});

gulp.task("sass", function() {
    gulp.src(["./css/reset.css", "./css/*.scss", "./css/*.css"])
        .pipe(concat("all.css"))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./dist"))
})

gulp.task("default", ["js", "sass"]);

gulp.watch(["./js/**/*.js"], ["js"]);
gulp.watch(["./css/*{.scss,.css}"], ["sass"]);
