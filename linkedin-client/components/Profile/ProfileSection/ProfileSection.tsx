/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Box } from "@mui/material";

import ExperienceCard from "../Experience/ExperienceCard/ExperienceCard";
import EducationCard from "../../Profile/Eductaion/EductaionCard/EducationCard";
import SkillsCard from "../Skills/SkillCard/SkillCard";

export default function ProfileSections({
  educations,
  experience,
  skills,
  onAddEducation,
  onAddExperience,
  onAddSkills,
}: any) {
  return (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <ExperienceCard
        experience={experience}
        onAddExperience={onAddExperience}
      />

      <EducationCard education={educations} onAddEducation={onAddEducation} />

      <SkillsCard skills={skills} onAddSkills={onAddSkills} />
    </Box>
  );
}
