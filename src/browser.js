// get all cars from garage145
//
const addCarToList = (newCar) => {
  // insert car into DOM
  //  1-build a div car
   const divCar = `
    <div class="car">
      <div class="car-image">
        <img src="images/white_logo_black_square.png" alt=""/>
      </div>
      <div class="car-info">
        <h4>${newCar.brand} - ${newCar.model}</h4>
        <p><strong>Owner:</strong> ${newCar.owner}</p>
      </div>
    </div>`;
  //  2-insert div car into cars-list
  const carsList = document.querySelector(".cars-list");
  carsList.insertAdjacentHTML('beforeend', divCar);
}

fetch("https://wagon-garage-api.herokuapp.com/garage145/cars")
  .then(response => response.json())
  .then((data) => {
    data.forEach((car) => {
      const newCar = {
        brand: car.brand,
        model: car.model,
        owner: car.owner,
        plate: car.plate
      };
      addCarToList(newCar);
    });
  });

// put a micro on form listenning to submit event

const button = document.querySelector(".btn");
button.addEventListener("click", (event) => {
  // prevent default behaviour
  event.preventDefault();
  // get data from inputs
  const inputs = document.querySelectorAll("input");
  const brand = inputs[0].value;
  const model = inputs[1].value;
  const owner = inputs[2].value;
  // send AJAX request to API
  fetch("https://wagon-garage-api.herokuapp.com/garage145/cars", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ brand: brand, model: model, owner: owner })
  })
    .then(response => response.json())
    .then((data) => {
      addCarToList(data);
      const inputs = document.querySelectorAll("input");
      inputs.forEach((input) => {
        input.value = "";
      });
    });
  // insert newcar into cars list
});







