## Installation
```npm install```

`.env.example` files are ready to use. 

---

## Run app
Set ```.env``` variables
Proceed to `.env` file and set variable as well.
Before running apps, please make sure that you set `.env`
```
docker run --name movies -p 8000:8050 -e APP_PORT=8050 your_super_account/movies
```

---

### Troubleshooting
If you have issues with ```npm install``` use ```npm install -force``` instead