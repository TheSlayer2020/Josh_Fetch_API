const apiUrl = "https://jsonplaceholder.typicode.com/posts";

function handleResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
  alert("ok");
}

let currentDisplay = null; // To track the current displayed section

function getData() {
  // Clear the previous data
  if (currentDisplay) {
    currentDisplay.style.display = "none";
  }

  // Show the data display section
  const dataDisplay = document.getElementById("dataDisplay");
  dataDisplay.style.display = "block";

  currentDisplay = dataDisplay; // Update the current displayed section

  // Fetch and display data
  fetch(apiUrl)
    .then(handleResponse)
    .then((data) => {
      const innerHTMLContent = Object.keys(data)
        .map(
          (key) => `
                <p><span style="color: white;">${key}:</span></p>
                <pre><span style="color: white;">${JSON.stringify(
                  data[key],
                  null,
                  2
                )}</span></pre>
            `
        )
        .join("");

      dataDisplay.innerHTML = innerHTMLContent;

      // Log the data to the console
      console.log("Retrieved Data:", data);

      alert("The Data has been retrieved");
    })
    .catch((error) => console.error("Error:", error));
}

function updateData() {
  // Clear the previous data
  if (currentDisplay) {
    currentDisplay.style.display = "none";
  }

  // Show the update data display
  const updatedDataElement = document.getElementById("updatedData");
  updatedDataElement.style.display = "block";

  currentDisplay = updatedDataElement; // Update the current displayed section

  const updatedPostData = {
    title: "Web Designer 2023",
    body: "Create engaging videos, images, and HTML5-based designs for your business that can run on any device.",
  };

  const postId = 1; // Update post with ID 1

  fetch(`${apiUrl}/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPostData),
  })
    .then(handleResponse)
    .then((data) => {
      const formattedData = `
        <pre class="white-text">
            Updated Data: {<br>
                title: '${data.title}',<br>
                body: '${data.body}',<br>
                &nbsp;id: ${data.id}<br>
            }
        </pre>
        <pre class="white-text">
            body : "${data.body}"<br>
            id : ${data.id}<br>
            title : "${data.title}"
        </pre>
    `;
      // Set the content in the updatedDataElement
      updatedDataElement.innerHTML = formattedData;
      updatedDataElement.classList.add("updated-data");

      console.log("Updated Data:", data);
      alert("Here is The Updated Data");
    })
    .catch((error) => console.error("Error:", error));
}

function createData() {
  // Clear the previous data
  if (currentDisplay) {
    currentDisplay.style.display = "none";
  }

  // Show the create data display
  const createdDataElement = document.getElementById("createdData");
  createdDataElement.style.display = "block";

  currentDisplay = createdDataElement; // Update the current displayed section

  const postData = {
    userId: 1,
    title: "The Programmer 2023",
    body: "Programming is writing computer code to create a program",
  };

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then(handleResponse)
    .then((data) => {
      const outputContent = `
                <p>Created Data:</p>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            `;
      // Set the content in the createdDataElement
      createdDataElement.innerHTML = outputContent;

      // Log the data to the console
      console.log("Created Data:", data);

      alert("The Data has been created");
    })
    .catch((error) => console.error("Error:", error));
}

function deleteData() {
  // Clear the previous data
  if (currentDisplay) {
    currentDisplay.style.display = "none";
  }

  // Show the deleted data display
  const deletedDataElement = document.getElementById("deletedData");
  deletedDataElement.style.display = "block";

  currentDisplay = deletedDataElement; // Update the current displayed section

  const postId = 1; // Delete post with ID 1

  fetch(`${apiUrl}/${postId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.status === 200) {
        console.log("Data deleted successfully.");

        const formattedData = `
                    <pre>
                        Deleted Data: {<br>
                            title: 'Web Designer 2023',<br>
                            body: 'Create engaging videos, images, and HTML5-based designs for your business that can run on any device.',<br>
                            id: 1<br>
                        }
                    </pre>
                    <pre>
                        body : "Create engaging videos, images, and HTML5-based designs for your business that can run on any device."<br>
                        id : 1<br>
                        title : "Web Designer 2023"
                    </pre>
                `;

        // Set the content of 'deletedData'
        deletedDataElement.innerHTML = formattedData;

        alert("Data has been deleted successfully.");
      } else {
        console.error("Error:", response.statusText);
      }
    })
    .catch((error) => console.error("Error:", error));
}
