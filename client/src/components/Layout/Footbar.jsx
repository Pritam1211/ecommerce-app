import React from 'react'
import { Link } from 'react-router-dom';
const Footbar = () => {
  return (
    <div className="footer">
      <h4 className="text-left">All Right Reserved &copy; Techinfoyt</h4>
      <p className="text-right">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  )
}

export default Footbar