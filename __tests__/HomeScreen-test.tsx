import { render, screen, waitFor } from '@testing-library/react-native';

import HomeScreen from '@/app/(tabs)/index';

test('renders learn react link', async () => {
  render(<HomeScreen />);
  
  // Wait for the expected output before asserting
  await waitFor(() => {
    expect(screen.getByText(/Show Picker/i)).toBeTruthy();
  });
});

