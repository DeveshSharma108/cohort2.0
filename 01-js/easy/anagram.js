/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  let ascii_score_str1 = 0
  let ascii_score_str2 = 0
  String1 = str1.toLowerCase()
  String2 = str2.toLowerCase()

  for (let index = 0; index < String1.length; index++) {
    ascii_score_str1 = ascii_score_str1 + (String1.charCodeAt(index))
    
  }

  for (let index = 0; index < String2.length; index++) {
    ascii_score_str2 = ascii_score_str2 + (String2.charCodeAt(index))
    
  }

  return(ascii_score_str1 == ascii_score_str2)

}
console.log(isAnagram("devesh","Devesh"))

module.exports = isAnagram;


