import Portfolio from './portfolio';

async function getPortfolioData() {
  try {
    const res = await fetch('https://66fbba9f8583ac93b40cf38f.mockapi.io/hairoil/v1/new', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch portfolio data');
    }
    const data = await res.json();
    console.log('Fetched data:', data);
    return Array.isArray(data) ? data[0] : data; // Return the first item if it's an array
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    return null;
  }
}

export default async function Home() {
  const portfolioData = await getPortfolioData();
  return <Portfolio data={portfolioData} />;
}