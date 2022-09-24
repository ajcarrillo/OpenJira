# Next.js OpenJira App

## Start database with docker

```
docker-compose up -d
```

* `-d` flag means run __detached__


## MongoDB local URL:
```
mongodb://localhost:27017/entriesdb
```

## Environment variables configuration
Rename file `.env.example` to `.env` then add your own values

## Populate the database with dummy data
Run in postman:
```
GET http://localhost:3000/api/seed
```