# Bobyard -- David Myat

### How I would continue if I had more time

- Add more styling, currently its functional but not styled well
- sort comment by time so newest is first

# Setup Instructions

## 1 Clone repo and install

Clone repo

`git clone https://github.com/Amyat103/bobyard-david-myat.git`

CD into folder and start Python enviroment

`cd bobyard-david-myat`

`python3 -m venv venv`

`source venv/bin/activate`

`pip install -r requirements.txt`

## 2 Setup postgres

Create postgres database
`psql postgres`

`CREATE DATABASE bobyard;`

quit psql terminal

`\q`

## 3 create .env in project root

in /bobyard-david-myat create `.env` file

add these 2 lines into .env

```
DB_NAME=bobyard
DB_USER=(your postgres username, see right after this if not sure about username)
```

NOTE: to find postgres user do:

```
psql postgres
SELECT current_user;
\q
```

## 4 run servers and migrate db

run backend Django

`python manage.py makemigrations`

`python manage.py migrate`

`python manage.py runserver`

Backend is running!

run frontend React

First open a new terminal window

Run these:

`cd frontend`

`npm install`

`npm run dev`

## 5 open app

frontend should be at http://localhost:5173
open in browser and try out the app!
