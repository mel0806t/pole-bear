const express = require('express');
const bodyParser = require('body-parser');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const doc = new GoogleSpreadsheet('1C4XZ4-FbAZyWJ_845jPWGlzqd8LnERinFsYfRDOZk7g');

app.post('/add-customer', async (req, res) => {
  try {
    await doc.useServiceAccountAuth(require('./service-account-credentials.json'));
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    await sheet.addRow(req.body);

    res.status(200).json({ message: 'Customer added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding customer' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});