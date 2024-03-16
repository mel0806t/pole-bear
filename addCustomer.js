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

  var apiKey = 'AIzaSyAUWxGMdlveDgoXpU-Q36WhWPcSlGJRYxs';
  var clientId = '782964375517-8pjvcuu80p29k7gjblsokjrro1ltkf7j.apps.googleusercontent.com';
  var clientSecret = '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';
  var spreadsheetId = '1C4XZ4-FbAZyWJ_845jPWGlzqd8LnERinFsYfRDOZk7g';
  var sheetName = 'Sheet1';
  var range = 'A:I';

  var url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!${range}`;

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getAccessToken(clientId, clientSecret, apiKey)
   },
    body: JSON.stringify([client])
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

function getAccessToken(clientId, clientSecret, apiKey) {
  var tokenEndpoint = 'https://oauth2.googleapis.com/token';
  var redirectUri = 'urn:ietf:wg:oauth:2.0:oob';

  return fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=urn%3aietf%3awg%3aoauth%3a2.0%3aoob&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&scope=https%3a%2f%2fwww.googleapis.com%2fauth%2fspreadsheets`
  })
  .then(response => response.json())
  .then(data => data.access_token)
  .catch(error => {
    console.error('Error getting access token:', error);
    throw error;
  });
}

function deleteClient(rowIndex) {
  var apiKey = 'AIzaSyAUWxGMdlveDgoXpU-Q36WhWPcSlGJRYxs';
  var clientId = '782964375517-8pjvcuu80p29k7gjblsokjrro1ltkf7j.apps.googleusercontent.com';
  var clientSecret = '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';
  var spreadsheetId = '1C4XZ4-FbAZyWJ_845jPWGlzqd8LnERinFsYfRDOZk7g';
  var sheetName = 'Sheet1';
  var range = `A${rowIndex}:I${rowIndex}`;

  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!${range}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getAccessToken(clientId, clientSecret, apiKey)
    }
  })
  .then(response => response.json())
  .then(data => {
    alert('Client deleted successfully');
    location.reload();
  })
  .catch(error => {
    alert('Error deleting client: ' + error.message);
  });
}

function searchClients() {
  var input = document.getElementById('search-input').value;
  var apiKey = 'AIzaSyAUWxGMdlveDgoXpU-Q36WhWPcSlGJRYxs';
  var clientId = '782964375517-8pjvcuu80p29k7gjblsokjrro1ltkf7j.apps.googleusercontent.com';
  var clientSecret = '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';
  var spreadsheetId = '1C4XZ4-FbAZyWJ_845jPWGlzqd8LnERinFsYfRDOZk7g';
  var sheetName = 'Sheet1';
  var range = 'A:I';
  var url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!${range}`;

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getAccessToken(clientId, clientSecret, apiKey)
    }
  })
  .then(response => response.json())
  .then(data => {
    var clients = data.values.slice(1);
    var filteredClients = clients.filter(client => client[0].toLowerCase().indexOf(input.toLowerCase()) !== -1);
    displayClients(filteredClients);
  })
  .catch(error => {
console.error('Error searching clients:', error);
  });
}

function displayClientInfo(client) {
  var clientInfo = document.getElementById('client-info');
  clientInfo.innerHTML = `
    <h3>${client[0]}</h3>
    <p>Car registration: ${client[1]}</p>
    <p>Car in: ${client[2]}</p>
    <p>Car out: ${client[3]}</p>
    <p>Job description: ${client[4]}</p>
    <p>Length of work: ${client[5]}</p>
    <p>Price: ${client[6]}</p>
    <p>Guarantee period: ${client[7]}</p>
    <p>Notes: ${client[8]}</p>
  `;

  var editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.onclick = function() {
    updateClient(client);
  };
  clientInfo.appendChild(editButton);

  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = function() {
    if (confirm('Are you sure you want to delete this client?')) {
      deleteClient(client[2]);
    }
  };
  clientInfo.appendChild(deleteButton);
}

function displayClients(clients) {
  var clientTable = document.getElementById('client-table');
  clientTable.innerHTML = '';

  var headerRow = document.createElement('tr');
  var nameHeader = document.createElement('th');
  nameHeader.textContent = 'Name';
  headerRow.appendChild(nameHeader);
  var carRegistrationHeader = document.createElement('th');
  carRegistrationHeader.textContent = 'Car registration';
  headerRow.appendChild(carRegistrationHeader);
  var carInHeader = document.createElement('th');
  carInHeader.textContent = 'Car in';
  headerRow.appendChild(carInHeader);
  var carOutHeader = document.createElement('th');
  carOutHeader.textContent = 'Car out';headerRow.appendChild(carOutHeader);
  var jobDescriptionHeader = document.createElement('th');
  jobDescriptionHeader.textContent = 'Job description';
  headerRow.appendChild(jobDescriptionHeader);
  var lengthOfWorkHeader = document.createElement('th');
  lengthOfWorkHeader.textContent = 'Length of work';
  headerRow.appendChild(lengthOfWorkHeader);
  var priceHeader = document.createElement('th');
  priceHeader.textContent = 'Price';
  headerRow.appendChild(priceHeader);
  var guaranteePeriodHeader = document.createElement('th');
  guaranteePeriodHeader.textContent = 'Guarantee period';
  headerRow.appendChild(guaranteePeriodHeader);
  var notesHeader = document.createElement('th');
  notesHeader.textContent = 'Notes';
  headerRow.appendChild(notesHeader);
  clientTable.appendChild(headerRow);

  clients.forEach(function(client) {
    var row = document.createElement('tr');
    var nameCell = document.createElement('td');
    nameCell.textContent = client[0];
    row.appendChild(nameCell);
    var carRegistrationCell = document.createElement('td');
    carRegistrationCell.textContent = client[1];
    row.appendChild(carRegistrationCell);
    var carInCell = document.createElement('td');
    carInCell.textContent = client[2];
    row.appendChild(carInCell);
    var carOutCell = document.createElement('td');
    carOutCell.textContent = client[3];
    row.appendChild(carOutCell);
    var jobDescriptionCell = document.createElement('td');
    jobDescriptionCell.textContent = client[4];
    row.appendChild(jobDescriptionCell);
    var lengthOfWorkCell = document.createElement('td');
    lengthOfWorkCell.textContent = client[5];
    row.appendChild(lengthOfWorkCell);
    var priceCell = document.createElement('td');
    priceCell.textContent = client[6];
    row.appendChild(priceCell);
    var guaranteePeriodCell = document.createElement('td');
    guaranteePeriodCell.textContent = client[7];
    row.appendChild(guaranteePeriodCell);
    var notesCell = document.createElement('td');
    notesCell.textContent = client[8];
    row.appendChild(notesCell);
    clientTable.appendChild(row);
  });
}

function updateClient(client) {
  var apiKey = 'AIzaSyAUWxGMdlveDgoXpU-Q36WhWPcSlGJRYxs';
  var clientId = '782964375517-8pjvcuu80p29k7gjblsokjrro1ltkf7j.apps.googleusercontent.com';
  var clientSecret = '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';
  var spreadsheetId = '1C4XZ4-FbAZyWJ_845jPWGlzqd8LnERinFsYfRDOZk7g';
  var sheetName = 'Sheet1';
  var range = `A${client[2] - 1}:I${client[2] - 1}`;

  var updatedClient = {
    name: prompt('Enter the updated name:'),
    carRegistration: prompt('Enter the updated car registration:'),
    carIn: prompt('Enter the updated car in date:'),
    carOut: prompt('Enter the updated car out date:'),
    jobDescription: prompt('Enter the updated job description:'),
    lengthOfWork: prompt('Enter the updated length of work:'),
    price: prompt('Enter the updated price:'),
    guaranteePeriod: prompt('Enter the updated guarantee period:'),
    notes: prompt('Enter the updated notes:')
  };

  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!${range}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + getAccessToken(clientId, clientSecret, apiKey)
    },
    body: JSON.stringify([[updatedClient.name, updatedClient.carRegistration, updatedClient.carIn, updatedClient.carOut, updatedClient.jobDescription, updatedClient.lengthOfWork, updatedClient.price, updatedClient.guaranteePeriod, updatedClient.notes]])
  })
  .then(response => response.json())
  .then(data => {
    alert('Client updated successfully');
    location.reload();
  })
  .catch(error => {
    alert('Error updating client: ' + error.message);
  });
}