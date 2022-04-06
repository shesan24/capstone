import QrReader from "react-qr-reader";
import { Alert } from "react-bootstrap";
import React, { Component, useEffect, useState } from "react";
import TransactionStatus from "./TransactionStatus";

const ip = "";

class Qrscanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: "none",
      alert: "true",
    };
  }

  // const [showAlert,showAlertBox] = useState(false);
  // const [isQrcodeValid,setQrValid] = useState(false)
  // const [displayStyle,setDisplay] = useState({display: 'block'})
  // const [transactionresponse,setTransactionStatus]=useState('')

  // processTransaction(){

  //   let request = {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   fetch("http://127.0.0.1:5000/api/processTransaction/d7c68785-8612-11ec-9a13-7085c243a619",request)
  //     .then(res => res.json())
  //     .then(res => console.log(res));
  // }

  handleScan = (data) => {
    if (data) {
      let request = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      };

      let URI = `http://${ip}:5000/api/processTransaction/` + data;

      fetch(URI, request)
        .then((res) => res.json())
        .then((res) =>
          this.setState({
            transaction: res,
          })
        );
    }
  };
  handleError = (err) => {
    console.error(err);
  };

  render() {
    let showAlert;
    let showOnSuccess;
    let displayStyle;
    let alert = true;

    if (this.state.transaction == "") {
      showAlert = (
        <Alert id="alert" variant="danger" show={alert}>
          <Alert.Heading>Invalid QR code!</Alert.Heading>
          <p>QR code expired or is invalid. Please try again</p>
        </Alert>
      );
    }
    if (this.state.transaction != "" && this.state.transaction != "none") {
      console.log(this.state.transaction);
      showOnSuccess = <TransactionStatus data={this.state.transaction} />;
      displayStyle = { display: "none" };
    }

    return (
      <div className="main-container">
        {showOnSuccess}
        <div className="qrReader-message" style={displayStyle}>
          <a>Welcome to GoCash ATM</a>
          <ul>
            <li>Make a transaction using GoCash application</li>
            <li>The app will generate a QR code</li>
            <li>Scan your QR code to process transaction</li>
          </ul>
          <br></br>
          <br></br>
          {showAlert}
        </div>

        <div className="qrReader-webcam" style={displayStyle}>
          <QrReader
            delay={3000}
            resolution={400}
            onError={this.handleError}
            onScan={this.handleScan}
            facingMode="user"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    );
  }
}

export default Qrscanner;
