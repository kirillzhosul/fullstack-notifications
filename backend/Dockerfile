# syntax=docker/dockerfile:1
FROM python:3.12-alpine

# Disable python buffering and bytecode *.pyc compiling. 
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Project directory on the container.
WORKDIR /srv

# Install requirements.
COPY pyproject.toml /srv/
RUN pip install --upgrade poetry
RUN poetry export -f requirements.txt --output requirements.txt
RUN pip install -r requirements.txt

# Copy whole project to the container.
COPY . /srv/
WORKDIR /srv/backend

# Run project after building.
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]