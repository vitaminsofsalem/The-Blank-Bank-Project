import { Container, Row, Col, Button, Input, InputGroup, InputGroupText, InputGroupAddon, Table } from "reactstrap";
import styles from '../../styles/Transactions.module.scss'
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export const getServerSideProps = async ({params}) => {
    const res = await fetch(`http://localhost:3001/transactions/${params.id}`)
    const data = await res.json();

    return {
        props: {trans: data}
    }
}


const Details = ({trans}) => {
    return <>
        <div className={styles.mainContainer}> 
        <h1  className={styles.h1}>Transactions</h1>
        <Input
            className={styles.searchBox}
            name=""
            placeholder='Search...'
            type='search'
        />
        <Table className={styles.table}>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Date and time</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Balance</th>
                </tr>
            </thead>
            <tbody>
                {trans.map(transaction => (
                    <tr key={transaction._id}>
                        <td>{transaction.description}</td>
                        <td>{transaction.date}</td>
                        <td className={styles.debit}>- ${transaction.debit}</td>
                        <td className={styles.credit}>+ ${transaction.credit}</td>
                        <td>{transaction.balance}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
        {/* <div style={{textAlign: "center", marginTop: 25}}>
            {!trans.length ? <h1>Invalid Id</h1> : trans.map(tranaction => (
                <div style={{marginTop: 25}} key={tranaction.id}>  
                    <p>date: {tranaction.date}</p>
                    <p>description: {tranaction.description}</p>
                    <p>debit: {tranaction.debit}</p>
                    <p>credit: {tranaction.credit}</p>
                    <p>balance: {tranaction.balance}</p>
                    <hr></hr>
                </div>
            ))}
        </div> */}
        </div>
    </>
}

export default Details