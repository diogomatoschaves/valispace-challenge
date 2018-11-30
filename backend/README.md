### Install Backend dependencies

In order to install the server dependencies as per `requirements.txt`, run the following commands on your terminal:

`cd backend` <br>
`$ pipenv install`

Once the virtual env is created, run the following command whenever you want to activate the virtual env.

 `$ pipenv shell`


### Create a new database

In order to create a new postgreSQL database, run on your terminal:

`$ psql`
`# create database <DATABASE_NAME>;`

replacing <DATABASE_NAME> with your custom db name.

Exit psql window and run:

`$ python manage.py migrate`

Which will create the database schema.


### Change database url

Go to settings.py and change the parameters inside the <>:

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': <DATABASE_NAME>,
        'USER': <YOUR_USERNAME>,
        'PASSWORD': <YOUR_PASSWORD>,
        'HOST': 'localhost',
        'PORT': '5432',
        'CONN_MAX_AGE': 500
    }
}
```



### Running server

On a terminal window, start the development server with:

`$ python manage.py runserver`

The app is now listening to requests from the client.