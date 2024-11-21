// run it to see what was happening when not using memo and useCallback

// import React, { useState, useCallback } from 'react';

// // Create a component with a text input field and a button. The goal is to display an alert with the text entered when the button is clicked. Use useCallback to memoize the event handler function that triggers the alert, ensuring it's not recreated on every render.
// // Currently we only have inputText as a state variable and hence you might not see the benefits of 
// // useCallback. We're also not passing it down to another component as a prop which is another reason for you to not see it's benefits immedietely.

// export function Assignment2() {
//     const [inputText, setInputText] = useState('');

//     // Your code starts here
//     function showAlert() {
//         alert(inputText)
//     }
//     // Your code ends here

//     return (
//         <div>
//             <input
//                 type="text"
//                 value={inputText}
//                 onChange={(e) => setInputText(e.target.value)}
//                 placeholder="Enter some text"
//             />
//             <Alert showAlert={showAlert} />
//         </div>
//     );
// };

// function Alert({showAlert}) {
//     console.log('rendered alert button')
//     return <button onClick={showAlert}>Show Alert</button>
// }



import React, { useState, useCallback,memo,useRef } from 'react';

// Create a component with a text input field and a button. The goal is to display an alert with the text entered when the button is clicked. Use useCallback to memoize the event handler function that triggers the alert, ensuring it's not recreated on every render.
// Currently we only have inputText as a state variable and hence you might not see the benefits of 
// useCallback. We're also not passing it down to another component as a prop which is another reason for you to not see it's benefits immedietely.

export function Assignment2() {
    const [inputText, setInputText] = useState('h');

    // Your code starts here
    const inputTextRef = useRef(inputText)
    inputTextRef.current = inputText
    const showAlert = useCallback(function() {
        alert(inputTextRef.current)
    },[])
    // Your code ends here

    return (
        <div>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter some text"
            />
            <Alert showAlert={showAlert} />
        </div>
    );
};

const Alert = memo(({showAlert})=> {
    const [toggle,setToggle] = useState(true)
    function flip(){
        setToggle(!toggle)
    }
    function runAll(){
        flip()
        showAlert()
    }
    console.log('rendered alert button')
    return <button onClick={runAll}>Show Alert</button>
})


// the above alert button does not render every time the parent renders (on input change) but only render when the toggle (state variable changes or the prop changes)
// we can remove the toggle state then it will only render for the first time and then never re render if the function definition does not change 