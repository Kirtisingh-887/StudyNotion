import { toast } from "react-hot-toast";
import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector";
import { courseEndpoints } from "../apis";

const {
  COURSE_DETAILS_API,
  COURSE_CATEGORIES_API,
  GET_ALL_COURSE_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints;

const handleApiCall = async (method, url, data = null, headers = {}) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(method, url, data, headers);
    if (!response?.data?.success) {
      throw new Error(response.data.message || "API call failed");
    }
    toast.success("Success");
    return response.data.data;
  } catch (error) {
    console.error(`${url} API ERROR:`, error);
    toast.error(error.message || "An error occurred");
    return null;
  } finally {
    toast.dismiss(toastId);
  }
};

// Fetch all courses
export const getAllCourses = async () => {
  return await handleApiCall("GET", GET_ALL_COURSE_API);
};

// Fetch course details
export const fetchCourseDetails = async (courseId, dispatch) => {
  dispatch(setLoading(true));
  const result = await handleApiCall("POST", COURSE_DETAILS_API, { courseId });
  dispatch(setLoading(false));
  return result;
};

// Fetch course categories
export const fetchCourseCategories = async () => {
  return await handleApiCall("GET", COURSE_CATEGORIES_API);
};

// Add course details
export const addCourseDetails = async (data, token) => {
  return await handleApiCall("POST", CREATE_COURSE_API, data, {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  });
};

// Edit course details
export const editCourseDetails = async (data, token) => {
  return await handleApiCall("POST", EDIT_COURSE_API, data, {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  });
};

// Create section
export const createSection = async (data, token) => {
  return await handleApiCall("POST", CREATE_SECTION_API, data, {
    Authorization: `Bearer ${token}`,
  });
};

// Create subsection (lecture)
export const createSubSection = async (data, token) => {
  return await handleApiCall("POST", CREATE_SUBSECTION_API, data, {
    Authorization: `Bearer ${token}`,
  });
};

// Update section
export const updateSection = async (data, token) => {
  return await handleApiCall("POST", UPDATE_SECTION_API, data, {
    Authorization: `Bearer ${token}`,
  });
};

// Update subsection (lecture)
export const updateSubSection = async (data, token) => {
  return await handleApiCall("POST", UPDATE_SUBSECTION_API, data, {
    Authorization: `Bearer ${token}`,
  });
};

// Delete section
export const deleteSection = async (data, token) => {
  return await handleApiCall("POST", DELETE_SECTION_API, data, {
    Authorization: `Bearer ${token}`,
  });
};

// Delete subsection (lecture)
export const deleteSubSection = async (data, token) => {
  return await handleApiCall("POST", DELETE_SUBSECTION_API, data, {
    Authorization: `Bearer ${token}`,
  });
};

// Fetch courses under a specific instructor
export const fetchInstructorCourses = async (token) => {
  return await handleApiCall("GET", GET_ALL_INSTRUCTOR_COURSES_API, null, {
    Authorization: `Bearer ${token}`,
  });
};

// Delete a course
export const deleteCourse = async (data, token) => {
  return await handleApiCall("DELETE", DELETE_COURSE_API, data, {
    Authorization: `Bearer ${token}`,
  });
};

// Get full details of a course
export const getFullDetailsOfCourse = async (courseId, token) => {
  return await handleApiCall("POST", GET_FULL_COURSE_DETAILS_AUTHENTICATED, { courseId }, {
    Authorization: `Bearer ${token}`,
  });
};

// Mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
  return await handleApiCall("POST", LECTURE_COMPLETION_API, data, {
    Authorization: `Bearer ${token}`,
  });
};

// Create a rating for a course
export const createRating = async (data, token) => {
  return await handleApiCall("POST", CREATE_RATING_API, data, {
    Authorization: `Bearer ${token}`,
  });
};
