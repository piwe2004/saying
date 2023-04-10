import React, {useState, useEffect} from 'react';
import './App.css'
import Box from './commponent/Box';
import Flex from './commponent/Flex';
import { VscListUnordered, VscArrowLeft, VscAdd, VscTrash, VscEdit, VscClose, VscCheck } from 'react-icons/vsc'
import axios from 'axios';
import Data from './Interfaces/data';

axios.defaults.baseURL = "http://localhost:8080"

function App() {

  const [page, setPage] = useState< 'main' | 'edit'>('main')

  const [nowData, setNowData] = useState<null | Data>(null)
  const [error, setError] = useState('')
  const [dataList, setDataList] = useState<null | Data[]>(null)
  const [createMode, setCreateMode] = useState(false);
  const [createInp, setCreateInp] = useState<[string, string]>(['','']);
  const [editInp, setEditInp] = useState<[string, string]>(['','']);
  const [seletedData, setSelectedData] = useState<string | null>(null)

  useEffect(() => {
    if(page === 'main'){
      axios.get("/random")
      .then(e=>setNowData(e.data))
      .catch(()=>setError('명언을 불러오지 못했습니다.'))
    }else if(page === 'edit'){
      axios.get("/")
      .then(e=>setDataList(e.data))
      .catch(()=>setError('명언을 불러오지 못했습니다.'))
    }
  }, [page])

  if(page === 'main')
    return (
      <>
        <Flex position={'fixed'} right={'64px'} top={'64px'}>
          <Flex bg={'#2699fb'} width={'64px'} height={'64px'} borderRadius={'4px'} alignItems={'center'} justifyContent={'center'} onClick={() => setPage('edit')} style={{cursor:'pointer'}}>
            <VscListUnordered color={'white'} fontSize={'32px'} />
          </Flex>
        </Flex>
        <Flex flexDirection={"column"} textAlign={'center'} alignItems={'center'} justifyContent={'center'} height={'100vh'}>
          <Box fontSize={'24px'}>
            오늘의 명언
          </Box>
          <Flex width={'100%'} border={'1px solid #707070'} alignItems={'center'} justifyContent={'center'} maxWidth={'1000px'} height={'160px'} mt={'64px'} mb={'16px'}>
            {error.length > 0 && error}
            {nowData?.message}
          </Flex>
          <Box fontSize={'24px'}>
            {nowData?.author}
          </Box>
        </Flex>
      </>
    );
  return <>
    <Box padding={'64px'} >
      <Flex paddingBottom={'64px'} style={{gap:'44px'}}>
        <Flex bg={'#2699fb'} width={'64px'} height={'64px'} borderRadius={'4px'} alignItems={'center'} justifyContent={'center'} onClick={() => setPage('main')} style={{cursor:'pointer'}}>
          <VscArrowLeft color={'white'} fontSize={'25px'} />
        </Flex>
        <Flex bg={'#2699fb'} width={'64px'} height={'64px'} borderRadius={'4px'} alignItems={'center'} justifyContent={'center'} style={{cursor:'pointer'}} onClick={() => setCreateMode(prev => !prev)}>
          {
            !createMode 
            ? <VscAdd color={'white'} fontSize={'25px'} />
            : <VscClose color={'white'} fontSize={'25px'} />
          }
        </Flex>
      </Flex>
      {
        createMode && <>
        <Flex  width={'416px'} height={'48px'} pb={'16px'}>
          <Flex border={'1px solid #707070'} flex={1} style={{overflow:'auto', whiteSpace:'pre'}} alignItems={'center'} justifyContent={'left'}>
            <input value={createInp[0]} type="text" onChange={(e) => setCreateInp(prev => [e?.target.value, prev[1]])} />
            <input value={createInp[1]} type="text" onChange={(e) => setCreateInp(prev => [prev[0], e?.target.value])} />
            </Flex>
            <Flex bg={'#2699fb'} width={'48px'} height={'48px'} borderRadius={'4px'} alignItems={'center'} justifyContent={'center'} style={{cursor:'pointer'}}
              onClick={()=>{

                if(createInp[0].length === 0 || createInp[1].length === 0){
                  alert('정상적인 값이 아닙니다.');
                  return;
                }

                axios.post('/',{
                  'author':createInp[0],
                  'message':createInp[1]
                }).then(({data}) =>{
                  if(data.rs){
                    setDataList([])
                    setCreateInp(['',''])
                    setCreateMode(false);
                    alert('생성완료')
                    axios.get("/")
                      .then(e=>setDataList(e.data))
                      .catch(()=>setError('저장하지 못했습니다.'))
                  }else{
                    alert("생성실패")
                  }
                })
              }}
            >
              <VscCheck color={'white'} fontSize={'25px'} />
            </Flex>
        </Flex>)
        </>
      }
      {
        dataList?.map((data, idx)=><Flex key={data.message} width={'416px'} height={'48px'} pb={'16px'}>
          <Flex border={'1px solid #707070'} flex={1} style={{overflow:'auto', whiteSpace:'pre'}} alignItems={'center'} justifyContent={'left'}>
            {
              data.message === seletedData ?
              <>
                <input value={editInp[0]} type="text" onChange={(e) => setEditInp(prev => [e?.target.value, prev[1]])} />
                <input value={editInp[1]} type="text" onChange={(e) => setEditInp(prev => [prev[0], e?.target.value])} />
              </>:`[${data.author}] ${data.message}`
            }
            
          </Flex>
          <Flex bg={'#2699fb'} width={'48px'} height={'48px'} borderRadius={'4px'} alignItems={'center'} justifyContent={'center'} style={{cursor:'pointer'}} onClick={()=>{
            if(data.message === seletedData){
              axios.put('/'+ idx ,{
                'author':editInp[0],
                'message':editInp[1]
              }).then(({data}) =>{
                if(data.rs){
                  setDataList([])
                  setEditInp(['',''])
                  setSelectedData(null);
                  alert('수정완료')
                  axios.get("/")
                    .then(e=>setDataList(e.data))
                    .catch(()=>setError('수정하지 못했습니다.'))
                }else{
                  alert("수정실패")
                }
              })
            }else{
              setSelectedData(data.message)
              setEditInp([data.author, data.message])
            }
            }}
            >
              {
                data.message === seletedData
                  ? <VscCheck color={'white'} fontSize={'25px'} />
                  : <VscEdit color={'white'} fontSize={'25px'} />
              }
            
          </Flex>
          <Flex bg={'#ff0c0c'} width={'48px'} height={'48px'} borderRadius={'4px'} alignItems={'center'} justifyContent={'center'} style={{cursor:'pointer'}} onClick={()=>{
              if(window.confirm('해당 명언을 제거 하겠습니까?')){
                axios.delete('/' + idx)
                  .then(({data}) =>{
                    if(data.rs){
                      setDataList([])
                      alert('제거완료')
                      axios.get("/")
                        .then(e=>setDataList(e.data))
                        .catch(()=>setError('명언을 불러오지 못했습니다.'))
                    }else{
                      alert("제거실패")
                    }
                  })
              }
          }}>
            <VscTrash color={'white'} fontSize={'25px'} />
          </Flex>
      </Flex>)
      }      
    </Box>
  </>;
}

export default App;
