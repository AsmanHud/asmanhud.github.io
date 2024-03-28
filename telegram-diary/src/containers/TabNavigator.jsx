function TabNavigator({ children }) {
    return (
        <ul className="nav nav-tabs card-header-tabs nav-justified">
            {children}
        </ul>
    );
}

export default TabNavigator;
