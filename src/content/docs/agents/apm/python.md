---
title: Python(Django, FastAPI)
description: ''
---

Для установки и настройки Python-агента New Relic в Django выполните следующие шаги:

### [1. Установка пакета New Relic](https://docs.gmonit.ru/#/agent_installation_guide/APM/python?id=_1-%d0%a3%d1%81%d1%82%d0%b0%d0%bd%d0%be%d0%b2%d0%ba%d0%b0-%d0%bf%d0%b0%d0%ba%d0%b5%d1%82%d0%b0-new-relic)

Установите агент из PyPi, выполнив следующую команду:

```plain
pip install newrelic
```

### [2. Настройка агента](https://docs.gmonit.ru/#/agent_installation_guide/APM/python?id=_2-%d0%9d%d0%b0%d1%81%d1%82%d1%80%d0%be%d0%b9%d0%ba%d0%b0-%d0%b0%d0%b3%d0%b5%d0%bd%d1%82%d0%b0)

Для начала работы агенту Python необходимы базовые настройки. Их можно задать двумя способами: через конфигурационный файл или переменные окружения.

#### [Способ 1: Использование конфигурационного файла](https://docs.gmonit.ru/#/agent_installation_guide/APM/python?id=%d0%a1%d0%bf%d0%be%d1%81%d0%be%d0%b1-1-%d0%98%d1%81%d0%bf%d0%be%d0%bb%d1%8c%d0%b7%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d0%b5-%d0%ba%d0%be%d0%bd%d1%84%d0%b8%d0%b3%d1%83%d1%80%d0%b0%d1%86%d0%b8%d0%be%d0%bd%d0%bd%d0%be%d0%b3%d0%be-%d1%84%d0%b0%d0%b9%d0%bb%d0%b0)

1. Перейдите в рабочий каталог, в котором вы можете сохранить файл, и выполните команду:newrelic-admin generate-config 0123456789-123456789-123456789-123456789 newrelic.ini
2. Откройте файл `newrelic.ini` и внесите изменения в следующие параметры:license_key = 0123456789-123456789-123456789-123456789 # Ключ (заглушка, не меняем)
host = gmonit-collector.<<DOMAIN>>.ru # Домен коллектора
app_name = "MY_AWESOME_APP" # Название приложения

#### [Способ 2: Использование переменных окружения](https://docs.gmonit.ru/#/agent_installation_guide/APM/python?id=%d0%a1%d0%bf%d0%be%d1%81%d0%be%d0%b1-2-%d0%98%d1%81%d0%bf%d0%be%d0%bb%d1%8c%d0%b7%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d0%b5-%d0%bf%d0%b5%d1%80%d0%b5%d0%bc%d0%b5%d0%bd%d0%bd%d1%8b%d1%85-%d0%be%d0%ba%d1%80%d1%83%d0%b6%d0%b5%d0%bd%d0%b8%d1%8f)

Для настройки без конфигурационного файла можно задать переменные окружения. Выполните следующие команды:

```plain
NEW_RELIC_LICENSE_KEY=0123456789-123456789-123456789-123456789
NEW_RELIC_HOST=gmonit-collector.<DOMAIN>.ru # Домен коллектора
NEW_RELIC_APP_NAME="MY_AWESOME_APP" # Название приложения
```

### [Подробнее](https://docs.gmonit.ru/#/agent_installation_guide/APM/python?id=%d0%9f%d0%be%d0%b4%d1%80%d0%be%d0%b1%d0%bd%d0%b5%d0%b5)

Для более детальной информации о конфигурации агента обратитесь к [официальной документации New Relic](https://docs.newrelic.com/install/python/).

# ________________________

Для установки и настройки Python-агента New Relic в FastAPI выполните следующие шаги:

### [1. Установка пакета New Relic](https://docs.gmonit.ru/#/agent_installation_guide/APM/python?id=_1-%d0%a3%d1%81%d1%82%d0%b0%d0%bd%d0%be%d0%b2%d0%ba%d0%b0-%d0%bf%d0%b0%d0%ba%d0%b5%d1%82%d0%b0-new-relic-1)

Установите агент из PyPi, выполнив следующую команду:

```plain
pip install newrelic
```

### [2. Настройка агента](https://docs.gmonit.ru/#/agent_installation_guide/APM/python?id=_2-%d0%9d%d0%b0%d1%81%d1%82%d1%80%d0%be%d0%b9%d0%ba%d0%b0-%d0%b0%d0%b3%d0%b5%d0%bd%d1%82%d0%b0-1)

Агенту Python необходимы базовые настройки. Их можно задать через конфигурационный файл или переменные окружения.

#### [Способ 1: Использование конфигурационного файла](https://docs.gmonit.ru/#/agent_installation_guide/APM/python?id=%d0%a1%d0%bf%d0%be%d1%81%d0%be%d0%b1-1-%d0%98%d1%81%d0%bf%d0%be%d0%bb%d1%8c%d0%b7%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d0%b5-%d0%ba%d0%be%d0%bd%d1%84%d0%b8%d0%b3%d1%83%d1%80%d0%b0%d1%86%d0%b8%d0%be%d0%bd%d0%bd%d0%be%d0%b3%d0%be-%d1%84%d0%b0%d0%b9%d0%bb%d0%b0-1)

1. Перейдите в рабочий каталог, в котором вы можете сохранить файл, и выполните команду:newrelic-admin generate-config 0123456789-123456789-123456789-123456789 newrelic.ini
2. Откройте файл `newrelic.ini` и внесите изменения в следующие параметры:license_key = 0123456789-123456789-123456789-123456789 # Ключ (заглушка, не меняем)
host = gmonit-collector.<<DOMAIN>>.ru # Домен коллектора
app_name = "MY_FAST_API_APP" # Название приложения

#### [Способ 2: Использование переменных окружения](https://docs.gmonit.ru/#/agent_installation_guide/APM/python?id=%d0%a1%d0%bf%d0%be%d1%81%d0%be%d0%b1-2-%d0%98%d1%81%d0%bf%d0%be%d0%bb%d1%8c%d0%b7%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d0%b5-%d0%bf%d0%b5%d1%80%d0%b5%d0%bc%d0%b5%d0%bd%d0%bd%d1%8b%d1%85-%d0%be%d0%ba%d1%80%d1%83%d0%b6%d0%b5%d0%bd%d0%b8%d1%8f-1)

Для настройки без конфигурационного файла можно задать переменные окружения. Выполните следующие команды:

```plain
NEW_RELIC_LICENSE_KEY=0123456789-123456789-123456789-123456789
NEW_RELIC_HOST=gmonit-collector.<DOMAIN>.ru # Домен коллектора
NEW_RELIC_APP_NAME= "MY_FAST_API_APP" # Название приложения
```

### [3. Интеграция агента с FastAPI](https://docs.gmonit.ru/#/agent_installation_guide/APM/python?id=_3-%d0%98%d0%bd%d1%82%d0%b5%d0%b3%d1%80%d0%b0%d1%86%d0%b8%d1%8f-%d0%b0%d0%b3%d0%b5%d0%bd%d1%82%d0%b0-%d1%81-fastapi)

Для запуска вашего приложения FastAPI с агентом New Relic необходимо использовать команду `newrelic-admin run-program` перед командой запуска вашего приложения.

#### [Пример запуска приложения с Uvicorn:](https://docs.gmonit.ru/#/agent_installation_guide/APM/python?id=%d0%9f%d1%80%d0%b8%d0%bc%d0%b5%d1%80-%d0%b7%d0%b0%d0%bf%d1%83%d1%81%d0%ba%d0%b0-%d0%bf%d1%80%d0%b8%d0%bb%d0%be%d0%b6%d0%b5%d0%bd%d0%b8%d1%8f-%d1%81-uvicorn)

```plain
newrelic-admin run-program uvicorn main:app --host 0.0.0.0 --port 8000
```

- **`main:app`** — путь к вашему приложению FastAPI. Если ваш файл называется `main.py` и содержит объект приложения `app`, то этот синтаксис корректен.
- **`--host 0.0.0.0`** — слушать на всех интерфейсах.
- **`--port 8000`** — порт, на котором будет доступно ваше приложение.

#### [Пример запуска приложения с Gunicorn:](https://docs.gmonit.ru/#/agent_installation_guide/APM/python?id=%d0%9f%d1%80%d0%b8%d0%bc%d0%b5%d1%80-%d0%b7%d0%b0%d0%bf%d1%83%d1%81%d0%ba%d0%b0-%d0%bf%d1%80%d0%b8%d0%bb%d0%be%d0%b6%d0%b5%d0%bd%d0%b8%d1%8f-%d1%81-gunicorn)

```plain
newrelic-admin run-program gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

- **`-w 4`** — количество рабочих процессов.
- **`-k uvicorn.workers.UvicornWorker`** — использование `UvicornWorker` для асинхронной обработки.

### [Подробнее](https://docs.gmonit.ru/#/agent_installation_guide/APM/python?id=%d0%9f%d0%be%d0%b4%d1%80%d0%be%d0%b1%d0%bd%d0%b5%d0%b5-1)

Для более детальной информации о конфигурации агента обратитесь к [официальной документации New Relic](https://docs.newrelic.com/install/python/).
