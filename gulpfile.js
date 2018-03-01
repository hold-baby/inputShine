'use strict'

const fs = require("fs")
const gulp = require('gulp')
const uglify = require('gulp-uglify')
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps')
const header = require('gulp-header')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const clean = require('gulp-clean')
const stripDebug = require('gulp-strip-debug')
const rollup = require('rollup')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const pkg = require('./package.json')

const FILE_ADDR = './dist/';

const banner = () => {
  return [
    '/**!',
    ' * <%= pkg.name %> - v<%= pkg.version %>',
    ' * <%= pkg.description %>',
    ' *',
    ' * <%= new Date( Date.now() ) %>',
    ' * homepage: <%= pkg.homepage %>',
    ' * <%= pkg.license %> (c) <%= pkg.author %>',
    '*/',
    ''
  ].join('\n')
}

gulp.task('clean', function() {
    return gulp.src('dist', {read: false}) //这里设置的dist表示删除dist文件夹及其下所有文件
        	.pipe(clean())
})

gulp.task('structure', function(){
    // 使用rollup构建
    return rollup.rollup({
        // 入口文件
        input: './index.js',
        plugins: [
            resolve(),
            babel({
                exclude: 'node_modules/**' // only transpile our source code
            })
        ]
    }).then(function(bundle){
        bundle.write({
            format: 'umd',
            name: 'inputShine',
            file: FILE_ADDR + 'inputShine.js',
        }).then(function(){
            const cssfile = getUglify("dist/style.min.css");
            gulp.src(FILE_ADDR + './inputShine.js')
                .pipe(replace("cssFileContent", cssfile))
                .pipe(gulp.dest(FILE_ADDR))
                .pipe(stripDebug())
                .pipe(sourcemaps.init())
                // 压缩
                .pipe(uglify())
                .pipe(header(banner(), { pkg: pkg }))
                // 产出的压缩的文件名
                .pipe(rename('inputShine.min.js'))
                // 生成 sourcemap
                .pipe(sourcemaps.write(''))
                .pipe(gulp.dest(FILE_ADDR))
        })
    })
})

gulp.task("getCss", function(){
    gulp.src('./css/style.css')
        .pipe(gulp.dest(FILE_ADDR))
        .pipe(cleanCSS())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest(FILE_ADDR))
})

gulp.task("build", ['getCss', 'structure'], function(){
    gulp.watch('./js/*.js',['structure'])
	gulp.watch('./css/*.css',['structure'])
})

function getUglify(path){
    var content = fs.readFileSync(path,"utf-8")
    return content
}