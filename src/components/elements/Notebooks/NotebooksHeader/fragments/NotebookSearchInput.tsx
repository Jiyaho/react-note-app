import { FaMagnifyingGlass } from 'react-icons/fa6';

interface Prop {
  onChange: React.ChangeEventHandler;
}

function NotebookSearchInput({ onChange }: Prop) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center m-auto border-[1px] border-gray-200 rounded-md h-[85%] px-2 bg-white"
      >
        <label>
          <FaMagnifyingGlass className="text-gray-500" />
        </label>
        <input
          className="text-sm h-full placeholder-gray-400 border-transparent focus:border-transparent focus:ring-0"
          placeholder="Search"
          onChange={onChange}
        ></input>
      </form>
    </>
  );
}
export default NotebookSearchInput;
