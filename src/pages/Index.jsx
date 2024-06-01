import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Text, VStack, Input, Link } from '@chakra-ui/react';
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
    <Flex direction="column" align="center" justify="center" minH="100vh" bg="#F3FFF3" p={4}>
      {!user ? (
        <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" p="40px" w="100%">
          <Box p="40px" textAlign="center">
            <Box
              bg="gray.200"
              w="300px"
              h="300px"
              m="20px auto"
              borderRadius="md"
            />
            <Heading fontSize="24px" fontWeight="bold" color="#333333" mt="20px">
              Welcome to Our App
            </Heading>
            <Text fontSize="16px" color="#666666">
              Your gateway to a better experience
            </Text>
          </Box>
          <Box
            w="400px"
            p="40px"
            bg="#FFFFFF"
            borderRadius="8px"
            boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
            mt={{ base: '40px', md: '0' }}
          >
            <Box mb="20px">
              <Text fontSize="16px" fontWeight="normal" color="#333333" mb="5px">
                Username or email
              </Text>
              <Input
                type="text"
                w="100%"
                h="50px"
                p="10px"
                fontSize="16px"
                border="1px solid #CCCCCC"
                borderRadius="4px"
                mb="20px"
              />
            </Box>
            <Box mb="20px">
              <Text fontSize="16px" fontWeight="normal" color="#333333" mb="5px">
                Password
              </Text>
              <Input
                type="password"
                w="100%"
                h="50px"
                p="10px"
                fontSize="16px"
                border="1px solid #CCCCCC"
                borderRadius="4px"
                mb="20px"
              />
            </Box>
            <Button
              w="100%"
              h="50px"
              bg="#333333"
              color="#FFFFFF"
              fontSize="16px"
              fontWeight="bold"
              borderRadius="4px"
              mb="20px"
              _hover={{ cursor: 'pointer' }}
            >
              Sign In
            </Button>
            <Link
              fontSize="14px"
              color="#666666"
              mb="20px"
              display="block"
              _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              Forgot password?
            </Link>
            <Button
              w="100%"
              h="50px"
              bg="#FFFFFF"
              border="1px solid #DDDDDD"
              fontSize="16px"
              fontWeight="bold"
              color="#333333"
              borderRadius="4px"
              mb="20px"
              leftIcon={<FaGoogle />}
              _hover={{ cursor: 'pointer' }}
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </Button>
            <Link
              fontSize="14px"
              color="#00AA00"
              mt="20px"
              display="block"
              textAlign="center"
              _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              Are you new? Create an Account
            </Link>
          </Box>
        </Flex>
      ) : (
        <Box textAlign="center">
          <Heading mb={6}>Dashboard</Heading>
          <Text mb={4}>Welcome, {user.email}</Text>
          <Button colorScheme="teal" onClick={signOut}>
            Sign Out
          </Button>
        </Box>
      )}
    </Flex>
  );
};

export default Index;