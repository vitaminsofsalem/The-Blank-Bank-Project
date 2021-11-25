import { useRouter } from "next/router"

export const getServerSideProps = async ({params}) => {
    const res = await fetch(`http://localhost:3001/transactions/${params.id}`)
    const data = await res.json();

    return {
        props: {trans: data}
    }
}


const Details = ({trans}) => {
    return <>
        <div style={{textAlign: "center", marginTop: 25}}>
            <h1>All User Transactions</h1>
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
        </div>
    </>
}

export default Details