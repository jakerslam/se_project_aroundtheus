# Project 3: Around The U.S.

### Overview  

* Intro
The purpose of this project was to hone my skills by creating a social media clone.
Functionality:
- Collects input for new cards/posts, avatar pictures, and profile name and bio info.
- All this is saved to and retrieved from a database.
- Deletes posts via the delete button
- Opens  an image photo viewer upon clicking on an image.

Tools:
* Figma
All the formatting was done using figma, and was accurate to the design to within 5 pixels.
* Images  
All the images were formated to be compressed and compatible with webpack.
* Webpack
The project was organized using an npn build
* Javascript
* Html
* CSS

Experience:
The was the project that taught me to use json and databases, and was thus a bit of a learning curve.
**Intro**
  
Installing and running: You can either run it yourself or simply click the github pages link at the bottom.
If you want to run it yourself:
1) npm install --save-dev webpack
2) copy these scripts intoo package.json:
  "scripts": {
    "build": "rm -rf dist && webpack --mode production",
    "dev": "webpack serve --mode development",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
3) npm run dev
 
**Figma**  
  
* [Link to the project on Figma](https://www.figma.com/file/ii4xxsJ0ghevUOcssTlHZv/Sprint-3%3A-Around-the-US?node-id=0%3A1)  
  

Github pages
*[Github pages link](https://jakerslam.github.io/se_project_aroundtheus/)

Credits:
Jacob Haslam - Bulk of the code
TrippleTen - Assets and database
