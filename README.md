## Data
Scraped therapy specialism categories from https://www.counselling-directory.org.uk/adv-search.html

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


## Docker
MongoDB runs on port 27017. Mongo Express GUI runs on port 8081
The front-end runs on port 8080
The back-end runs on port 3000


## Front-end
Vue.js with routing. The skeleton code was reused from my personal projects/other interview homework.
### Development mode
```
nicole@Nicoles-Air beans-appts % docker compose exec frontend /bin/ash
/srv/app # npm run serve

> app@0.1.0 serve
> vue-cli-service serve
 DONE  Compiled successfully in 145525ms                              11:49:14 PM


  App running at:
  - Local:   http://localhost:8080/ 
  - Network: http://172.20.0.5:8080/

  Note that the development build is not optimized.
  To create a production build, run npm run build.
```

### Building
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

## Back-end
Express.js with Mongoose driver for MongoDB. Connects to a Docker MongoDB locally. In production, connects to a free MongoDB cloud instance.
### Running
http://localhost:3000/graphql GraphQL explorer
http://localhost:3000/frontend points to the built front-end
```
nicole@Nicoles-Air beans-appts % docker-compose exec backend /bin/ash
/srv/app # node index.js 
GraphQL server running on port 3000!
MongoDB connected...
```

### Unit tests
```
nicole@Nicoles-Air beans-appts % docker-compose exec backend /bin/ash
/srv/app # npm run test

> beans-appts@1.0.0 test
> jest
```

## Testing
The front-end was built quite early on. Therefore it could be used to book appointments and sense check.

Unit tests were also written after a lot of pain with MongoDB mocks.
### Test data
Initially seed therapists and specialities
run book slots script a few times to randomly book slots
ability to book remaining slots


## External MongoDB
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

## Live demo
(availability not guaranteed as it's a shared server with my other projects)
https://beans-appts.neo.my/frontend
https://beans-appts.neo.my/graphql