# Running this app in the Base44 sandbox

Encore.ts app. Everything (API server, Pub/Sub, the local database cluster) is
started by one command: `encore run`. There is no separate compose file or
migration step in the repo, and no external service credentials are required.

## Start / stop

```bash
docker compose -f docker-compose.base44.yml up -d --build
docker compose -f docker-compose.base44.yml logs -f app
docker compose -f docker-compose.base44.yml down
```

The API is the preview entry point (host port 3000). Encore also exposes a local
development dashboard (`http://<sandbox>:9400/<app-id>`) and an MCP endpoint on
9900; neither is needed to use the app.

## Non-obvious things

* **Encore provisions its own PostgreSQL.** `encore run` starts an
  `encoredotdev/postgres` container on the host Docker daemon and connects to it
  on `127.0.0.1:<published port>`. That is why the `app` service mounts
  `/var/run/docker.sock` and uses `network_mode: host` (the Docker client is in
  the image; the daemon is not). Each service gets its own database
  (`user`, `billing`, `product`) inside that one cluster, and migrations run
  automatically on startup. Data lives in a Docker volume owned by Encore — do
  not delete it.

* **The sandbox mounts an unlinked `encore.app`.** The repo's `encore.app`
  carries Encore's own example app id (`shms-mn72`). With an id present, the CLI
  fetches development secrets from Encore Cloud and aborts when you are not
  logged in (or lack access to that app), so the compose file mounts
  `.base44/encore.app` (no id) over it. In the sandbox the app therefore runs
  unlinked and local-only; deploying to Encore Cloud still uses the repo's
  `encore.app` and needs an account with access to that app.

* **`encore.dev` is pinned to `^1.58.6`** (was `^1.37.1`). The CLI keeps the
  npm dependency range in sync with its own version and rewrites `package.json`
  otherwise, which would dirty the checkout on every boot.

* **Dependencies are installed into a named volume** (`encore-node-modules`) on
  startup with `npm install --no-package-lock`, so installs never write into the
  checkout and no lockfile is created. After changing `package.json`, restart
  the service so the install reruns.

* **Port 3000 is the API itself**, not a proxy: the service runs
  `encore run --watch --listen 0.0.0.0:3000`. The landing page therefore prints
  its curl examples against `http://0.0.0.0:3000`; replace that with the
  sandbox's public 3000 URL.

* **`POST /users` is idempotent by email** — signing up twice with the same
  address returns the first user instead of a duplicate-key error. Handy when
  running the verification flow below repeatedly.

* **Auth is a placeholder**: authenticated endpoints read the user id from the
  `?auth_user=<user_id>` query parameter (the `auth` service's gateway). A user
  created through `POST /users` gets a free subscription auto-provisioned by the
  billing service via Pub/Sub, so `/billing` returns data a moment later.

* `BASE44_PREVIEW_MODE` is passed through to the service; no application code
  currently reads it. `--watch` gives live reload of source edits — the Postgres
  cluster and its data survive those reloads.

## Verify it works

```bash
BASE=http://localhost:3000
curl -s $BASE/projects                                   # {"projects":[]}
curl -s -X POST $BASE/users -H 'Content-Type: application/json' \
  -d '{"email":"me@example.com","name":"Me"}'            # returns the user id
curl -s "$BASE/billing?auth_user=<user_id>"              # plan: free
curl -s -X POST "$BASE/projects?auth_user=<user_id>" \
  -H 'Content-Type: application/json' \
  -d '{"name":"My Project","description":"demo"}'        # 200 with the project
```

Tests: `docker compose -f docker-compose.base44.yml exec app npm test`
(vitest; passes with no test files in the repo).
