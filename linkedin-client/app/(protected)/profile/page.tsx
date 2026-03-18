/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import "./profile.css";

import ProfileHeader from "@/components/Profile/ProfileHeader/ProfileHeader";
import ProfileSections from "@/components/Profile/ProfileSection/ProfileSection";
import AddProfileMenuModal from "../../../components/Profile/ProfileMenuModal/ProfileMenuModal";
import EducationForm from "../../../components/Profile/Eductaion/Education";
import ExperienceForm from "../../../components/Profile/Experience/Experience";
import SkillsForm from "../../../components/Profile/Skills/Skills";
import LinkedInNavbar from "../../../components/Navbar/navbar";
import CompleteProfilePage from "../profileform/page";

export default function ProfilePage() {
  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openEducation, setOpenEducation] = useState(false);
  const [openExperience, setOpenExperience] = useState(false);
  const [openSkills, setOpenSkills] = useState(false);

  const isModalOpen =
    openMenu ||
    openEducation ||
    openExperience ||
    openSkills ||
    openUpdateProfile;

  const profile = {
    firstName: "Anoop",
    lastName: "Pant",
    headline: "Software Developer | Building LinkedIn Clone",
    about:
      "Passionate developer focused on building scalable web applications using React, Next.js, and NestJS.",
  };

  const education = [
    {
      id: 1,
      school: "ABC University",
      degree: "B.Tech Computer Science",
      duration: "2020 - 2024",
    },
  ];

  const experience = [
    {
      id: 1,
      company: "Zenmonk",
      role: "Software Developer",
      duration: "2024 - Present",
    },
  ];

  const skills = [
    { id: 1, name: "React" },
    { id: 2, name: "Next.js" },
    { id: 3, name: "NestJS" },
    { id: 4, name: "TypeScript" },
  ];

  return (
    <>
      {!isModalOpen && <LinkedInNavbar />}

      <div className={`profile-container ${isModalOpen ? "page-blur" : ""}`}>
        <ProfileHeader
          firstName={profile.firstName}
          lastName={profile.lastName}
          headline={profile.headline}
          about={profile.about}
          profilePicture={undefined} // ❌ no image
          coverPicture={undefined} // ❌ no image
          onAddSection={() => setOpenMenu(true)}
        />

        <ProfileSections
          education={education}
          experience={experience}
          skills={skills}
          onAddEducation={() => setOpenEducation(true)}
          onAddExperience={() => setOpenExperience(true)}
          onAddSkills={() => setOpenSkills(true)}
        />
      </div>

      {openMenu && (
        <div className="modal-wrapper" onClick={() => setOpenMenu(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "absolute", top: "2rem" }}
          >
            <AddProfileMenuModal
              onClose={() => setOpenMenu(false)}
              onAddEducation={() => {
                setOpenMenu(false);
                setOpenEducation(true);
              }}
              onAddExperience={() => {
                setOpenMenu(false);
                setOpenExperience(true);
              }}
              onAddSkills={() => {
                setOpenMenu(false);
                setOpenSkills(true);
              }}
              onUpdateProfile={() => {
                setOpenMenu(false);
                setOpenUpdateProfile(true);
              }}
            />
          </div>
        </div>
      )}

      {openEducation && (
        <div className="modal-wrapper" onClick={() => setOpenEducation(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <EducationForm onClose={() => setOpenEducation(false)} />
          </div>
        </div>
      )}

      {openExperience && (
        <div className="modal-wrapper" onClick={() => setOpenExperience(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <ExperienceForm onClose={() => setOpenExperience(false)} />
          </div>
        </div>
      )}

      {openSkills && (
        <div className="modal-wrapper" onClick={() => setOpenSkills(false)}>
          <div onClick={(e) => e.stopPropagation()}>
            <SkillsForm onClose={() => setOpenSkills(false)} />
          </div>
        </div>
      )}

      {openUpdateProfile && (
        <div
          className="modal-wrapper"
          onClick={() => setOpenUpdateProfile(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <CompleteProfilePage onClose={() => setOpenUpdateProfile(false)} />
          </div>
        </div>
      )}
    </>
  );
}
