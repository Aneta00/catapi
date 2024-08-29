'use client';
import { useEffect, useState } from 'react';
import { CatCard } from 'components/CatCard';
import { CatImage } from 'types/CatImage';
import { Column, Grid } from 'components/Grid';
import { Body1, H1 } from 'components/Typography';
import { TopNav } from 'components/TopNav';
import { styled } from 'styled-components';
import { Skeleton } from 'antd';

const user_id = '9l0qj6'

const Home = () => {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-api-key', process.env.NEXT_PUBLIC_CAT_API_KEY as string);

    const requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow' as RequestRedirect,
    };

    fetch(
      `https://api.thecatapi.com/v1/images?limit=16&order=DESC&sub_id=${user_id}`,
      requestOptions
    )
      .then(response => response.json())
      .then(data => {
        setCats(data);
        setLoading(false);
        fetchVotes(headers);
        console.log('full data', data)
      })
      .catch(error => {
        console.log('Error fetching cat images:', error);
        setLoading(false);
        setError('Error fetching cat images');
      });
  }, []);

  const fetchVotes = (headers: Headers) => {
    fetch('https://api.thecatapi.com/v1/votes?attach_image=1', {
      method: 'GET',
      headers: headers,
    })
      .then(response => response.json())
      .then(data => {
        const votesMap: Record<string, number> = {};
        data.forEach((vote: { image_id: string; value: number }) => {
          if (votesMap[vote.image_id]) {
            votesMap[vote.image_id] += vote.value;
          } else {
            votesMap[vote.image_id] = vote.value;
          }
        });
        setVotes(votesMap);
      })
      .catch(error => {
        console.error('Error fetching votes:', error);
      });
  };

  const handleVote = (catId: string, value: number) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-api-key', process.env.NEXT_PUBLIC_CAT_API_KEY as string);

    fetch('https://api.thecatapi.com/v1/votes', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ image_id: catId, value }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'SUCCESS') {
          setVotes(prevVotes => ({
            ...prevVotes,
            [catId]: (prevVotes[catId] || 0) + value
          }));
          console.log('data', data)
        }
      })
      .catch(error => {
        console.error('Error voting:', error);
      });
  };

  console.log('votes state: ', votes)

  if (error) {
    return (
      <>
        <TopNav />
        <StyledMain>
          <Body1>{error}</Body1>
        </StyledMain>
      </>
    );
  }

  return (
    <>
      <TopNav />
      <StyledMain>
        <H1>Random Cats</H1>
        {loading ? (
          <Skeleton active paragraph={{ rows: 4 }} />
        ) : (
          <Grid>
            {cats.map(cat => (
              <Column key={cat.id} lg={3} md={6} sm={6} xs={12}>
                <CatCard cat={cat} score={votes[cat.id] || 0} onVote={handleVote} />
              </Column>
            ))}
          </Grid>
        )}
      </StyledMain>
    </>
  );
};

export default Home;

const StyledMain = styled.main`
  padding: 2rem;
`;
