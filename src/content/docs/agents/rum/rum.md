---
title: RUM
description: ''
---

### [Установка RUM агента возможна в двух случаях:](https://docs.gmonit.ru/#/agent_installation_guide/RUM/real_user_monitoring?id=%d0%a3%d1%81%d1%82%d0%b0%d0%bd%d0%be%d0%b2%d0%ba%d0%b0-rum-%d0%b0%d0%b3%d0%b5%d0%bd%d1%82%d0%b0-%d0%b2%d0%be%d0%b7%d0%bc%d0%be%d0%b6%d0%bd%d0%b0-%d0%b2-%d0%b4%d0%b2%d1%83%d1%85-%d1%81%d0%bb%d1%83%d1%87%d0%b0%d1%8f%d1%85)

### [SSR - Server-Side Rendering](https://docs.gmonit.ru/#/agent_installation_guide/RUM/real_user_monitoring?id=ssr-server-side-rendering)

Инструментация браузерного агента происходит через APM агент. В этом случае мы (команда GMONIT) указывает на стороне коллектора - для каких приложений включить браузерный мониторинг.

### [SPA - Single-Page Application](https://docs.gmonit.ru/#/agent_installation_guide/RUM/real_user_monitoring?id=spa-single-page-application)

В случае с SPA приложениями настройка происходит при помощи [сниппета](https://github.com/HyperSoftLab/docs/tree/master/agent_installation_guide/RUM/snippet_template.html). Его можно использовать для множества приложений.

Для настройки сниппета необходимо выполнить 3 шага:

- В трёх местах кода файла **snippet_template** заменить `collector.%%%.gmonit.ru` на актуальный адрес коллектора.
- Заменить **applicationID:** `"My applicaton"` на свое название браузерного приложения, например **applicationID:** `"Prod_app”`, оно будет использоваться для идентификации приложения в системе, на разводящей странице браузерного мониторинга
- Скопируйте приведенный в сниппете фрагмент кода со скриптом и вставьте его как можно ближе к началу HEAD, но после любых МЕТА-тегов, чувствительных к положению (совместимых с X-UA и кодировкой).

# [Установка RUM в закрытом контуре](https://docs.gmonit.ru/#/agent_installation_guide/RUM/real_user_monitoring?id=%d0%a3%d1%81%d1%82%d0%b0%d0%bd%d0%be%d0%b2%d0%ba%d0%b0-rum-%d0%b2-%d0%b7%d0%b0%d0%ba%d1%80%d1%8b%d1%82%d0%be%d0%bc-%d0%ba%d0%be%d0%bd%d1%82%d1%83%d1%80%d0%b5)

- Перейдите по [ссылке](https://github.com/HyperSoftLab/docs/tree/master/agent_installation_guide/RUM/nr-spa-1.262.0.min.js) и cкачайте JavaScript-агента `nr-spa-1.262.0.min.js`.
- Разместите этот файл в соответствующем каталоге вашего CDN
- Скачайте сниппет [по ссылке](https://github.com/HyperSoftLab/docs/tree/master/agent_installation_guide/RUM/snippet_template.html)
- В скачанном файле замените адрес `https://js-agent.newrelic.com/` на путь к вашему каталогу CDN, где размещен файл `nr-spa-1.262.0.min.js`
- Для настройки сниппета необходимо выполнить 3 шага:
    - В трёх местах кода файла **snippet_template** заменить `collector.%%%.gmonit.ru` на актуальный адрес коллектора.
    - Заменить **applicationID:** `"My applicaton"` на свое название браузерного приложения, например **applicationID:** `"Prod_app”`, оно будет использоваться для идентификации приложения в системе, на разводящей странице браузерного мониторинга
    - Скопируйте приведенный в сниппете фрагмент кода со скриптом и вставьте его как можно ближе к началу HEAD, но после любых МЕТА-тегов, чувствительных к положению (совместимых с X-UA и кодировкой).
- Проверьте работу скриптов, подключаемых с CDN:
    - Откройте инструментированную страницу в браузере.
    - Перейдите в **DevTools (инструменты разработчика)** → вкладка **Network**.
    - В поле поиска введите `"newrelic"`.
    - Если в списке запросов вы видите файл `<ваш_CDN>/nr-spa-1.262.0.min.js`, это подтверждает успешную работу браузерного агента.
