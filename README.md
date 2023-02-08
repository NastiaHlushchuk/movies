## Run app from IDE

`.env.example` file is ready to use

Create `.env` file in project's root directory

Proceed to `.env` file and set variables

In your terminal run:
`npm install`

To run app use command:
`npm start`

To build docker container from project directory use the commands below:
--
`docker build -t your_username/movies`
`docker run --name movies -p 8000:8050 -e APP_PORT=8050 your_username/movies`
---

## Run app from DockerHub

Go to ` https://hub.docker.com/repository/docker/anastasiiahl/movies/general`

In your terminal run:
`docker pull anastasiiahl/movies`

To run app use command:
`docker run --name movies -p 8000:8050 -e APP_PORT=8050 anastasiiahl/movies`
