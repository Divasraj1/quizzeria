import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/header/footer/Footer';
import Header from "./components/header/Header"
import Home from './components/Pages/home/Home';
import Quiz from './components/Pages/quiz/Quiz';
import Result from './components/Pages/result/Result';
import { useState } from 'react';
import axios from 'axios';
function App() {
  const [name,setName] = useState("")
  const [questions,setQuestions] = useState();
  const [score,setScore] = useState(0);
  const fetchQuestions = async (category = "", difficulty = "") => {
    const {data} = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
    setQuestions(data.results)
  }
  return (
    <BrowserRouter>
    <div className="app" style={{backgroundImage: "url(./worn-dots.png)"}}>
      <Header/>
      <Routes>
        <Route path='/' exact element={<Home name={name} setName={setName} fetchQuestions={fetchQuestions}/>}/>
        <Route path='/quiz' exact element={<Quiz name={name} questions={questions} score={score} setScore={setScore} setQuestions={setQuestions}/>}/>
        <Route path='/result' exact element={<Result name={name} score={score}/>}/>
      </Routes>
    </div>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
