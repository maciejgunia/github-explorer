import { FC } from "react";
import { User } from "../../domain/User";
import UserItem from "./../UserItem/UserItem";
import s from "./UserList.module.css";

const UserList: FC<{ data: User[] }> = ({ data }) => {
    return (
        <div className={s.wrapper}>
            {data.map((user) => (
                <UserItem key={user.id} data={user}></UserItem>
            ))}
        </div>
    );
};

export default UserList;
