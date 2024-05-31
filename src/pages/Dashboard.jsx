import { Box, Flex, Heading, Text, SimpleGrid, GridItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    if (!session) {
      navigate("/");
    } else {
      setUser(session.user);
    }
  }, [navigate]);

  const data = [
    { name: "Jan", uv: 400, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 300, pv: 1398, amt: 2210 },
    { name: "Mar", uv: 200, pv: 9800, amt: 2290 },
    { name: "Apr", uv: 278, pv: 3908, amt: 2000 },
    { name: "May", uv: 189, pv: 4800, amt: 2181 },
    { name: "Jun", uv: 239, pv: 3800, amt: 2500 },
    { name: "Jul", uv: 349, pv: 4300, amt: 2100 },
  ];

  return (
    <Box p={4}>
      <Flex direction="column" align="center" justify="center" p={10}>
        <Heading mb={4}>Dashboard</Heading>
        {user && <Text mb={6}>Welcome, {user.email}</Text>}
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <GridItem>
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Heading fontSize="xl">Chart 1</Heading>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </GridItem>
        <GridItem>
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Heading fontSize="xl">Chart 2</Heading>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;