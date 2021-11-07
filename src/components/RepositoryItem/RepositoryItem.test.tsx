import { render } from "@testing-library/react";
import { mockRepository } from "../../mocks/data";
import RepositoryItem from "./RepositoryItem";

it("RepositoryItem displays data properly", async () => {
    const { getByText } = render(<RepositoryItem data={mockRepository} />);

    expect(getByText(/test-repo/i)).toBeInTheDocument();
    expect(getByText(/1/i)).toBeInTheDocument();
    expect(getByText(/test description/i)).toBeInTheDocument();
});
