const express = require('express');
const app = express();
const PORT = 8080;

app.use( express.json());

app.listen(PORT, () => console.log('server is running on', PORT))

app.get('/', (req, res) => {
  res.send('Hello world!');
})

app.get('/users/:id', async (req, res) => {
  let response;
  try {
    const { id } = req.params;
    response = await fetch(`https:/reqres.in/api/users/${id}`)
    if (response.status !== 200) {
      throw new Error(`There was an error with status code 
      ${response.status}`)
    }
    const user = await response.json();
  
    if(!user) {
      res.send('Something went wrong :(');
    }
    res.send(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(response.status)
  }
})