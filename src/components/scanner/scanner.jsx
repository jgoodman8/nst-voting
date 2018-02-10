import React from 'react';
// import PropTypes from 'prop-types';
import Quagga from 'quagga';
import './scanner.css'
import { Button, Icon, IconButton } from "material-ui";
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import { browserHistory } from "react-router";

export default class Scanner extends React.Component {

  constructor() {
    super();

    this.state = {
      scannerState: false
    };

    this.init = this.init.bind(this);
    this.handleInit = this.handleInit.bind(this);
    this.handleDetected = this.handleDetected.bind(this);
    this.showScanner = this.showScanner.bind(this);
    this.hideScanner = this.hideScanner.bind(this);
  }

  componentWillUnmount() {
    this.stop();
  }

  goBack() {
    browserHistory.push('/home');
  }


  componentDidMount() {
    setTimeout(this.showScanner, 1000);
  }

  stop() {
    Quagga.stop();
  }

  showScanner() {
    this.setState({
      scannerState: true
    }, this.init);
  }

  hideScanner() {
    this.setState({
      scannerState: false
    }, this.stop);
  }

  init() {
    Quagga.init({
      locator: {
        patchSize: 'medium'
      },
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#scanner')
      },
      decoder: {
        readers: ["ean_reader", "code_39_reader", "code_128_reader"]
      },
      constraints: {
        facingMode: "environment"
      }
    }, this.handleInit);
  }

  handleInit(err) {
    if (err) {
      console.log(err);
      Quagga.stop();
    } else {
      console.log("Initialization finished. Ready to start");
      Quagga.start();
      Quagga.onDetected(this.handleDetected);
    }
  }

  handleDetected(data) {
    if (data) {
      console.log('handleDetected', data.codeResult);
      Quagga.stop();
    }
  }

  renderBar() {
    return (
      <div className="Scanner-button">
        <IconButton onClick={this.goBack}>
          <KeyboardArrowRight style={{color: 'white'}}/>
        </IconButton>
      </div>
    )
  }

  render() {
    const {scannerActive} = this.state;
    const scannerClass = scannerActive ? 'active' : '';

    return (
      <div className="Scanner-wrapper">
        {this.renderBar()}
        <div id="scanner" className={scannerClass}/>
        {/*<div className="Scanner-button">*/}
        {/*<Button variant="fab" color="primary" aria-label="add" onClick={this.showScanner}>*/}
        {/*<AddIcon/>*/}
        {/*</Button>*/}
        {/*</div>*/}
      </div>
    );
  }
}