import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, IconButton, Toolbar, Typography } from 'material-ui';
import MenuIcon from 'material-ui-icons/Menu';
import FlipIcon from 'material-ui-icons/Flip';
import './top-bar.css'
import { browserHistory } from "react-router";

export default class TopBar extends React.Component {

  goToScan() {
    browserHistory.push('/scan');
  }

  render() {
    const {text} = this.props;

    return (
      <div>
        <AppBar position="static" className="Top-Bar">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon/>
            </IconButton>
            <Typography variant="title" color="inherit">
              {text}
            </Typography>
          </Toolbar>
          <div className="Top-Bar-Scan">
            <IconButton onClick={this.goToScan}>
              <FlipIcon style={{color: 'white', fontSize: '26px'}}/>
            </IconButton>
          </div>
        </AppBar>
      </div>
    )
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
};