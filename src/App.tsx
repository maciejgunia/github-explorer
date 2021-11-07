import { FC, useState } from "react";
import "./App.module.css";
import Search from "./components/Search/Search";
import s from "./App.module.css";
import UserList from "./components/UserList/UserList";
import { User } from "./domain/User";

const App: FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    return (
        <div className="App">
            <div className={s.wrapper}>
                <Search setUsers={setUsers}></Search>
                <UserList data={users}></UserList>
            </div>
        </div>
    );
};

export default App;
