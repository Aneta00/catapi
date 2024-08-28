'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CatCard } from 'components/CatCard';
import { CatImage } from 'types/CatImage';
import { Column, Grid } from 'components/Grid';
import { Body1, H1 } from 'components/Typography';
import { TopNav } from 'components/TopNav';
import { styled } from 'styled-components';


const Home = () => {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append( 'x-api-key', process.env.NEXT_PUBLIC_CAT_API_KEY as string);

    const requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow' as RequestRedirect,
    };

    fetch(
      'https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=16',
      requestOptions
    )
      .then(response => response.json())
      .then(data => {
        setCats(data);
        setLoading(false);
      })
      .catch(error => {
        console.log('Error fetching cat images:', error);
        setLoading(false);
        setError(error)
      });
  }, []);

  if(error) {
    return (
      <>
        <TopNav />
        <main>
          <Body1>Error getting images</Body1>
        </main>
      </>
    )
  }
  return (
    <>
    <TopNav />
      <StyledMain>
        <H1>Random Cats</H1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Grid>
            {cats.map(cat => (
              <Column lg={3} md={6} sm={6} xs={12}>
                <CatCard cat={cat} />
              </Column>         
            ))}
          </Grid>
        )}
      </StyledMain>
    </>
  );
}

export default Home;

const StyledMain = styled.main`
  padding: 
`
