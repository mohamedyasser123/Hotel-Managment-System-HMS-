export const addNotification = (
  title: string,
  message: string
) => {
  const notifications = JSON.parse(
    localStorage.getItem("notifications") || "[]"
  );

  notifications.unshift({
    id: Date.now(),
    title,
    message,
    read: false,
    createdAt: new Date().toISOString(),
  });

  localStorage.setItem(
    "notifications",
    JSON.stringify(notifications)
  );

  window.dispatchEvent(
    new Event("notification-added")
  );
};