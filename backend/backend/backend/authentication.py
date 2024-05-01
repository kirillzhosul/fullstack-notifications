from django.conf import settings
from rest_framework.request import Request  # type: ignore
from rest_framework_simplejwt.authentication import JWTAuthentication


class JWTCookiesAuthentication(JWTAuthentication):
    def authenticate(self, request: Request):  # type: ignore
        header = self.get_header(request)

        if header is None:  # type: ignore
            raw_token = request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE"]) or None  # type: ignore
        else:
            raw_token = self.get_raw_token(header)
        if raw_token is None:
            return None

        validated_token = self.get_validated_token(raw_token)
        return self.get_user(validated_token), validated_token  # type: ignore
