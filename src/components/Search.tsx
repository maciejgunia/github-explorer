import { FC, useState } from "react";
import { User } from "../App";
import "./Search.module.css";

enum State {
    Idle = "idle",
    Loading = "loading",
    Error = "error",
    NoResults = "no-results"
}

const Search: FC<{ setUsers: (users: User[]) => void }> = ({ setUsers }) => {
    const [query, setQuery] = useState("");
    const [visibleQuery, setVisibleQuery] = useState("");
    const [state, setState] = useState(State.Idle);

    function handleUsers() {
        setVisibleQuery(query);

        if (query.length > 0) {
            setState(State.Loading);
            fetch(`https://api.github.com/search/users?q=${query}&per_page=5`)
                .then((res) => {
                    if (res.status === 200) {
                        return res.json();
                    }

                    throw new Error();
                })
                .then((data) => {
                    setUsers(data.items);
                    setState(data.items.length > 0 ? State.Idle : State.NoResults);
                })
                .catch(() => {
                    setUsers([]);
                    setState(State.Error);
                });
        } else {
            setUsers([]);
            setState(State.Idle);
        }
    }

    return (
        <form
            onSubmit={(e) => {
                handleUsers();
                e.preventDefault();
            }}
        >
            <input type="text" placeholder="Enter username" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button type="submit" disabled={query.length === 0}>
                Search
            </button>
            {visibleQuery.length > 0 && state === State.Idle && (
                <p>Showing top 5 results for the query "{visibleQuery}"</p>
            )}
            {state === State.NoResults && <p>No results found for the query "{visibleQuery}"</p>}
            {state === State.Error && <p>Error fetching users for the query "{visibleQuery}"</p>}
            {state === State.Loading && <p>Loading...</p>}
        </form>
    );
};

export default Search;
