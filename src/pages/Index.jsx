import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';

import { supabase } from '../lib/supabaseClient'; // Assuming you have a supabaseClient.js file for initializing Supabase

const Index = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
  }, []);

  

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" bg="gray.50">
      <Box textAlign="center">
        <Heading mb={6}>Dashboard</Heading>
        {user && <Text mb={4}>Welcome, {user.email}</Text>}
        <Button colorScheme="teal" onClick={signOut}>
          Sign Out
        </Button>
      </Box>
    </Flex>
  );
};

export default Index;