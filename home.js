document.addEventListener('DOMContentLoaded', () => {
    fetch('/employees')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#employeeTable tbody');
            tableBody.innerHTML = data.map(employee => `
                <tr>
                    <td>${employee.pf_number}</td>
                    <td>${employee.first_name}</td>
                    <td>${employee.last_name}</td>
                    <td>${employee.gender}</td>
                    <td>${employee.date_of_birth}</td>
                    <td>${employee.email}</td>
                    <td>${employee.phone_number}</td>
                    <td>${employee.preferred_notification_method}</td>
                    <td>${employee.department}</td>
                    <td>
                        <button class="edit-btn" data-id="${employee.pf_number}">Edit</button>
                        <button class="delete-btn" data-id="${employee.pf_number}">Delete</button>
                    </td>
                </tr>
            `).join('');
        });

    document.getElementById('employeeForm').addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const employeeData = Object.fromEntries(formData.entries());

        fetch('/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeData),
        })
        .then(response => response.json())
        .then(data => {
            // handle response data
        });
    });

    document.getElementById('employeeTable').addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-btn')) {
            const pfNumber = event.target.dataset.id;
            fetch(`/employees/${pfNumber}`)
                .then(response => response.json())
                .then(data => {
                    // Populate the form with the employee data for editing
                });
        } else if (event.target.classList.contains('delete-btn')) {
            const pfNumber = event.target.dataset.id;
            fetch(`/employees/${pfNumber}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                // handle response data
            });
        }
    });

    const formResetButton = document.getElementById('formResetButton');
    if (formResetButton) {
        formResetButton.addEventListener('click', () => {
            document.getElementById('employeeForm').reset();
        });
    }
});

function revealFlashcards() {
    const flashcardsContainer = document.querySelector('.flashcards-container');
    const closeIcon = document.querySelector('.close-icon');
    flashcardsContainer.classList.add('visible');
    flashcardsContainer.classList.remove('hidden');
    closeIcon.style.display = 'block';
}

function hideFlashcards() {
    const flashcardsContainer = document.querySelector('.flashcards-container');
    const closeIcon = document.querySelector('.close-icon');
    flashcardsContainer.classList.remove('visible');
    flashcardsContainer.classList.add('hidden');
    closeIcon.style.display = 'none';
}

// scripts.js

document.addEventListener('DOMContentLoaded', function() {
    const openModalButton = document.getElementById('open-login-modal');
    const closeModalButton = document.getElementById('close-login-modal');
    const modal = document.getElementById('login-modal');

    // Show modal
    openModalButton.addEventListener('click', function() {
        modal.style.display = 'flex'; // Show the modal
    });

    // Hide modal
    closeModalButton.addEventListener('click', function() {
        modal.style.display = 'none'; // Hide the modal
    });

    // Close modal if clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none'; // Hide the modal
        }
    });
});


document.getElementById('login-icon').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    document.getElementById('login-modal').style.display = 'flex';
});

document.getElementById('close-login-modal').addEventListener('click', function() {
    document.getElementById('login-modal').style.display = 'none';
});

window.addEventListener('click', function(event) {
    const modal = document.getElementById('login-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

