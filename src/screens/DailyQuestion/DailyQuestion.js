import React from 'react'
import "./_dailyquestion.scss"

const DailyQuestion = () => {
  return (
     <div class="custom-container py-5 mt-5">
    <div class="row g-4 align-items-stretch mt-4">
      

      <div class="col-md-12">
        <div class="question-wrapper h-100 d-flex align-items-center justify-content-center">
          <h2 class="question-title text-center">What is the capital of the ancient kingdom of Eldoria?</h2>
        </div>
      </div>

      <div class="col-md-12">
        <div class="row g-4">
          <div class="col-4">
            <div class="answer-card glow-border">
              <p class="answer-text">Solara</p>
            </div>
          </div>
          <div class="col-4">
            <div class="answer-card">
              <p class="answer-text">Nymora</p>
            </div>
          </div>
          <div class="col-4">
            <div class="answer-card">
              <p class="answer-text">Virelia</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  )
}

export default DailyQuestion