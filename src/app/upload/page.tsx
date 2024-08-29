'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Typography, Spin, message } from 'antd';
import styled from 'styled-components';
import { TopNav } from 'components/TopNav';

const { Title, Text } = Typography;

const user_id = '9l0qj6'

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
      setError(null); 
      message.success(`${e.target.files[0].name} file selected successfully.`);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('sub_id', user_id);
  

    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/upload', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_CAT_API_KEY as string
        },
        body: formData,
      });

      if (response.ok) {
        message.success('Image uploaded successfully!');
        router.push('/');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to upload image.');
      }
    } catch (error) {
      setError('An error occurred while uploading the image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TopNav />
      <StyledMain>
        <Title level={2}>Upload an Image</Title>
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept="image/*"
          style={{ marginBottom: 16 }}
        />
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={loading || !selectedFile}
          style={{ marginTop: 16 }}
        >
          {loading ? <Spin /> : 'Upload'}
        </Button>
        {error && <Text type="danger" style={{ marginTop: 16 }}>{error}</Text>}
      </StyledMain>
    </>
  );
};

export default UploadPage;

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;
