import { useState } from 'react';
import { Card, Button, message } from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { CatImage } from 'types/CatImage';
import { styled } from 'styled-components';


interface CatCardProps {
  cat: CatImage;
}

export const CatCard = ({ cat }: CatCardProps) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [favouriteId, setFavouriteId] = useState<string | null>(null);

  const handleFavouriteToggle = () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-api-key', process.env.NEXT_PUBLIC_CAT_API_KEY as string);

    if (!isFavourite) {
      fetch('https://api.thecatapi.com/v1/favourites', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ image_id: cat.id }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.id) {
            setFavouriteId(data.id);
            setIsFavourite(true);
            message.success('Added to favourites.');
          }
        })
        .catch(error => {
          console.error('Error marking as favourite:', error);
          message.error('Failed to mark as favourite.');
        });
    } else {
      fetch(`https://api.thecatapi.com/v1/favourites/${favouriteId}`, {
        method: 'DELETE',
        headers: headers,
      })
        .then(response => {
          if (response.ok) {
            setFavouriteId(null);
            setIsFavourite(false);
            message.success('Removed from favourites.');
          }
        })
        .catch(error => {
          console.error('Error removing from favourites:', error);
          message.error('Failed to remove from favourites.');
        });
    }
  };

  return (
    <Card
      hoverable
      cover={
      <StyledImage>
          <img alt="A random cat" src={cat.url} />
        </StyledImage>
      }
    >
      <Button
        type="primary"
        onClick={handleFavouriteToggle}
        icon={isFavourite ? <HeartFilled /> : <HeartOutlined />}
      >
        {isFavourite ? 'Remove favourite' : 'Add to favourite'}
      </Button>
    </Card>
  );
};

const StyledImage = styled.div`
    width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; 

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; 
  }
`

