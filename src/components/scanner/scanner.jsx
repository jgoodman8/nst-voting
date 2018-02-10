import React from 'react';
import Quagga from 'quagga';
import { IconButton } from "material-ui";
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import { browserHistory } from "react-router";
import { abiArray } from "../../abi";
import './scanner.css'

const Web3 = require('web3');

const contractAddress = "0x170A4B2Ec65B79cd4956E7c9712713326F97ee05";
const PROVIDER = "https://ropsten.infura.io/ePYYGdA9cUhr3uMfYwSP";
const institution = "obradoiro";

export default class Scanner extends React.Component {

  constructor() {
    super();

    this.state = {
      scannerState: false,
      votes: null
    };

    this.init = this.init.bind(this);
    this.handleInit = this.handleInit.bind(this);
    this.handleDetected = this.handleDetected.bind(this);
    this.showScanner = this.showScanner.bind(this);
    this.hideScanner = this.hideScanner.bind(this);
    this.fetchPendingVotes = this.fetchPendingVotes.bind(this);
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
      browserHistory.push('/home');
    } else {
      console.log("Initialization finished. Ready to start");
      Quagga.start();
      Quagga.onDetected(this.handleDetected);
    }
  }

  handleDetected(data) {
    console.log(data);
    if (data) {
      console.log('handleDetected', data.codeResult);
      Quagga.stop();
      this.fetchPendingVotes(data.codeResult.code);
    }
  }

  toBytesArray(str) {
    return Web3.utils.asciiToHex(str);
  }

  fetchPendingVotes(code) {
    code = this.toBytesArray(code);

    if (typeof this.web3 !== 'undefined') {
      this.web3 = new Web3(this.web3.currentProvider);
    } else {
      this.web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER));
      this.contract = new this.web3.eth.Contract(abiArray, contractAddress);
      this.contract.methods.getPendingVotes(institution, code).call((error, result) => {
        this.setState({votes: result});
      });
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

  renderCenter() {
    const votes = this.state.votes;
    const hole = <div className="scanner-hole"/>;
    const info = <div className="info-votes">{`Te quedan ${votes} por gastar`}</div>;
    const none = <div className="info-votes">{`No te quedan más votos disponibles`}</div>;

    return votes !== null ? votes === 0 ? none : info : hole;
  }

  render() {
    const {scannerActive} = this.state;
    const scannerClass = scannerActive ? 'active' : '';

    return (
      <div>
        <div id="scanner" className={scannerClass}/>
        <div className="Scanner-wrapper">
          {this.renderBar()}
          <div className="faker-row"/>
          <div className="central-row">
            <div className="fake-column"/>
            {this.renderCenter()}
            <div className="fake-column"/>
          </div>
          <div className="faker-row"/>
        </div>
      </div>
    );
  }
}