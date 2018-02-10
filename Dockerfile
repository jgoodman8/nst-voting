FROM socialengine/nginx-spa

MAINTAINER Gradiant "elearningteam@gradiant.org"

USER root

RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*

ARG git_commit="Unknown"
ARG build_date="Unknown"
ARG version="Unknown"

LABEL org.label-schema.vcs-ref=$git_commit \
      org.label-schema.build-date=$build_date \
      org.label-schema.version=$version

COPY ./build /app

EXPOSE 3000

RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

#COPY ./scripts/docker/docker-entrypoint.sh /app

#HEALTHCHECK --interval=5s --timeout=2s \
#    CMD curl -fsS $BACKEND_URL/api/v1/status
    # -f => Fail on http error codes
    # -s => Do not output anything
    # -S => Show errors with the -s option

# Make the entrypoint script the actual entrypoint of the Dockerfile
#ENTRYPOINT ["/app/docker-entrypoint.sh"]

# Run a CMD command, this command is executed by the entrypoint
# It can also be overrided, i.e `docker run -it netexlearning/smart-classroom-ui bash`
CMD ["nginx"]
