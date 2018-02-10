#!/bin/bash

export URL_ALIAS=${URL_ALIAS:-http://gradiant-dev-classroom.smarted.cloud:3059}
export STATIC_MEDIA_URL=${STATIC_MEDIA_URL:-http://gradiant-dev-classroom.smarted.cloud:3059}
export BACKEND_URL=${BACKEND_URL:-http://localhost:5000}
export LAE_URL=${LAE_URL:-http://localhost:3000}
export CMS_URL=${CMS_URL:-http://vm33.netexlearning.cloud/mvc/rest}
export PRESENCE_URL=${PRESENCE_URL:-http://vm33.netexlearning.cloud/presence}

export RABBIT_URL=${RABBIT_URL:-http://193.146.211.51:3136/stomp}
export GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID:-210904989090-4e4nk65s6b8foru2g7ln0q5qg815lvd5.apps.googleusercontent.com};
export GOOGLE_AUTHORIZATION_URL=${GOOGLE_AUTHORIZATION_URL:-https://accounts.google.com/o/oauth2/v2/auth};
export GOOGLE_VALIDATE_TOKEN_URL=${GOOGLE_VALIDATE_TOKEN_URL:-https://www.googleapis.com/oauth2/v3/tokeninfo};
export GOOGLE_PROFILE_URL=${GOOGLE_PROFILE_URL:-https://www.googleapis.com/userinfo/v2/me};
export GOOGLE_REDIRECT_URI=${GOOGLE_REDIRECT_URI:-http://localhost/oauth2callback};

export SOCKET_HEARTBEAT_OUTGOING=${SOCKET_HEARTBEAT_OUTGOING:-5000};
export SOCKET_HEARTBEAT_INCOMING=${SOCKET_HEARTBEAT_INCOMING:-2000};
export SOCKET_RECONNECT_ATTEMPTS=${SOCKET_RECONNECT_ATTEMPTS:-3};
export SOCKET_RECONNECT_DELAY=${SOCKET_RECONNECT_DELAY:-5000};

echo "window.Config = {
  URL_ALIAS: \"$URL_ALIAS\",
  BACKEND_URL: \"$BACKEND_URL\",
  CMS_URL: \"$CMS_URL\",
  PRESENCE_URL: \"$PRESENCE_URL\",
  LAE_URL: \"$LAE_URL\",
  STATIC_MEDIA_URL: \"$STATIC_MEDIA_URL\",
  GOOGLE_CLIENT_ID: \"$GOOGLE_CLIENT_ID\",
  GOOGLE_AUTHORIZATION_URL: \"$GOOGLE_AUTHORIZATION_URL\",
  GOOGLE_VALIDATE_TOKEN_URL: \"$GOOGLE_VALIDATE_TOKEN_URL\",
  GOOGLE_PROFILE_URL: \"$GOOGLE_PROFILE_URL\",
  GOOGLE_REDIRECT_URI: \"$GOOGLE_REDIRECT_URI\",
  RABBIT_CONFIG: {
      connection: {
        server: \"$RABBIT_URL\",
        authentication: {
          user: 'token',
          pass: ''
        },
        authenticationToken: '',
        reconnection: {
          delay: \"$SOCKET_RECONNECT_DELAY\",
          maxAttempts:  \"$SOCKET_RECONNECT_ATTEMPTS\",
        },
        heartbeat: {
          outgoing: \"$SOCKET_HEARTBEAT_OUTGOING\",
          incoming: \"$SOCKET_HEARTBEAT_INCOMING\"
        }
      },
      userInfo: {
        role: '',
        userId: '',
        platform: '',
        tenantId: '',
        contentId: '',
        ltiContextId: ''
      }
  }
};" > /app/static/js/config.js

chmod 775 /app/static/js/config.js
cat /app/static/js/config.js

exec "$@"
