import PropTypes from 'prop-types';

const Section_Title = ({title,subTitle}) => {
    return (
        <div className="text-center my-16 w-72 mx-auto space-y-4">
            <p className="text-[#D99904]">---{subTitle}---</p>
            <h1 className="text-[#151515] text-3xl border-y-2 border-gray-500 py-3">{title}</h1>
        </div>
    )
}
Section_Title.propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string
}
export default Section_Title;