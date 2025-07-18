/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let revStr = ""
  let test = ""
  str = str.toLowerCase()
  
  for (let i = 0; i < str.length; i++) {
    if(str.charCodeAt(i)>=97 && str.charCodeAt(i)<=122){
      test = test + str[i]
    }
    
  }

  for (let index = test.length-1; index > -1; index--) {
    
    revStr = revStr + test[index]
    
  }

  return(test == revStr)
  
  
}


module.exports = isPalindrome;
