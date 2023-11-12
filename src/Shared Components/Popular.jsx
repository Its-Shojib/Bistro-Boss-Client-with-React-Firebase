import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";


const Popular = () => {
    let [menu, setMenu] = useState([]);
    useEffect(() => {
        fetch('/menu.json')
            .then(res => res.json())
            .then(data => {
                let popularItem = data.filter(item => item.category === 'popular');
                setMenu(popularItem)
            })
    }, [])

    console.log(menu);
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 w-10/12 mx-auto gap-10">
                {
                    menu.map(item => <MenuItem
                        key={item._id}
                        item={item}>
                    </MenuItem>)
                }
            </div>
            <button className="btn btn-outline block mx-auto mt-10"><Link to='/our-menu'>View full menu</Link></button>
        </div>
    )
}
export default Popular;