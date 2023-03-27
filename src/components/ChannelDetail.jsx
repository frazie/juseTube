import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import { Videos , ChannelCard } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI'

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState([])
  const { id } = useParams()

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
    .then((channelData) => setChannelDetail(channelData?.items[0]));
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
    .then((videosData) => setVideos(videosData?.items));
  }, [id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
            background: 'linear-gradient(90deg, rgba(2,0,36,1) 18%, rgba(255,0,0,1) 100%, rgba(237,6,6,1) 100%)',
            zIndex: 10,
            height: '300px',
           }}
           
        />
        <ChannelCard channelDetail={channelDetail} marginTop='-110px' />
      </Box>
      <Box display='flex' p='2'>
        <Box sx={{mr: {sm: '100px'}}} />
        <Videos videos={videos} />
        
      </Box>
    </Box>
  )
}
 
// const ChannelDetail = () => {
//   const [ChannelDetail, setChannelDetail] = useState(null)
//   const [Videos, setVideos] = useState([])

//   const { id } = useParams()

//   useEffect(() => {
//     const fetchResults = async () => {
//       const data = await fetchFromAPI(`channels?part=snippet&id=${id}`);

//       setChannelDetail(data?.items[0]);

//       const videosData = await fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`);

//       setVideos(videosData?.items);
//     };

//     fetchResults();
//   }, [id]);

//   return (
//     <Box minHeight="95vh">
//       <Box>
//         <div
//           style={{
//             background: 'linear-gradient(90deg, rgba(2,0,36,1) 18%, rgba(255,0,0,1) 100%, rgba(237,6,6,1) 100%)',
//             zIndex: 10,
//             height: '300px',
//            }}
//         />
//         <ChannelCard channelDetail={ChannelDetail} marginTop='-110px'/>
//       </Box>
//       <Box p={2} display="flex">
//       <Box sx={{ mr: { sm: '100px' } }}/>
//         <Videos videos={Videos} />
//       </Box>
//     </Box>    
//   )
// }

export default ChannelDetail