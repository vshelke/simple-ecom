FROM python:3.11-slim
LABEL maintainer="Vaibhav Shelke <vaibhavshelke017@gmail.com>"

ENV PYTHONUNBUFFERED 1
ENV HNSWLIB_NO_NATIVE 1
ENV DEBUG 0
WORKDIR /code
RUN apt-get update && apt-get install -y build-essential
RUN pip install pipenv
COPY ./api/Pipfile ./api/Pipfile.lock /code/
RUN pipenv install --system --deploy --ignore-pipfile
ADD api/ /code
RUN python3 manage.py collectstatic --no-input

CMD ["./run.sh"]
