import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';


const AdminDashboard = () => {
  const foodItems = [
    { id: 1, name: 'Fresh Organic Apples', category: 'Fruits & Vegetables', price: 3.99, stock: 50 },
    { id: 2, name: 'Whole Grain Bread', category: 'Bakery', price: 2.49, stock: 120 },
    { id: 3, name: 'Free-Range Eggs (Dozen)', category: 'Dairy & Eggs', price: 4.99, stock: 200 },
    { id: 4, name: 'Organic Milk', category: 'Dairy & Eggs', price: 3.79, stock: 80 },
    { id: 5, name: 'Lean Ground Beef', category: 'Meat & Seafood', price: 5.99, stock: 30 },
    { id: 6, name: 'Fresh Atlantic Salmon', category: 'Meat & Seafood', price: 9.99, stock: 15 },
  ];

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
    { id: 3, name: 'Robert Brown', email: 'robert@example.com', role: 'Admin', status: 'Active' },
    { id: 4, name: 'Alice Johnson', email: 'alice@example.com', role: 'User', status: 'Active' },
    { id: 5, name: 'Chris Lee', email: 'chris@example.com', role: 'Admin', status: 'Inactive' },
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <h1 style={styles.logo}>MealKit</h1>
          </div>
          <div style={styles.headerMiddle}>
            <h1 style={styles.biggerLogo}>Admin Dashboard</h1>
          </div>
          <div style={styles.headerRight}>
          <Link to="/"><button style={styles.logoutButton}> Logout</button></Link>
          </div>
        </div>
      </header>

      <div style={styles.logout}>
      
      </div>
      <main style={styles.main}>
      <div style={styles.actions}>
          <button style={styles.button}>Add New Food Item</button>
          <button style={styles.button}>Update Food Item</button>
          <button style={styles.button}>View Reports</button>
        </div>
        <h2 style={styles.sectionTitle}>Food Items</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Stock</th>
            </tr>
          </thead>
          <tbody>
            {foodItems.map(item => (
              <tr key={item.id}>
                <td style={styles.td}>{item.id}</td>
                <td style={styles.td}>{item.name}</td>
                <td style={styles.td}>{item.category}</td>
                <td style={styles.td}>${item.price.toFixed(2)}</td>
                <td style={styles.td}>{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 style={styles.sectionTitle}>Users</h2>
        <div style={styles.actions}>
        <button style={styles.button}>Add New User</button>
        <button style={styles.button}>Update User</button>
        <button style={styles.button}>Delete User</button>
        </div>
        
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td style={styles.td}>{user.id}</td>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.role}</td>
                <td style={styles.td}>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        
      </main>

      <footer style={styles.footer}>
        <p>&copy; 2024 Admin Dashboard. All rights reserved.</p>
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
    backgroundColor: '#f4f4f9',
  },
  header: {
    backgroundColor: '#2eb82e',
    borderBottom: '1px solid #e2e8f0',
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  headerMiddle:{
    display:'flex',
    textAlign:'middle'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    marginRight: '2rem',
  },
  biggerLogo: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: 'white',
    marginRight: '2rem',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.25rem',
    cursor: 'pointer',
    marginLeft: '1rem',
  },
  main: {
    flexGrow: 1,
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '2rem',
  },
  th: {
    backgroundColor: '#f2f2f2',
    padding: '8px',
    textAlign: 'left',
    border: '1px solid #ddd',
  },
  td: {
    padding: '8px',
    textAlign: 'left',
    border: '1px solid #ddd',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
  },
  logoutButton: {
    padding: '0.8rem 1.5rem',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
  },
  button: {
    padding: '0.8rem 1.5rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
  },
  footer: {
    backgroundColor: '#333',
    color: 'white',
    textAlign: 'center',
    padding: '1rem',
    marginTop: '2rem',
  },
  logout: {
    textAlign: 'right',
  },
  
};

export default AdminDashboard;
