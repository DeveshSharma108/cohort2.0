/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {

  let testStr = str.toLowerCase()
  let vowCounts = 0

  for (let index = 0; index < testStr.length; index++) {
    if(
    testStr[index] == 'a' || 
    testStr[index] == 'e' || 
    testStr[index] == 'i' || 
    testStr[index] == 'o' || 
    testStr[index] == 'u')
    
    {
      vowCounts = vowCounts + 1

    }
    
  }

  return vowCounts

    
}



module.exports = countVowels;