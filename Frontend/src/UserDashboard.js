import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';


const UserDashboard = () => {
  const products = [
    { id: 1, name: "Rawon Nusantara", price: 8.99, image: "https://asset.kompas.com/crops/RAkLCVPTiwC_qhG4W4wb1dN-uX4=/0x12:983x667/1200x800/data/photo/2023/11/17/6556dc6484a92.jpg?height=100&width=100" },
    { id: 2, name: "Pecel Tumpang", price: 2.49, image: "https://cdn.idntimes.com/content-images/community/2023/09/img-20230930-203702-7a1644e371f3e497fe40cd134675b078_600x400.jpg?height=100&width=100" },
    { id: 3, name: "Soto Lamongan", price: 3.99, image: "https://statik.tempo.co/data/2023/10/31/id_1250175/1250175_720.jpg?height=100&width=100" },
    { id: 4, name: "Kare Ayam", price: 3.79, image: "https://awsimages.detik.net.id/community/media/visual/2023/03/08/resep-kari-ayam-malaysia_43.jpeg?w=700&q=90?height=100&width=100" },
    { id: 5, name: "Cah Kangkung", price: 1.99, image: "https://awsimages.detik.net.id/community/media/visual/2023/07/11/resep-tumis-kangkung-saus-tiram-pedas_43.jpeg?w=700&q=90?height=100&width=100" },
    { id: 6, name: "Rendang Premium", price: 9.99, image: "https://asset.kompas.com/crops/QsUYn6p5xK4DsivCrxa0_TXdjuk=/10x36:890x623/1200x800/data/photo/2023/03/25/641e5ef63dea4.jpg?height=100&width=100" },
  ];

  const categories = ["Fruits & Vegetables", "Bakery", "Dairy & Eggs", "Meat & Seafood", "Pantry", "Frozen Foods"];
  const [email, setEmail] = useState('');

// Retrieve the username from localStorage on component mount
useEffect(() => {
    const storedEmail = localStorage.getItem('email'); // Retrieve username
    if (storedEmail) {
      setEmail(storedEmail); // Set username in state
    }
  }, []);

  const userName = email.split("@")[0];


// akan muncul banyak warning karena href tidak valid dan tidak mengarah kemanapun. 
// TIDAK APA-APA karena hanya tampilan interface placeholder untuk membedakan akses user/admin

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.headerLeft}>
            <h1 style={styles.logo}>MealKit</h1>
            <nav>
              <ul style={styles.navList}>
                <li><a href="#" style={styles.navLink}>Home</a></li>
                <li><a href="#" style={styles.navLink}>Browse</a></li>
                <li><a href="#" style={styles.navLink}>Recipes</a></li>
                <li><a href="#" style={styles.navLink}>Meal Plans</a></li>
              </ul>
            </nav>
          </div>
          <div style={styles.headerRight}>
            <button style={styles.iconButton}>🔔</button>
            <button style={styles.iconButton}>🛒</button>
            <div style={styles.avatar}>U</div>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.mainContent}>
          <div style={styles.leftColumn}>
            <h2 style={styles.welcomeMessage}>Welcome back, {userName}!!</h2>
            <h3 style={styles.notUseCase}>Note!! Bagian ini diluar Use Case Rafid, Halaman ini merupakan interface placeholder untuk membedakan akses user/admin</h3>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Quick Shop</h3>
              <p style={styles.cardDescription}>Browse our categories or search for items</p>
              <div style={styles.tabs}>
                <button style={styles.tabButton}>Categories</button>
                <button style={styles.tabButton}>Search</button>
              </div>
              <div style={styles.categoriesGrid}>
                {categories.map((category) => (
                  <button key={category} style={styles.categoryButton}>{category}</button>
                ))}
              </div>
            </div>

            <h3 style={styles.sectionTitle}>Featured Products</h3>
            <div style={styles.productsGrid}>
              {products.map((product) => (
                <div key={product.id} style={styles.productCard}>
                  <img src={product.image} alt={product.name} style={styles.productImage} />
                  <h4 style={styles.productName}>{product.name}</h4>
                  <p style={styles.productPrice}>${product.price.toFixed(2)}</p>
                  <button style={styles.addToCartButton}>Add to Cart</button>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.rightColumn}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Your Account</h3>
              <nav>
                <ul style={styles.accountLinks}>
                  <li><a href="#" style={styles.accountLink}>👤 Profile</a></li>
                  <li><a href="#" style={styles.accountLink}>🛒 Orders</a></li>
                  <Link to="/"> 🚪 Logout</Link>

                </ul>
              </nav>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Current Order</h3>
              <p style={styles.orderSummary}>You have 3 items in your cart</p>
              <button style={styles.viewCartButton}>View Cart</button>
            </div>
          </div>
        </div>
      </main>

      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>About MealKit</h3>
            <p style={styles.footerText}>MealKit is your one-stop shop for fresh, high-quality groceries delivered right to your door.</p>
          </div>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Quick Links</h3>
            <ul style={styles.footerLinks}>
              <li><a href="#" style={styles.footerLink}>FAQ</a></li>
              <li><a href="#" style={styles.footerLink}>Delivery Information</a></li>
              <li><a href="#" style={styles.footerLink}>Return Policy</a></li>
              <li><a href="#" style={styles.footerLink}>Contact Us</a></li>
            </ul>
          </div>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Newsletter</h3>
            <p style={styles.footerText}>Stay updated with our latest offers and recipes!</p>
            <div style={styles.newsletter}>
              <input type="email" placeholder="Your email" style={styles.newsletterInput} />
              <button style={styles.newsletterButton}>Subscribe</button>
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p>&copy; 2024 MealKit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    backgroundColor: 'white',
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
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#10b981',
    marginRight: '2rem',
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    padding: 0,
  },
  navLink: {
    color: '#4b5563',
    textDecoration: 'none',
    marginRight: '1rem',
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
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '1rem',
  },
  main: {
    flexGrow: 1,
    backgroundColor: '#f3f4f6',
    padding: '2rem 0',
  },
  mainContent: {
    display: 'flex',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '2rem',
  },
  leftColumn: {
    flex: '3',
  },
  rightColumn: {
    flex: '1',
  },
  welcomeMessage: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  notUseCase: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color:'red',
    marginBottom: '1rem',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    marginBottom: '2rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  cardDescription: {
    color: '#6b7280',
    marginBottom: '1rem',
  },
  tabs: {
    display: 'flex',
    marginBottom: '1rem',
  },
  tabButton: {
    padding: '0.5rem 1rem',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
  },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '1rem',
  },
  categoryButton: {
    padding: '0.5rem',
    border: '1px solid #e2e8f0',
    borderRadius: '0.25rem',
    background: 'white',
    cursor: 'pointer',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1rem',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  },
  productImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '0.25rem',
    marginBottom: '0.5rem',
  },
  productName: {
    fontWeight: 'bold',
    marginBottom: '0.25rem',
  },
  productPrice: {
    color: '#10b981',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  addToCartButton: {
    width: '100%',
    padding: '0.5rem',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
  },
  accountLinks: {
    listStyle: 'none',
    padding: 0,
  },
  accountLink: {
    display: 'block',
    padding: '0.5rem 0',
    color: '#4b5563',
    textDecoration: 'none',
  },
  orderSummary: {
    marginBottom: '1rem',
  },
  viewCartButton: {
    width: '100%',
    padding: '0.5rem',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '0.25rem',
    cursor: 'pointer',
  },
  footer: {
    backgroundColor: '#1f2937',
    color: 'white',
    padding: '2rem 0',
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  footerSection: {
    flex: 1,
    marginRight: '2rem',
  },
  footerTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  footerText: {
    marginBottom: '1rem',
  },
  footerLinks: {
    listStyle: 'none',
    padding: 0,
  },
  footerLink: {
    color: 'white',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '0.5rem',
  },
  newsletter: {
    display: 'flex',
  },
  newsletterInput: {
    flex: 1,
    padding: '0.5rem',
    border: 'none',
    borderTopLeftRadius: '0.25rem',
    borderBottomLeftRadius: '0.25rem',
  },
  newsletterButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderTopRightRadius: '0.25rem',
    borderBottomRightRadius: '0.25rem',
    cursor: 'pointer',
  },
  footerBottom: {
    borderTop: '1px solid #374151',
    marginTop: '2rem',
    paddingTop: '1rem',
    textAlign: 'center',
  },
};

export default UserDashboard;