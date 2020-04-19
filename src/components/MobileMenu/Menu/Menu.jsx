import React from 'react';
import { bool } from 'prop-types';
import { Link } from 'react-router-dom';
import { StyledMenu } from './Menu.styled';
import Switch from 'react-switch'

const Menu = ({ open, ...props }) => {
  
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <ul className="navbar">
          <Link to="/"><li>Home</li></Link>
          <Link to="/about-corona"><li>About Corona</li></Link>
          <Link to="/corona-patients-in-world"><li>World Data</li></Link>
          <Link to="/donate"><li>Donate</li></Link>
          <li className="mobileMode">
              <span style={{ marginRight: "0px", paddingRight: "4px", paddingBottom: '15px', fontSize: "15px" }}>Dark Mode</span>
              <Switch /*onChange={this.toggleSwitch}
                  checked={this.state.switched && localStorage.getItem('ncovindia_isDark') === 'true'} */
                  className="react-switch"
                  height={21}
                  width={40}
              />
          </li>
      </ul>
    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;