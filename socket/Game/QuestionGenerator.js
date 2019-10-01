let Questions = require('./utils/seeds');

module.exports.GetQuestion = () => {
  let num = Math.floor(Math.random() * 3);
  return Questions[num].quiz;
};
