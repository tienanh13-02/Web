// Đây là phần nhân viên
let employees = JSON.parse(localStorage.getItem('employees')) || [];

function saveData() {
  localStorage.setItem('employees', JSON.stringify(employees));
}

function renderEmployees() {
  const tbody = document.getElementById('employeeList');
  tbody.innerHTML = '';
  employees.forEach((emp, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${emp.name}</td>
        <td>${emp.role}</td>
        <td>${emp.salary}</td>
        <td>
          <button onclick="editEmployee(${index})">Sửa</button>
          <button onclick="deleteEmployee(${index})">Xóa</button>
        </td>
      </tr>
    `;
  });
}

function addEmployee() {
  const name = document.getElementById('name').value.trim();
  const role = document.getElementById('role').value.trim();
  const salary = document.getElementById('salary').value.trim();

  if (!name || !role || !salary) {
    alert('Vui lòng nhập đủ thông tin!');
    return;
  }

  employees.push({ name, role, salary });
  saveData();
  renderEmployees();

  document.getElementById('name').value = '';
  document.getElementById('role').value = '';
  document.getElementById('salary').value = '';
}

function deleteEmployee(index) {
  if (confirm('Bạn có chắc muốn xóa nhân viên này?')) {
    employees.splice(index, 1);
    saveData();
    renderEmployees();
  }
}

function editEmployee(index) {
  const emp = employees[index];
  const newName = prompt('Tên mới:', emp.name);
  const newRole = prompt('Chức vụ mới:', emp.role);
  const newSalary = prompt('Lương mới:', emp.salary);

  if (newName && newRole && newSalary) {
    employees[index] = { name: newName, role: newRole, salary: newSalary };
    saveData();
    renderEmployees();
  }
}

document.getElementById('addBtn').addEventListener('click', addEmployee);
renderEmployees();

