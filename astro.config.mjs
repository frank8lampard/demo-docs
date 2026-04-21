// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://frank8lampard.github.io',
    base: '/demo-docs',
    integrations: [
        starlight({
			defaultLocale: 'ru',
			locales: {
				root: {
					label: '\u0420\u0443\u0441\u0441\u043a\u0438\u0439',
					lang: 'ru',
				},
			},
            title: '\u0414\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u0430\u0446\u0438\u044f',
			logo: {
				src: './src/assets/colorGMONIT_logo_whi.svg',
				replacesTitle: false,
			},
			favicon: '/favicon.svg',
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'icon',
						href: '/favicon.svg',
						type: 'image/svg+xml',
					},
				},
			],
            customCss: [
                './src/styles/custom.css',
            ],
            social: [
				{ icon: 'telegram', label: 'Telegram', href: 'https://t.me/gmonit_sales_bot' },
				{ icon: 'email', label: 'support@gmonit.ru', href: 'mailto:support@gmonit.ru' },
			],
			sidebar: [
				{
					label: '\u041d\u0430\u0447\u0430\u043b\u043e \u0440\u0430\u0431\u043e\u0442\u044b',
					collapsed: false,
					autogenerate: { directory: 'getting-started', collapsed: false },
				},
				{
					label: '\u0423\u0441\u0442\u0430\u043d\u043e\u0432\u043a\u0430 \u0430\u0433\u0435\u043d\u0442\u043e\u0432',
					items: [
						{ label: 'APM', autogenerate: { directory: 'agents/apm' } },
						{ label: '\u0418\u043d\u0444\u0440\u0430\u0441\u0442\u0440\u0443\u043a\u0442\u0443\u0440\u0430', autogenerate: { directory: 'agents/infra' } },
						{ label: '\u0411\u0440\u0430\u0443\u0437\u0435\u0440\u043d\u044b\u0439 \u043c\u043e\u043d\u0438\u0442\u043e\u0440\u0438\u043d\u0433', autogenerate: { directory: 'agents/rum' } },
						{ label: '\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0439 \u043c\u043e\u043d\u0438\u0442\u043e\u0440\u0438\u043d\u0433', autogenerate: { directory: 'agents/mobile' } },
					],
				},
				{
					label: '\u041c\u043e\u0434\u0443\u043b\u0438',
					autogenerate: { directory: 'modules' },
				},
				{
					label: '\u0421\u0446\u0435\u043d\u0430\u0440\u0438\u0438 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u044f',
					autogenerate: { directory: 'use-cases' },
				},
				{
					label: '\u0421\u043f\u0440\u0430\u0432\u043e\u0447\u043d\u0438\u043a',
					autogenerate: { directory: 'reference' },
				},
			],
			pagination: false,
			pagefind: false,
			components: {
				ThemeSelect: './src/components/EmptyThemeSelect.astro',
				Header: './src/components/Header.astro',
				Search: './src/components/OramaSearch.astro',
			},
        }),
    ],
});
