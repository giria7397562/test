// JavaScript DOM and Events Assignment

// Wait for the DOM to be fully loaded before running any JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Check which page we're on and run the appropriate initialization
  if (document.getElementById('send-button')) {
      initializeHomePage();
  } else if (document.getElementById('calculate-button')) {
      initializeExcelPage();
  }
});

// Function to initialize the Home page (index.html)
function initializeHomePage() {
  // Add event listener to the send button
  document.getElementById('send-button').addEventListener('click', getUserInfo);
}

// Function to process user information from the form
function getUserInfo() {
  // Get form values
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email').value.trim();
  const address = document.getElementById('address').value.trim();
  const city = document.getElementById('city').value.trim();
  const province = document.getElementById('province').value.trim();
  
  // Get selected membership type
  let membership = '';
  const membershipOptions = document.getElementsByName('membership');
  for (let i = 0; i < membershipOptions.length; i++) {
      if (membershipOptions[i].checked) {
          membership = membershipOptions[i].value;
          break;
      }
  }

  // Validate form fields
  if (!firstName || !lastName || !email || !address || !city || !province) {
      alert('Please fill out all required fields.');
      return;
  }

  // Create full name
  const fullName = `${firstName} ${lastName}`;

  // Format the output
  const outputHTML = `
      <h3>User Information:</h3>
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p>${city}, ${province}</p>
      <p><strong>Membership:</strong> ${membership}</p>
  `;

  // Display the output
  document.getElementById('output').innerHTML = outputHTML;
}

// Function to initialize the Excel page (excel.html)
function initializeExcelPage() {
  // Add event listener to the calculate button
  document.getElementById('calculate-button').addEventListener('click', myExcelFuns);
}

// Function to handle Excel calculations
function myExcelFuns() {
  // Get the numbers from the input field
  const numberStr = document.getElementById('numbers').value.trim();
  
  // Check if the input is empty
  if (!numberStr) {
      alert('Please enter numbers separated by spaces.');
      return;
  }
  
  // Split the string by spaces and convert to numbers
  const numbersArray = numberStr.split(' ').map(num => {
      return parseFloat(num);
  });
  
  // Filter out any NaN values in case of invalid input
  const validNumbers = numbersArray.filter(num => !isNaN(num));
  
  // Check if there are valid numbers
  if (validNumbers.length === 0) {
      alert('Please enter valid numbers separated by spaces.');
      return;
  }
  
  // Get the selected Excel function
  let selectedFunction = '';
  const functionOptions = document.getElementsByName('excel-function');
  for (let i = 0; i < functionOptions.length; i++) {
      if (functionOptions[i].checked) {
          selectedFunction = functionOptions[i].value;
          break;
      }
  }
  
  // Calculate the result based on the selected function
  let result = 0;
  let functionName = '';
  
  switch (selectedFunction) {
      case 'autosum':
          result = validNumbers.reduce((sum, num) => sum + num, 0);
          functionName = 'Sum';
          break;
      case 'average':
          result = validNumbers.reduce((sum, num) => sum + num, 0) / validNumbers.length;
          functionName = 'Average';
          break;
      case 'max':
          result = Math.max(...validNumbers);
          functionName = 'Maximum';
          break;
      case 'min':
          result = Math.min(...validNumbers);
          functionName = 'Minimum';
          break;
      default:
          result = validNumbers.reduce((sum, num) => sum + num, 0);
          functionName = 'Sum';
  }
  
  // Display the result
  document.getElementById('result').textContent = `${functionName}: ${result}`;
}