import Button from "@/components/common/Button";

export default function CategoryMenu({ categories }) {
  return (
    <div>
      {categories.map((cat) => (
        <Button key={cat.cat_id}>
            {cat.cat_name}
        </Button>
      ))}
    </div>
  );
}

