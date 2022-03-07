import { useState } from "react";
import { useLocale } from "../contexts/LocaleContext";
import useTranslate from "../hooks/useTranslate";

import FoodForm from "./FoodForm";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function FoodListItem({ item, onEdit, onDelete }) {
  const { id, imgUrl, title, calorie, content, createdAt } = item;
  const handleDeleteClick = () => onDelete(id);
  const handleEditClick = () => onEdit(id);

  const translate = useTranslate();
  const locale = useLocale();

  return (
    <div className="FoodListItem">
      <img src={imgUrl} alt={title} />
      <div>{title}</div>
      <div>{calorie} 칼로리</div>
      <div>{content}</div>
      <div>{formatDate(createdAt)}</div>
      <p>언어 : {locale}</p>
      <button onClick={handleEditClick}>{translate("edit button")}</button>
      <button onClick={handleDeleteClick}>{translate("delete button")}</button>
    </div>
  );
}

function FoodList({ items, onUpdate, onUpdateSuccess, onDelete }) {
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <ul className="FoodList">
      {items.map((item) => {
        if (item.id === editingId) {
          const { id, imgUrl, title, calorie, content } = item;
          const initialValues = { title, calorie, content, imgFile: null };
          const handleSubmit = (formData) => onUpdate(id, formData);

          const handleSubmitSuccess = (newItem) => {
            onUpdateSuccess(newItem);
            setEditingId(null);
          };

          return (
            <li key={item.id}>
              <FoodForm
                initialValues={initialValues}
                initialPreview={imgUrl}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
                onCancel={handleCancel}
              />
            </li>
          );
        }
        return (
          <li key={item.id}>
            <FoodListItem
              item={item}
              onEdit={setEditingId}
              onDelete={onDelete}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default FoodList;
