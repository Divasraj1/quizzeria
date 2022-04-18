import { TextField,MenuItem,Button } from '@mui/material/'
import React, { useState } from 'react'
import Categories from '../../../Data/Categories'
import { useNavigate } from 'react-router-dom';
import ErrorMessage from "../../errormessage/ErrorMessage"
import "./Home.css"
const Home = ({name,setName,fetchQuestions}) => {
    const [category,setCategory] = useState("");
    const [difficulty,setDifficulty] = useState("")
    const [error,setError] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = () => {
        if(!category || !name || !difficulty){
            setError(true);
            return;
        }
        else{
            setError(false)
            fetchQuestions(category,difficulty);
            navigate('/quiz');
        }
    }
    
  return (
    <div className='content'>
        <div className='settings'>
            <span style={{fontSize:30}}>Quiz Settings</span>
            <div className='settings__select'>
                {error && <ErrorMessage>Please fill all the fields</ErrorMessage>}
                <TextField 
                    style={{marginBottom:25}}
                    label="Enter Your Name"
                    variant='outlined'
                    onChange={(e)=>setName(e.target.value)}
                />
                <TextField 
                    select
                    style={{marginBottom:30}}
                    label="Select Category"
                    variant='outlined'
                    onChange={(e)=>setCategory(e.target.value)}
                    value={category}
                >
                {
                    Categories.map((cat) => (
                        <MenuItem key={cat.category} value={cat.value}>
                            {cat.category}
                        </MenuItem>
                    ))
                }
                </TextField>

                <TextField 
                    select
                    style={{marginBottom:30}}
                    label="Select Difficulty"
                    variant='outlined'
                    onChange={(e) => setDifficulty(e.target.value)}
                    value={difficulty}
                >
                    <MenuItem key="easy" value="easy">
                        Easy
                    </MenuItem>
                    <MenuItem key="medium" value="medium">
                        Medium
                    </MenuItem>
                    <MenuItem key="hard" value="hard">
                        Hard
                    </MenuItem>
                </TextField>
                <Button variant="contained" color="primary" size='large' onClick={handleSubmit}>
                    Start Quiz
                </Button>
            </div>
        </div>
        <img src='./quiz.png' className='banner' alt='quiz-img'/>
    </div>
  )
}

export default Home