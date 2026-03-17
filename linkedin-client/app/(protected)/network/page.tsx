"use client";

import { useEffect } from "react";
import NetworkLeftSidebar from "../../../components/network/LeftSideBar/LeftSideBar";
import UserCard from "../../../components/network/UserCard/UserCard";
import LinkedInNavbar from "../../../components/Navbar/navbar";
import type { User } from "../../../redux/auth/authSlice";

import "./network.css";

import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  fetchUsers,
  clearUsers,
  fetchInvitations,
} from "@/redux/auth/authSlice";
import Card from "@/components/network/Card/Card";
import InvitationCard from "@/components/network/InvitationCard/InvitationCard";

export default function MyNetworkPage() {
  const dispatch = useAppDispatch();

  const { currentUser, users, page, invitations, limit, total } =
    useAppSelector((state: any) => state.authenticator);

  useEffect(() => {
    dispatch(clearUsers());
    dispatch(fetchUsers({ page: 1, limit }));
    dispatch(fetchInvitations(currentUser.id));
  }, []);

  console.log(invitations, "inv in network page");

  return (
    <div className="my-network-wrapper">
      <LinkedInNavbar />

      <div className="my-network-container">
        <aside className="left-column">
          <NetworkLeftSidebar />
        </aside>

        <main className="main-column">
          <Card />
          <InvitationCard invitations={invitations} />

          <div className="suggestion-section">
            <div className="suggestion-header">
              <h3>People you may know</h3>
            </div>

            <div className="suggestion-grid">
              {users.map((user: User) => (
                <UserCard key={`${user.id}-${user.userid}`} user={user} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
