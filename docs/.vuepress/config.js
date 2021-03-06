module.exports = {
	base:'/vuex-book/',
	title: 'Vuex',
	description: 'vuex source code learning!',
	markdown: {
		lineNumbers: true
	},
	locales: {
		'/': {
			lang: 'zh-CN',
			title: 'Vuex',
			description: 'vuex source code lean!'
		}
	},
	themeConfig: {
		// repo: 'https://github.com/zhumin-0426/vuex-book',
		prevLinks: true,
		lastUpdated: '上次更新:',
		nav: [
			// { text: '正文', link: '/zh/guide/package' }
		],
		sidebar: [
			{
				title: '前言', path: '/'
			},
			{
				title: '介绍',
				collapsable: false,
				children: [
					{ title: "关于该文档", path: '/zh/' },
					{ title: "vuex", path: '/zh/vuex' },
				]
			},
			{
				title: '正文',
				collapsable: false,
				children: [
					{ title: '从package.json开始', path: '/zh/guide/package' },
					{ title: '相关工具以及配置文件的介绍', path: '/zh/guide/configs' },
					{ title: '以package.json为线索', path: '/zh/guide/entry' },
					{ title: 'vuex.store实例初始化', path: '/zh/guide/store'},
					{ title: 'vuex.store实例方法', path: '/zh/guide/methods'}
				]
			}
		],
	}
}