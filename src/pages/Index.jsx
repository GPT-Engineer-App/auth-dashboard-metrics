import { useEffect } from "react";
import { Button, Box, Flex, Heading, Text } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, [navigate]);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.error("Error logging in with Google", error);
  };

  return (
    <Flex direction="column" align="center" justify="center" height="100vh" bg="gray.50">
      <Box textAlign="center" p={8} bg="white" shadow="md" borderRadius="md">
        <Heading mb={4}>Welcome to Our App</Heading>
        <Text mb={6}>Please log in to continue</Text>
        <Button leftIcon={<FaGoogle />} colorScheme="red" onClick={handleGoogleLogin}>
          Log in with Google
        </Button>
      </Box>
    </Flex>
  );
};

export default Index;