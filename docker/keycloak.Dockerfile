FROM quay.io/keycloak/keycloak:24.0.3

#https://www.keycloak.org/server/all-config?f=config


COPY ./docker/realm-export.json /opt/keycloak/data/import/realm-export.json

RUN /opt/keycloak/bin/kc.sh build

ENV KC_HTTP_ENABLED=true
ENV DB_VENDOR=${DB_VENDOR:-POSTGRES}
ENV DB_DATABASE=${DB_DATABASE:-keycloak}
ENV KC_DB_USERNAME=${KC_DB_USERNAME:-mcadmin}
ENV KC_DB_PASSWORD=${KC_DB_PASSWORD:-mcadmin}
ENV JDBC_PARAMS=${JDBC_PARAMS:-useSSL=false}
ENV KC_HOSTNAME_STRICT=false
ENV KC_HOSTNAME_STRICT_HTTPS=false
ENV KC_HTTPS_ENABLED=false
ENV KC_HTTP_ENABLED=true
ENV KC_LOG=console
ENV KC_LOG_CONSOLE_COLOR=true
WORKDIR /opt/keycloak
EXPOSE 8080

ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start", "--optimized","--import-realm"]