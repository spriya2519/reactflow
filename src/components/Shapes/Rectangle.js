
import { Handle, Position } from 'reactflow';
import { Button, Dialog } from '@mui/material';
import BUTTONCOLOR from './Button'
import React from 'react';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

function Rectangle({ data }) {
  const [Data, SetData] = React.useState([]);
  const [open, SetDopen] = React.useState(false);

  function handelClick(event) {

    // console.log("s",event.target.value)
    const filteredData = BUTTONCOLOR.filter((item) => (

      item.id === event.target.value

    ))
    console.log("111111", filteredData)
    SetData(filteredData)

    SetDopen(true);




  }

  function handleClose() {
    SetDopen(false);
  }
  return (
    <>
      <Handle type="target" position={Position.Top} />


      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Tooltip title={data.text}>
          <Button value={data.value} style={{ color: data.color, backgroundColor: "white", height: '20px', width: '200px', fontWeight: 'bold' }} onClick={handelClick}>{data.name}</Button>
        </Tooltip>
        <Button value={data.value} style={{ color: data.color, backgroundColor: data.bgcolor, height: '20px', width: '200px', fontWeight: 'bold' }} onClick={handelClick}>{data.text}</Button>

      </Grid>

      <Handle type="source" position={Position.Bottom} id="b" />


      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
      >
       

          <div style={{ display: "flex", backgroundColor: "#5196CF", alignItems: "center", justifyContent: "space-between",height:'35px '}}>
            <div>
              {/* Content for the first section */}
            </div>
            <div style={{ textAlign: "center" }}>
              <h2 style={{color:'white'}}>Information About {data.text}  {data.name}</h2>
            </div>
            <div >
              <Button onClick={handleClose} style={{ marginLeft: "auto", backgroundColor: 'tomato', color: 'white' }}>X</Button>
            </div>
          </div>
      


 
        <Card sx={{ display: 'flex' ,backgroundColor:'lightgoldenrodyellow'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center',alignItems:'center' }}>
          {Data.map((item) => (
            <div key={item.id}>


              {item.imageUrl && (
                <img src={item.imageUrl} alt={`${item.id}`} style={{marginLeft:'5rem',marginTop:'5rem'}} />
              )}
             <h3 style={{marginLeft:'10rem'}}>Name :  {item.Name}</h3> 
             <h3 style={{marginLeft:'10rem'}}>Age  :  {item.Age}</h3> 
         
         
            </div>
          ))}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent:'center',alignItems:'center' }}>
            {Data.map((item) => (
            <div key={item.id}>
            <h3 style={{marginLeft:'10rem'}}>Information  :  {item.Information}</h3>
            </div>
          ))}
            </Box>
      </Card>
      </Dialog>
    </>
  );
}

export default Rectangle;