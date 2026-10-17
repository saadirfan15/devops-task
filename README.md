# devops-task

A simple static landing page ("Skyline"), containerized with Docker + Nginx.

## Project structure

```
src/
  index.html      # front page
  css/style.css   # styles (light/dark theme)
  js/main.js      # interactions
Dockerfile        # nginx image serving src/
nginx.conf        # nginx server config
docker-compose.yml
```

## Run locally

Open `src/index.html` directly in a browser, or:

```bash
docker compose up --build
```

Then visit http://localhost:8080
