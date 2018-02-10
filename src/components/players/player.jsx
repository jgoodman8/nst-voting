import React from "react";
import './player.css';
import { Card, CardActions, CardContent, IconButton, Snackbar, Typography } from "material-ui";
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';
import CloseIcon from 'material-ui-icons/Close';
import { browserHistory } from "react-router";
import { dictionary, getYears } from "../../logic/players";

const styles = {
  color: 'grey'
};

export default class Player extends React.Component {

  constructor() {
    super();

    this.state = {
      open: false
    };

    this.vote = this.vote.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.goToProfile = this.goToProfile.bind(this);
  }

  vote() {
    this.setState({
      open: true,
      message: 'Voted! You have 5 votes remaining'
    })
  }

  goToProfile() {
    const {player} = this.props;
    browserHistory.push(`/player/${player.cod_player}`);
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({open: false});
  };

  renderMessage() {

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.state.message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleClose}
          >
            <CloseIcon/>
          </IconButton>,
        ]}
      />
    )
  }

  render() {
    const {player} = this.props;
    const message = this.renderMessage();
    const age = getYears(player.birth_date);

    return (
      <div className="Player">
        <Card>
          <div className="Player-Content">
            <img src={player.photo} onClick={this.goToProfile}/>
            <div className="Player-Info">
              <CardContent className="player-title">
                <Typography variant="headline" component="h2">
                  {player.player_name}
                </Typography>
                <p className="player-age">{`${age} años`}</p>
                <p className="player-position">{dictionary[player.position]}</p>
              </CardContent>
              <CardActions className="Player-Vote">
                <IconButton onClick={this.vote}>
                  <ThumbDown style={styles}/>
                </IconButton>
                <IconButton onClick={this.vote}>
                  <ThumbUp style={styles}/>
                </IconButton>
              </CardActions>
            </div>
          </div>
        </Card>

        {message}
      </div>
    )
  }
}