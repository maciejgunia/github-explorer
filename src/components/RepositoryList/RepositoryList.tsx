import { FC } from "react";
import { Repository } from "../../domain/Repository";
import RepositoryItem from "../RepositoryItem/RepositoryItem";
import s from "./RepositoryList.module.css";

const RepositoryList: FC<{ data: Repository[] }> = ({ data }) => {
    return (
        <div className={s.wrapper}>
            {data.map((r) => (
                <RepositoryItem key={r.id} data={r}></RepositoryItem>
            ))}
        </div>
    );
};

export default RepositoryList;
