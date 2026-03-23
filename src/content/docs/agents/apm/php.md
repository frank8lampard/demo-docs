---
title: PHP
description: ''
---

Агент мониторинга PHP от New Relic состоит из двух взаимодействующих частей:

1. **Расширение для PHP**, которое занимается сбором метрик и трейсов.
2. **Прокси-демон (`newrelic-daemon`)**, который отвечает за взаимодействие с бэкендом мониторинга (в данном случае — с GMonit).

Ниже собрана полная инструкция по установке и настройке данного агента в различных окружениях (Ubuntu/Debian, CentOS, контейнерные среды). Если требуется дополнительная информация, обращайтесь к [официальной документации](https://docs.newrelic.com/docs/apm/agents/php-agent/installation/php-agent-installation-overview).

### [Обязательные настройки агента](https://docs.gmonit.ru/#/agent_installation_guide/APM/php?id=%d0%9e%d0%b1%d1%8f%d0%b7%d0%b0%d1%82%d0%b5%d0%bb%d1%8c%d0%bd%d1%8b%d0%b5-%d0%bd%d0%b0%d1%81%d1%82%d1%80%d0%be%d0%b9%d0%ba%d0%b8-%d0%b0%d0%b3%d0%b5%d0%bd%d1%82%d0%b0)

Независимо от окружения, в файле `newrelic.ini` (обычно располагается в `/etc/php/7.x/mods-available/newrelic.ini`, `/etc/php.d/newrelic.ini` или `/etc/php/.../conf.d/newrelic.ini`) **обязательно** должны быть прописаны (или эквивалентно заданы в переменных окружения) следующие параметры:

```plain
newrelic.license = 0123456789-123456789-123456789-123456789 #Ключ(заглушка, не меняем)
newrelic.daemon.collector_host = gmonit-collector.<DOMAIN>.ru #Домен коллектора GMonit
newrelic.appname = "MY_AWESOME_APP" #Название приложения
newrelic.logfile = stdout #Логирование агента в stdout
```

> Если вы настраиваете агент через переменные окружения, то эквивалентом будут:export NEW_RELIC_LICENSE_KEY=0123456789-123456789-123456789-123456789 #Ключ(заглушка, не меняем)
> export NEW_RELIC_HOST=gmonit-collector.name.ru #Домен коллектора GMonit
> export NEW_RELIC_APP_NAME="MY_AWESOME_APP" #Название приложения
> export NEW_RELIC_LOG=stdout #Логирование агента в stdout

### [1. Установка агента New Relic для PHP на Ubuntu и Debian](https://docs.gmonit.ru/#/agent_installation_guide/APM/php?id=_1-%d0%a3%d1%81%d1%82%d0%b0%d0%bd%d0%be%d0%b2%d0%ba%d0%b0-%d0%b0%d0%b3%d0%b5%d0%bd%d1%82%d0%b0-new-relic-%d0%b4%d0%bb%d1%8f-php-%d0%bd%d0%b0-ubuntu-%d0%b8-debian)

1. **Добавление репозитория New Relic**:echo 'deb http://apt.newrelic.com/debian/ newrelic non-free' | sudo tee /etc/apt/sources.list.d/newrelic.list
2. **Обновление списка пакетов**:sudo apt-get update
3. **Установка PHP-агента**:sudo apt-get install newrelic-php5Если вы используете вместо `glibc` библиотеку `musl libc` (например, в **Alpine Linux**), необходимо скачать и установить актуальную версию агента с поддержкой `musl` по [ссылке](https://download.newrelic.com/php_agent/release/).
4. **Настройка конфигурации агента**:
    - Откройте файл `newrelic.ini` и пропишите **обязательные параметры**, указанные выше в разделе «Обязательные настройки агента».
    - Если используются самоподписанные сертификаты (или Let's Encrypt) для коллектора, необходимо явно указать это при конфигурации демона. Например, добавляя ключ к команде запуска `newrelic-daemon`:newrelic-daemon --cafile /etc/ssl/certs/ca-certificates.crtили в конфигурационном файле `newrelic.cfg`:ssl_ca_bundle = /etc/ssl/certs/ca-certificates.crt
5. **Перезапуск веб-сервера**:# Для Apache
sudo systemctl restart apache2

# Для NGINX + PHP-FPM
sudo systemctl restart nginx
sudo systemctl restart php-fpm
6. **Проверка работы**
Сгенерируйте трафик к вашему приложению и проверьте метрики в интерфейсе GMonit.

### [2. Установка агента New Relic для PHP на CentOS](https://docs.gmonit.ru/#/agent_installation_guide/APM/php?id=_2-%d0%a3%d1%81%d1%82%d0%b0%d0%bd%d0%be%d0%b2%d0%ba%d0%b0-%d0%b0%d0%b3%d0%b5%d0%bd%d1%82%d0%b0-new-relic-%d0%b4%d0%bb%d1%8f-php-%d0%bd%d0%b0-centos)

1. **Добавление репозитория New Relic**:
    - Для 64-битных систем:sudo rpm -Uvh http://yum.newrelic.com/pub/newrelic/el5/x86_64/newrelic-repo-5-3.noarch.rpm
2. **Установка PHP-агента**:sudo yum install newrelic-php5
3. **Запуск скрипта установки**:sudo newrelic-install install
4. **Настройка конфигурации агента**:
    - Откройте файл `newrelic.ini` и пропишите **обязательные параметры**, указанные выше в разделе «Обязательные настройки агента».
    - Если используются самоподписанные сертификаты (или Let's Encrypt), укажите путь к сертификату в конфигурации `newrelic-daemon` или `newrelic.cfg` (аналогично Ubuntu/Debian).
5. **Перезапуск веб-сервера**:# Для Apache
sudo systemctl restart httpd

# Для NGINX + PHP-FPM
sudo systemctl restart nginx
sudo systemctl restart php-fpm
6. **Проверка работы**
Сгенерируйте трафик к вашему приложению и проверьте метрики в интерфейсе GMonit.

### [3. Установка агента New Relic для PHP в контейнерных средах (Docker и др.)](https://docs.gmonit.ru/#/agent_installation_guide/APM/php?id=_3-%d0%a3%d1%81%d1%82%d0%b0%d0%bd%d0%be%d0%b2%d0%ba%d0%b0-%d0%b0%d0%b3%d0%b5%d0%bd%d1%82%d0%b0-new-relic-%d0%b4%d0%bb%d1%8f-php-%d0%b2-%d0%ba%d0%be%d0%bd%d1%82%d0%b5%d0%b9%d0%bd%d0%b5%d1%80%d0%bd%d1%8b%d1%85-%d1%81%d1%80%d0%b5%d0%b4%d0%b0%d1%85-docker-%d0%b8-%d0%b4%d1%80)

1. **Выбор способа установки**:
    - **Установка в разных контейнерах** (рекомендуется):
        1. Настройте контейнер для демона: Используйте образ `newrelic/php-daemon` из Docker Hub или аналогичный подход, где `newrelic-daemon` работает в отдельном контейнере.
        2. Настройте контейнер для PHP-агента: Установите PHP и агент в контейнере:sudo apt-get install newrelic-php5
sudo newrelic-install installЗатем пропишите переменные окружения (или внесите настройки в `newrelic.ini`) при запуске контейнера или в Dockerfile. **Обязательные параметры** описаны в начале инструкции.
    - **Установка в одном контейнере**:
        1. Установите PHP и агент:sudo apt-get install newrelic-php5
sudo newrelic-install install
        2. Настройте параметры в `newrelic.ini` или через переменные окружения. Не забудьте добавить **обязательные**:newrelic.license = 0123456789-123456789-123456789-123456789 #Ключ(заглушка, не меняем)
newrelic.daemon.collector_host = gmonit-collector.<DOMAIN>.ru #Домен коллектора GMonit
newrelic.appname = "MY_AWESOME_APP" #Название приложения
newrelic.logfile = stdout #Логирование агента в stdout
        3. При использовании самоподписанных сертификатов (или Let's Encrypt) обязательно укажите путь к сертификату в конфигурации демона (либо с помощью ключа `--cafile`, либо через `ssl_ca_bundle` в `newrelic.cfg`).
2. **Дополнительные действия для Alpine Linux**
Если используется `musl libc` (в Alpine Linux), скачайте и установите версию агента для `musl` по [ссылке](https://download.newrelic.com/php_agent/release/).
3. **Перезапуск веб-сервера**
Убедитесь, что выбранный веб-сервер (Apache, NGINX, PHP-FPM) перезапущен после установки:sudo systemctl restart apache2 || sudo systemctl restart httpd
sudo systemctl restart nginx
sudo systemctl restart php-fpm
4. **Проверка работы**
Сгенерируйте трафик к вашему приложению и проверьте метрики в интерфейсе GMonit.

### [Дополнительная информация](https://docs.gmonit.ru/#/agent_installation_guide/APM/php?id=%d0%94%d0%be%d0%bf%d0%be%d0%bb%d0%bd%d0%b8%d1%82%d0%b5%d0%bb%d1%8c%d0%bd%d0%b0%d1%8f-%d0%b8%d0%bd%d1%84%d0%be%d1%80%d0%bc%d0%b0%d1%86%d0%b8%d1%8f)

- Подробная документация по установке и настройке агента для PHP:
[PHP Agent Configuration — New Relic Documentation](https://docs.newrelic.com/docs/apm/agents/php-agent/installation/)
- Если требуются более тонкие настройки агента и прокси-демона (`newrelic-daemon`), в том числе указание кастомного `cafile`, использование дополнительных сетевых параметров и т. д., обратитесь к [разделу конфигурации демона](https://docs.newrelic.com/docs/apm/agents/php-agent/configuration/proxy-daemon-newreliccfg-settings/#proxy-settings).

# [Добавление кастомного параметра](https://docs.gmonit.ru/#/agent_installation_guide/APM/php?id=%d0%94%d0%be%d0%b1%d0%b0%d0%b2%d0%bb%d0%b5%d0%bd%d0%b8%d0%b5-%d0%ba%d0%b0%d1%81%d1%82%d0%be%d0%bc%d0%bd%d0%be%d0%b3%d0%be-%d0%bf%d0%b0%d1%80%d0%b0%d0%bc%d0%b5%d1%82%d1%80%d0%b0)

Для добавления пользовательских параметров в текущую транзакцию PHP можно использовать функцию `newrelic_add_custom_parameter`. Это позволяет добавлять дополнительные данные, такие как идентификаторы пользователей, чтобы они были доступны в трассировках транзакций и в событиях Transaction.

Пример использования функции:

```plain
if (extension_loaded('newrelic')) {
    $user_id = 12345; // уникальный идентификатор пользователя
    newrelic_add_custom_parameter('user_id', $user_id);
}
```

### [Описание функции](https://docs.gmonit.ru/#/agent_installation_guide/APM/php?id=%d0%9e%d0%bf%d0%b8%d1%81%d0%b0%d0%bd%d0%b8%d0%b5-%d1%84%d1%83%d0%bd%d0%ba%d1%86%d0%b8%d0%b8)

```plain
newrelic_add_custom_parameter(string $key, scalar $value)
```

- **`key`** — имя пользовательского параметра (до 255 символов). Например, `user_id`, `client_name`.
- **`value`** — значение, связанное с этим параметром. Допустимы скалярные типы (строки, числа, логические значения). Для float значений `NaN`, `Infinity`, `denorm` или отрицательного нуля поведение функции не определено.

#### [Применение](https://docs.gmonit.ru/#/agent_installation_guide/APM/php?id=%d0%9f%d1%80%d0%b8%d0%bc%d0%b5%d0%bd%d0%b5%d0%bd%d0%b8%d0%b5)

Вы можете использовать эту функцию для добавления данных, таких как:

- Идентификаторы пользователей
- Метки запросов
- Прочие специфичные данные

Эти параметры будут видны в трассировках транзакций в интерфейсе GMonit.

#### [Примечание](https://docs.gmonit.ru/#/agent_installation_guide/APM/php?id=%d0%9f%d1%80%d0%b8%d0%bc%d0%b5%d1%87%d0%b0%d0%bd%d0%b8%d0%b5)

Убедитесь, что расширение New Relic для PHP загружено в вашу среду (проверьте через `phpinfo()` или `php -m`).

Подробности можно найти в официальной документации [New Relic](https://docs.newrelic.com/docs/apm/agents/php-agent/php-agent-api/newrelic_add_custom_parameter/)

# [Именование и управление транзакциями](https://docs.gmonit.ru/#/agent_installation_guide/APM/php?id=%d0%98%d0%bc%d0%b5%d0%bd%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d0%b5-%d0%b8-%d1%83%d0%bf%d1%80%d0%b0%d0%b2%d0%bb%d0%b5%d0%bd%d0%b8%d0%b5-%d1%82%d1%80%d0%b0%d0%bd%d0%b7%d0%b0%d0%ba%d1%86%d0%b8%d1%8f%d0%bc%d0%b8)

Для правильной идентификации и отслеживания транзакций в мониторинге вы можете задавать имена транзакций с помощью функции `newrelic_name_transaction`. Это позволяет организовать мониторинг и избежать избыточного числа уникальных имён транзакций, которые могут затруднить анализ данных.

#### [Пример: Задание имени транзакции для `Uri/index.php`](https://docs.gmonit.ru/#/agent_installation_guide/APM/php?id=%d0%9f%d1%80%d0%b8%d0%bc%d0%b5%d1%80-%d0%97%d0%b0%d0%b4%d0%b0%d0%bd%d0%b8%d0%b5-%d0%b8%d0%bc%d0%b5%d0%bd%d0%b8-%d1%82%d1%80%d0%b0%d0%bd%d0%b7%d0%b0%d0%ba%d1%86%d0%b8%d0%b8-%d0%b4%d0%bb%d1%8f-uriindexphp)

Для задания имени транзакции добавьте следующий сниппет в код обработчика запросов (вместо `example` подставьте имя вашей функции, вызываемой при обращении к `Uri/index.php`):

```plain
function example() { 
    if (extension_loaded('newrelic')) { // Проверка, что PHP-агент доступен
        newrelic_name_transaction("Custom/index/*");
    }
    // ... здесь остальной код функции
}
```

Таким образом, текущая транзакция станет называться `Custom/index/`.

> **Примечание**: Уникальных имён транзакций не должно быть слишком много, и они не должны содержать идентификаторы.

Примеры:

- `Custom/index/` — хорошо.
- `Custom/index/ + product.id` — нельзя.

Этот код безопасен и не вызовет ошибки при отключении агента, так как вызов функции обёрнут в проверку `if (extension_loaded('newrelic'))`.

Подробности можно найти в официальной документации [New Relic](https://docs.newrelic.com/docs/apm/agents/php-agent/php-agent-api/newrelic_name_transaction/)

### [Пример: Добавление имени транзакции для конкретного URI](https://docs.gmonit.ru/#/agent_installation_guide/APM/php?id=%d0%9f%d1%80%d0%b8%d0%bc%d0%b5%d1%80-%d0%94%d0%be%d0%b1%d0%b0%d0%b2%d0%bb%d0%b5%d0%bd%d0%b8%d0%b5-%d0%b8%d0%bc%d0%b5%d0%bd%d0%b8-%d1%82%d1%80%d0%b0%d0%bd%d0%b7%d0%b0%d0%ba%d1%86%d0%b8%d0%b8-%d0%b4%d0%bb%d1%8f-%d0%ba%d0%be%d0%bd%d0%ba%d1%80%d0%b5%d1%82%d0%bd%d0%be%d0%b3%d0%be-uri)

Для добавления транзакции, например для URI `https://test.ru/doc/estimation` следуйте этим шагам:

1. В коде обработчика запросов для нужного URI добавьте следующий сниппет:function example() { 
    if (extension_loaded('newrelic')) { // Проверка, что PHP-агент доступен
        newrelic_name_transaction("Custom/estimation");
    }
    // ... здесь остальной код функции
}
2. Таким образом, текущая транзакция станет называться `Custom/estimation`.

> **Примечание**: Как и в предыдущем примере, уникальных имён транзакций не должно быть слишком много, и они не должны содержать идентификаторы.

Примеры:

- `Custom/estimation` — хорошо.
- `Custom/estimation + product.id` — нельзя.

Этот код безопасен и не вызовет ошибки при отключении агента, так как вызов функции обёрнут в проверку `if (extension_loaded('newrelic'))`.

Подробности можно найти в официальной документации [New Relic](https://docs.newrelic.com/docs/apm/agents/php-agent/php-agent-api/newrelic_name_transaction/)
