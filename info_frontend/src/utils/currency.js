import axios from 'axios';

export async function getRates(base = 'USD', symbols = ['INR','EUR','GBP']) {
  try {
    const s = symbols.join(',');
    const url = `https://api.exchangerate.host/latest?base=${base}&symbols=${s}`;
    const res = await axios.get(url, { timeout: 8000 });
    return res.data?.rates || {};
  } catch (e) {
    console.error('currency error', e);
    return {};
  }
}
