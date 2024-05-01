# syntax=docker/dockerfile:1
FROM python:3.10.7-alpine

# Disable python buffering and bytecode *.pyc compiling. 
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Project directory on the container.
WORKDIR /srv

# Install requirements.
COPY pyproject.tom /srv/
RUN pip install --upgrade poetry
RUN poetry install

# Copy whole project to the container.
COPY . /srv/

# Run project after building.
CMD ["python", "manage.py", "runserver", "0.0.0.0:80"]