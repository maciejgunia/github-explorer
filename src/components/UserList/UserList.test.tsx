import { render } from "@testing-library/react";
import { mockUserList } from "../../mocks/data";
import UserList from "./UserList";

jest.mock("../UserItem/UserItem", () => {
    return {
        __esModule: true,
        default: () => {
            return <div data-testid="item"></div>;
        }
    };
});

it("UserItem displays user list", async () => {
    const { getAllByTestId } = render(<UserList data={mockUserList} />);

    expect(getAllByTestId(/item/i)).toHaveLength(mockUserList.length);
});
