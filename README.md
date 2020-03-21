# .NET Core API for the Angular Tour of Heroes tutorial
Also included - a Docker MSSQL database.

This repo should have everything you need to launch a local Angular App and interact with the docker database via the .NET Core API.

To start up the app:

1. Start the MSSQL Docker database. [Medium article for more info.](https://towardsdatascience.com/build-a-mssql-docker-container-800166ecca21)
From the Docker Database directory, run:
```bash
# Build the database
docker build -t mssql:dev .
# Start the database
docker run \
-e 'ACCEPT_EULA=Y' \
-e 'SA_PASSWORD=Password1!' \
-e 'MSSQL_PID=Express' \
--name sqlserver \
-p 1433:1433 \
-d mssql:dev
```
2. Start the .NET Core API. [Medium Article for more info](https://towardsdatascience.com/net-core-api-dive-into-c-27dcd4170066)
From the Heroes.API directory, run:
```bash
dotnet run
```
3. Start the Angular app. 
From the Angular-Tour-of-Heroes directory, run:
```bash
ng serve --open
```

