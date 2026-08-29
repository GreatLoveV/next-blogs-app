"use client";

import { useNotification } from "./NotificationContext";

const Notification = () => {
  const { message, type } = useNotification();

  if (!message) {
    return null;
  }

  return (
    <div
      className={`p-4 rounded-md shadow-md text-white font-medium ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
