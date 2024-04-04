FROM node:lts-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
COPY ./apps/api/.env /app/apps/api/.env
WORKDIR /app

# FROM base AS prod-deps
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile
#
# FROM base AS build
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# RUN pnpm run build

FROM base
RUN pnpm install --frozen-lockfile
RUN pnpm run db:generate
# RUN pnpm run db:push
EXPOSE 3000 3001
CMD [ "pnpm", "dev" ]
