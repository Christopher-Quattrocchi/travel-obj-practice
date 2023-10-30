//UI Logic
window.addEventListener("load", function () {
  document.querySelector("form#new-location").addEventListener("submit", handleSubmission);
});

//Made global for now so that it doesn't get wiped each time someone clicks submit
let travelData = new TravelObject()
let divCounter = 0;

function handleSubmission(event) {
  event.preventDefault();

  //Get values from form:
  const city = document.querySelector("input#new-city").value;
  const country = document.querySelector("input#new-country").value;
  const landmark = document.querySelector("input#new-landmark").value;
  const year = document.querySelector("input#new-year").value;
  const note = document.querySelector("input#new-notes").value;

  //grab IDs
  const locationId = travelData.addLocation(country, city);
  const landmarkId = travelData.addLandmarks(landmark);
  const yearId = travelData.addYear(year);
  const noteId = travelData.addNotes(note);

  //verify 
  console.log("Travel Data: ", travelData);
  console.log("New Location ID: ", locationId);
  console.log("New Landmark ID: ", landmarkId);
  console.log("New Year ID: ", yearId);
  console.log("New Note ID: ", noteId);

  //call output function
  showOutput(travelData, locationId, landmarkId, yearId, noteId);
}

function showOutput(travelData, locationId, landmarkId, yearId, noteId) {
 const location = travelData.locations[locationId];
 const landmark = travelData.landmarks[landmarkId];
 const year = travelData.timeOfYear[yearId];
 const notes = travelData.notes[noteId];
  
 let divEle = document.createElement("div");
 divEle.id = "div" + divCounter;
 divCounter++;

 let pEle1 = document.createElement("p");
 pEle1.id = "city";
 pEle1.textContent = location.city;
 pEle1.addEventListener("click", function() {
  //Toggle visibility
  divEle.querySelectorAll('p:not(#city)').forEach(p=>p.classList.toggle("hidden"));
 });

 let pEle2 = document.createElement("p");
 pEle2.id = "country";
 pEle2.setAttribute("class", "hidden");
 pEle2.textContent = location.country;

 let pEle3 = document.createElement("p");
 pEle3.id = "landmark";
 pEle3.setAttribute("class", "hidden");
 pEle3.textContent = landmark.landmark;

 let pEle4 = document.createElement("p");
 pEle4.id = "year";
 pEle4.setAttribute("class", "hidden");
 pEle4.textContent = year.year;

 let pEle5 = document.createElement("p");
 pEle5.id = "note";
 pEle5.setAttribute("class", "hidden");
 pEle5.textContent = notes.note;

 divEle.append(pEle1, pEle2, pEle3, pEle4, pEle5);
 document.body.append(divEle);  
}

//REMOVER TEST
// function removeDiv(divId) {
//   const divToRemove = document.getElementById(divId);
//   if (divToRemove) {
//     divToRemove.remove();
//   } else {
//     console.log("You broke it");
//   }
// }
  
//Business Logic
function TravelObject() {
  this.locations = {
    country: {},
    city: {}
  };
  this.landmarks = {};
  this.timeOfYear = {};
  this.notes = {};
  this.currentId = 0;
}

TravelObject.prototype.findLocation = function (id) {
  if (this.locations[id] !== undefined) {
    console.log(this.locations[id]);
  }
  console.log("FAIL");
}

TravelObject.prototype.findLandmark = function (id) {
  if (this.landmarks[id] !== undefined) {
    console.log(this.landmarks[id]);
  }
  console.log("FAIL");
}

TravelObject.prototype.findYear = function (id) {
  if (this.timeOfYear[id] !== undefined) {
    console.log(this.timeOfYear[id]);
  }
  console.log("FAIL");
}

TravelObject.prototype.findNote = function (id) {
  if (this.notes[id] !== undefined) {
    console.log(this.notes[id]);
  }
  console.log("FAIL");
}

TravelObject.prototype.deleteLocation = function (id) {
  // show whether the location was found and deleted
  let deleted = false;

  // Check and delete the location from country obj
  for (let country in this.locations.country) {
    if (this.locations.country[country].id === id) {
      delete this.locations.country[country];
      deleted = true;
      break;  // Exit the loop
    }
  }

  // Check and delete the location from city obj
  for (let city in this.locations.city) {
    if (this.locations.city[city].id === id) {
      delete this.locations.city[city];
      deleted = true;
      break;  // Exit the loop
    }
  }
  return deleted;
};

TravelObject.prototype.deleteNotes = function (id) {
  if (this.notes[id] === undefined) {
  }
  delete this.notes[id];
}

TravelObject.prototype.deleteYear = function (id) {
  if (this.timeOfYear[id] === undefined) {
  }
  delete this.timeOfYear[id];
}

TravelObject.prototype.deleteLandmark = function (id) {
  if (this.landmarks[id] === undefined) {
  }
  delete this.landmarks[id];
}

TravelObject.prototype.addLocation = function (country, city) {
  let location = new Location(country, city);
  location.id = this.assignId();
  this.locations[location.id] = location;
  return location.id;
};

TravelObject.prototype.addLandmarks = function (landmarkName) {
  let newLandmark = new Landmark(landmarkName);
  newLandmark.id = this.assignId();
  this.landmarks[newLandmark.id] = newLandmark;
  return newLandmark.id;
};

TravelObject.prototype.addYear = function (timeOfYear) {
  let newYear = new Year(timeOfYear);
  newYear.id = this.assignId();
  this.timeOfYear[newYear.id] = newYear;
  return newYear.id;
};

TravelObject.prototype.addNotes = function (noteName) {
  let newNote = new Notes(noteName);
  newNote.id = this.assignId();
  this.notes[newNote.id] = newNote;
  return newNote.id;
};

TravelObject.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};

function Location(country, city) {
  this.country = country;
  this.city = city;
  return 
};

function Landmark(landmark) {
  this.landmark = landmark;
};

function Year(year) {
  this.year = year;
}

function Notes(note) {
  this.note = note;
}
