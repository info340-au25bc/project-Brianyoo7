function Header(props) {
    return (
        <header className="base-header-style main-feed-header">
            <div>
                <p className="lead-in">{props.summary}</p>
            </div>
        </header>
    );
}

export default Header