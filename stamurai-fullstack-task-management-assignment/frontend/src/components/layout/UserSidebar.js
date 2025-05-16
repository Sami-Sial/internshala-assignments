"use client";

import { useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import UpdateDisabledIcon from "@mui/icons-material/UpdateDisabled";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

import AllOutIcon from "@mui/icons-material/AllOut";
import Link from "next/link";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import { useNotifications } from "@/contexts/NotificationsContext";
import Modal from "react-bootstrap/Modal";
import { redirect, useRouter } from "next/navigation";

const UserSidebar = () => {
  const router = useRouter();
  const {
    notifications,
    setNotifications,
    getUsersNotifications,
    markAsReadAllNotifications,
  } = useNotifications();
  const [showAllNotifModal, setShowAllNotifModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let sidebarLinks = document.querySelectorAll(".sidebar-link");
    sidebarLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        sidebarLinks.forEach((link) => {
          link.classList.remove("active-sidebar-link");
        });

        e.currentTarget.classList.add("active-sidebar-link");
      });
    });
  });

  const seeAssignedTAsksHandle = async () => {
    try {
      setError("");
      setLoading(true);

      await markAsReadAllNotifications();
      await getUsersNotifications();
      setShowAllNotifModal(false);
      router.push("/user/assigned-tasks");
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let sidebarLinks = document.querySelectorAll(".sidebar-link");

    sidebarLinks[0].classList.add("active-sidebar-link");
  }, []);

  return (
    <>
      <div>
        <div
          id="user-sidebar"
          style={{
            display: "flex",
            gap: "1rem",
            backgroundColor: "gray",
            color: "white",
          }}
        >
          <div style={{ display: "flex", gap: "5px" }}>
            <Link
              href="/user/dashboard"
              style={{ cursor: "pointer" }}
              id="dashboard"
              className="sidebar-link"
              title="Dashboard"
            >
              <DashboardIcon />
            </Link>
          </div>

          <div style={{ display: "flex", gap: "5px" }}>
            <Link
              href="/user/assigned-tasks"
              style={{ cursor: "pointer" }}
              id="assigned-tasks"
              className="sidebar-link"
              title="Assigned Tasks"
            >
              <AssignmentIndIcon />
            </Link>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <Link
              href="/user/overdue-tasks"
              style={{ cursor: "pointer" }}
              id="overdue-tasks"
              className="sidebar-link"
              title="Overdue Tasks"
            >
              <UpdateDisabledIcon />
            </Link>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <Link
              href=""
              style={{
                cursor: "pointer",
                display: "flex",
                position: "relative",
              }}
              id="notifications"
              className="sidebar-link"
              onClick={() => {
                notifications?.unreadCount > 0 ? (
                  setShowAllNotifModal(true)
                ) : (
                  <></>
                );
              }}
            >
              <AddAlertIcon />
              {notifications && notifications?.unreadCount > 0 && (
                <p
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    color: "white",
                    backgroundColor: "green",
                    padding: "0 5px",
                    borderRadius: "50%",
                    fontSize: "13px",
                  }}
                >
                  {notifications?.unreadCount}
                </p>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* All notif modal */}
      <Modal
        show={showAllNotifModal}
        onHide={() => setShowAllNotifModal(false)}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {notifications?.notifications
            ?.filter((n) => n.read == false)
            .map((notif, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <strong>{i + 1}- </strong>
                {notif.message}
              </div>
            ))}
          {/* <Button
          variant="secondary"
          className="btn-sm"
          style={{ padding: "0 5px", fontSize: "12px", marginRight: "5px" }}
          onClick={markAsReadAllHandle}
        >
          Mark as read All
        </Button> */}
          <Button
            variant="secondary"
            className="btn-sm"
            style={{ padding: "0 5px", fontSize: "12px" }}
            onClick={seeAssignedTAsksHandle}
          >
            See Assigned Tasks
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserSidebar;
