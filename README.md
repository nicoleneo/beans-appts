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
```
docker run -it -v `pwd`:/srv/app -p 3000:3000 -w /srv/app node:16-alpine /bin/ash 
```
