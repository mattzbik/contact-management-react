import Home from '@/app/page';
import { render, screen } from '@testing-library/react';

describe('Home', () => {
  xit('renders a heading, issue fixing test at the moment. Need to mock useRouter and possibly context as well.', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
