import { FC } from "react";
import { User } from "../../App";
import s from "./UserItem.module.css";

const UserItem: FC<{ data: User }> = ({ data }) => {
    return <div className={s.wrapper}>{data.login}</div>;
};

export default UserItem;
