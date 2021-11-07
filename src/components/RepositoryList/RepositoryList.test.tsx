import { render } from "@testing-library/react";
import { mockRepositoryList } from "../../mocks/data";
import RepositoryList from "./RepositoryList";

jest.mock("../RepositoryItem/RepositoryItem", () => {
    return {
        __esModule: true,
        default: () => {
            return <div data-testid="item"></div>;
        }
    };
});

it("RepositoryList displays repository list", async () => {
    const { getAllByTestId } = render(<RepositoryList data={mockRepositoryList} />);

    expect(getAllByTestId(/item/i)).toHaveLength(mockRepositoryList.length);
});
