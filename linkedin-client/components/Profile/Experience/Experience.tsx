/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import "./Experience.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = Array.from({ length: 60 }, (_, i) => 1970 + i);

const employmentTypes = [
  "Full-time",
  "Part-time",
  "Self-employed",
  "Freelance",
  "Internship",
  "Trainee",
  "Contract",
];

interface ExperienceFormProps {
  onClose?: () => void;
}

export default function ExperienceForm({ onClose }: ExperienceFormProps) {
  const [form, setForm] = useState({
    title: "",
    employmentType: "",
    companyName: "",
    location: "",
    currentlyWorking: false,
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
    description: "",
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    console.log("Experience Data:", form);

    if (onClose) onClose();
  };

  return (
    <Box className="exp-overlay">
      <Paper className="exp-modal">
        <Typography variant="h6" className="exp-title">
          Add experience
        </Typography>

        <Typography className="exp-required">* Indicates required</Typography>

        <TextField
          label="Title*"
          name="title"
          fullWidth
          margin="normal"
          value={form.title}
          onChange={handleChange}
          required
        />

        <TextField
          select
          label="Employment type"
          name="employmentType"
          fullWidth
          margin="normal"
          value={form.employmentType}
          onChange={handleChange}
        >
          {employmentTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Company or organization*"
          name="companyName"
          fullWidth
          margin="normal"
          value={form.companyName}
          onChange={handleChange}
          required
        />

        <TextField
          label="Location"
          name="location"
          fullWidth
          margin="normal"
          value={form.location}
          onChange={handleChange}
        />

        <FormControlLabel
          control={
            <Checkbox
              name="currentlyWorking"
              checked={form.currentlyWorking}
              onChange={handleChange}
            />
          }
          label="I am currently working in this role"
          className="exp-checkbox"
        />

        <Typography className="exp-section">Start date*</Typography>

        <Box className="exp-row">
          <TextField
            select
            label="Month"
            name="startMonth"
            value={form.startMonth}
            onChange={handleChange}
            fullWidth
          >
            {months.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Year"
            name="startYear"
            value={form.startYear}
            onChange={handleChange}
            fullWidth
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        {!form.currentlyWorking && (
          <>
            <Typography className="exp-section">End date*</Typography>

            <Box className="exp-row">
              <TextField
                select
                label="Month"
                name="endMonth"
                value={form.endMonth}
                onChange={handleChange}
                fullWidth
              >
                {months.map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Year"
                name="endYear"
                value={form.endYear}
                onChange={handleChange}
                fullWidth
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </>
        )}

        <TextField
          label="Description"
          name="description"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={form.description}
          onChange={handleChange}
        />

        <Box className="exp-actions">
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.title || !form.companyName}
          >
            Save
          </Button>

          <Button onClick={onClose}>Cancel</Button>
        </Box>
      </Paper>
    </Box>
  );
}
