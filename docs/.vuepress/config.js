module.exports = {
	title: 'Vuex',
	description: 'vuex source code learning!',
	markdown: {
		lineNumbers: true
	},
	locales: {
		'/': {
			lang: 'zh-CN',
			title: 'VuePress',
			description: 'vuex source code lean!'
		}
	},
	themeConfig: {
		repo: 'https://github.com/zhumin-0426/vuex-book',
		prevLinks: true,
		lastUpdated: '上次更新:',
		nav: [
			{ text: '正文', link: '/zh/guide/package' },
			{ text: '附录', link: '/zh/appendix/' }
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
					{ title: 'store对象', path: '/zh/guide/store'}
				]
			}
		],
	}
}