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

## Why the checkout alone does not start

Running `encore run` straight from the repo fails: `encore.app` carries Encore's
own example app id (`shms-mn72`), so the CLI tries to fetch that app's
development secrets from Encore Cloud and aborts because this workspace is not
logged in:

```
encore: Fetching application secrets failed: fetch secrets for shms-mn72: ... not logged in: run 'encore auth login' first
encore: Creating PostgreSQL database cluster canceled
```

The process exits, the container restart-loops, and nothing is served on port
3000. Both sandbox-specific pieces below exist to get past that.

## Non-obvious things

* **Encore provisions its own PostgreSQL.** `encore run` starts an
  `encoredotdev/postgres` container on the host Docker daemon and connects to it
  on `127.0.0.1:<published port>`. That is why the `app` service mounts
  `/var/run/docker.sock` and uses `network_mode: host` (the Docker client is in
  the image; the daemon is not). Each service gets its own database
  (`user`, `billing`, `product`) inside that one cluster, and migrations run
  automatically on startup. Data lives in a Docker volume owned by Encore — do
  not delete it.

* **The sandbox mounts an unlinked `encore.app`.** The repo's `encore.app` has
  the app id described above, so the compose file mounts `.base44/encore.app`
  (no id) over it. In the sandbox the app therefore runs unlinked and
  local-only; deploying to Encore Cloud still uses the repo's `encore.app` and
  needs an account with access to that app.

* **`encore.dev` is pinned to `^1.58.6`** (upstream has `^1.37.1`) to match the
  CLI version installed by `.base44/Dockerfile`. The CLI keeps the npm
  dependency range in sync with its own version and rewrites `package.json`
  otherwise, which dirties the checkout on every boot.

* **Dependencies are installed into a named volume** (`encore-node-modules`) on
  startup with `npm install --no-package-lock`, so installs never write into the
  checkout. The CLI also runs its own install when that volume is first
  populated and can leave an untracked `package-lock.json` in the checkout;
  npm ignores it because of `--no-package-lock`, so it is safe to delete. After
  changing `package.json`, restart the service so the install reruns.

* **Port 3000 is the API itself**, not a proxy: the service runs
  `encore run --watch --listen 0.0.0.0:3000`. The landing page therefore prints
  its curl examples against `http://0.0.0.0:3000`; replace that with the
  sandbox's public 3000 URL.

* **`POST /users` is not idempotent on this branch** — `users.email` is UNIQUE,
  so signing up twice with the same address returns a 500. Use a fresh address
  for each run of the verification flow below.

* **Auth is a placeholder**: authenticated endpoints read the user id from the
  `?auth_user=<user_id>` query parameter (the `auth` service's gateway). A user
  created through `POST /users` gets a free subscription auto-provisioned by the
  billing service via Pub/Sub, so `/billing` returns data a moment later.

* `BASE44_PREVIEW_MODE` is passed through to the service; no application code
  currently reads it. `--watch` gives live reload of source edits — editing a
  file logs `Changes detected, recompiling...` and the served response updates;
  the Postgres cluster and its data survive those reloads.

## The portal UI (`GET /`)

`portal/` serves the School Admin Portal, a mobile-first UI built from plain
HTML/CSS/vanilla JS: `theme.ts` (design tokens + styles), `icons.ts` (inline SVG
set), `shell.ts` (status bar, drawer, tab bar), `screens/*.ts` (one file per
screen) and `client.ts` (routing and interactions), assembled into a single
document by `portal/portal.ts`. It is the app root now; the API landing page
that used to be there moved to `GET /docs`.

* Screens are switched with hash routes — `#/dashboard`, `#/students`,
  `#/reports`, `#/attendance`, `#/fees` — driven by the bottom tab bar, the
  drawer and the quick actions.
* All portal content is mock data taken from the design reference: the backend
  has no students, attendance or fees endpoints, so no screen reads the
  database. Actions the design does not define (Add Student, Logout, report
  categories, …) show a short toast instead of navigating.
* Check it in the preview at 360px (the target viewport) and at desktop width,
  where the UI is centred in a phone-sized frame.

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

`GET /` returns the HTML landing page that documents these endpoints — that page
is what the preview shows.

Tests: `docker compose -f docker-compose.base44.yml exec app npm test`
(vitest; passes with no test files in the repo).
