import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import { supabase } from '../lib/supabaseClient'; // Assuming you have a supabaseClient.js file for initializing Supabase
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        navigate('/dashboard');
      }
    });
  }, [navigate]);

  const signInWithGoogle = async () => {
    await supabase.auth.signIn({
      provider: 'google',
    });
  };

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" bg="gray.50">
      {!user ? (
        <Box textAlign="center">
          <Heading mb={6}>Welcome to Our App</Heading>
          <Button leftIcon={<FaGoogle />} colorScheme="teal" onClick={signInWithGoogle}>
            Sign in with Google
          </Button>
        </Box>
      ) : (
        <Box textAlign="center">
          <Heading mb={6}>Redirecting to Dashboard...</Heading>
        </Box>
      )}
    </Flex>
  );
};

export default Index;