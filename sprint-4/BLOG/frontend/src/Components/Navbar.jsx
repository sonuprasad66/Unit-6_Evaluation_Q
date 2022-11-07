import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
	return (
		<div style={{display:"flex",justifyContent:"space-around"}}>
			<Link to="/">Home</Link>
			<Link to="/signup">Signup</Link>
			<Link to="/login">Login</Link>
			<Link to="/blogs">Your Blogs</Link>
		</div>
	)
}

export default Navbar