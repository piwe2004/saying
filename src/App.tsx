import React from 'react';
import './App.css'
import Box from './commponent/Box';
import Flex from './commponent/Flex';


function App() {
  return (
    <>
      <Flex flexDirection={"column"} textAlign={'center'} alignItems={'center'} justifyContent={'center'} height={'100vh'}>
        <Box fontSize={'24px'}>
          오늘의 명언
        </Box>
        <Flex width={'100%'} border={'1px solid #707070'} alignItems={'center'} justifyContent={'center'} maxWidth={'1000px'} height={'160px'} mt={'64px'} mb={'16px'}>
          ABCD
        </Flex>
        <Box fontSize={'24px'}>
          저자
        </Box>
      </Flex>
    </>
  );
}

export default App;
