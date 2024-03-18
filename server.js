const app = express();
app.use(express.json());

app.get('/get-clients-by-name', async (req, res) => {
  try {
    const { name } = req.query;
    const clients = await getAllClients(credentials, name);
    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/find-client', async (req, res) => {
  try {
    const { name } = req.query;
    const client = await findClient(credentials, name);
    res.status(200).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
