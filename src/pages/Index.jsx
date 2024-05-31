import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = supabase.auth.getSession();
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        navigate('/dashboard');
      }
    });
    return () => {
      authListener?.unsubscribe();
    };
  }, [navigate]);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" bg="gray.50" p={4}>
      {!user ? (
        <Box textAlign="center" p={6} boxShadow="lg" bg="white" borderRadius="md" maxW="sm" w="full">
          <Heading mb={4} fontSize="xl" fontWeight="bold">Welcome to Our App</Heading>
          <VStack spacing={4}>
            <Button leftIcon={<FaGoogle />} colorScheme="teal" onClick={signInWithGoogle} size="md" fontSize="sm" py={4} px={6}>
              Sign in with Google
            </Button>
          </VStack>
        </Box>
      ) : (
        <Box textAlign="center">
          <Heading mb={4} fontSize="xl" fontWeight="bold">Dashboard</Heading>
          <Text mb={4}>Welcome, {user.email}</Text>
          <Button colorScheme="teal" onClick={signOut} size="md" fontSize="sm" py={4} px={6}>
            Sign Out
          </Button>
        </Box>
      )}
    </Flex>
  );
};

export default Index;