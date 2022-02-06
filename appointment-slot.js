"use strict";
const faker = require("@faker-js/faker");
const moment = require("moment");
const fs = require("fs");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

const specialities = () => {
  const specialities = [];
  const specialitiesFile = __dirname + "/therapy_categories.txt";
  fs.readFile(specialitiesFile, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const lines = data.split("\n");
    let parentCategory = "";
    let prevSpeciality = null;
    for (let lineNo in lines) {
      let speciality = lines[lineNo].trim();
      let isChild = false;
      if (speciality.startsWith("-")) {
        speciality =  speciality.replace("-", "").trim();
        parentCategory = prevSpeciality;
        isChild = true;
      } else {
        prevSpeciality = speciality;
      }
      const specialityObj = {
        name: speciality,
      };
      if (isChild) {
        specialityObj.parent = parentCategory;
      }
      specialities.push(specialityObj);
    }
  });
  return specialities;
};

module.exports = {
  generateDates: async (qIds) => {
    console.log("generate dates");
    const today = moment();
    const threeMonths = today.add("3", "months");
    const futureDates = faker.date.betweens(today, threeMonths, 100);
    console.log(futureDates);
  },
};
