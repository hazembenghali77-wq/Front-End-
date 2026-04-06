import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h2 className="footer-logo">SYLEZZ</h2>
        <p className="footer-tagline">
          Timeless silhouettes. Modern identity.
        </p>
      </div>

      <div className="footer-grid">
        <div className="footer-col">
          <h4>Navigation</h4>
          <a href="#">Home</a>
          <a href="#collection">Collection</a>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <a href="#collection">Shipping</a>
          <a href="#">Returns</a>
          <a href="#">FAQ</a>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>

        <div className="footer-col">
          <h4>Newsletter</h4>
          <p className="footer-news-text">
            Subscribe for exclusive drops.
          </p>
          <div className="footer-input">
            <input type="email" placeholder="Email address" />
            <button>Join</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Sylezz — All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer