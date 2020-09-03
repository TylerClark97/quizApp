'use strict'; 

const STORE = [
  {question:'Which of these answers are legal requirements for bourbon?',
  answers:['Must contain at least 50% Corn in the mashbill','Must be made within the United States','Must be aged in new-oak barrels','All of the above'], 
  correct:'All of the above', 
  funFact: "Though bourbon must be aged in new-oak barrels there are are no regulations on the amount of time the spirit has to spend aging." },

  {question:'Single malt Scotch means:', 
  answers: ['Scottish whiskey that contains only one grain in the mashbill ','Scottish whiskey made primarily with barley by only one distillery','Whiskey made in a pot-still by only one distillery','Irish whiskey blended with whiskeys from multiple distilleries'],  
  correct:'Scottish whiskey made primarily with barley by only one distillery', 
  funFact: "Scottish whiskey is sorted primarily into two sections: Single malt and Blended. Blended Whiskey simply being a variety of single malt whiskey blended together." },

  {question:'Bottled in Bond describes a whiskey that',
  answers: ['Bourbon was made at a single distillery, by one distiller in one distillation season, aged for at least four years in a federally bonded and supervised warehouse, and bottled at 100 proof','Scotch aged in new barrels and bottled at 100 proof','Irish Whiskey made in pot stills','Bourbon aged at least 10 years by a single distillery and bottled at 80 proof'],  
  correct:'Bourbon was made at a single distillery, by one distiller in one distillation season, aged for at least four years in a federally bonded and supervised warehouse, and bottled at 100 proof', 
  funFact: "Bottle in Bond regulation exists only in North America. Consequently most whiskeys bottled in bond will also meet the legal requirements for bourbon"},

  {question:'What are the five most famous whiskey producing countries?',
  answers:['United States, Canada, Brazil, Romania','Japan, Ireland, mexico, scotland, Russia','Ireland, Scotland, England, United States, Canada','United States, Japan, Ireland, Canada, Scotland'],  
  correct:'United States, Japan, Ireland, Canada, Scotland', 
  funFact: "In 2015 Scotland produced 277 million liters of whiskey."},

  {question:'Which of the following common whiskey marketing terms represent a legal requirement for the bottle?',
  answers:['Rare','Select','Cask-Strength','Chill-Filtered'],  
  correct:'Chill-Filtered', 
  funFact: "Whiskey straight out of the barrel can often look cloudy and hazy, though debated whether it negatively impacts the taste of the whiskey, chill filtering improves the look of the whiskey by filtering at a low temperature."}
]; 


// var to keep track of which question we're on
let questionNumber = 0; 

// Keeps track of the number gotten correct
let currentScore = 0; 

//Increases Question tracker by one
function updateQuestionNumber(){
  questionNumber++; 
}

//Updates score tracker if answer correct 
function updateScoreCorrect(){
  currentScore++; 
}

//Hides the title page, emptys any results from a previous page and renders a new question
// note: put for="whiskeyAnswer_1" for each label matching id
function renderQuestion(){
  console.log('renderQuestion ran');
  
    $('.title,.answer').on('click', function(event){
      $('.title').hide(); 
      $('.answer').empty(); 
      updateQuestionNumber(); 
      $('.question').html(`<form class = "form"> 
      <fieldset>
        <legend class = "question">${STORE[questionNumber -1].question}</legend>
        
        
        <label class='flexLabel' for="whiskeyAnswer_1"> 

          <input id = "whiskeyAnswer_1" type = "radio" name = "option" value='${STORE[questionNumber -1].answers[0]}' required>
      
          ${STORE[questionNumber -1].answers[0]}
        
        </label>
        

        <br>
        <label class='flexLabel' for="whiskeyAnswer_2">  
              <input id = "whiskeyAnswer_2" type = "radio" name = "option" value='${STORE[questionNumber -1].answers[1]}'>${STORE[questionNumber -1].answers[1]}</label>
        <br>
        <label class='flexLabel' for="whiskeyAnswer_3"> 
              <input id = "whiskeyAnswer_3" type = "radio" name = "option" value='${STORE[questionNumber -1].answers[2]}'>${STORE[questionNumber -1].answers[2]}</label>
        <br>
          <label class='flexLabel' for="whiskeyAnswer_4"> 
              <input id = "whiskeyAnswer_4" type = "radio" name = "option" value='${STORE[questionNumber -1].answers[3]}'>${STORE[questionNumber -1].answers[3]}</label>
      </fieldset>

      <div class="buttonContainer">
      <button class='next submitAnswer' type='submit'>Submit Answer</button>
      <div> 
      <div class = "status">
          <p>Question: ${questionNumber} out of ${STORE.length}</p>
          <p> ${currentScore} correct out of ${questionNumber - 1} questions</p>
      </div>
      </form>`);
    }); 
  
}

//Listens for the user to submit a question and determines whether they got it correct
function renderAnswer(){
  console.log('render answer running'); 

  $('.question').on('submit', function(event){  
    event.preventDefault();
    let input = $('input:checked');
    let userAnswer = input.val(); 
    console.log(`User Answer: ${userAnswer}`); 
    let correctAnswer = STORE[questionNumber-1].correct
    console.log(`Correct Answer: ${correctAnswer}`);
    if (userAnswer === correctAnswer){
      correctInput(); 
    }
    else{
      incorrectInput(); 
    }
    
  }); 
}

//Runs if user has chosen correct answer
function correctInput(){
  updateScoreCorrect(); 
  $('.question').empty();
  $('.answer').html(`<p>Fantastic, you got it correct!<p>
  <p> FunFact: ${STORE[questionNumber -1].funFact}</p>
  <button class = "nextButton"> Next question </button>`);
}

//Runs if user has chosen incorrect answer
function incorrectInput(){
  $('.question').empty();
  $('.answer').html(`<p>Unfortunately the correct answer was: ${STORE[questionNumber - 1].correct}</p> 
  <p> FunFact: ${STORE[questionNumber -1].funFact} </p>
  <button class = "nextButton"> Next question </button>`);
}

//Displays the results of a completed quiz once the last question is completed
function renderResults(){
   
  console.log('results page'); 

  $('.answer').on('click', function(event){
    console.log('next question got clicked'); 
    if(questionNumber === STORE.length){
      $('.answer').empty(); 
      $('.results').html(`<h1> Quiz Results </h1> 
      <p> You answered ${currentScore} out of ${questionNumber} questions correctly </P> 
      <p> Click the button below to try again! </p> 
      <button class = "nextButton"> Reset Quiz </button>`); }
  }); 
}

//Takes both question Number and score back to 0 if the user chooses to restart the quiz 
function resetStats(){
  console.log('resetStats Running'); 
  $('.results').on('click', function(event){  
    console.log('Reset button clicked'); 
    questionNumber = 0; 
    currentScore = 0; 
    $('.results').empty(); 
    $('.title').show(); 
  }); 
}

//Run's all the functions 
function handleQuiz(){
  resetStats();
  renderResults();  
  renderQuestion(); 
  renderAnswer();  
  //renderResults(); 

}

$(handleQuiz); 
