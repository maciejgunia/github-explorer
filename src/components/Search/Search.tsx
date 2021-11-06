import { FC, useState } from "react";
import { User } from "../../App";
import s from "./Search.module.css";

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
            className={s.form}
            onSubmit={(e) => {
                handleUsers();
                e.preventDefault();
            }}
        >
            <input
                type="text"
                className={s.input}
                placeholder="Enter username"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className={s.button} disabled={query.length === 0}>
                Search
            </button>
            <p className={s.message}>
                {visibleQuery.length > 0 && state === State.Idle && (
                    <>Showing top 5 results for the query "{visibleQuery}"</>
                )}
                {state === State.NoResults && <>No results found for the query "{visibleQuery}"</>}
                {state === State.Error && <>Error fetching users for the query "{visibleQuery}"</>}
                {state === State.Loading && <>Loading...</>}
            </p>
        </form>
    );
};

export default Search;
