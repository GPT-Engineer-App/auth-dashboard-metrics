import React, { useState } from 'react';
import { Box, Button, Checkbox, Flex, Heading, Input, VStack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <Flex direction="column" minH="100vh">
      <Box bg="teal.500" p={4} color="white">
        <Heading size="lg">Dashboard</Heading>
      </Box>
      <Flex direction="column" align="center" justify="center" flex="1" bg="gray.50">
        <Box textAlign="center" mb={6}>
          <Heading mb={6}>Welcome to the Dashboard</Heading>
          <Button colorScheme="teal" onClick={signOut}>
            Sign Out
          </Button>
        </Box>
        <Box w="full" maxW="md" p={4} bg="white" boxShadow="md" borderRadius="md">
          <Heading size="md" mb={4}>Task Tracker</Heading>
          <VStack spacing={4}>
            {tasks.map((task, index) => (
              <Flex key={index} w="full" align="center">
                <Checkbox 
                  isChecked={task.completed} 
                  onChange={() => toggleTaskCompletion(index)}
                  mr={2}
                />
                <Text as={task.completed ? 's' : ''}>{task.text}</Text>
              </Flex>
            ))}
            <Flex w="full">
              <Input 
                placeholder="Add new task" 
                value={newTask} 
                onChange={(e) => setNewTask(e.target.value)} 
                mr={2}
              />
              <Button onClick={addTask} colorScheme="teal">Add</Button>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;