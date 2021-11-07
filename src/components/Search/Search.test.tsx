import { render, fireEvent, waitFor } from "@testing-library/react";
import { mockUserList } from "../../mocks/data";
import Search from "./Search";

const setUsers = jest.fn();

beforeEach(() => {
    fetchMock.resetMocks();
});

it("Search gets list of user and displays a message", async () => {
    const { getByTestId } = render(<Search setUsers={setUsers} />);

    fetchMock.mockResponseOnce(JSON.stringify({ items: mockUserList }));
    fireEvent.change(getByTestId(/input/i), { target: { value: "test" } });
    fireEvent.click(getByTestId(/button/i));

    await waitFor(() => {
        expect(getByTestId(/message/i)).toHaveTextContent('Showing top 5 results for the query "test"');
        expect(setUsers).toHaveBeenCalledWith(mockUserList);
    });
});

it("Search displays proper message when no users are found", async () => {
    const { getByTestId } = render(<Search setUsers={setUsers} />);

    fetchMock.mockResponseOnce(JSON.stringify({ items: [] }));
    fireEvent.change(getByTestId(/input/i), { target: { value: "test" } });
    fireEvent.click(getByTestId(/button/i));

    await waitFor(() => {
        expect(getByTestId(/message/i)).toHaveTextContent('No results found for the query "test"');
        expect(setUsers).toHaveBeenCalledWith([]);
    });
});
