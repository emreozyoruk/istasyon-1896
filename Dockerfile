# İstasyon 1896 — static site on nginx:alpine
# Build: docker build -t istasyon-1896 .
# Run:   docker run -d -p 3000:3000 --name istasyon istasyon-1896

FROM nginx:1.27-alpine

# minimal labels
LABEL org.opencontainers.image.title="istasyon-1896" \
      org.opencontainers.image.source="https://github.com/emreozyoruk/istasyon-1896" \
      org.opencontainers.image.licenses="MIT"

# strip default nginx config + html, drop ours in
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

# copy only the static assets the site needs
COPY index.html styles.css script.js favicon.svg /usr/share/nginx/html/
COPY media/ /usr/share/nginx/html/media/

# nginx:alpine already runs as nginx user inside; just expose 3000
EXPOSE 3000

# tiny container healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:3000/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
