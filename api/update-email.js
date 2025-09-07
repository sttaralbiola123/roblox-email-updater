import axios from 'axios';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { cookie, password, emailAddress, skipVerification } = req.body;

    const response = await axios.post('https://accountinformation.roblox.com/v1/email', {
      password: password,
      emailAddress: emailAddress,
      skipVerificationEmail: skipVerification || false,
      isAdsAccount: false
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `.ROBLOSECURITY=${cookie}`
      }
    });

    return res.status(200).json(response.data);

  } catch (error) {
    return res.status(500).json({
      error: error.response?.data || error.message
    });
  }
}
