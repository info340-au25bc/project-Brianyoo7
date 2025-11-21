function Header(props) {
    return (
        <header className="base-header-style main-feed-header">
            <div>
                <h1>CareerPivot</h1>
                <p className="lead-in">{props.summary}</p>
            </div>
        </header>
    );
}

export default Header