import "./listBorrow.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableBorrow from "../../components/datatableBorrow/DatatableBorrow"

const ListBorrow = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableBorrow />
      </div>
    </div>
  )
}

export default ListBorrow