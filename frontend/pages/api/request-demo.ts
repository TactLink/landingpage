import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, company, country, message } = req.body;

  if (!name || !email || !country) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Fetch the designated email for the country from Strapi
    const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';
    const { data } = await axios.get(`${strapiUrl}/api/country-emails`, {
      params: { filters: { country: { $eq: country } } }
    });
    const countryEmail = data?.data?.[0]?.attributes?.email;
    if (!countryEmail) {
      return res.status(404).json({ message: 'No designated email for this country' });
    }

    // TODO: Send email to countryEmail (use nodemailer or external service)
    // Placeholder: just return success
    return res.status(200).json({ message: 'Demo request received', to: countryEmail });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ message: 'Error processing request', error: message });
  }
} 