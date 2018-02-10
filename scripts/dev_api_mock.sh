cp src/config/config.local.mock.js src/config/config.js
(sleep 2s ; cp src/config/config.local.js src/config/config.js) &
yarn dev | yarn api:mock
