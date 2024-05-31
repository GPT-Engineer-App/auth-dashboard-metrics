import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

const Login = () => {
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
      <Box textAlign="center">
        <Heading mb={6}>Login to Our App</Heading>
        <Button leftIcon={<FaGoogle />} colorScheme="teal" onClick={signInWithGoogle}>
          Sign in with Google
        </Button>
      </Box>
    </Flex>
  );
};

export default Login;