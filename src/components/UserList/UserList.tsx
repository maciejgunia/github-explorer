import { FC } from "react";
import { User } from "../../domain/User";
import UserItem from "./../UserItem/UserItem";
import s from "./UserList.module.css";

const UserList: FC<{ users: User[] }> = ({ users }) => {
    return (
        <div className={s.wrapper}>
            {users.map((user) => (
                <UserItem key={user.id} data={user}></UserItem>
            ))}
        </div>
    );
};

export default UserList;
