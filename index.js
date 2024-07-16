const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes');

inquirer.prompt([
  {
    type: 'input',
    name: 'text',
    message: 'Enter text (up to 3 characters):',
    validate: input => input.length <= 3 || 'Text must be up to 3 characters long.'
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter text color (color name or hex code):'
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape:',
    choices: ['Triangle', 'Circle', 'Square']
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter shape color (color name or hex code):'
  }
]).then(answers => {
  const { text, textColor, shape, shapeColor } = answers;
  let selectedShape;

  switch (shape) {
    case 'Triangle':
      selectedShape = new Triangle(shapeColor);
      break;
    case 'Circle':
      selectedShape = new Circle(shapeColor);
      break;
    case 'Square':
      selectedShape = new Square(shapeColor);
      break;
  }

  const svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
      ${selectedShape.render()}
      <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
    </svg>
  `;

  fs.writeFileSync('logo.svg', svgContent.trim());
  console.log('Generated logo.svg');
});