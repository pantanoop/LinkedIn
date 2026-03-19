"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Chip,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import "./Skills.css";

interface SkillsFormProps {
  onClose?: () => void;
}

const suggestedSkills = [
  "Engineering",
  "Project Management",
  "English",
  "Research Skills",
  "Training",
  "Communication",
  "Strategy",
  "Finance",
  "Design",
  "Presentations",
];

export default function SkillsForm({ onClose }: SkillsFormProps) {
  const [skill, setSkill] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleSubmit = () => {
    console.log("Skill Added:", skill);

    if (onClose) onClose();
  };

  return (
    <Box className="skill-overlay">
      <Paper className="skill-modal">
        <Typography variant="h6" className="skill-title">
          Add skill
        </Typography>

        <Typography className="skill-required">* Indicates required</Typography>

        <TextField
          label="Skill*"
          placeholder="Skill (ex: Project Management)"
          fullWidth
          margin="normal"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />

        {showSuggestions && (
          <Box className="skill-suggestions">
            <Box className="skill-suggestion-header">
              <Typography className="skill-suggestion-title">
                Suggested based on your profile
              </Typography>

              <IconButton
                size="small"
                onClick={() => setShowSuggestions(false)}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            <Box className="skill-chip-container">
              {suggestedSkills.map((s) => (
                <Chip
                  key={s}
                  label={s}
                  onClick={() => setSkill(s)}
                  className="skill-chip"
                />
              ))}
            </Box>
          </Box>
        )}

        <Box className="skill-actions">
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!skill.trim()}
          >
            Save
          </Button>

          <Button onClick={onClose}>Cancel</Button>
        </Box>
      </Paper>
    </Box>
  );
}
