import { 
    Input,
    Table,
    Card
} from "reactstrap";
import styles from '../../styles/Transactions.module.scss'
import 'font-awesome/css/font-awesome.min.css';
import { useState } from "react";
import ReactPaginate from 'react-paginate'

export const getServerSideProps = async ({params}) => {
    const res = await fetch(`http://localhost:3001/transactions/${params.id}`)
    const data = await res.json();

    return {
        props: {trans: data}
    }
}


const Details = ({trans}) => {

    trans.map(transaction => {
        const date = new Date(transaction.date)
        return transaction.date = date.toUTCString()

    })

    // Get Current transactions per page and display

    const [currentPage, setCurrentPage] = useState(0);
    const transPerPage = 10;
    const pagesVisited = currentPage * transPerPage;
    const displayTransactions = trans
    .slice(pagesVisited, pagesVisited + transPerPage)
    .map(transaction => (
        <tr key={transaction._id}>
            <td>{transaction.description}</td>
            <td>{transaction.date}</td>
            <td className={styles.debit}>- ${transaction.debit}</td>
            <td className={styles.credit}>+ ${transaction.credit}</td>
            <td>{transaction.balance}</td>
        </tr>
    ))

    const pageCount = Math.ceil(trans.length / transPerPage);

    const changePage = ({ selected }) => {
        setCurrentPage(selected);
    }

    return <>
        <div className={styles.body}>
        <div className={styles.parent}>
        <div className={styles.child}>
            <h1 className={`${styles.h1}`}><b>Transactions</b></h1>
        </div>
        <div className={styles.child}>
            <Input
                className={`${styles.searchBox}`}
                name=""
                placeholder='Search...'
                type='search'
            />
        </div>
  
        </div>
        <div>
        <Card className={styles.card}>
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
                {displayTransactions}
            </tbody>
        </Table>
        </Card>
        </div>

        <ReactPaginate 
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={styles.paginationBtns}
            previousLinkClassName={styles.previousBtn}
            nextLinkClassName={styles.nextBtn}
            disabledClassName={styles.paginationDisabled}
            activeClassName={styles.paginationActive}
        />
    </div>
    </>
}

export default Details