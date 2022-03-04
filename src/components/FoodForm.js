import { useState } from "react";
import FileInput from "./FileInput";

const INITIAL_VALUES = {
  title: "",
  calorie: 0,
  content: "",
  imgFile: null,
};

function sanitize(type, value) {
  switch (type) {
    case "number":
      return Number(value) || 0;

    default:
      return value;
  }
}

function FoodForm({
  initialValues = INITIAL_VALUES,
  initialPreview,
  onSubmit,
  onSubmitSuccess,
  onCancel,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(null);
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    handleInputChange(name, value, type);
  };

  const handleInputChange = (name, value, type) => {
    setValues((preValues) => {
      return { ...preValues, [name]: sanitize(type, value) };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imgFile", values.imgFile);
    formData.append("title", values.title);
    formData.append("calorie", values.calorie);
    formData.append("content", values.content);

    let result;
    try {
      setSubmittingError(null);
      setIsSubmitting(true);
      result = await onSubmit(formData);
    } catch (error) {
      setSubmittingError(error);
      return;
    } finally {
      setIsSubmitting(false);
    }
    const { food } = result;
    onSubmitSuccess(food);
    setValues(INITIAL_VALUES);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleInputChange}
        initialPreview={initialPreview}
      />
      <input name="title" value={values.title} onChange={handleChange}></input>
      <input
        name="calorie"
        value={values.calorie}
        onChange={handleChange}
        type="number"
      ></input>
      <input
        name="content"
        value={values.content}
        onChange={handleChange}
      ></input>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          취소
        </button>
      )}
      <button type="submit" disabled={isSubmitting}>
        확인
      </button>
      {submittingError && <p>{submittingError.message}</p>}
    </form>
  );
}

export default FoodForm;
