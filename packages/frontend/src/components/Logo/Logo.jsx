import { Row } from "react-bootstrap";

const Logo = () => (
    <Row>

<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="80" fill="#282c34" stroke="#61dafb" strokeWidth="10"/>

  <text x="100" y="75" fontFamily="Arial, sans-serif" fontSize="24" fill="#61dafb" textAnchor="middle" alignmentBaseline="middle">My movies</text>
  
  <circle cx="50" cy="50" r="10" fill="#61dafb"/>
  <circle cx="150" cy="50" r="10" fill="#61dafb"/>
  <circle cx="50" cy="150" r="10" fill="#61dafb"/>
  <circle cx="150" cy="150" r="10" fill="#61dafb"/>
  <circle cx="100" cy="100" r="10" fill="#61dafb"/>
  
  <text x="100" y="130" fontFamily="Arial, sans-serif" fontSize="24" fill="#61dafb" textAnchor="middle" alignmentBaseline="middle">Database</text>
</svg>
    </Row>


);

export default Logo;
