const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", () => {
  const input = searchInput.value.toLowerCase();
  if (input.length < 3) {
    return;
  }

  fetch("/get-clients-by-name?name=" + input)
    .then((response) => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      displayClientInfo(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

function displayClientInfo(clients) {
  const clientInfo = document.getElementById("client-info");
  clientInfo.innerHTML = "";

  if (clients.length === 0) {
    const noResults = document.createElement("p");
    noResults.textContent = "No results found.";
    clientInfo.appendChild(noResults);
    return;
  }

  clients.forEach((client) => {
    const clientDiv = document.createElement("div");
    clientDiv.classList.add("client");

    const name = document.createElement("h2");
    name.textContent = client.name;
    clientDiv.appendChild(name);

    const carRegistration = document.createElement("p");
    carRegistration.textContent = "Car registration: " + client.carRegistration;
    clientDiv.appendChild(carRegistration);

    const carIn = document.createElement("p");
    carIn.textContent = "Car in: " + client.carIn;
    clientDiv.appendChild(carIn);

    const carOut = document.createElement("p");
    carOut.textContent = "Car out: " + client.carOut;
    clientDiv.appendChild(carOut);

    const jobDescription = document.createElement("p");
    jobDescription.textContent = "Job description: " + client.jobDescription;
    clientDiv.appendChild(jobDescription);

    const lengthOfWork = document.createElement("p");
    lengthOfWork.textContent = "Length of work: " + client.lengthOfWork;
    clientDiv.appendChild(lengthOfWork);

    const price = document.createElement("p");
    price.textContent = "Price: " + client.price;
    clientDiv.appendChild(price);

    const guaranteePeriod = document.createElement("p");
    guaranteePeriod.textContent = "Guarantee period: " + client.guaranteePeriod;
    clientDiv.appendChild(guaranteePeriod);

    const notes = document.createElement("p");
    notes.textContent = "Notes: " + client.notes;
    clientDiv.appendChild(notes);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      // Handle edit button click here
      const updatedClient = {
        name: prompt("Enter the updated name:"),
        carRegistration: prompt("Enter the updated car registration:"),
        carIn: prompt("Enter the updated car in date:"),
        carOut: prompt("Enter the updated car out date:"),
        jobDescription: prompt("Enter the updated job description:"),
        lengthOfWork: prompt("Enter the updated length of work:"),
        price: prompt("Enter the updated price:"),
        guaranteePeriod: prompt("Enter the updated guarantee period:"),
        notes: prompt("Enter the updated notes:")
      };

      fetch("/update-client?rowIndex=" + client.rowIndex, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedClient)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP error " + response.status);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Client updated:", data);
          searchClients();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });clientDiv.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      // Handle delete button click here
      if (confirm("Are you sure you want to delete this client?")) {
        fetch("/delete-client?rowIndex=" + client.rowIndex, {
          method: "DELETE"
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("HTTP error " + response.status);
            }
            return response.json();
          })
          .then((data) => {
            console.log("Client deleted:", data);
            searchClients();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
    clientDiv.appendChild(deleteButton);

    clientInfo.appendChild(clientDiv);
  });
}