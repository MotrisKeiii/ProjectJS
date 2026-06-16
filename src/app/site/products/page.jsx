export default function Page({ searchParams }) {
  const categoryName = searchParams.category;

  return <div>xem danh muc: {categoryName}</div>;
}
