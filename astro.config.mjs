// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
    integrations: [
        starlight({
			defaultLocale: 'ru',
            title: 'GMONIT База знаний',
            title: 'GMONIT База знаний',
			logo: {
					src: './src/assets/logo.svg',
				},
            customCss: [
                './src/styles/custom.css',
            ],
            social: [
                { icon: 'telegram', label: 'Telegram', href: 'https://t.me/gmonit_sales_bot' },
            ],
            sidebar: [
                {
                    label: 'Начало работы',
                    items: [
                        { label: 'Быстрый старт', slug: 'guides/quickstart' },
                    ],
                },
                {
                    label: 'Продукты',
                    autogenerate: { directory: 'products' },
                },
                {
                    label: 'Интеграции',
                    autogenerate: { directory: 'integrations' },
                },
                {
                    label: 'FAQ',
                    autogenerate: { directory: 'faq' },
                },
            ],
			lastUpdated: true,
        }),
    ],
});