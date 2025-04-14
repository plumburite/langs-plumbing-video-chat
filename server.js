const express = require('express');
const twilio = require('twilio');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

app.use(express.static('public'));

app.get('/token', (req, res) => {
  const token = new twilio.jwt.AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY_SID,
    process.env.TWILIO_API_KEY_SECRET
  );
  token.identity = "user-" + Date.now();

  const videoGrant = new twilio.jwt.AccessToken.VideoGrant();
  token.addGrant(videoGrant);

  res.send({ token: token.toJwt() });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
