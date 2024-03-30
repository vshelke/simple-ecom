format:
	isort --skip migrations api/
	black --line-length 100 --exclude migrations api/
	flake8 api/ --statistics

cache_clean:
	find . | grep -E "(/__pycache__$$|\.pyc$$|\.pyo$$)" | xargs rm -rf

publish:
	docker build -f api.dockerfile -t ghcr.io/vshelke/simplyparse/api:latest .
	docker image push ghcr.io/vshelke/simplyparse/api:latest
