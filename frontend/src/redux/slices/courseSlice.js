import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import toast from "react-hot-toast";

import {
  getAllCoursesAPI, getCourseDetailsAPI, createCourseAPI, getInstructorCoursesAPI
} from "../../services/courseAPI";

export const fetchAllCourses = createAsyncThunk("course/fetchAll", async () => {
  const { data } = await getAllCoursesAPI();
  return data.courses;
});

export const fetchCourseDetails = createAsyncThunk("course/fetchDetails", async (courseId) => {
  const { data } = await getCourseDetailsAPI(courseId);
  return data.course;
});

export const createCourse = createAsyncThunk("course/create", async (formData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await createCourseAPI(formData, token);
    toast.success("Course created successfully!");
    return data.course;
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to create course");
    return rejectWithValue(err.response?.data);
  }
});

export const fetchInstructorCourses = createAsyncThunk("course/fetchInstructor", async () => {
  const token = localStorage.getItem("token");
  const { data } = await getInstructorCoursesAPI(token);
  return data.courses;
});

const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    selectedCourse: null,
    instructorCourses: [],
    loading: false,
  },
  reducers: {
    setSelectedCourse: (state, action) => { state.selectedCourse = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.pending, (state) => { state.loading = true; })
      .addCase(fetchAllCourses.fulfilled, (state, action) => { state.loading = false; state.courses = action.payload; })
      .addCase(fetchAllCourses.rejected, (state) => { state.loading = false; })
      .addCase(fetchCourseDetails.fulfilled, (state, action) => { state.selectedCourse = action.payload; })
      .addCase(createCourse.fulfilled, (state, action) => { state.instructorCourses.push(action.payload); })
      .addCase(fetchInstructorCourses.fulfilled, (state, action) => { state.instructorCourses = action.payload; });
  },
});

export const { setSelectedCourse } = courseSlice.actions;
export default courseSlice.reducer;
