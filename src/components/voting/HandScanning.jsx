import { io } from "socket.io-client";
export default function Component() {
  const socket = io();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 space-y-8">
      <div className="flex space-x-8">
        <div className="w-32 h-32">
          <IconHandOutline className="w-full h-full animate-pulse" />
        </div>
        <div className="w-32 h-32">
          <IconHandOutline className="w-full h-full animate-pulse" />
        </div>
      </div>
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Fingerprint Scanning</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Please place your finger and wait while we verify your identity
        </p>
      </div>
    </div>
  );
}

function IconHandOutline(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  );
}
