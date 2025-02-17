# Build with pnpm
FROM docker.io/gplane/pnpm:node21-alpine AS builder

ARG NUXT_PUBLIC_GOOGLE_FONTS_KEY=""
ENV NUXT_PUBLIC_GOOGLE_FONTS_KEY="$NUXT_PUBLIC_GOOGLE_FONTS_KEY"

WORKDIR /ohmycv

COPY . .

# builds to /ohmycv/site/.output/public
RUN pnpm install --frozen-lockfile && pnpm release

# Serve via nginx
FROM docker.io/nginx:alpine

COPY --from=builder /ohmycv/site/.output/public /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
