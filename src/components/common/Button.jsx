export default function Button({ children }) {
  return <button className="px-4 py-2 rounded-sm border w-full bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-900 transition cursor-pointer">
    {children}
  </button>;
}
