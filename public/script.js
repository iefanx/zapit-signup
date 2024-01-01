// Get elements from the DOM
const form = document.getElementById('create-form');


// Event listener for form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get form values
  const formData = getFormData(event.target);

  // Send a request to create a new user
  const response = await createUser(formData);

  // Display the result
  displayResult(response, result);
});

// Function to extract form data
// Function to extract form data
function getFormData(form) {
  return {
    user_name: form.elements["user-name"].value,
    wallet_name: form.elements["wallet-name"].value,
    email: form.elements["email"].value,
    password: form.elements["password"].value,
  };
}

// Function to send a request to create a new user
async function createUser(formData) {
  const url = "/api/createUser"; // Update this to the serverless function URL

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return response;
}


// Function to display the result
async function displayResult(response, resultElement) {
	if (response.ok) {
	  const jsonResponse = await response.json();
	  displaySuccess(jsonResponse, resultElement);
	} else {
	  displayError(response, resultElement);
	}
  }
  
// Function to display the result
async function displaySuccess(jsonResponse, resultElement) {
  const id1 = jsonResponse.id;
  const id2 = jsonResponse.wallets[0].id;
  const adminkey = jsonResponse.wallets[0].adminkey;

  const resultText = `
    Login Key: ${adminkey}
    Wallet ID: https://pay.zapit.live/wallet?usr=${id1}&wal=${id2}
  `;

  resultElement.innerHTML = `
    <p>${resultText.replace(/\n/g, '<br>')}</p>
    <button id="copyButton" onclick="copyToClipboard('${resultText.replace(/\n/g, '\\n')}')">Copy Login key & Wallet id</button>
  `;

  const message = `${adminkey} https://pay.zapit.live/wallet?usr=${id1}&wal=${id2}`;
  window.parent.postMessage(message, 'https://www.webcore.live');
}



  // Function to copy text to clipboard
  function copyToClipboard(text) {
	const textarea = document.createElement('textarea');
	textarea.textContent = text;
	textarea.style.position = 'absolute';
	textarea.style.left = '-9999px';
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	document.body.removeChild(textarea);
  }
  
  
  // Function to display the error message
  function displayError(response, resultElement) {
	resultElement.innerHTML = `<p>Error: ${response.status} - ${response.statusText}</p>`;
  }
  
  // Prevent form submission and page reload
  document.getElementById("create-form").addEventListener("submit", function (event) {
	event.preventDefault();
  
	// Show the result box
	document.getElementById("result").style.display = "block";
  });
