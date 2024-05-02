# Backend service

Backend implementation in Django

### Stack

Django + DRF + Django channels + daphne + PostgreSQL + Redis

### Launch

#### Docker

```
docker-compose up --build
```

#### Python

```shell
# Will run daphne under the hood
python manage.py runserver
```

### Generate API schema

```
python manage.py generateschema > schema.yml
```

### Run tests && migrate

```
docker exec -it /bin/sh [container_name]
python manage.py test
python manage.py migrate
```
