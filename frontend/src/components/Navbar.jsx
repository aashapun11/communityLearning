import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard"></Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
