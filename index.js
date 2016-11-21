// var tesseract = require('node-tesseract');

// var options = {
//     l: 'eng',
//     psm: 3,
//     binary: '/usr/local/bin/tesseract'
// };
 
// tesseract.process(__dirname + '/imgB2.jpg', options, function(err, text) {
//     if(err) {
//         console.error(err);
//     } else {
//         console.log(text);
//     }
// });

// pagesegmode values are:
//   0 = Orientation and script detection (OSD) only.
//   1 = Automatic page segmentation with OSD.
//   2 = Automatic page segmentation, but no OSD, or OCR
//   3 = Fully automatic page segmentation, but no OSD. (Default)
//   4 = Assume a single column of text of variable sizes.
//   5 = Assume a single uniform block of vertically aligned text.
//   6 = Assume a single uniform block of text.
//   7 = Treat the image as a single text line.
//   8 = Treat the image as a single word.
//   9 = Treat the image as a single word in a circle.
//   10 = Treat the image as a single character.


// let result = `
   
 
  
   
 

// Tacoma #95
// 2219 80.371h Sf.
// Tacoma, HR 9840

// 28 Member 111845318945

// E 142354 RITZ CRHCKE 8.59
// E 0000153664 ESPN/142354 2.10-
// E 5628 CRHN GOHT H 6.59
// E 0000154566 CPN/5628 2.00-
// E 5628 CRRN BOAT H 6.59
// E 0000154566 CPN/5628 2.00—
// E 947759 MINI NHRN 5.49
// 87745 ROTISSERIE 4.99 F1
// E 30669 BANHNRS 1.39
// E 83333 GRN ERHPES 7.99
// SUBTOTAL 35.53
// THX 0.48
// W“ TOTHL - Oil
// XXXXXXXXXXXX0224 SUIPED

// Seat: 14859 HPPi: 0161]

// Visa Resp: HPPROVE
// Tran 10*: 63230001485
// Merchan’r ID: 9900951



// `

let result = `
Tacoma #95
2219 $0.371h 51.
Tacoma. NH 98409

Y2 Member 111805002566

E 1089695 SKINNYPUP 14 5.39
E 1089695 SKINNYPUP 14 5:39
519964 CHINEI CUPS 9.49 8
E 27197 HNJUU PEHRS 5.49
E 1102207 BRUUNIE BITE 6.39
E 906165 xsz UHTER** 6.99
E 49118 GHLH HPPLES 5.49
922276 KS 989 64PK 19.99 9
E 30793 CREME PRLINE 5.99
E 30793 CREME PRLINE 5.99
E 172246 ORG. CHRRUTS 4.99
E 88426 ENGLISH CUK 3.99
E 77053 GR.1°E 10M910 5.99
E 1102207 BRUUNIE BITE 6.39
E 601? PET CIN RULL ‘ 7.99
E 601? PET CIN ROLL 1 99
SUBTUTHL 113. 94
10X 2 83
9mm TUTHL —|[:ﬂll
xxxxxxxxxxxx1655 SUIPEU
Seq#: 10220 HPP#: 200671
EFT/Debit Resp: HPPRUVED

Tran ID#: 631400010220....
Merchant ID: 99009511

FIFERUVED " Purchase

 

 



`
// ((?:\w+\W*){1,7})(\d+\.\d+).{0,}?$

// var exp = /^(?:.+?\s)?(.?\d{4,}.?)\s((?:\w+\W*)+)(\d+[\.\s]\d+).{0,}?$/
var exp = /^(?:E\s?)?.{0,1}?(\d{2,}).*?\s(.+)(\d{1,4}[\D]\d{2}).{0,2}?$/
var cleaned = [];

// Cut the whitespace borders and seperate per line
result = result.trim().split('\n');

// ––––––––––––––––––––––––––––––––––––––––––––––––––– //
//            Create Phase1 List of Objects            //
// ––––––––––––––––––––––––––––––––––––––––––––––––––– //
for (var each in result) {
  var matched = result[each].match(exp); // Grab the item ID, the name and the price
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

console.log(cleaned);


