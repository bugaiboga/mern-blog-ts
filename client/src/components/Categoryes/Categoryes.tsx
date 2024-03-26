import { useTypedSelector } from "../../hooks/useTypedSelector";

interface Category {
  name: string;
  _id: string;
}

const Categoryes = () => {
  const { categories, categoryLoading } = useTypedSelector(
    (state) => state.category
  );

  if (categoryLoading) {
    return <p>loading...</p>;
  }

  return (
    <div className="categoryes">
      <ul className="list">
        {categories?.map((item: Category) => (
          <li className="item" key={item._id}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categoryes;
