import FoodList from "./FoodList";
import { getFoods, createFood, updateFood, deleteFood } from "../api";
import { useEffect, useState } from "react";
import FoodForm from "./FoodForm";
import { LocaleProvider } from "../contexts/LocaleContext";
import LocaleSelect from "./LocaleSelect";

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [cursor, setCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [search, setSearch] = useState("");

  // const sortedItems = items.sort((a, b) => a[order] - b[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const handleCalorieClick = () => setOrder("calorie");
  const handleDelete = async (id) => {
    const result = await deleteFood(id);
    if (!result) return;

    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getFoods(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
    const {
      foods,
      paging: { nextCursor },
    } = await result;
    if (!options.cursor) {
      setItems(foods);
    } else {
      setItems((prevItems) => [...prevItems, ...foods]);
    }
    setCursor(nextCursor);
  };

  const handleLoadMore = () => {
    handleLoad({
      order,
      cursor,
      search,
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target["search"].value);
  };

  const handleCreateSuccess = (newItems) => {
    setItems((prevItems) => [newItems, ...prevItems]);
  };

  const handleUpdateSuccess = (newItem) => {
    setItems((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === newItem.id);
      return [
        ...prevItems.slice(0, splitIdx),
        newItem,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad({
      order,
      search,
    });
  }, [order, search]);

  return (
    <LocaleProvider defaultValue={"ko"}>
      <div>
        <div>
          <button onClick={handleNewestClick}>?????????</button>
          <button onClick={handleCalorieClick}>????????????</button>
          <form onSubmit={handleSearchSubmit}>
            <input name="search" />
            <button type="submit">??????</button>
          </form>
          <LocaleSelect />
        </div>
        <FoodForm onSubmit={createFood} onSubmitSuccess={handleCreateSuccess} />
        <FoodList
          items={items}
          onUpdate={updateFood}
          onUpdateSuccess={handleUpdateSuccess}
          onDelete={handleDelete}
        />
        {cursor && (
          <button disabled={isLoading} onClick={handleLoadMore}>
            ?????????
          </button>
        )}
        {loadingError?.message && <p>{loadingError}</p>}
      </div>
    </LocaleProvider>
  );
}

export default App;
