import commonjs from '@rollup/plugin-commonjs';
import vuePlugin from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';
import pkg from './package.json';
import path from 'path';
import fs from 'fs';

var config = {
	input: 'src/index.js',
	output: {
		name: 'majcmp',
		file: 'dist/majcmp.js',
		format: 'umd'
	},
	plugins: [
		commonjs(),
		css({ output: 'assets/css/majcmp.css' }),
		vuePlugin({css:false})
	],
	watch: {// Watch only work on cli with --watch
		include: 'src/**'
	}
}

// ****** Custom control export config rule start ******
var options = process.argv;//Get cli parameter 取得執行命令帶的參數
var format = 'umd';
options.forEach(function(c, idx, arr){
	if(c=='-f' || c=='--output.format'){
		format = arr[idx+1];
	}
});

switch(format){
	case 'es':
		config.plugins = [
			commonjs(),
			css({ output: 'assets/css/majcmp.css' }),
			vuePlugin({css:false})
		]
	break;
}
config.output.format = format;


export default config;