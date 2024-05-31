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
      <Flex direction="row" justify="space-between" p={10} w="100%" maxW="1200px">
        <Box p={10} textAlign="center">
          <Box mb={6}>
            <img src="/path/to/illustration.png" alt="Illustration" width="300" height="300" />
          </Box>
          <Heading fontSize="24px" fontWeight="bold" color="#333333" mb={4}>
            Welcome to Our App
          </Heading>
          <Text fontSize="16px" color="#666666">
            Please sign in to continue
          </Text>
        </Box>
        <Box
          w="400px"
          p={10}
          bg="#FFFFFF"
          borderRadius="8px"
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
        >
          {!user ? (
            <VStack spacing={4}>
              <Box w="100%">
                <Text fontSize="16px" fontWeight="normal" color="#333333" mb={1}>
                  Username or email
                </Text>
                <Input
                  type="text"
                  placeholder="Enter your username or email"
                  w="100%"
                  h="50px"
                  p={2}
                  fontSize="16px"
                  border="1px solid #CCCCCC"
                  borderRadius="4px"
                  mb={4}
                />
              </Box>
              <Box w="100%">
                <Text fontSize="16px" fontWeight="normal" color="#333333" mb={1}>
                  Password
                </Text>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  w="100%"
                  h="50px"
                  p={2}
                  fontSize="16px"
                  border="1px solid #CCCCCC"
                  borderRadius="4px"
                  mb={4}
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
                mb={4}
                _hover={{ cursor: 'pointer' }}
              >
                Sign In
              </Button>
              <Link fontSize="14px" color="#666666" mb={4} _hover={{ textDecoration: 'underline', cursor: 'pointer' }}>
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
                mb={4}
                leftIcon={<FaGoogle />}
                _hover={{ cursor: 'pointer' }}
                onClick={signInWithGoogle}
              >
                Sign in with Google
              </Button>
              <Link fontSize="14px" color="#00AA00" _hover={{ textDecoration: 'underline', cursor: 'pointer' }}>
                Are you new? Create an Account
              </Link>
            </VStack>
          ) : (
            <Box textAlign="center">
              <Heading mb={6}>Dashboard</Heading>
              <Text mb={4}>Welcome, {user.email}</Text>
              <Button colorScheme="teal" onClick={signOut}>
                Sign Out
              </Button>
            </Box>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Index;