const path = require('path')
const { defineConfig } = require('@vue/cli-service')

const resolve = (dir) => path.join(__dirname, dir)

module.exports = defineConfig({
	transpileDependencies: ['vue-echarts', 'resize-detector'],
	chainWebpack: (config) => {
		config.resolve.alias.set('@', resolve('./src'))
	},
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'less',
			patterns: [
				// 全局变量路径，不能使用路径别名
				path.resolve(__dirname, './src/assets/css/variables.less'),
			],
		},
	},
})
