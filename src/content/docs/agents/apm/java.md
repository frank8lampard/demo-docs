---
title: Java
description: ''
---

Для интеграции APM-агента в Java-приложение выполните следующие шаги:

### [1. **Загрузка агента**](https://docs.gmonit.ru/#/agent_installation_guide/APM/java?id=_1-%d0%97%d0%b0%d0%b3%d1%80%d1%83%d0%b7%d0%ba%d0%b0-%d0%b0%d0%b3%d0%b5%d0%bd%d1%82%d0%b0)

1. Скачайте архив с агентом с официального сайта New Relic:curl -O https://download.newrelic.com/newrelic/java-agent/newrelic-agent/current/newrelic-java.zip
2. (Опционально) Ознакомьтесь с [официальной инструкцией по установке APM-агента для Java](https://docs.newrelic.com/install/java/) для получения дополнительных подробностей.

### [2. **Распаковка агента**](https://docs.gmonit.ru/#/agent_installation_guide/APM/java?id=_2-%d0%a0%d0%b0%d1%81%d0%bf%d0%b0%d0%ba%d0%be%d0%b2%d0%ba%d0%b0-%d0%b0%d0%b3%d0%b5%d0%bd%d1%82%d0%b0)

Распакуйте загруженный архив в предпочтительный каталог. Например:

```plain
sudo mkdir -p /opt/newrelic
sudo unzip newrelic-java.zip -d /opt/newrelic
```

> **Важно:** Убедитесь, что файлы `.jar` агента **не находятся** в пути к классам или в каталогах, перечисленных в `java.endorsed.dirs`.

### [3. **Настройка конфигурации агента**](https://docs.gmonit.ru/#/agent_installation_guide/APM/java?id=_3-%d0%9d%d0%b0%d1%81%d1%82%d1%80%d0%be%d0%b9%d0%ba%d0%b0-%d0%ba%d0%be%d0%bd%d1%84%d0%b8%d0%b3%d1%83%d1%80%d0%b0%d1%86%d0%b8%d0%b8-%d0%b0%d0%b3%d0%b5%d0%bd%d1%82%d0%b0)

Настройте файл `newrelic.yml` или используйте переменные окружения для конфигурации агента.

1. **Основные настройки** (через переменные окружения или в `newrelic.yml`):NEW_RELIC_LOG=stdout #Логирование агента в stdout
NEW_RELIC_LICENSE_KEY=0123456789-123456789-123456789-123456789 #Ключ(заглушка, не меняем)
NEW_RELIC_HOST=gmonit-collector.<DOMAIN>.ru #Домен коллектора GMonit
NEW_RELIC_APP_NAME="MY_AWESOME_APP" #Название приложения - замените на своё
2. **Если используются самоподписанные сертификаты**
Необходимо явно указать путь до бандла сертификатов (через `newrelic.yml` или переменную окружения):NEW_RELIC_CA_BUNDLE_PATH=/gmonit/ssl/rootCA.crt #Путь до файла с бандлом сертификатовИли в `newrelic.yml`:ca_bundle_path: /gmonit/ssl/rootCA.crt

> При необходимости более тонкой настройки параметров агента смотрите также официальную [документацию по конфигурации агента для Java](https://docs.newrelic.com/docs/apm/agents/java-agent/configuration/java-agent-configuration-config-file/).

### [4. **Интеграция агента с приложением**](https://docs.gmonit.ru/#/agent_installation_guide/APM/java?id=_4-%d0%98%d0%bd%d1%82%d0%b5%d0%b3%d1%80%d0%b0%d1%86%d0%b8%d1%8f-%d0%b0%d0%b3%d0%b5%d0%bd%d1%82%d0%b0-%d1%81-%d0%bf%d1%80%d0%b8%d0%bb%d0%be%d0%b6%d0%b5%d0%bd%d0%b8%d0%b5%d0%bc)

Добавьте флаг запуска агента в команду запуска вашего Java-приложения:

```plain
-javaagent:/opt/newrelic/newrelic.jar
```

Пример команды запуска:

```plain
java -javaagent:/opt/newrelic/newrelic.jar -jar my-app.jar
```

### [5. **Проверка работы агента**](https://docs.gmonit.ru/#/agent_installation_guide/APM/java?id=_5-%d0%9f%d1%80%d0%be%d0%b2%d0%b5%d1%80%d0%ba%d0%b0-%d1%80%d0%b0%d0%b1%d0%be%d1%82%d1%8b-%d0%b0%d0%b3%d0%b5%d0%bd%d1%82%d0%b0)

После запуска приложения убедитесь, что агент успешно подключился:

- В логах агента (`stdout`) должно появиться сообщение об успешном подключении.
- В интерфейсе мониторинга GMonit появятся метрики приложения.

### [6. **Подробнее**](https://docs.gmonit.ru/#/agent_installation_guide/APM/java?id=_6-%d0%9f%d0%be%d0%b4%d1%80%d0%be%d0%b1%d0%bd%d0%b5%d0%b5)

Для более детальной информации о конфигурации и настройке агента обратитесь к [официальной документации New Relic](https://docs.newrelic.com/docs/apm/agents/java-agent/configuration/java-agent-configuration-config-file/).

# [Установка APM-агента для Java в K8S](https://docs.gmonit.ru/#/agent_installation_guide/APM/java?id=%d0%a3%d1%81%d1%82%d0%b0%d0%bd%d0%be%d0%b2%d0%ba%d0%b0-apm-%d0%b0%d0%b3%d0%b5%d0%bd%d1%82%d0%b0-%d0%b4%d0%bb%d1%8f-java-%d0%b2-k8s)

Для интеграции агента New Relic в Java-приложение, работающее в Kubernetes, выполните следующие шаги:

### [Шаг 1: Загрузка и распаковка агента New Relic](https://docs.gmonit.ru/#/agent_installation_guide/APM/java?id=%d0%a8%d0%b0%d0%b3-1-%d0%97%d0%b0%d0%b3%d1%80%d1%83%d0%b7%d0%ba%d0%b0-%d0%b8-%d1%80%d0%b0%d1%81%d0%bf%d0%b0%d0%ba%d0%be%d0%b2%d0%ba%d0%b0-%d0%b0%d0%b3%d0%b5%d0%bd%d1%82%d0%b0-new-relic)

1. **Скачать Java-агент**:curl -O https://download.newrelic.com/newrelic/java-agent/newrelic-agent/current/newrelic-java.zip
2. **Распаковать агент**:unzip newrelic-java.zip -d /opt/newrelicАгент Java нужно распаковать в директорию внутри контейнера, которая будет доступна во время выполнения приложения.**Важно**: Если агент будет расположен в другом месте, убедитесь, что `.jar` файлы агента **не находятся** в директориях, указанных в `java.endorsed.dirs` или в пути к классам.

### [Шаг 2: Настройка агента New Relic](https://docs.gmonit.ru/#/agent_installation_guide/APM/java?id=%d0%a8%d0%b0%d0%b3-2-%d0%9d%d0%b0%d1%81%d1%82%d1%80%d0%be%d0%b9%d0%ba%d0%b0-%d0%b0%d0%b3%d0%b5%d0%bd%d1%82%d0%b0-new-relic)

1. **Откройте файл&#160;`newrelic.yml`** и внесите следующие изменения:common: &default_settings
  license_key: '0123456789-123456789-123456789-123456789' #Ключ(заглушка, не меняем)
  app_name: "MY_AWESOME_APP" #Название приложения - замените на своё
  host: "gmonit-collector.<DOMAIN>.ru" #Домен коллектора GMonit
  agent_enabled: true
  log_level: info
  log_file_path: stdout #Логирование агента в stdout
2. Если используются самоподписанные сертификаты, убедитесь, что путь к бандлу сертификатов добавлен в настройки (см. предыдущие разделы).

### [Шаг 3: Подготовка Docker-образа с агентом](https://docs.gmonit.ru/#/agent_installation_guide/APM/java?id=%d0%a8%d0%b0%d0%b3-3-%d0%9f%d0%be%d0%b4%d0%b3%d0%be%d1%82%d0%be%d0%b2%d0%ba%d0%b0-docker-%d0%be%d0%b1%d1%80%d0%b0%d0%b7%d0%b0-%d1%81-%d0%b0%d0%b3%d0%b5%d0%bd%d1%82%d0%be%d0%bc)

1. **Обновите&#160;`Dockerfile`** для вашего Java-приложения. Пример конфигурации:FROM openjdk:11-jre-slim
COPY opt/newrelic/ /opt/newrelic/ #Копируем агента New Relic в контейнер
COPY out/ /app                     #Копируем ваше Java-приложение в контейнер
WORKDIR /app
ENTRYPOINT ["java", "-javaagent:/opt/newrelic/newrelic.jar", "com.example.HelloWorldServer"]
2. **Пересоберите Docker-образ**:docker build -t my-java-app-with-newrelic:latest .
3. **Загрузите Docker-образ в кластер Kubernetes**. Пример для использования с `kind`:kind load docker-image my-java-app-with-newrelic:latest

После выполнения этих шагов ваш Docker-образ с интегрированным APM-агентом готов для развертывания в Kubernetes. Убедитесь, что поды с приложением запускаются корректно, а метрики появляются в интерфейсе GMonit.
