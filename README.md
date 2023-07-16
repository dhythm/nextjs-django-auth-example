# Next.js + Django Authentication Example

A bare-bones example of a Next.js App backed by a Django API.
Includes the following:

- Frontend
  - Next.js
  - Tailwind
- Backend
  - Django
  - Django REST Framework
  - JWT Authentication

## Frontend

### Installation

```sh
npx create-next-app@latest

✔ What is your project named? … frontend
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use `src/` directory? … No
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to customize the default import alias? … Yes
✔ What import alias would you like configured? … @/*
```

#### Getting Started

```sh
cd frontend
npm install
npm run dev
```

### Setting up

#### Authentication

```sh
npm install next-auth
```

```sh
openssl rand -base64 32
# add SECRET to .env
```

## Backend

### Installation

```sh
mkdir backend
cd backend
```

```sh
poetry init

Package name [backend]:
Version [0.1.0]:
Description []:
Author [dhythm <yuta.okada.20@gmail.com>, n to skip]:
License []:
Compatible Python versions [^3.9]:
Would you like to define your main dependencies interactively? (yes/no) [yes]
Package to add or search for (leave blank to skip):
Would you like to define your development dependencies interactively? (yes/no) [yes]
Package to add or search for (leave blank to skip):

[tool.poetry]
name = "backend"
version = "0.1.0"
description = ""
authors = ["dhythm <yuta.okada.20@gmail.com>"]
readme = "README.md"

[tool.poetry.dependencies]
python = "^3.9"


[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"

Do you confirm generation? (yes/no) [yes]
```

```sh
poetry add Django
poetry add djangorestframework
```

```sh
poetry run django-admin startproject jwtauth .
poetry run python manage.py runserver
```

### Set up authentication.

Create a new app.

```sh
cd jwtauth
poetry run python manage.py startapp api
```

Add `rest_framework` and `api` to `jwtquth/settings.py`.

```python
INSTALLED_APPS = [
  ...,
  'rest_framework',
  'api'
]
```

Create a model for sign-in in `api/models.py`.

```sh
poetry run python manage.py makemigrations
poetry run python manage.py migrate
```

```sh
poetry add pyjwt
```

```sh
poetry run python manage.py loaddata fixtures/users.json
```
