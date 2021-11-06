import { FC } from "react";
import { User } from "../App";
import UserItem from "./UserItem";
import s from "./UserList.module.css";

const UserList: FC<{ users: User[] }> = ({ users }) => {
    return (
        <div className={s.wrapper}>
            {users.map((user) => (
                <UserItem data={user}></UserItem>
            ))}
        </div>
    );
};

export default UserList;
