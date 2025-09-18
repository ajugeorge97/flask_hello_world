FROM python:3.12-alpine

RUN apk add --no-cache bash curl


WORKDIR /app

COPY . /app


RUN pip install flask


EXPOSE 5000
CMD ["python", "main.py"]