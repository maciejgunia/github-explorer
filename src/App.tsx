import { FC, useState } from "react";
import "./App.module.css";
import Search from "./components/Search";
import s from "./App.module.css";
import UserList from "./components/UserList";

export type User = {
    login: string;
};

const App: FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    return (
        <div className="App">
            <div className={s.wrapper}>
                <Search setUsers={setUsers}></Search>
                <UserList users={users}></UserList>
            </div>
        </div>
    );
};

export default App;
