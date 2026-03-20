"use client";

import "../../Card.css";
import { Typography, Button, IconButton, Paper, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function EducationCard({ educations, onAddEducation }: any) {
  return (
    <Paper className="card">
      <div className="card-header">
        <Typography variant="h6">Education</Typography>
        <IconButton onClick={onAddEducation}>
          <AddIcon />
        </IconButton>
      </div>

      {!educations || educations.length === 0 ? (
        <Button onClick={onAddEducation}>Add education</Button>
      ) : (
        educations.map((edu: any) => (
          <Box key={edu.id} className="item">
            <Typography className="title">{edu.institutionName}</Typography>
            <Typography className="sub-text">
              {edu.degree}
              {edu.fieldOfStudy && ` • ${edu.fieldOfStudy}`}
            </Typography>
            <Typography className="sub-text"> 
              {edu.startMonth} {edu.startYear} –{" "}
              {edu.endMonth && edu.endYear
                ? `${edu.endMonth} ${edu.endYear}`
                : "Present"}
            </Typography>
          </Box>
        ))
      )}
    </Paper>
  );
}
