/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Paper,
} from "@mui/material";

import "./Education.css";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUserEducation } from "@/redux/auth/authSlice";

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

interface Props {
  onClose?: () => void;
  onSuccess?: () => void;
}

const educationSchema = z.object({
  institutionName: z.string().min(2, "institution name is required"),
  degree: z.string().optional(),
  fieldOfStudy: z.string().optional(),
  startMonth: z.string().optional(),
  startYear: z.string().optional(),
  endMonth: z.string().optional(),
  endYear: z.string().optional(),
});

type EducationFormData = z.infer<typeof educationSchema>;

export default function EducationForm({ onClose, onSuccess }: Props) {
  console.log("✅ EducationForm RENDERED");
  const { currentUser } = useAppSelector((state: any) => state.authenticator);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      institutionName: "",
      degree: "",
      fieldOfStudy: "",
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
    },
  });

  const onSubmit = async (data: EducationFormData) => {
    console.log("🚀 FINAL SUBMIT HIT", data);

    try {
      const payload = {
        ...data,
        currentUserId: currentUser?.userid,
      };

      console.log(" in component PAYLOAD", payload);

      await dispatch(addUserEducation(payload));

      console.log("DISPATCH DONE");

      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      console.error("ERROR IN SUBMIT", err);
    }
  };

  return (
    <Box className="edu-overlay">
      <Paper className="edu-modal">
        <Typography variant="h6" className="edu-title">
          Add education
        </Typography>

        <Typography className="edu-required">* Indicates required</Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <form
          onSubmit={handleSubmit(
            (data) => {
              console.log("🟢 RHF SUCCESS", data);
            },
            (errors) => {
              console.log("🔴 RHF ERRORS", errors);
            },
          )}
        > */}
          <Controller
            name="institutionName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="institution name*"
                fullWidth
                margin="normal"
                error={!!errors.institutionName}
                helperText={errors.institutionName?.message}
              />
            )}
          />
          <Controller
            name="degree"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Degree" fullWidth margin="normal" />
            )}
          />
          <Controller
            name="fieldOfStudy"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Field of study"
                fullWidth
                margin="normal"
              />
            )}
          />

          <Typography className="edu-section">Start date</Typography>

          <Box className="edu-row">
            <Controller
              name="startMonth"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="Month"
                  {...field}
                  fullWidth
                  SelectProps={{
                    MenuProps: {
                      disablePortal: true,
                    },
                  }}
                >
                  {months.map((month) => (
                    <MenuItem key={month} value={String(month)}>
                      {month}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="startYear"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="Year"
                  {...field}
                  fullWidth
                  SelectProps={{
                    MenuProps: {
                      disablePortal: true,
                    },
                  }}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={String(year)}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
          <Typography className="edu-section">
            End date (or expected)
          </Typography>

          <Box className="edu-row">
            <Controller
              name="endMonth"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="Month"
                  {...field}
                  fullWidth
                  SelectProps={{
                    MenuProps: {
                      disablePortal: true,
                    },
                  }}
                >
                  {months.map((month) => (
                    <MenuItem key={month} value={String(month)}>
                      {month}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              name="endYear"
              control={control}
              render={({ field }) => (
                <TextField
                  select
                  label="Year"
                  {...field}
                  fullWidth
                  SelectProps={{
                    MenuProps: {
                      disablePortal: true,
                    },
                  }}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={String(year)}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
          <Box className="edu-actions">
            <Button
              type="submit"
              variant="contained"
              onClick={() => console.log(" BUTTON CLICKED")}
            >
              Save
            </Button>

            <Button onClick={onClose}>Cancel</Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
