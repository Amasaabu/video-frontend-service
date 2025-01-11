import { render, screen } from '@testing-library/react';
import Test from '@/components/test/Test';

describe('Test component', () => {
    test('renders Section1 component', () => {
        render(<Test />);
        
        // Use the regular expression for case-insensitive match
        const testDiv = screen.getByText(/Sample/i);
        
        // expect(testDiv).toBeInTheDocument();
    });
});
