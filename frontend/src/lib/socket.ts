import io, { Socket } from 'socket.io-client';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';

let socket: Socket | null = null;

export const connectSocket = () => {
  if (socket) return socket;

  socket = io(WS_URL, {
    auth: {
      token: localStorage.getItem('accessToken'),
    },
  });

  socket.on('connect', () => {
    console.log('Socket connected');
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  return socket;
};

export const getSocket = () => socket || connectSocket();

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const emitEvent = (event: string, data?: any) => {
  const sock = getSocket();
  sock?.emit(event, data);
};

export const onEvent = (event: string, callback: (data: any) => void) => {
  const sock = getSocket();
  sock?.on(event, callback);
};

export const offEvent = (event: string) => {
  const sock = getSocket();
  sock?.off(event);
};
