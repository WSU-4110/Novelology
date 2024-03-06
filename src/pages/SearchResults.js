import React, { Component } from 'react';
import axios from 'axios';



class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: [],
            searchQuery: '',
            selectedFilter: '',
            submitted: false,
        };

        // Bind the handleFilterChange method to the component instance
        // binding is necessary to access the component's state inside the method
        // and to ensure that the method is called with the correct context
        this.handleFilterChange = this.handleFilterChange.bind(this);

        // Bind the performSearch method to the component instance
        this.performSearch = this.performSearch.bind(this);
    }

    componentDidMount() {
        // location is a hook from react-router-dom
        // that returns the current URL location of the browser
        // and allows us to access the search query string
        // queryParams is a URLSearchParams object that allows us to access the query string parameters
        const query = localStorage.getItem('searchQuery');
        const filters = localStorage.getItem('searchFilters');


        const selectedFilter = filters[0] || 'all';

        this.setState({
            searchQuery: query,
            selectedFilter: selectedFilter,
        });

        if (this.state.submitted) {
            this.performSearch();
            this.setState({ submitted: false });
        }
    }

    // componentDidUpdate is called when the component updates and receives new props or state changes
    // we use it to check if the search query or filter has changed
    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchQuery !== this.state.searchQuery || prevState.selectedFilter !== this.state.selectedFilter) {
            this.performSearch();
        }
    }

    
    performSearch() {
        const { searchQuery, selectedFilter } = this.state;
        const encodedQuery = encodeURIComponent(searchQuery);
        const newUrl = `/search/${selectedFilter}`;
        
        //navigate(`${newUrl}?q=${encodedQuery}`);

        let searchResults = [];
        if (selectedFilter === 'titles') {
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodedQuery}&orderBy=newest&maxResults=3`)
                .then(res => {
                    const items = res.data.items;
                    const bookList = items.map(item => ({
                        id: item.id,
                        title: item.volumeInfo.title,
                        authors: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
                    }));
                    searchResults = bookList;
                    this.setState({ searchResults: searchResults });
                })
                .catch(err => console.error('Error fetching books:', err));
        } else if (selectedFilter === 'authors') {
            axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${encodedQuery}&orderBy=newest&maxResults=3`)
                .then(res => {
                    const items = res.data.items;
                    const authorList = items.map(item => ({
                        id: item.id,
                        name: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
                    }));
                    searchResults = authorList;
                    this.setState({ searchResults: searchResults });
                })
                .catch(err => console.error('Error fetching authors:', err));
        }
    }

    handleFilterChange(event) {
        this.setState({ selectedFilter: event.target.value, submitted: true });
    }


    render() {
        const { searchResults, searchQuery, selectedFilter } = this.state;
    
        return (
            <div className="flex">
                {/* Display search results */}
                <div className="w-3/4">
                    <h1>Search Results</h1>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => this.setState({ searchQuery: e.target.value })}
                        className="border border-gray-400 rounded px-4 py-2 w-full"
                    />
                    {searchResults && searchResults.length > 0 ? (
                        <ul>
                            {searchResults.map((result, index) => (
                                <li key={index}>
                                    {result && result.type === 'author' ? (
                                        result.id || result.UID
                                    ) : (
                                        result && result.name
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No search results found.</p>
                    )}
                </div>
    
                {/* Sidebar with search filters */}
                <div className="w-1/4">
                    <h2>Show results for</h2>
                    <div>
                        <input type="radio" id="all" name="filter" value="all" onChange={this.handleFilterChange} checked={selectedFilter === 'all'} />
                        <label htmlFor="all" className={selectedFilter === 'all' ? 'selected' : ''}>All</label>
                    </div>
                    <div>
                        <input type="radio" id="titles" name="filter" value="titles" onChange={this.handleFilterChange} checked={selectedFilter === 'titles'} />
                        <label htmlFor="titles" className={selectedFilter === 'titles' ? 'selected' : ''}>Titles</label>
                    </div>
                    <div>
                        <input type="radio" id="authors" name="filter" value="authors" onChange={this.handleFilterChange} checked={selectedFilter === 'authors'} />
                        <label htmlFor="authors" className={selectedFilter === 'authors' ? 'selected' : ''}>Authors</label>
                    </div>
                    <div>
                        <input type="radio" id="genres" name="filter" value="genres" onChange={this.handleFilterChange} checked={selectedFilter === 'genres'} />
                        <label htmlFor="genres" className={selectedFilter === 'genres' ? 'selected' : ''}>Genres</label>
                    </div>
                    <div>
                        <input type="radio" id="users" name="filter" value="users" onChange={this.handleFilterChange} checked={selectedFilter === 'users'} />
                        <label htmlFor="users" className={selectedFilter === 'users' ? 'selected' : ''}>Users</label>
                    </div>
                    <div>
                        <input type="radio" id="tags" name="filter" value="tags" onChange={this.handleFilterChange} checked={selectedFilter === 'tags'} />
                        <label htmlFor="tags" className={selectedFilter === 'tags' ? 'selected' : ''}>Tags</label>
                    </div>
                    <div>
                        <input type="radio" id="stacks" name="filter" value="stacks" onChange={this.handleFilterChange} checked={selectedFilter === 'stacks'} />
                        <label htmlFor="stacks" className={selectedFilter === 'stacks' ? 'selected' : ''}>Stacks</label>
                    </div>
                </div>
            </div>
        );
    }
}    

export default SearchResults;
