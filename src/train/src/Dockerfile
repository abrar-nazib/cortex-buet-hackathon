FROM python:3.11.4-alpine

WORKDIR /usr/src/app

# Prevent Python from writing .pyc files
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN pip install --upgrade pip

COPY ./requirements.txt /usr/src/app/requirements.txt

RUN pip install -r /usr/src/app/requirements.txt


COPY . /usr/src/app/

RUN python /usr/src/app/manage.py migrate

RUN python /usr/src/app/populate_data.py

# Run the application on port 8000 , 0.0.0.0
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

EXPOSE 8000

# ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
