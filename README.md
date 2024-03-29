## Run app from IDE

In your terminal run:
`npm install`

Create `.env` file in project's root directory

Proceed to `.env` file and set variables as in `.env.example` file

To run app use command:
`npm start`

You also can build and run docker container from project directory. Use the commands below:

`docker build -t your_username/movies`

`docker run --name movies -p 8000:8050 -e APP_PORT=8050 your_username/movies`

---

## Run app from DockerHub

URL for DockerHub image: `https://hub.docker.com/repository/docker/anastasiiahl/movies/general`

In your terminal run:
`docker pull anastasiiahl/movies`

To run app use command:
`docker run --name movies -p 8000:8050 -e APP_PORT=8050 anastasiiahl/movies`
