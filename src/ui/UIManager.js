import { Toast } from './Toast.js';

export class UIManager {
  constructor(userManager) {
    this.userManager = userManager;
    this.form = document.getElementById('user-form');
    this.tableBody = document.querySelector('#users-table tbody');
    this.userIdInput = document.getElementById('user-id');
    this.submitBtn = document.getElementById('submit-btn');

    this.#bindEvents();
  }

  #bindEvents() {
    // Handle form submit
    this.form.addEventListener('submit', async e => {
      e.preventDefault();

      const id = Number(this.userIdInput.value);
      const data = {
        name: this.form.name.value.trim(),
        email: this.form.email.value.trim(),
        age: Number(this.form.age.value)
      };

      try {
        if (id) {
          await this.userManager.updateUser(id, data);
          Toast.success('User updated');
        } else {
          await this.userManager.addUser(data);
          Toast.success('User added');
        }
        this.clearForm();
        this.render();
      } catch (err) {
        Toast.error(err.message);
      }
    });

    // Handle edit / delete
    this.tableBody.addEventListener('click', async e => {
      const btn = e.target.closest('button');
      if (!btn) return;

      const id = Number(btn.dataset.id);
      const action = btn.dataset.action;

      if (action === 'edit') {
        this.editUser(id);
      } else if (action === 'delete') {
        await this.confirmDelete(id);
      }
    });
  }

  render() {
    const users = this.userManager.getAll();
    this.tableBody.innerHTML = '';

    for (const user of users) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.age}</td>
        <td>
          <button data-action="edit" data-id="${user.id}">✏️ Edit</button>
          <button data-action="delete" data-id="${user.id}">🗑️ Delete</button>
        </td>
      `;
      this.tableBody.appendChild(row);
    }
  }

  editUser(id) {
    const user = this.userManager.getUser(id);
    this.userIdInput.value = user.id;
    this.form.name.value = user.name;
    this.form.email.value = user.email;
    this.form.age.value = user.age;
    this.submitBtn.textContent = 'Update User';
  }

  async confirmDelete(id) {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await this.userManager.deleteUser(id);
        Toast.success('User deleted');
        this.render();
      } catch (err) {
        Toast.error(err.message);
      }
    }
  }

  clearForm() {
    this.form.reset();
    this.userIdInput.value = '';
    this.submitBtn.textContent = 'Add User';
  }
}
