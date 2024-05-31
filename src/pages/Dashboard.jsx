import React from 'react';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <Flex direction="column" minH="100vh">
      <Flex as="nav" bg="teal.500" color="white" p={4} justify="space-between" align="center">
        <Heading size="md">Dashboard</Heading>
        <Button colorScheme="teal" variant="outline" onClick={signOut}>
          Sign Out
        </Button>
      </Flex>
      <Flex direction="column" align="center" justify="center" flex="1" bg="gray.50">
        <Box textAlign="center">
          <Heading mb={6}>Welcome to Your Dashboard</Heading>
          <Text mb={4}>This is your personal space.</Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;