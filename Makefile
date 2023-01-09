# ========================
# VARIABLES
# ========================

DEV_ENV_FILE = .env.dev
TEST_ENV_FILE = .env.test
CONTAINER_APP_NAME = auth-api-mongodb

# ========================
# REUSABLE COMMANDS
# ========================

DOCKER_COMPOSE_DEV = docker-compose --env-file $(DEV_ENV_FILE)
DOCKER_COMPOSE_TEST = docker-compose --env-file $(TEST_ENV_FILE)

# ========================
# MAKEFILE COMMANDS
# ========================

build:
	$(DOCKER_COMPOSE_DEV) up -d
#	docker exec -it $(CONTAINER_APP_NAME) bash

build-test:
	$(DOCKER_COMPOSE_TEST) up -d

stop:
	$(DOCKER_COMPOSE_DEV) stop

down:
	$(DOCKER_COMPOSE_DEV) down
