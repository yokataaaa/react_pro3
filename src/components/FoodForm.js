import { useState } from "react";
import FileInput from "./FileInput";

function sanitize(type, value) {
  switch (type) {
    case "number":
      return Number(value) || 0;

    default:
      return value;
  }
}

function FoodForm() {
  // const [title, setTile] = useState("");
  // const [calorie, setCalorie] = useState(0);
  // const [content, setContent] = useState("");
  const [values, setValues] = useState({
    title: "",
    calorie: 0,
    content: "",
    imgFile: null,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    handleInputChange(name, value, type);
  };

  const handleInputChange = (name, value, type) => {
    setValues((preValues) => {
      return { ...preValues, [name]: sanitize(type, value) };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  // const handleChangeTitle = (e) => {
  //   setTile(e.target.value);
  // };

  // const handleChangeCalorie = (e) => {
  //   const nextCalorie = Number(e.target.value) || 0;
  //   setCalorie(nextCalorie);
  // };

  // const handleChangeContent = (e) => {
  //   setContent(e.target.value);
  // };

  return (
    <form onSubmit={handleSubmit}>
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleInputChange}
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
      <button type="submit">확인</button>
    </form>
  );
}

export default FoodForm;
