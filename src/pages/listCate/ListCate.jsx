import "./listCate.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableCate from "../../components/datatableCate/DatatableCate"

const ListBook = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableCate />
      </div>
    </div>
  )
}

export default ListBook