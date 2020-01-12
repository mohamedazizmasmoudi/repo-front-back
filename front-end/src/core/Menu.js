import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth';

const isActive = (history, path) => {
	if (history.location.pathname === path) return {color: '#ff9900'};
	else return {color: '#ffffff'};
};

const Menu = ({history}) => (
	
	<div>
	     <ul className="nav nav-tabs bg-primary">
	         <li className="nav-item">
	             <Link className="nav-link" style={isActive(history, '/')} to="/">
	                 Home
	             </Link>
	         </li>


	    

	         {!isAuthenticated() && (
	             <React.Fragment>
	                 <li className="nav-item">
	                     <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">
	                         Sign In
	                     </Link>
	                 </li>
	                 <li className="nav-item">
	                     <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">
	                         Sign Up
	                     </Link>
	                 </li>
	             </React.Fragment>
	         )}

	         {isAuthenticated() && isAuthenticated().user.role === 'admin' && (
	             <li className="nav-item">
	                 <Link to={`/admin`} style={isActive(history, `/admin`)} className="nav-link">
	                     Admin
	                 </Link>
	             </li>
	         )}

	         {isAuthenticated() && (
	             <React.Fragment>
	          
	            

	                 <li className="nav-item">
	                     <span
	                         className="nav-link"
	                         style={{ cursor: 'pointer', color: '#fff' }}
	                         onClick={() => signout(() => history.push('/'))}
	                     >
	                         Sign Out
	                     </span>
	                 </li>
	             </React.Fragment>
	         )}
	     </ul>
	 </div>
);

export default withRouter(Menu);
