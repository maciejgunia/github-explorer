import { Repository } from "../domain/Repository";
import { User } from "../domain/User";

export const mockUser: User = {
    id: 123,
    login: "testuser"
};

export const otherMockUser: User = {
    id: 456,
    login: "othertestuser"
};

export const mockUserList: User[] = [mockUser, otherMockUser];

export const mockRepository: Repository = {
    id: 123,
    name: "test-repo",
    description: "test description",
    stargazers_count: 1
};

export const otherMockRepository: Repository = {
    id: 456,
    name: "other-test-repo",
    description: "other test description",
    stargazers_count: 7
};

export const mockRepositoryList = [mockRepository, otherMockRepository];
