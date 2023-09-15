import "./listBanner.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableBanner from "../../components/datatableBanner/DatatableBanner"

const ListBanner = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableBanner />
      </div>
    </div>
  )
}

export default ListBanner