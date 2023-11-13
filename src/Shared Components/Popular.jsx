
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";
import useMenu from "../Hooks/useMenu";


const Popular = () => {
    let [menu] = useMenu();
    let popular = menu.filter(item => item.category === 'popular')
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-10/12 mx-auto gap-10">
                {
                    popular.map(item => <MenuItem
                        key={item._id}
                        item={item}>
                    </MenuItem>)
                }
            </div>
            <button className="btn btn-outline border-0 border-b-4 block mx-auto mt-10"><Link to='/our-menu'>View full menu</Link></button>
        </div>
    )
}
export default Popular;