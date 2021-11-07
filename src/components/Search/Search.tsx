import { FC, useState } from "react";
import { LoadingState } from "../../domain/LodingState";
import { User } from "../../domain/User";
import s from "./Search.module.css";

const Search: FC<{ setUsers: (users: User[]) => void }> = ({ setUsers }) => {
    const [query, setQuery] = useState("");
    const [visibleQuery, setVisibleQuery] = useState("");
    const [state, setState] = useState(LoadingState.Idle);

    function handleUsers() {
        setVisibleQuery(query);

        if (query.length > 0) {
            setState(LoadingState.Loading);
            fetch(`https://api.github.com/search/users?q=${query}&per_page=5`)
                .then((res) => {
                    if (res.status === 200) {
                        return res.json();
                    }

                    throw new Error();
                })
                .then((data) => {
                    setUsers(data.items);
                    setState(data.items.length > 0 ? LoadingState.Idle : LoadingState.NoResults);
                })
                .catch(() => {
                    setUsers([]);
                    setState(LoadingState.Error);
                });
        } else {
            setUsers([]);
            setState(LoadingState.Idle);
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
                {visibleQuery.length > 0 && state === LoadingState.Idle && (
                    <>Showing top 5 results for the query "{visibleQuery}"</>
                )}
                {state === LoadingState.NoResults && <>No results found for the query "{visibleQuery}"</>}
                {state === LoadingState.Error && <>Error fetching users for the query "{visibleQuery}"</>}
                {state === LoadingState.Loading && <>Loading...</>}
            </p>
        </form>
    );
};

export default Search;
