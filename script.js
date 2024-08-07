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

            document.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', handleEdit);
            });

            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', handleDelete);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

function handleEdit(event) {
    const pfNumber = event.target.dataset.id;
    fetch(`/employees/${pfNumber}`)
        .then(response => response.json())
        .then(employee => {
            document.querySelector('#edit-pf_number').value = employee.pf_number;
            document.querySelector('#edit-first_name').value = employee.first_name;
            document.querySelector('#edit-last_name').value = employee.last_name;
            document.querySelector('#edit-gender').value = employee.gender;
            document.querySelector('#edit-date_of_birth').value = employee.date_of_birth;
            document.querySelector('#edit-email').value = employee.email;
            document.querySelector('#edit-phone_number').value = employee.phone_number;
            document.querySelector('#edit-preferred_notification_method').value = employee.preferred_notification_method;
            document.querySelector('#edit-department').value = employee.department;

            const editModal = document.querySelector('#editModal');
            editModal.style.display = 'block';

            const closeModal = document.querySelector('.close');
            closeModal.onclick = function () {
                editModal.style.display = 'none';
            }

            window.onclick = function (event) {
                if (event.target == editModal) {
                    editModal.style.display = 'none';
                }
            }
        })
        .catch(error => console.error('Error fetching employee data:', error));
}

document.querySelector('#editForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const pfNumber = document.querySelector('#edit-pf_number').value;
    const updatedEmployee = {
        first_name: document.querySelector('#edit-first_name').value,
        last_name: document.querySelector('#edit-last_name').value,
        gender: document.querySelector('#edit-gender').value,
        date_of_birth: document.querySelector('#edit-date_of_birth').value,
        email: document.querySelector('#edit-email').value,
        phone_number: document.querySelector('#edit-phone_number').value,
        preferred_notification_method: document.querySelector('#edit-preferred_notification_method').value,
        department: document.querySelector('#edit-department').value
    };

    fetch(`/employees/${pfNumber}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEmployee)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Employee updated successfully') {
            const editModal = document.querySelector('#editModal');
            editModal.style.display = 'none';
            location.reload(); // Reload the page to see the updated data
        } else {
            console.error('Failed to update employee');
        }
    })
    .catch(error => console.error('Error updating employee:', error));
});

function handleDelete(event) {
    const pfNumber = event.target.dataset.id;

    fetch(`/employees/${pfNumber}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            event.target.closest('tr').remove();
        } else {
            console.error('Failed to delete employee');
        }
    })
    .catch(error => console.error('Error deleting employee:', error));
}
