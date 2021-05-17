const express = require('express');
const axios = require('axios');

//allowing cross site requests to work
const cors = require('cors');

const app = express();

//intiate app to run on port 5000
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/location', (req, res) => {
  const queryParams = {
    q: req.query.postCode,
    state: req.query.state,
  };

  var strUrl =
    'https://digitalapi.auspost.com.au/postcode/search.json?' +
    Object.keys(queryParams)
      .filter(function (key) {
        return queryParams[key];
      })
      .map(function (key) {
        return key + '=' + queryParams[key];
      })
      .join('&');

  axios
    .get(strUrl, {
      headers: {
        'AUTH-KEY': req.get('auth-key'),
      },
    })
    .then((resp) => {
      res.send(resp.data);
    })
    .catch((er) => {
      res.send(er);
    });
});

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
