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
					label: 'Русский',
					lang: 'ru',
				},
			},
			components: {
				ThemeSelect: './src/components/EmptyThemeSelect.astro',
			},
            title: 'GMONIT База знаний',
			logo: {
				src: './src/assets/colorGMONIT_logo_whi.svg',
				href: 'https://gmonit.ru',
				replacesTitle: true,
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
					label: 'Начало работы',
					autogenerate: { directory: 'getting-started' },
				},
				{
					label: 'Установка агентов',
					items: [
						{ label: 'APM', autogenerate: { directory: 'agents/apm' } },
						{ label: 'Инфраструктура', autogenerate: { directory: 'agents/infra' } },
						{ label: 'Браузерный мониторинг', autogenerate: { directory: 'agents/rum' } },
						{ label: 'Мобильный мониторинг', autogenerate: { directory: 'agents/mobile' } },
					],
				},
				{
					label: 'Модули',
					autogenerate: { directory: 'modules' },
				},
				{
					label: 'Сценарии использования',
					autogenerate: { directory: 'use-cases' },
				},
				{
					label: 'Справочник',
					autogenerate: { directory: 'reference' },
				},
			],
			pagination: false,
        }),
    ],
});