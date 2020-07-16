FROM python:3.7

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

#COPY ./ ./

RUN pip install -r requirements.txt

#COPY ./ ./
#COPY .next /app/.next

ENTRYPOINT ["python"]

EXPOSE 5000

CMD ["-m", "flask", "run", "--host=0.0.0.0", "--without-threads"]



# docker build -t frontend .
# docker run -itd -p 3000:3000 frontend

# Or
# docker-compose build
# docker-compose up

