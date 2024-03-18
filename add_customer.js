function addCustomer() {
    var name = document.getElementById('name').value;
    var carRegistration = document.getElementById('carRegistration').value;
    var carIn = document.getElementById('carIn').value;
    var carOut = document.getElementById('carOut').value;
    var jobDescription = document.getElementById('jobDescription').value;
    var lengthOfWork = document.getElementById('lengthOfWork').value;
    var price = document.getElementById('price').value;
    var guaranteePeriod = document.getElementById('guaranteePeriod').value;
    var notes = document.getElementById('notes').value;
  
    var client = {
      name: name,
      carRegistration: carRegistration,
      carIn: carIn,
      carOut: carOut,
      jobDescription: jobDescription,
      lengthOfWork: lengthOfWork,
      price: price,
      guaranteePeriod: guaranteePeriod,
      notes: notes
    };
  
    fetch('http://localhost:8000/add-customer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(client)
  })
    .then(response => response.json())
    .then(data => {
      alert('Customer added successfully');
      location.reload();
    })
    .catch(error => {
      alert('Error adding customer: ' + error.message);
    });
  }
  
  
  
  function deleteClient(client) {
      if (confirm('Are you sure you want to delete this client?')) {
          google.script.run.deleteClient(client.rowIndex);
      }
  }
  
  function searchClients() {
      var input = document.getElementById('search-input').value;
      input = input.toLowerCase();
      var clients = google.script.run.withSuccessHandler(function(clients) {
          var found = false;
          clients = clients.filter(function(client) {
              return client.name.toLowerCase().indexOf(input) > -1;
          });
          displayClients(clients);
      }).getClientsByName(input);
  }
  
  function displayClientInfo(client) {
      var clientInfo = document.getElementById('client-info');
      clientInfo.innerHTML = '';
  
      var name = document.createElement('h3');
      name.textContent = client.name;
      clientInfo.appendChild(name);
  
      var carRegistration = document.createElement('p');
      carRegistration.textContent = 'Car registration: ' + client.carRegistration;
      clientInfo.appendChild(carRegistration);
  
      var carIn = document.createElement('p');
      carIn.textContent = 'Car in: ' + client.carIn;
      clientInfo.appendChild(carIn);
  
      var carOut = document.createElement('p');
      carOut.textContent = 'Car out: ' + client.carOut;
      clientInfo.appendChild(carOut);
  
      var jobDescription = document.createElement('p');
      jobDescription.textContent = 'Job description: ' + client.jobDescription;
      clientInfo.appendChild(jobDescription);
  
      var lengthOfWork = document.createElement('p');
      lengthOfWork.textContent = 'Length of work: ' + client.lengthOfWork;
      clientInfo.appendChild(lengthOfWork);
  
      var price = document.createElement('p');
      price.textContent = 'Price: ' + client.price;
      clientInfo.appendChild(price);
  var guaranteePeriod = document.createElement('p');
      guaranteePeriod.textContent = 'Guarantee period: ' + client.guaranteePeriod;
      clientInfo.appendChild(guaranteePeriod);
  
      var notes = document.createElement('p');
      notes.textContent = 'Notes: ' + client.notes;
      clientInfo.appendChild(notes);
  
      var editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.onclick = function() {
          updateClient(client);
      };
      clientInfo.appendChild(editButton);
  
      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = function() {
          deleteClient(client);
      };
      clientInfo.appendChild(deleteButton);
  }
  
