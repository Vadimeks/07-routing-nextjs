"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createNote } from "@/lib/api";

import styles from "./NoteForm.module.css";
import toast from "react-hot-toast";

interface NoteFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be at most 50 characters"),
  content: Yup.string().max(500, "Content must be at most 500 characters"),
  tag: Yup.string()
    .required("Tag is required")
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag"),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note created successfully!");
      onClose();
    },
    onError: (error: Error) => {
      toast.error(`Error creating note: ${error.message}`);
    },
  });

  return (
    <Formik
      initialValues={{
        title: "",
        content: "",
        tag: "Todo" as "Todo" | "Work" | "Personal" | "Meeting" | "Shopping",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        await mutation.mutateAsync(values);
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="note-title">Title</label>
            <Field
              id="note-title"
              name="title"
              type="text"
              className={styles.input}
            />
            <ErrorMessage
              name="title"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="note-content">Content</label>
            <Field
              id="note-content"
              name="content"
              as="textarea"
              className={styles.textarea}
              rows={5}
            />
            <ErrorMessage
              name="content"
              component="div"
              className={styles.error}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="note-tag">Tag</label>
            <Field
              id="note-tag"
              name="tag"
              as="select"
              className={styles.select}
            >
              <option value="" disabled>
                Select a tag
              </option>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="div" className={styles.error} />
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              Create Note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
