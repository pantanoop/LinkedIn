/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import "./profile.css";

import ProfileHeader from "@/components/Profile/ProfileHeader/ProfileHeader";
import ProfileSections from "@/components/Profile/ProfileSection/ProfileSection";

import AddProfileMenuModal from "@/components/Profile/ProfileMenuModal/ProfileMenuModal";

import EducationForm from "../../components/Profile/Eductaion/EducationModal/Education";
import ExperienceForm from "../../components/Profile/Experience/ExperienceModal/Experience";
import SkillsForm from "../../components/Profile/Skills/SkillModal/Skills";

import LinkedInNavbar from "@/components/Navbar/navbar";
import CompleteProfilePage from "../profileform/page";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchEducation } from "@/redux/auth/authSlice";

export default function ProfilePage() {
  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openEducation, setOpenEducation] = useState(false);
  const [openExperience, setOpenExperience] = useState(false);
  const [openSkills, setOpenSkills] = useState(false);
  const dispatch = useAppDispatch();

  const { currentUser } = useAppSelector((state: any) => state.authenticator);

  const isModalOpen =
    openMenu ||
    openEducation ||
    openExperience ||
    openSkills ||
    openUpdateProfile;

  const education = [
    {
      id: 1,
      schoolName: "ABC University",
      degree: "B.Tech Computer Science",
      startDate: "2020-01-01",
      endDate: "2024-01-01",
    },
  ];

  const experience = [
    {
      id: 1,
      title: "Software Developer",
      companyName: "Zenmonk",
      startDate: "2024-01-01",
      endDate: null,
      currentlyWorking: true,
      description: "Working on scalable web apps",
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
        <ProfileHeader onAddSection={() => setOpenMenu(true)} />

        <ProfileSections
          educations={educations}
          experience={experience}
          skills={skills}
          onAddEducation={() => setOpenEducation(true)}
          onAddExperience={() => setOpenExperience(true)}
          onAddSkills={() => setOpenSkills(true)}
        />
      </div>

      {openMenu && (
        <div className="modal-wrapper" onClick={() => setOpenMenu(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* <EducationForm onClose={() => setOpenEducation(false)} /> */}
            <EducationForm
              onClose={() => setOpenEducation(false)}
              onSuccess={() => {
                if (currentUser?.userid) {
                  dispatch(fetchEducation(currentUser.id));
                }
              }}
            />
          </div>
        </div>
      )}

      {openExperience && (
        <div className="modal-wrapper" onClick={() => setOpenExperience(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <ExperienceForm onClose={() => setOpenExperience(false)} />
          </div>
        </div>
      )}

      {openSkills && (
        <div className="modal-wrapper" onClick={() => setOpenSkills(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <SkillsForm onClose={() => setOpenSkills(false)} />
          </div>
        </div>
      )}

      {openUpdateProfile && (
        <div
          className="modal-wrapper"
          onClick={() => setOpenUpdateProfile(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <CompleteProfilePage onClose={() => setOpenUpdateProfile(false)} />
          </div>
        </div>
      )}
    </>
  );
}
