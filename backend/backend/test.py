import requests


def signup(username: str, password: str):
    print(
        requests.post(
            "http://localhost:8000/auth/users",
            headers={"Accept": "application/json", "Content-Type": "application/json"},
            data={"username": username, "password": password},
        ).json()
    )


def create_token(username: str, password: str):
    return requests.post(
        "http://localhost:8000/auth/jwt/create/",
        data={"username": username, "password": password},
    ).json()["access"]


# T = create_token("kirillzhosul", "ABRACADABRA")
T = create_token("test", "ASFIAS8FA8SC8ASV")


def get_me():
    return requests.get(
        "http://localhost:8000/auth/users/me/", cookies={"access_token": T}
    ).json()


def get_notifications():
    return requests.get(
        "http://localhost:8000/notifications", cookies={"access_token": T}
    ).json()


def create_notification():
    return requests.post(
        "http://localhost:8000/notifications/",
        data={"type": "INFO", "target": 3},
        cookies={"access_token": T},
    ).json()


def get_stats():
    return requests.get(
        "http://localhost:8000/notifications/stats/",
        cookies={"access_token": T},
    ).json()


# print(T)
# print(get_me())
# print(get_notifications())
print(get_stats())
