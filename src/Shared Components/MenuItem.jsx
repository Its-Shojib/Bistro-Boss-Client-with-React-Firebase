

const MenuItem = ({item}) => {
    let {name,image,price,recipe} = item;
    return (
        <div className="flex gap-5 justify-center">
            <img style={{borderRadius: '0 200px 200px 200px'}} className="w-28 h-28" src={image} alt="" />
            <div>
                <p className="uppercase text-xl font-semibold">{name}---------------</p>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-600">${price}</p>
        </div>
    )
}
export default MenuItem;