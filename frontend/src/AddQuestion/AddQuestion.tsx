import {
    Typography,
    Box,
    TextField,
    Grid,
    Card,
    FormControlLabel,
    Checkbox,
    Button,
    TextareaAutosize,
  } from "@mui/material";
  import Input from '@mui/joy/Input';
  import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
  import { bgcolor } from "@mui/system";
  import React from "react";
  
  
  const style = {
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid black",
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
    m: 5,
    display: "flex",
    flexDirection: 'column',
    justifyContent: "space-between"
  };
  
  function AddQuestion() {
    return (
  
        
          <Box sx={style} component="form">
             
            <Card sx={{ margin: '30px 0px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <Typography sx={{fontSize: '40px', fontWeight: '600' }}>Хочешь</Typography>
              <Input placeholder="здесь писать вопрос.." variant="solid" size="lg" sx={{backgroundColor: 'black', width: '400px', color: '#FFFAFA', fontSize: '24px', borderRadius: '15px'}}/>
              <i style={{fontSize: '40px'}} className="fa-solid fa-question"></i>
            </Card>
            
  
            <Card sx={{ margin: '30px 0px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <FormControlLabel
                value="top"
                control={<Checkbox />}
                label="Добавить этот вопрос для всех"
                labelPlacement="top"
              sx={{textAlign: 'left no-wrap', }} />
              <Button
                sx={{ bgcolor: "black", color: "white", width: '300px', borderRadius: '15px', height: '40px' }}
                variant="contained"
              >
                Добавить
              </Button>
            </Card>
  
          </Box>
        
    
    );
  }
  
  export default AddQuestion;