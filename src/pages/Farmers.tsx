import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { Schema } from "../../amplify/data/resource.ts";
import { generateClient } from "aws-amplify/src/api";
import { Card, Stack, Image, CardBody, Heading, Text, CardFooter, Button } from '@chakra-ui/react';

const client = generateClient<Schema>();

const Farmers: React.FC = () => {
    const [profiles, setProfiles] = useState<Schema["Producer"]["type"][]>([]);
    const [nextToken, setNextToken] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchProfiles = async () => {
      try {
          const limit = 12;
          const { data: items, errors, nextToken: newNextToken } = await client.models.Producer.list({ limit, nextToken });
          console.log(errors);
          if (!errors) {
              setProfiles(items);
              setNextToken(newNextToken || null);
              setTotalPages(Math.ceil(items.length / limit));
          } else {
          }
      } catch (error) {
          console.error('Error fetching profiles:', error);
      }
  };
  

    useEffect(() => {
        fetchProfiles(currentPage);
    }, [currentPage]);

    const handleNextPage = () => {
        if (nextToken) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <NavBar />
            <h1>Farmers</h1>
            <div>
                {profiles.map(({ id, name, region }) => (
                    <Card key={id} direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
                        <Image
                            objectFit='cover'
                            maxW={{ base: '100%', sm: '200px' }}
                            src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
                            alt='Caffe Latte'
                        />

                        <Stack>
                            <CardBody>
                                <Heading size='md'>{name}</Heading>
                                <Text py='2'>
                                    Region: {region}
                                </Text>
                            </CardBody>

                            <CardFooter>
                                <Button variant='solid' colorScheme='blue'>
                                    Buy from {name}
                                </Button>
                            </CardFooter>
                        </Stack>
                    </Card>
                ))}
            </div>
            <div>
                <Button onClick={handlePrevPage}>Previous</Button>
                <Button onClick={handleNextPage}>Next</Button>
            </div>
            <p>Page {currentPage} of {totalPages}</p>
        </>
    );
}

export default Farmers;
