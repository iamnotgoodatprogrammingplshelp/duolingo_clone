// services/mlService.js
const ml = require('ml-regression'); 

const trainModel = (data) => {
  const x = data.map(d => d.studyTime);
  const y = data.map(d => d.score);
  const model = ml.linearRegression(x, y);
  return model;
};

const predictProgress = (model, studyTime) => {
  return model.predict(studyTime);
};
