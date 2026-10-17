# Development image for the Encore.ts app used by docker-compose.base44.yml.
#
# It only carries the tooling the dev server needs: the Encore CLI (which also
# bundles the TypeScript parser/bundler used by `encore run`) and a Docker
# client, because Encore provisions its local PostgreSQL cluster by talking to
# the host Docker daemon. The application source is bind-mounted at runtime,
# so edits never require rebuilding this image.
FROM node:22-bookworm

ARG DOCKER_VERSION=27.3.1
ARG ENCORE_VERSION=1.58.6

RUN apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates curl git \
 && rm -rf /var/lib/apt/lists/*

# Docker client only (no daemon): Encore runs its local PostgreSQL cluster as a
# container on the host daemon reached through the mounted /var/run/docker.sock.
RUN curl -fsSL "https://download.docker.com/linux/static/stable/x86_64/docker-${DOCKER_VERSION}.tgz" \
      | tar -xz --strip-components=1 -C /usr/local/bin docker/docker \
 && docker --version

# Encore CLI, pinned to the version the app's encore.dev dependency resolves to.
RUN curl -fsSL https://encore.dev/install.sh -o /tmp/encore-install.sh \
 && ENCORE_INSTALL=/usr/local sh /tmp/encore-install.sh "${ENCORE_VERSION}" \
 && rm /tmp/encore-install.sh \
 && encore version

WORKDIR /app
