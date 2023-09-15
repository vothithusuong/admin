import "./listBook.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableBook from "../../components/datatableBook/DatatableBook"

const ListBook = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableBook />
      </div>
    </div>
  )
}

export default ListBook