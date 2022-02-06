FROM node:16-alpine

MAINTAINER Nicole Neo <nicole@neo.my>

EXPOSE 8000
ENV FLASK_RUN_PORT=8000
ENV FLASK_RUN_HOST=0.0.0.0


RUN mkdir /app
WORKDIR /app

COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY . /app
CMD ["python", "-m", "flask", "run"]