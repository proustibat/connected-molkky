#!/usr/bin/env bash
[[ -f .env ]] && source .env
ssh -R 80:localhost:$BS_PORT serveo.net