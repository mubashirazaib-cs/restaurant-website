import React, { useState } from 'react'
import './App.css'
import biryaniImage from './assets/biryani.jpg'
import kebabImage from './assets/kebab.jpg'
import heroImage from './assets/hero.jpg'

const menuItems = [
  {
    id: 1,
    name: 'Biryani',
    price: 350,
    desc: 'Fragrant rice with tender meat and warming spices.',
    image: biryaniImage,
  },
  {
    id: 2,
    name: 'Karahi',
    price: 850,
    desc: 'Rich tomato gravy loaded with herbs and charred flavor.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600',
  },
  {
    id: 3,
    name: 'Nihari',
    price: 400,
    desc: 'Slow-cooked, melt-in-your-mouth beef stew.',
    image: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=600',
  },
  {
    id: 4,
    name: 'Seekh Kebab',
    price: 280,
    desc: 'Smoky minced meat skewers served hot and fresh.',
    image: kebabImage,
  },
]

const storyHighlights = [
  {
    title: 'Traditional taste',
    body: 'Every dish is cooked with spice, patience, and a deep respect for family recipes.',
  },
  {
    title: 'Freshly prepared',
    body: 'We serve meals made from scratch to bring warmth and comfort to every table.',
  },
]

function App() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0)

  const addToCart = (item) => {
    setCart((current) => {
      const existing = current.find((entry) => entry.id === item.id)
      if (existing) {
        return current.map((entry) =>
          entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry,
        )
      }
      return [...current, { ...item, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  const updateQuantity = (itemId, delta) => {
    setCart((current) =>
      current
        .map((entry) =>
          entry.id === itemId ? { ...entry, quantity: Math.max(0, entry.quantity + delta) } : entry,
        )
        .filter((entry) => entry.quantity > 0),
    )
  }

  const removeFromCart = (itemId) => {
    setCart((current) => current.filter((entry) => entry.id !== itemId))
  }

  return (
    <div className="page-shell">
      <nav className="top-nav">
        <a href="#home" className="brand">🍛 Yummy Bites</a>
        <div className="nav-links">
          <a href="#menu">Menu</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <header id="home" className="hero-section">
        <div className="hero-overlay">
          <p className="eyebrow">Authentic Pakistani cuisine</p>
          <h1>Bold flavors, warm hospitality, and comfort in every bite.</h1>
          <p className="hero-copy">From fragrant biryani to sizzling karahi, we bring the soul of Pakistani food to your table.</p>
          <div className="hero-actions">
            <a href="#menu" className="primary-btn">Explore Menu</a>
            <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer" className="secondary-btn">Order on WhatsApp</a>
          </div>
        </div>
      </header>

      <section id="menu" className="section menu-section">
        <div className="section-heading">
          <p className="eyebrow">Signature dishes</p>
          <h2>Freshly made favorites</h2>
        </div>
        <div className="menu-grid">
          {menuItems.map((item) => (
            <article key={item.id} className="menu-card">
              <img src={item.image} alt={item.name} />
              <div className="menu-card-overlay">
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <div className="overlay-price">Rs. {item.price}</div>
                <button type="button" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
              <div className="menu-card-info">
                <h3>{item.name}</h3>
                <span>Rs. {item.price}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="section about-section">
        <div className="about-card">
          <div>
            <p className="eyebrow">Our story</p>
            <h2>A family recipe legacy from Karachi</h2>
            <p>Founded in 2010, Yummy Bites has been serving authentic Pakistani cuisine with love, tradition, and a modern touch. Every recipe is prepared fresh daily using time-honored techniques.</p>
          </div>
          <div className="story-visuals">
            {storyHighlights.map((item) => (
              <div key={item.title} className="story-card story-card-text">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div className="contact-card">
          <div>
            <p className="eyebrow">Visit us</p>
            <h2>Come hungry and leave happy</h2>
            <p>📍 Block 5, Clifton, Karachi</p>
            <p>📞 0300-1234567</p>
            <p>🕐 Open daily: 12pm – 12am</p>
          </div>
          <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer" className="primary-btn contact-btn">💬 Chat on WhatsApp</a>
        </div>
      </section>

      <button
        type="button"
        className="cart-toggle"
        aria-label="Open shopping cart"
        onClick={() => setIsCartOpen((open) => !open)}
      >
        🛒
        <span>{cartCount}</span>
      </button>

      <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`} aria-label="shopping cart">
        <div className="cart-drawer-header">
          <div>
            <h3>Your Cart</h3>
            <p>{cartCount} items</p>
          </div>
          <button type="button" className="close-cart" onClick={() => setIsCartOpen(false)}>
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="cart-empty">Your cart is empty. Add a favorite dish to get started.</p>
        ) : (
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <div>
                  <strong>{item.name}</strong>
                  <p>Rs. {item.price} × {item.quantity}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button type="button" onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                  <span>Rs. {item.quantity * item.price}</span>
                  <button type="button" onClick={() => removeFromCart(item.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="cart-actions">
          <div className="cart-total">Total: Rs. {total}</div>
          <button type="button" className="checkout-btn" onClick={() => setIsCartOpen(false)}>
            Checkout
          </button>
        </div>
      </aside>
    </div>
  )
}

export default App