import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Repository } from "../../domain/Repository";
import s from "./RepositoryItem.module.css";

const RepositoryItem: FC<{ data: Repository }> = ({ data }) => {
    return (
        <article className={s.wrapper}>
            <header className={s.header}>
                {data.name}
                <span className={s.stars}>
                    {data.stargazers_count} <FontAwesomeIcon icon={faStar} />
                </span>
            </header>
            {data.description !== null && <p className={s.description}>{data.description}</p>}
        </article>
    );
};

export default RepositoryItem;
