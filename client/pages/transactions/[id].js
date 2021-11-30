import { Input, Table, Card } from "reactstrap";
import styles from "../../styles/Transactions.module.scss";
import "font-awesome/css/font-awesome.min.css";
import { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import Highlighter from "react-highlight-words";
import { useRouter } from "next/router";
import { getTransactions } from "../../services/transactions";

const Details = () => {
  const [trans, setTrans] = useState([]);
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    const handleApis = async () => {
      const res = await getTransactions(id);
      console.log(res);
      if (res.success) setTrans(res.data);
      else if (res.data?.status == 401) {
        localStorage.removeItem("jwt");
        router.replace("/");
      }
    };
    handleApis();
  }, []);

  trans.map((transaction) => {
    const date = new Date(transaction.date);
    return (transaction.date = date.toUTCString());
  });

  // Search Implemenation Below

  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);

  useEffect(() => {
    setOutput([]);
    displayTransactions.filter((val) => {
      if (val.description.toLowerCase().includes(input.toLowerCase())) {
        setOutput((output) => [...output, val]);
        console.log(input);
      }
    });
  }, [input]);

  // Get Current transactions per page and display

  const [currentPage, setCurrentPage] = useState(0);
  const transPerPage = 10;
  const pagesVisited = currentPage * transPerPage;
  const displayTransactions = trans.slice(
    pagesVisited,
    pagesVisited + transPerPage
  );

  const pageCount = Math.ceil(trans.length / transPerPage);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <div className={styles.body}>
        <div className={styles.parent}>
          <div className={styles.child}>
            <h1 className={`${styles.h1}`}>
              <b>Transactions</b>
            </h1>
          </div>
          <div className={styles.child}>
            <Input
              className={`${styles.searchBox}`}
              name=""
              placeholder="Search..."
              type="search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
                {input.length < 1
                  ? displayTransactions.map((transaction) => (
                      <tr key={transaction._id}>
                        <td>{transaction.description}</td>
                        <td>{transaction.date}</td>
                        <td className={styles.debit}>- ${transaction.debit}</td>
                        <td className={styles.credit}>
                          + ${transaction.credit}
                        </td>
                        <td>{transaction.balance}</td>
                      </tr>
                    ))
                  : output.map((transaction) => (
                      <tr key={transaction._id}>
                        <td>
                          <Highlighter
                            highlightClassName={styles.highlight}
                            searchWords={[input]}
                            textToHighlight={transaction.description}
                            autoEscape={true}
                          />
                        </td>
                        <td>{transaction.date}</td>
                        <td className={styles.debit}>- ${transaction.debit}</td>
                        <td className={styles.credit}>
                          + ${transaction.credit}
                        </td>
                        <td>{transaction.balance}</td>
                      </tr>
                    ))}
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
  );
};

export default Details;
