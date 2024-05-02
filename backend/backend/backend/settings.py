"""
No `django-environ` due to type system
"""

import os
from pathlib import Path
from typing import Any

from django.core.exceptions import ImproperlyConfigured


def getenv[TV, TD](
    key: str,
    default: TD = None,
    cast: type[TV] = str,
    required: bool = True,
) -> TV | TD:
    try:
        t = cast(os.getenv(key, default))
        if required and t is None:
            raise ValueError
        return t
    except ValueError:
        raise ImproperlyConfigured()


# Environ

# Security
DEBUG = getenv("DEBUG", False, bool)
SECRET_KEY = getenv("SECRET_KEY")
CORS_ALLOWED_ORIGINS = [getenv("CORS_ORIGIN", "http://localhost:3000")]
ALLOWED_HOSTS = ["localhost", "127.0.0.1"]  # TODO: Configure

# Databases
REDIS_CONNECTION = [(getenv("REDIS_HOST", "cache"), getenv("REDIS_PORT", 6379))]
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": getenv("POSTGRES_NAME"),
        "USER": getenv("POSTGRES_USER"),
        "PASSWORD": getenv("POSTGRES_PASSWORD"),
        "HOST": getenv("POSTGRES_HOST"),
        "PORT": getenv("POSTGRES_PORT", 5432),
    }
}

BASE_DIR = Path(__file__).resolve().parent.parent
APPEND_SLASH = True
REST_FRAMEWORK: dict[str, list[str]] = {
    "DEFAULT_AUTHENTICATION_CLASSES": ["customauth.wrappers.JWTCookiesAuthentication"],
    "DEFAULT_RENDERER_CLASSES": [
        "rest_framework.renderers.JSONRenderer",
        *(["rest_framework.renderers.BrowsableAPIRenderer"] if DEBUG else []),
    ],
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticated"],
}
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.pubsub.RedisPubSubChannelLayer",
        "CONFIG": {"hosts": [REDIS_CONNECTION]},
    }
}
SIMPLE_JWT = {
    "AUTH_HEADER_TYPES": ("JWT",),
    "AUTH_COOKIE": getenv("AUTH_COOKIE", "access_token"),
    "AUTH_COOKIE_DOMAIN": getenv("AUTH_COOKIE_DOMAIN", required=False),
    "AUTH_COOKIE_SECURE": DEBUG,
    "AUTH_COOKIE_HTTP_ONLY": True,
    "AUTH_COOKIE_PATH": "/",
    "AUTH_COOKIE_SAMESITE": "Lax",
}

ASGI_APPLICATION = "backend.asgi.application"
INSTALLED_APPS = [
    "channels",
    "rest_framework",
    "corsheaders",
    "djoser",
    "daphne",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "notifications",
    "invalidation",
    "customauth",
]
STATIC_ROOT = "./static"
STATIC_URL = "static/"
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
]
CORS_ALLOW_CREDENTIALS = True
ROOT_URLCONF = "backend.urls"
TEMPLATES: list[dict[Any, Any]] = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


DJOSER = {
    "LOGIN_FIELD": "email",
    "USER_CREATE_PASSWORD_RETYPE": True,
}
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

WSGI_APPLICATION = "backend.wsgi.application"

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
