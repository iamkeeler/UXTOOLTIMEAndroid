"use strict";var gulp=require("gulp"),$=require("gulp-load-plugins")(),del=require("del"),runSequence=require("run-sequence"),browserSync=require("browser-sync"),pagespeed=require("psi"),reload=browserSync.reload,AUTOPREFIXER_BROWSERS=["ie >= 10","ie_mob >= 10","ff >= 30","chrome >= 34","safari >= 7","opera >= 23","ios >= 7","android >= 4.4","bb >= 10"];gulp.task("jshint",function(){return gulp.src("app/scripts/**/*.js").pipe(reload({stream:!0,once:!0})).pipe($.jshint()).pipe($.jshint.reporter("jshint-stylish")).pipe($.if(!browserSync.active,$.jshint.reporter("fail")))}),gulp.task("images",function(){return gulp.src("app/images/**/*").pipe($.cache($.imagemin({progressive:!0,interlaced:!0}))).pipe(gulp.dest("dist/images")).pipe($.size({title:"images"}))}),gulp.task("copy",function(){return gulp.src(["app/*","!app/*.html","node_modules/apache-server-configs/dist/.htaccess"],{dot:!0}).pipe(gulp.dest("dist")).pipe($.size({title:"copy"}))}),gulp.task("fonts",function(){return gulp.src(["app/fonts/**"]).pipe(gulp.dest("dist/fonts")).pipe($.size({title:"fonts"}))}),gulp.task("styles",function(){return gulp.src(["app/styles/*.scss","app/styles/**/*.css","app/styles/components/components.scss"]).pipe($.changed("styles",{extension:".scss"})).pipe($.rubySass({style:"expanded",precision:10}).on("error",console.error.bind(console))).pipe($.autoprefixer(AUTOPREFIXER_BROWSERS)).pipe(gulp.dest(".tmp/styles")).pipe($.if("*.css",$.csso())).pipe(gulp.dest("dist/styles")).pipe($.size({title:"styles"}))}),gulp.task("html",function(){var e=$.useref.assets({searchPath:"{.tmp,app}"});return gulp.src("app/**/*.html").pipe(e).pipe($.if("*.js",$.uglify({preserveComments:"some"}))).pipe($.if("*.css",$.uncss({html:["app/index.html","app/styleguide.html"],ignore:[/.navdrawer-container.open/,/.app-bar.open/]}))).pipe($.if("*.css",$.csso())).pipe(e.restore()).pipe($.useref()).pipe($.replace("components/components.css","components/main.min.css")).pipe($.if("*.html",$.minifyHtml())).pipe(gulp.dest("dist")).pipe($.size({title:"html"}))}),gulp.task("clean",del.bind(null,[".tmp","dist"])),gulp.task("serve",["styles"],function(){browserSync({notify:!1,server:[".tmp","app"]}),gulp.watch(["app/**/*.html"],reload),gulp.watch(["app/styles/**/*.{scss,css}"],["styles",reload]),gulp.watch(["app/scripts/**/*.js"],["jshint"]),gulp.watch(["app/images/**/*"],reload)}),gulp.task("serve:dist",["default"],function(){browserSync({notify:!1,server:"dist"})}),gulp.task("default",["clean"],function(e){runSequence("styles",["jshint","html","images","fonts","copy"],e)}),gulp.task("pagespeed",pagespeed.bind(null,{url:"https://example.com",strategy:"mobile"}));try{require("require-dir")("tasks")}catch(e){}