"use client";

import "../../Card.css";
import { Typography, Button, IconButton, Paper, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function EducationCard({ education, onAddEducation }: any) {
  return (
    <Paper className="card">
      <div className="card-header">
        <Typography variant="h6">Education</Typography>
        <IconButton onClick={onAddEducation}>
          <AddIcon />
        </IconButton>
      </div>

      {education.length === 0 ? (
        <Button onClick={onAddEducation}>Add education</Button>
      ) : (
        education.map((edu: any) => (
          <Box key={edu.id} className="item">
            <Typography className="title">{edu.schoolName}</Typography>
            <Typography className="sub-text">{edu.degree}</Typography>
            <Typography className="sub-text">
              {edu.startDate} – {edu.endDate}
            </Typography>
          </Box>
        ))
      )}
    </Paper>
  );
}
