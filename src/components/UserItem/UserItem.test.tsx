import { fireEvent, render, waitFor } from "@testing-library/react";
import { mockRepositoryList, mockUser } from "../../mocks/data";
import UserItem from "./UserItem";

jest.mock("../RepositoryList/RepositoryList.tsx", () => {
    return {
        __esModule: true,
        default: () => {
            return <div data-testid="list"></div>;
        }
    };
});

beforeEach(() => {
    fetchMock.resetMocks();
});

it("UserItem displays user name", async () => {
    const { queryByText } = render(<UserItem data={mockUser} />);

    expect(queryByText(/testUser/i)).toBeTruthy();
});

it("UserItem fetches data on header click", async () => {
    const { getByTestId } = render(<UserItem data={mockUser} />);

    fetchMock.mockResponseOnce(JSON.stringify(mockRepositoryList));

    fireEvent.click(getByTestId(/header/i));

    await waitFor(() => {
        expect(getByTestId(/list/i)).toBeInTheDocument();
    });
});

it("UserItem shows message when results are empty", async () => {
    const { getByTestId } = render(<UserItem data={mockUser} />);

    fetchMock.mockResponseOnce(JSON.stringify([]));

    fireEvent.click(getByTestId(/header/i));

    await waitFor(() => {
        expect(getByTestId(/message/i)).toHaveTextContent("No repositories found");
    });
});
