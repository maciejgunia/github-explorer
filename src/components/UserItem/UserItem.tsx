import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { LoadingState } from "../../domain/LodingState";
import { Repository } from "../../domain/Repository";
import { User } from "../../domain/User";
import RepositoryList from "../RepositoryList/RepositoryList";
import s from "./UserItem.module.css";

const UserItem: FC<{ data: User }> = ({ data }) => {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [state, setState] = useState<LoadingState>(LoadingState.Inactive);

    function getRepos() {
        if (state !== LoadingState.Inactive) {
            setState(LoadingState.Inactive);
            return;
        }

        setState(LoadingState.Loading);

        fetch(`https://api.github.com/users/${data.login}/repos?sort=updated`)
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                }

                throw new Error();
            })
            .then((data) => {
                setRepositories(data);
                setState(data.length > 0 ? LoadingState.Idle : LoadingState.NoResults);
            })
            .catch(() => {
                setState(LoadingState.Error);
            });
    }

    return (
        <>
            <div className={s.header} onClick={getRepos} data-testid="header">
                <span>{data.login}</span>
                <span>
                    {state === LoadingState.Inactive && <FontAwesomeIcon icon={faAngleDown} />}
                    {state !== LoadingState.Inactive && <FontAwesomeIcon icon={faAngleUp} />}
                </span>
            </div>
            {state === LoadingState.Idle && <RepositoryList data={repositories}></RepositoryList>}
            {state !== LoadingState.Inactive && state !== LoadingState.Idle && (
                <p className={s.message} data-testid="message">
                    {state === LoadingState.Loading && <>Loading...</>}
                    {state === LoadingState.NoResults && <>No repositories found</>}
                    {state === LoadingState.Error && <>Error fetching repositories</>}
                </p>
            )}
        </>
    );
};

export default UserItem;
