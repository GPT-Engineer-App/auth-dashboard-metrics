import React from 'react';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const Dashboard = () => {
  const navigate = useNavigate();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <Flex direction="column" minH="100vh">
      <Box bg="teal.500" p={4} color="white">
        <Heading size="lg">Dashboard</Heading>
      </Box>
      <Flex direction="column" align="center" justify="center" flex="1" bg="gray.50">
        <Box textAlign="center">
          <Heading mb={6}>Welcome to the Dashboard</Heading>
          <Button colorScheme="teal" onClick={signOut}>
            Sign Out
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;