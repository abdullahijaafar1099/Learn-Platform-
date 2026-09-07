"use client";

import { useEffect, useState } from "react";

export default function AdminCoursesPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Poultry Farming");
  const [message, setMessage] = useState("");
  const [courses, setCourses] = useState<any[]>([]);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [lessonOrder, setLessonOrder] = useState(1);
  const [lessons, setLessons] = useState<any[]>([]);

  async function loadCourses() {
    const response = await fetch("/api/courses");
    const data = await response.json();
    if (Array.isArray(data)) setCourses(data);
  }

  async function loadLessons() {
    const response = await fetch("/api/lessons");
    const data = await response.json();
    if (Array.isArray(data)) setLessons(data);
  }

  useEffect(() => {
    loadCourses();
    loadLessons();
  }, []);

  async function deleteCourse(id: number) {
    if (!confirm("Delete this course and all its lessons?")) return;

    const response = await fetch("/api/courses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();

    if (data.success) {
      setMessage("Course deleted successfully.");
      loadCourses();
      loadLessons();
    } else {
      setMessage("Failed to delete course.");
    }
  }

  async function deleteLesson(id: number) {
    if (!confirm("Delete this lesson?")) return;

    const response = await fetch("/api/lessons", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();

    if (data.success) {
      setMessage("Lesson deleted successfully.");
      loadLessons();
    } else {
      setMessage("Failed to delete lesson.");
    }
  }

  async function addLesson(courseId: number) {
    if (!lessonTitle.trim()) {
      setMessage("Lesson title is required.");
      return;
    }

    const response = await fetch("/api/lessons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        course_id: courseId,
        title: lessonTitle,
        content: lessonContent,
        lesson_order: lessonOrder,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setMessage("Lesson added successfully.");
      setLessonTitle("");
      setLessonContent("");
      setLessonOrder(1);
      loadLessons();
    } else {
      setMessage("Failed to add lesson.");
    }
  }

  async function addCourse(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, category }),
    });

    const data = await response.json();

    if (data.success) {
      setMessage("Course added successfully.");
      setTitle("");
      setDescription("");
      setCategory("Poultry Farming");
      loadCourses();
    } else {
      setMessage("Failed to add course.");
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "13px 15px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "15px",
    outline: "none",
    background: "#fff",
    color: "#111827",
    boxSizing: "border-box" as const,
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "40px 20px 70px",
      }}
    >
      <div style={{ maxWidth: "1050px", margin: "0 auto" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #166534, #15803d)",
            borderRadius: "20px",
            padding: "32px",
            color: "white",
            marginBottom: "28px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{ fontSize: "14px", opacity: 0.85, marginBottom: "8px" }}>
            PoultryWise Admin
          </div>

          <h1
            style={{
              fontSize: "32px",
              fontWeight: "800",
              margin: "0 0 8px",
            }}
          >
            Course Management
          </h1>

          <p style={{ margin: 0, opacity: 0.9 }}>
            Create, manage and organize your poultry farming courses.
          </p>
        </div>

        <section
          style={{
            background: "white",
            borderRadius: "18px",
            padding: "26px",
            marginBottom: "38px",
            boxShadow: "0 5px 18px rgba(15,23,42,0.06)",
            border: "1px solid #e2e8f0",
          }}
        >
          <h2
            style={{
              margin: "0 0 20px",
              fontSize: "22px",
              color: "#0f172a",
            }}
          >
            Add New Course
          </h2>

          <form
            onSubmit={addCourse}
            style={{
              display: "grid",
              gap: "14px",
            }}
          >
            <input
              style={inputStyle}
              placeholder="Course title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <textarea
              style={{ ...inputStyle, resize: "vertical" as const }}
              placeholder="Course description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />

            <select
              style={inputStyle}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Poultry Farming</option>
              <option>Broiler Production</option>
              <option>Layer Farming</option>
              <option>Poultry Health</option>
              <option>Feeding</option>
              <option>Farm Business</option>
            </select>

            <button
              type="submit"
              style={{
                padding: "13px 20px",
                background: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              + Add Course
            </button>
          </form>

          {message && (
            <div
              style={{
                marginTop: "18px",
                padding: "12px 15px",
                background: "#f0fdf4",
                color: "#166534",
                border: "1px solid #bbf7d0",
                borderRadius: "10px",
                fontWeight: "600",
              }}
            >
              {message}
            </div>
          )}
        </section>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "18px",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "25px",
                color: "#0f172a",
              }}
            >
              Existing Courses
            </h2>

            <p style={{ color: "#64748b", margin: "5px 0 0" }}>
              Manage your published and draft courses.
            </p>
          </div>
        </div>

        {courses.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "35px",
              textAlign: "center",
              borderRadius: "16px",
              color: "#64748b",
            }}
          >
            No courses found.
          </div>
        ) : (
          courses.map((course) => {
            const courseLessons = lessons.filter(
              (lesson) => lesson.course_id === course.id
            );

            return (
              <article
                key={course.id}
                style={{
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "18px",
                  padding: "24px",
                  marginBottom: "20px",
                  boxShadow: "0 5px 16px rgba(15,23,42,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "15px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "inline-block",
                        background: "#dcfce7",
                        color: "#166534",
                        padding: "5px 10px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: "700",
                        marginBottom: "10px",
                      }}
                    >
                      {course.category}
                    </div>

                    <h3
                      style={{
                        margin: "0 0 8px",
                        fontSize: "22px",
                        color: "#111827",
                      }}
                    >
                      {course.title}
                    </h3>

                    <p
                      style={{
                        margin: 0,
                        color: "#64748b",
                        lineHeight: 1.6,
                      }}
                    >
                      {course.description || "No description provided."}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteCourse(course.id)}
                    style={{
                      background: "#fee2e2",
                      color: "#b91c1c",
                      border: "1px solid #fecaca",
                      padding: "9px 13px",
                      borderRadius: "9px",
                      fontWeight: "700",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Delete Course
                  </button>
                </div>

                <div
                  style={{
                    marginTop: "24px",
                    paddingTop: "22px",
                    borderTop: "1px solid #e2e8f0",
                  }}
                >
                  <h4
                    style={{
                      margin: "0 0 14px",
                      fontSize: "18px",
                      color: "#0f172a",
                    }}
                  >
                    Lessons ({courseLessons.length})
                  </h4>

                  {courseLessons.length === 0 ? (
                    <p style={{ color: "#94a3b8" }}>No lessons yet.</p>
                  ) : (
                    courseLessons.map((lesson, index) => (
                      <div
                        key={lesson.id}
                        style={{
                          background: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          borderRadius: "12px",
                          padding: "15px",
                          marginBottom: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <strong style={{ color: "#1e293b" }}>
                            Lesson {index + 1} — {lesson.title.replace(/^\\d+\\.\\s*/, "")}
                          </strong>

                          <button
                            type="button"
                            onClick={() => deleteLesson(lesson.id)}
                            style={{
                              background: "transparent",
                              color: "#dc2626",
                              border: "none",
                              fontWeight: "700",
                              cursor: "pointer",
                            }}
                          >
                            Delete
                          </button>
                        </div>

                        <p
                          style={{
                            color: "#64748b",
                            lineHeight: 1.6,
                            marginBottom: 0,
                          }}
                        >
                          {lesson.content}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                <div
                  style={{
                    marginTop: "22px",
                    paddingTop: "22px",
                    borderTop: "1px solid #e2e8f0",
                  }}
                >
                  <h4
                    style={{
                      margin: "0 0 14px",
                      fontSize: "18px",
                      color: "#0f172a",
                    }}
                  >
                    Add Lesson
                  </h4>

                  <div style={{ display: "grid", gap: "12px" }}>
                    <input
                      style={inputStyle}
                      placeholder="Lesson title"
                      value={lessonTitle}
                      onChange={(e) => setLessonTitle(e.target.value)}
                    />

                    <textarea
                      style={{ ...inputStyle, resize: "vertical" as const }}
                      placeholder="Lesson content"
                      value={lessonContent}
                      onChange={(e) => setLessonContent(e.target.value)}
                      rows={4}
                    />

                    <input
                      style={inputStyle}
                      type="number"
                      min="1"
                      value={lessonOrder}
                      onChange={(e) =>
                        setLessonOrder(Number(e.target.value))
                      }
                    />

                    <button
                      type="button"
                      onClick={() => addLesson(course.id)}
                      style={{
                        padding: "12px 18px",
                        background: "#166534",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      + Add Lesson
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </main>
  );
}
