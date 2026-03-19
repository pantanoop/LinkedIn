"use client";

import "../../Card.css";
import {
  Typography,
  Button,
  IconButton,
  Paper,
  Box,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function SkillsCard({ skills, onAddSkills }: any) {
  return (
    <Paper className="card">
      <div className="card-header">
        <Typography variant="h6">Skills</Typography>
        <IconButton onClick={onAddSkills}>
          <AddIcon />
        </IconButton>
      </div>

      {skills.length === 0 ? (
        <Button onClick={onAddSkills}>Add skills</Button>
      ) : (
        <Box className="skills-container">
          {skills.map((skill: any) => (
            <Chip key={skill.id} label={skill.name} />
          ))}
        </Box>
      )}
    </Paper>
  );
}
