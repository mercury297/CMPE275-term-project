import HeaderComponent from "./Header";
import '../../assets/scss/layout.scss';

const LayoutComponent = ({children, current}) => {
    return (
        <div className='layout-container'>
            <div className='header-container'>
                <HeaderComponent current={current}/>
            </div>
            <div className='content'>
                {children}
            </div>
        </div>
    )
}

export default LayoutComponent;