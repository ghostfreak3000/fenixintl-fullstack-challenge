FROM python:3.6-alpine

ADD . /code

ENV FLASK_ENV development
ENV FLASK_APP /code/api/api_server.py

WORKDIR /code

RUN apk add --no-cache --virtual .build-deps gcc musl-dev libffi libffi-dev openssl openssl-dev
RUN pip install -r requirements.txt
RUN apk del .build-deps gcc musl-dev libffi libffi-dev openssl openssl-dev

CMD ["flask", "run", "-h", "0.0.0.0"]