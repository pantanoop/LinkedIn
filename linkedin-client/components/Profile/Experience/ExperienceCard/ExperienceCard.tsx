"use client";

import "../../Card.css";
import { Box, Typography, Button, IconButton, Paper } from "@mui/material";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

export default function ExperienceCard({ experience, onAddExperience }: any) {
  return experience.length === 0 ? (
    <Paper className="card empty-card">
      <IconButton className="close-btn">
        <CloseIcon fontSize="small" />
      </IconButton>

      <Typography variant="h6">Experience</Typography>

      <Typography className="sub-text">
        Showcase your accomplishments and get more profile views
      </Typography>

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={onAddExperience}
      >
        Add experience
      </Button>
    </Paper>
  ) : (
    <Paper className="card">
      <div className="card-header">
        <Typography variant="h6">Experience</Typography>
        <IconButton onClick={onAddExperience}>
          <AddIcon />
        </IconButton>
      </div>

      {experience.map((exp: any) => (
        <Box key={exp.id} className="item">
          <div className="icon-box">
            <WorkOutlineIcon />
          </div>

          <div>
            <Typography className="title">{exp.title}</Typography>
            <Typography className="sub-text">{exp.companyName}</Typography>

            <Typography className="sub-text">
              {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}
            </Typography>

            {exp.description && (
              <Typography className="desc">{exp.description}</Typography>
            )}
          </div>
        </Box>
      ))}
    </Paper>
  );
}
