import '@styles/search.css';

function Search({ value, onChange, placeholder }) {
    return (
        <div style={{ position: 'relative' }}>
            <input
                type="text"
                className='search-input-table'
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}

export default Search;
