import useAuth from "../../Hooks/useAuth";
import Section_Title from "../../Shared Components/Section_Title";


const AdminHome = () => {
    let {user} = useAuth();
    return (
        <div>
            <Section_Title title={`${user.displayName}`} subTitle={'Welcome Back'}></Section_Title>
        </div>
    )
}
export default AdminHome;