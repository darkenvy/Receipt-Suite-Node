var tesseract = require('node-tesseract');
 
function ocr(filename) { return new Promise(function(resolve, reject) {
  let options = {l: 'eng', psm: 3};
  let path = __dirname + '/' + filename;
  let cb = function(err, text) {
    if(err) {
      console.error(err);
      reject(err);
    } else {
      resolve(text);
    }
  }
  tesseract.process(path, options, cb);
})}

function createItems(tesseractText) {return new Promise(function(resolve, reject) {
  // Explicitly Costco
  let exp = /^(?:E\s?)?.{0,1}?(\d{2,}).*?\s(.+)(\d{1,4}[\D]\d{2}).{0,3}?$/
  let cleaned = [];
  lines = tesseractText.trim().split('\n'); // Cut the whitespace borders and seperate per line
  // ––––––––––––––––––––––––––––––––––––––––––––––––––– //
  //            Create Phase1 List of Objects            //
  // ––––––––––––––––––––––––––––––––––––––––––––––––––– //
  for (var each in lines) {
    var matched = lines[each].match(exp); // Grab the item ID, the name and the price
    if (
      matched && // If a valid match (meaning it grabbed an item line from receipt)
      matched.length === 4 &&
      /\D/.test(matched[2][1]) && // If the first letter of the item is not a digit
      /\w\/\d+/.test(matched[2]) === false ) { // If the line is not an instant savings line
        // add to list & clean up data types a bit
        cleaned.push({
          id: parseInt(matched[1].replace(/[\D]/, '.')),
          name: matched[2].trim(),
          price: parseFloat(matched[3].replace(/[\D]/, '.'))
        });
    }
  }
  // ––––––––––––––––––––––––––––––––––––––––––––––––––– //
  //        Create Phase2 | Filter False-Positives       //
  // ––––––––––––––––––––––––––––––––––––––––––––––––––– //
  for (var each in cleaned) {
    var remove = function() {cleaned.splice(each, 1)}
    if (cleaned[each].id.length < 3) remove();
    if (cleaned[each].name.length < 3) remove();
  }
  if (cleaned.length < 1) reject('cleaned is empty');
  resolve(cleaned);
})}

module.exports = filename => ocr(filename).then(text => createItems(text))

// imgB2.jpg