import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = (props) => (<Link {...props} activeclassname="NavLink--active" />);

export default NavLink;
