FROM python:3.11


WORKDIR /app

COPY ./ /app/

RUN pip install flask
RUN pip install flask_cors

EXPOSE 50001
CMD [ "python","main.py" ]