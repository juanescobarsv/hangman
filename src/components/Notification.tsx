const Notification = ({ showNotification }: { showNotification: boolean }) => {
  return (
    <div
      className={`notification-container ${showNotification ? "show" : ""}`}
    >
      <p>You have already entered this letter</p>
    </div>
  );
};

export default Notification;
