import { useNavigate, Link, useLocation } from 'react-router-dom';

import React, { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin' },
  ]);
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Chicken Stir Fry', price: 12.99, category: 'Main Course' },
    { id: 2, name: 'Vegetable Soup', price: 8.99, category: 'Appetizer' },
  ]);
  const [availability, setAvailability] = useState([
    { id: 1, item: 'Chicken Stir Fry', date: '2024-03-01', quantity: 50 },
    { id: 2, item: 'Vegetable Soup', date: '2024-03-01', quantity: 30 },
  ]);

  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User' });
  const [newMenuItem, setNewMenuItem] = useState({ name: '', price: '', category: 'Main Course' });
  const [newAvailability, setNewAvailability] = useState({ item: '', date: '', quantity: '' });

  const addUser = () => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ name: '', email: '', role: 'User' });
  };

  const addMenuItem = () => {
    setMenuItems([...menuItems, { ...newMenuItem, id: menuItems.length + 1, price: parseFloat(newMenuItem.price) }]);
    setNewMenuItem({ name: '', price: '', category: 'Main Course' });
  };

  const addAvailability = () => {
    setAvailability([...availability, { ...newAvailability, id: availability.length + 1, quantity: parseInt(newAvailability.quantity) }]);
    setNewAvailability({ item: '', date: '', quantity: '' });
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const deleteMenuItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const updateAvailability = (id, newQuantity) => {
    setAvailability(availability.map(item => 
      item.id === id ? { ...item, quantity: parseInt(newQuantity) } : item
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return (
          <div>
            <h2>User Management</h2>
            <div style={styles.form}>
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                style={styles.input}
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                style={styles.input}
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                style={styles.input}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
              <button onClick={addUser} style={styles.button}>Add User</button>
            </div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button onClick={() => deleteUser(user.id)} style={styles.deleteButton}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'menu':
        return (
          <div>
            <h2>Menu Management</h2>
            <div style={styles.form}>
              <input
                type="text"
                placeholder="Item Name"
                value={newMenuItem.name}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                style={styles.input}
              />
              <input
                type="number"
                placeholder="Price"
                value={newMenuItem.price}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                style={styles.input}
              />
              <select
                value={newMenuItem.category}
                onChange={(e) => setNewMenuItem({ ...newMenuItem, category: e.target.value })}
                style={styles.input}
              >
                <option value="Main Course">Main Course</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Dessert">Dessert</option>
              </select>
              <button onClick={addMenuItem} style={styles.button}>Add Item</button>
            </div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.category}</td>
                    <td>
                      <button onClick={() => deleteMenuItem(item.id)} style={styles.deleteButton}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'availability':
        return (
          <div>
            <h2>Availability Management</h2>
            <div style={styles.form}>
              <input
                type="text"
                placeholder="Item Name"
                value={newAvailability.item}
                onChange={(e) => setNewAvailability({ ...newAvailability, item: e.target.value })}
                style={styles.input}
              />
              <input
                type="date"
                value={newAvailability.date}
                onChange={(e) => setNewAvailability({ ...newAvailability, date: e.target.value })}
                style={styles.input}
              />
              <input
                type="number"
                placeholder="Quantity"
                value={newAvailability.quantity}
                onChange={(e) => setNewAvailability({ ...newAvailability, quantity: e.target.value })}
                style={styles.input}
              />
              <button onClick={addAvailability} style={styles.button}>Add Availability</button>
            </div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Item</th>
                  <th>Date</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {availability.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.item}</td>
                    <td>{item.date}</td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateAvailability(item.id, e.target.value)}
                        style={styles.quantityInput}
                      />
                    </td>
                    <td>
                      <button onClick={() => updateAvailability(item.id, item.quantity)} style={styles.updateButton}>Update</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return (
          <div>
            <h2>Dashboard</h2>
            <div style={styles.statsContainer}>
              <div style={styles.statBox}>
                <h3>Total Users</h3>
                <p>{users.length}</p>
              </div>
              <div style={styles.statBox}>
                <h3>Active Menu Items</h3>
                <p>{menuItems.length}</p>
              </div>
              <div style={styles.statBox}>
                <h3>Total Availability</h3>
                <p>{availability.reduce((sum, item) => sum + item.quantity, 0)}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>MealKit Admin</h1>
        <Link to="/"><button style={styles.logoutButton}> Logout</button></Link>
      </header>
      <div style={styles.content}>
        <nav style={styles.sidebar}>
          {['dashboard', 'users', 'menu', 'availability'].map((tab) => (
            <button
              key={tab}
              style={{
                ...styles.tab,
                ...(activeTab === tab ? styles.activeTab : {}),
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
        <main style={styles.main}>
          {renderContent()}
        </main>
      </div>
      <footer style={styles.footer}>
        <p>&copy; 2024 MealKit Admin. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  header: {
    backgroundColor: '#2eb82e',
    color: 'white',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
  },
  content: {
    display: 'flex',
    flex: 1,
  },
  sidebar: {
    width: '200px',
    backgroundColor: '#f4f4f9',
    padding: '1rem',
  },
  main: {
    flex: 1,
    padding: '1rem',
  },
  footer: {
    backgroundColor: '#333',
    color: 'white',
    textAlign: 'center',
    padding: '1rem',
  },
  logoutButton: {
    padding: '0.5rem 1rem',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  tab: {
    display: 'block',
    width: '100%',
    padding: '0.5rem',
    marginBottom: '0.5rem',
    backgroundColor: '#e0e0e0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'left',
  },
  activeTab: {
    backgroundColor: '#2eb82e',
    color: 'white',
  },
  form: {
    marginBottom: '1rem',
  },
  input: {
    marginRight: '0.5rem',
    padding: '0.5rem',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#2eb82e',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  deleteButton: {
    padding: '0.25rem 0.5rem',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  updateButton: {
    padding: '0.25rem 0.5rem',
    backgroundColor: '#2eb82e',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  quantityInput: {
    width: '50px',
    padding: '0.25rem',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    margin: '0.5rem',
    padding: '1rem',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    textAlign: 'center',
  },
};

export default AdminDashboard;
