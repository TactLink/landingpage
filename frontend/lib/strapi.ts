import axios from 'axios';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export async function fetchStrapiCollection(collection: string, params = {}) {
  const url = `${STRAPI_URL}/api/${collection}`;
  const { data } = await axios.get(url, { params });
  return data.data;
}

export { STRAPI_URL }; 