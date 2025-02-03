// creating pagination
const pages = document.querySelectorAll('.page');
const totalPages = pages.length;
let currentPage = 1;

function showPage(pageNumber) {
  pages.forEach((page, index) => {
    if (index + 1 === pageNumber) {
      page.classList.add('visible');
    } else {
      page.classList.remove('visible');
    }
  });
}

function renderPagination() {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  // Previous button
  const prevButton = document.createElement('button');
  prevButton.textContent = 'Previous';
  prevButton.disabled = currentPage === 1;
  prevButton.addEventListener('click', () => {
    currentPage--;
    updatePagination();
  });
  pagination.appendChild(prevButton);

  // Page buttons
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.classList.toggle('active', currentPage === i);
    pageButton.addEventListener('click', () => {
      currentPage = i;
      updatePagination();
    });
    pagination.appendChild(pageButton);
  }

  // Next button
  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.disabled = currentPage === totalPages;
  nextButton.addEventListener('click', () => {
    currentPage++;
    updatePagination();
  });
  pagination.appendChild(nextButton);
}

function updatePagination() {
  showPage(currentPage);
  renderPagination();
}

// Initialize the pagination
updatePagination();


// CREATING SIGNATURE

const canvas = document.getElementById('signature-pad');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clear-button');
const saveButton = document.getElementById('save-button');
const img = document.getElementById("image_signature");

let isDrawing = false;

// Function to start drawing
function startDrawing(event) {
  isDrawing = true;
  const { offsetX, offsetY } = getEventCoordinates(event);
  ctx.beginPath();
  ctx.moveTo(offsetX, offsetY);
}

// Function to draw
function draw(event) {
  if (!isDrawing) return;
  const { offsetX, offsetY } = getEventCoordinates(event);
  ctx.lineTo(offsetX, offsetY);
  ctx.stroke();
}

// Function to stop drawing
function stopDrawing() {
  isDrawing = false;
  ctx.closePath();
}

// Helper function to get coordinates for mouse or touch events
function getEventCoordinates(event) {
  if (event.touches) {
    const rect = canvas.getBoundingClientRect();
    return {
      offsetX: event.touches[0].clientX - rect.left,
      offsetY: event.touches[0].clientY - rect.top
    };
  } else {
    return {
      offsetX: event.offsetX,
      offsetY: event.offsetY
    };
  }
}

// Mouse Events
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Touch Events
canvas.addEventListener('touchstart', (event) => {
  event.preventDefault();
  startDrawing(event);
});
canvas.addEventListener('touchmove', (event) => {
  event.preventDefault();
  draw(event);
});
canvas.addEventListener('touchend', (event) => {
  event.preventDefault();
  stopDrawing();
});

// Clear button functionality
clearButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save button functionality
saveButton.addEventListener('click', () => {
  const dataURL = canvas.toDataURL();

  img.src = `${dataURL}`;

  // you can send that dataurl to the server and decode it to png format

  // implementing download function
/*
  const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png'); // Set the image format
    link.download = 'signature.png'; // Set the file name
    link.click(); // Trigger the download
*/

});
