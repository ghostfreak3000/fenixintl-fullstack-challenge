FROM python:3.6-alpine
ADD . /code
WORKDIR /code
RUN apk add --no-cache --virtual .build-deps gcc musl-dev
RUN pip install -r requirements.txt
RUN apk del .build-deps gcc musl-dev
CMD ["python", "api/api_server.py"]