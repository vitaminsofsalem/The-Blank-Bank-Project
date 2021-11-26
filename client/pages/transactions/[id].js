import { Container, Row, Col, Button, Input, InputGroup, InputGroupText, InputGroupAddon } from "reactstrap";
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