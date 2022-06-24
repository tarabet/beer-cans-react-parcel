import { Link } from "react-router-dom";

export const Nav = () => {
    return (
      <ul>
          <li><Link to="/">About</Link></li>
          <li><Link to="/about">About</Link></li>
      </ul>
  )
}
