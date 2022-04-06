import { CountdownCircleTimer } from 'react-countdown-circle-timer'


const TransactionStatus = (props) => {
    let transactionresponse = props.data
    return(

        <div className="transaction-container">
            <div className="transactionDetails-container">
                <h2>Transaction complete</h2>
                <ul>
                    <li><a>Account holder:</a> {transactionresponse["firstName"]}</li>
                    <li><a>Transaction id:</a> {transactionresponse["transactionId"]}</li>
                    <li><a>Withdraw amount:</a> ${transactionresponse["withdrawAmount"]}</li>
                    <li><a>Total balance:</a> ${transactionresponse["balanceAmount"]}</li>
                    <li><a>Date:</a>{transactionresponse["date"]}</li>
                </ul>
            </div>
            <h3> Please collect cash </h3>
        <div className="timer">
        <CountdownCircleTimer
                isPlaying
                duration={10}
                onComplete={() => {
                    // do your stuff here
                    window.location.reload(false);
                  }}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                colorsTime={[7, 5, 2, 0]}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        </div>
            

        </div>
    );
}
  
export default TransactionStatus