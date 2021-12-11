const LayoutComponent = ({children, current}) => {
    return (
        <div className='layout-container'>
            <div className='header-container'>
                <LayoutComponent current={current} />
            </div>
            <div className='content'>
                {children}
            </div>
        </div>
    )
}

export default LayoutComponent;