import { render, fireEvent } from '@testing-library/react';
import DeviceMarker from '../components/DeviceMarker';
import type { IDevice } from '../types/device';

jest.mock('react-leaflet', () => ({
  Marker: ({ children, eventHandlers }: any) => (
    <div data-testid="marker" onDoubleClick={eventHandlers?.dblclick} onDragEnd={(e) => eventHandlers?.dragend(e)}>
      {children}
    </div>
  ),
  Popup: ({ children }: any) => <div>{children}</div>,
  useMap: () => ({ setView: jest.fn() })
}));

describe('DeviceMarker', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('updates localStorage on drag', () => {
    const device: IDevice = {
      id: '1',
      name: 'Test',
      lat: 0,
      lon: 0,
      status: 'on',
      model: 'special'
    };

    const { getByTestId } = render(<DeviceMarker device={device} draggable />);

    const marker = getByTestId('marker');
    fireEvent.dragEnd(marker, {
      target: { getLatLng: () => ({ lat: 1, lng: 2 }) }
    } as any);

    expect(localStorage.getItem('device-position-1')).toBe(JSON.stringify([1, 2]));
  });
});
