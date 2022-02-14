## Data
Scraped categories from https://www.counselling-directory.org.uk/adv-search.html

```javascript
const categories = [];
$("#search-filter-services option").each(function () {const that = $(this); categories.push(that.text());});
```

Most therapy websites use AJAX so I couldn't scrape from their API directly.


## Assumptions
Therapists works 9-5 to simplify slots. (Obviously it's better to have out-of-hours but it's more complex to seed)
Slots are bookable hourly.
Assume all 9-5 weekday slots are available. No holidays.

Seeder has therapists
The booking seeder books 20% of the available slots in the next 3 months

## Steps
Initially seed therapists and specialities
run book slots script a few times to randomly book slots
ability to book remaining slots


## Docker
MongoDB runs on port 27017. Mongo Express GUI runs on port 8081
The frontend runs on port 8080
The backend runs on port 3000


### Front-end
#### Development mode
```
nicole@Nicoles-Air beans-appts % docker compose exec frontend /bin/ash
/srv/app # npm run serve

> app@0.1.0 serve
> vue-cli-service serve
```

#### Building
```
nicole@Nicoles-Air beans-appts % docker compose exec frontend /bin/ash
/srv/app # npm run build

> app@0.1.0 build
> vue-cli-service build
⠸  Building for production...


 DONE  Build complete. The dist directory is ready to be deployed.
 INFO  Check out deployment instructions at https://cli.vuejs.org/guide/deployment.html
```

After it's done, copy the contents of `/frontend/dist` to `/backend/frontend` to host the front-end.

### Back-end
#### Unit tests
```
nicole@Nicoles-Air beans-appts % docker-compose exec backend /bin/ash
/srv/app # npm run test

> beans-appts@1.0.0 test
> jest
```

## External Mongo
```
username: nicole
password: 8fI25mj225wmmngG
address: mongodb+srv://cluster0.8wvuy.mongodb.net/beans-appts
```
IP limited to my machine and my server

## Security
API keys can be used for the website (limit the website API key to approved domains), and for therapists who want to integrate with their booking system.

OAuth can be used to handle registration and roles assigned to the users to limit their scope of actions. Clients can only book/amend their appointments. Therapists can only create appointment slots and edit their profile.

Therapists can use an API key and Zapier to sync their calendar availability and automatically create appointment slots. 